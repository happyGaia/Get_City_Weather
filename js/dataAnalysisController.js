function createChart() {
	var data = {
	    labels: ["2007", "2008", "2009", "2010", "2011", "2012", "2013"],
	    datasets: [
	        {
	            label: "Men",		            
	            strokeColor: "#DCDCDC",
	            pointColor: "#DCDCDC",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "#DCDCDC",
	            data: [106898, 103937, 99492, 87213, 101943, 118848, 103120]
	        },
	        {
	            label: "Female",		            
	            strokeColor: "#97BBCD",
	            pointColor: "#97BBCD",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "#97BBCD",
	            data: [97516, 94796, 91818, 79673, 94684, 110633, 95993]
	        }
	    ]
	};

	var options = {
		animation: false,
		// scaleOverride : true,
		// scaleSteps : 7,
		// scaleStepWidth : 10000,
	    scaleShowGridLines : true,
	    scaleGridLineColor : "rgba(0,0,0,.05)",
	    scaleGridLineWidth : 1,
		scaleShowHorizontalLines: true,
	    scaleShowVerticalLines: false,
	    caleShowLabels: true,
	    scaleLabel: "<%=' '+(value/1000)%>K",
	    bezierCurve : false,
		responsive: true,
		pointDot : true,
	    pointDotRadius : 4,
	    pointDotStrokeWidth : 1,
	    pointHitDetectionRadius : 20,
	    datasetStroke : true,
	    datasetStrokeWidth : 2,
	    datasetFill : false,
	    showTooltips: true,
	    legendTemplate: "<ul><% for(i=0; i<datasets.length;i++){%><li><span style='color:<%=datasets[i].strokeColor%>'>▬</span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	};

	var c = document.getElementById("chart");
	if (typeof window.G_vmlCanvasManager!="undefined") { 
        c=window.G_vmlCanvasManager.initElement(c); 
    } //for IE 7,8 getContent
	var ctx = c.getContext("2d");
	var myLineChart = new Chart(ctx).Line(data, options);
	document.getElementById('legend').innerHTML = myLineChart.generateLegend();
};

	
