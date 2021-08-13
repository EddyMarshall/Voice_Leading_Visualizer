import Guitar from "./scripts/guitar"


document.addEventListener("DOMContentLoaded", ()=>{


    const body = document.getElementById("body")
    const content = new Guitar(body);
    console.log(content)
})

