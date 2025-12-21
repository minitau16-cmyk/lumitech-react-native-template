import { Injectable } from '../lib';
import { TypedEventEmitter } from './models';

export type EventEmitterService = TypedEventEmitter;

@Injectable()
export class EventEmitterServiceImpl extends TypedEventEmitter {}

export { EVENT_EMITTER_ACTIONS } from './models';
