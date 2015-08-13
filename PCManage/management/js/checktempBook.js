/**
 * Created by Administrator on 2015/8/12 0012.
 */
window.onload= function () {
    var gl={

    };

    /*删除*/
    $("#checkBookmain ul").delegate('li button:last-child','click', function () {

        var needval=$(this).parent().prev().prev().prev().find("input");
        //alert(needval.val());

        $.ajax({
            url:'php/get/temp_delBook.php',
            dataType:'json',
            Type:'POST',
            data:{
                FRDate:needval.eq(0).val()
                //time:needval.eq(1).val()
            },
            success:function(data){
                //alert(data);
                if(data==2){
                    alert("请在每天5点之前删除预约");
                }else if(data==1){
                    alert("预约成功");
                }else if(data==0){
                    alert("预约失败");
                }
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
            var FNum=$(this).parent().parent().children("div").eq(0).find('input').val();
            var FRDate=$(this).parent().parent().children("div").eq(1).find('input').eq(0).val();
            var fixtime=$(this).parent().parent().children("div").eq(1).find('input').eq(1).val();
            var fixstartstop=$(this).parent().parent().children("div").eq(2).find('input').eq(0).val();
            var fixendstop=$(this).parent().parent().children("div").eq(2).find('input').eq(0).val();
            var FType=$(this).parent().prev().find('input:checked').val();

            $.ajax({
                url:'php/get/temp_fixBook.php',
                dataType:'json',
                Type:'POST',
                data:{
                    'fixtime':'fixtime',
                    'fixstartstop':'fixstartstop',
                    'fixendstop':'fixendstop',
                    'FNum':'FNum',
                    'FType':'FType',
                    'FRDate':'FRDate'
                },
                success: function (data) {
                    //alert(data);
                    if(data==3){
                        alert("请在每天五点之前删除预约");
                    }else if(data==2){
                        alert("请检查空项");
                    }else if(data==1){
                        alert("预约成功");
                    }else if(data==0){
                        alert("预约失败");
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