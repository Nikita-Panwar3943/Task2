import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import {
  PlusCircleIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    onHold: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks?limit=10');
      setTasks(res.data.tasks);
      
      // Calculate stats
      const tasksData = res.data.tasks;
      setStats({
        total: tasksData.length,
        pending: tasksData.filter(t => t.status === 'Pending').length,
        inProgress: tasksData.filter(t => t.status === 'In Progress').length,
        completed: tasksData.filter(t => t.status === 'Completed').length,
        onHold: tasksData.filter(t => t.status === 'On Hold').length,
        cancelled: tasksData.filter(t => t.status === 'Cancelled').length,
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const statCards = [
    {
      name: 'Total Tasks',
      value: stats.total,
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Pending',
      value: stats.pending,
      icon: ClockIcon,
      color: 'bg-gray-500',
    },
    {
      name: 'In Progress',
      value: stats.inProgress,
      icon: ExclamationCircleIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Completed',
      value: stats.completed,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.name}
                      className="bg-white overflow-hidden shadow rounded-lg"
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className={`${stat.color} rounded-md p-3`}>
                              <Icon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                {stat.name}
                              </dt>
                              <dd className="text-lg font-medium text-gray-900">
                                {stat.value}
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Link
                    to="/add-task"
                    className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center">
                      <PlusCircleIcon className="h-8 w-8 text-blue-500" />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Add New Task</h3>
                        <p className="text-sm text-gray-500">Create a new task</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link
                    to="/tasks"
                    className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-8 w-8 text-green-500" />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">View All Tasks</h3>
                        <p className="text-sm text-gray-500">Manage your tasks</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Recent Tasks */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Recent Tasks</h2>
                  <Link
                    to="/tasks"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    View all
                  </Link>
                </div>
                
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {tasks.length === 0 ? (
                      <li className="p-6 text-center text-gray-500">
                        No tasks found. Create your first task!
                      </li>
                    ) : (
                      tasks.map((task) => (
                        <li key={task._id}>
                          <Link to={`/tasks/${task._id}`} className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {task.title}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {task.description}
                                  </p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                    {task.status}
                                  </span>
                                  <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p className="flex items-center text-sm text-gray-500">
                                    Type: {task.type}
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  {task.dueDate && (
                                    <p>
                                      Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
