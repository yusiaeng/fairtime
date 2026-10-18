
import type { Participant, MeetingSlot } from "./types";

// Converts "09:30" into 570 minutes after midnight.
function toMinutes(time: string): number {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    throw new Error(`Invalid time: ${time}`);
  }

  const parts = time.split(":");

const hours = Number(parts[0]);
const minutes = Number(parts[1]);

return hours * 60 + minutes;
}

// Find the distance from a local time to preferred hours.
// Returns zero if the time is within the preferred window.
function distanceOutsideHours(
  minute: number,
  preferredStart: number,
  preferredEnd: number
): number {
  if (preferredStart === preferredEnd) {
    throw new Error("Preferred start and end must differ");
  }

  // Standard daytime window, e.g. 09:00-17:00.
  if (preferredStart < preferredEnd) {
    if (minute < preferredStart) return preferredStart - minute;
    if (minute >= preferredEnd) return minute - preferredEnd;
    return 0;
  }

  // Overnight window, e.g. 22:00-06:00.
  if (minute >= preferredStart || minute < preferredEnd) {
    return 0;
  }

  return Math.min(
    minute - preferredEnd,
    preferredStart - minute
  );
}

export function calculateInconvenience(
  participant: Participant,
  slot: MeetingSlot
): number {
  const start = new Date(slot.start).getTime();
  const end = new Date(slot.end).getTime();

  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    throw new Error("Invalid meeting slot");
  }

  const preferredStart = toMinutes(participant.preferredStart);
  const preferredEnd = toMinutes(participant.preferredEnd);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: participant.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });

  const interval = 5 * 60 * 1000;
  let inconvenience = 0;

  for (let current = start; current < end; current += interval) {
    const next = Math.min(current + interval, end);
    const midpoint = new Date(current + (next - current) / 2);

    const parts = formatter.formatToParts(midpoint);
    const hour = Number(parts.find(p => p.type === "hour")?.value);
    const minute = Number(parts.find(p => p.type === "minute")?.value);

    const localMinute =
    hour * 60 +
    minute +
    (midpoint.getUTCSeconds() / 60) +
    (midpoint.getUTCMilliseconds() / 60000);

    const distance = distanceOutsideHours(
      localMinute,
      preferredStart,
      preferredEnd
    );

    const durationMinutes = (next - current) / 60000;

    inconvenience += (durationMinutes / 60) * (distance / 60);
  }

  return Number(inconvenience.toFixed(4));
}
