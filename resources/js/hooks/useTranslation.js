import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { translations } = usePage().props;

    const t = (key, fallback) => {
        return translations?.[key] ?? fallback ?? key;
    };

    return { t };
}