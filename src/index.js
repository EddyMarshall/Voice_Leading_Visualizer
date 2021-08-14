import Guitar from "./scripts/guitar"
import Scale from "./scripts/scale"


document.addEventListener("DOMContentLoaded", ()=>{


    const body = document.getElementById("body")
    const dynamic = document.getElementById("dynamic")
    let content = new Guitar(body, "C", dynamic);
    // let test = new Scale("Eb", ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"])
    // console.log(test)
    function changeKey() {
        let menu = document.getElementById("key-change");
        let newKey = menu.options[menu.selectedIndex].value;
        document.getElementById("dynamic").innerHTML = ""
        content = new Guitar(body, newKey, dynamic);
    }
    body.addEventListener("change", changeKey);
    



})


