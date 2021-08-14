class Scale {
    constructor(key) {
        this.key = key;
        this.accidentals = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        this.notes = this.buildkey();
    }

    buildkey() {
        let newArr = [];

        while (this.accidentals[0][0] != this.key[0]) {
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
        if (this.key.split("").includes("b")) {
            for (let i = 0; i < newArr.length; i++){
                if (newArr[i].split("").includes("#")) {
                    let newIndex = this.accidentals.indexOf(newArr[i]) + 1;
                    newArr[i] = this.accidentals[newIndex] + "b"
                }
            }
        }
        if (this.key === "F") {
            newArr[3] = "Bb"
        }

        return newArr;
    }
}



export default Scale;