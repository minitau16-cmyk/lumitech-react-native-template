import { EventEmitter } from 'eventemitter3';

export const EVENT_EMITTER_ACTIONS = {
  LOGOUT: 'LOGOUT',
} as const;

export type EmitterActionsType = keyof typeof EVENT_EMITTER_ACTIONS;

export type EventPayloads = {
  [EVENT_EMITTER_ACTIONS.LOGOUT]: [];
};

export class TypedEventEmitter extends EventEmitter<EventPayloads> {}

export const eventEmitter = new TypedEventEmitter();
