
import { describe, expect, it } from "vitest";

describe("FairTime setup", () => {
  it("can perform basic calculations", () => {
    expect(2 + 2).toBe(4);
  });

  it("can compare meeting durations", () => {
    const meetingDuration = 30;
    const availableMinutes = 60;

    expect(availableMinutes >= meetingDuration).toBe(true);
  });
});
