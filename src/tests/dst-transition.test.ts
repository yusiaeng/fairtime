
import { test } from "vitest";
import assert from "node:assert/strict";
import type {
  Participant,
  MeetingSlot
} from "../lib/fairness/types";

import { calculateInconvenience } from "../lib/fairness/inconvenience";

// A London participant who prefers meetings overnight.
const alice: Participant = {
  id: "alice",
  name: "Alice",
  timezone: "Europe/London",
  preferredStart: "00:00",
  preferredEnd: "04:00",
  historicalInconvenience: 0
};

test("handles the spring daylight-saving transition", () => {
  const springMeeting: MeetingSlot = {
    start: "2027-03-28T00:00:00Z",
    end: "2027-03-28T02:00:00Z"
  };

  assert.equal(
    calculateInconvenience(alice, springMeeting),
    0
  );
});

test("handles the autumn daylight-saving transition", () => {
  const autumnMeeting: MeetingSlot = {
    start: "2027-10-31T00:00:00Z",
    end: "2027-10-31T02:00:00Z"
  };

  assert.equal(
    calculateInconvenience(alice, autumnMeeting),
    0
  );
});

test("uses BST after the spring clock change", () => {
  const daytimeAlice: Participant = {
    ...alice,
    preferredStart: "09:00",
    preferredEnd: "17:00"
  };

  const afterSpringChange: MeetingSlot = {
    start: "2027-03-28T08:00:00Z",
    end: "2027-03-28T09:00:00Z"
  };

  assert.equal(
    calculateInconvenience(daytimeAlice, afterSpringChange),
    0
  );
});