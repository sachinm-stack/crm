import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBarChart2,
  FiGrid,
  FiCheckCircle,
  FiUsers,
  FiFileText,
  FiTool,
  FiPhoneOff,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronDown,
} from "react-icons/fi";

const iconMap = {
  Home: <FiHome />,
  "Business Leads": <FiBarChart2 />,
  Dashboard: <FiGrid />,
  Quality: <FiCheckCircle />,
  "Prospects Dashboard": <FiUsers />,
  Reports: <FiFileText />,
  "Service Agent": <FiTool />,
  "Inactive Calls": <FiPhoneOff />,
  Admin: <FiUser />,
  Logout: <FiLogOut />,
};

const dashboardChildren = [
  "Lead Creation",
  "Lead To Sales",
  "Lead Status Age",
  "Lost Opportunity",
  "Follow-up Missed",
  "Sales Performance",
  "Sales Cycle Length",
  "Leads / Sales Trend",
  "Communication Dashboard",
  "Customer Analysis",
  "Website Analytics",
  "Verification Analytics",
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <div className="logo-row">
        {!collapsed && (
          <div className="logo">
            <div className="logo-circle">O</div>
            <div>
              <h2>ORBYO</h2>
              <span>for Enterprise</span>
            </div>
          </div>
        )}

        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <FiChevronLeft />
        </button>
      </div>

      {!collapsed && (
        <div className="profile">
          <div className="avatar">CH</div>
          <div>
            <h4>CABINETSANDME</h4>
            <p>CRM Head</p>
          </div>
        </div>
      )}

      <nav className="nav-menu">
        <NavLink to="/" className="nav-item">
          {iconMap.Home}
          {!collapsed && <span>Home</span>}
        </NavLink>

        <NavLink to="/business-leads" className="nav-item">
          {iconMap["Business Leads"]}
          {!collapsed && <span>Business Leads</span>}
        </NavLink>

        <div className="nav-group">
          <div className="nav-item static">
            {iconMap.Dashboard}
            {!collapsed && (
              <>
                <span>Dashboard</span>
                <b className="badge">12</b>
                <FiChevronDown className="chev" />
              </>
            )}
          </div>

          {!collapsed && (
            <div className="sub-menu">
              {dashboardChildren.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          )}
        </div>

        <div className="nav-group">
          <NavLink to="/lead-verification" className="nav-item">
            {iconMap.Quality}
            {!collapsed && (
              <>
                <span>Quality</span>
                <b className="badge green">2</b>
                <FiChevronDown className="chev" />
              </>
            )}
          </NavLink>

          {!collapsed && (
            <div className="sub-menu">
              <p>Agent Desktop</p>
              <p>Lead Duplication</p>
            </div>
          )}
        </div>

        {["Prospects Dashboard", "Reports", "Service Agent", "Inactive Calls"].map(
          (item) => (
            <div className="nav-item static" key={item}>
              {iconMap[item]}
              {!collapsed && <span>{item}</span>}
            </div>
          )
        )}

        <div className="nav-item static">
          {iconMap.Admin}
          {!collapsed && (
            <>
              <span>Admin</span>
              <b className="badge purple">1</b>
              <FiChevronDown className="chev" />
            </>
          )}
        </div>
      </nav>

      <div className="logout nav-item static">
        {iconMap.Logout}
        {!collapsed && <span>Logout</span>}
      </div>
    </aside>
  );
};

export default Sidebar;