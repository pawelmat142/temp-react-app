import React from 'react';
import { Path } from '../utils/path';
import PrimaryBtn from '../components/buttons/PrimaryBtn';
import SecondaryBtn from '../components/buttons/SecondaryBtn';
import PrimaryTextBtn from '../components/buttons/PrimaryTextBtn';
import UserService from '../services/user.service';

const Register: React.FC = () => {

    const userService = UserService;

    
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
                    <PrimaryBtn to={Path.MAIL_REGISTER} className="w-full flex items-center justify-center gap-2">
                        {/* Bezpośrednio SVG zamiast <img src=...> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.876 1.797l-7.5 6a2.25 2.25 0 01-2.748 0l-7.5-6A2.25 2.25 0 012.25 6.993V6.75" />
                        </svg>
                        Register with Email
                    </PrimaryBtn>
                    <SecondaryBtn
                        onClick={userService.handleGoogleRegister}
                        className="w-full gap-2 mt-5"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="h-5 w-5"
                        />
                        Register with Google
                    </SecondaryBtn>
                    <SecondaryBtn
                        onClick={userService.handleGitHubRegister}
                        className="w-full gap-2 mt-5">
                        <img
                            src="https://www.svgrepo.com/show/512317/github-142.svg"
                            alt="GitHub"
                            className="h-5 w-5"
                        />
                        Register with GitHub
                    </SecondaryBtn>

                    <PrimaryTextBtn to={Path.LOGIN} className='mt-5'>
                        Already have an account? Sign in
                    </PrimaryTextBtn>

                    <PrimaryTextBtn to={Path.HOME}>
                        Back to Home
                    </PrimaryTextBtn>
                </div>
            </div>
        </div>
    );
};

export default Register;
