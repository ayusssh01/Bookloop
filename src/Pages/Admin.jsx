import React, { useState, useEffect } from "react";
import "../styles/Admin.css";
import {
  FaUsers,
  FaBox,  // Changed icon for uploads
  FaChartBar,
  FaBell,
  FaTruck,
  FaMoneyBill,
  FaCog,
  FaCreditCard,
  FaClipboardList,
  FaFilter,
} from "react-icons/fa";
import {
  BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, Legend, Cell, ResponsiveContainer
} from "recharts";

const Admin = () => {
  const [Users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("Last 1 Year");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setUsers([{ id: 1, name: "Ayush Jha", role: "Donator", status: "Active" }]);
    setUploads([{ id: 1, title: "React Guide", status: "Pending" }]);
    setNotifications([
      "User reported an issue",
      "New upload needs verification",
    ]);
    setAnalytics({
      totalUsers: 2000,
      totalUploads: 400,
      donated: 5400,
      received:3900,  // Added received count
      revenue: "$12000",
    });
  }, [selectedTimeFrame]);

  const SidebarItem = ({ icon, text }) => (
    <li className="sidebar-item">
      {icon} <span>{text}</span>
    </li>
  );

  const chartData = [
    { name: "Users", value: analytics.totalUsers },
    { name: "Uploads", value: analytics.totalUploads },
    { name: "Donated", value: analytics.donated },
    { name: "Received", value: analytics.received },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <SidebarItem icon={<FaUsers />} text="User Management" />
          <SidebarItem icon={<FaBox />} text="Uploads Verification" />
          <SidebarItem icon={<FaChartBar />} text="Analytics & Reports" />
          <SidebarItem icon={<FaBell />} text="Notifications" />
          <SidebarItem icon={<FaTruck />} text="Courier Tracking" />
          <SidebarItem icon={<FaMoneyBill />} text="Monetization" />
          <SidebarItem icon={<FaCreditCard />} text="Credit Management" />
          <SidebarItem icon={<FaClipboardList />} text="Activity Logs" />
          <SidebarItem icon={<FaCog />} text="Settings" />
        </ul>
      </aside>

      <main className="main-content">
        <h1>Admin Dashboard</h1>

        <div className="dashboard-grid">
          {[
            { icon: <FaUsers />, label: "Users", value: analytics.totalUsers },
            { icon: <FaBox />, label: "Uploads", value: analytics.totalUploads },
            { icon: <FaChartBar />, label: "Donated", value: analytics.donated },
            { icon: <FaChartBar />, label: "Received", value: analytics.received },
            { icon: <FaTruck />, label: "Deliveries", value: 120 },
            { icon: <FaMoneyBill />, label: "Revenue", value: analytics.revenue },
          ].map((item, index) => (
            <div key={index} className="card2">
              {item.icon} <h3>{item.label}: {item.value}</h3>
            </div>
          ))}
        </div>
        
        <div className="section-divider"></div>

        <div className="chart-controls">
          <button className="filter-button" onClick={() => setShowFilter(!showFilter)}>
            <FaFilter /> Filter
          </button>
          {showFilter && (
            <div className="chart-filter">
              <select value={selectedTimeFrame} onChange={(e) => setSelectedTimeFrame(e.target.value)}>
                <option value="Last 1 Year">Last 1 Year</option>
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="This Month">This Month</option>
              </select>
            </div>
          )}
        </div>

        <div className="charts-container">
          <div className="chart-box">
            <h2>Analytics Overview ({selectedTimeFrame})</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h2>Distribution ({selectedTimeFrame})</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
