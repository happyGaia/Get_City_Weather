var path = {"analysis":{"css":"css/dataAnalysisStyle.css","js":"js/dataAnalysisController.js","html":"template/dataAnalysis.html","loaded":false},
	"weather":{"css":"css/todayWeatherStyle.css","js":"js/todayWeatherController.js","html":"template/todayWeather.html","loaded":false}
};	

var viewSwitch = {"weather":{"msgId":"#message","infoId":"#weather-result"},"loadingId":".loading","displayNone":"display-none"};
var cssEffect = {"click":{"menu_analy_id":"#btn-analysis","menu_weather_id":"#btn-weather","effect":"btns-click"}};
var menuStatus = {"isOpen":false, "btn":{"key":".phoneMenu","effect":"phoneMenu-click"},"menu":{"key":".menu","effect":"display-block"}};	

$().ready(function(){
	$(".btns>li").bind("click",loadPage);
});


function loadPage(){
	var index = $(this).index();
	switch(index){
		case 1:
			clickMenuEffect("#btn-weather", "#btn-analysis"); //param1:add click effect, param2: reomve click effect		
			loadHeadResource(path.weather);	
			break;
		default:
			clickMenuEffect("#btn-analysis", "#btn-weather"); //param1:add click effect, param2: reomve click effect		
			loadHeadResource(path.analysis);
	};
}

function loadHeadResource(obj){
	if(!obj.loaded){
		var head = document.getElementsByTagName("head")[0];
		loadCss(obj,head);
	}else{
		loadHtml(obj);
	}
}

function loadHtml(obj){
	$("#content").load(obj.html);

}

function loadCss(obj,head){
	// if (document.createStyleSheet){
		//`document.createStyleSheet(obj.css); //for ie 7 & 8 can't use "document.createElement" to create the link issue.
	// }else{
		// var css = document.createElement("link");
		// css.type = "text/css";
		// css.rel = "stylesheet";
		// css.href = obj.css;
		// $(head).append(css);
	// }
	$(head).append('<link type="text/css" rel="stylesheet" href="'+obj.css+'">');
	loadJs(obj,head);
}

function loadJs(obj,head){
	//method1: var js = document.createElement("script");  js.type = "text/javascript";  js.src = obj.js; $(head).append(js); 
	//method2: can use $.getScript
	$(head).append('<script type="text/javascript" src="'+obj.js+'"></script>');

	obj.loaded = true;  //Resource JS and CSS had been loaded.
	loadHtml(obj);		
}

//show and hide view
function switchViewController(colseView, openView){
	addCssEffect(colseView,openView,viewSwitch.displayNone);
}

//add effect when click menu
function clickMenuEffect(addEffectId, rmEffectId){
	addCssEffect(addEffectId,rmEffectId,cssEffect.click.effect);
}

function addCssEffect(id1,id2,effect){
	$(id1).addClass(effect);
	$(id2).removeClass(effect);
}

function displayMessage(msg, key){
	var content = "<div class='error-msg'>"+msg+"</div>";
	$(key).html(content);
}  

// for media query max-width:768px menu 	
function showMenu(){
	if(menuStatus.isOpen){
		menuStatus.isOpen = false;
		$(menuStatus.btn.key).removeClass(menuStatus.btn.effect); //remove btn click style
		$(menuStatus.menu.key).removeClass(menuStatus.menu.effect); //hide menu
	}else{
		menuStatus.isOpen = true; 
		$(menuStatus.btn.key).addClass(menuStatus.btn.effect); //add btn click style
		$(menuStatus.menu.key).addClass(menuStatus.menu.effect); //show menu
	}
}