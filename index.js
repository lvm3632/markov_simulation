/*async function getAllData() {

    await fetch("test.json")
        .then(response => response.json())
        .then(data => {
            console.log(data[0]["Contagiados"], "desde getAllData");

            console.log(typeof data, "tipo de dato");
            datos = data;
        });  
}*/

async function loadNames() {
    const response = await fetch('test.json');
    return await response.json();
}

let fullDays = false;
$('#nextDay').click();

function nextDay() {
    let botonNextDay = document.getElementById("nextDay");
    let diaSpanElement = document.getElementById("dias");
    
    console.log("no entra")

    botonNextDay.addEventListener("click", (event) => {
        console.log(dia, "que valor tiene")
        loadNames().then((datos) => {
            //console.log(datos[0]["Sanos"], "sanos");
            let sanos = document.getElementById("sanos");
            let contagiados = document.getElementById("contagiados");
            let recuperados = document.getElementById("recuperados");
            let muertos = document.getElementById("muertos");
            console.log(datos.length, "longitud");
            console.log(dia, "que valor tiene")
            diaSpanElement.innerText = (dia);
            if (dia < datos.length) {
                console.log("entro IF??")
                console.log(dia, "en length");
                sanos.innerText = datos[dia]["Sanos"];
                sanos.style.color = "blue";
                contagiados.innerText = datos[dia]["Contagiados"];
                contagiados.style.color = "red";
                recuperados.innerText = datos[dia]["Recuperados"];
                recuperados.style.color = "green";
                muertos.innerText = datos[dia]["Muertos"];
                muertos.style.color = "black";
            } else {
                fullDays = true;
                diaSpanElement.innerText = (dia-1);
            }
        });
    });
    dia++;
    if (fullDays) {
        botonNextDay.disabled = true;
        console.log(dia, "DIAS en else");
        alert("El día es mayor que la cantidad de días inicial: Día actual = " + dia);
        return;
    }
    console.log(dia, "DIA");
}

/*loadNames().then((datos) => {
    //console.log(datos[0]["Sanos"], "sanos");
    let sanos = document.getElementById("sanos");
    let contagiados = document.getElementById("contagiados");
    let recuperados = document.getElementById("recuperados");
    let muertos = document.getElementById("muertos");

    console.log(datos.length, "longitud");
    console.log(datos[0]["Recuperados"], "cambio??")


    sanos.innerText = datos[0]["Sanos"];
    sanos.style.color = "blue";


    contagiados.innerText = datos[0]["Contagiados"];
    contagiados.style.color = "red";


    recuperados.innerText = datos[0]["Recuperados"];
    recuperados.style.color = "green";

    muertos.innerText = datos[0]["Muertos"];
    muertos.style.color = "black";
});*/