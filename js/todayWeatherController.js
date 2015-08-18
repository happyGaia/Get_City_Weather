var getData = function(){
	var city = $("#city").val();
	var country = $("#country").val();
	var default_msg = {"notFind":"Not find city.","empty":"Please input \"City\" field for require."};

	var url = "http://api.openweathermap.org/data/2.5/weather?units=metric&callback=aaa&q=";
	if(city != ""){
		url = url + city;
		if(country != "")
			url = url +","+country;

		$.ajax({
		    url: url,
		    type: 'get',
		    dataType: 'jsonp',
		    beforeSend:function(){
                $(viewSwitch.loadingId).removeClass(viewSwitch.displayNone); //show block in view
                $(viewSwitch.weather.infoId).addClass(viewSwitch.displayNone); //hide block in view
                $(viewSwitch.weather.msgId).addClass(viewSwitch.displayNone); //hide block in view
				
            },
            complete:function(){
                $(viewSwitch.loadingId).addClass(viewSwitch.displayNone);
            },
		    success: function (data) {
		        showDataInView(data);
		    },
		    error: function(xhr,errorThrown){
		    	//console.log("result:"+xhr.statusText+",errorThrown:"+errorThrown);
		    	processErrorMsg(default_msg.notFind);
		    }
		});

	}else{
		processErrorMsg(default_msg.empty);
	}
};

function processErrorMsg(msg){
	var keySwitch = viewSwitch.weather;
	displayMessage(msg,keySwitch.msgId);	
	switchViewController(keySwitch.infoId, keySwitch.msgId);  //param1:hidden,param2:show
}

function showDataInView(data){
	var keySwitch = viewSwitch.weather;
	var content = "";
	$.map(data.weather, function(value, key){
		var rs = weatherInfoList(key,value);
		content = content + rs;		
	});
	$("#wrap-weather").html(content);
	$("#weather-tmep").text(data.main.temp_min+"°C ~ "+data.main.temp_max+"°C");
	$("#weather-humidity").text(data.main.humidity+"%");
	switchViewController(keySwitch.msgId, keySwitch.infoId);  //param1:hidden,param2:show
}

function weatherInfoList(index,weather){
	var weatherArr = ["cloud","rain","clear"]; //relation with css calss name in todayWeatherStyle.css
	var rs = "na";
	var desc = weather.description;
	if(desc != ""){
		for(var i=0; i<weatherArr.length; i++){
			var l_desc = desc.toLowerCase();
			if(l_desc.indexOf(weatherArr[i]) != -1){
				rs = weatherArr[i];
				break;
			}
		}
	}	
	var content = "<div id='weather-info"+index+"' class='infoBox clearfix'><div id='weather-pic"+index+"' class='infoBox-pic'><span class='icon icon-"+rs+"'></span></div><div id='weather-desc"+index+"' class='infoBox-desc'><div id='main"+index+"' class='main'>"+weather.main+"</div><div id='desc"+index+"' class='desc'>"+desc+"</div></div></div>";
	return content;
}
