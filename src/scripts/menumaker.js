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

    

}




export default MenuMaker;