'use client';
import { useSyncExternalStore } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Sun from '@/components/icons/Sun';
import Moon from '@/components/icons/Moon';
import ButtonWithIcon from '../common/button/ButtonWithIcon';
import Desktop from '../icons/Desktop';

const subscribe = () => () => { };

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);

    return (
        <ButtonWithIcon onClick={toggleTheme}>
            {mounted && theme === 'dark' && <Moon className="w-4 h-4 text-primary" />}
            {mounted && theme === 'light' && <Sun className="w-4 h-4 text-primary" />}
            {mounted && theme === 'system' && <Desktop className="w-4 h-4 text-primary" />}
        </ButtonWithIcon>
    );
};

export default ThemeToggle;