import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Path } from '../utils/path';
import { Util } from '../utils/util';
import fs from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import PrimaryTextBtn from '../components/buttons/PrimaryTextBtn';
import PrimaryBtn from '../components/buttons/PrimaryBtn';


const MailLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await fs.loginUser(email, password)
            toast.success('Signed in successfully!')
            navigate(Path.POSTS)
        } catch (err) {
            toast.error(Util.prepareErrorMsg(err, 'Failed to log in. Please check your credentials'))
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
                    Sign in to your account
                </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6">
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
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium primary-text">
                        Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-md primary-bg px-3 py-1.5 text-base primary-text primary-color-control sm:text-sm/6"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    </div>

                    <div className='mt-5'>
                        <PrimaryBtn type="submit" className='mt-10'>Sign in</PrimaryBtn>
                        <PrimaryTextBtn to={Path.LOGIN} className='mt-5'>
                            Back to Register
                        </PrimaryTextBtn>
                    </div>
                </form>

                </div>
            </div>
        </div>
        
    );
};

export default MailLogin;