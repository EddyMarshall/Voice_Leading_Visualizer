class guitarString {
    constructor(name, key) {
        this.name = name;
        this.notes = this.findNotes(key)
        this.alignNotes(this.name);
    }

    findNotes(key) {
        if (key.split("").includes("b") || key === "F") { 
            return ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]
        } else {
            return ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];  
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


