import Guitar from "./scripts/guitar"


document.addEventListener("DOMContentLoaded", ()=>{

    //initializes with default setting
    const body = document.getElementById("body")
    const dynamic = document.getElementById("dynamic")
    let content = new Guitar(body, "C", dynamic);
    addChordChangeListener();
    
    //Re-renders the page based on the KEY selected in the DD menu
    const keyChange = document.getElementById("key-change")
    keyChange.addEventListener("change", changeKey);
    function changeKey() {
        let menu = document.getElementById("key-change");
        let newKey = menu.options[menu.selectedIndex].value;
        document.getElementById("dynamic").innerHTML = ""
        resetChordMenu();
        content = new Guitar(body, newKey, dynamic);
        addChordChangeListener();
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
        let menu = document.getElementById("chord-change");
        let harmonicFunction = menu.options[menu.selectedIndex].value;
        content.showChord(harmonicFunction)
    }

    



})


