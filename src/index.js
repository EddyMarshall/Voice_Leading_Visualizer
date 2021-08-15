import Guitar from "./scripts/guitar"
import voiceLead from "./scripts/voicelead"
import MenuMaker from "./scripts/menumaker"


document.addEventListener("DOMContentLoaded", ()=>{

    //initializes with default setting
    const body = document.getElementById("body")
    const dynamic = document.getElementById("dynamic")
    let content = new Guitar(body, "C", dynamic);
    let menus = new MenuMaker();
    // let content = new voiceLead([1, 2, 3], [6, 12]);
    addToggleListener();
    addChordChangeListener();
    addVoiceLeadToggleEventListener();
    
    //Re-renders the page based on the KEY selected in the DD menu
    const keyChange = document.getElementById("key-change")
    keyChange.addEventListener("change", changeKey);
    function changeKey() {
        let menu = document.getElementById("key-change");
        let newKey = menu.options[menu.selectedIndex].value;
        document.getElementById("dynamic").innerHTML = ""
        resetChordMenu();
        if (document.getElementById("voice-lead-toggle").innerText = "Exit Voice Leading Mode") {
            content = new voiceLead([1, 2, 3], [6, 12], newKey)
        } else {
            content = new Guitar(body, newKey, dynamic);
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
        if (button.innerText === "Exit Voice Leading Mode") {
            button.click();
        }
        let menu = document.getElementById("chord-change");
        let harmonicFunction = menu.options[menu.selectedIndex].value;
        if (harmonicFunction === "Choose Chord") {
            content.showChord(1)
            menu.options[menu.selectedIndex].innerHTML = `${content.chords[0].name} ${content.chords[0].quality}`
            menu.options[menu.selectedIndex].value = `${content.chords[0].name} ${content.chords[0].quality}`
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
            content = new voiceLead([1, 2, 3], [6, 12], content.key);
            currentMenu.style.visibility = "visible"
            if (currentMenu.children.length === 0) {
                menus.makeVoiceLeadingMenus();
            }
        } else {
            button.innerText = "Enter Voice Leading Mode"
            currentMenu.style.visibility = "hidden"
            content = new Guitar(body, content.guitar.key, dynamic);
        }
        resetChordMenu();
        addChordChangeListener();
    }


    //add event listeners to voice leading menus



    



})


