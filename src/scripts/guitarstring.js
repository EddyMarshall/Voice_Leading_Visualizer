class guitarString {
    constructor(name, key, accidentals) {
        this.name = name;
        this.accidentals = accidentals
        this.alignNotes(name)
    }

    alignNotes(name) {
        while (this.accidentals[0] != name) {
            let holder = this.accidentals.shift();
            this.accidentals.push(holder);
        }
    }

}

export default guitarString;


