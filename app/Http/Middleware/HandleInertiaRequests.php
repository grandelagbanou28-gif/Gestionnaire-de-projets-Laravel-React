<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\App;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $locale = $request->user()?->locale ?? $request->session()->get('locale', 'en');
        App::setLocale($locale);

        return [
            ...parent::share($request),
            'locale' => $locale,
            'translations' => $this->getTranslations($locale),
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }

    private function getTranslations(string $locale): array
    {
        $path = base_path("lang/{$locale}.json");
        return file_exists($path) ? json_decode(file_get_contents($path), true) : [];
    }
}