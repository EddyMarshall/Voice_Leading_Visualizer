import Guitar from "./scripts/guitar"
import Scale from "./scripts/scale"


document.addEventListener("DOMContentLoaded", ()=>{


    const body = document.getElementById("body")
    const guitar1 = new Guitar(body, "G");
    // const guitar2 = new Guitar(body, "Bb");

    console.log(guitar1);
    // console.log(guitar2);

    const scale1 = new Scale("B");
    console.log(scale1)
})


