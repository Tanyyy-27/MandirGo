import React, { useState } from 'react';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FaPrayingHands } from 'react-icons/fa'; // For the logo/brand icon
import { Link } from 'react-router';
const LoginPage2 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login Attempt (Page 2):", { email, password });
        alert(`Logging in with Email: ${email}`);
        // In a real app, you'd make an API call and handle success/failure
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12 space-y-8 border border-amber-200">
                
                {/* Logo and Title Section */}
                <div className="text-center">
                    <div className="inline-block p-4 bg-amber-500 rounded-full mb-4 shadow-lg">
                        <FaPrayingHands size={35} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Sign in to your MandirGo account
                    </p>
                </div>

                {/* Login Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Email Input */}
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                id="email-address-2"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-all duration-200"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                id="password-2"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-all duration-200"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input
                                id="remember-me-2"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded"
                            />
                            <label htmlFor="remember-me-2" className="ml-2 block text-slate-900">
                                Remember me
                            </label>
                        </div>

                        <div>
                            <a href="#" className="font-medium text-amber-600 hover:text-amber-500 transition-colors duration-200">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 shadow-md"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                                <FiLogIn className="h-6 w-6 text-amber-300 group-hover:text-amber-200" aria-hidden="true" />
                            </span>
                            Sign In
                        </button>
                    </div>
                </form>

                {/* Support Link */}
                <div className="text-center text-sm text-slate-600">
                    <p>Having trouble? <a href="/contact" className="font-medium text-amber-600 hover:text-amber-500 transition-colors duration-200">Get support</a></p>
                </div>
                
                <Link to="/SignUp"><div className='text-black hover:text-orange-500'>Create a Account ?</div></Link>
            </div>
        </div>
    );
};

export default LoginPage2;