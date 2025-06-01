import React, { useState } from 'react';
import { useUserContext } from '../providers/UserProvider';
import UserService from '../services/user.service';
import SettingItem from '../components/SettingItem';
import { toast } from 'react-toastify';

const Settings: React.FC = () => {
    const { user, loading } = useUserContext();
    const [visibleByStrangers, setVisibleByStrangers] = useState(
        user?.settings?.visibleByStrangers
    );
    const [saving, setSaving] = useState(false);

    // Dark mode state
    const [darkMode, setDarkMode] = useState<boolean>(localStorage.theme === 'dark');
    const [darkModeSaving, setDarkModeSaving] = useState(false);

    const switchVisibleByStrangers = async () => {
        if (!user) return;
        setSaving(true);
        const newValue = !visibleByStrangers;
        setVisibleByStrangers(newValue);
        await UserService.updateSettings(user.uid, {
            ...user.settings,
            visibleByStrangers: newValue,
        });
        setSaving(false);
    };

    const toggleDarkMode = () => {
        setDarkModeSaving(true);
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
            setDarkMode(false);
            toast.success('Ustawienia zostały zapisane.');
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
            setDarkMode(true);
        }
        setTimeout(() => setDarkModeSaving(false), 300); // UX: krótka blokada
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <svg
                    className="animate-spin h-8 w-8 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
            </div>
        );
    }

    return (
        <div className="settings-view max-w-xl mx-auto pb-20 px-5">
            <h2 className="mt-10 mb-10 text-center text-2xl/9 font-bold tracking-tight primary-text">
                Ustawienia
            </h2>
            <ul>
                <SettingItem
                    onClick={switchVisibleByStrangers}
                    icon={
                        <svg
                            className="h-6 w-6 text-green-600 dark:text-green-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                    }
                    title="Widoczny dla obcych"
                    description="Pozwól innym użytkownikom widzieć Twój profil."
                    toggleValue={visibleByStrangers}
                    toggleLoading={saving}
                    />
                <SettingItem
                    onClick={toggleDarkMode}
                    icon={
                        <svg
                            className="h-6 w-6 text-yellow-500 dark:text-yellow-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    }
                    title="Tryb ciemny"
                    description="Włącz lub wyłącz tryb ciemny interfejsu."
                    toggleValue={darkMode}
                    toggleLoading={darkModeSaving}
                />
            </ul>
        </div>
    );
};

export default Settings;
