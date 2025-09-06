import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && password) {
            setIsRegistered(true);
        }
    };

    return (
        <>
            <div className="bg-[#13131a] min-h-screen flex items-center justify-center text-white p-4">
                <div className="bg-[#1a1a24] p-8 rounded-lg shadow-lg w-full max-w-md">
                    {isRegistered ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-green-500 mb-4">Registration Successful!</h2>
                            <p className="text-gray-300">You can now log in with your new account.</p>
                            <Link to="/login" className="mt-6 inline-block bg-orange-500 text-white font-bold py-2 px-6 rounded hover:bg-orange-600 transition-colors">
                                Go to Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-400 mb-2" htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-[#13131a] border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />
                                </div>
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
                                    Register
                                </button>
                            </form>
                             <p className="text-center text-gray-400 mt-4">
                                Already have an account?{' '}
                                <Link to="/login" className="text-orange-400 hover:underline">Login here</Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Register;
