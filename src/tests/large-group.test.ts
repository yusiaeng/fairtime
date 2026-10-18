
import { test } from "vitest";
import assert from "node:assert/strict";
import type {
  Participant,
  MeetingSlot
} from "../lib/fairness/types";
import { rankMeetingSlots } from "../lib/fairness/optimisation";

const cities = [
  "Europe/London",
  "America/New_York",
  "Asia/Tokyo",
  "Europe/Paris",
  "Asia/Singapore",
  "America/Los_Angeles",
  "Australia/Sydney",
  "Asia/Dubai",
  "Europe/Berlin",
  "Asia/Kolkata"
];

const participants: Participant[] = cities.map((timezone, i) => ({
  id: `person-${i + 1}`,
  name: `Person ${i + 1}`,
  timezone,
  preferredStart: i % 2 === 0 ? "09:00" : "10:00",
  preferredEnd: i % 2 === 0 ? "17:00" : "18:00",
  historicalInconvenience: i * 2
}));

// Generate 12 candidate meeting times.
const slots: MeetingSlot[] = Array.from(
  { length: 12 },
  (_, i) => {
    const start = new Date(
      Date.UTC(2027, 0, 15, 8 + i)
    );

    const end = new Date(
      start.getTime() + 60 * 60 * 1000
    );

    return {
      start: start.toISOString(),
      end: end.toISOString()
    };
  }
);

const ranked = rankMeetingSlots(participants, slots);

test("FairTime ranks meeting slots fairly for 10 international participants", () => {
  console.log("FAIRTIME — LARGE GROUP TEST");
  console.log("Participants:", participants.length);
  console.log("Meeting options:", ranked.length);

  // All meeting options should be retained.
  assert.equal(ranked.length, 12);

  for (const result of ranked) {
    // Every participant must have a score.
    assert.equal(result.participantScores.length, 10);

    // Nobody should be missing or duplicated.
    const ids = result.participantScores.map(
      score => score.participantId
    );

    assert.equal(new Set(ids).size, 10);

    // Scores must be valid numbers.
    assert.ok(
      Number.isFinite(result.maxCumulativeInconvenience)
    );

    assert.ok(
      Number.isFinite(result.totalCumulativeInconvenience)
    );
  }

  // Verify the complete ranking order.
  for (let i = 1; i < ranked.length; i++) {
    const previous = ranked[i - 1]!;
    const current = ranked[i]!;

    const maxDifference =
      previous.maxCumulativeInconvenience -
      current.maxCumulativeInconvenience;

    assert.ok(maxDifference <= 0);

    if (maxDifference === 0) {
      assert.ok(
        previous.totalCumulativeInconvenience <=
        current.totalCumulativeInconvenience
      );

      if (
        previous.totalCumulativeInconvenience ===
        current.totalCumulativeInconvenience
      ) {
        assert.ok(
          Date.parse(previous.slot.start) <=
          Date.parse(current.slot.start)
        );
      }
    }
  }

  console.log("\nTOP 3 FAIRTIME RECOMMENDATIONS");

  ranked.slice(0, 3).forEach((result, i) => {
    console.log(
      `${i + 1}. ${result.slot.start}`,
      `Max: ${result.maxCumulativeInconvenience.toFixed(2)}`,
      `Total: ${result.totalCumulativeInconvenience.toFixed(2)}`
    );
  });

  console.log("\nAll large-group tests passed!");
});