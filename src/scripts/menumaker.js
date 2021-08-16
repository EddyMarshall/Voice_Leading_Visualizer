class MenuMaker {
    constructor() {
    }    

    hello() {
        console.log("hello")
    }

    makeVoiceLeadingMenus(){
        let parent = document.getElementById("voice-leading-menus");
        const stringOption = document.createElement("select")
        stringOption.classList.add("VL-menu")
        stringOption.id = "string-selector"
        const fretRanges = document.createElement("select")
        fretRanges.classList.add("VL-menu")
        fretRanges.id = "fret-range-selector"


        for (let i = 1; i < 5; i++) {
            let choice = document.createElement("option")
            choice.value = [i, i + 1, i + 2]
            choice.innerText = `strings: ${i}, ${i + 1}, ${i + 2}`
            stringOption.appendChild(choice)
        }

        let fretchoice1 = document.createElement("option")
            fretchoice1.value = [0, 6]
            fretchoice1.innerText = "Frets: 0 - 6"
            fretRanges.appendChild(fretchoice1)
        let fretchoice2 = document.createElement("option")
            fretchoice2.value = [5, 12]
            fretchoice2.innerText = "Frets: 5 - 12"
            fretRanges.appendChild(fretchoice2)
        
        parent.appendChild(stringOption)

        parent.appendChild(fretRanges)
        parent.style.visibility = "visible"

        parent.addEventListener("change", this.adjustVoiceLeading)
    }

    adjustVoiceLeading() {
        
    }

}




export default MenuMaker;