window.onload= function () {

    var gl={
        i:0,
        gonggaoul:document.getElementById('gonggao').lastElementChild,
        favfoodul:document.getElementById('favfoodul')
    };
    /*var bannerlen=$("#banner ul li").length;
    //$("#banner ul li").css('width',window.innerWidth);
    var bannerwidth=bannerlen * window.innerWidth;
    $("#banner ul").css('width',bannerwidth);

    var runbanner=setTimeout(function () {
        *//*往返效果*//*
        if(gl.i<bannerlen){
        }
        *//*循环效果*//*
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
    },3000);*/

    /*$("#banner ul").delegate('li','mouseenter', function () {
        clearTimeout(runbanner);
    });
    $("#banner ul").delegate('li','mouseleave', function () {
        setTimeout(runbanner);
    })*/

    $("#favfoodul").delegate('i','click',function(e){
        e.stopPropagation();
        e.cancelBubble=true;
        $(this).prev().css({'left':'0','margin-left':'0'});
    });

    $("#favfoodul").delegate('p','mouseleave',function(){
        $(this).css({'left':'100%','margin-left':'10px'});
        $
    });
    $("#favfoodul").delegate('h6','click',function(){
        $(this).next().slideToggle();
    });
    /*$("#busblock").find("h6").click(function(){
        $(this).nextAll().slideToggle();
    });*/

    /*$("#ideamain").focus(function(){
    	$(this).attr('rows','8');
    });
    $("#ideamain").blur(function(){
        if($(this).val()==''){
            $(this).attr('rows','4');
        }
    });*/

    /*提交建议*/
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
    });

    /*提交设备维修*/
    $("#maginesub").click(function(){
        var ideaType=$("#maginesel option:selected").text();
        var ideaCon=$("#maginemain").val();
        var ideaAdd=$("#magineadd").val();
        //alert(ideaType+ideaCon+ideaAdd);
        $.ajax({
            url:'../common/magine.php',
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
                    $("#maginemain").val('');
                    $("#magineadd").val('');
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

    });

    var gonggaorun=setTimeout(function(){
        $("#gonggao ul li").eq(0).appendTo("#gonggao ul");

        setTimeout(arguments.callee,2000);
    },2000)

    /*去获取公告栏数据*/
    $.ajax({
        url:'common/php/non_get/get_call_board_val.php',
        dataType:'json',
        Type:'POST',
        success:function(data){
            console.log('---call_board');
            console.log(data);
            var gonggaouldoc=document.createDocumentFragment();

            data.forEach(function(item,index,attr){
                //console.log(item['FID']);
                var li=document.createElement("li");
                var con=
                    "["+
                    item['FType']+
                    "]"+
                    item['FContent'];
                var txt=document.createTextNode(con);
                li.appendChild(txt);
                if(item['FType']=='重要'){
                    li.style.cssText="background-color:#d43f3a";
                }
                //li.setAttribute('class','list-group-item');
                gonggaouldoc.appendChild(li);
            });
            gl.gonggaoul.appendChild(gonggaouldoc);
        },
        error: function (err) {
            console.log(err);
        }
    });
    function addalert() {
        var div=
            "<div id='warning' class='alert alert-warning alert-dismissible col-md-4 col-sm-4 col-xs-4 navbar-fixed-top container-fluid hidden' role='alert'>"+
            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+
            "<strong>Warning!</strong> Better check yourself, you're not looking too good."+
            "</div>;";

        $("body").append(div);
    };

    addalert();
    //$("#warning").attr('class','alert alert-warning alert-dismissible col-md-4 col-sm-4 col-xs-4 navbar-fixed-top container-fluid');
    //$("#warning").contains("我是大侠");

    /*一周食谱*/
    function favfood() {
        $.ajax({
            url:'common/php/non_get/getfavfood.php',
            dataType:'json',
            Type:'POST',
            data:{},
            success: function (data) {
                console.log('---favfood');
                console.log(data);

                var favfooddoc=document.createDocumentFragment();
                
                data.forEach(function (item, index, attr) {

                    if(index<4){
                        var favfoodli=document.createElement("li");
                        favfoodli.setAttribute('class','col-md-3');
                        var favfoodimg=document.createElement("img");

                        var src=item['url'].substring(9);
                        favfoodimg.setAttribute('src',src);
                        favfoodli.appendChild(favfoodimg);

                        var p=document.createElement("p");
                        var favfoodtxt=document.createTextNode(item['intro']);
                        p.appendChild(favfoodtxt);
                        favfoodli.appendChild(p);

                        var favfoodi=document.createElement("i");
                        favfoodli.appendChild(favfoodi);

                        var favfoodspan=document.createElement("span");
                        var favfoodbtn1=document.createElement("button");
                        favfoodbtn1.innerText="赞";
                        var favfoodbtn2=document.createElement("button");
                        favfoodbtn2.innerText="已赞数";
                        favfoodspan.appendChild(favfoodbtn1);
                        favfoodspan.appendChild(favfoodbtn2);

                        favfoodli.appendChild(favfoodspan);

                        favfooddoc.appendChild(favfoodli);
                    }
                    //console.log(favfooddoc.innerHTML);
                    gl.favfoodul.appendChild(favfooddoc);

                })
            },
            error: function (err) {
                console.log(err);
            }

        })
    }
    favfood();

    /*点赞*/
    $("#favfoodul").delegate('li span button:first-child','click',function(e){
        e.stopPropagation();
        e.cancelBubble=true;
        var url=$(this).parent().parent().find('img').attr('src');
        //alert(url);
        $.ajax({
            url:'management/php/get/clickzan.php',
            dataType:'text',
            Type:'POST',
            data:{
                'url':url
            },
            success: function (data) {
                console.log(data);
                if(data==1){
                    alert("点赞成功");
                }else{
                    alert("点赞失败");
                }
            },
            error: function (err) {
                console.log(err);

            }
        })
    });

    /*点击跳转展示页*/
    $("#favfoodul").delegate('li','click',function(){
        var favdetailurl=$(this).find('img').attr('src');
        sessionStorage.setItem('favfooddetailurl',favdetailurl);
        window.location.href='management/favfood_detail.html';
    })
};
