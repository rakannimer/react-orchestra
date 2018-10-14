import { Note, Instrument } from "../src/";

describe("Instrument", () => {
  test("exports", () => {
    expect(Note).toBeTruthy();
    expect(Instrument).toBeTruthy();
  });
});
