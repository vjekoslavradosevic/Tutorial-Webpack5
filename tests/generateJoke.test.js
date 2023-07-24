import { generateDefaultJoke } from "../src/js/generateJoke";

test("should return damage sentence when called correctly", () => {
    const result = generateDefaultJoke();
    expect(result).toBe("What's the best thing about Switzerland? I don't know, but the flag is a big plus.");
});
