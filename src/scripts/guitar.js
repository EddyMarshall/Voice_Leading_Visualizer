import guitarString from "./guitarstring"
import Scale from "./scale";

class Guitar {
    constructor(body, key) {
        this.strings = []
        this.body = body
        this.key = key
        this.setupGuitar(key)
        this.scale = new Scale(key);
    }

    setupGuitar(key) {
        const guitarDiv = document.createElement("div")
        guitarDiv.classList.add("guitar")
        this.body.appendChild(guitarDiv);
        const array = ["E", "B", "G", "D", "A", "E"]

        for (let i = 0; i < array.length; i++) {
            const stringDiv = document.createElement("div");
            stringDiv.classList.add("guitarstring")
            const addition = new guitarString(array[i], key)

            for (let i = 0; i < addition.notes.length; i++) {
                const noteDiv = document.createElement("div");
                noteDiv.classList.add(`note`)
                noteDiv.classList.add(`${addition.notes[i]}`)
                noteDiv.setAttribute("data-note", `${addition.notes[i]}`)
                stringDiv.appendChild(noteDiv)
            }
            this.strings.push(addition)
            guitarDiv.appendChild(stringDiv);
        }
    }



}


export default Guitar;

