import { DateValue } from './date';
import { TimeRange } from './time';

export type EventMode = 'datetime' | 'date-only';

export interface EventData {
  nanoid: string;
  title: string;
  mode: EventMode;
  availableDates: DateValue[];
  availableTimes: TimeRange[];
}

export interface SerializedEventData {
  nanoid: string;
  title: string;
  mode: EventMode;
  availableDates: string[];
  availableTimes: string[];
}

export function parseEventData(e: SerializedEventData): EventData {
  return {
    nanoid: e.nanoid,
    title: e.title,
    mode: e.mode || 'datetime',
    availableDates: e.availableDates.map(d => DateValue().fromString(d))
      .sort((a, b) => a.laterThan(b) ? 1 : -1),
    availableTimes: e.availableTimes.map(t => TimeRange().fromString(t))
      .sort((a, b) => a.laterThan(b) ? 1 : -1)
  };
}
