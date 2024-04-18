//IMPORTAZIONE VARIABILE 
let punteggioUtente = localStorage.getItem("punteggioUtente");
let totaleDomande = localStorage.getItem("totaleDomande");
// DICHIARAZIONE CONTENITORI DOVE ANDARE A SCRIVERE IL PUNTEGGIO
let boxCorrette = document.getElementById("corrette");
let boxSbagliate = document.getElementById("sbagliate");

window.onload = function() {
  
  boxCorrette.innerHTML = `<p class="testoCalcolo"> <span>Correct<br> <b>${(punteggioUtente/totaleDomande)*100}% </span></b><br>${punteggioUtente}/${totaleDomande} questions </p>`;


  boxSbagliate.innerHTML = `<p class="testoCalcolo"> <span>Wrong <br> <b>${[(totaleDomande-punteggioUtente)/totaleDomande]*100}%</span></b><br>${totaleDomande-punteggioUtente}/${totaleDomande} questions </p>`;}

   google.charts.load("visualization", "1", {packages: ["corechart"]}); 
   google.charts.setOnLoadCallback(init);


function drawChart(chartID, heading, known, unknown) {

    var chart = new google.visualization.PieChart(document.getElementById(chartID));
    var data = google.visualization.arrayToDataTable([
      ['Knowledge', 'Out of 10'],
      ['Known', known],
      ['Unknown', unknown]
    ]);
    var options = {
      title: heading,
      titleTextStyle: {
        color: 'white', 
      },
      
      pieHole: 0.7,
      backgroundColor: 'transparent',
      colors: ['#00FFFF', '#d20094'],
      pieSliceText: 'none',
      legend: {
        position: 'none'
      },
      tooltip: {
        text: 'percentage'
      },
      tooltip: {
        textStyle: {
          fontSize: 12,
        }
      }
    };

    chart.draw(data, options);
  }

  function centerText(chart, idx, X, Y) {
    var cht = document.querySelector(chart);
    var txt = document.querySelectorAll(chart + " text");
    /*var chW = cht.width/2;
    var chH = cht.height/2;
    var txW = txt[idx].width/10;
    var txH = txt[idx].height/100;
    var W = chW - txW;
    var H = chH - txH; */
    txt[idx].setAttribute('x', X);
    txt[idx].setAttribute('y', Y);
  }

  function init() {
    drawChart('donutchart1', 'VB.NET', 8, 2);
    centerText('#donutchart1', 0, 260, 290);
  } 

