import { Note, Chord, Scale } from "@tonaljs/tonal";

function shiftChord (types, shift) {
    let cut = types.splice(0, shift);
    return [...types, ...cut];
}

function generateCircleOfFith (scale) {
    let beginning = "Db";
    let types = ["maj7", "m7", "m7", "maj7", "7", "m7", "m7b5"];
    let scales = [
        "major",
        "dorian",
        "phrygian",
        "lydian",
        "mixolydian",
        "minor",
        "locrian"
    ];
    let scaleIndex = scales.findIndex(e => e === scale);
    let generatedChords = shiftChord(types, scaleIndex);
    let noteFifths = [beginning];
    for (let i = 0; i < 11; i++) {
        beginning = Note.transpose(beginning, "5P");
        noteFifths.push(beginning);
    }
    let output = noteFifths.map(e => Scale.get(`${e} ${scale}`));
    output.forEach(element => {
        element.chords = element.notes.map((e, i) => `${e}${generatedChords[i]}`);
    });
    return output;
}

export const negativeHarmony = (key, input) => {
    let first = [];
    let second = [];
    let result = [];
    let chord = null;
    let notes = generateCircleOfFith("major").map(e => e.tonic);
    let index = notes.indexOf(key);
    if (index === 5) {
    } else if (index < 5) {
        let c = 5 - index;
        let del = notes.splice(-c, c);
        notes = [...del, ...notes];
    } else if (index > 5) {
        let c = 5 - index;
        let del = notes.splice(0, c);
        notes = [...notes, ...del];
    }
    first = notes.slice(0, 6);
    second = notes.slice(6, 12).reverse();

    function findNote (note) {
        let output = null;
        let inFirst = first.indexOf(note);
        let inSecond = second.indexOf(note);
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
        input.forEach(element => {
            result.push(findNote(element));
        });
        chord = Chord.detect(result);
    }
    return { notes, index, first, second, result: result, chord };
}