
import { test } from "vitest";
import assert from "node:assert/strict";
import type { Participant, MeetingSlot } from "../lib/fairness/types";
import { calculateInconvenience } from "../lib/fairness/inconvenience";

const ben: Participant = {
  id: "ben",
  name: "Ben",
  timezone: "Europe/London",
  preferredStart: "12:00",
  preferredEnd: "20:00",
  historicalInconvenience: 10
};

test("calculates inconvenience with acceptable precision", () => {
  const meeting: MeetingSlot = {
    start: "2027-01-15T09:00:00Z",
    end: "2027-01-15T10:00:00Z"
  };

  const actual = calculateInconvenience(ben, meeting);
  const expected = 2.5;

  console.log("Expected inconvenience:", expected);
  console.log("Actual inconvenience:", actual);
  console.log("Difference:", Math.abs(actual - expected));

  // Allow a small sampling difference.
  assert.ok(Math.abs(actual - expected) <= 0.02);
});