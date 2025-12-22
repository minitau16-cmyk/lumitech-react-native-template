import { toast } from 'sonner-native';
import { LightTheme } from 'themes';
import { ViewStyle } from 'react-native';
import { Injectable } from '../lib';

export interface ToastParams {
  position?: 'top-center' | 'bottom-center';
  title: string;
  description?: string;
}

export interface ToastService {
  onSuccess(params: ToastParams): void;
  onDanger(params: ToastParams): void;
  onWarning(params: ToastParams): void;
  onHide(): void;
}

@Injectable()
export class ToastServiceImpl implements ToastService {
  private readonly style: ViewStyle;

  private readonly duration = 3500;

  constructor() {
    this.style = {
      shadowOffset: {
        height: 1,
        width: 2,
      },
      shadowOpacity: 0.2,
      elevation: 5,
      borderRadius: 22,
      shadowColor: LightTheme.colors.basic_100,
    };
  }

  onSuccess({ position, title, description }: ToastParams): void {
    toast.success(title, {
      position,
      description,
      style: this.style,
      styles: {
        title: {
          fontFamily: LightTheme.fonts.Regular,
        },
      },
      duration: this.duration,
      closeButton: true,
    });
  }

  onDanger({ position, title, description }: ToastParams): void {
    toast.error(title, {
      position,
      description,
      style: this.style,
      styles: {
        title: {
          fontFamily: LightTheme.fonts.Regular,
        },
      },
      duration: this.duration,
      closeButton: true,
    });
  }

  onWarning({ position, title, description }: ToastParams): void {
    toast.warning(title, {
      position,
      description,
      style: this.style,
      styles: {
        title: {
          fontFamily: LightTheme.fonts.Regular,
        },
      },
      duration: this.duration,
      closeButton: true,
    });
  }

  onHide(): void {
    toast.dismiss();
  }
}
