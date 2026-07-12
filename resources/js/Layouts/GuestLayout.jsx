import ApplicationLogo from '@/Components/ApplicationLogo';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="auth-gradient">
            <div className="absolute top-4 right-4">
                <LanguageSwitcher />
            </div>

            <div className="animate-fade-in mb-6">
                <Link href="/" className="block transition-transform hover:scale-105 duration-200">
                    <ApplicationLogo className="w-48 h-14 text-omni-600 dark:text-omni-400" />
                </Link>
            </div>

            <div className="auth-card animate-slide-up">
                {children}
            </div>

            <p className="mt-8 text-xs text-gray-400 dark:text-gray-600 animate-fade-in">
                &copy; {new Date().getFullYear()} OmniTask. All rights reserved.
            </p>
        </div>
    );
}
 