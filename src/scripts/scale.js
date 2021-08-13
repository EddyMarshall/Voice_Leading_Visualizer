class Scale {
    constructor(key) {
        this.key = key;
        this.accidentals = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        this.notes = this.buildkey();
    }

    buildkey() {
        let newArr = [];

        while (this.accidentals[0] != this.key) {
            let holder = this.accidentals.shift();
            this.accidentals.push(holder);
        }

        if (!this.key.split("").includes("b")) {
            newArr.push(this.accidentals[0])
            newArr.push(this.accidentals[2])
            newArr.push(this.accidentals[4])
            newArr.push(this.accidentals[5])
            newArr.push(this.accidentals[7])
            newArr.push(this.accidentals[9])
            newArr.push(this.accidentals[11])
        }
        return newArr;
    }
}



export default Scale;