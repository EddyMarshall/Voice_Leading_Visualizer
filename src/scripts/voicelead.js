import Guitar from "./guitar"

class voiceLead {
    constructor(key, oldHarmonicFunction) {
        this.guitar = new Guitar(body, key, dynamic)
        this.clearOldTriad();
        this.names = ["E", "B", "G", "D", "A", "E"]
        this.createOriginalChord(1, "1, 2, 3", "3, 8")
        this.oldHarmonicFunction = oldHarmonicFunction
        
    }


    createOriginalChord(harmonicFunction, stringChoice, fretChoice) {
        let alignedStrings = this.numberTheStrings(stringChoice.split(","));
        let usedString = [];
        let fretsArray = this.findRange(fretChoice.split(","))
        let newStringNames = this.nameStrings(alignedStrings)
        let allNotes = document.getElementsByClassName("note")
        let chordTones = this.guitar.chords[harmonicFunction - 1].triad

        var counter = 0
        this.clearOldTriad();
        if (alignedStrings[2] === 5) {
            for (let i = 12; i < allNotes.length; i++) {

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

    }

    showNextTriad(harmonicFunction, stringChoice) {
        let alignedStrings = this.numberTheStrings(stringChoice.split(","));
        let originalElements = document.getElementsByClassName("showing")

        let startingIndices = this.findOriginalIndices(originalElements, alignedStrings);
        let harmonicDistance = this.findHarmonicDistance(harmonicFunction, this.oldHarmonicFunction)
        this.oldHarmonicFunction = harmonicFunction;
        let oldChordTones = this.findOldTones();
        let newChordTones = this.guitar.chords[harmonicFunction - 1].triad
        let tonesThatNeedTochange = this.findDifferentTones(oldChordTones, newChordTones)
        let usedStrings = this.narrowDownStrings(alignedStrings);
        let stringIterator = 0;
        while (stringIterator < usedStrings.length) {
            let indexIterator = 0;
            if (startingIndices.length > 0) {
                while (indexIterator < startingIndices.length) {
                    let checkIndex = startingIndices[stringIterator] + 0
                    if (newChordTones.includes(usedStrings[stringIterator].children[checkIndex].id[2])) {
                        indexIterator += 5
                        stringIterator += 1
                    } else {
                        if (harmonicDistance % 2 === 0) {

                            if (newChordTones.includes(usedStrings[stringIterator].children[checkIndex + 1].id[2])) {
                                usedStrings[stringIterator].children[checkIndex + 1].style.setProperty("--noteOpacity", 1);
                                usedStrings[stringIterator].children[checkIndex + 1].classList.add("showing")
                            } else {
                                usedStrings[stringIterator].children[checkIndex + 2].style.setProperty("--noteOpacity", 1);
                                usedStrings[stringIterator].children[checkIndex + 2].classList.add("showing")
                            }
                            usedStrings[stringIterator].children[checkIndex].style.setProperty("--noteOpacity", 0);
                            usedStrings[stringIterator].children[checkIndex].classList.remove("showing")
                            
                        } else {
                            if (newChordTones.includes(usedStrings[stringIterator].children[checkIndex - 1].id[2]) &&
                                usedStrings[stringIterator].children[checkIndex - 1].id.includes("#") === false) {
                                usedStrings[stringIterator].children[checkIndex - 1].style.setProperty("--noteOpacity", 1);
                                usedStrings[stringIterator].children[checkIndex - 1].classList.add("showing")
                            } else {
                                usedStrings[stringIterator].children[checkIndex - 2].style.setProperty("--noteOpacity", 1);
                                usedStrings[stringIterator].children[checkIndex - 2].classList.add("showing")
                            }
                            usedStrings[stringIterator].children[checkIndex].style.setProperty("--noteOpacity", 0);
                            usedStrings[stringIterator].children[checkIndex].classList.remove("showing")
                        }
                        indexIterator += 1
                        stringIterator += 1
                        if (stringIterator === 3) {
                            indexIterator += 50
                        }
                    }
                }

            } else {
                break;
            }
        }
    }

    findHarmonicDistance(harmonicFunction, oldHarmonicFunction) {
        const numericalOldFunction = parseInt(oldHarmonicFunction);
        const numericalHarmonicFunction = parseInt(harmonicFunction);

        if (numericalOldFunction - numericalHarmonicFunction < 0) {
            return Math.abs(numericalOldFunction - numericalHarmonicFunction) + 1
        } else {
            return numericalHarmonicFunction + (8 - numericalOldFunction)
        }
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
        for (let i = 0; i < 12; i++) {
            if (i >= startFrets[0] && i <= startFrets[1]) newArr.push(i)
        }
        return newArr
    }



    narrowDownStrings(strings) {
        const allStrings = document.getElementsByClassName("guitarstring");
        let newArr = [];
        for (let i = 0; i < strings.length; i++) {
            const nextAddition = strings[i]
            newArr.push(allStrings[parseInt(nextAddition)])
        }
        return newArr
    }

    narrowDownStrings(strings) {
        const allStrings = document.getElementsByClassName("guitarstring");
        let newArr = [];
        for (let i = 0; i < strings.length; i++) {
            const nextAddition = strings[i]
            newArr.push(allStrings[parseInt(nextAddition)])
        }
        return newArr
    }

    findOriginalIndices(elements, strings) {
        let usedStrings = this.narrowDownStrings(strings);
        let originalIndices = [];
        if (elements.length != 0) {
            for (let i = 0; i < usedStrings.length; i++) {
                let fretsArray = usedStrings[i].children //sits us on one string

                for (let j = 0; j < fretsArray.length; j++) {
                    let currentFret = fretsArray[j];           //sits us on one fret

                    for (let k = 0; k < fretsArray.length; k++) {
                        let oldElement = elements[k]            //cycles us through the old eles
                        if (oldElement === currentFret) {
                            originalIndices.push(j)
                        }
                    }
                }
            }
        }
        return originalIndices

    }






    findOldTones() {
        if (this.guitar.chords[this.oldHarmonicFunction - 1] === undefined) {
            return this.guitar.chords[6].triad
        } else {
            return this.guitar.chords[this.oldHarmonicFunction - 1]
        }
    }

    findDifferentTones(oldChordTones, newChordTones) {
        let newArr = [];
        for (let i = 0; i < 3; i++) {
            if (!oldChordTones.triad.includes(newChordTones[i])) newArr.push(oldChordTones[i])
        }
        return newArr;
    }




//only iterate through THAT string with the differecnce(s) string

    //find index of old differences         
    //hide old notes        
    //if harmonic distance is even          
        //travel up from oldindex until note matches newnote
        //show new note
        //repeat
    //if harmonic distance is odd
        //travel down from oldindex until note matches newnote
        //show new note
        //repeat
//this should happen regardless of fret range

//




}



export default voiceLead;