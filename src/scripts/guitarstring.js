class guitarString {
    constructor(name, key) {
        this.name = name;
        this.notes = this.findNotes(key)
    }

    findNotes(key) {
        let newArr = []
        if (key.split("").includes("b") || key === "F") { 
            newArr = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]
        } else {
            newArr = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];  
        }
        return this.alignNotes(this.name, newArr)
    }

    alignNotes(name, arr) {
        while (arr[0] != name) {
            let holder = arr.shift();
            arr.push(holder);
        }
        return arr;
    }

}

export default guitarString;


