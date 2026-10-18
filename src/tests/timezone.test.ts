
import { test } from "vitest";
import assert from "node:assert/strict";
import type { Participant, MeetingSlot } from "../lib/fairness/types";
import { calculateInconvenience } from "../lib/fairness/inconvenience";

function makeParticipant(
  timezone: string,
  preferredStart: string,
  preferredEnd: string
): Participant {
  return {
    id: "test-person",
    name: "Test Person",
    timezone,
    preferredStart,
    preferredEnd,
    historicalInconvenience: 0
  };
}

test("handles meetings crossing midnight in Tokyo", () => {
  const tokyo = makeParticipant(
    "Asia/Tokyo", "22:00", "02:00"
  );

  const midnightMeeting: MeetingSlot = {
    start: "2027-01-15T14:00:00Z",
    end: "2027-01-15T16:00:00Z"
  };

  // 11 PM–1 AM in Tokyo, within preferred hours.
  assert.equal(
    calculateInconvenience(tokyo, midnightMeeting),
    0
  );
});

test("penalises meetings outside overnight preferred hours", () => {
  const tokyo = makeParticipant(
    "Asia/Tokyo", "22:00", "02:00"
  );

  const daytimeMeeting: MeetingSlot = {
    start: "2027-01-15T03:00:00Z",
    end: "2027-01-15T04:00:00Z"
  };

  // Noon–1 PM in Tokyo, outside preferred hours.
  assert.ok(
    calculateInconvenience(tokyo, daytimeMeeting) > 0
  );
});

test("handles London winter and summer time correctly", () => {
  const london = makeParticipant(
    "Europe/London", "09:00", "17:00"
  );

  const winterMeeting: MeetingSlot = {
    start: "2027-01-15T09:00:00Z",
    end: "2027-01-15T10:00:00Z"
  };

  const summerMeeting: MeetingSlot = {
    start: "2027-07-15T08:00:00Z",
    end: "2027-07-15T09:00:00Z"
  };

  // Both meetings are 9–10 AM in London.
  assert.equal(
    calculateInconvenience(london, winterMeeting),
    0
  );

  assert.equal(
    calculateInconvenience(london, summerMeeting),
    0
  );
});