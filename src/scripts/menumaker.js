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
        parent.appendChild(cycleSelector)
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












    
    

}




export default MenuMaker;