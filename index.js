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

            if(!first){
                createHistogram(datos[dia]["Contagiados"]);
                first=true;
            }
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
                diaSpanElement.innerText = (dia - 1);
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

const createHistogram = (poblacion) => {
    console.log(poblacion, "desde create histogram");
    //Width and height
    var w = 600;
    var h = 310;
    var padding = 60;
    //Dynamic, random dataset
    var dataset = []; //Initialize empty array
    var numDataPoints = 50; //Number of dummy data points to create
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
        .ticks(12);
    

    //Define Y axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(12);

    //Create SVG element
    var svg = d3.select(".chartPointsBox")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var color = d3.scale.category20();
    //Create circles
    console.log(dataset, "data")
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

    svg.append("text")      // text label for the x axis
        .attr("x", 265 )
        .attr("y",  290 )
        .style("text-anchor", "middle")
        .text("Date");
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("x",0 - (h / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Value");    

    //Create Y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (padding - 5) + ",0)")
        .call(yAxis);

    //On click, update with new data			
    d3.select("#nextDay")
        .on("click", function () {
             

            //New values for dataset
            var numValues = dataset.length; //Count original length of dataset
            var maxRange = Math.random() * 1000; //Max range of new values
            dataset = []; //Initialize empty array
            for (var i = 0; i < numValues; i++) { //Loop numValues times
                var newNumber1 = Math.floor(Math.random() * maxRange); //New random integer
                var newNumber2 = Math.floor(Math.random() * maxRange); //New random integer
                dataset.push([newNumber1, newNumber2]); //Add new number to array
            }

            //Update scale domains
            xScale.domain([0, d3.max(dataset, function (d) {
                return d[0];
            })]);
            yScale.domain([0, d3.max(dataset, function (d) {
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

            console.log("entra hasta acA??")

        });


    // Append svg parent
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