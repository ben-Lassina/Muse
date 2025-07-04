const video          = document.getElementById("animatie");
const vragen         = document.getElementById("vraag-container");
const start          = document.getElementById("start-container");
const videoBestanden = ["VideoMuse.mp4"];
let index            = 0,
    vragenActief     = false,
    videoActive      = false,
    myTimeout;

function speelVolgendeVideo() {
    setLocalTimeout();
    hideTotal();
    if (index < videoBestanden.length) {
        videoActive         = true;
        video.style.display = "flex";
        video.src           = videoBestanden[index];
        video.play();
        index++;
    } else {
        toonVragen();
    }
}

video.addEventListener("ended", () => {
    if (!vragenActief) speelVolgendeVideo();
});

/**
 * Start de applicatie en toon de eerste video
 */
function toonVragen() {
    start.style.display                             = "none";
    vragen.style.display                            = "flex";
    document.getElementById("vraag1").style.display = "block";
    document.getElementById("vraag2").style.display = "none";
    document.getElementById("vraag3").style.display = "none";
    document.getElementById("vraag4").style.display = "none";

    vragenActief = true;
    videoActive  = false;
}

/**
 * Start de applicatie en toon de startscherm
 */
function toonStart() {
    hideTotal();
    index                = 0;
    start.style.display  = "flex";
    vragen.style.display = "none";
    video.style.display  = "none";
    vragenActief         = false;
    videoActive          = false;
}

function beantwoordVraagBlue(nr, answer) {
    if (localStorage.getItem('blueAnswer') === null) {
        localStorage.setItem('blueAnswer', 0);
    }
    // sla antwoord op of verwerk het hier indien nodig
    let saveBlue = parseInt(localStorage.getItem('blueAnswer'));
    saveBlue++
    localStorage.setItem('blueAnswer', saveBlue);
    console.log("blue: ${localStorage.getItem('blueAnswer')}");

    displayQuestion(nr);
}

function beantwoordVraagRed(nr, answer) {
    if (localStorage.getItem('redAnswer') === null) {
        localStorage.setItem('redAnswer', 0);
    }
    // sla antwoord op of verwerk het hier indien nodig
    let saveRed = parseInt(localStorage.getItem('redAnswer'));
    saveRed++
    localStorage.setItem('redAnswer', saveRed);
    console.log("red: ${localStorage.getItem('redAnswer')}");

    displayQuestion(nr);
}

/**
 * Toon de volgende vraag
 * @param nr
 */
function displayQuestion(nr) {
    let vraag = document.getElementById(`vraag${nr}`);
    if (vraag) {
        vraag.style.display = "none";
    }
    nr++;
    vraag = document.getElementById(`vraag${nr}`);
    if (vraag) {
        vraag.style.display = "block";
    }
    if (nr > 4) {
        index        = 0;
        vragenActief = false;
        showTotal();
    }
}

function showTotal() {
    let totaal                  = document.getElementById('totaal'),
        antwoordBlauw           = document.getElementById('antwoordBlauw'),
        antwoordRood            = document.getElementById('antwoordRood');
    totaal.style.display        = 'block';
    antwoordBlauw.innerHTML     = `blauw: ${localStorage.getItem('blueAnswer')}`;
    antwoordRood.innerHTML      = `rood: ${localStorage.getItem('redAnswer')}`;
    antwoordBlauw.style.display = 'block';
    antwoordRood.style.display  = 'block';
}

function hideTotal() {
    let vragen           = document.getElementById('vraag-container'),
        totaal           = document.getElementById('totaal');
    totaal.style.display = "none";
    vragen.style.display = "none";
    start.style.display  = "none";
}

/**
 * Reset de applicatie to the startscreen
 */
function setLocalTimeout() {
    if (undefined !== myTimeout) clearTimeout(myTimeout);
    myTimeout = setTimeout(toonStart, 5 * 60 * 1000); // 10 min
}

/**
 * Start de aplpicatie na 10 seconden
 * @type {number}
 */
const startTimeout = setTimeout(prepStart, 10000);

function prepStart() {
    console.log('Start de applicatie');
    clearTimeout(startTimeout);
    toonStart();
}

// ==== ARDUINO SERIAL LOGICA ====
let poort, lezer;

async function verbindMetArduino(poortInput) {
    try {
        poort = poortInput;
        await poort.open({baudRate: 19200});

        const decoder = new TextDecoderStream();
        poort.readable.pipeTo(decoder.writable);
        const inputStream = decoder.readable;
        lezer             = inputStream.getReader();

        leesKnoppen();
    } catch (err) {
        console.error("Verbinding met Arduinor mislukt:", err);
    }
}

async function leesKnoppen() {
    console.info("Knoppen verbonden");
    while (true) {
        const {value, done} = await lezer.read();
        if (done) break;
        if (value) verwerkInput(value.trim());
    }
}

function verwerkInput(data) {
    if (videoActive) {
        return; // negeer input tijdens video
    }
    const zichtbareStart = document.querySelector(".start:not([style*='display: none'])");
    console.log("Invoer ontvangen:", data);
    console.log("Zichtbare start:", zichtbareStart + '  Vragen actief: ' + vragenActief);
    if (!vragenActief && zichtbareStart && zichtbareStart.id === "vraag0") {
        zichtbareStart.querySelector("button").click();
        return;
    }
    const zichtbareVraag = document.querySelector(".vraag:not([style*='display: none'])");
    if (!zichtbareVraag) return;

    const knoppen = zichtbareVraag.querySelectorAll("button");
    if (data === "A" && knoppen[0]) knoppen[0].click();
    if (data === "B" && knoppen[1]) knoppen[1].click();
}

// Knop-handler
document.getElementById("verbindKnop").addEventListener("click", async () => {
    try {
        const geselecteerdePoort = await navigator.serial.requestPort();
        await verbindMetArduino(geselecteerdePoort);
        document.getElementById("verbindKnop").remove();
    } catch (err) {
        console.error("Kon geen poort kiezen:", err);
    }
});

// Probeer automatisch te verbinden bij reload
window.addEventListener("DOMContentLoaded", async () => {
    const poorten = await navigator.serial.getPorts();
    if (poorten.length > 0) {
        await verbindMetArduino(poorten[0]);
        document.getElementById("verbindKnop").remove();
    }
});

// fallback event listener voor DOMContentLoaded
window.onkeydown = function (key) {
    switch (key.key) {
        case 'a':
            verwerkInput('A');
            break;
        case 'b':
            verwerkInput('B');
            break;
        default:
            console.log("Onbekende toets: " + key.key);
    }
};