import generateJoke from "./generateJoke";
import "../styles/sass/main.scss";
// import "./styles/css/main.css"
import laughing from "../assets/laughing.svg";

// kod koji za src slike iz template.html postavlja putanju do statickog resursa
const laughImg = document.getElementById("laughImg");
laughImg.src = laughing;

const jokeBtn = document.getElementById("jokeBtn");
jokeBtn.addEventListener("click", generateJoke);

generateJoke();
console.log("Testiranje potrosnje.")
