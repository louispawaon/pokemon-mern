/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import API from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

type Props = {
  show: boolean;
  onClose: () => void;
  onShowRegister: () => void;
};

const LoginModal: React.FC<Props> = ({ show, onClose, onShowRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post('/api/auth/login', { username, password });
      const {accessToken} = response.data
      login(accessToken)
      onClose();
      toast.success("Logged in successfully!")
    } catch (error:any) {
       console.log(error)
      toast.error("Incorrect Username or Password")
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <button className="text-blue-500" onClick={onShowRegister}>
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
