import Chord from "./chord";
import guitarString from "./guitarstring"
import Scale from "./scale";

class Guitar {
    constructor(body, key, dynamic) {
        this.key = key
        this.strings = []
        this.body = body
        this.dynamic = dynamic
        this.header = this.createHeader(key)
        this.accidentals = this.buildAccidentals();
        this.setupGuitar(key)
        this.scale = new Scale(key, this.accidentals);
        this.chords = this.buildChords(this.scale.notes)
        this.showNotes(this.scale.notes)
    }

    buildAccidentals() {
        if (this.key.split("").includes("b") || this.key === "F") {
            return ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"];
        } else {
            return ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
        }
    }

    createHeader(key) {
        const header = document.createElement("h1")
        header.innerHTML = `Key of ${key} Major`
        this.dynamic.appendChild(header);
    }

    setupGuitar(key) {
        const guitarDiv = document.createElement("div")
        guitarDiv.classList.add("guitar")
        this.dynamic.appendChild(guitarDiv);
        const array = ["E", "B", "G", "D", "A", "E"]

        for (let i = 0; i < array.length; i++) {
            const stringDiv = document.createElement("div");
            stringDiv.classList.add("guitarstring")
            const addition = new guitarString(array[i], key, this.accidentals)
            for (let i = 0; i < addition.accidentals.length; i++) {
                const noteDiv = document.createElement("div");
                noteDiv.classList.add(`note`)
                noteDiv.classList.add(`${addition.accidentals[i]}`)
                noteDiv.setAttribute("data-note-short", `${addition.accidentals[i]}`)
                if (addition.accidentals[i].split("").includes("#")) {
                    noteDiv.setAttribute("data-note-long", `${addition.accidentals[i][0]}sharp`)
                }

                stringDiv.appendChild(noteDiv)
            }
            this.strings.push(addition)
            guitarDiv.appendChild(stringDiv);
        }
    }

    buildChords(scale) {
        let newArr = []
        for (let i = 0; i < scale.length; i++) {
            if (i === 0 || i === 3 || i === 4) {
                newArr.push(new Chord(scale[i], "Major", scale, i + 1))
            } else if (i === 1 || i === 2 || i === 5) {
                newArr.push(new Chord(scale[i], "Minor", scale, i + 1))
            } else if (i === 6) {
                newArr.push(new Chord(scale[i], "Diminished", scale, i + 1))
            }
        }
        const changeChordForm = document.createElement("select");
        changeChordForm.classList.add("chord-change")
        changeChordForm.id = "chord-change"
        changeChordForm.innerHTML += `<option>Choose Chord</option>`;
        for (let i = newArr.length - 1; i >= 0; i--) {
            let valueArr = ["'", `${i + 1}`, "'"];
            let input = `<option value=${valueArr.join("")}>${newArr[i].name} ${newArr[i].quality}</option>`;
            changeChordForm.innerHTML += input;
        }
        const nav = document.getElementById("nav")
        nav.appendChild(changeChordForm)
        return newArr
    }

    showNotes(scale) {
        for (let i = 0; i < scale.length; i++) {
            if (!scale[i].split("").includes("#")) {
                let shows = document.querySelectorAll(`[data-note-short=${scale[i]}]`)
                shows.forEach(function (ele) {
                    ele.style.setProperty("--noteOpacity", 1)
                });
            } else {
                let shows = document.querySelectorAll(`[data-note-long=${scale[i][0]}sharp]`)
                shows.forEach(function (ele) {
                    ele.style.setProperty("--noteOpacity", 1)
                });
            }
            
        }
    }

    showChord(num) {

        let clearNotes = document.querySelectorAll(".note")
        clearNotes.forEach(function(ele) {
            ele.style.setProperty("--noteOpacity", 0)
        })
        let show = this.chords[num - 1]
        for (let i = 0; i < show.triad.length; i++) {
            if (!show.triad[i].includes("#")) {
                let shows = document.querySelectorAll(`[data-note-short=${show.triad[i]}]`)
                shows.forEach(function (ele) {
                    ele.style.setProperty("--noteOpacity", 1)
                });
            } else {
                let shows = document.querySelectorAll(`[data-note-long=${show.triad[i][0]}sharp]`)
                shows.forEach(function (ele) {
                    ele.style.setProperty("--noteOpacity", 1)
                });
            }
        }
    }


}


export default Guitar;

