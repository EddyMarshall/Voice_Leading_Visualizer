class guitarString {
    constructor(name, accidentals) {
        this.name = name;
        this.accidentals = accidentals
        this.notes = this.findNotes()
        this.alignNotes(this.name);
    }

    findNotes() {
        if (this.accidentals === "sharp") {
            return ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        } else {
            return ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]
        }
    }

    alignNotes(name) {
        while (this.notes[0] != name) {
            let holder = this.notes.shift();
            this.notes.push(holder);
        }
    }

}

export default guitarString;


