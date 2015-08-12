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
        //Curdate:new Date(),
        slideright:document.getElementById("slideright")

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


    gl.collegesubmit.onclick=function(){

        var date=$("#year").text()+"-"+$("#month").text()+"-"+$("#day").text();
        var time=$("#hour").text()+":"+$("#ins").text();
        var FType=$("#radioline label input:radio[checked='checked']").val();

        //alert(gl.collegemain1.value);
        $.ajax({
            url:'../management/php/get/temp_book.php',
            Type:'POST',
            dataType:'json',
            data:{
                /*FNumber:gl.collegemain1.value,
                FCompanyID:gl.collegemain2.value,*/
                FNum:gl.collegemain3.value,
                FRDate:date,
                FRTime:time,
                FStartStop:gl.collegemain6.value,
                FEndStop:gl.collegemain7.value,
                FType:FType
            },
            success:function(data){

                console.log(data);
                if(data==2){
                	alert("请检查空项");
                }else if(data==1){
                	alert("预约成功");
                }else{
                	alert("预约失败，请联系技术支持");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    };

    //gl.collegemain7.value=gl.Curdate.getFullYear()+"-"+(gl.Curdate.getMonth()+1)+"-"+gl.Curdate.getDate();
    //gl.collegemain7.value=gl.Curdate.toLocaleString();

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