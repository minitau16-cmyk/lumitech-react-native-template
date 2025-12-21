import { EventEmitterServiceImpl } from './EventEmitterService';
import { ExceptionServiceImpl } from './ExceptionService';
import { KeyboardServiceImpl } from './KeyboardService';
import { Container, registerServices } from './lib';
import { LocalizationServiceImpl } from './LocalizationService';
import { ModalServiceImpl } from './ModalService';
import { RouteServiceImpl } from './RouteService';
import { StorageServiceImpl } from './StorageService';
import { ToastServiceImpl } from './ToastService';

export { type StorageKey } from './StorageService';
export { type ModalNames } from './ModalService';

export const getServices = () => {
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
};
