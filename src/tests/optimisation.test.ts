
import { test } from "vitest";
import assert from "node:assert/strict";
import type { Participant, MeetingSlot } from "../lib/fairness/types";
import { rankMeetingSlots } from "../lib/fairness/optimisation";

const participants: Participant[] = [
  {
    id: "alice",
    name: "Alice",
    timezone: "Europe/London",
    preferredStart: "09:00",
    preferredEnd: "17:00",
    historicalInconvenience: 2
  },
  {
    id: "ben",
    name: "Ben",
    timezone: "America/New_York",
    preferredStart: "09:00",
    preferredEnd: "17:00",
    historicalInconvenience: 4
  },
  {
    id: "chloe",
    name: "Chloe",
    timezone: "Asia/Tokyo",
    preferredStart: "09:00",
    preferredEnd: "17:00",
    historicalInconvenience: 10
  }
];

const slots: MeetingSlot[] = [
  {
    start: "2027-01-15T09:00:00Z",
    end: "2027-01-15T10:00:00Z"
  },
  {
    start: "2027-01-15T15:00:00Z",
    end: "2027-01-15T16:00:00Z"
  },
  {
    start: "2027-01-15T18:00:00Z",
    end: "2027-01-15T19:00:00Z"
  }
];

const ranked = rankMeetingSlots(participants, slots);

test("meeting slots are ranked according to fairness rules", () => {
  console.log("FAIRTIME GROUP RANKING");

  ranked.forEach((result, index) => {
    console.log(
      `${index + 1}. ${result.slot.start}`,
      `Max: ${result.maxCumulativeInconvenience.toFixed(2)}`,
      `Total: ${result.totalCumulativeInconvenience.toFixed(2)}`
    );
  });

  // Every proposed meeting must appear in the ranking.
  assert.equal(ranked.length, 3);

  // Every meeting must contain a score for all three people.
  for (const result of ranked) {
    assert.equal(result.participantScores.length, 3);
  }

  // Results must follow FairTime's fairness ranking rules.
  for (let i = 1; i < ranked.length; i++) {
    const previous = ranked[i - 1]!;
    const current = ranked[i]!;

    assert.ok(
      previous.maxCumulativeInconvenience <=
        current.maxCumulativeInconvenience
    );

    if (
      previous.maxCumulativeInconvenience ===
      current.maxCumulativeInconvenience
    ) {
      assert.ok(
        previous.totalCumulativeInconvenience <=
          current.totalCumulativeInconvenience
      );
    }
  }
});