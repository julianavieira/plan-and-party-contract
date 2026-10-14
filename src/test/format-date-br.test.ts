import { describe, it, expect } from "vitest";
import { formatDateBR } from "@/lib/utils";

describe("formatDateBR", () => {
  it("keeps the day the user typed for a YYYY-MM-DD event date", () => {
    expect(formatDateBR("2026-08-10")).toBe("10/08/2026");
  });

  it("does not shift the day across the Brazil timezone offset", () => {
    expect(formatDateBR("2026-01-01")).toBe("01/01/2026");
    expect(formatDateBR("2026-12-31")).toBe("31/12/2026");
  });

  it("returns an empty string when no date is set", () => {
    expect(formatDateBR("")).toBe("");
  });

  it("returns the original value when it is not a full YYYY-MM-DD date", () => {
    expect(formatDateBR("10/08/2026")).toBe("10/08/2026");
    expect(formatDateBR("2026-08")).toBe("2026-08");
  });
});
