import { useState, useEffect, useRef } from "react";
import logoGreen from "../assets/logo-green.png";
import { Outlet, useLocation, NavLink, useNavigate } from "react-router-dom";
import { getNotifications } from "../services/adminService";
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  Package,
  History,
  MessageSquare,
  User,
  Clock,
  LogOut,
  Search,
  Users,
  FileText,
  Send,
  AlertTriangle,
  Heart,
  UserCheck,
  Truck,
  MessageCircle,
} from "lucide-react";

export default function DashboardLayout() {
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  });

  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isNeedy = path.startsWith("/needy");
  const isDonor = path.startsWith("/donor");
  const isAdmin = path.startsWith("/admin");

  const userId = user.userID || user.id || user.UserID;

  useEffect(() => {
    const onClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setOpenNotif(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const result = await getNotifications(userId);
        if (result.status === "success") {
          setNotifications(result.data || []);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userId]);

  const loadNotifications = async () => {
    if (!userId) return;
    setNotifLoading(true);
    try {
      const result = await getNotifications(userId);
      if (result.status === "success") {
        setNotifications(result.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setNotifLoading(false);
    }
  };

  const displayName =
    user.name || (isAdmin ? "Admin" : isNeedy ? "Needy" : "Donor");
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const roleLabel = isAdmin
    ? "Administrator"
    : isNeedy
      ? "Needy Person"
      : "Donor Account";

  const profilePath = isAdmin
    ? "/admin/profile"
    : isNeedy
      ? "/needy/profile"
      : "/donor/profile";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getPageTitle = () => {
    if (path.includes("/donor/add-donation")) return "Add Donation";
    if (path.includes("/donor/my-donations")) return "My Donations";
    if (path.includes("/donor/donation-requests")) return "Donation Requests";
    if (path.includes("/donor/schedule-delivery")) return "Schedule Delivery";
    if (path.includes("/donor/messages")) return "Messages";
    if (path.includes("/donor/history")) return "Donation History";
    if (path.includes("/donor/feedback")) return "Feedback";
    if (path.includes("/donor/profile")) return "My Profile";
    if (path.includes("/needy/browse-donations")) return "Browse Donations";
    if (path === "/needy/request-help") return "Request Help";
    if (path.includes("/needy/requests")) return "My Requests";
    if (path === "/needy/messages") return "Messages";
    if (path.includes("/needy/feedback")) return "Feedback";
    if (path.includes("/needy/profile")) return "My Profile";
    if (path.includes("/admin/manage-donors")) return "Manage Donors";
    if (path.includes("/admin/manage-needy")) return "Manage Needy Persons";
    if (path.includes("/admin/donation-types")) return "Donation Types";
    if (path.includes("/admin/donation-requests")) return "Donation Requests";
    if (path.includes("/admin/monitor-donations")) return "Monitor Donations";
    if (path.includes("/admin/assign-donations")) return "Assign Donations";
    if (path.includes("/admin/generate-reports")) return "Generate Reports";
    if (path.includes("/admin/send-notifications")) return "Send Notifications";
    if (path.includes("/admin/resolve-complaints")) return "Resolve Complaints";
    if (path.includes("/admin/profile")) return "Profile & Settings";
    return "Dashboard";
  };

  const currentTitle = getPageTitle();
  const hasUnread = notifications.length > 0;

  const linkClass = ({ isActive }) =>
    `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${
      isActive
        ? "bg-[#ECFDF5] text-[#009689]"
        : "text-slate-600 hover:bg-slate-50"
    }`;

  const ActiveBar = ({ isActive }) =>
    isActive ? (
      <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>
    ) : null;

  return (
    <div className="flex w-full h-screen bg-white overflow-hidden">
      <aside className="w-65 h-full bg-white border-r border-slate-200/80 flex flex-col shrink-0">
        <div className="w-65 px-6 py-6 border-b border-slate-200/80 flex items-center gap-3">
          <img
            src={logoGreen}
            alt="Kind Reach Logo"
            className="w-auto h-12 object-contain"
          />
        </div>

        <div className="flex-1 px-3 py-6 flex flex-col overflow-y-auto">
          {isDonor && (
            <>
              <NavLink to="/donor" end className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Dashboard</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/donor/add-donation" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <PlusCircle className="w-4 h-4 shrink-0" />
                    <span>Add Donation</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/donor/my-donations" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Package className="w-4 h-4 shrink-0" />
                    <span>My Donations</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/donor/donation-requests" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Donation Requests</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/donor/schedule-delivery" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>Schedule Delivery</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/donor/messages" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>Messages</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/donor/history" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <History className="w-4 h-4 shrink-0" />
                    <span>Donation History</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/donor/feedback" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>Feedback</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/donor/profile" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <User className="w-4 h-4 shrink-0" />
                    <span>My Profile</span>
                  </>
                )}
              </NavLink>
            </>
          )}

          {isNeedy && (
            <>
              <NavLink to="/needy" end className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Dashboard</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/needy/browse-donations" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Search className="w-4 h-4 shrink-0" />
                    <span>Browse Donations</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/needy/request-help" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <PlusCircle className="w-4 h-4 shrink-0" />
                    <span>Request Help</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/needy/requests" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Package className="w-4 h-4 shrink-0" />
                    <span>My Requests</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/needy/messages" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Messages</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/needy/feedback" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>Feedback</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/needy/profile" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <User className="w-4 h-4 shrink-0" />
                    <span>My Profile</span>
                  </>
                )}
              </NavLink>
            </>
          )}

          {isAdmin && (
            <>
              <NavLink to="/admin" end className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Dashboard</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/admin/manage-donors" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Manage Donors</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/admin/manage-needy" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Heart className="w-4 h-4 shrink-0" />
                    <span>Manage Needy Persons</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/admin/donation-types" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Package className="w-4 h-4 shrink-0" />
                    <span>Donation Types</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/admin/donation-requests" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Donation Requests</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/admin/monitor-donations" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Search className="w-4 h-4 shrink-0" />
                    <span>Monitor Donations</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/admin/assign-donations" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <UserCheck className="w-4 h-4 shrink-0" />
                    <span>Assign Donations</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/admin/generate-reports" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Generate Reports</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/admin/send-notifications" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <Send className="w-4 h-4 shrink-0" />
                    <span>Send Notifications</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/admin/resolve-complaints" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Resolve Complaints</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/admin/profile" className={linkClass}>
                {({ isActive }) => (
                  <>
                    <ActiveBar isActive={isActive} />
                    <User className="w-4 h-4 shrink-0" />
                    <span>Profile & Settings</span>
                  </>
                )}
              </NavLink>
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-200/80 flex flex-col gap-3 bg-slate-50/50">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-9 h-9 bg-[#009689] text-white font-bold text-[13px] rounded-full flex items-center justify-center shrink-0 shadow-sm">
              {initials}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[13px] font-semibold text-slate-800 truncate">
                {displayName}
              </span>
              <span className="text-[11px] text-slate-400 font-medium truncate">
                {roleLabel}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full py-2 px-3 text-[13px] font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <header className="w-full h-17.5 bg-white px-8 flex items-center justify-between border-b border-slate-200/80 shrink-0">
          <div className="flex items-center text-sm font-medium text-slate-700">
            <span>Home</span>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900 font-semibold">{currentTitle}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={async () => {
                  const next = !openNotif;
                  setOpenNotif(next);
                  setOpenProfile(false);
                  if (next) await loadNotifications();
                }}
                className="relative w-9 h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[8px] flex items-center justify-center cursor-pointer transition-all"
              >
                <Bell className="w-4 h-4 text-slate-600" />
                {hasUnread && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {openNotif && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-[13px] font-bold text-slate-900">
                      Notifications
                    </p>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifLoading && (
                      <p className="px-4 py-6 text-center text-[12px] text-slate-500">
                        Loading...
                      </p>
                    )}
                    {!notifLoading && notifications.length === 0 && (
                      <p className="px-4 py-6 text-center text-[12px] text-slate-500">
                        No new notifications
                      </p>
                    )}
                    {!notifLoading &&
                      notifications.map((n) => (
                        <div
                          key={n.NotificationID}
                          className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50"
                        >
                          <p className="text-[12px] font-semibold text-slate-900">
                            {n.Title}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                            {n.Message}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {n.CreatedAt
                              ? String(n.CreatedAt).split(" ")[0]
                              : ""}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setOpenProfile((v) => !v);
                  setOpenNotif(false);
                }}
                className="h-10.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[10px] flex items-center cursor-pointer transition-all px-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 bg-[#009689] text-white font-bold text-[11px] rounded-full flex items-center justify-center shrink-0">
                    {initials}
                  </div>
                  <span className="text-[13px] font-semibold text-slate-800 tracking-tight whitespace-nowrap">
                    {displayName.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </div>
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenProfile(false);
                      navigate(profilePath);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-red-600 hover:bg-red-50 cursor-pointer border-t border-slate-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 h-full overflow-y-auto p-8 bg-slate-50/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
}