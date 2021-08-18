import Guitar from "./scripts/guitar"
import voiceLead from "./scripts/voicelead"
import MenuMaker from "./scripts/menumaker"


document.addEventListener("DOMContentLoaded", ()=>{

    //initializes with default setting
    const body = document.getElementById("body")
    const dynamic = document.getElementById("dynamic")
    let content = new Guitar(body, "C", dynamic);
    let menus = new MenuMaker();
    addToggleListener();
    addChordChangeListener();
    addVoiceLeadToggleEventListener();
    addFretDots();
    addFretNums();
    
    //Re-renders the page based on the KEY selected in the DD menu
    const keyChange = document.getElementById("key-change")
    keyChange.addEventListener("change", changeKey);

    function changeKey() {
            let menu = document.getElementById("key-change");
            let newKey = menu.options[menu.selectedIndex].value;

            

            document.getElementById("dynamic").innerHTML = ""
            resetChordMenu();
            if (document.getElementById("voice-lead-toggle").innerText === "Enter Voice Leading Mode") {
                content = new Guitar(body, newKey, dynamic);
                addFretDots()
            } else {      
                const stringChoices = document.getElementById("string-selector");
                const stringChoice = stringChoices.options[stringChoices.selectedIndex].value;
                let fretRange = createDefaultChordRanges(`${newKey} Major`, stringChoice)
                content = new voiceLead(newKey, 1, stringChoice, fretRange)
                addFretDots()
            }
            document.getElementsByName("show-toggle")[0].checked = true
            document.getElementsByName("show-toggle")[1].checked = false
            addChordChangeListener();
            addVoiceLeadToggleEventListener();
    }

    //helper method to alter selectable chords depending on chosen key
    function resetChordMenu() {
        const menu = document.getElementById("chord-change");
        menu.parentNode.removeChild(menu);
    }

    function addChordChangeListener() {
        const newChord = document.getElementById("chord-change")
        newChord.addEventListener("change", showChord);
    }


    
    // Re-renders the page based on the CHORD selected in the chord DD menu
    function showChord() {
        let button = document.getElementById("voice-lead-toggle")
        let menu = document.getElementById("chord-change");
        let harmonicFunction = menu.options[menu.selectedIndex].value;
        if (harmonicFunction === "Choose Chord") {
            harmonicFunction = 1
        }
        if (button.innerText === "Exit Voice Leading Mode") {
            const stringChoices = document.getElementById("string-selector");
            const stringChoice = stringChoices.options[stringChoices.selectedIndex].value;
            content.showNextTriad(harmonicFunction, stringChoice)
        } else {
            content.showChord(harmonicFunction)
        }
        document.getElementsByName("show-toggle")[0].checked = false
        document.getElementsByName("show-toggle")[1].checked = true
    }

    //adds listener to radio buttons
    function addToggleListener() {
        const radioSelection = document.getElementsByName("show-toggle")
        radioSelection.forEach(function(ele) {
            ele.addEventListener("change", scalesToggle)
        })
    }

    //adjusts page depending on scale/chord radio selection
    function scalesToggle() {
        let defaultChord = document.getElementById("chord-change").options[7];
        const radioSelection = document.getElementsByName("show-toggle")[0];
        let chordMenu = document.getElementById("chord-change");
        let prevSelected = chordMenu.options[chordMenu.selectedIndex];

        if (radioSelection.checked === true) {
            content.showNotes(content.scale.notes);
            document.getElementById("chord-change").firstChild.innerHTML = "Choose Chord"
        } else {
            if (prevSelected.value === "Choose Chord") {
                document.getElementById("chord-change").firstChild.innerHTML = `${defaultChord.innerHTML}`
                document.getElementById("chord-change").firstChild.value = "1"
                content.showChord(defaultChord.value)
            } else {
                content.showChord(prevSelected.value)    
            }
        }
    }

    //adds event listener to voice leading mode button
    function addVoiceLeadToggleEventListener() {
        const button = document.getElementById("voice-lead-toggle");
        button.addEventListener("click", switchModes)
    }

    function switchModes() {
        const button = document.getElementById("voice-lead-toggle");
        const radio = document.getElementsByClassName("navradios")
        document.getElementById("dynamic").innerHTML = ""
        const currentMenu = document.getElementById("voice-leading-menus")
        if (button.innerText === "Enter Voice Leading Mode") {
            button.innerText = "Exit Voice Leading Mode"
            content = new voiceLead(content.key, 1);
            addFretDots();
            currentMenu.style.visibility = "visible"
            if (currentMenu.children.length === 0) {
                makeVoiceLeadingMenus();
            }
            radio[0].style.setProperty("--navdisplay", "none")
            currentMenu.firstElementChild.firstElementChild.selected = "selected"
        } else {
            radio[0].style.setProperty("--navdisplay", "flex")
            button.innerText = "Enter Voice Leading Mode"
            currentMenu.style.visibility = "hidden"
            content = new Guitar(body, content.guitar.key, dynamic);
            addFretDots();
        }
        resetChordMenu();
        addChordChangeListener();
    }

    function makeVoiceLeadingMenus() {
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
        parent.addEventListener("change", adjustVoiceLeading)
    }

    function adjustVoiceLeading() {
        let menu = document.getElementById("chord-change");
        let chord = menu.options[menu.selectedIndex].innerText;
        if (chord === "Choose Chord") {
            chord = `${content.guitar.key} Major`
        }
        const stringChoices = document.getElementById("string-selector");
        const stringChoice = stringChoices.options[stringChoices.selectedIndex].value;

        let harmonicFunction = 0
        for (let i = 0; i < content.guitar.chords.length; i++) {
            if (chord === `${content.guitar.chords[i].name} ${content.guitar.chords[i].quality}`) {
                harmonicFunction = i + 1
            }
        }

        let fretRange = createDefaultChordRanges(chord, stringChoice)

        content.createOriginalChord(harmonicFunction, stringChoice, fretRange)
        
    }




    function addFretDots() {
        let middleString = document.getElementsByClassName("guitarstring")[2];
        for (let i = 0; i < middleString.children.length; i++) {
            if (i === 3 || i === 5 || i === 7 || i === 9 ) {
                middleString.children[i].classList.add("dot-marker")
            }
        }
    }
    

    function addFretNums() {
        let firstString = document.getElementsByClassName("guitarstring")[0];
        for (let i = 0; i < firstString.children.length; i++) {
            if (i === 0 || i === 2 || i === 4 || i === 6 || i === 8) {
                firstString.children[i].classList.add("fret-number")
            }
        }
    }

    //add class to chord menu
    let currentChordMenu = document.getElementById("chord-change");
    currentChordMenu.classList.add("dropdown")


    //add event listener to darkMode
    const darkModeButton = document.getElementById("dark-Mode-toggle");
    darkModeButton.addEventListener("click", darkModeToggle)
    
    function darkModeToggle() {
        const darkModeButton = document.getElementById("dark-Mode-toggle");
        const topHeader = document.getElementsByTagName("h1")
        const bottomHeader = document.getElementsByTagName("h4")
        const body = document.getElementById("body");
        const radios = document.getElementsByTagName("label")

        
        if (darkModeButton.innerText === "Dark Mode") {
            topHeader[0].style.setProperty("color", "white")
            topHeader[1].style.setProperty("color", "white")
            radios[0].style.setProperty("color", "white")
            radios[1].style.setProperty("color", "white")
            darkModeButton.innerText = "Light Mode"
            body.style.setProperty("--bodyColor", "MidnightBlue")

            if (bottomHeader.length != 0) {
                bottomHeader[0].style.setProperty("color", "white")
            }
        

        } else {
            topHeader[0].style.setProperty("color", "black")
            topHeader[1].style.setProperty("color", "black")
            radios[0].style.setProperty("color", "black")
            radios[1].style.setProperty("color", "black")

            darkModeButton.innerText = "Dark Mode"
            body.style.setProperty("--bodyColor", "aliceblue")

            if (bottomHeader.length != 0) {
                bottomHeader[0].style.setProperty("color", "black")
            }
        }
    }





    function createDefaultChordRanges(chord, stringChoice) {
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


})


