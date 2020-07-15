"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.negativeHarmony = void 0;

var _tonal = require("@tonaljs/tonal");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function shiftChord(types, shift) {
  var cut = types.splice(0, shift);
  return [].concat(_toConsumableArray(types), _toConsumableArray(cut));
}

function generateCircleOfFith(scale) {
  var beginning = "Db";
  var types = ["maj7", "m7", "m7", "maj7", "7", "m7", "m7b5"];
  var scales = ["major", "dorian", "phrygian", "lydian", "mixolydian", "minor", "locrian"];
  var scaleIndex = scales.findIndex(function (e) {
    return e === scale;
  });
  var generatedChords = shiftChord(types, scaleIndex);
  var noteFifths = [beginning];

  for (var i = 0; i < 11; i++) {
    beginning = _tonal.Note.transpose(beginning, "5P");
    noteFifths.push(beginning);
  }

  var output = noteFifths.map(function (e) {
    return _tonal.Scale.get("".concat(e, " ").concat(scale));
  });
  output.forEach(function (element) {
    element.chords = element.notes.map(function (e, i) {
      return "".concat(e).concat(generatedChords[i]);
    });
  });
  return output;
}

var negativeHarmony = function negativeHarmony(key, input) {
  var first = [];
  var second = [];
  var result = [];
  var chord = null;
  var notes = generateCircleOfFith("major").map(function (e) {
    return e.tonic;
  });
  var index = notes.indexOf(key);

  if (index === 5) {} else if (index < 5) {
    var c = 5 - index;
    var del = notes.splice(-c, c);
    notes = [].concat(_toConsumableArray(del), _toConsumableArray(notes));
  } else if (index > 5) {
    var _c = 5 - index;

    var _del = notes.splice(0, _c);

    notes = [].concat(_toConsumableArray(notes), _toConsumableArray(_del));
  }

  first = notes.slice(0, 6);
  second = notes.slice(6, 12).reverse();

  function findNote(note) {
    var output = null;
    var inFirst = first.indexOf(note);
    var inSecond = second.indexOf(note);

    if (inFirst !== -1) {
      output = second[inFirst];
    }

    if (inSecond !== -1) {
      output = first[inSecond];
    }

    return output;
  }

  if (typeof input === "string") {
    result = findNote(input);
  }

  if (Array.isArray(input)) {
    input.forEach(function (element) {
      result.push(findNote(element));
    });
    chord = _tonal.Chord.detect(result);
  }

  return {
    notes: notes,
    index: index,
    first: first,
    second: second,
    result: result,
    chord: chord
  };
};

exports.negativeHarmony = negativeHarmony;