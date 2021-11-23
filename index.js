let datos = [];

function getJSON(url) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                //alert(allText);
                datos = JSON.parse(allText);
            }
        }
    }
    rawFile.send(null);
}
getJSON("test.json");

let contadorDias = 0;
let diaSpanElement = document.getElementById("dias");
let diaProgress = document.getElementById("progressDias");
let sanos = document.getElementById("sanos");
let contagiados = document.getElementById("contagiados");
let recuperados = document.getElementById("recuperados");
let muertos = document.getElementById("muertos");
let previousDayButton = document.getElementById("previousDay");
let botonNextDay = document.getElementById("nextDay");
let diaPoblacion = document.getElementById("diaPoblacion");

// Tabla parámetros: 
let contagiadoConVac = document.getElementById("contagiadoConVac");
let contagiadoConNoVac = document.getElementById("contagiadoConNoVac");
let contagiadoSinVac = document.getElementById("contagiadoSinVac");
let contagiadoSinNoVac = document.getElementById("contagiadoSinNoVac");

let sanoConVac = document.getElementById("sanoConVac");
let sanoConNoVac = document.getElementById("sanoConNoVac");
let sanoSinVac = document.getElementById("sanoSinVac");
let sanoSinNoVac = document.getElementById("sanoSinNoVac");

let recuperadoConVac = document.getElementById("recuperadoConVac");
let recuperadoConNoVac = document.getElementById("recuperadoConNoVac");
let recuperadoSinVac = document.getElementById("recuperadoSinVac");
let recuperadoSinNoVac = document.getElementById("recuperadoSinNoVac");

let totalCon = document.getElementById("totalCon");
let totalSin = document.getElementById("totalSin");
let totalVac = document.getElementById("totalVac");
let totalNoVac = document.getElementById("totalNoVac");
let poblacionTotalNumber = 0;
let totalMuertos = document.getElementById("muertosValor");
let poblacionTotal = document.getElementById("poblacionTotal");

let svg = "";

function inicializador() {
    diaProgress.value = contadorDias + 1;
    diaProgress.max = datos.length - 1;
    diaSpanElement.innerText = 1;
    sanos.innerText = datos[0]["Sanos"];
    contagiados.innerText = datos[0]["Contagiados"];
    recuperados.innerText = datos[0]["Recuperados"];
    poblacionTotalNumber = datos[0]["Contagiados"] + datos[0]["Recuperados"] + datos[0]["Sanos"] + datos[0]["Muertos"];
    poblacionTotal.innerText = poblacionTotalNumber;
    muertos.innerText = datos[0]["Muertos"];
    previousDayButton.disabled = true;
    contadorDias=0;
    this.getSumaTable(0);
}


function getSumaTable(dia) {

    let datosInicial = datos[dia]["Poblacion"];

    let contagiadoConVac1 =
        contagiadoSinVac1 =
        contagiadoConNoVac1 =
        contagiadoSinNoVac1 = 0;

    let sanoConVac1 =
        sanoSinVac1 =
        sanoConNoVac1 =
        sanoSinNoVac1 = 0;

    let recuperadoConVac1 =
        recuperadoSinVac1 =
        recuperadoConNoVac1 =
        recuperadoSinNoVac1 = 0;

    let muertos = 0;

    console.log(datosInicial.length);
    for (let i = 0; i < datosInicial.length; i++) {
        for (let j = 0; j < datosInicial[i].length; j++) {
            switch (datosInicial[i][j]) {
                case 0:
                    contagiadoConVac1++;
                    break;
                case 1:
                    contagiadoSinVac1++;
                    break;
                case 2:
                    contagiadoConNoVac1++;
                    break;
                case 3:
                    contagiadoSinNoVac1++;
                    break;
                case 4:
                    sanoConVac1++;
                    break;
                case 5:
                    sanoSinVac1++;
                    break;
                case 6:
                    sanoConNoVac1++;
                    break;
                case 7:
                    sanoSinNoVac1++;
                    break;
                case 8:
                    recuperadoConVac1++;
                    break;
                case 9:
                    recuperadoSinVac1++;
                    break;
                case 10:
                    recuperadoConNoVac1++;
                    break;
                case 11:
                    recuperadoSinNoVac1++;
                    break;
                default:
                    muertos++;
                    break;
            }
        }
    }
    let item = {
        contagiadoConVac: contagiadoConVac1,
        contagiadoSinVac: contagiadoSinVac1,
        contagiadoConNoVac: contagiadoConNoVac1,
        contagiadoSinNoVac: contagiadoSinNoVac1,
        sanoConVac: sanoConVac1,
        sanoSinVac: sanoSinVac1,
        sanoConNoVac: sanoConNoVac1,
        sanoSinNoVac: sanoSinNoVac1,
        recuperadoConVac: recuperadoConVac1,
        recuperadoSinVac: recuperadoSinVac1,
        recuperadoConNoVac: recuperadoConNoVac1,
        recuperadoSinNoVac: recuperadoSinNoVac1,
    }
    contagiadoConVac.innerText = contagiadoConVac1;
    contagiadoSinVac.innerText = contagiadoSinVac1;
    contagiadoConNoVac.innerText = contagiadoConNoVac1;
    contagiadoSinNoVac.innerText = contagiadoSinNoVac1;

    sanoConVac.innerText = sanoConVac1;
    sanoSinVac.innerText = sanoSinVac1;
    sanoConNoVac.innerText = sanoConNoVac1;
    sanoSinNoVac.innerText = sanoSinNoVac1;

    recuperadoConVac.innerText = recuperadoConVac1;
    recuperadoSinVac.innerText = recuperadoSinVac1;
    recuperadoConNoVac.innerText = recuperadoConNoVac1;
    recuperadoSinNoVac.innerText = recuperadoSinNoVac1;

    totalCon.innerText = contagiadoConVac1 + sanoConVac1 + recuperadoConVac1;
    totalSin.innerText = contagiadoConNoVac1 + sanoConNoVac1 + recuperadoConNoVac1;
    totalVac.innerText = contagiadoSinVac1 + sanoSinVac1 + recuperadoSinVac1;
    totalNoVac.innerText = contagiadoSinNoVac1 + sanoSinNoVac1 + recuperadoSinNoVac1;
    totalMuertos.innerText = muertos;

    return item;

}



function previousDay() {
    previousDayButton.addEventListener("click", (event) => {
        if (contadorDias >= 0) {
            diaProgress.value = contadorDias;
            diaSpanElement.innerText = contadorDias;
            diaPoblacion.innerText = contadorDias;
            sanos.innerText = datos[contadorDias]["Sanos"];
            contagiados.innerText = datos[contadorDias]["Contagiados"];
            recuperados.innerText = datos[contadorDias]["Recuperados"];
            muertos.innerText = datos[contadorDias]["Muertos"];
            getSumaTable(contadorDias);
            d3.select("#contadorDiasBueno").text("Día: " + contadorDias);
            botonNextDay.disabled = false;
        } else {
            previousDayButton.disabled = true;
        }
    });
    contadorDias--;
}



function nextDay() {

        if(contadorDias == 0){
            this.inicializador();
            this.createHistogram(datos);
        }
        
    botonNextDay.addEventListener("click", (event) => {
        console.log(contadorDias, "contador")
        if (contadorDias < datos.length) {
            diaProgress.value = contadorDias;
            diaSpanElement.innerText = contadorDias;
            diaPoblacion.innerText = contadorDias;
            sanos.innerText = datos[contadorDias]["Sanos"];
            contagiados.innerText = datos[contadorDias]["Contagiados"];
            recuperados.innerText = datos[contadorDias]["Recuperados"];
            muertos.innerText = datos[contadorDias]["Muertos"];
            d3.select("#contadorDiasBueno").text("Día: " + (contadorDias));
            getSumaTable(contadorDias);
            previousDayButton.disabled = false;
        } else {
            botonNextDay.disabled = true;
        }
    });
    contadorDias++;
}
//this.inicializador();


function createHistogram(datos) {
    //Width and height
    console.log(contadorDias, "dia en create en histogram");
    var w = 600;
    var h = 310;
    var padding = 60;
    //Dynamic, random dataset
    var dataset = []; //Initialize empty array
    var numDataPoints = poblacionTotalNumber; //Number of dummy data points to create

    var maxRange = Math.random() * 1000; //Max range of new values

    for (var i = 0; i < numDataPoints; i++) { //Loop numDataPoints times
        var newNumber1 = Math.floor(Math.random() * maxRange); //New random integer
        var newNumber2 = Math.floor(Math.random() * maxRange); //New random integer
        dataset.push([newNumber1, newNumber2]); //Add new number to array
    }
    //Create scale functions
    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d[0];
        })])
        .range([padding, w - padding]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d[1];
        })])
        .range([h - padding, padding]);

    //Define X axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(0)

    //Define Y axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(0)

    //Create SVG element
    svg = d3.select(".chartPointsBox")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var color = d3.scale.category20();
    //Create circles
    svg.append("g")
        .attr("id", "circles")
        //.attr("fill", "red")
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d[0]);
        })
        .attr("cy", function (d) {
            return yScale(d[1]);
        })
        .attr("r", 5)
        .attr("fill", function (d, i) {
            //console.log("valor d: " + d, "valor i: " + i);
            return color(i);
        })

    //Create X axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (h - padding + 5) + ")")
        .call(xAxis);

    svg.append("text") // text label for the x axis
        .attr("x", 265)
        .attr("y", 290)
        .style("text-anchor", "middle")
        .attr("id", "contadorDiasBueno")
        .text("Día: 1");
        
    /*svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("x", 0 - (h / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Value");*/

    //Create Y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (padding - 5) + ",0)")
        .call(yAxis);

    //On click, update with new data		
    let prevData = [];

  
    d3.select("#nextDay")
        .on("click", function () {
            console.log(contadorDias, "dia en create");

            //d3.select("#contadorDiasBueno").text("hola");
            //New values for dataset
            var maxRange = Math.random() * 1000; //Max range of new values
            dataset = []; //Initialize empty array
            for (var i = 0; i < numDataPoints; i++) { //Loop numValues times
                var newNumber1 = Math.floor(Math.random() * maxRange); //New random integer
                var newNumber2 = Math.floor(Math.random() * maxRange); //New random integer
                dataset.push([newNumber1, newNumber2]); //Add new number to array
                prevData.push([newNumber1, newNumber2]);
            }
            
            //Update scale domains
            xScale.domain([0, d3.max(dataset, function (d) {
               // console.log(d[0], "solo d")
                return d[0];
            })]);
            yScale.domain([0, d3.max(dataset, function (d) {
                //console.log(dataset, "dataset");
                //console.log(d[1], "solo d")
                return d[1];
            })]);

            //Update all circles
            svg.selectAll("circle")
                .data(dataset)
                .transition()
                .duration(1000)
                .attr("cx", function (d) {
                    return xScale(d[0]);
                })
                .attr("cy", function (d) {
                    return yScale(d[1]);
                });

            //Update X axis
            svg.select(".x.axis")
                .transition()
                .duration(1500)
                .delay(500)
                .call(xAxis);

            //Update Y axis
            svg.select(".y.axis")
                .transition()
                .duration(1500)
                .delay(500)
                .call(yAxis);

        });
    
    //On click, update with new data	
    
    d3.select("#previousDay")
        .on("click", function () {
            //d3.select("#contadorDiasBueno").text("hola");
            //New values for dataset
            var maxRange = Math.random() * 1000; //Max range of new values
            dataset = []; //Initialize empty array
            
            for (var i = 0; i < numDataPoints; i++) { //Loop numValues times
                dataset.push(prevData[i]); 
            }
            //Update scale domains
            xScale.domain([0, d3.max(dataset, function (d) {
               // console.log(d[0], "solo d")
                return d[0];
            })]);
            yScale.domain([0, d3.max(dataset, function (d) {
                //console.log(dataset, "dataset");
                //console.log(d[1], "solo d")
                return d[1];
            })]);

            //Update all circles
            svg.selectAll("circle")
                .data(dataset)
                .transition()
                .duration(1000)
                .attr("cx", function (d) {
                    return xScale(d[0]);
                })
                .attr("cy", function (d) {
                    return yScale(d[1]);
                });

            //Update X axis
            svg.select(".x.axis")
                .transition()
                .duration(1500)
                .delay(500)
                .call(xAxis);

            //Update Y axis
            svg.select(".y.axis")
                .transition()
                .duration(1500)
                .delay(500)
                .call(yAxis);

           // console.log("entra hasta acA??")

        });
    // Append svg parent
}


//this.createHistogram(datos);

