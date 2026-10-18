
import { test } from "vitest";
import assert from "node:assert/strict";
import type { Participant, MeetingSlot } from "../lib/fairness/types";
import { calculateInconvenience } from "../lib/fairness/inconvenience";

// Alice prefers meetings from 9 AM to 5 PM.
const alice: Participant = {
  id: "alice",
  name: "Alice",
  timezone: "Europe/London",
  preferredStart: "09:00",
  preferredEnd: "17:00",
  historicalInconvenience: 5
};

// Create a one-hour meeting at a chosen UTC hour.
// January is used because London is on UTC then.
function meetingAt(hour: number): MeetingSlot {
  const start = new Date(Date.UTC(2027, 0, 15, hour));
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  return {
    start: start.toISOString(),
    end: end.toISOString()
  };
}

const afternoon = calculateInconvenience(alice, meetingAt(15));
const evening = calculateInconvenience(alice, meetingAt(18));
const night = calculateInconvenience(alice, meetingAt(21));

test("inconvenience increases for meetings outside preferred hours", () => {
  console.log("FAIRTIME — INCONVENIENCE TEST");
  console.log("3–4 PM:", afternoon);
  console.log("6–7 PM:", evening);
  console.log("9–10 PM:", night);

  // Automated checks
  assert.equal(afternoon, 0);
  assert.ok(evening > afternoon);
  assert.ok(night > evening);
});
