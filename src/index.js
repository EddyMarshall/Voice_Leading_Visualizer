import Guitar from "./scripts/guitar"
import Scale from "./scripts/scale"
import guitarString from "./scripts/guitarstring"


document.addEventListener("DOMContentLoaded", ()=>{


    const body = document.getElementById("body")
    const guitar1 = new Guitar(body, "G");
    const guitar2 = new Guitar(body, "Bb");

    console.log(guitar1);
    console.log(guitar2);

})


