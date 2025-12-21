import { KeyboardController } from 'react-native-keyboard-controller';
import { Injectable } from '../lib';

export interface KeyboardService {
  dismiss(): void;
  show(): void;
}

@Injectable()
export class KeyboardServiceImpl implements KeyboardService {
  dismiss(): void {
    KeyboardController.dismiss();
  }

  show(): void {
    KeyboardController.setFocusTo('prev');
  }
}
