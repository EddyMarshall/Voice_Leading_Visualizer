import Guitar from "./scripts/guitar"
import Chord from "./scripts/chord";


document.addEventListener("DOMContentLoaded", ()=>{


    const body = document.getElementById("body")
    // const guitar1 = new Guitar(body, "G");
    const guitar2 = new Guitar(body, "Eb");
    // const chord = new Chord("B", "Major", ["A", "B", "C#", "D", "E", "F#", "G#"])
    console.log(guitar2)

    // let strings = document.getElementsByClassName("guitarstring")
    // for (let i = 0; i < strings.length; i++) {
    //     strings[i].addEventListener("mouseover", (event) => {
    //         event.target.style.setProperty("--noteOpacity", 1)
    //     })
    //     strings[i].addEventListener("mouseout", (event) => {
    //         event.target.style.setProperty("--noteOpacity", 0)
    //     })

    // }
    


})


