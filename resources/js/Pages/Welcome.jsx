import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-indigo-600 selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                <svg className="h-12 w-auto text-indigo-600 lg:h-16" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="2" width="56" height="56" rx="14" stroke="currentColor" strokeWidth="3" fill="none" />
                                    <circle cx="30" cy="30" r="14" stroke="currentColor" strokeWidth="3" fill="none" />
                                    <text x="62" y="42" fontFamily="Inter, system-ui, sans-serif" fontSize="34" fontWeight="700" fill="currentColor" letterSpacing="-0.5">OmniTask</text>
                                </svg>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="text-center max-w-2xl mx-auto">
                                <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
                                    Gérez vos projets en toute simplicité
                                </h1>
                                <p className="text-lg text-black/60 dark:text-white/60 mb-8">
                                    OmniTask vous permet de créer, organiser et suivre vos projets et tâches en équipe, le tout dans une interface moderne et réactive.
                                </p>
                                {!auth.user && (
                                    <div className="flex gap-4 justify-center">
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                                        >
                                            Commencer
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                                        >
                                            Connexion
                                        </Link>
                                    </div>
                                )}
                                {auth.user && (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        Tableau de bord
                                    </Link>
                                )}
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black/50 dark:text-white/50">
                            OmniTask v1.0 — PHP v{phpVersion}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
