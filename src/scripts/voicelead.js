import Guitar from "./guitar"
import Cycle from "./cycle"

class voiceLead {
    constructor(key, oldHarmonicFunction, stringChoice = "1, 2, 3", range = "3, 8") {
        this.key = key
        this.range = range;
        this.guitar = new Guitar(body, key, dynamic)
        this.clearOldTriad();
        this.names = ["E", "B", "G", "D", "A", "E"]
        this.stringChoice = stringChoice;
        this.adjustkey();
        this.createOriginalChord(1, stringChoice, this.range)
        this.oldHarmonicFunction = oldHarmonicFunction
    }

    adjustkey(){
        if (this.key === "Gb" || this.key === "D") {
            this.range = "5, 8"
        } 
    }




    createOriginalChord(harmonicFunction, stringChoice, fretChoice) {
        this.guitar.createSecondaryHeader(harmonicFunction - 1)
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
        this.guitar.createSecondaryHeader(harmonicFunction - 1)
        let alignedStrings = this.numberTheStrings(stringChoice.split(","));
        let originalElements = document.getElementsByClassName("showing")
        let startingIndices = this.findOriginalIndices(originalElements, alignedStrings);
        let harmonicDistance = this.findHarmonicDistance(harmonicFunction, this.oldHarmonicFunction)
        let oldChordTones = this.findOldTones();
        let oldQuality = this.guitar.chords[this.oldHarmonicFunction - 1].quality
        let newQuality = this.guitar.chords[harmonicFunction - 1].quality
        this.oldHarmonicFunction = harmonicFunction;
        
        let workingHash = this.hashBuilder(originalElements, startingIndices, oldChordTones)
        let saveChordName = `${this.guitar.chords[parseInt(harmonicFunction) - 1].name} ${this.guitar.chords[parseInt(harmonicFunction) - 1].quality}`
        let saveChordRange = this.createVoiceDefaultChordRanges(saveChordName, stringChoice)
        
    


    

        for (let i = 0; i < oldChordTones.triad.length; i++) {
            let alterer = workingHash[oldChordTones.triad[i]]
            if (harmonicDistance === 7) {
//LOGIC FOR GOING UP A 7TH
                if (oldQuality === "Major" && newQuality === "Diminished") {
                    if (alterer[1] === 1) {
                        let newIndex = alterer[2] - 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    } else {
                        let newTone = alterer[0].parentElement.children[alterer[2] - 2]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    }
                } else if (oldQuality === "Diminished" && newQuality === "Minor") {
                    if (alterer[1] === 5) {
                        let newIndex = alterer[2] - 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    } else {
                        let newTone = alterer[0].parentElement.children[alterer[2] - 2]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    }
                } else if (oldQuality === "Major" && newQuality === "Minor") {
                    if (alterer[1] === 5 || alterer[1] === 1) {
                        let newIndex = alterer[2] - 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    } else {
                        let newTone = alterer[0].parentElement.children[alterer[2] - 2]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    }
                } else if (oldQuality === "Minor" && newQuality === "Major") {
                    if (alterer[1] === 3) {
                        let newIndex = alterer[2] - 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        if (newTone === undefined) {
                            
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    } else {
                        let newTone = alterer[0].parentElement.children[alterer[2] - 2]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        if (newTone === undefined) {
                            
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    }
                } else if ((oldQuality === "Minor" && newQuality === "Minor") ||
                    (oldQuality === "Major" && newQuality === "Major")) {
                        let newTone = alterer[0].parentElement.children[alterer[2] - 2]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    }
                alterer[0].classList.remove("showing")
                alterer[0].style.setProperty("--noteOpacity", 0)
            } else if (harmonicDistance === 6) {

//logic for going up a 6th
                if ((oldQuality === "Major" && newQuality === "Minor") ||
                    (oldQuality === "Minor" && newQuality === "Diminished") ||
                    (oldQuality === "Diminished" && newQuality === "Major")) {
                    if (alterer[1] === 5) {
                        let newIndex = alterer[2] + 2
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    } 
                } else {
                    if (alterer[1] === 5) {
                        let newTone = alterer[0].parentElement.children[alterer[2] + 1]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    }
                }
            } else if (harmonicDistance === 5) {

                //logic for going up a 5th
                if (oldQuality === "Major" && newQuality === "Major") {
                    if (alterer[1] === 1) {
                        let newIndex = alterer[2] - 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    } else if (alterer[1] === 3) {
                        let newIndex = alterer[2] - 2
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    }
                } else if (oldQuality === "Minor" && newQuality === "Minor") {
                    if (alterer[1] === 1) {
                        let newIndex = alterer[2] - 2
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    } else if (alterer[1] === 3) {
                        let newIndex = alterer[2] - 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    }
                } else {
                    if (alterer[1] === 3 || alterer[1] === 1) {
                        let newIndex = alterer[2] - 2
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    }
                }
            } else if (harmonicDistance === 4) {

                //logic for going up a 4th
                if (oldQuality === "Major" && newQuality === "Major") {
                    if (alterer[1] === 3) {
                        let newIndex = alterer[2] + 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    } else if (alterer[1] === 5) {
                        let newIndex = alterer[2] + 2
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    }
                } else if (oldQuality === "Minor" && newQuality === "Minor") {
                    if (alterer[1] === 3) {
                        let newIndex = alterer[2] + 2
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    } else if (alterer[1] === 5) {
                        let newIndex = alterer[2] + 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    }
                } else {
                    if (alterer[1] === 3 || alterer[1] === 5) {
                        let newIndex = alterer[2] + 2
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    }
                }
            } else if (harmonicDistance === 3) {
//LOGIC FOR GOING UP A 3RD
                if ((oldQuality === "Minor" && newQuality === "Major") ||
                    (oldQuality === "Major" && newQuality === "Diminished") ||
                    (oldQuality === "Diminished" && newQuality === "Minor")) {
                        if (alterer[1] === 1) {
                            let newIndex = alterer[2] - 2
                            let newTone = alterer[0].parentElement.children[newIndex]
                            if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                            newTone.classList.add("showing")
                            newTone.style.setProperty("--noteOpacity", 1)
                            alterer[0].classList.remove("showing")
                            alterer[0].style.setProperty("--noteOpacity", 0)
                        } 
                } else {
                    if (alterer[1] === 1) {
                        let newTone = alterer[0].parentElement.children[alterer[2] - 1]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                        alterer[0].classList.remove("showing")
                        alterer[0].style.setProperty("--noteOpacity", 0)
                    }
                }
            } else {
//LOGIC FOR GOING UP A 2ND
                if (oldQuality === "Diminished" && newQuality === "Major") {
                    if (alterer[1] === 1) {
                        let newIndex = alterer[2] + 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    } else {
                        let newTone = alterer[0].parentElement.children[alterer[2] + 2]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    }
                } else if (oldQuality === "Minor" && newQuality === "Diminished") {
                    if (alterer[1] === 5) {
                        let newIndex = alterer[2] + 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    } else {
                        let newTone = alterer[0].parentElement.children[alterer[2] + 2]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    }
                } else if (oldQuality === "Minor" && newQuality === "Major") {
                    if (alterer[1] === 5 || alterer[1] === 1) {
                        let newIndex = alterer[2] + 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    } else {
                        let newTone = alterer[0].parentElement.children[alterer[2] + 2]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    }
                } else if (oldQuality === "Major" && newQuality === "Minor") {
                    if (alterer[1] === 3) {
                        let newIndex = alterer[2] + 1
                        let newTone = alterer[0].parentElement.children[newIndex]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    } else {
                        let newTone = alterer[0].parentElement.children[alterer[2] + 2]
                        if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                        newTone.classList.add("showing")
                        newTone.style.setProperty("--noteOpacity", 1)
                    }
                } else if ((oldQuality === "Minor" && newQuality === "Minor") ||
                    (oldQuality === "Major" && newQuality === "Major")) {
                    let newTone = alterer[0].parentElement.children[alterer[2] + 2]
                    if (newTone === undefined) {
                            
                            this.createOriginalChord(parseInt(harmonicFunction), stringChoice, saveChordRange)
                            i += 50;
                            break;
                        }
                    newTone.classList.add("showing")
                    newTone.style.setProperty("--noteOpacity", 1)
                }
                alterer[0].classList.remove("showing")
                alterer[0].style.setProperty("--noteOpacity", 0)
            }

        }
    }

    hashBuilder(originalElements, startingIndicies, oldChordTones) {
        let hash = new Map()

        for (let i = 0; i < oldChordTones.triad.length; i++) {
            hash[oldChordTones.triad[i]] = [i * 2 + 1]
        }

        for (let i = 0; i < originalElements.length; i++) {
            let ele = originalElements[i].id.split("").slice(2);
            for (let j = 0; j < oldChordTones.triad.length; j++) {

                if (ele.includes(oldChordTones.triad[j][0])) {
                    hash[oldChordTones.triad[j]].unshift(originalElements[i])
                    hash[oldChordTones.triad[j]].push(startingIndicies[i])
                }
            }
        }
        return hash
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

    createVoiceDefaultChordRanges(chord, stringChoice) {
    if (chord === "C Major" || chord === "G Major" || chord === "E Minor") {
        if (stringChoice === "3,4,5" || stringChoice === "4,5,6") {
            return "4, 9"
        } else {
            return "3, 8"
        }
    } else if (chord === "D Minor") {
        if (stringChoice === "3,4,5") {
            return "6, 10"
        } else if (stringChoice === "4,5,6") {
            return "3, 5"
        } else {
            return "5, 7"
        }
    } else if (chord === "F Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "5, 7"
        } else if (stringChoice === "3,4,5") {
            return "5, 8"
        } else {
            return "6, 8"
        }
    } else if (chord === "A Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" ||
            stringChoice === "3,4,5") {
            return "5, 7"
        } else {
            return "6, 8"
        }
    } else if (chord === "B Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "6, 9"
        } else if (stringChoice === "3,4,5") {
            return "3, 5"
        } else {
            return "3, 7"
        }
    } else if (chord === "C Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "3, 5"
        } else {
            return "5, 8"
        }
    } else if (chord === "C Diminished") {
        if (stringChoice === "1,2,3") {
            return "7, 8"
        } else if (stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "4, 6"
        } else {
            return "4, 8"
        }
    } else if (chord === "B Minor" || chord === "B Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "7, 9"
        } else {
            return "4, 7"
        }
    } else if (chord === "Bb Major" || chord === "A# Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "6, 8"
        } else {
            return "3, 6"
        }
    } else if (chord === "Bb Minor" || chord === "A# Minor") {
        if (stringChoice === "4,5,6") {
            return "3,6"
        } else {
            return "6, 9"
        }
    } else if (chord === "Bb Diminished" || chord === "A# Diminished") {
        if (stringChoice === "1,2,3") {
            return "5, 6"
        } else if (stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "5, 8"
        } else {
            return "7, 9"
        }
    } else if (chord === "A Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "5, 7"
        } else {
            return "2, 5"
        }
    } else if (chord === "A Diminished") {
        if (stringChoice === "1,2,3") {
            return "4, 5"
        } else if (stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "4, 7"
        } else {
            return "6, 8"
        }
    } else if (chord === "Ab Major" || chord === "G# Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "4, 6"
        } else {
            return "6, 8"
        }
    } else if (chord === "Ab Minor" || chord === "G# Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "4, 6"
        } else {
            return "6, 7"
        }
    } else if (chord === "Ab Diminished" || chord === "G# Diminished") {
        if (stringChoice === "1,2,3") {
            return "3, 4"
        } else if (stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "3, 6"
        } else {
            return "5, 7"
        }
    } else if (chord === "G Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "3, 5"
        } else {
            return "5, 6"
        }
    } else if (chord === "G Diminished") {
        if (stringChoice === "1,2,3") {
            return "2, 3"
        } else if (stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "2, 5"
        } else {
            return "4, 6"
        }
    } else if (chord === "Gb Major" || chord === "F# Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "6, 8"
        } else if (stringChoice === "3,4,5") {
            return "6, 9"
        } else {
            return "8, 9"
        }
    } else if (chord === "Gb Minor" || chord === "F# Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "5, 7"
        } else if (stringChoice === "3,4,5") {
            return "6, 9"
        } else {
            return "7, 9"
        }
    } else if (chord === "Gb Diminished" || chord === "F# Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "5, 7"
        } else if (stringChoice === "3,4,5") {
            return "5, 9"
        } else {
            return "7, 9"
        }
    } else if (chord === "F Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4,6"
        } else if (stringChoice === "3,4,5") {
            return "5, 8"
        } else {
            return "6, 8"
        }
    } else if (chord === "F Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4, 6"
        } else if (stringChoice === "3,4,5") {
            return "4, 8"
        } else {
            return "6, 8"
        }
    } else if (chord === "E Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4, 6"
        } else if (stringChoice === "3,4,5") {
            return "4, 7"
        } else {
            return "6, 7"
        }
    } else if (chord === "E Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "3, 5"
        } else if (stringChoice === "3,4,5") {
            return "3, 7"
        } else {
            return "5, 7"
        }
    } else if (chord === "Eb Major" || chord === "D# Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "6, 8"
        } else if (stringChoice === "3,4,5") {
            return "3, 6"
        } else {
            return "5, 6"
        }
    } else if (chord === "Eb Minor" || chord === "D# Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "6, 8"
        } else if (stringChoice === "3,4,5") {
            return "8, 9"
        } else {
            return "4, 6"
        }
    } else if (chord === "Eb Diminished" || chord === "D# Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "2, 4"
        } else if (stringChoice === "3,4,5") {
            return "2, 6"
        } else {
            return "4, 6"
        }
    } else if (chord === "D Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "5, 7"
        } else if (stringChoice === "3,4,5") {
            return "2, 5"
        } else {
            return "4, 5"
        }
    } else if (chord === "D Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4, 7"
        } else if (stringChoice === "3,4,5") {
            return "6, 8"
        } else {
            return "3, 5"
        }
    } else if (chord === "Db Major" || chord === "C# Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4, 6"
        } else if (stringChoice === "3,4,5") {
            return "6, 8"
        } else {
            return "3, 4"
        }
    } else if (chord === "Db Minor" || chord === "C# Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4, 6"
        } else if (stringChoice === "3,4,5") {
            return "6, 7"
        } else {
            return "6, 9"
        }
    } else {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "3, 6"
        } else if (stringChoice === "3,4,5") {
            return "5, 7"
        } else {
            return "4, 8"
        }
    }
}

}



export default voiceLead;