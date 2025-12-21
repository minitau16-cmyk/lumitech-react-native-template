import 'react-native-modalfy';
import { type ModalStackParams, type ModalNames } from 'services';

declare module 'react-native-modalfy' {
  interface ModalfyCustomParams extends ModalStackParams {}

  type ModalName = ModalNames;
}
