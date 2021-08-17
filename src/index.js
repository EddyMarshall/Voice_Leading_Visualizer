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
                content = new voiceLead("C", 1)
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
            content.showChord(1)
            menu.options[menu.selectedIndex].innerHTML = `${content.chords[0].name} ${content.chords[0].quality}`
            menu.options[menu.selectedIndex].value = `${content.chords[0].name} ${content.chords[0].quality}`
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
        document.getElementById("dynamic").innerHTML = ""
        const currentMenu = document.getElementById("voice-leading-menus")
        if (button.innerText === "Enter Voice Leading Mode") {
            button.innerText = "Exit Voice Leading Mode"
            content = new voiceLead("content.key", 1);
            addFretDots();
            currentMenu.style.visibility = "visible"
            if (currentMenu.children.length === 0) {
                makeVoiceLeadingMenus();
            }
        } else {
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
        parent.addEventListener("change", adjustVoiceLeading.bind(content, ...[]))
    }

    function adjustVoiceLeading(content) {


        const stringChoices = document.getElementById("string-selector");
        const stringChoice = stringChoices.options[stringChoices.selectedIndex].value;

        let chordMenu = document.getElementById("chord-change");
        let harmonicFunction = chordMenu.options[chordMenu.selectedIndex].value;

        if (harmonicFunction === "Choose Chord") {
            harmonicFunction = 1;
        }
        let fretRange = "";
        if (harmonicFunction === 1 || parseInt(harmonicFunction) === 3 || 
            parseInt(harmonicFunction) === 5) {
            if (stringChoice === "3,4,5" || stringChoice === "4,5,6") {
                    fretRange += "4, 9"
                } else {
                    fretRange += "3, 8"
                }
            } else if (parseInt(harmonicFunction) === 2) {          
                if (stringChoice === "3,4,5") {
                    fretRange += "6, 10"
                } else if (stringChoice === "4,5,6") {
                    fretRange += "3, 5"
                } else {
                    fretRange += "5, 7"
                }
            } else if (parseInt(harmonicFunction) === 4) {
                if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
                    fretRange += "5, 7"
                } else if (stringChoice === "3,4,5") {
                    fretRange += "5, 8"
                } else {
                    fretRange += "6, 8"
                }
            } else if (parseInt(harmonicFunction) === 6) {
                if (stringChoice === "1,2,3" || stringChoice === "2,3,4" ||
                    stringChoice === "3,4,5") {
                        fretRange += "5, 7"
                } else {
                    fretRange += "6, 8"
                }
            } else if (parseInt(harmonicFunction) === 7) {
                if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
                  fretRange += "6, 9"
                } else if (stringChoice === "3,4,5") {
                    fretRange += "3, 5"
                } else {
                    fretRange += "3, 7"
                }


        }
        this.createOriginalChord(harmonicFunction, stringChoice, fretRange)
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



})


