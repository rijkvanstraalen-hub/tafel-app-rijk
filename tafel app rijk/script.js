function toonTafel()
{
    if (oefeningActief) {
        return;
    }

    let tafelvan = document.getElementById("inputTafel").value;
    //let teller = 1;
    let output = "";
    let uitkomst = 0;
    for (let teller = 1; teller < 11; teller++){
        uitkomst = teller * tafelvan;
        output += teller + " x " + tafelvan + " = " + uitkomst + "<br>";
    }
    // while (teller < 21){
    //     uitkomst = teller * tafelvan;
    //     output += teller + " x " + tafelvan + " = " + uitkomst + "<br>";
    //     teller++;
    // }
    document.getElementById("outputTafel").innerHTML = output;
    //alert("Hij doet het! " + tafelvan)
}

let oefenTafel;
let oefenFactor;
let aantalGoed = 0;
let aantalVragen = 0;
let oefeningActief = false;

function startOefenen()
{
    const invoer = document.getElementById("inputTafel").value;
    oefenTafel = Number(invoer);

    if (invoer === "" || !Number.isFinite(oefenTafel)) {
        document.getElementById("oefenForm").classList.add("d-none");
        document.getElementById("volgendeVraagKnop").classList.add("d-none");
        document.getElementById("oefenVraag").textContent = "Vul eerst een tafel in.";
        return;
    }

    aantalGoed = 0;
    aantalVragen = 0;
    oefeningActief = true;
    document.getElementById("outputTafel").classList.add("d-none");
    document.getElementById("oefenStartKnop").classList.add("d-none");
    document.getElementById("oefenStopKnop").classList.remove("d-none");
    document.getElementById("oefenForm").classList.remove("d-none");
    volgendeVraag();
}

function stopOefenen()
{
    oefeningActief = false;
    document.getElementById("outputTafel").classList.remove("d-none");
    document.getElementById("oefenStartKnop").classList.remove("d-none");
    document.getElementById("oefenStopKnop").classList.add("d-none");
    document.getElementById("oefenForm").classList.add("d-none");
    document.getElementById("volgendeVraagKnop").classList.add("d-none");
    document.getElementById("oefenVraag").textContent = "";
    document.getElementById("oefenFeedback").textContent = "";
}

function volgendeVraag()
{
    oefenFactor = Math.floor(Math.random() * 10) + 1;
    document.getElementById("oefenVraag").textContent =
        `${oefenFactor} x ${oefenTafel} = ? (Goed: ${aantalGoed} van ${aantalVragen})`;
    document.getElementById("oefenAntwoord").value = "";
    document.getElementById("oefenAntwoord").disabled = false;
    document.getElementById("controleerKnop").disabled = false;
    document.getElementById("volgendeVraagKnop").classList.add("d-none");
    document.getElementById("oefenFeedback").textContent = "";
    document.getElementById("oefenAntwoord").focus();
}

function controleerAntwoord(event)
{
    event.preventDefault();
    const antwoord = Number(document.getElementById("oefenAntwoord").value);
    const goed = oefenFactor * oefenTafel;
    aantalVragen++;

    if (antwoord === goed) {
        aantalGoed++;
        document.getElementById("oefenFeedback").textContent = "Goed gedaan!";
    } else {
        document.getElementById("oefenFeedback").textContent = `Helaas, het goede antwoord is ${goed}.`;
    }

    document.getElementById("oefenVraag").textContent =
        `${oefenFactor} x ${oefenTafel} = ? (Goed: ${aantalGoed} van ${aantalVragen})`;
    document.getElementById("oefenAntwoord").disabled = true;
    document.getElementById("controleerKnop").disabled = true;
    document.getElementById("volgendeVraagKnop").classList.remove("d-none");
    document.getElementById("volgendeVraagKnop").focus();
}