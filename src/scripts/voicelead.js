import Guitar from "./guitar"

class voiceLead {
    constructor(key) {
        this.guitar = new Guitar(body, key, dynamic)
        this.clearOldTriad();
        this.names = ["E", "B", "G", "D", "A", "E"]
        this.showTriad(1, "1, 2, 3", "0, 6")
        this.oldHarmonicFunction = 5
        this.oldTriad = this.guitar.chords[this.oldHarmonicFunction - 1].triad
    }

    clearOldTriad() {
        let allNotes = document.getElementsByClassName("note")
        for (let i = 0; i < allNotes.length; i++) {
            allNotes[i].style.setProperty("--noteOpacity", 0)
            allNotes[i].classList.remove("showing")
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

    findRange(startFrets) {
        let newArr = [];
        for (let i = 0; i < 12; i ++) {
            if (i >= startFrets[0] && i <= startFrets[1]) newArr.push(i)
        }
        return newArr
    }

    // highlightStartFrets() {
    //     let allNotes = document.getElementsByClassName("note")
    //     for (let i = 0; i < allNotes.length; i++) {
    //         let note = allNotes[i]
    //         if (!this.fretRange.includes(parseInt(note.id[1]))) {
    //             note.style.setProperty("--noteOpacity", 0)
    //         }
    //     }
    // }

    showTriad(harmonicFunction, stringChoice, fretChoice) {
        let oldElements = document.getElementsByClassName("showing")
        let chordTones = this.guitar.chords[harmonicFunction - 1].triad
        let alignedStrings = this.numberTheStrings(stringChoice.split(","));
        let newStringNames = this.nameStrings(alignedStrings)
        let fretsArray = this.findRange(fretChoice.split(","))
        var counter = 0
        let usedString = [];
        let allNotes = document.getElementsByClassName("note")
        let newElements = []
        // this.clearOldTriad();
        if (this.oldHarmonicFunction === undefined || this.oldHarmonicFunction === 0) {
            if (alignedStrings[2] === 5) {
                for (let i = 12; i < allNotes.length; i++) { document.getElementsByClassName

                    if (counter === 3) {
                        break;
                    }


                    let note = allNotes[i];
                    if (note.id[1] < 10) {
                        if (!usedString.includes(note.id[0])) {
                            if (fretsArray.includes(parseInt(note.id[1]))) {
                                if (newStringNames.includes(note.id[0])) {
                                    if (note.id.includes("#") || note.id.includes("b")) {
                                        let currentValue = note.id.slice(2, 4)
                                        if (chordTones.includes(currentValue)) {
                                            note.style.setProperty("--noteOpacity", 1);
                                            note.classList.add("showing")
                                            usedString.push(note.id[0])
                                            counter += 1
                                        }
                                    } else {
                                        for (let j = 0; j < chordTones.length; j++) {
                                            if (chordTones[j] === note.id[2]) {
                                                note.style.setProperty("--noteOpacity", 1);
                                                note.classList.add("showing")
                                                usedString.push(note.id[0])
                                                counter += 1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                for (let i = 0; i < allNotes.length; i++) {

                    if (counter === 3) {
                        break;
                    }


                    let note = allNotes[i];
                    if (note.id[1] < 10) {
                        if (!usedString.includes(note.id[0])) {
                            if (fretsArray.includes(parseInt(note.id[1]))) {
                                if (newStringNames.includes(note.id[0])) {
                                    if (note.id.includes("#") || note.id.includes("b")) {
                                        let currentValue = note.id.slice(2, 4)
                                        if (chordTones.includes(currentValue)) {

                                            note.style.setProperty("--noteOpacity", 1);
                                            note.classList.add("showing")
                                            usedString.push(note.id[0])
                                            counter += 1
                                        }
                                    } else {
                                        for (let j = 0; j < chordTones.length; j++) {
                                            if (chordTones[j] === note.id[2]) {
                                                note.style.setProperty("--noteOpacity", 1);
                                                note.classList.add("showing")
                                                usedString.push(note.id[0])
                                                counter += 1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            for (let x = 0; x < this.guitar.chords.length; x++) {
                if (this.guitar.chords[x].triad === chordTones) {
                    const allStrings = document.getElementsByClassName("guitarstring")
                    let harmonicDistance = 
                        this.findHarmonicDistance(this.guitar.chords[x].number, this.oldHarmonicFunction)
                    if (harmonicDistance % 2 === 0) {
                        debugger
                    } else {
                        debugger
                        //travel down the guitar neck
                    }
                }
            }
            
        }
        
    }

    get oldIndex(currentStringArray, oldNote) {
        for (let i = 0; i < currentStringArray; i++) {
            if (currentStringArray[i] === oldNote) {
                return i;
                break
            }
        }
    }

    findHarmonicDistance(harmonicFunction, oldHarmonicFunction) {
        if (oldHarmonicFunction - harmonicFunction < 0) {
            return Math.abs(oldHarmonicFunction - harmonicFunction) + 1
        } else {
            return harmonicFunction + (8 - oldHarmonicFunction)
        }
    }


//change chords.
//find old triad elements.
//find new triad elements.
//if old triad element = new triad element NEXT
    //if our distance is an even number
        //go up from old element to any new element, change visibilities
    //if our distance is an odd number
        //go down from old element to any new element, change visibilities



}



export default voiceLead;