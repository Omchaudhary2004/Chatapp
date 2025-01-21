import React from 'react';
import { LogIn } from 'lucide-react';

export const Header = ({ user, onLoginClick, onLogout }) => {
  return (
    <div className="bg-white border-b px-4 py-2 flex justify-between items-center">
      <h1 className="text-xl font-bold">Chat App</h1>
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-700">{user.name}</span>
            <button
              onClick={onLogout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
          >
            <LogIn size={20} />
            <span>Login</span>
          </button>
        )}
      </div>
    </div>
  );
};
