'use client'

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild
} from '@headlessui/react'
import { Link } from 'react-router-dom';
import {
  XMarkIcon,
} from '@heroicons/react/24/outline'
import fs from '../services/firebase';
import { toast } from 'react-toastify';
import { Util } from '../utils/util';
import { Path } from '../utils/path';
import PrimaryTextBtn from '../components/buttons/PrimaryTextBtn';
import { useUserContext } from '../providers/UserProvider';
import AvatarItem from '../components/AvatarItem';
import IconButton from '../components/buttons/IconBtn';

interface NavItem {
    to?: string;
    onClick?: () => void;
    label: string;
    authGuard?: boolean; 
    authSkip?: boolean; 
    skipHeader?: boolean
}

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const { user } = useUserContext()

    const NAV_ITEMS: NavItem[] = [
        { to: Path.HOME, label: "Home" },
        { to: Path.ADD_POST, label: "Add Post", authGuard: true },
        { to: Path.POSTS, label: "Posts", authGuard: true },
        { to: Path.LOGIN, label: "Sign in", authSkip: true, skipHeader: true },
        { to: Path.SETTINGS, label: "Settings", authGuard: true },
        { to: Path.USERS, label: "Users", authGuard: true },
        { onClick: () => handleLogout(), label: "Logout", authGuard: true, skipHeader: true },
    ]
        .filter(item => !item.authGuard || user)
        .filter(item => !item.authSkip || !user)

    const handleLogout = async () => {
        try {
            await signOut(fs.auth);
            setTimeout(() => {
                toast.info('Logged out successfully');
            }, 100)
            window.location.href = Path.HOME

        } catch (error) {
            toast.error(Util.prepareErrorMsg(error, 'Failed to log out. Please try again.'))
        }
    };

    return (
        <header className="primary-bg">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to={Path.HOME} className="-m-1.5 p-1.5">
                        <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                <div className="hidden lg:flex lg:gap-x-12">
                    {NAV_ITEMS
                        .filter(item => !item.skipHeader)
                        .map(item => {
                        if (item.to) {
                            return (
                                <Link key={item.to} to={item.to} className="text-sm/6 font-semibold primary-text">
                                    {item.label}
                                </Link>
                            )
                        }
                        if (item.onClick) {
                            return (
                                <button
                                    key={item.label}
                                    onClick={item.onClick}
                                    className="text-sm/6 font-semibold primary-text bg-transparent border-none p-0 cursor-pointer"
                                >
                                    {item.label}
                                </button>
                            )
                        }
                        return ''
                    })}
                </div>
                
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 primary-text"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                        </svg>
                    </button>

                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {user ? (
                        <div className="flex items-center gap-2">
                            {/* Avatar */}
                            <AvatarItem 
                                photoUrl={user.userInfo?.photoURL || ''}
                                avatar={user.avatar}
                                className='small'
                            ></AvatarItem>
                            {(user?.displayName || user?.name) && (
                                <span className="text-sm/6 font-semibold primary-text">
                                    {user.displayName || user.name}
                                </span>
                            )}
                            <IconButton onClick={handleLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                </svg>
                            </IconButton>
                        </div>
                    ) : (
                        <PrimaryTextBtn to={Path.LOGIN} fullWidth={false}>
                            Sign in <span aria-hidden="true">&rarr;</span>
                        </PrimaryTextBtn>
                    ) }
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative lg:hidden">
                <TransitionChild
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <DialogBackdrop
                        className="fixed inset-0 bg-gray-500/75"
                    />
                </TransitionChild>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <TransitionChild
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel
                                    transition
                                    className="pointer-events-auto relative w-screen max-w-md transform transition duration-300 ease-in-out data-closed:translate-x-full sm:duration-300"
                                >
                                    <div className="flex h-full flex-col primary-bg shadow-xl">
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <Link to={Path.HOME} className="-m-1.5 p-1.5">
                                                <span className="sr-only">Your Company</span>
                                                <img
                                                    alt=""
                                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                                    className="h-8 w-auto"
                                                />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="-m-2.5 rounded-md p-2.5 primary-text">
                                                    <span className="sr-only">Close menu</span>
                                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                                </button>
                                            </div>

                                            <div className="mt-6 flow-root">
                                                <div className="-my-6 divide-y divide-gray-500/10">
                                                    <div className="py-6">
                                                        <div className="flex items-center gap-3 px-3 py-2 mb-4 w-100">
                                                            {user ? (
                                                                <div className="flex items-center gap-2 justify-between w-100 flex-1">

                                                                    <div className="flex items-center gap-3">
                                                                        <AvatarItem 
                                                                            photoUrl={user.userInfo?.photoURL || ''}
                                                                            avatar={user.avatar}
                                                                            className='small'
                                                                        ></AvatarItem>
                                                                        {(user?.displayName || user?.name) && (
                                                                            <span className="text-sm/6 font-semibold primary-text">
                                                                                {user.displayName || user.name}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ) : '' }
                                                        </div>
                                                    {NAV_ITEMS
                                                        .map(item => {
                                                            if (item.to) {
                                                                return (
                                                                    <Link
                                                                        key={item.to}
                                                                        to={item.to}
                                                                        onClick={() => setMobileMenuOpen(false)}
                                                                        className="flex justify-between gap-x-6 py-3 cursor-pointer secondary-bg rounded-lg shadow mb-2 px-4 items-center font-semibold primary-text"
                                                                    >
                                                                        {item.label}
                                                                    </Link>
                                                                )
                                                            }
                                                            if (item.onClick) {
                                                                return (
                                                                    <button
                                                                        key={item.label}
                                                                        onClick={() => {
                                                                            item.onClick?.();
                                                                            setMobileMenuOpen(false);
                                                                        }}
                                                                        className="flex w-full justify-between gap-x-6 py-3 cursor-pointer secondary-bg rounded-lg shadow mb-2 px-4 items-center font-semibold primary-text"
                                                                    >
                                                                        {item.label}
                                                                    </button>
                                                                )
                                                            }
                                                            return ''
                                                        })}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>

        </header>
    )
}

export default Header;
