class Scale {
    constructor(key, accidentals) {
        this.key = key;
        this.accidentals = accidentals;
        this.notes = this.buildkey();
    }

    buildkey() {
        let newArr = [];

        while (this.accidentals[0] != this.key) {
            let holder = this.accidentals.shift();
            this.accidentals.push(holder);
        }

        newArr.push(this.accidentals[0])
        newArr.push(this.accidentals[2])
        newArr.push(this.accidentals[4])
        newArr.push(this.accidentals[5])
        newArr.push(this.accidentals[7])
        newArr.push(this.accidentals[9])
        newArr.push(this.accidentals[11])

        if (this.key === "F") {
            newArr[3] = "Bb"
        }

        return newArr;
    }
}



export default Scale;