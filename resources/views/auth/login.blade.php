<x-guest-layout>
    <x-jet-authentication-card>
        <x-slot name="logo" >
            <div style="transform: scale(2); margin-bottom: 25px">
{{--            <x-jet-authentication-card-logo />--}}
                <a href="/"><x-jet-application-logo class="block h-9 w-auto " /></a>
            </div>
        </x-slot>

        <x-jet-validation-errors class="mb-4" />

        @if (session('status'))
            <div class="mb-4 font-medium text-sm text-green-600">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <div>
            <!-- <x-jet-label for="email" value="{{ __('E-mail woe') }}" /> -->
                <x-jet-input id="email" class="block mt-1 w-full" type="email" name="email" placeholder="E-mail" :value="old('email')" required autofocus />
            </div>

            <div class="mt-4">
            <!-- <x-jet-label for="password" value="{{ __('Passwordíček plz') }}" /> -->
                <x-jet-input id="password" class="block mt-1 w-full" type="password" name="password" placeholder="Heslo" required autocomplete="current-password" />
            </div>

            <div class="block mt-4">
                <label for="remember_me" class="flex items-center">
                    <input id="remember_me" type="checkbox" class="form-checkbox" name="remember">
                    <span class="ml-2 text-sm text-gray-600">{{ __('Zapamatovat si mě?') }}</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                <x-jet-button class="ml-4">
                    {{ __('Přihlásit') }}
                </x-jet-button>
            </div>

            <div class="flex items-center justify-end mt-4">
                    <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('register') }}"">
                        {{ __('Nemáte účet? Zaregistrujte se!') }}
                    </a>
            </div>

            <div class="flex items-center justify-end mt-4">
                @if (Route::has('password.request'))
                    <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('password.request') }}">
                        {{ __('Zapomenuté heslo') }}
                    </a>
                @endif
            </div>
        </form>
    </x-jet-authentication-card>
</x-guest-layout>
