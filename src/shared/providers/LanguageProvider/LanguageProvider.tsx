import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useServices } from 'providers/ServiceProvider';
import { useCurrentLanguage$ } from '../../stores';

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentLanguage$ = useCurrentLanguage$();
  const { localization: localizationService } = useServices();

  useEffect(() => {
    const initializeLanguage = () => {
      const currentLanguage = currentLanguage$.get();

      localizationService.changeLanguage(currentLanguage);
    };

    initializeLanguage();
  }, []);

  return (
    <I18nextProvider i18n={localizationService.i18n}>
      {children}
    </I18nextProvider>
  );
};
