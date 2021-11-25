let datos = [];
let datos_general = [];

function getJSON(url) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                //alert(allText);
                datos = JSON.parse(allText);
                datos_general = datos;
                datos = datos.datos;
            }
        }
    }
    rawFile.send(null);
}
getJSON("test.json");

let contadorDias = -1;
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


// Table chartPoint: Variables
let diaChartPoints; // span
let diaPieChart; // span
let diaBarSort; // span
let diaStackChart; // span


function inicializador() {
    diaProgress.value = contadorDias + 1;
    //console.log(datos.datos, " longitud ");
    diaProgress.max = datos_general.dias;
    diaPoblacion.innerText = 1;
    diaSpanElement.innerText = 1;
    sanos.innerText = datos[0]["Sanos"];
    contagiados.innerText = datos[0]["Contagiados"];
    recuperados.innerText = datos[0]["Recuperados"];
    poblacionTotalNumber = datos[0]["Contagiados"] + datos[0]["Recuperados"] + datos[0]["Sanos"] + datos[0]["Muertos"];
    poblacionTotal.innerText = poblacionTotalNumber;
    muertos.innerText = datos[0]["Muertos"];
    if (previousDayButton != null)
        previousDayButton.disabled = true;
    contadorDias = 0;
    //this.getSumaTable(1);
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

    let contagiados = 0;
    let sanos = 0;
    let recuperados = 0;


    for (let i = 0; i < datosInicial.length; i++) {
        for (let j = 0; j < datosInicial[i].length; j++) {
            switch (datosInicial[i][j]) {
                case 0:
                    contagiadoConVac1++;
                    contagiados++;
                    break;
                case 1:
                    contagiadoSinVac1++;
                    contagiados++;
                    break;
                case 2:
                    contagiadoConNoVac1++;
                    contagiados++;
                    break;
                case 3:
                    contagiadoSinNoVac1++;
                    contagiados++;
                    break;
                case 4:
                    sanoConVac1++;
                    sanos++;
                    break;
                case 5:
                    sanoSinVac1++;
                    sanos++;
                    break;
                case 6:
                    sanoConNoVac1++;
                    sanos++;
                    break;
                case 7:
                    sanoSinNoVac1++;
                    sanos++;
                    break;
                case 8:
                    recuperadoConVac1++;
                    recuperados++;
                    break;
                case 9:
                    recuperadoSinVac1++;
                    recuperados++;
                    break;
                case 10:
                    recuperadoConNoVac1++;
                    recuperados++;
                    break;
                case 11:
                    recuperadoSinNoVac1++;
                    recuperados++;
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

    let contagiadoTotal = document.getElementById("contagiadoTotal");
    let sanoTotal = document.getElementById("sanoTotal");
    let recuperadoTotal = document.getElementById("recuperadoTotal");
    let poblacionTotalTable = document.getElementById("poblacionTotalTable");
    let clasificacionValor = document.getElementById("clasificacionValor");


    contagiadoTotal.innerText = contagiados;
    sanoTotal.innerText = sanos;
    recuperadoTotal.innerText = recuperados;
    poblacionTotalTable.innerText = datos[dia]["Contagiados"] + datos[dia]["Recuperados"] + datos[dia]["Sanos"];

    let percentage = (datos[dia]["Clasificacion"] * 100).toFixed(2) + "%";
    clasificacionValor.innerText = percentage;

    /*if(datos[dia]["Contagiados"] == 0){
         clasificacionValor.innerText =   "0%";

    }else{
         clasificacionValor.innerText =   percentage;
    }*/
    return item;

}


let firstCreate = true;

function nextDay() {
    let botonNextDayPoints = document.getElementById("nextDay");
    let previousDayButtonPoints = document.getElementById("previousDay");

    if (previousDayButtonPoints != null) {
        previousDayButtonPoints.disabled = true;
    }
    botonNextDayPoints.innerHTML = "Siguiente día";

    if (firstCreate) {
        this.createHistogram(datos, contadorDias);
        firstCreate = false;
        return;
    }
    if (contadorDias < datos.length) {
        if (contadorDias + 1 == datos.length) {
            botonNextDayPoints.disabled = true;
            return
        }
    }
    contadorDias++;
}

function previousDay() {

}

let firstTimeChartPoints = true;

function createHistogram(datos, dia) {
    diaProgress.value = dia + 1;
    diaSpanElement.innerText = dia + 1;
    diaPoblacion.innerText = dia + 1;
    diaChartPoints.innerText = dia + 1;
    sanos.innerText = datos[dia]["Sanos"];
    contagiados.innerText = datos[dia]["Contagiados"];
    recuperados.innerText = datos[dia]["Recuperados"];
    muertos.innerText = datos[dia]["Muertos"];
    getSumaTable(dia);
    //Width and height
    console.log(contadorDias, "dia en create en histogram");
    var w = 600;
    var h = 310;
    var padding = 60;
    //Dynamic, random dataset
    var dataset = []; //Initialize empty array
    var numDataPoints = poblacionTotalNumber; //Number of dummy data points to create

    console.log(datos, "data");
    var maxRange = Math.random() * 1000; //Max range of new values


    for (let i = 0; i < datos[0].Contagiados; i++) {
        let newNumber1 = Math.floor(Math.random() * maxRange);
        let newNumber2 = Math.floor(Math.random() * maxRange);
        dataset.push([newNumber1, newNumber2, "contagiado"]);
    }

    for (let i = 0; i < datos[0].Sanos; i++) {
        let newNumber1 = Math.floor(Math.random() * maxRange);
        let newNumber2 = Math.floor(Math.random() * maxRange);
        dataset.push([newNumber1, newNumber2, "sano"]);
    }

    for (let i = 0; i < datos[0].Recuperados; i++) {
        let newNumber1 = Math.floor(Math.random() * maxRange);
        let newNumber2 = Math.floor(Math.random() * maxRange);
        dataset.push([newNumber1, newNumber2, "recuperado"]);
    }

    for (let i = 0; i < datos[0].Muertos; i++) {
        let newNumber1 = Math.floor(Math.random() * maxRange);
        let newNumber2 = Math.floor(Math.random() * maxRange);
        dataset.push([newNumber1, newNumber2, "muerto"]);
    }


    console.log(dataset, "despues for");
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

    var color = d3.scale.d3_salud();
    //Create circles
    console.log(dataset, "dataset")
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
        .attr("r", 2.5)
        .attr("fill", function (d, i) {
            console.log(d, "color");
            console.log(d[2], "en fill");
            if (d[2] == "sano") {
                return color(1); // Verde
            } else if (d[2] == "contagiado") {
                return color(0); // Amarillo
            } else if (d[2] == "recuperado") {
                return color(2); // Azul
            } else if (d[2] == "muerto") {
                return color(3); // Azul
            }
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
    //.text("Día: 1");
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
            diaProgress.value = contadorDias + 1;
            diaSpanElement.innerText = contadorDias + 1;
            diaPoblacion.innerText = contadorDias + 1;
            diaChartPoints.innerText = contadorDias + 1;
            sanos.innerText = datos[contadorDias]["Sanos"];
            contagiados.innerText = datos[contadorDias]["Contagiados"];
            recuperados.innerText = datos[contadorDias]["Recuperados"];
            muertos.innerText = datos[contadorDias]["Muertos"];
            getSumaTable(contadorDias);
            //d3.select("#contadorDiasBueno").text("hola");
            //New values for dataset
            var maxRange = Math.random() * 1000; //Max range of new values
            dataset = []; //Initialize empty array

            for (let i = 0; i < datos[contadorDias].Contagiados; i++) {
                let newNumber1 = Math.floor(Math.random() * maxRange);
                let newNumber2 = Math.floor(Math.random() * maxRange);
                dataset.push([newNumber1, newNumber2, "contagiado"]);
            }

            for (let i = 0; i < datos[contadorDias].Sanos; i++) {
                let newNumber1 = Math.floor(Math.random() * maxRange);
                let newNumber2 = Math.floor(Math.random() * maxRange);
                dataset.push([newNumber1, newNumber2, "sano"]);
            }

            for (let i = 0; i < datos[contadorDias].Recuperados; i++) {
                let newNumber1 = Math.floor(Math.random() * maxRange);
                let newNumber2 = Math.floor(Math.random() * maxRange);
                dataset.push([newNumber1, newNumber2, "recuperado"]);
            }

            for (let i = 0; i < datos[contadorDias].Muertos; i++) {
                let newNumber1 = Math.floor(Math.random() * maxRange);
                let newNumber2 = Math.floor(Math.random() * maxRange);
                dataset.push([newNumber1, newNumber2, "muerto"]);
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
                }).attr("fill", function (d, i) {
                    console.log(d, "color");
                    console.log(d[2], "en fill");
                    if (d[2] == "sano") {
                        return color(1); // Verde
                    } else if (d[2] == "contagiado") {
                        return color(0); // Amarillo
                    } else if (d[2] == "recuperado") {
                        return color(2); // Azul
                    } else if (d[2] == "muerto") {
                        return color(3); // Azul
                    }
                    return color(i);
                })
            //Update X axis
            svg.select(".x.axis")
                .transition()
                .duration(1500)
                .call(xAxis);
            //Update Y axis
            svg.select(".y.axis")
                .transition()
                .duration(1500)
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
                .call(xAxis);
            //Update Y axis
            svg.select(".y.axis")
                .transition()
                .duration(1500)
                .call(yAxis);
        });
    // Append svg parent
}

function createPieChart(datos, dia) {
    diaProgress.value = dia + 1;
    diaSpanElement.innerText = dia + 1;
    diaPoblacion.innerText = dia + 1;
    diaPieChart.innerText = dia + 1;
    sanos.innerText = datos[dia]["Sanos"];
    contagiados.innerText = datos[dia]["Contagiados"];
    recuperados.innerText = datos[dia]["Recuperados"];
    muertos.innerText = datos[dia]["Muertos"];
    getSumaTable(dia);
    let w = 330;
    let h = 450;
    console.log(dia, "contador en pieChart")
    let dataset = [datos[dia].Contagiados, datos[dia].Sanos, datos[dia].Recuperados, datos[dia].Muertos];
    let outerRadius = (w / 2) - 50;
    let innerRadius = 0;
    let arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    let pie = d3.layout.pie();
    //Easy colors accessible via a 10-step ordinal scale
    let color = d3.scale.d3_salud();
    //Create SVG element
    let svg = d3.select("#pieChart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
    //Set up groups
    let arcs = svg.selectAll("g.arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
    //Draw arc paths
    arcs.append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", arc);
    //Labels
    let i = 0;
    let lblEstado = "";
    arcs.append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            i++;
            if (d.value == 0) return;
            if (i == 1) {
                lblEstado = d.value + " 😷";
            } else if (i == 2) {
                lblEstado = d.value + " 🙂";
            } else if (i == 3) {
                lblEstado = d.value + " 🛏️";
            } else if (i == 4) {
                lblEstado = d.value + " 💀";
            } else {
                lblEstado = d.value;
            }
            return lblEstado;
        });
}

function createBarSort(datos, dia) {
    diaProgress.value = dia + 1;
    diaSpanElement.innerText = dia + 1;
    diaPoblacion.innerText = dia + 1;
    diaBarSort.innerText = dia + 1;
    sanos.innerText = datos[dia]["Sanos"];
    contagiados.innerText = datos[dia]["Contagiados"];
    recuperados.innerText = datos[dia]["Recuperados"];
    muertos.innerText = datos[dia]["Muertos"];
    getSumaTable(dia);
    //Sort button state
    //Default action for button will be to sort by *value*
    var sortByNameOrValue = false;
    //New, dynamic width value pulled from .chartContainer
    var w = d3.select(".chartContainer").node().clientWidth;
    //Height, padding
    var h = 450;
    var padding = 45;
    //Sample data
    var dataset = [{
            name: "🙂",
            sales: datos[dia].Sanos,
            bonus: 5
        },
        {
            name: "😷",
            sales: datos[dia].Contagiados,
            bonus: 10
        },
        {
            name: "🛏️",
            sales: datos[dia].Recuperados,
            bonus: 15
        },
        {
            name: "💀",
            sales: datos[dia].Muertos,
            bonus: 30
        },
    ];
    //Configure x and y scale functions
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([padding, w - padding], 0.05);
    //Now using two different y scales for two different charts
    var salesScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d.sales;
        })])
        .rangeRound([h - padding, padding]);
    var bonusScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d.bonus;
        })])
        .rangeRound([h - padding, padding]);
    //Now using two different y axes
    var salesAxis = d3.svg.axis()
        .scale(salesScale)
        .orient("left")
        .ticks(5);
    var bonusAxis = d3.svg.axis()
        .scale(bonusScale)
        .orient("left")
        .ticks(5)
    //Create SVG element
    var svg = d3.select("#salesChartContainer") //New target location!
        .append("svg")
        .attr("id", "salesChart")
        .attr("width", w)
        .attr("height", h);
    //Create groups
    var groups = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", function (d, i) {
            return "translate(" + xScale(i) + ",0)";
        });
    //Add bar to each group
    let bottonSort = document.getElementById("sort");
    bottonSort.disabled = false;
    
    let color = d3.scale.d3_salud();
    var rects = groups.append("rect")
        .attr("x", 0)
        .attr("y", function (d) {
            return h - padding;
        })
        .attr("width", xScale.rangeBand())
        .attr("height", 0)
        .attr("fill", function (d, i) {
            return color(i);
        }) // Cambia color de barra
    //Add label to each group
    groups.append("text")
        .attr("x", xScale.rangeBand() / 2)
        .attr("y", function (d) {
            return salesScale(d.sales) + (-15);
        })
        .text(function (d) {
            return d.name + ": " + d.sales;
        })
    //Transition rects into place
    rects.transition()
        .delay(function (d, i) {
            return i * 100;
        })
        .duration(1500)
        .attr("y", function (d) {
            return salesScale(d.sales);
        })
        .attr("height", function (d) {
            return h - padding - salesScale(d.sales);
        });
    //Create y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .attr("opacity", 0)
        .call(salesAxis)
        .transition()
        .delay(2000)
        .duration(1500)
        .attr("opacity", 1.0);
    //
    // Make the second chart (bonus data)
    //
    //Create SVG element
    svg = d3.select("#bonusChartContainer") //New target location!
        .append("svg")
        .attr("id", "bonusChart")
        .attr("width", w)
        .attr("height", h);

    //Create groups
    groups = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", function (d, i) {
            return "translate(" + xScale(i) + ",0)";
        });
    //Add bar to each group
    rects = groups.append("rect")
        .attr("x", 0)
        .attr("y", function (d) {
            return h - padding;
        })
        .attr("width", xScale.rangeBand())
        .attr("height", 0)
        .attr("fill", "SteelBlue");
    //Add label to each group
    groups.append("text")
        .attr("x", xScale.rangeBand() / 2)
        .attr("y", function (d) {
            return bonusScale(d.bonus) + 14;
        })
        .text(function (d) {
            return d.name + ": " + d.bonus;
        })
    //Transition rects into place
    rects.transition()
        .delay(function (d, i) {
            return i * 100;
        })
        .duration(1500)
        .attr("y", function (d) {
            return bonusScale(d.bonus);
        })
        .attr("height", function (d) {
            return h - padding - bonusScale(d.bonus);
        });
    //Create y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .attr("opacity", 0)
        .call(bonusAxis)
        .transition()
        .delay(2000)
        .duration(1500)
        .attr("opacity", 1.0);
    //New functionality for interaction for ALL groups
    //in BOTH charts
    d3.selectAll("g.bar")
        .on("mouseover", function (d) {
            var thisName = d.name;
            d3.selectAll("g.bar")
                .filter(function (d) {
                    if (thisName == d.name) {
                        return true; //…then it's a match
                    }
                })
                .classed("highlight", true);
        })
        .on("mouseout", function () {
            d3.selectAll("g.bar")
                .classed("highlight", false);
        })
    //Sorting logic
    d3.select("#sort")
        .on("click", function () {
            //Need to reselect all groups in each chart
            d3.selectAll("#salesChart g.bar").sort(function (a, b) {
                    if (sortByNameOrValue) {
                        return d3.ascending(a.name, b.name);
                    } else {
                        return d3.ascending(a.sales, b.sales);
                    }
                })
                .transition()
                .delay(function (d, i) {
                    return i * 50;
                })
                .duration(1000)
                .attr("transform", function (d, i) {
                    return "translate(" + xScale(i) + ",0)";
                });

            d3.selectAll("#bonusChart g.bar").sort(function (a, b) {
                    if (sortByNameOrValue) {
                        return d3.ascending(a.name, b.name);
                    } else {
                        return d3.ascending(a.bonus, b.bonus);
                    }
                })
                .transition()
                .delay(function (d, i) {
                    return i * 50;
                })
                .duration(1000)
                .attr("transform", function (d, i) {
                    return "translate(" + xScale(i) + ",0)";
                });

            //Update text in button
            d3.select(this)
                .text(function () {
                    // if (sortByNameOrValue) {
                    // } else {
                    //     return "Estado inicial";
                    // }

                        bottonSort.disabled = true;
                        return "Ordenar de menor a mayor";

                })

            //Flip value of boolean
            sortByNameOrValue = !sortByNameOrValue;
        });

}
//this.createPieChart(datos);
let firstTimeStackChart = true;

function createStackChart(datos) {
    if (firstTimeStackChart) {
        showStackChart();
        firstTimeStackChart = false;
    }
    //Set up stack method
    var stack = d3.layout.stack()
        .values(function (d) {
            return d.emissions;
        })
        .order("reverse");
    //Width, height, padding
    var w = 1200;
    var h = 650;
    var padding = [20, 10, 50, 100]; //Top, right, bottom, left
    //Set up date format function (years)
    var dateFormat = d3.time.format("%Y");
    //Define scales with ranges (domains will be set later)
    var xScale = d3.time.scale()
        .range([padding[3], w - padding[1] - padding[3]]);

    var yScale = d3.scale.linear()
        //.range([ 0, h ]);
        .range([padding[0], h - padding[2]]);

    //Define axes
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(10)
        .tickFormat(function (d) {
            return dateFormat(d);
        });

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);
    //Define area generator
    var area = d3.svg.area()
        .x(function (d) {
            return xScale(dateFormat.parse(d.x)); //Updated
        })
        .y0(function (d) {
            return yScale(d.y0); //Updated
        })
        .y1(function (d) {
            return yScale(d.y0 + d.y); //Updated
        });
    //Easy colors accessible via a 10-step ordinal scale
    var color = d3.scale.category10();

    //Create the SVG
    var svg = d3.select("#boxStackChart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    d3.csv("./g7_co2_emissions.csv", function (data) {
        console.log(data, "data")
        //New array with all the years, for referencing later
        var years = ["1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010"];

        var dataset = [];
        for (var i = 0; i < data.length; i++) {
            //Create new object with this country's name and empty array
            dataset[i] = {
                country: data[i].countryName,
                emissions: []
            };
            //Loop through all the years
            for (var j = 0; j < years.length; j++) {
                //Default value, used in case no value is present
                var amount = null;
                // If value is not empty
                if (data[i][years[j]]) {
                    amount = +data[i][years[j]];
                }
                //Add a new object to the emissions data array
                //for this country
                dataset[i].emissions.push({
                    x: years[j],
                    y: amount
                });
            }
        }
        //Stack the data!
        stack(dataset);
        //Uncomment to log the original data to the console
        //console.log(data);
        //Uncomment to log the newly restructured dataset to the console
        //console.log(dataset);
        //Now that the data is ready, we can check its
        //min and max values to set our scales' domains!
        xScale.domain([
            d3.min(years, function (d) {
                return dateFormat.parse(d);
            }),
            d3.max(years, function (d) {
                return dateFormat.parse(d);
            })
        ]);
        //Need to recalcluate the max value for yScale  
        //differently, now that everything is stacked.
        //Loop once for each year, and get the total value
        //of CO2 for that year.
        var totals = [];
        for (i = 0; i < years.length; i++) {
            totals[i] = 0;
            for (j = 0; j < dataset.length; j++) {
                totals[i] += dataset[j].emissions[i].y;
            }
        }
        yScale.domain([d3.max(totals), 0]);
        //Areas
        //
        //Now that we are creating multiple paths, we can use the
        //selectAll/data/co2/enter/append pattern to generate as many
        //as needed.
        //Make a path for each country
        var paths = svg.selectAll("path")
            .data(dataset)
            .enter()
            .append("path")
            .attr("class", "area")
            .attr("d", function (d) {
                //Calculate path based on only d.emissions array,
                //not all of d (which would include the country name)
                return area(d.emissions);
            })
            .attr("stroke", "none")
            .attr("fill", function (d, i) {
                return color(i);
            });
        //Append a title with the country name (so we get easy tooltips)
        paths.append("title")
            .text(function (d) {
                return d.country;
            });
        //Create axes
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (h - padding[2]) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + padding[3] + ",0)")
            .call(yAxis);
    });
}

let firstCreateCircular = true;

function nextDayCircular() {
    let botonNextDayCircular = document.getElementById("nextDayCircular");
    let previousDayButtonCircular = document.getElementById("previousDayCircular");
    if (previousDayButtonCircular != null) {
        previousDayButtonCircular.disabled = false;
    }
    botonNextDayCircular.innerHTML = "Siguiente día";

    if (firstCreateCircular) {
        this.createPieChart(datos, contadorDias);
        firstCreateCircular = false;
        contadorDias++;
        return;
    }
    if (contadorDias < datos.length) {
        this.createPieChart(datos, contadorDias);
        if (contadorDias + 1 == datos.length) {
            botonNextDayCircular.disabled = true;
            return
        }
    }
    contadorDias++;
}

function previousDayCircular() {
    let previousDayButtonCircular = document.getElementById("previousDayCircular");
    let nextDayButtonCircular = document.getElementById("nextDayCircular");
    if (nextDayButtonCircular != null)
        nextDayButtonCircular.disabled = false;
    if (contadorDias >= 0) {
        this.createPieChart(datos, contadorDias);
        getSumaTable(contadorDias);
        if (contadorDias == 0) {
            previousDayButtonCircular.disabled = true;
            return;
        }
    }
    contadorDias--;
}

let firstCreateBarras = true;

function nextDayBarras() {
    let botonNextDayBarras = document.getElementById("nextDayBarras");
    let previousDayButtonBarras = document.getElementById("previousDayBarras");
    botonNextDayBarras.innerHTML = "Siguiente día";

    if (previousDayButtonBarras != null) {
        previousDayButtonBarras.disabled = false;
    }
    if (firstCreateBarras) {
        this.createBarSort(datos, contadorDias);
        firstCreateBarras = false;
        contadorDias++;
        return;
    }
    if (contadorDias < datos.length) {
        //d3.selectAll("g > *").remove();
        d3.select(".chartContainer").html("");
        this.createBarSort(datos, contadorDias);
        if (contadorDias + 1 == datos.length) {
            botonNextDayBarras.disabled = true;
            return
        }
    }
    contadorDias++;
}

function previousDayBarras() {
    contadorDias--;
    let previousDayButtonBarras = document.getElementById("previousDayBarras");
    let nextDayButtonBarras = document.getElementById("nextDayBarras");
    if (nextDayButtonBarras != null)
        nextDayButtonBarras.disabled = false;
    if (contadorDias >= 0) {
        d3.select(".chartContainer").html("");
        this.createBarSort(datos, contadorDias);
        if (contadorDias == 0) {
            previousDayButtonBarras.disabled = true;
            return;
        }
    }
}

let buttonVerGrafica = document.getElementById("btnVerGrafica");
let selectedAlready = true;
buttonVerGrafica.addEventListener("click", (event) => {

    let tipoGraficaDiv = document.getElementById("tipoGraficaDiv");
    tipoGraficaDiv.style.display = "none";
    let radioOptionSelected = $('input[type="radio"][name="vista"]:checked').val().toString();
    // 1 - datosVista
    // 2 - poblacionVista
    // 3 - clasificacionVista
    let dropDownValue = $('.dropdown').val().toString();
    // 1 - barras
    // 2 - circular
    // 3 - puntos
    // 4 - sobrecargada
    if (selectedAlready) {
        showControlsParent();
        selectedAlready = false;
        this.inicializador();
    }
    if (radioOptionSelected == "datosVista" && dropDownValue == "barras") {
        d3.select(".pieChartDiv").html("");
        let pieChart = document.getElementById("pieChartDiv");
        if (pieChart != null) {
            pieChart.remove();
        }
        const circularDiv = document.getElementById('circularDiv');
        const puntos = document.getElementById('puntosDiv');
        if (circularDiv != null) {
            circularDiv.style.display = "none";
        }
        if (puntos != null) {
            puntos.style.display = "none";
        }
        showControlsButtonsBarras();
        showBarSort();
        let buttonNextBarras = document.getElementById("nextDayBarras");
        let previousDayButtonBarras = document.getElementById("previousDayBarras");
        previousDayButtonBarras.disabled = true;
        buttonNextBarras.innerHTML = "Día siguiente";

    } else if (radioOptionSelected == "poblacionVista" && dropDownValue == "barras") {

    } else if (radioOptionSelected == "clasificacionVista" && dropDownValue == "barras") {
        const puntos = document.getElementById('puntosDiv');
        if (puntos != null) {
            puntos.style.display = "none";
        }
        showControlsButtonsBarras();
    } else if (radioOptionSelected == "datosVista" && dropDownValue == "circular") {
        d3.select(".containerBarSort").html("");
        let barSortDiv = document.getElementById("containerBarSort");
        if (barSortDiv != null) {
            barSortDiv.remove();
        }
        const puntos = document.getElementById('puntosDiv');
        const barras = document.getElementById('barrasDiv');
        if (puntos != null) {
            puntos.style.display = "none";
        }
        if (barras != null) {
            barras.style.display = "none";
        }
        // this.inicializador();
        showControlsButtonsCircular();
        showPieChart();
        let buttonNextCircular = document.getElementById("nextDayCircular");
        let previousDayButtonCircular = document.getElementById("previousDayCircular");
        previousDayButtonCircular.disabled = true;
        buttonNextCircular.innerHTML = "Día siguiente";

    } else if (radioOptionSelected == "datosVista" && dropDownValue == "puntos") {
        const barras = document.getElementById('barrasDiv');
        const circular = document.getElementById('circularDiv');
        d3.select(".containerBarSort").html("");
        let barSortDiv = document.getElementById("containerBarSort");
        if (barSortDiv != null) {
            barSortDiv.remove();
        }
        if (barras != null) {
            barras.style.display = "none";
        }
        if (circular != null) {
            circular.style.display = "none";
        }
        showControlsButtonsPuntos();
        showChartPoints();
        let buttonNextPoints = document.getElementById("nextDay");
        let previousDayButtonPoints = document.getElementById("previousDay");

        previousDayButtonPoints.disabled = true;
        buttonNextPoints.innerHTML = "Día siguiente";

    } else if (radioOptionSelected == "datosVista" && dropDownValue == "sobrecargada") {

    } else {
        alert("Opción inválida al iniciar gráfica");
        return;
    }
    event.preventDefault();
})

function showChartPoints() {
    const template = document.getElementById('templateChartPoints');
    const content = template.content.cloneNode(true);
    let box = document.getElementById("box");
    box.append(content);
    diaChartPoints = document.getElementById("diaChartPoints"); // span
}

function showPieChart() {
    const template = document.getElementById('templatePieChart');
    const content = template.content.cloneNode(true);
    let box = document.getElementById("box");
    box.append(content);
    diaPieChart = document.getElementById("diaPieChart"); // span
}

function showBarSort() {
    const template = document.getElementById('templateBarSort');
    const content = template.content.cloneNode(true);
    let box = document.getElementById("box");
    box.append(content);
    diaBarSort = document.getElementById("diaBarSort"); // span
}

function showStackChart() {
    const template = document.getElementById('templateStackChart');
    const content = template.content.cloneNode(true);
    let box = document.getElementById("box");
    box.append(content);
    diaStackChart = document.getElementById("diaStackChart"); // span
}

function showControlsParent() {
    const template = document.getElementById('controlesGeneralTemplate');
    //template.style.display = "block";
    const content = template.content.cloneNode(true);
    let box = document.getElementById("controlesDiv");
    box.append(content);
}

function showControlsButtonsPuntos() {
    const template = document.getElementById('controlsPuntosTemplate');
    const content = template.content.cloneNode(true);
    let box = document.getElementById("controles");
    box.append(content);
}


function showControlsButtonsBarras() {
    const template = document.getElementById('controlsBarrasTemplate');
    const content = template.content.cloneNode(true);
    let box = document.getElementById("controles");
    box.append(content);
}

function showControlsButtonsCircular() {
    const template = document.getElementById('controlsCircularTemplate');
    const content = template.content.cloneNode(true);
    let box = document.getElementById("controles");
    box.append(content);
}