/**
 * Created by Administrator on 2015/7/24 0024.
 */

window.onload=function(){
    console.log("Welcome to Hisense");
    var parkList=document.getElementById("parkList");
    var parkListul=document.getElementById("parkListul");
    console.log(document.getElementById("adddate").lastElementChild.nodeName);

    /***************防止污染全局对象********************8*/
    var gl={
        height:window.innerHeight,
        showParklist:document.getElementById("showParklist"),
        submitbtn:document.getElementById("submitBtn"),
        manameinput:document.getElementById("name").lastElementChild,
        manamespan:document.getElementById("name").firstElementChild,
        factory:document.getElementById("factory").firstElementChild,
        adddate:document.getElementById("adddate").lastElementChild,
        addtimeUl:document.getElementById("addtime").lastElementChild,
        parkOl:document.getElementById("park").lastElementChild.previousElementSibling,
        parkUl:document.getElementById("park").lastElementChild,

        parkListul:document.getElementById("parkListul"),
        upname:document.getElementById("name").lastElementChild,
        upadddateval:document.getElementById("adddateval"),
        upaddtimeval:document.getElementById("addtimeval"),

        upparkval:document.getElementById("parkval"),

        whichDay:new Date(),
        randomcolor:function(){
            var arr=['#843534','#66512c','#FF8F00','#c1e2b3'];
            return arr;
        },
        makeday:function(num){
            var datefra=document.createDocumentFragment();
            var year=gl.whichDay.getFullYear();
            var month=gl.whichDay.getMonth()+1;
            var day=Number(gl.whichDay.getDate());
            //alert(year+"-"+month+"-"+day);

            var datecur=year+"-"+month+"-"+(day);
            gl.upadddateval.innerHTML=datecur;
            for(;num<=6;num++){
                var colorSE=Math.floor(Math.random()*4);
                var li=document.createElement("li");
                var txt=document.createTextNode(year+"-"+month+"-"+(day++));
                li.appendChild(txt);
                li.style.backgroundColor=gl.randomcolor()[colorSE];
                datefra.appendChild(li);
            }
            gl.adddate.appendChild(datefra);
        },
        addtimefragment:document.createDocumentFragment()
    };




    /********加载初始化的数据*******************************/

    $.ajax({
        url:'../php/non_get/overwork_time_stop.php',
        dataType:'json',
        Type:'POST',
        success:function(data){
        	console.log(data);

            /* 添加加班时间*/
            var arr=data['addtime'];
            console.log(arr);
        	arr.forEach(function(item,index,arr){
        		console.log(arr[index]['FTime'].substr(0,6));
        		var colorSE=Math.floor(Math.random()*4);
        		//console.log(gl.randomcolor()[colorSE]);
        		//gl.randomcolor()[colorSE]
        		//var li="<li style='background-color: " + gl.randomcolor()[colorSE] + "'>6:00</li>";
                //gl.addtimefragment.appendChild(li);
                /* 添加加班时间*/
                var li = document.createElement("li");
                var text = document.createTextNode(arr[index]['FTime'].substr(0,6));
                li.appendChild(text);
                li.style.backgroundColor=gl.randomcolor()[colorSE];
                gl.addtimefragment.appendChild(li);
        	});

            gl.addtimeUl.appendChild(gl.addtimefragment);
            gl.upaddtimeval.innerText


            /* 添加加班日期*/
            var whichDay=gl.whichDay.toString().substr(0,2);
            var whichDayrel;
            switch (whichDay){
                case 'Mo':gl.makeday(1);break;
                case 'Tu':gl.makeday(2);break;
                case 'We':gl.makeday(3);break;
                case 'Th':gl.makeday(4);break;
                case 'Fr':gl.makeday(5);break;
                case 'Sa':gl.makeday(6);break;
                case 'Su':gl.makeday(7);break;
                default :break;
            }

            /* 添加班车下车地点 */
            var spot=data['addBS'];
            var spotweek=data['addBS_weekend'];
            var parkListulfrag=document.createDocumentFragment();
            spot.forEach(function(item,index){
                //console.log(item['FName']);
                var li=document.createElement("li");
                var txt=document.createTextNode(item['FName']);
                li.appendChild(txt);
                parkListulfrag.appendChild(li);
            });
            gl.parkListul.appendChild(parkListulfrag);

            var parkListulfragweek=document.createDocumentFragment();
            spotweek.forEach(function(item,index){
                //console.log(item['FName']);
                var li=document.createElement("li");
                var txt=document.createTextNode(item['FName']);
                li.appendChild(txt);
                parkListulfragweek.appendChild(li);
            });
            gl.parkUl.appendChild(parkListulfragweek);



            /* 设置用户常用下车地点*/
            //alert(spot[0]['FName']);
            //测试
            function tr(){
                for(var i=0;i<3;i++){
                    localStorage.removeItem('usually'+i);
                }
            }
            (function () {
                if(!localStorage.getItem('usually0')){
                    localStorage.setItem('usually0',spot[0]['FName']);
                    localStorage.setItem('usually1',spot[1]['FName']);
                    localStorage.setItem('usually2',spot[2]['FName']);
                }
                //console.log(localStorage.getItem('usually'));
                var parkfrag=document.createDocumentFragment();
                for(var i=0;i<4;i++){
                    var li=document.createElement("li");
                    if(i==3){
                        var txt=document.createTextNode("其他");
                    }else{
                        var txt=document.createTextNode(localStorage.getItem("usually"+i));
                    };
                    li.appendChild(txt);
                    parkfrag.appendChild(li);
                }
                gl.parkOl.appendChild(parkfrag);
                gl.parkOl.lastElementChild.setAttribute('id','showParklist');
                //gl.parkOl.lastElementChild.setAttribute('onclick','addclass()')
            }())
        }
    });

    if(localStorage.getItem('usuallytime')){
        //gl.upaddtimeval.innerText=localStorage.getItem('usuallytime');
    }else{
        //gl.upaddtimeval.innerText=gl.addtimeUl.firstElementChild.innerText;
    }

    if(localStorage.getItem('usually0')){
        gl.upparkval.innerText=localStorage.getItem('usually0');
    }else{
        gl.upparkval.innerText=gl.parkOl.firstElementChild.innerText;
    }
    /*设置离线下车地点,更人性化是放到预订成功之后*/
    $("#parkListul").delegate('li','click',function(){
        var parkval=$(this).text();
        if(parkval!=localStorage.getItem('usually0')&&parkval!=localStorage.getItem('usually1')&&parkval!=localStorage.getItem('usually2')){
            localStorage.setItem('usually2',localStorage.getItem('usually1'));
            localStorage.setItem('usually1',localStorage.getItem('usually0'));
            localStorage.setItem('usually0',parkval);
        }
        console.log(localStorage.getItem('usually0'));
    });
    /*所属工厂模糊查询*/
    console.log(gl.manameinput.nodeName);
    console.log(gl.manamespan.nodeName);
    /*gl.manameinput.onfocus=function(){
     alert(ad)
     };*/
    gl.manameinput.addEventListener('focus',function(){
        gl.manamespan.style.top="-100%";
        gl.manamespan.style.fontSize="1.2rem";
        gl.manamespan.style.color="white";
        gl.manamespan.style.left="0px";
    },false);

    /*gl.manameinput.addEventListener('blur',function(){
        //console.log(gl.manameinput.value);
        if(gl.manameinput.value==''){
            gl.manamespan.style.top="0";
            gl.manamespan.style.left="10px";
            gl.manamespan.style.fontSize="1.4em";
            gl.manamespan.style.color="#888888";
            //console.log(123);
        }else if(gl.manameinput.value!=''){
            console.log("------find name in factory------");
            //console.log(gl.manameinput.value);
            var data=gl.manameinput.value;

            $.ajax({
                url:'php/asnycData/ForBookbusAsnyc.php',
                dataType:'json',
                Type:'POST',
                data:{
                    //"firstname":data
                },
                beforeSend:function(){
                    //
                },
                success:function(data){
                    *//*if(data!=''){

                        console.log(data);

                        console.log("---company--");
                        console.log(data[0]['FName']);
                        var company=data[0]['FName'];
                        gl.factory.setAttribute('disabled','disabled');
                        gl.factory.value=company;
                        //console.log(data);
                    }else{
                        alert("没有录入请手动选取");
                        gl.factory.removeAttribute('disabled');
                        gl.factory.focus();

                    }*//*

                    console.log("--1--");
                    console.log(data);

                    console.log("---company--");
                    console.log(data[0]['FName']);
                    var company=data[0]['FName'];
                    gl.factory.setAttribute('disabled','disabled');
                    gl.factory.value=company;
                    //console.log(data);
                },
                complete:function(){
                    //console.log("OK");
                }
            });
        }
    },false);*/
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
            gl.factory.setAttribute('disabled','disabled');
            gl.factory.value=company+data['Section'];
            gl.manameinput.value=data['name'];

            //console.log(data);
        },
        error:function(err){
          //alert(err.status);
        },
        complete:function(){
            //console.log("OK");
        }
    });


    if(true) {
        gl.manamespan.style.top="-100%";
        gl.manamespan.style.fontSize="1.2rem";
        gl.manamespan.style.color="white";
        gl.manamespan.style.left="0px";
        gl.manamespan.style.fontWeight="bolder";
        //console.log(123);
    }


    /* 尝试function(xxx,successcallback,errorcallback){}*/


    parkListul.style.height=gl.height+'px';

    /*gl.showParklist.addEventListener('click',function(){
        parkList.setAttribute('class','showlist');
    },false);*/

    /*gl.showParklist.onclick=function(e){
        e.stopPropagation();
        parkList.setAttribute('class','showlist');
    };*/
    /*var addclass=function(){
        parkList.setAttribute('class','showlist');
    };*/

    /*时间委托部分以后用原生js代替*/
    $("#adddate ul").delegate('li','click',function(){

        if($(this).index()!=$("#adddate ul li").length-1){
            var valdate=$(this).text();
            //alert(valdate);
            $(this).parent().prev().find("b").text(valdate);
            $("#addtimeval").text($("#addtime ul li").eq(0).text());
            $("#addtime").find("ul").css('visibility','visible');
            $("#park ol").show();
            $("#park ul").hide();

            $("#park").find("b").text($("#park ol li").eq(0).text());
            $(this).css('box-shadow','0 0 2px 4px #245269 inset');
            $(this).siblings().css('box-shadow','none');
        }else if($(this).index()==$("#adddate ul li").length-1){
            var valdate=$(this).text();
            $(this).parent().prev().find("b").text(valdate);
            $("#addtimeval").text("无加班时间项");
            $("#addtime").find("ul").css('visibility','hidden');

            $("#park ol").hide();
            $("#park ul").show();

            $("#park").find("b").text($("#park ul li").eq(0).text());
            $(this).css('box-shadow','0 0 2px 4px #245269 inset');
            $(this).siblings().css('box-shadow','none');

        }
    });
    /*$("#adddate ul").delegate('li:last-child','click',function(){

    });*/
    $("#addtime ul").delegate('li','click',function(){
        var valtime=$(this).text();
        //alert(valdate);
        $(this).parent().prev().find("b").text(valtime);
        $(this).css('box-shadow','0 0 2px 4px #245269 inset');
        $(this).siblings().css('box-shadow','none');
    });
    $("#park ol").delegate('li','click',function(){
        if($(this).text()!='其他'){
            var valpark=$(this).text();
            $(this).parent().prev().find("b").text(valpark);
            $(this).css('box-shadow','0 0 2px 4px #245269 inset');
            $(this).siblings().css('box-shadow','none');
        }
    });
    $("#park ul").delegate('li','click',function(){
        var valpark=$(this).text();
        $(this).parent().parent().find("b").text(valpark);
        $(this).css('box-shadow','0 0 2px 4px #245269 inset');
        $(this).siblings().css('box-shadow','none');
    });
    $("#parkList ul").delegate('li','click',function(){
        var valparkList=$(this).text();
        //alert(valdate);
        $("#parkval").text(valparkList);
        $(this).css('box-shadow','0 0 2px 4px #245269 inset');
        $(this).siblings().css('box-shadow','none');
    });

    $("#park ol").delegate('li#showParklist','click',function(e){
        //alert(13);
        e.stopPropagation();
        e.cancelBubble=true;
        $(this).css('box-shadow','0 0 2px 4px #245269 inset');
        $(this).siblings().css('box-shadow','none');
        $("#parkList").addClass("showlist");
    });
    /*隐藏边栏*/
    document.onclick=function(){
        parkList.removeAttribute('class','showlist');
    };
    //var as=1234;
    /*提交预订数据*/
    gl.submitbtn.onclick=function(e){
    	
        console.log(gl.upadddateval.innerHTML);
    	e.stopPropagation();
        e.cancelBubble=true;
        
        $.ajax({
        	url:'../php/get/book_commit.php',
        	dataType:'',
        	Type:'POST',
        	data:{
                //"name_employee":gl.upname.value,
                "FRDate":gl.upadddateval.innerHTML,//加班日期
                "FRTime":function(){
                    if(gl.upaddtimeval.innerHTML=='无加班时间项'){
                        return '无加班时间项';
                    }else{
                        return gl.upaddtimeval.innerHTML;
                    }
                },//加班时间
                "FStop":gl.upparkval.innerHTML//下车站点
                /*,
                'addtime':'',
                'adddate':''*/
        	},
        	beforeSend:function(){
    			//这里确定一遍数据
                console.log("确定一遍数据");
    		},
        	success:function(data){
                console.log(data);
                if(data==1){
                	alert("预约成功");
                    localStorage.setItem('usuallytime',gl.upaddtimeval.innerText);

                    $("#addtime ul li").css('box-shadow','none');
                    $("#park ul li").css('box-shadow','none');
                    $("#park ol li").css('box-shadow','none');

                    $("#addtime b").text("");
                    $("#park b").text("");

                }else if(data==2){
                	alert("请检查空项");
                }else{
                	alert("预约失败，请联系技术支持");
                }
                

        	},
        	complete:function(){
        		console.log("OK");
        	}
        })
    };
    

    
/*
    	$.ajax({
    		url:'bookbus.php',
    		data:{'name':123},
    		dataType:'json',
    		Type:'get', 
    		beforeSend:function(){
    			alert(13);
    		},
    		success:function(data){
    			alert(data);
    		},
    		error:function(err){
    			console.log(err)
    		}
    	})
    });*/

    /*//创建ajax对象函数
    function createLink(){//函数声明
        if(window.ActiveXObject){
            var newRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }else{
            var newRequest = new XMLHttpRequest();
        }
        return newRequest;
    };
    gl.submitbtn.onclick=function(e){
        e.stopPropagation();
        e.cancelBubble=true;

        //发送请求
        var http_request = createLink();//创建一个ajax对象
        if(http_request){
            var url='bookbus.php';
            var arr=[{qwe:'asd',asd:'123'}];
            var data=arr;
            http_request.open("post",url,true);
            http_request.setRequestHeader("content-type","application/x-www-form-urlencoded");
            

            //指定一个函数来处理从服务器返回的结果
            http_request.onreadystatechange = dealresult; //此函数不要括号,当状态发生变化时触发函数,相当于->
	        http_request.onreadystatechange=function(){
	            dealresult();
	        };
            //发送请求
            http_request.send(data);
        };

        //处理返回结果
        function dealresult(){
            console.log(http_request.readyState);
            if (http_request.readyState!=4) {
                console.log('还未返回正确结果');

            }else if(http_request.readyState==4){
                //等于200表示成功
                clearInterval("load");
                if(http_request.status==200){
                    if(http_request.responseText=="no"){
                        $("#suggest_ul").hide(0);
                        return;
                    }
                    var res = eval("("+http_request.responseText+")");

                }
            }
        }

    };
*/




};