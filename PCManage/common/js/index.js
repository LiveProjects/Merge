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

    $("#favFood").find("i").click(function(){
        $(this).prev().css({'left':'0','margin-left':'0'});

    });
    $("#favFood").find("p").mouseleave(function(){
        $(this).css({'left':'100%','margin-left':'10px'});
        $
    });
    $("#favFood").find("h6").click(function(){
        $(this).next().slideToggle();
    });
    $("#busblock").find("h6").click(function(){
        $(this).nextAll().slideToggle();
    });
    
    $("#ideamain").focus(function(){
    	$(this).attr('rows','8');
    });
    $("#ideamain").blur(function(){
        if($(this).val()==''){
            $(this).attr('rows','4');
        }
    });

    $("#subidea").click(function(){
        var ideaType=$("#ideasel option:selected").text();
        var ideaCon=$("#ideamain").val();
        var ideaAdd=$("#ideaadd").val();
        //alert(ideaType+ideaCon+ideaAdd);
        $.ajax({
            url:'../common/idea.php',
            dataType:'json',
            Type:'POST',
            data:{
                ideaType:ideaType,
                ideaCon:ideaCon,
                ideaAdd:ideaAdd
            },
            success:function(data){
                console.log(data);
                if(data==1){
                    alert("您的建议已提交");
                    $("#ideamain").val('');
                    $("#ideaadd").val('');
                    $(this).attr('rows','2');
                }else if(data==2){
                    alert("请检查空项");
                }else if(data==0){
                    alert("提交失败");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })

    })

};
