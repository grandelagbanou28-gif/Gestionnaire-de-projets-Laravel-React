<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;

class LocaleController extends Controller
{
    public function switch(string $locale): RedirectResponse
    {
        if (!in_array($locale, ['en', 'fr'])) {
            $locale = 'en';
        }

        if (auth()->check()) {
            $user = auth()->user();
            $user->locale = $locale;
            $user->save();
        }

        App::setLocale($locale);
        session()->put('locale', $locale);

        return Redirect::back();
    }
}