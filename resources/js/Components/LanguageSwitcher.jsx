import { usePage, router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';

const languages = {
    en: { label: 'EN', flag: '🇬🇧', name: 'English' },
    fr: { label: 'FR', flag: '🇫🇷', name: 'French' },
};

export default function LanguageSwitcher() {
    const { locale } = usePage().props;
    const { t } = useTranslation();

    const switchLang = (code) => {
        if (code !== locale) {
            router.post(route('locale.switch', code));
        }
    };

    return (
        <div className="flex items-center gap-1">
            {Object.entries(languages).map(([code, lang]) => (
                <button
                    key={code}
                    type="button"
                    onClick={() => switchLang(code)}
                    className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                        locale === code
                            ? 'bg-omni-100 text-omni-700 dark:bg-omni-900/50 dark:text-omni-300'
                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                    title={lang.name}
                >
                    <span className="text-base leading-none">{lang.flag}</span>
                </button>
            ))}
        </div>
    );
}