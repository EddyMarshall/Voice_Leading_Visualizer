import Guitar from "./guitar"

class voiceLead {
    constructor(startStrings, startFrets) {
        this.startFrets = startFrets;
        this.guitar = new Guitar(body, "A", dynamic)
        this.setupVoiceLead();
        this.names = ["E", "B", "G", "D", "A", "E"]
        this.startStringNumbers = this.numberTheStrings(startStrings);
        this.startStringNames = this.nameStrings(this.startStringNumbers);
        this.fretRange = this.findRange(startFrets);
        // this.highlightStartStrings();
        this.highlightStartFrets();
        this.showTriad();
    }

    setupVoiceLead() {
        let allNotes = document.getElementsByClassName("note")
        for (let i = 0; i < allNotes.length; i++) {
            allNotes[i].style.setProperty("--noteOpacity", 0)
        }
    }

    numberTheStrings(startStrings) {
        let newArr = [];
        startStrings.forEach(function (ele) {
            newArr.push(ele - 1);
        })
        return newArr
    }

    nameStrings(startStrings) {
        let newArr = []
        for (let i = 0; i < startStrings.length; i++) {
            let nextIndex = startStrings[i]
            newArr[i] = this.names[nextIndex]
        }
        return newArr
    }

    // highlightStartStrings() {
    //     let allNotes = document.getElementsByClassName("note")
    //     for (let i = 0; i < allNotes.length; i++) {      
    //         let note = allNotes[i]

    //         if (!this.startStringNames.includes(note.id.split("")[0])) {
    //             note.style.setProperty("--noteOpacity", 0)
    //         } else if (this.startStringNumbers[0] === 0) {
    //             if (note.id.startsWith("E") && !note.id.endsWith("high")) {
    //                 note.style.setProperty("--noteOpacity", 0)
    //             }
    //         } else if (this.startStringNumbers[2] === 5) {
    //             if (note.id.startsWith("E") && note.id.endsWith("high")) {
    //                 note.style.setProperty("--noteOpacity", 0)
    //             }
    //         }
    //     }
    // }

    findRange(startFrets) {
        let newArr = [];
        for (let i = 0; i < 12; i ++) {
            if (i >= startFrets[0] && i <= startFrets[1]) newArr.push(i)
        }
        return newArr
    }

    highlightStartFrets() {
        let allNotes = document.getElementsByClassName("note")
        for (let i = 0; i < allNotes.length; i++) {
            let note = allNotes[i]
            if (!this.fretRange.includes(parseInt(note.id[1]))) {
                note.style.setProperty("--noteOpacity", 0)
            }
        }
    }

    showTriad() {
        let chordTones = ["A", "D", "F#"]
        var counter = 0
        let allNotes = document.getElementsByClassName("note")
        for (let i = 0; i < allNotes.length; i++) {
            let note = allNotes[i];
            if (note.id[1] < 10) {
                if (this.fretRange.includes(parseInt(note.id[1]))) {
                    if (this.startStringNames.includes(note.id[0])) {
                        if (note.id.includes("#") || note.id.includes("b")) {
                            let currentValue = note.id.slice(2, 4)
                            if (chordTones.includes(currentValue)) {
                                note.style.setProperty("--noteOpacity", 1);
                            }
                        } else {
                            for (let j = 0; j < chordTones.length; j++) {
                                // debugger
                                if (chordTones[j] === note.id[2]) {
                                    note.style.setProperty("--noteOpacity", 1);
                                }
                            }
                        }
                    }
                }
            }
        }
        //stringName, noteName
    }



}



export default voiceLead;