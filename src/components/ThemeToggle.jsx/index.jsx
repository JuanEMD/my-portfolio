'use client';
import { useSyncExternalStore } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Sun from '@/components/icons/Sun';
import Moon from '@/components/icons/Moon';
import ButtonWithIcon from '../common/button/ButtonWithIcon';
import Desktop from '../icons/Desktop';

const subscribe = () => () => { };

export const ThemeToggle = ({ className, iconClassName }) => {
    const { theme, toggleTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);

    const iconClasses = `${iconClassName} w-4 h-4 text-primary`;

    return (
        <ButtonWithIcon className={className} onClick={toggleTheme}>
            {mounted && theme === 'dark' && <Moon className={iconClasses} />}
            {mounted && theme === 'light' && <Sun className={iconClasses} />}
            {mounted && theme === 'system' && <Desktop className={iconClasses} />}
        </ButtonWithIcon>
    );
};

export default ThemeToggle;