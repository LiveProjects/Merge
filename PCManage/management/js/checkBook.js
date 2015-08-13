/**
 * Created by Administrator on 2015/8/12 0012.
 */
window.onload= function () {
    var gl={

    };


    /*删除*/
    $("#checkBookmain ul").delegate('li button:last-child','click', function () {

        var needval=$(this).parent().prev().prev().find("input");
        alert(needval.eq(0).val());

        $.ajax({
            url:'php/get/college_delBook.php',
            dataType:'json',
            Type:'POST',
            data:{
                'FRDate':needval.eq(0).val()
                //time:needval.eq(1).val()
            },
            success:function(data){
                alert(data);
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
            var FNum=$(this).parent().parent().children('div').eq(0).find('input').val();
            var FRDate=$(this).parent().prev().prev().find('input').eq(0).val();
            var fixtime=$(this).parent().prev().prev().find('input').eq(1).val();
            var fixstop=$(this).parent().prev().find('input').val();


            $.ajax({
                url:'php/get/college_fixBook.php',
                dataType:'json',
                Type:'POST',
                data:{
                    'fixtime':'fixtime',
                    'FNum':'FNum',
                    'FRDate':'FRDate',
                    'fixstop':'fixstop'
                },
                success: function (data) {
                    //alert(data);
                    if(data==1){
                        alert("预约成功");
                    }else if(data==2){
                        alert("请检查空项");
                    }else if(data==3){
                        alert("请在每天下午5点之前删除预约");
                    }
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