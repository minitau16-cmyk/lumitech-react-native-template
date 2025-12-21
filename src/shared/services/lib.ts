/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-style */

import 'reflect-metadata';

type Constructor<T = any> = new (...args: any[]) => T;

export class Container {
  private static instance: Container;

  private services: Map<Constructor, any> = new Map();

  private constructor() {}

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }

    return Container.instance;
  }

  register<T>(target: Constructor<T>): void {
    if (!this.services.has(target)) {
      const instance = this.resolve(target);

      this.services.set(target, instance);
    }
  }

  resolve<T>(target: Constructor<T>): T {
    if (this.services.has(target)) {
      return this.services.get(target);
    }

    const paramTypes: Constructor[] =
      Reflect.getMetadata('design:paramtypes', target) || [];

    const dependencies = paramTypes.map(paramType => this.resolve(paramType));

    const instance = new target(...dependencies);

    this.services.set(target, instance);

    return instance;
  }

  clear(): void {
    this.services.clear();
  }
}

export function Injectable(): ClassDecorator {
  return (target: Function) => {};
}

let isRegistered = false;

export const registerServices = (): void => {
  if (isRegistered) {
    return;
  }

  const container = Container.getInstance();

  const { LocalizationServiceImpl } = require('./LocalizationService');
  const { StorageServiceImpl } = require('./StorageService');
  const { KeyboardServiceImpl } = require('./KeyboardService');
  const { ModalServiceImpl } = require('./ModalService');
  const { ToastServiceImpl } = require('./ToastService');
  const { RouteServiceImpl } = require('./RouteService');
  const { EventEmitterServiceImpl } = require('./EventEmitterService');
  const { ExceptionServiceImpl } = require('./ExceptionService');

  container.register(LocalizationServiceImpl);
  container.register(StorageServiceImpl);
  container.register(KeyboardServiceImpl);
  container.register(ModalServiceImpl);
  container.register(ToastServiceImpl);
  container.register(RouteServiceImpl);
  container.register(EventEmitterServiceImpl);

  container.register(ExceptionServiceImpl);

  isRegistered = true;
};
