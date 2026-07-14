<?php

return [
    'name' => 'required|string|max:255',
    'email' => 'required|email|max:255|unique:users,email',
    'password' => 'required|string|min:8|confirmed',
    'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:2048',
    'locale' => 'nullable|in:en,fr',
];
