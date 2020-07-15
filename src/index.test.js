import { negativeHarmony } from '.';

test('Find the negative harmony notes of Gm7b5', () => {
    expect(negativeHarmony('C', ["G", "Bb", "Db", "F"]).result)
        .toBe(["C", "A", "F#", "D"])
});