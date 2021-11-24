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


// Table chartPoint: Variables
let diaChartPoints; // span
let diaPieChart; // span
let diaBarSort; // span
let diaStackChart; // span


function inicializador() {
    diaProgress.value = contadorDias + 1;
    diaProgress.max = datos.length - 1;
    diaPoblacion.innerText = 1;
    diaSpanElement.innerText = 1;
    sanos.innerText = datos[0]["Sanos"];
    contagiados.innerText = datos[0]["Contagiados"];
    recuperados.innerText = datos[0]["Recuperados"];
    poblacionTotalNumber = datos[0]["Contagiados"] + datos[0]["Recuperados"] + datos[0]["Sanos"] + datos[0]["Muertos"];
    poblacionTotal.innerText = poblacionTotalNumber;
    muertos.innerText = datos[0]["Muertos"];
    previousDayButton.disabled = true;
    contadorDias = 0;
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
            diaChartPoints.innerText = contadorDias;
            sanos.innerText = datos[contadorDias]["Sanos"];
            contagiados.innerText = datos[contadorDias]["Contagiados"];
            recuperados.innerText = datos[contadorDias]["Recuperados"];
            muertos.innerText = datos[contadorDias]["Muertos"];
            getSumaTable(contadorDias);
            //d3.select("#contadorDiasBueno").text("Día: " + contadorDias);
            botonNextDay.disabled = false;
        } else {
            previousDayButton.disabled = true;
        }
    });
    contadorDias--;
}


let firstCreate = true;

function nextDay() {
    if (firstCreate) {
        this.inicializador();
        console.log("entra antes?")
        ///this.createHistogram(datos);
        //this.createPieChart(datos);
        this.createBarSort(datos);
        //this.createStackChart(datos);
        firstCreate = false;
        return;
    }

    botonNextDay.addEventListener("click", (event) => {
        console.log(contadorDias, "contador")
        if (contadorDias < datos.length) {
            diaProgress.value = contadorDias;
            diaSpanElement.innerText = contadorDias;
            diaPoblacion.innerText = contadorDias;
            //diaChartPoints.innerText = contadorDias;
            //diaPieChart.innerText = contadorDias;
            sanos.innerText = datos[contadorDias]["Sanos"];
            contagiados.innerText = datos[contadorDias]["Contagiados"];
            recuperados.innerText = datos[contadorDias]["Recuperados"];
            muertos.innerText = datos[contadorDias]["Muertos"];
            //d3.select("#contadorDiasBueno").text("Día: " + (contadorDias));
            getSumaTable(contadorDias);
            previousDayButton.disabled = false;
        } else {
            botonNextDay.disabled = true;
        }
    });
    contadorDias++;
}
//this.inicializador();

let firstTimeChartPoints = true;
function createHistogram(datos) {
    if (firstTimeChartPoints) {
        showChartPoints();
        firstTimeChartPoints = false;
    }
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

let firstTimePieChart = true;

function createPieChart(datos) {

    if (firstTimePieChart) {
        showPieChart();
        firstTimePieChart = false;
    }
    let w = 250;
    let h = 250;

    let dataset = [5, 10, 20, 45, 6, 25];

    let outerRadius = w / 2;
    let innerRadius = 0;
    let arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    let pie = d3.layout.pie();

    //Easy colors accessible via a 10-step ordinal scale
    let color = d3.scale.category10();

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
    arcs.append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.value;
        });
}

let firstTimeBarSort = true;

function createBarSort(datos) {
    if (firstTimeBarSort) {
        showBarSort();
        $("#nextDay").html("Día siguiente");
        firstTimeBarSort = false;
    }
    //Sort button state
    //Default action for button will be to sort by *value*
    var sortByNameOrValue = false;
    //New, dynamic width value pulled from .chartContainer
    var w = d3.select(".chartContainer").node().clientWidth;
    //Height, padding
    var h = 450;
    var padding = 35;
    //Sample data
    var dataset = [{
            name: "😷",
            sales: 50,
            bonus: 5
        },
        {
            name: "😠",
            sales: 40,
            bonus: 10
        },
        {
            name: "💉",
            sales: 65,
            bonus: 15
        },
        {
            name: "🏥🚫",
            sales: 55,
            bonus: 30
        },
        {
            name: "😷",
            sales: 45,
            bonus: 20
        },
        {
            name: "🏥🚫",
            sales: 30,
            bonus: 5
        }
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
    var rects = groups.append("rect")
        .attr("x", 0)
        .attr("y", function (d) {
            return h - padding;
        })
        .attr("width", xScale.rangeBand())
        .attr("height", 0)
        .attr("fill", "SteelBlue"); // Cambia color de barra
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
                    if (sortByNameOrValue) {
                        return "Ordenar de menor a mayor";
                    } else {
                        return "Estado inicial";
                    }
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
        console.log(data ,"data")
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