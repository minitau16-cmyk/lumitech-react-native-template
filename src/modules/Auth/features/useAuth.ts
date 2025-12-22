import { useObserve } from '@legendapp/state/react';
import { useServices } from 'providers';
import { useSignIn } from './useSignIn';
import {
  authFormActions,
  useDidSubmit$,
  useEmailField$,
  usePasswordField$,
  useIsSecureModeEnabled$,
  useEmailError$,
  usePasswordError$,
  useIsEmailError$,
  useIsPasswordError$,
} from '../stores';

export const useAuth = () => {
  const didSubmit$ = useDidSubmit$();

  const { keyboard: keyboardService } = useServices();

  const { onSignIn, isLoading$ } = useSignIn();

  useObserve(() => {
    if (!didSubmit$.get()) {
      return;
    }

    authFormActions.validateForm();
  });

  const onSubmit = () => {
    keyboardService.dismiss();

    authFormActions.markAsSubmitted();

    if (!authFormActions.validateForm()) {
      return;
    }

    const { email, password } = authFormActions.getFormValues();

    onSignIn({ email, password });
  };

  return {
    onSubmit,
    isLoading$,
    authFormActions,
    emailField$: useEmailField$(),
    passwordField$: usePasswordField$(),
    isSecureModeEnabled$: useIsSecureModeEnabled$(),
    emailError$: useEmailError$(),
    passwordError$: usePasswordError$(),
    isEmailError$: useIsEmailError$(),
    isPasswordError$: useIsPasswordError$(),
  };
};
