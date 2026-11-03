<?php
// Keep uploaded files outside Apache's document root; serve only via a login API.
function document_directory() {
    return dirname($_SERVER['DOCUMENT_ROOT']) . '/kindreach_private_documents';
}
function save_supporting_file($field) {
    if (empty($_FILES[$field]) || $_FILES[$field]['error'] === UPLOAD_ERR_NO_FILE) return null;
    $file = $_FILES[$field];
    if ($file['error'] !== UPLOAD_ERR_OK) auth_error(400, 'Upload failed. Check PHP upload size limits and try again');
    if ($file['size'] > 10 * 1024 * 1024) auth_error(400, 'Document must be at most 10 MB');
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    $extensions = ['application/pdf'=>'pdf', 'image/png'=>'png', 'image/jpeg'=>'jpg'];
    if (!isset($extensions[$mime])) auth_error(400, 'Only PDF, PNG and JPG documents are allowed');
    $directory = document_directory();
    if (!is_dir($directory) && !mkdir($directory, 0700, true)) auth_error(500, 'Cannot create private upload directory');
    $filename = bin2hex(random_bytes(16)) . '.' . $extensions[$mime];
    if (!move_uploaded_file($file['tmp_name'], $directory . '/' . $filename)) auth_error(500, 'Could not save document');
    return $filename;
}
