class MenuMaker {
    constructor() {
    }    



    makeVoiceLeadingMenus(){
        let parent = document.getElementById("voice-leading-menus");
        const stringOption = document.createElement("select")
        stringOption.classList.add("VL-menu")
        stringOption.id = "string-selector"


        for (let i = 1; i < 5; i++) {
            let choice = document.createElement("option")
            choice.value = [i, i + 1, i + 2]
            choice.innerText = `strings: ${i}, ${i + 1}, ${i + 2}`
            stringOption.appendChild(choice)
        }


        
        parent.appendChild(stringOption)
        parent.style.visibility = "visible"

        parent.addEventListener("change", this.adjustVoiceLeading)
    }

    adjustVoiceLeading(content) {
        let menu = document.getElementById("key-change");
        let newKey = menu.options[menu.selectedIndex].value;

        const stringChoices = document.getElementById("string-selector");
        const stringChoice = stringChoices.options[stringChoices.selectedIndex].value;

        let chordMenu = document.getElementById("chord-change");
        let harmonicFunction = chordMenu.options[chordMenu.selectedIndex].value;

        if (harmonicFunction === "Choose Chord") {
            harmonicFunction = 1;
        }

        debugger

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
    

}




export default MenuMaker;