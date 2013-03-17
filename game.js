var s = "QWERTYUIOPASDFGHJKLZXCVBNM";
var labelArray = [];//用于存储页面中存在的label标签
var number = 0;

/**
 * @param {Number} maxValue产生随机数最大值,不包含最大值,如果100,产生随机数范围为0-99
 */
function getRandom(maxValue){
	return parseInt(Math.random()*maxValue);
}
/**
 * 获取随机字母,从A-Z
 */
function getLabelValue(){
	return s.charAt(getRandom(26));	
}

//创建label标签
function createLabel(){
	var labelValue = getLabelValue();
	var label = document.createElement("label");
	label.value = labelValue;
	label.className = "label";
	label.innerHTML = labelValue;
	
	//获取页面宽度
	var pageWidth =	Math.max(document.documentElement.clientWidth,document.documentElement.scrollWidth,document.documentElement.offsetWidth);
	//防止我们label超过我们的页面
	pageWidth -= 16;
	var labelLeft = getRandom(pageWidth);
	
	label.style.top = "40px";
	
	//随机出现在我们页面中
	label.style.left = labelLeft+"px";
	
	return label;
}

//让label慢慢向下移动
function runLabelTop(label){
	
	//为当前label绑定定时器的id
	label.interval_id = setInterval(function(){
		var top = parseInt(label.style.top);
		
		//获取页面高度
		var pageHeight = document.documentElement.clientHeight-20;
		
		//如果top已经超过页面高度,删除label,并且删除label相关的定时器
		if(top>=pageHeight){
			window.clearInterval(label.interval_id);
			label.parentNode.removeChild(label);
			
			for ( var i = 0; i < labelArray.length; i++) {
				if(labelArray[i]==label){
					labelArray.splice(i,1);
					
					number-=10;
					document.getElementById("game_number").innerHTML = number;
					break;
				}
			}
			//扣分的业务
		}else{
			label.style.top= top+1+"px";
		}
	},10);
}

/**
 * 开始游戏
 */
function startGame(){
	setInterval(function(){
		var label = createLabel();
		
		//把创建label加入到我们统一的集合中
		labelArray.push(label);
		
		document.body.appendChild(label);
		runLabelTop(label);
	},300);
	document.getElementById("startGame").disabled=true;
}

window.onload = function(){
	document.getElementById("startGame").disabled=false;
};


/**
 * 为页面(html标签)注册键盘事件
 */
document.documentElement.onkeydown=function(event){
	event = event || window.event;
	//获取录入的字母码
	var num = event.keyCode;
	//字母码转换为字母
	var code = String.fromCharCode(num);
	
	for ( var i = 0; i < labelArray.length; i++) {
		 //获取页面中的每一个label标签对象
		 var label = labelArray[i];
		 if(label.value==code){
			 	
			 window.clearInterval(label.interval_id);
			 label.parentNode.removeChild(label);
			 labelArray.splice(i,1);
			 
			 number+=100;
			 document.getElementById("game_number").innerHTML = numbser;
			 break;
		 }
	}
};


