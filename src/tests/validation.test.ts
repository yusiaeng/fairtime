
import { test } from "vitest";
import assert from "node:assert/strict";
import type { Participant, MeetingSlot } from "../lib/fairness/types";
import { rankMeetingSlots } from "../lib/fairness/optimisation";

const alice: Participant = {
  id: "alice",
  name: "Alice",
  timezone: "Europe/London",
  preferredStart: "09:00",
  preferredEnd: "17:00",
  historicalInconvenience: 0
};

const validSlot: MeetingSlot = {
  start: "2027-01-15T10:00:00Z",
  end: "2027-01-15T11:00:00Z"
};

test("rejects negative historical inconvenience", () => {
  assert.throws(() =>
    rankMeetingSlots(
      [{ ...alice, historicalInconvenience: -5 }],
      [validSlot]
    )
  );
});

test("rejects invalid meeting duration", () => {
  assert.throws(() =>
    rankMeetingSlots(
      [alice],
      [{
        start: "2027-01-15T12:00:00Z",
        end: "2027-01-15T11:00:00Z"
      }]
    )
  );
});

test("rejects invalid timezones", () => {
  assert.throws(() =>
    rankMeetingSlots(
      [{ ...alice, timezone: "Invalid/Timezone" }],
      [validSlot]
    )
  );
});

test("rejects duplicate participant IDs", () => {
  assert.throws(() =>
    rankMeetingSlots(
      [alice, { ...alice }],
      [validSlot]
    )
  );
});