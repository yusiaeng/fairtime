
import { test } from "vitest";
import assert from "node:assert/strict";
import type { Participant, MeetingSlot } from "../lib/fairness/types";
import { rankMeetingSlots } from "../lib/fairness/optimisation";
import { explainMeeting } from "../lib/fairness/explanations";

// Two participants with different historical inconvenience.
const participants: Participant[] = [
  {
    id: "alice",
    name: "Alice",
    timezone: "Europe/London",
    preferredStart: "09:00",
    preferredEnd: "17:00",
    historicalInconvenience: 0
  },
  {
    id: "ben",
    name: "Ben",
    timezone: "Europe/London",
    preferredStart: "12:00",
    preferredEnd: "20:00",
    historicalInconvenience: 10
  }
];

// Both slots are assumed to be available to both people.
const slots: MeetingSlot[] = [
  {
    start: "2027-01-15T09:00:00Z",
    end: "2027-01-15T10:00:00Z"
  },
  {
    start: "2027-01-15T13:00:00Z",
    end: "2027-01-15T14:00:00Z"
  }
];

const ranked = rankMeetingSlots(participants, slots);

test("historical fairness influences meeting recommendations", () => {
  console.log("FAIRTIME — HISTORICAL FAIRNESS TEST");

  for (const result of ranked) {
    console.log(
      result.slot.start,
      "Max:", result.maxCumulativeInconvenience.toFixed(2),
      "Total:", result.totalCumulativeInconvenience.toFixed(2)
    );
  }

  // FairTime should prefer 1 PM, not the earliest 9 AM slot.
  assert.equal(ranked[0]?.slot.start, "2027-01-15T13:00:00Z");

  // At 1 PM, both participants are inside preferred hours.
  // Alice's projected score is 0; Ben's is 10.
  assert.equal(ranked[0]?.maxCumulativeInconvenience, 10);
  assert.equal(ranked[0]?.totalCumulativeInconvenience, 10);

  // At 9 AM, Ben is outside his preferred hours.
  // His cumulative score must be higher than 10.
  assert.ok(
    ranked[1]!.maxCumulativeInconvenience > 10
  );

  // Compare the fairest meeting against the earliest.
  const earliest = ranked.find(
    result => result.slot.start === "2027-01-15T09:00:00Z"
  )!;

  const explanation = explainMeeting(ranked[0]!, earliest);

  assert.ok(explanation.improvementOverEarliest > 0);
  assert.ok(explanation.shortExplanation.length > 0);
  assert.ok(explanation.detailedExplanation.length > 0);

  console.log(
    "Improvement over earliest:",
    explanation.improvementOverEarliest
  );

  console.log("Explanation:", explanation.shortExplanation);
});