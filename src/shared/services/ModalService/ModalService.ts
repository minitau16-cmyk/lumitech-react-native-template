import { modalfy } from 'react-native-modalfy';
import { Injectable } from '../lib';
import { ModalNames, ModalStackParams } from './models';

export interface ModalService {
  open<T extends ModalNames>(name: T, params?: ModalStackParams[T]): void;
  close<T extends ModalNames>(name: T, callback?: () => void): void;
  closeAllModals(): void;
}

@Injectable()
export class ModalServiceImpl implements ModalService {
  private readonly modal = modalfy();

  open<T extends ModalNames>(name: T, params?: ModalStackParams[T]): void {
    this.modal.openModal(name, params);
  }

  close<T extends ModalNames>(name: T, callback?: () => void): void {
    this.modal.closeModal(name, callback);
  }

  closeAllModals(): void {
    this.modal.closeAllModals();
  }
}
