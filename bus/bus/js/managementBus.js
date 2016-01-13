/**
 * Created by Administrator on 2015/7/26 0026.
 */
window.onload=function(){
    var gl={
        manameinput:document.getElementById("maname").lastElementChild,
        manamespan:document.getElementById("maname").firstElementChild,
        upname:document.getElementById("maname").lastElementChild.value,
        mainShowul:document.getElementById("mainShow").lastElementChild,
        factoryval:document.getElementById("factory").firstElementChild
    };
    console.log(gl.manameinput.nodeName);
    console.log(gl.manamespan.nodeName);
    /*gl.manameinput.onfocus=function(){
        alert(ad)
    };*/
    if(gl.manameinput.value!=""){
        gl.manamespan.style.cssText="top:-100%;font-size:1.2rem;color:white;left:2px;";
    }
    gl.manameinput.addEventListener('focus',function(){
        gl.manamespan.style.top="-100%";
        gl.manamespan.style.fontSize="1.2rem";
        gl.manamespan.style.color="white";
        gl.manamespan.style.left="2px";
    },false);

    gl.manameinput.addEventListener('blur',function(){
        //console.log(gl.manameinput.value);
        if(gl.manameinput.value==''){
            gl.manamespan.style.top="0";
            gl.manamespan.style.left="10px";
            gl.manamespan.style.fontSize="1.4em";
            gl.manamespan.style.color="#888888";
            console.log(123);
        }else if(gl.manameinput.value!=''){
            console.log("err");
        }

    },false);

    /*初始化数据ajax jquery备用*/
    /*(function(){
        $.ajax({
            url:'checkBus.php',
            Type:'',
            dataType:'json',
            data:{'name':'lio'},
            success:function(data){
                console.log(data);
            },
            beforeSend:function(){
            	alert(1234);
            },
            error:function(err){
                alert(err);
            }
        })
    })();*/


    function createLink(){//函数声明

        if(window.ActiveXObject){
            var newRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }else{
            var newRequest = new XMLHttpRequest();
        }
        return newRequest;
    };

    /*主动初始化数据*/
    (function(){
        //发送请求
        var http_request = createLink();//创建一个ajax对象
        if(http_request){
            var url='../php/non_get/check_bookbus.php';

            //var arr={'name':'lio','age':'123'};

            //var data=arr;

            http_request.open("post",url,true);
            http_request.setRequestHeader("content-type","application/x-www-form-urlencoded");


            //指定一个函数来处理从服务器返回的结果
            http_request.onreadystatechange = dealresult; //此函数不要括号,当状态发生变化时触发函数,相当于->

            /*http_request.onreadystatechange=function(){
                dealresult();
            };*/

            //发送请求
            http_request.send();
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
                    /*console.log(http_request.responseType);
                    console.log(http_request.responseText);*/
                	console.log(JSON.parse(http_request.responseText));
                	//deal(JSON.parse(http_request.responseText),function(){},function(){})


                	var resdata=JSON.parse(http_request.responseText);
                	var responselen=resdata['check'].length;
                	var rescpm=resdata['company'];
                    console.log("------manage------");
                    console.log(resdata);
                	gl.factoryval.value=rescpm['name_com'];
                	gl.manameinput.value=rescpm['name_emp'];


                	(function(){
                		for(var i=0;i<responselen;i++){
                    		var li=
                                "<li>"+
        		                    "<div>"+
        		                        "<label for=''>下车地点: <span>"+resdata['check'][i]['FStop']+"</span></label>"/*+"<span>"+resdata['check'][i]['book_name']+"</span>"*/+
        		                    "</div>"+
        		                    "<span>"+
        		                        "<div>"+
        		                            "<i>加班时间</i>"+
        		                            "<p>"+ resdata['check'][i]['FRTime'] +"</p>"+
        		                        "</div>"+
        		                        "<div>"+
        		                            "<i>加班日期</i>"+
        		                            "<p>"+resdata['check'][i]['FRDate']+"</p>"+
        		                        "</div>"+
        		                    "</span>"+
        		                    "<p>"+
        		                        "<b class='de'><button>删除</button></b>"+
        		                        "<b><button type='reset'>修改</button></b>"+
        		                    "</p>"+
        		                "</li>";
                    		$("#mainShow ul").append(li);
                    	}
                	})();
                	//console.log(gl.mainShowul.innerHTML);


                    /*var res = eval("("+http_request.responseText+")");*/
                }
            }
        }
    })();

    /*删除数据*/
    $("#mainShow ul").delegate("li b.de button",'click',function(){
        var that=$(this);
        var confirm;
        $.confirm("确定删除此预约记录？",function(){
            $.ajax({
                url:'../php/get/delBus.php',
                Type:'POST',
                dataType:'text',
                beforeSend:function(){
                    //alert("要删除的日期是"+that.parent().parent().prev().find("div:last-child").find("p").text());
                },
                data:{
                    //姓名+加班日期
                    //'name':gl.manameinput.value,
                    'FRDate':that.parent().parent().prev().find("div:last-child").find("p").text()
                },
                success:function(data){
                    /*that.parent().parent().parent().remove();*/
                    if(data==1){
                        that.parent().parent().parent().animate({marginLeft:'500px'},600,function(){
                            $.alert('删除成功');
                            $(this).remove();
                        })
                    }else if(data==2){
                        $.alert('请在每天下午5点之间删除记录');
                    }else{
                        $.alert('删除失败，请联系技术支持');
                    }
                },
                error:function(err){
                    $.alert('删除不成功');
                }
            })
        });
    });

    /*用户名 工厂部门*/
    $.ajax({
        url:'../php/non_get/company_section.php',
        dataType:'json',
        Type:'POST',
        data:{
            //"firstname":data
        },
        beforeSend:function(){
            //
        },
        success:function(data){

            console.log("--1--");
            console.log(data);

            console.log("---company--");
            var company=data['Company'];
            //gl.factory.setAttribute('disabled','disabled');
            gl.factoryval.value=company+data['Section'];
            gl.manameinput.value=data['name'];

            //console.log(data);
        },
        error:function(err){
            $.alert(err.status);
        },
        complete:function(){
            //console.log("OK");
        }
    });

    /*修改数据*/
    $("#mainShow ul").delegate("li b:last-child button",'click',function(){
        /*确定用户数据*/
        //姓名+加班日期

        sessionStorage.setItem('name',$("#maname").find("input").val());

        sessionStorage.setItem('date',$(this).parent().parent().prev().find("div:last-child").find("p").text());
        //alert("临时数据为"+sessionStorage.getItem('name')+sessionStorage.getItem('date'));

        /*初始填充值 严重错误,偶合度高,灵活性差,可拓展性差,以后再改*/
        sessionStorage.setItem('fixdate',$(this).parent().parent().prev().find("div:last-child").find("p").text());
        sessionStorage.setItem('fixtime',$(this).parent().parent().prev().find("div:first-child").find("p").text());
        sessionStorage.setItem('fixadd',$(this).parent().parent().parent().children("div").find("span").text());

        //alert("初始化的数据为:"+sessionStorage.getItem('fixdate')+sessionStorage.getItem('fixtime')+sessionStorage.getItem('fixadd'));
        location.href="fixBus.html";

    });



    /*for layout*/
    document.getElementById("maname").lastElementChild.style.textIndent="10px";
};