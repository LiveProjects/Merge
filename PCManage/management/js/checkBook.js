/**
 * Created by Administrator on 2015/8/12 0012.
 */
window.onload= function () {
    var gl={

    };


    /*删除*/
    $("#checkBookmain ul").delegate('li button:last-child','click', function () {

        var needval=$(this).parent().prev().prev().find("input");

        $.ajax({
            url:'',
            dataType:'json',
            Type:'POST',
            data:{
                date:needval.eq(0).val(),
                time:needval.eq(1).val()
            },
            success:function(data){
                
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    /*修改*/
    $("#checkBookmain ul").delegate('li button:first-child','click', function () {
        $(this).parent().parent().find("input").removeAttr('disabled');

        /*正则表达式获取数据查找*/
        if($(this).text()=='完成'){
            $(this).parent().parent().find("input").attr('disabled','disabled');
            var that=$(this);
            $.ajax({
                url:'',
                dataType:'json',
                Type:'POST',
                data:{
                    
                },
                success: function (data) {
                    alert(data);
                    that.text("修改");
                },
                error: function (err) {
                    console.log(err);
                }

            });

        }else{
            $(this).text("完成");
        }





    });

    /*输入检测*/
    $("#checkBookmain ul").delegate('li input','input propertychange', function () {
        $(this).attr('disabled','disabled');
        $(this).val($(this).val().slice(0,-1));
        var that=$(this);
        if(time){
            clearTimeout("time");
        }
        var time=setTimeout(function () {
            that.removeAttr('disabled');
        },1000)
    })


};