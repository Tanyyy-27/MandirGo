import React, { useState } from 'react';
// Added FiPhone icon for phone number
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { FaPrayingHands } from 'react-icons/fa';
// CORRECT: Link should be imported from 'react-router-dom'
import { Link } from 'react-router';

const UserSignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (!formData.agreedToTerms) {
            alert("You must agree to the terms of service.");
            return;
        }
        // Handle user registration logic here
        console.log("User Registration Submitted:", formData);
        alert(`Welcome, ${formData.fullName}! Your account has been created.`);
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left Column: Illustrative Section */}
            <div className="hidden lg:flex w-1/2 bg-amber-500 items-center justify-center p-12 relative">
                <div className="text-center text-white">
                    <div className="inline-block p-5 bg-white/20 rounded-full mb-6">
                        <FaPrayingHands size={50} />
                    </div>
                    {/* Updated Text for Devotees */}
                    <h1 className="text-4xl font-bold mb-4">Create Your Devotee Account</h1>
                    <p className="text-xl text-amber-100">
                        Join our community to book darshans, get live updates, and make your spiritual journey seamless.
                    </p>
                </div>
            </div>

            {/* Right Column: Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-6">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-slate-900">
                            Sign Up for MandirGo
                        </h2>
                        <p className="mt-2 text-center text-sm text-slate-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500">
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Input Fields - Simplified for User */}
                        <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input name="fullName" type="text" required className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
                        </div>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input name="email" type="email" required className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                        </div>
                         <div className="relative">
                            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input name="phone" type="tel" required className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input name="password" type="password" required className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="Password" value={formData.password} onChange={handleChange} />
                            </div>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input name="confirmPassword" type="password" required className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex items-center pt-2">
                            <input id="terms" name="agreedToTerms" type="checkbox" className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded" checked={formData.agreedToTerms} onChange={handleChange} />
                            <label htmlFor="terms" className="ml-2 block text-sm text-slate-900">
                                I agree to the <a href="#" className="font-medium text-amber-600 hover:text-amber-500">Terms of Service</a>
                            </label>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserSignUpPage;