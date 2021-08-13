import Guitar from "./scripts/guitar"


document.addEventListener("DOMContentLoaded", ()=>{


    const body = document.getElementById("body")
    const guitar1 = new Guitar(body, "sharp");
    const guitar2 = new Guitar(body, "flat");
})


