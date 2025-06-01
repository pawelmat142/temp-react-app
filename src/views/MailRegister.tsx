import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Path } from '../utils/path';
import { Util } from '../utils/util';
import PrimaryTextBtn from '../components/buttons/PrimaryTextBtn';
import PrimaryBtn from '../components/buttons/PrimaryBtn';
import LabeledInput from '../components/form/LabeledInput';
import UserService from '../services/user.service';

const MailRegister: React.FC = () => {
    const [email, setEmail] = useState('');
    const [repeatEmail, setRepeatEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [name, setName] = useState('');

    const userService = UserService

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name.trim()) {
            toast.error('Name is required.');
            return;
        }
        if (email !== repeatEmail) {
            toast.error('Emails do not match.');
            return;
        }
        if (password !== repeatPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        try {
            await userService.handleEmailRegister(email, password, name);
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
                        <LabeledInput
                            id="name"
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            autoComplete="name"
                        />
                        <LabeledInput
                            id="email"
                            label="Email address"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                        <LabeledInput
                            id="repeat-email"
                            label="Repeat email address"
                            type="email"
                            value={repeatEmail}
                            onChange={e => setRepeatEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                        <LabeledInput
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <LabeledInput
                            id="repeat-password"
                            label="Repeat password"
                            type="password"
                            value={repeatPassword}
                            onChange={e => setRepeatPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <div>
                            <PrimaryBtn type="submit" className='mt-10'>
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