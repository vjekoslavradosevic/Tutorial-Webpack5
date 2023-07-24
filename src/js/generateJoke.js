import axios from "axios";

function generateJoke() {
    const config = {
        headers: {
            Accept: "application/json",
        },
    };

    axios.get("https://icanhazdadjoke.com", config).then((res) => {
        document.getElementById("joke").innerHTML = res.data.joke;
    });
}

export function generateDefaultJoke() {
    return "What's the best thing about Switzerland? I don't know, but the flag is a big plus.";
}

export default generateJoke;
