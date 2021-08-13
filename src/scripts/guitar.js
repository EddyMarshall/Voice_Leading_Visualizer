import guitarString from "./guitarstring"

class Guitar {
    constructor(body) {
        this.standardTuning = true
        this.strings = []
        this.body = body
        this.setupGuitar()
        // this.handleClick = this.handleClick.bind(this);
        // this.ele.addEventListener("click", this.handleClick());
    }

    setupGuitar() {
        const guitarDiv = document.createElement("div")
        guitarDiv.classList.add("guitar")

        this.body.appendChild(guitarDiv);
        if (this.standardTuning === true) {
            const array = ["E", "B", "G", "D", "A", "E"]
            for (let i = 0; i < array.length; i++) {
                const stringDiv = document.createElement("div");
                stringDiv.classList.add("guitarstring")

                const addition = new guitarString(array[i])
                for (let i = 0; i < addition.notes.length; i++) {
                    const noteDiv = document.createElement("div");
                    noteDiv.classList.add("note")
                    noteDiv.innerHTML = `${addition.notes[i]}`
                    stringDiv.appendChild(noteDiv)
                }
                this.strings.push(addition)
                guitarDiv.appendChild(stringDiv);
            }
        }
    }

    // handleClick() {
    //     this.ele.chilren[0].innerText = "Ouch";
    // }
}


export default Guitar;

