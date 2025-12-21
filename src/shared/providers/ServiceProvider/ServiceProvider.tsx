import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { Container, registerServices } from 'services/lib';
import { KeyboardService, KeyboardServiceImpl } from 'services/KeyboardService';
import { ToastService, ToastServiceImpl } from 'services/ToastService';
import { ModalService, ModalServiceImpl } from 'services/ModalService';
import { StorageService, StorageServiceImpl } from 'services/StorageService';
import {
  ExceptionService,
  ExceptionServiceImpl,
} from 'services/ExceptionService';
import {
  LocalizationService,
  LocalizationServiceImpl,
} from 'services/LocalizationService';
import { RouteService, RouteServiceImpl } from 'services/RouteService';
import {
  EventEmitterService,
  EventEmitterServiceImpl,
} from 'services/EventEmitterService';

export interface Services {
  keyboard: KeyboardService;
  toast: ToastService;
  modal: ModalService;
  storage: StorageService;
  exception: ExceptionService;
  localization: LocalizationService;
  route: RouteService;
  eventEmitter: EventEmitterService;
}

const ServiceContext = createContext<Services | null>(null);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
}) => {
  const services = useMemo<Services>(() => {
    registerServices();

    const container = Container.getInstance();

    return {
      keyboard: container.resolve(KeyboardServiceImpl),
      toast: container.resolve(ToastServiceImpl),
      modal: container.resolve(ModalServiceImpl),
      storage: container.resolve(StorageServiceImpl),
      exception: container.resolve(ExceptionServiceImpl),
      localization: container.resolve(LocalizationServiceImpl),
      route: container.resolve(RouteServiceImpl),
      eventEmitter: container.resolve(EventEmitterServiceImpl),
    };
  }, []);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = (): Services => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error('useServices must be used within ServiceProvider');
  }

  return context;
};
