import { authFormStore$ } from './auth-observable';

export const useDidSubmit$ = () => authFormStore$.didSubmit;

export const useEmailField$ = () => authFormStore$.formFields.email;

export const usePasswordField$ = () => authFormStore$.formFields.password;

export const useRememberMeField$ = () => authFormStore$.formFields.rememberMe;

export const useIsSecureModeEnabled$ = () => authFormStore$.isSecureModeEnabled;

export const useEmailError$ = () => authFormStore$.emailError;

export const usePasswordError$ = () => authFormStore$.passwordError;

export const useIsEmailError$ = () => authFormStore$.isEmailError;

export const useIsPasswordError$ = () => authFormStore$.isPasswordError;
