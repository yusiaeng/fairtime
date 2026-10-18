
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

test("returns no recommendations when there are no meeting slots", () => {
  const emptyResults = rankMeetingSlots([alice], []);

  assert.deepEqual(emptyResults, []);
});

test("chooses the earliest meeting when fairness scores are identical", () => {
  const slots: MeetingSlot[] = [
    {
      start: "2027-01-15T14:00:00Z",
      end: "2027-01-15T15:00:00Z"
    },
    {
      start: "2027-01-15T10:00:00Z",
      end: "2027-01-15T11:00:00Z"
    }
  ];

  const ranked = rankMeetingSlots([alice], slots);

  assert.equal(
    ranked[0]?.slot.start,
    "2027-01-15T10:00:00Z"
  );
});

test("rejects a meeting request with no participants", () => {
  const slots: MeetingSlot[] = [
    {
      start: "2027-01-15T10:00:00Z",
      end: "2027-01-15T11:00:00Z"
    }
  ];

  assert.throws(() => rankMeetingSlots([], slots));
});
