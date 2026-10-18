
import type { RankedMeetingSlot } from "./types";

// The information our frontend can display.
export interface MeetingExplanation {
  shortExplanation: string;
  detailedExplanation: string;
  improvementOverEarliest: number;
}

// Explain why a meeting received its ranking.
export function explainMeeting(
  recommended: RankedMeetingSlot,
  earliest: RankedMeetingSlot
): MeetingExplanation {

  const recommendedMax =
    recommended.maxCumulativeInconvenience;

  const earliestMax =
    earliest.maxCumulativeInconvenience;

  // Positive means the recommendation is fairer
  // than simply choosing the earliest available slot.
  const improvement = earliestMax - recommendedMax;

  const shortExplanation =
    improvement > 0
      ? "This time reduces the highest cumulative inconvenience compared with the earliest available meeting."
      : "This time is among the fairest available options based on everyone's meeting history and preferences.";

  const detailedExplanation =
    `Recommended meeting: ${recommended.slot.start}. ` +
    `Highest cumulative inconvenience: ${recommendedMax.toFixed(2)}. ` +
    `Total cumulative inconvenience: ${recommended.totalCumulativeInconvenience.toFixed(2)}. ` +
    `Earliest available meeting: ${earliest.slot.start}. ` +
    `Highest cumulative inconvenience for the earliest meeting: ${earliestMax.toFixed(2)}. ` +
    `Difference in maximum inconvenience: ${improvement.toFixed(2)} points.`;

  return {
    shortExplanation,
    detailedExplanation,
    improvementOverEarliest: Number(improvement.toFixed(2))
  };
}
