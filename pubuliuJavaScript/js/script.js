//页面加载时调用onload的方法
window.onload = function(){
	waterfall('main','box');
	//拖动滚动条
	//加载数据的条件
	//后台给出的数据
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'}]};
	window.onscroll = function(){
		var oParent = document.getElementById("main");
		if(checkScrollSlide){
			//将数据块渲染到页面的尾部
			for (var i = 0 ;i<dataInt.data.length;i++) {
				var oBox = document.createElement('div');
				oBox.className="box";
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}
//设置每一张图片所在的位置
function waterfall(parent,box){
	//将main下的所有class为box元素取出
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	//计算整个页面显示的列数（页面宽/box的宽度）
	var oBoxW =oBoxs[0].offsetWidth;//获取元素的宽
	//获取页面宽度document.documentElement.clientWidth
	//计算列数，向上取整
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main的宽度 margin:0 auto;居中
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto;';
	//第二行的第一张出现在第一行高度最小的图片下面
	//创建数组存放每一列高度
	var hArr = [];
	for (var i = 0;i<oBoxs.length;i++) {
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			//Math.min(1,2,3)求出最小的数但不可用于数组，可以通过apply（）方法改变this的指向
			var minH = Math.min.apply(null,hArr);
			//获取最小高度所在索引
			var index = getMinIndex(hArr,minH);
			//加绝对定位
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top = minH+'px';
			//方法一
			//oBoxs[i].style.left = oBoxW*index+'px';
			//方法二
			oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
			//修改数组中最小高度的数据
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
}
//根据class获取元素
function getByClass(parent,clsname){
	var boxArr = new Array();//用来存储获取到的所有class为box的元素
	var oElements = parent.getElementsByTagName('*');
	for (var i = 0;i<oElements.length;i++) {
		if(oElements[i].className==clsname){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
//获取高度最小的索引
function getMinIndex(arr,val){
	for (var i in arr) {
		if(arr[i]==val){
			return i;
		}
	}
}
//判断是否具备加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById("main");
	var oBoxs = getByClass("box");
	//最后一张图片到浏览器顶端的高度+自身高度的一半
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	//滚动条滑动的距离
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
	//浏览器可视区域的高度
	var height = document.body.clientHeight||document.documentElement.clientHeight;
	return (lastBoxH<scroll+height)?true:false;
}
