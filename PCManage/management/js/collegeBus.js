/**
 * Created by Administrator on 2015/8/11 0011.
 */
window.onload=function(){
    var gl={
        collegesubmit:document.getElementById("collegesubmit"),
        collegemain1:document.getElementById("collegemain1"),
        collegemain2:document.getElementById("collegemain2"),
        collegemain3:document.getElementById("collegemain3"),
        collegemain4:document.getElementById("collegemain4"),
        collegemain5:document.getElementById("collegemain5"),
        collegemain6:document.getElementById("collegemain6"),
        collegemain7:document.getElementById("collegemain7"),
        Curdate:new Date(),
        slideright:document.getElementById("slideright")

    };
    /*XHR工厂模式*//*
    function createLink(){//函数声明

        if(window.ActiveXObject){
            var newRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }else{
            var newRequest = new XMLHttpRequest();
        }
        return newRequest;
    };

    gl.collegesubmit.onclick=function(){

        *//*主动初始化数据*//*
        (function(){
            //发送请求
            var http_request = createLink();//创建一个ajax对象
            if(http_request){
                var url='php/asnycData/collegeBook.php';

                http_request.open("post",url,true);
                http_request.setRequestHeader("content-type","application/x-www-form-urlencoded");


                //指定一个函数来处理从服务器返回的结果
                http_request.onreadystatechange = dealresult; //此函数不要括号,当状态发生变化时触发函数,相当于->

                //发送请求
                //var data={'name':'lio'};JSON.stringify(data)
                var data={};
                data['FNumber']= gl.collegemain1.value;
                data['FCompanyID']= gl.collegemain2.value;
                data['FNum']= gl.collegemain3.value;
                data['FRDate']= gl.collegemain4.value;
                data['FRTime']= gl.collegemain5.value;
                data['FStopID']= gl.collegemain6.value;
                data['FDate']= gl.collegemain7.value;
                data['val']=123;
                http_request.send(data['val']);
            };

            //处理返回结果
            function dealresult(){
                console.log(http_request.readyState);
                if (http_request.readyState!=4) {
                    console.log(http_request.readyState);
                    console.log('还未返回正确结果');
                    var load=setInterval(function(){
                        console.log("正在加载.....");
                    },1000)

                }else if(http_request.readyState==4){
                    //等于200表示成功
                    clearInterval("load");
                    if(http_request.status==200){
                        *//*console.log(http_request.responseType);*//*
                        console.log(http_request.responseText);
                        //console.log(JSON.parse(http_request.responseText));
                        //var resdata=JSON.parse(http_request.responseText);
                        if(http_request.responseText==1){
                        	alert("预约成功");
                        }else if(http_request.responseText==2){
                        	alert("请检查空项");
                        }else{
                        	alert("预约失败");
                        }

                        *//*var res = eval("("+http_request.responseText+")");*//*
                    }
                }
            }
        })();
    };*/
    gl.collegesubmit.onclick=function(){

        var date=$("#year").text()+"-"+$("#month").text()+"-"+$("#day").text();
        var time=$("#hour").text()+":"+$("#ins").text();

        $.ajax({
            url:'../management/php/get/collegeBook.php',
            Type:'POST',
            dataType:'json',
            data:{
                FNumber:gl.collegemain1.value,
                FCompanyID:gl.collegemain2.value,
                FNum:gl.collegemain3.value,
                FRDate:date,
                FRTime:time,
                FStop:gl.collegemain6.value,
                FDate:gl.collegemain7.value
            },
            success:function(data){

                console.log(data);

            },
            error: function (err) {
                console.log(err);
            }
        })
    };
    /*用户名 工厂部门*/
    $.ajax({
        url:'../common/php/non_get/employee.php',
        dataType:'json',
        Type:'POST',
        data:{
            //"firstname":data
        },
        beforeSend:function(){
            //alert(123);
        },
        success:function(data){
            console.log(data);
            gl.collegemain1.value=data['name'];
            gl.collegemain2.value=data['Company'];

        },
        error:function(err){
            alert(err.status);
        },
        complete:function(){
            //console.log("OK");
        }
    });

    //gl.collegemain7.value=gl.Curdate.getFullYear()+"-"+(gl.Curdate.getMonth()+1)+"-"+gl.Curdate.getDate();
    gl.collegemain7.value=gl.Curdate.toLocaleString();
    gl.collegemain6.onfocus=function(){
        gl.slideright.style.visibility="visible";
    };
    gl.collegemain6.onblur=function(){
        gl.slideright.style.visibility="hidden";
    };
    
    $("#slideright ul").delegate('li','click',function () {
        var val=$(this).text();

        $("#collegemain6").val(val);
    });
    /*gl.slideright.lastElementChild.childNodes.onclick= function () {
        alert(123);
    }*/

    $("#collegemain span").click(function (e) {
        e.stopPropagation();
        e.cancelBubble=true;
        $(this).find("ul").fadeIn();
    });
    $("#collegemain span ul").delegate('li','click',function (e) {
        e.stopPropagation();
        e.cancelBubble=true;
        $(this).parent().fadeOut();
        $(this).parent().parent().find("i").text($(this).text());
    });

};