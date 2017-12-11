
//-------------------------------------//
//通过定义全局变量 pingpong的对象 并且设定属性数组获取键值

//-------------------------比分变量-----------------------//
var pingpong={
    scoreA:0,   //玩家A的比分
    scoreB:0    //玩家B的比分
};


pingpong.pressedKeys=[
    KEY={
        UP:38,
        DOWN:40,
        W:87,
        S:83
    }
];
pingpong.ball={
    speed:5,
    x:150,
    y:100,
    directionX:1,
    directionY:1
};


$(function(){
   //设置interval 用于每30毫秒调用一次gameloop
    pingpong.timer=setInterval(gameloop,30);

    //标记pressedKeys数组里某键值的状态是按下还是放开
    $(document).keydown(function(e){
       pingpong.pressedKeys[e.which]=true;
    });
    $(document).keyup(function(e){
       pingpong.pressedKeys[e.which]=false;
    });
});

//--------------------------------------------//
//游戏主循环
function gameloop(){
    moveBall();
    movePaddles();
}

//移动球拍
function movePaddles(){
        //使用自定义定时器不断检测是否有按键被按下
        if (pingpong.pressedKeys[KEY.UP]){      //按键向上
            //把球拍B向上移动5个像素
            var top=parseInt($('#paddleB').css('top'));
            $('#paddleB').css('top',top-5);
        }
        if (pingpong.pressedKeys[KEY.DOWN]){    //按键向下
            //把球拍B向下移动5个像素
            var top=parseInt($('#paddleB').css('top'));
            $('#paddleB').css('top',top+5);
        }
        if (pingpong.pressedKeys[KEY.W]){       //w键 按键向上
            var top=parseInt($('#paddleA').css('top'));
            $('#paddleA').css('top',top-5);
        }
        if (pingpong.pressedKeys[KEY.S]){    //S键 按键向下
            var top=parseInt($('#paddleA').css('top'));
            $('#paddleA').css('top',top+5);
        }
}

//移动球
function moveBall(){
    //引用需要用的变量
    var playgroundHeight=parseInt($('#playground').height());       //获取地图高
    var playgroundWidth=parseInt($('#playground').width());         //获取地图宽
    var ball=pingpong.ball;                                         //获得对象属性

    //-----------------------------------------------------//
    //PaddleA
    var paddleAX=parseInt($('#paddleA').css('left'))+parseInt($('#paddleA').css('width'));      //球拍A的X值
    var paddleAYbottom=parseInt($('#paddleA').css('top'))+parseInt($('#paddleA').css('height'));        //球拍A的底部y值
    var paddleAYTop=parseInt($('#paddleA').css('top'));                                         //球拍顶部的y值

    //paddleB
    var paddleBX=parseInt($('#paddleB').css('left'));
    var paddleBYbottom=parseInt($('#paddleB').css('top'))+parseInt($('#paddleB').css('height'));
    var paddleBYTop=parseInt($('#paddleB').css('top'));

    //-----------------------------------------------------//
    var BallX=ball.x+ball.speed*ball.directionX,                   //因为嫌每次变量写得太累，所以多写了一个值用于获取球的X
        BallY=ball.y+ball.speed*ball.directionY;
    //检测左侧球拍(check moving paddle here)
    if (BallX<paddleAX && BallY<=paddleAYbottom && BallY>=paddleAYTop){
        ball.directionX=1;
    }

    //检测检测右侧球拍
    if (BallX+15>paddleBX && BallY<=paddleBYbottom && BallY>=paddleBYTop){
        ball.directionX=-1;
    }



    //检测球台边缘
    //检测底边
    if (ball.y+ball.speed*ball.directionY+15>playgroundHeight){
        ball.directionY=-1;
    }
    //检测顶部
    if (ball.y+ball.speed*ball.directionY<0){
        ball.directionY=1;
    }

    //-----------------------规则检测---------------------------//
    //检测右边
    if (BallX>playgroundWidth){
        //玩家B丢分
        pingpong.scoreA++;
        $('#scoreA').html(pingpong.scoreA);
        //重置乒乓球
        ball.x=250;
        ball.y=100;
        $("#ball").css({
            "left":ball.x, "top":ball.y
        });
        ball.directionX=-1;
    }
    //检测左边
    if (BallX<0){
        //玩家A丢分
        pingpong.scoreB++;
        $('#scoreB').html(pingpong.scoreB);
        //重置乒乓球
        ball.x=250;
        ball.y=100;
        $("#ball").css({
            "left":ball.x, "top":ball.y
        });
        ball.directionX=1;
    }

/*    //检测右边
    //if (ball.x+ball.speed*ball.directionX+15>playgroundWidth){
    //    ball.directionX=-1;
    //}
    //检测左边
    //if (ball.x+ball.speed*ball.directionX<0){
    //    ball.directionX=1;
    //}*/

    ball.x+=ball.speed*ball.directionX;
    ball.y+=ball.speed*ball.directionY;

    //稍后会在此检测球拍
    //根据速度与方向移动球
    $("#ball").css({
        "left":ball.x,
        "top":ball.y
    });
}


//--------------------总结-------------------------//
//照书上所述，以上发生的许多所谓碰撞检测实际上只是伪碰撞，更加真实的碰撞需要的运算
