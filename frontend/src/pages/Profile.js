import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import {
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, loadUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Ensure user data is loaded
    if (!user) {
      loadUser();
    }
  }, [user, loadUser]);

  const getJoinDate = () => {
    if (user) {
      return new Date(user.createdAt || Date.now()).toLocaleDateString();
    }
    return '';
  };

  const getTotalTasks = () => {
    // This would typically come from an API call
    // For now, return a placeholder
    return Math.floor(Math.random() * 50) + 10;
  };

  const getCompletedTasks = () => {
    // This would typically come from an API call
    // For now, return a placeholder
    return Math.floor(Math.random() * 30) + 5;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h1>
            
            {successMessage && (
              <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      {successMessage}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {/* Profile Header */}
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center">
                      <UserIcon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {user?.fullName || 'Loading...'}
                    </h3>
                    <p className="text-sm leading-5 text-gray-500">
                      Member since {getJoinDate()}
                    </p>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md border border-gray-300">
                      {user?.fullName || 'Loading...'}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md border border-gray-300">
                      {user?.email || 'Loading...'}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Account Status
                    </label>
                    <div className="mt-1">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Task Statistics
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <CalendarIcon className="h-8 w-8 text-blue-500" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Total Tasks</p>
                          <p className="text-2xl font-bold text-gray-900">{getTotalTasks()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Completed</p>
                          <p className="text-2xl font-bold text-green-600">{getCompletedTasks()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">!</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">In Progress</p>
                          <p className="text-2xl font-bold text-yellow-600">
                            {getTotalTasks() - getCompletedTasks()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Account Actions
                  </h3>
                  <div className="space-y-3">
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Update Profile Information
                    </button>
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Change Password
                    </button>
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
