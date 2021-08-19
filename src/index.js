import Guitar from "./scripts/guitar"
import voiceLead from "./scripts/voicelead"




document.addEventListener("DOMContentLoaded", ()=>{

    const helpButton = document.getElementById("tutorial")
    
    helpButton.addEventListener("mouseover", () => {
        const tutorialInfo = document.getElementById("tutorial-image")
        tutorialInfo.style.setProperty("--tutorial-image", "block")
    })

    helpButton.addEventListener("mouseout", () => {
        const tutorialInfo = document.getElementById("tutorial-image")
        tutorialInfo.style.setProperty("--tutorial-image", "none")
    })

    //initializes with default setting
    const body = document.getElementById("body")
    const dynamic = document.getElementById("dynamic")
    let content = new Guitar(body, "C", dynamic);
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
        const cyclerMenu = document.getElementById("cycle-selector-menus")
        const currentRange = createDefaultChordRanges(`${content.key} Major`, "1, 2, 3")
        
        if (button.innerText === "Enter Voice Leading Mode") {
            button.innerText = "Exit Voice Leading Mode"
            content = new voiceLead(content.key, 1, "1, 2, 3", currentRange);
            addFretDots();
            currentMenu.style.visibility = "visible"
            cyclerMenu.style.visibility = "visible"
            if (currentMenu.children.length === 0) {
                makeVoiceLeadingMenus();
            }
            radio[0].style.setProperty("--navdisplay", "none")
            currentMenu.firstElementChild.firstElementChild.selected = "selected"
        } else {
            radio[0].style.setProperty("--navdisplay", "flex")
            button.innerText = "Enter Voice Leading Mode"
            currentMenu.style.visibility = "hidden"
            cyclerMenu.style.visibility = "hidden"
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

        let cycleParent = document.getElementById("cycle-selector-menus");
        const cycleSelector = document.createElement("select")
        cycleSelector.classList.add("VL-menu")
        cycleSelector.id = "harmonic-distance"

        for (let i = 1; i < 7; i++) {
            let choice = document.createElement("option")
            choice.value = i
            if (i === 1) {
                choice.innerText = "Seconds"
            } else if (i === 2) {
                choice.innerText = "Thirds"
            } else if (i === 3) {
                choice.innerText = "Fourths"
            } else if (i === 4) {
                choice.innerText = "Fifths"
            } else if (i === 5) {
                choice.innerText = "Sixths"
            } else if (i === 6) {
                choice.innerText = "Sevenths"
            }
            cycleSelector.appendChild(choice)
        }


        parent.appendChild(stringOption)
        cycleParent.appendChild(cycleSelector)
        parent.style.visibility = "visible"
        parent.addEventListener("change", adjustVoiceLeading)
    }

    function adjustVoiceLeading() {
        let chord = document.getElementsByTagName("h4")[0].innerText


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
        const diatribes = document.getElementsByClassName("diatribe")

        
        if (darkModeButton.innerText === "Dark Mode") {
            topHeader[0].style.setProperty("color", "white")
            radios[0].style.setProperty("color", "white")
            radios[1].style.setProperty("color", "white")
            diatribes[0].style.setProperty("color", "white")
            diatribes[1].style.setProperty("color", "white")
            darkModeButton.innerText = "Light Mode"
            body.style.setProperty("--bodyColor", "black")

            if (bottomHeader.length != 0) {
                bottomHeader[0].style.setProperty("color", "white")
            }
        

        } else {
            topHeader[0].style.setProperty("color", "black")
            radios[0].style.setProperty("color", "black")
            radios[1].style.setProperty("color", "black")
            diatribes[0].style.setProperty("color", "black")
            diatribes[1].style.setProperty("color", "black")

            darkModeButton.innerText = "Dark Mode"
            body.style.setProperty("--bodyColor", "aliceblue")

            if (bottomHeader.length != 0) {
                bottomHeader[0].style.setProperty("color", "black")
            }
        }
    }

    //add event listeners to cycling designator
    document.addEventListener('keydown', (e) => {
        if (document.getElementById("voice-lead-toggle").innerText === "Enter Voice Leading Mode") {
            return
        }
        const stringChoices = document.getElementById("string-selector");
        const stringChoice = stringChoices.options[stringChoices.selectedIndex].value;
        const a = document.getElementById("harmonic-distance")
        let harmonicFunction = (parseInt(content.oldHarmonicFunction) + parseInt(a.options[a.selectedIndex].value));
        if (harmonicFunction === 0 || harmonicFunction === 8) {
            harmonicFunction = 1
        } else if (harmonicFunction === 9) {
            harmonicFunction = 2
        } else if (harmonicFunction === 10) {
            harmonicFunction = 3
        } else if (harmonicFunction === 11) {
            harmonicFunction = 4
        } else if (harmonicFunction === 12) {
            harmonicFunction = 5
        } else if (harmonicFunction === 13) {
            harmonicFunction = 6
        } else if (harmonicFunction === 14) {
            harmonicFunction = 7
        }
        if (document.getElementById("voice-lead-toggle").innerText === "Exit Voice Leading Mode") {
            if (e.key === " ") {
                content.showNextTriad(harmonicFunction, stringChoice)
            }
        }
    });


    

    
            

 



    


})


