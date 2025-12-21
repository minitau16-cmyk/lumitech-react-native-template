import { observable, syncState } from '@legendapp/state';
import { persistObservable } from 'stores';
import { LoginValues } from './config';

interface AuthFormStore {
  formFields: LoginValues;
  errors: {
    email: string;
    password: string;
  };
  isSecureModeEnabled: boolean;
  didSubmit: boolean;
  // Computed fields
  emailError: string;
  passwordError: string;
  isEmailError: boolean;
  isPasswordError: boolean;
}

export const authFormStore$ = observable<AuthFormStore>({
  formFields: {
    email: '',
    password: '',
    rememberMe: false,
    isFaceIdEnabled: false,
  },
  errors: {
    email: '',
    password: '',
  },
  isSecureModeEnabled: true,
  didSubmit: false,
  // Computed fields
  emailError: (): string => {
    return authFormStore$.didSubmit.get()
      ? authFormStore$.errors.email.get()
      : '';
  },
  passwordError: (): string => {
    return authFormStore$.didSubmit.get()
      ? authFormStore$.errors.password.get()
      : '';
  },
  isEmailError: (): boolean => {
    return (
      authFormStore$.didSubmit.get() && !!authFormStore$.errors.email.get()
    );
  },
  isPasswordError: (): boolean => {
    return (
      authFormStore$.didSubmit.get() && !!authFormStore$.errors.password.get()
    );
  },
});

persistObservable(authFormStore$, 'AUTH_REMEMBER_ME_FIELDS');

const useFormSyncState$ = syncState(authFormStore$);

export const resetAuthFormPersist = async () => {
  await useFormSyncState$.resetPersistence();

  authFormStore$.formFields.set({
    email: '',
    password: '',
    rememberMe: false,
    isFaceIdEnabled: false,
  });
  authFormStore$.errors.set({
    email: '',
    password: '',
  });
  authFormStore$.isSecureModeEnabled.set(true);
  authFormStore$.didSubmit.set(false);
};

export const useAuthFormStore = () => authFormStore$;
