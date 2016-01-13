/**
 * Created by Administrator on 2015/8/5 0005.
 */
$(document).ready(function(){
    var gl={
        workdaytbody:document.getElementById("workdaytbody"),
        windowH:window.innerHeight+'px'
    };


    var tables=$("#searchBusin >div").find("table");
    $("#searchBusin >div").delegate('span','click',function(){
        if($(this).next().css('display')=='table'){
            $(this).next().css('display','none');
        }else{
            $(this).next().css('display','table');
            $("#searchBus >div").css('margin-top','10px');
        }
        if(tables.eq(0).css('display')=='none'&&tables.eq(1).css('display')=='none'&&tables.eq(2).css('display')=='none'){
            $("#searchBus >div").css('margin-top','auto');
        }
    });
    $("#searchBus").css('height',gl.windowH);

    /*工作日常规班车查询数据获取*/
    $.ajax({
        url:'../php/non_get/check_regular.php',
        dataType:'json',
        Type:'POST',
        success:function(data){
            console.log("---data1---");
            console.log(data);
            var workdaytbody=document.getElementById("workdaytbody");
            var docfra=document.createDocumentFragment();
            data.forEach(function(item,index){
                console.log(data[index]['FName']);
                var tr="<tr>"+
                            "<td>"+data[index]['FID']+"</td>"+
                            "<td>"+data[index]['stop'][0]+"</td>"+
                            "<td>"+data[index]['time'][0]+"</td>"+
                        "</tr>";
                $("#workdaytbody").append(tr);
            });
            //gl.workdaytbody.appendChild(docfra);
        },
        error:function(error){
            alert(error)
        }
    });

    /*添加发车时间功能*/
    function addTime(data){
        var time="|";
        data.forEach(function(item,index){
            time=time+item+"|";
        });
        return time;
    }

    /*添加发车地点名称功能*/
    function addpark(data){
        var park="|";
        data.forEach(function(item,index){
            park=park+item+"|";
        });
        return park;
    }
    /*添加发车地点名称功能*/
    function addbusline(data){
        var line="|";
        data.forEach(function(item,index){
            line=line+item+"|";
        });
        return line;
    }

    /*工作日加班车查询*/
    $.ajax({
        url:'../php/non_get/check_overwork.php',
        dataType:'json',
        Type:'POST',
        success:function(data){
            console.log("---data2---");
            console.log(data);
            data.forEach(function(item,index){
                console.log(data[index]['FName']);
                var tr="<tr>"+
                            "<td>"+data[index]['FName']+"</td>"+
                            "<td>"+data[index]['route']+"</td>"+
                            "<td>"+addpark(data[index]['stop'])+"</td>"+
                            "<td>"+addTime(data[index]['time'])+"</td>"+
                        "</tr>";

                $("#addworkdaytbody").append(tr);
            })


        },
        error:function(error){
            alert(error)
        }
    });

    /*周末加班车查询*/
    $.ajax({
        url:'../php/non_get/check_weekend.php',
        dataType:'json',
        Type:'POST',
        success:function(data){
            console.log("---data3---");
            console.log(data[0]['stop']);
            $.each(data[0]['stop'],function(index,val){
                console.log($(this)[0]['FName']);
                var tr="<tr>"+
                    "<td>"+$(this)[0]['FID']+"</td>"+
                    "<td>"+$(this)[0]['FName']+"</td>"+
                    "<td>"+$(this)[0]['FTime']+"</td>"+
                    "<td>"+$(this)[0]['address']+"</td>"+
                    "</tr>";

                $("#addweekdaytbody").append(tr);

            });
            /*data[0]['stop'].forEach(function(item,index){
                console.log(data[index]['FName']);
                var tr="<tr>"+
                            "<td>"+item['FID']+"</td>"+
                            "<td>"+item['FID']+"</td>"+
                            "<td>"+item['FID']+"</td>"+
                            "<td>"+item['FID']+"</td>"+
                        "</tr>";

                $("#addweekdaytbody").append(tr);
            });*/

        },
        error:function(error){
            alert(error)
        }
    });


});
