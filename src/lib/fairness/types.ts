// A person attending a meeting
export interface Participant {
  id: string;
  name: string;
  timezone: string; // e.g. "Europe/London"

  preferredStart: string; // e.g. "09:00"
  preferredEnd: string;   // e.g. "17:00"

  historicalInconvenience: number;
}

// A possible meeting time, already checked for availability
export interface MeetingSlot {
  start: string; // UTC timestamp
  end: string;   // UTC timestamp
}

// Fairness score for an individual participant
export interface ParticipantScore {
  participantId: string;
  addedInconvenience: number;
  projectedInconvenience: number;
}

// Fairness result for a meeting time
export interface RankedMeetingSlot {
  slot: MeetingSlot;
  participantScores: ParticipantScore[];
  maxCumulativeInconvenience: number;
  totalCumulativeInconvenience: number;
}