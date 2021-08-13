class guitarString {
    constructor(name) {
        this.name = name;
        this.notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
        this.alignNotes(this.name);
    }

    alignNotes(name) {
        while (this.notes[0] != name) {
            let holder = this.notes.shift();
            this.notes.push(holder);
        }
    }

}

export default guitarString;


