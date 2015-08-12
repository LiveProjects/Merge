window.onload= function () {


    var bannerlen=$("#banner ul li").length;
    var gl={
        i:0
    };
    $("#banner ul li").css('width',window.innerWidth);
    var bannerwidth=bannerlen * window.innerWidth;
    $("#banner ul").css('width',bannerwidth);

    var runbanner=setTimeout(function () {
        /*往返效果*/
        if(gl.i<bannerlen){
        }
        /*循环效果*/
        $("#banner ul li").eq(0).css('margin-left','-100%');

        setTimeout(function(){
            $("#banner ul li").eq(0).appendTo($("#banner ul")).css('margin-left','0%');
            $("#banner ul li").eq(0).css('margin-left','-100%');
            if(gl.i<bannerlen){
                $("#banner ol li").eq(gl.i).css('opacity','1');
                $("#banner ol li").eq(gl.i).siblings().css('opacity','0.6');
                gl.i++;
            }else if(gl.i==bannerlen){
                gl.i=0;
                $("#banner ol li").eq(gl.i).css('opacity','1');
                $("#banner ol li").eq(gl.i).siblings().css('opacity','0.6');
            }

        },3000);
        setTimeout(arguments.callee,3000);
    },3000);

    /*$("#banner ul").delegate('li','mouseenter', function () {
        clearTimeout(runbanner);
    });
    $("#banner ul").delegate('li','mouseleave', function () {
        setTimeout(runbanner);
    })*/
};
