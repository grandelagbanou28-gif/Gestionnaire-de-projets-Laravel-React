import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useTranslation } from '@/hooks/useTranslation';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const { t } = useTranslation();
    const photoInput = useRef();
    const [photoPreview, setPhotoPreview] = useState(null);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    const selectNewPhoto = () => {
        photoInput.current.click();
    };

    const updatePhotoPreview = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setPhotoPreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    const uploadPhoto = () => {
        const file = photoInput.current?.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('photo', file);
        router.post(route('profile.photo.update'), formData, {
            preserveScroll: true,
            onSuccess: () => {
                photoInput.current.value = '';
                setPhotoPreview(null);
            },
        });
    };

    const deletePhoto = () => {
        router.delete(route('profile.photo.destroy'), {
            preserveScroll: true,
            onSuccess: () => setPhotoPreview(null),
        });
    };

    const currentAvatar = user.avatar_url || null;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('Profile Information')}</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t("Update your account's profile information and email address.")}
                </p>
            </header>

            <div className="mt-6">
                <InputLabel value={t('Photo')} />
                <div className="mt-2 flex items-center gap-6">
                    <div className="relative">
                        <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 ring-2 ring-gray-200 dark:ring-gray-600">
                            {photoPreview ? (
                                <img src={photoPreview} alt="" className="h-full w-full object-cover" />
                            ) : currentAvatar ? (
                                <img src={currentAvatar} alt="" className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <input
                            ref={photoInput}
                            type="file"
                            accept="image/*"
                            onChange={updatePhotoPreview}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={selectNewPhoto}
                            className="text-sm font-medium text-omni-600 dark:text-omni-400 hover:text-omni-500 transition-colors"
                        >
                            {t('Upload a new photo')}
                        </button>
                        {(currentAvatar || photoPreview) && (
                            <button
                                type="button"
                                onClick={deletePhoto}
                                className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 transition-colors"
                            >
                                {t('Remove photo')}
                            </button>
                        )}
                        {photoPreview && (
                            <PrimaryButton type="button" onClick={uploadPhoto} className="text-xs !py-1 !px-3">
                                {t('Save')}
                            </PrimaryButton>
                        )}
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value={t('Name')} />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t('Email')} />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>{t('Save')}</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('Saved.')}</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}