<?php
require_once '../db_connect.php';
require_login(['Admin']);
if ($_SERVER['REQUEST_METHOD'] !== 'GET') auth_error(405, 'Only GET allowed');

try {
    // Counts come from the database; the UI does not invent monthly/weekly growth.
    $stats = $pdo->query("SELECT
        (SELECT COUNT(*) FROM donor) AS totalDonors,
        (SELECT COUNT(*) FROM needy_person) AS totalNeedy,
        (SELECT COUNT(*) FROM donor dn JOIN user u ON u.UserID = dn.UserID
            WHERE u.CreatedAt >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01') AND u.CreatedAt <= NOW()) AS donorsThisMonth,
        (SELECT COUNT(*) FROM needy_person np JOIN user u ON u.UserID = np.UserID
            WHERE u.CreatedAt >= DATE_SUB(CURRENT_DATE, INTERVAL WEEKDAY(CURRENT_DATE) DAY) AND u.CreatedAt <= NOW()) AS needyThisWeek,
        (SELECT COUNT(*) FROM donation WHERE Status IN ('Available','Requested','Approved','Assigned')) AS activeDonations,
        (SELECT COUNT(*) FROM donation WHERE Status = 'Available') AS availableDonations,
        (SELECT COUNT(*) FROM donation_request WHERE Status = 'Pending') AS pendingDonationRequests,
        (SELECT COUNT(*) FROM help_request WHERE Status = 'Pending') AS pendingHelpRequests
    ")->fetch(PDO::FETCH_ASSOC);
    foreach ($stats as $key => $value) $stats[$key] = (int)$value;
    $stats['pendingRequests'] = $stats['pendingDonationRequests'] + $stats['pendingHelpRequests'];

    // Each event uses its real stored timestamp. This is a recent-record feed,
    // not an audit log: request responses show their current/latest status.
    $queries = [
        "SELECT CONCAT('user-',u.UserID) AS id,
            CASE WHEN r.RoleName = 'Donor' THEN 'New donor registered' ELSE 'New applicant registered' END AS title,
            u.Name AS detail, u.CreatedAt AS occurredAt, 'info' AS tone
         FROM user u JOIN role r ON r.RoleID = u.RoleID
         WHERE r.RoleName IN ('Donor','Needy') ORDER BY u.CreatedAt DESC LIMIT 5",
        "SELECT CONCAT('donation-',d.DonationID) AS id, 'Donation posted' AS title,
            CONCAT(u.Name, ' — ', d.Title) AS detail, d.CreatedAt AS occurredAt, 'success' AS tone
         FROM donation d JOIN donor dn ON dn.DonorID = d.DonorID JOIN user u ON u.UserID = dn.UserID
         ORDER BY d.CreatedAt DESC LIMIT 5",
        "SELECT CONCAT('verified-',np.NeedyID) AS id, 'Applicant verified' AS title,
            u.Name AS detail, np.VerifiedAt AS occurredAt, 'success' AS tone
         FROM needy_person np JOIN user u ON u.UserID = np.UserID
         WHERE np.VerificationStatus = 'Verified' AND np.VerifiedAt IS NOT NULL ORDER BY np.VerifiedAt DESC LIMIT 5",
        "SELECT CONCAT('response-',dr.RequestID) AS id,
            CASE WHEN dr.Status = 'Delivered' THEN 'Donation delivered'
                 WHEN dr.Status IN ('Accepted','Approved') THEN 'Donation request accepted'
                 ELSE 'Donation request rejected' END AS title,
            CONCAT(u.Name, ' — ', d.Title) AS detail, dr.RespondedAt AS occurredAt,
            CASE WHEN dr.Status IN ('Rejected','Declined') THEN 'warning' ELSE 'success' END AS tone
         FROM donation_request dr JOIN donation d ON d.DonationID = dr.DonationID
         JOIN needy_person np ON np.NeedyID = dr.NeedyID JOIN user u ON u.UserID = np.UserID
         WHERE dr.Status IN ('Accepted','Approved','Delivered','Rejected','Declined') AND dr.RespondedAt IS NOT NULL
         ORDER BY dr.RespondedAt DESC LIMIT 5",
        "SELECT CONCAT('complaint-',c.ComplaintID) AS id, 'Complaint received' AS title,
            CONCAT(u.Name, ' — ', c.Subject) AS detail, c.CreatedAt AS occurredAt, 'warning' AS tone
         FROM complaint c JOIN user u ON u.UserID = c.UserID ORDER BY c.CreatedAt DESC LIMIT 5",
        "SELECT CONCAT('help-',h.HelpRequestID) AS id, 'Help request submitted' AS title,
            CONCAT(u.Name, ' — ', h.HelpType) AS detail, h.CreatedAt AS occurredAt, 'info' AS tone
         FROM help_request h JOIN needy_person np ON np.NeedyID = h.NeedyID JOIN user u ON u.UserID = np.UserID
         ORDER BY h.CreatedAt DESC LIMIT 5",
    ];
    $activity = [];
    foreach ($queries as $sql) $activity = array_merge($activity, $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
    usort($activity, function ($a, $b) {
        return strcmp($b['occurredAt'], $a['occurredAt']) ?: strcmp($a['id'], $b['id']);
    });
    echo json_encode(['status'=>'success','data'=>['stats'=>$stats,'activity'=>array_slice($activity,0,5)]]);
} catch (PDOException $e) {
    auth_error(500, 'Could not load dashboard data. Please try again');
}
