"use strict";

var _ = require(".");

test('Find the negative harmony notes of Gm7b5', function () {
  expect((0, _.negativeHarmony)('C', ["G", "Bb", "Db", "F"]).result).toBe(["C", "A", "F#", "D"]);
});