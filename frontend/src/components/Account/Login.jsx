import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex h-screen bg-gray-400">
      <div className="m-auto max-w-lg bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-4">Chat Application</h1>
          <p className="text-gray-600"> GET STARTED !!</p>
        </div>
        <div className="text-center">
          <button 
            onClick={loginWithRedirect} 
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200">
            Login
          </button>
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">Connect your account to start using this app. </p>
          <p className="text-gray-600 text-sm mt-2">Use a different browser if you're having problems.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

