import {
  CommonActions,
  createNavigationContainerRef,
  DrawerActions,
  NavigationContainerRefWithCurrent,
  StackActions,
} from '@react-navigation/native';
import { Injectable } from '../lib';
import { RootStackParamList, RouteType } from './models';

export interface RouteService {
  readonly navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>;
  navigate<T extends RouteType>(name: T, params?: RootStackParamList[T]): void;
  goBack(): void;
  pop(screenCount?: number): void;
  popToTop(): void;
  push<T extends RouteType>(name: T, params?: RootStackParamList[T]): void;
  reset<T extends RouteType>(name: T, params?: RootStackParamList[T]): void;
  replace<T extends RouteType>(name: T, params?: RootStackParamList[T]): void;
  openDrawer(): void;
  closeDrawer(): void;
  setParams(params: object): void;
  navigateToNestedNavigatorScreen<N extends RouteType, S extends RouteType>(
    navigator: N,
    screen: S,
    params?: RootStackParamList[S],
  ): void;
}

@Injectable()
export class RouteServiceImpl implements RouteService {
  readonly navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>;

  constructor() {
    this.navigationRef = createNavigationContainerRef<RootStackParamList>();
  }

  navigate<T extends RouteType>(name: T, params?: RootStackParamList[T]): void {
    if (this.navigationRef?.current) {
      this.navigationRef.current?.dispatch(
        CommonActions.navigate({ name, params }),
      );
    }
  }

  openDrawer(): void {
    if (this.navigationRef?.current) {
      this.navigationRef.current?.dispatch(DrawerActions.openDrawer());
    }
  }

  closeDrawer(): void {
    if (this.navigationRef?.current) {
      this.navigationRef.current?.dispatch(DrawerActions.closeDrawer());
    }
  }

  goBack(): void {
    if (
      this.navigationRef?.current &&
      this.navigationRef.current?.canGoBack()
    ) {
      this.navigationRef.current?.dispatch(CommonActions.goBack());
    }
  }

  pop(screenCount?: number): void {
    if (
      this.navigationRef?.current &&
      this.navigationRef.current?.canGoBack()
    ) {
      this.navigationRef.current?.dispatch(StackActions.pop(screenCount));
    }
  }

  popToTop(): void {
    if (
      this.navigationRef?.current &&
      this.navigationRef.current?.canGoBack()
    ) {
      this.navigationRef.current?.dispatch(StackActions.popToTop());
    }
  }

  push<T extends RouteType>(name: T, params?: RootStackParamList[T]): void {
    if (this.navigationRef?.current) {
      this.navigationRef.current?.dispatch(StackActions.push(name, params));
    }
  }

  setParams(params: object): void {
    this.navigationRef.current?.dispatch(CommonActions.setParams(params));
  }

  replace<T extends RouteType>(name: T, params?: RootStackParamList[T]): void {
    if (this.navigationRef?.current) {
      this.navigationRef.current?.dispatch(StackActions.replace(name, params));
    }
  }

  reset<T extends RouteType>(name: T, params?: RootStackParamList[T]): void {
    if (this.navigationRef?.current) {
      this.navigationRef.current.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name, params }],
        }),
      );
    }
  }

  navigateToNestedNavigatorScreen<N extends RouteType, S extends RouteType>(
    navigator: N,
    screen: S,
    params?: RootStackParamList[S],
  ): void {
    if (this.navigationRef?.current) {
      this.navigationRef.current?.dispatch(
        CommonActions.navigate(navigator, { screen, params }),
      );
    }
  }
}
