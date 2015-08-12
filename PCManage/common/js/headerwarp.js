/**
 * Created by Administrator on 2015/8/5 0005.
 */
$(document).ready(function(){
    $("#header").load('../common/html/header.html', function (data, status, xhr) {
        //console.log(data);
        $("#loginBox").css('height',window.innerHeight-100+'px');
        $("#login").click(function(e){
            e.stopPropagation();
            e.cancelBubble=true;
            $("#loginBox").fadeIn(200);

            $("#page").css('opacity','0.2');
        });
        $("#loginBox>span").click(function(){
            $("#loginBox").fadeOut(200);

            $("#page").css('opacity','1');
        });
        $("#loginBox input").focus(function(){
            $(this).prev().css('top','-100%');
            $(this).css('text-indent','10px');
            $(this).parent().css('width','90%');
        });
        $("#loginBox input").blur(function(){
            if($(this).val()==''){
                $(this).prev().css('top','0');
                $(this).css('text-indent','120px');
                $(this).parent().css('width','80%');
            }
        });
    });
    $("#footer").load('../common/html/footer.html', function (data, status, xhr) {
        //console.log(data);
    });

    /*    $("#profile").click(function(){

     });*/

    /*scope.manbus=function(){
     $location.path('/manage')
     };
     scope.layout=function(){
     alert("add layout function");
     }*/
});
