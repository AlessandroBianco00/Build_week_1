google.charts.load("visualization", "1", {
    packages: ["corechart"]
  });
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
        color: 'red', // Cambia il colore del testo del titolo a rosso
        fontSize: 18 // Specifica la dimensione del carattere del titolo
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
    //var chW = cht.width/2;
    //var chH = cht.height/2;
    //var txW = txt[idx].width/2;
    //var txH = txt[idx].height/2;
    //var W = chW - txW;
    //var H = chH - txH;
    txt[idx].setAttribute('x', X);
    txt[idx].setAttribute('y', Y);
  }

  function init() {
    drawChart('donutchart1', 'VB.NET', 8, 2);
    centerText('#donutchart1', 0, 180, 215);
  }