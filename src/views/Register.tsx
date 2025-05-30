import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Path } from '../utils/path';
import { Util } from '../utils/util';
import fs from '../services/firebase';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [repeatEmail, setRepeatEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        if (email !== repeatEmail) {
            toast.error('Emails do not match.');
            return;
        }
        if (password !== repeatPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        try {
            await fs.registerUser(email, password);
            toast.success('Account created successfully!');
            setTimeout(() => {
                window.location.href = Path.LOGIN;
            }, 200);
        } catch (err: any) {
            let msg = 'Failed to register. Please check your data.';
            toast.error(Util.prepareErrorMsg(err, msg));
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Register a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="repeat-email" className="block text-sm/6 font-medium text-gray-900">
                                Repeat email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="repeat-email"
                                    name="repeat-email"
                                    type="email"
                                    value={repeatEmail}
                                    onChange={(e) => setRepeatEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="repeat-password" className="block text-sm/6 font-medium text-gray-900">
                                Repeat password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="repeat-password"
                                    name="repeat-password"
                                    type="password"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>

                            <Link
                                to={Path.LOGIN}
                                className="mt-5 flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-indigo-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;