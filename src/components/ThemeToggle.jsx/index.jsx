import { useSyncExternalStore } from 'react';
import { useTranslation } from 'next-i18next/pages';
import { useTheme } from '@/context/ThemeContext';
import Sun from '@/components/icons/Sun';
import Moon from '@/components/icons/Moon';
import Desktop from '../icons/Desktop';
import ButtonWithIcon from '../common/button/ButtonWithIcon';

const subscribe = () => () => { };

export const ThemeToggle = ({ className, iconClassName }) => {
    const { theme, toggleTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);

    const { t } = useTranslation('translation');
    const iconClasses = `${iconClassName} w-4 h-4 text-primary`;
    const THEME_LABELS = { dark: t('theme.switchToLight'), light: t('theme.switchToSystem'), system: t('theme.switchToDark') };

    return (
        <ButtonWithIcon className={className} onClick={toggleTheme} ariaLabel={mounted ? (THEME_LABELS[theme] ?? t('theme.toggle')) : t('theme.toggle')}>
            {mounted && theme === 'dark' && <Moon className={iconClasses} />}
            {mounted && theme === 'light' && <Sun className={iconClasses} />}
            {mounted && theme === 'system' && <Desktop className={iconClasses} />}
        </ButtonWithIcon>
    );
};

export default ThemeToggle;