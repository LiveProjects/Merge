/**
 * Created by Administrator on 2015/8/19 0019.
 */
window.onload= function () {
    var gl={
        meetingroomBookbtn:document.getElementById('meetingroomBookbtn')
    };

    var time=['8:00-10:00','14:00-15:00','18:00-20:00'];
    /*time的填充*/
    /*time.forEach(function (item, index, attr) {
        var arr=item.split("-");
        console.log(arr[0]);
        console.log(arr[1]);
    });*/

    /*选择查询*/
    meetingroomBookbtn.onclick=function(){
        var dateval=this.previousElementSibling.value;
        //alert(dateval);
        $.ajax({
            url:'php/get/meetingroombook.php',
            dataType:'json',
            Type:'POST',
            data:{
                'date':dateval
            },
            success:function(data){
                console.log(data);
                $("#name").val(data['emp_name']);
                $("#phone").val(data['phone']);
                $("#section").val(data['com_name']);
                $("#datetime").val(data['sec_name']);
                /*插入数据*/
                $("#meetingroomtbody").empty();
                var room=data['room'];
                //console.log(time);

                /*部门数据*/

                (function(){
                    var section=data['sec'];
                    var secdocfra=document.createDocumentFragment();
                    section.forEach(function(item,index,attr){
                        var textnode=document.createTextNode(item['FName']);
                        var li=document.createElement("li");
                        li.appendChild(textnode);
                        secdocfra.appendChild(li);
                    });
                    document.getElementById('datetimeul').innerHTML="";
                    document.getElementById('datetimeul').appendChild(secdocfra);
                })();



                room.forEach(function(item,index,attr){
                    var tr=document.createElement("tr");

                    for(var i=0;i<27;i++){
                        if(index==0){
                            if(i==0){
                                var td=document.createElement('td');
                                var txt=document.createTextNode(item['FName']);
                                td.appendChild(txt);
                                tr.appendChild(td);
                            }
                            else if(i==1){
                                var td=document.createElement('td');
                                var txt=document.createTextNode(item['FNum']);
                                td.appendChild(txt);
                                tr.appendChild(td);
                            }else{
                                var td=document.createElement('td');
                                td.style.backgroundColor="red";
                                var txt=document.createTextNode("有");
                                td.appendChild(txt);
                                tr.appendChild(td);
                            }
                        }else{
                            if(i==0){
                                var td=document.createElement('td');
                                var txt=document.createTextNode(item['FName']);
                                td.appendChild(txt);
                                tr.appendChild(td);
                            }
                            else if(i==1){
                                var td=document.createElement('td');
                                var txt=document.createTextNode(item['FNum']);
                                td.appendChild(txt);
                                tr.appendChild(td);
                            }else{
                                var td=document.createElement('td');
                                var txt=document.createTextNode("空");
                                td.appendChild(txt);
                                tr.appendChild(td);
                            }
                        }
                    };
                    $("#meetingroomtbody").append(tr);
                });

                function link(a,b,index){
                    //alert(a+"---"+b);

                    function makenum(num1){
                        var num=num1;
                        switch (num){
                            case '08:00':return 3;break;
                            case '08:30':return 4;break;
                            case '09:00':return 5;break;
                            case '09:30':return 6;break;
                            case '10:00':return 7;break;
                            case '10:30':return 8;break;
                            case '11:00':return 9;break;
                            case '11:30':return 10;break;
                            case '12:00':return 11;break;
                            case '12:30':return 12;break;
                            case '13:00':return 13;break;
                            case '13:30':return 14;break;
                            case '14:00':return 15;break;
                            case '14:30':return 16;break;
                            case '15:00':return 17;break;
                            case '15:30':return 18;break;
                            case '16:00':return 19;break;
                            case '16:30':return 20;break;
                            case '17:00':return 21;break;
                            case '17:30':return 22;break;
                            case '18:00':return 23;break;
                            case '18:30':return 24;break;
                            case '19:00':return 25;break;
                            case '19:30':return 26;break;
                            case '20:00':return 27;break;
                            case '20:30':return 28;break;
                            default :break;
                        }

                    }
                    var start=makenum(a);
                    var end=makenum(b);
                    //alert(start+"---"+end);
                    //alert(index);
//                    alert($("#meetingroomtbody").html());
                    $("#meetingroomtbody tr").eq(index).find("td").slice(start-1,end).css('background-color','red').text('有');

                }


                room.forEach(function (item, index, attr) {
                    var a=item['Time'];
                    //console.log("---");
                    //console.log(a);
                    var val=[];
                    var indexs=index;

                    if(a){
                        a.forEach(function(item,index,attr){
                            //alert("---"+index+"---");
                            var one=item.split("-")[0];
                            var two=item.split("-")[1];
                            link(one,two,indexs);
                            val.push(one,two);
                        });
                        console.log(val);
                    }else{
                        return;
                    }
                });

            },
            error:function(err){
                console.log(err);
            }
        })
    };

    /*重置*/
    $("#meetingroomBookreset").click(function(){
        $(this).prevAll('input').val('');
    });
    /*提交申请*/
    $("#meetingroomBooksub").click(function(){
        var dateval=this.previousElementSibling.value;
        var sec_name=$("#datetime").val();
        var FNum=$("#num").val();
        var FStartTime=$("#starttime").val();
        var FEndTime=$("#endtime").val();
        var room_name=$("#meetroom").val();
        $.ajax({
            url:'php/get/meetingroombook.php',
            dataType:'json',
            Type:'POST',
            data:{
                'type':'submit',
                'date':$("#date").val(),
                'sec_name':sec_name,
                'FNum':FNum,
                'FStartTime':FStartTime,
                'FEndTime':FEndTime,
                'room_name':room_name
            },
            success:function(data){
                console.log(data);

                if(data.error==1){
                    alert("预约成功");
                    $("#meetingroomtbody .selected").css('background-color','red').text('有');
                }else if(data.error==0){
                    alert("预约失败，请联系技术支持");

                }else if(data.error==3){
                    alert("预约时间冲突，请重新填写");
                }else if(data.error==4){
                    alert("请检查空项");
                }else if(data.error==5){
                    alert("预约时间为早8：00~下午8:00");

                }
            },
            error:function(err){
                console.log(err);
            }
        })
    });
    /*自动点击*/
    meetingroomBookbtn.click();
    /*部门选择*/
    $("#datetimeul").delegate('li','click',function(){
        $("#datetime").val($(this).text());
        $(this).parent().fadeOut();
    });
    $("#datetime").focus(function () {
        $(this).prev().find("ul").fadeIn(0);
    });


    /*行为处理*/
        var num= 0;
        window.paindex=0;
        window.start=0;
    $("#meetingpanel table tbody").delegate('tr td','click',function(e){
        e.stopPropagation();
        e.cancelBubble=true;

        if($(this).index()>1&&$(this).parent().index()>0){
            if(num==0){//选取一个记录坐标值
                $(this).parent().parent().prev().find("th").removeClass("selected");
                $(this).addClass("selected");
                $(this).siblings().removeClass("selected");
                $(this).parent().siblings().find('td').removeClass("selected");
                window.start=$(this).index();
                window.paindex=$(this).parent().index();
                num++;
            }else{

                var paindex1=$(this).parent().index();
                //alert(window.paindex);
                if(paindex==paindex1){//同行
                    var start1=$(this).index();
                    //alert(window.start);


                    if(window.start<start1){
                        $(this).parent().find("td").slice(window.start,start1+1).addClass("selected");
                        $(this).parent().parent().prev().find("th").slice(window.start,start1+1).addClass("selected");

                        var starttime=$("#meetingroomthead").find("th").eq(window.start).text();
                        var endtime=$("#meetingroomthead").find("th").eq(start1).text();
                        $("#starttime").val(starttime);
                        $("#endtime").val(endtime);
                        $("#meetroom").val($(this).parent().find("td").eq(0).text());
                    }else if(window.start>=start1){
                        var starttime=$("#meetingroomthead").find("th").eq(window.start).text();
                        var endtime=$("#meetingroomthead").find("th").eq(start1).text();
                        $(this).parent().find("td").slice(start1,window.start+1).addClass("selected");
                        $(this).parent().parent().prev().find("th").slice(start1,window.start+1).addClass("selected");

                        $(this).parent().parent().prev().find("th").slice(window.start,start1+1).addClass("selected");

                        $("#starttime").val(endtime);
                        $("#endtime").val(starttime);
                        $("#meetroom").val($(this).parent().find("td").eq(0).text());
                    }
                    num=0;
                }else{//不同行
                    $(this).addClass("selected");
                    $(this).siblings().removeClass("selected");
                    $(this).parent().siblings().find('td').removeClass("selected");
                    $(this).parent().parent().prev().find("th").removeClass("selected");
                    $("#starttime").val('');
                    $("#endtime").val('');
                    window.start=$(this).index();
                    window.paindex=$(this).parent().index();
                    num=0;
                }

                //alert($(this).parent().html());
//            if($(this).parent().has("td.selected")){
//                alert(123);
//                num=0;
//            }
            }
        }

    });
};