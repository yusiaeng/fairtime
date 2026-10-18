
import type {
  Participant,
  MeetingSlot,
  ParticipantScore,
  RankedMeetingSlot
} from "./types";

import { calculateInconvenience } from "./inconvenience";

// Rank every feasible meeting slot from fairest to least fair.
export function rankMeetingSlots(
  participants: Participant[],
  slots: MeetingSlot[]
): RankedMeetingSlot[] {

  // Each participant must have a valid historical score.
  for (const participant of participants) {
    if (
      !Number.isFinite(participant.historicalInconvenience) ||
      participant.historicalInconvenience < 0
    ) {
      throw new Error("Invalid historical inconvenience");
    }
  }

  
  // An empty group cannot have a meaningful fairness ranking.
  if (participants.length === 0) {
    throw new Error("At least one participant is required");
  }

  // Reject duplicate participant IDs.
  const participantIds = participants.map(
    (participant) => participant.id
  );

  const uniqueIds = new Set(participantIds);

  if (uniqueIds.size !== participantIds.length) {
    throw new Error("Duplicate participant IDs are not allowed");
  }


  // Calculate fairness scores for every meeting option.
  const rankedSlots: RankedMeetingSlot[] = slots.map((slot) => {

    // Calculate the projected score for each person.
    const participantScores: ParticipantScore[] =
      participants.map((participant) => {

        const addedInconvenience = calculateInconvenience(
          participant,
          slot
        );

        return {
          participantId: participant.id,
          addedInconvenience,
          projectedInconvenience:
            participant.historicalInconvenience + addedInconvenience
        };
      });

    // Find the most inconvenienced participant's cumulative score.
    const maxCumulativeInconvenience = Math.max(
      ...participantScores.map(
        (score) => score.projectedInconvenience
      )
    );

    // Calculate the total cumulative inconvenience for the group.
    const totalCumulativeInconvenience = participantScores.reduce(
      (total, score) => total + score.projectedInconvenience,
      0
    );

    return {
      slot,
      participantScores,
      maxCumulativeInconvenience,
      totalCumulativeInconvenience
    };
  });

  // Sort using FairTime's three fairness rules.
  return rankedSlots.sort((a, b) => {

    // Rule 1: Lowest maximum cumulative inconvenience wins.
    if (
      a.maxCumulativeInconvenience !==
      b.maxCumulativeInconvenience
    ) {
      return (
        a.maxCumulativeInconvenience -
        b.maxCumulativeInconvenience
      );
    }

    // Rule 2: If tied, lowest total inconvenience wins.
    if (
      a.totalCumulativeInconvenience !==
      b.totalCumulativeInconvenience
    ) {
      return (
        a.totalCumulativeInconvenience -
        b.totalCumulativeInconvenience
      );
    }

    // Rule 3: If still tied, choose the earliest meeting.
    return (
      new Date(a.slot.start).getTime() -
      new Date(b.slot.start).getTime()
    );
  });
}
