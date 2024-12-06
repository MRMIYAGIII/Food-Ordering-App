import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ShoppingBag, 
  PieChart, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  Search, 
  Bell, 
  CloudDownload, 
  ChevronRight, 
  CalendarCheck, 
  CircleDollarSign, 
  Filter, 
  MoreVertical, 
  Plus 
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Table, Button, Spinner } from 'react-bootstrap';
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock API function to fetch users
const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Ensure your backend returns users in the correct format
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};


const AdminDashboard = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
  // New state for users
  const [users, setUsers] = useState([]);
  const [isUsersView, setIsUsersView] = useState(false);

  // Bar Chart Data (kept from previous implementation)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000, 5060, 4050, 6070],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: [1000, 1500, 2500, 4000, 3500, 5000],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales & Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
        },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarHidden(true);
      } else if (window.innerWidth > 576) {
        setIsSearchExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch users when Users menu item is clicked
  useEffect(() => {
    if (isUsersView) {
      const loadUsers = async () => {
        try {
          const fetchedUsers = await fetchUsers();
          setUsers(fetchedUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      loadUsers();
    }
  }, [isUsersView]);

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    // Reset users view state
    setIsUsersView(menuItem === 'Users');
  };

  const toggleSearchExpand = (e) => {
    if (window.innerWidth < 576) {
      e.preventDefault();
      setIsSearchExpanded(!isSearchExpanded);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      
      <section 
        id="sidebar" 
        className={`fixed top-0 left-0 h-full w-60 bg-white dark:bg-gray-800 transition-all ${isSidebarHidden ? 'hidden' : ''}`}
      >
        <section 
        id="sidebar" 
        className={`fixed top-0 left-0 h-full w-60 bg-white dark:bg-gray-800 transition-all ${isSidebarHidden ? 'hidden' : ''}`}
      >
        <a href="#" className="brand flex items-center p-4">
          <span className="text-2xl mr-2">😊</span>
          <span className="text">AdminHub</span>
        </a>
        
        <ul className="side-menu top">
          {[
            { icon: <Home />, text: 'Dashboard' },
            { icon: <ShoppingBag />, text: 'My Store' },
            { icon: <PieChart />, text: 'Analytics' },
            { icon: <MessageSquare />, text: 'Message' },
            { icon: <Users />, text: 'Users' },
          ].map(item => (
            <li 
              key={item.text} 
              className={activeMenuItem === item.text ? 'active' : ''}
              onClick={() => handleMenuItemClick(item.text)}
            >
              <a href="#" className="flex items-center p-4">
                {item.icon}
                <span className="text ml-2">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
        
        <ul className="side-menu">
          <li>
            <a href="#" className="flex items-center p-4">
              <Settings />
              <span className="text ml-2">Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="logout flex items-center p-4">
              <LogOut />
              <span className="text ml-2">Logout</span>
            </a>
          </li>
        </ul>
      </section>
       
      </section>
      
      {/* CONTENT */}
      <section id="content" className="ml-60 transition-all">
        
        <nav className="bg-white dark:bg-gray-800 p-4 flex items-center">
        <Menu 
            className="cursor-pointer" 
            onClick={toggleSidebar}
          />
          <a href="#" className="nav-link ml-4">Categories</a>
          
          <form 
            action="#" 
            className={`ml-4 flex ${isSearchExpanded ? 'expanded' : ''}`}
          >
            <div className="form-input flex">
              <input 
                type="search" 
                placeholder="Search..." 
                className="border p-2"
              />
              <button 
                type="submit" 
                className="search-btn p-2"
                onClick={toggleSearchExpand}
              >
                <Search />
              </button>
            </div>
          </form>
          
          <div className="ml-auto flex items-center">
            <label className="switch-mode mr-4">
              <input 
                type="checkbox" 
                checked={isDarkMode}
                onChange={toggleDarkMode}
                className="hidden"
              />
              Dark Mode
            </label>
            
            <a href="#" className="notification relative mr-4">
              <Bell />
              <span className="num absolute top-0 right-0 bg-red-500 text-white rounded-full px-2">8</span>
            </a>
            
            <a href="#" className="profile">
              <img src="img/people.png" alt="Profile" className="w-10 h-10 rounded-full" />
            </a>
          </div>
        
        </nav>

        {/* MAIN */}
        <main className="p-6">
         
          {activeMenuItem === 'Dashboard' && (
            <>
              <div className="head-title flex justify-between items-center mb-6">
               
                <div className="left">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <ul className="breadcrumb flex items-center">
                <li><a href="#">Dashboard</a></li>
                <li><ChevronRight /></li>
                <li><a className="active" href="#">Home</a></li>
              </ul>
            </div>
            
            <a href="#" className="btn-download flex items-center bg-blue-500 text-white p-2 rounded">
              <CloudDownload className="mr-2" />
              <span className="text">Download PDF</span>
            </a>
              </div>

              <ul className="box-info grid grid-cols-3 gap-4">
              
                {[
              { icon: <CalendarCheck />, value: '1020', label: 'New Order' },
              { icon: <Users />, value: '2834', label: 'Visitors' },
              { icon: <CircleDollarSign />, value: '$2543', label: 'Total Sales' }
            ].map(item => (
              <li key={item.label} className="bg-white p-4 rounded shadow flex items-center">
                {item.icon}
                <span className="text ml-4">
                  <h3 className="text-xl font-bold">{item.value}</h3>
                  <p>{item.label}</p>
                </span>
              </li>
            ))}
              </ul>
              <div className="analytics-section mt-6 bg-white p-4 rounded">
                <h2 className="text-2xl font-bold mb-4">Analytics</h2>
                <div className="chart-container" style={{ height: '400px' }}>
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
              </div>
              <div className="table-data grid grid-cols-2 gap-4 mt-6">
              <div className="order bg-white p-4 rounded">
              <div className="head flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Recent Orders</h3>
                <div className="flex">
                  <Search className="mr-2" />
                  <Filter />
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Ngarambe Emmanuel', date: '01-12-2024', status: 'Completed' },
                    { name: 'Mugabo Prince', date: '14-11-2024', status: 'Pending' },
                    { name: 'Cristiano Ronaldo', date: '13-11-2021', status: 'Process' },
                    { name: 'Kagabo Kevin', date: '19-10-2021', status: 'Pending' },
                    { name: 'Cyusa Kelvin', date: '11-10-2021', status: 'Completed' },
                  ].map((order, index) => (
                    <tr key={index}>
                      <td className="flex items-center">
                        <img 
                          src="img/people.png" 
                          alt={order.name} 
                          className="w-10 h-10 rounded-full mr-2" 
                        />
                        <p>{order.name}</p>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <span 
                          className={`status ${order.status.toLowerCase()} 
                            ${order.status === 'Completed' ? 'text-green-500' : 
                               order.status === 'Pending' ? 'text-yellow-500' : 
                               'text-blue-500'}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="todo bg-white p-4 rounded">
              <div className="head flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Todos</h3>
                <div className="flex">
                  <Plus className="mr-2" />
                  <Filter />
                </div>
              </div>
              <ul className="todo-list">
                {[
                  { text: 'Todo List', completed: true },
                  { text: 'Todo List', completed: true },
                  { text: 'Todo List', completed: false },
                  { text: 'Todo List', completed: true },
                  { text: 'Todo List', completed: false },
                ].map((todo, index) => (
                  <li 
                    key={index} 
                    className={`flex justify-between items-center p-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                  >
                    <p>{todo.text}</p>
                    <MoreVertical />
                  </li>
                ))}
              </ul>
            </div>
              </div>
            </>
          )}

          {/* Users View */}
          {activeMenuItem === 'Users' && (
            <div className="users-section bg-white p-4 rounded">
              <div className="head flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">User Management</h1>
                <div className="flex items-center">
                  <Search className="mr-2" />
                  <Filter />
                </div>
              </div>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Role</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-2 border text-center">{user.id}</td>
                      <td className="p-2 border">{user.name}</td>
                      <td className="p-2 border">{user.email}</td>
                      <td className="p-2 border">{user.role}</td>
                      <td className="p-2 border">
                        <span 
                          className={`
                            ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}
                            font-semibold
                          `}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default AdminDashboard;