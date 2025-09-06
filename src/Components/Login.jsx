import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd validate and call an API
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      <div className="bg-[#13131a] min-h-screen flex items-center justify-center text-white p-4">
        <div className="bg-[#1a1a24] p-8 rounded-lg shadow-lg w-full max-w-md">
          {isLoggedIn ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-500 mb-4">Login Successful!</h2>
              <p className="text-gray-300">Welcome back!</p>
              <Link to="/" className="mt-6 inline-block bg-orange-500 text-white font-bold py-2 px-6 rounded hover:bg-orange-600 transition-colors">
                Go to Home
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#13131a] border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#13131a] border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  Login
                </button>
              </form>
              <p className="text-center text-gray-400 mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-orange-400 hover:underline">Register here</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
