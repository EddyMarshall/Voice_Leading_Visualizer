import Chord from "./chord";
import guitarString from "./guitarstring"
import Scale from "./scale";

class Guitar {
    constructor(body, key) {
        this.strings = []
        this.body = body
        this.header = this.createHeader(key)
        this.key = key
        this.accidentals = this.buildAccidentals();
        this.setupGuitar(key)
        this.scale = new Scale(key, this.accidentals);
        this.chords = this.buildChords(this.scale.notes)
    }

    buildAccidentals() {
        if (this.key.split("").includes("b") || this.key === "F") {
            return ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"];
        } else {
            return ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
        }
    }

    createHeader(key) {
        const header = document.createElement("h1")
        header.innerHTML = `Key of ${key} major`
        this.body.appendChild(header);
    }

    setupGuitar(key) {
        const guitarDiv = document.createElement("div")
        guitarDiv.classList.add("guitar")
        this.body.appendChild(guitarDiv);
        const array = ["E", "B", "G", "D", "A", "E"]

        for (let i = 0; i < array.length; i++) {
            const stringDiv = document.createElement("div");
            stringDiv.classList.add("guitarstring")
            const addition = new guitarString(array[i], key, this.accidentals)
            for (let i = 0; i < addition.accidentals.length; i++) {
                const noteDiv = document.createElement("div");
                noteDiv.classList.add(`note`)
                noteDiv.classList.add(`${addition.accidentals[i]}`)
                noteDiv.setAttribute("data-note", `${addition.accidentals[i]}`)
                stringDiv.appendChild(noteDiv)
            }
            this.strings.push(addition)
            guitarDiv.appendChild(stringDiv);
        }
    }

    buildChords(scale) {
        let newArr = []
        for (let i = 0; i < scale.length; i++) {
            if (i === 0 || i === 3 || i === 4) {
                newArr.push(new Chord(scale[i], "major", scale, i + 1))
            } else if (i === 1 || i === 2 || i === 5) {
                newArr.push(new Chord(scale[i], "minor", scale, i + 1))
            } else if (i === 6) {
                newArr.push(new Chord(scale[i], "diminished", scale, i + 1))
            }
        }
        return newArr
    }


}


export default Guitar;

