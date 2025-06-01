import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Path } from '../utils/path';
import { Util } from '../utils/util';
import fs from '../services/firebase';
import PrimaryTextBtn from '../components/buttons/PrimaryTextBtn';
import PrimaryBtn from '../components/buttons/PrimaryBtn';

const MailRegister: React.FC = () => {
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
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight primary-text">
                        Register a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium primary-text">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md primary-bg px-3 py-1.5 text-base primary-text primary-color-control sm:text-sm/6"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="repeat-email" className="block text-sm/6 font-medium primary-text">
                                Repeat email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="repeat-email"
                                    name="repeat-email"
                                    type="email"
                                    value={repeatEmail}
                                    onChange={(e) => setRepeatEmail(e.target.value)}
                                    className="block w-full rounded-md primary-bg px-3 py-1.5 text-base primary-text primary-color-control sm:text-sm/6"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium primary-text">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md primary-bg px-3 py-1.5 text-base primary-text primary-color-control sm:text-sm/6"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="repeat-password" className="block text-sm/6 font-medium primary-text">
                                Repeat password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="repeat-password"
                                    name="repeat-password"
                                    type="password"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    className="block w-full rounded-md primary-bg px-3 py-1.5 text-base primary-text primary-color-control sm:text-sm/6"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        <div>
                            <PrimaryBtn type="submit" className='mt-5'>
                                Register
                            </PrimaryBtn>
                            <PrimaryTextBtn to={Path.REGISTER} className='mt-2'>
                                Back to Register
                            </PrimaryTextBtn>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MailRegister;