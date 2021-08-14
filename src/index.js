import Guitar from "./scripts/guitar"
import Chord from "./scripts/chord"


document.addEventListener("DOMContentLoaded", ()=>{

    //initializes with default setting
    const body = document.getElementById("body")
    const dynamic = document.getElementById("dynamic")
    let content = new Guitar(body, "C", dynamic);
    
    //Re-renders the page based on the KEY selected in the DD menu
    const keyChange = document.getElementById("key-change")
    keyChange.addEventListener("change", changeKey);
    function changeKey() {
        let menu = document.getElementById("key-change");
        let newKey = menu.options[menu.selectedIndex].value;
        document.getElementById("dynamic").innerHTML = ""
        resetChordMenu();
        content = new Guitar(body, newKey, dynamic);
    }

    //helper method to alter selectable chords depending on chosen key
    function resetChordMenu() {
        const menu = document.getElementById("chord-change");
        menu.parentNode.removeChild(menu);
    }


    // Re-renders the page based on the CHORD selected in the chord DD menu
    const newChord = document.getElementById("chord-change")
    newChord.addEventListener("change", showChord);
    function showChord() {
        let menu = document.getElementById("chord-change");
        let harmonicFunction = menu.options[menu.selectedIndex].value;
        content.showChord(harmonicFunction)
    }

    



})


