$(function(){
//红桃 H   黑桃M   梅花M  方块 F

function makepk(){
var poke=[],
    color=['h','s','c','d'],
    biao={};

while(poke.length!==52){
    var index=Math.floor(Math.random()*4);
    var n=Math.ceil(Math.random()*13);
    var c=color[index];
    var v={color:c,number:n};
    if(!biao[c+n]){
    	biao[c+n]=true;
    	poke.push(v);
    }
}
 return poke;

}
var  poke=makepk();

function setpk(poke){
var dict={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K',}
 var index=0;
 for(var i=0,pk;i<7;i++){
       for(var j=0;j<i+1;j++){
         pk=poke[index];
          
         index+=1;
        $('<div>')
        .addClass('pai')
        .css({backgroundImage:'url(img/'+dict[pk.number]+pk.color+'.png)'})
        .attr('data-number',pk.number)
        .attr('id',i+'_'+j)
         .delay(index*30)
         .appendTo('.scene')
         .animate(
         	{top:i*50,
          left:j*110+(6-i)*55,
         opacity:1
       });
     }
 } 
//管理剩下的牌
for(;index<poke.length;index++){
      pk=poke[index];
    $('<div>')
        .addClass('pai left')
        .css({backgroundImage:'url(img/'+dict[pk.number]+pk.color+'.png)'})
         .delay(index*30)
         .attr('data-number',pk.number)
         .appendTo('.scene')
         .animate(
         	{top:470,
          left:100,
         opacity:1
       });
 }
}
//发牌
$('.start').on('click',function(){

 if($('.pai').length!=0){
   return;
 }else{ setpk(makepk());}
   
})
//重新开始
$('.cxstart').on('click', function() {
       $('.pai').detach();
       setpk(makepk());
    })

var moveLeft=$('.move-left');
zindex=1;

moveLeft.on('click',(function(){
      return function(){//闭包
      if($('.left').length==0){
          return;
       }
      $('.pai.left').last()
      .css({'zIndex':zindex++})
      .animate({left:570})
      .queue(function(){
      	$(this)
      .removeClass('left')
      .addClass('right')
      .dequeue()
});
 
};
})());
     
 var moveRight=$('.move-right');
 var number=0;
moveRight.on('click',(function(){
    return function(){
    	if($('.pai.left').length){
    		return;
    	}
    	number+=1;
    	if(number>3){
    		return;
    	}
    	//输出arguments  this的指向
      $('.pai.right').each(function(i,v){//v不用可以删掉
           //jquery中回调函数中的this大部分情况下是指向集合中的一个（DOM）元素     $(v)=$(this)一般用$(this)
           $(this)
           .css('z-index',0)
           .delay(i*50)//简单的setTimeout
           .animate({left:100})
           .queue(function(){
           	$(this).removeClass('right')
           	.addClass('left')
           	.dequeue();
           })
    	})
    }

 })());     



 //函数 获取1 2 3......
 function getNumber(el){
 	return parseInt($(el).attr('data-number'))

 }
 var isCanClick=function(el){
 	//用id或者属性在元素上记录一些有意义的东西
  var x=parseInt($(el).attr('id').split('_')[0]);
 	var y=parseInt($(el).attr('id').split('_')[1]);
    /*if($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length){
    	return false;
 }else{
 	return true;
 }*/
  return $('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length
 }
   

   var prev=null; //开关的思想  一开始空的
 
  //事件委托 pai是后加事件 
 $('.scene').on('click','.pai',function(){
 	   //点击出现动画
 
   //this是document对象 如果被压住直接返回 如果是13直接消除 函数返回 第一张存储  第二张 上次存储的和现在的
  if($(this).attr('id')&&isCanClick(this)){
 		   return;
 	}
   
 $(this).toggleClass('chu')
  if($(this).hasClass('chu')){
    $(this).animate({top:'-=20'}).css('border','2px solid red')
  }else{
    $(this).animate({top:'+=20'})
  }
       
var number=getNumber($(this));
 	//点到13
 if(number===13){
       $(this).animate({
       	top:0,
        left:600,
        opacity:0
       }).queue(function(){
       	$(this).detach().dequeue();
       });
  };

if(prev){
  if(getNumber(prev)+getNumber($(this))===13){
		$(this).animate({
		
			top:0,left:700,
      opacity:0
		}).queue(function(){
			$(this)
      .detach()
      .dequeue();
		})
      prev.delay(400)
      .animate({
        top:0,left:700,
      opacity:0
    })

	}else{
		if(prev.hasClass('chu')&&$(this).hasClass('chu')){
		prev.delay(400)
    .animate({
    top:'+=20'})
    $(this)
    .animate({top:'+=20'})
   }
    
   }
    
    prev.add(this).css('border','none').removeClass('chu')
   prev=null;//清空 
}else{
	//第一个非13时 保存第一张
	prev=$(this)
 
};

});


 





})



/*$(function(){
  
       
    function makepoker(){
var poker=[],
    color=['h','s','c','d'],
    biao={};

while(poker.length!==52){
    var index=Math.floor(Math.random()*4);
    var n=Math.ceil(Math.random()*13);
    var c=color[index];
    var v={color:c,number:n};
    if(!biao[c+n]){
      biao[c+n]=true;
      poker.push(v);
    }
}
 return poker;

}
var poker=makepoker();

function setpoker(poker){
var dict={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K',}
 var index=0;
 for(var i=0,pk;i<7;i++){
       for(var j=0;j<i+1;j++){
         pk=poker[index];
          
         index+=1;
        $('<div>')
        .addClass('pai')
        .css({backgroundImage:'url(img/'+dict[pk.number]+pk.color+'.png)'})
        .attr('num',pk.number)
        .attr('id',i+'_'+j)
         .delay(index*30)
         .appendTo('.scene')
         .animate(
          {top:i*50,
          left:j*140+(6-i)*70,
         opacity:1
       });
     }
 } 

for(;index<poker.length;index++){
      pk=poker[index];
    $('<div>')
        .addClass('pai left')
        .css({backgroundImage:'url(img/'+dict[pk.number]+pk.color+'.png)'})
         .delay(index*30)
         .attr('num',pk.number)
         .appendTo('.scene')
         .animate(
          {top:470,
          left:130,
         opacity:1
       });
 }
}
 setpoker(makepoker());
  /*点击左往右走  setpoker下面的牌时添加class left
  注意queue 因为animate为时间函数所以只是记录地址不记录值这样就会先移除left后执行动画 所以用queue放入队列当调用 
  .dequeue() 时，会从序列中删除下一个函数，然后执行它。该函数反过来会（直接或间接地）引发对 .dequeue() 的调用，这样序列才能继续下去。*/
    /*var index=1;
   // $('.mleft').on('mousedown',false)
  $('.move-left').on('click',function(){
         $('.left').last()
         .css({zIndex:index++})
         .animate({left:700})
         .queue(function(){
          $(this)
          .removeClass('left')
          .addClass('right')
          .dequeue()
         })
         // console.dir($('.left').length)
         
  })    
    
    //从右往左走
   // $('.move-right').on('mousedown',false)
    $('.move-right').on('click',function(){
   
      var number=0;
      if ($('.pai.left').length) {
        return false;
      }
        number++;
      if (number>3) 
        {return false};
      
      $('.pai.right').each(function(i,v){
            $(this)
            .css({zIndex:index++})
            .delay(i*30).animate({left:190})
            .queue(function(){
            $(this)
            .removeClass('right')
            .addClass('left')
            .dequeue()
               })
      })
      
      })



    
    
    //获取 poker 的number值 处理字符串为整数 通过自定义属性
    function getNum(el){
      return parseInt(el.attr('num'))
    }
    //判断是否被压住  通过id 看下一排的在其之上的两张poker的length是否为零
    function press(el){
      var x=parseInt(el.attr('id').split('_')[0]);
      var y=parseInt(el.attr('id').split('_')[1]);
      if ($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length) {
        return false;
      }else{
        return true;
      }
    }
    var pre;//保留非13 的poker
    //事件委派  为13的和两张之和为13 的点击消失
    //$('.scene').on('mousedown',false)
    $('.scene').on('click','.pai',function(){
      //没有id的和并且没被压住的 停止
      if($(this).attr('id')&&!press($(this))){
             return;
      }
        $(this).animate({marginTop:-20}).css('border','2px solid red');
      
        if (getNum(this)===13) {
           $(this)
          .animate({
            top:0,
            left:1000,opacity:0
          }).queue(function(){
            $(this).detach().dequeue()
          })
          return;
        };
     
        
        if (pre) {
          if (getNum($(this))+getNum(pre)==13) {
            $(this).add(pre).animate({
              top:0,
              left:1000,
              opacity:0
            
            }).queue(function(){
              $(this).detach().dequeue()
            })
          }else{
            $(this).add(pre).animate({marginTop:0})
          }
          pre=null
        }else{
          pre=$(this)
        }
    })



})*/