import { authFormStore$ } from './auth-observable';
import { LoginInSchema, type LoginValues } from './config';

export const authFormActions = {
  setFormField<K extends keyof LoginValues>(field: K, value: LoginValues[K]) {
    authFormStore$.formFields.assign({
      [field]: value,
    } as Partial<LoginValues>);
  },

  setFormFields(fields: Partial<LoginValues>) {
    authFormStore$.formFields.assign(fields);
  },

  setFieldError(field: 'email' | 'password', error: string) {
    authFormStore$.errors[field].set(error);
  },

  setErrors(errors: { email?: string; password?: string }) {
    authFormStore$.errors.assign(errors);
  },

  clearErrors() {
    authFormStore$.errors.set({ email: '', password: '' });
  },

  markAsSubmitted() {
    authFormStore$.didSubmit.set(true);
  },

  resetSubmitState() {
    authFormStore$.didSubmit.set(false);
  },

  toggleSecureMode() {
    authFormStore$.isSecureModeEnabled.toggle();
  },

  toggleRememberMe() {
    authFormStore$.formFields.rememberMe.toggle();
  },

  validateForm(): boolean {
    const formData = authFormStore$.formFields.get();

    const result = LoginInSchema.safeParse(formData);

    if (result.success) {
      this.clearErrors();

      return true;
    }

    const { fieldErrors } = result.error.flatten();

    this.setErrors({
      email: fieldErrors.email?.[0] ?? '',
      password: fieldErrors.password?.[0] ?? '',
    });

    return false;
  },

  getFormValues(): LoginValues {
    return authFormStore$.formFields.get();
  },

  resetForm() {
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
  },
};
