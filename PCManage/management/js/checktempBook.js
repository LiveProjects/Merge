/**
 * Created by Administrator on 2015/8/12 0012.
 */
window.onload= function () {
    var gl={
        checktempBusul:document.getElementById("checktempBusul")
    };

    /*删除*/
    $("#checkBookmain ul").delegate('li button:last-child','click', function () {

        var needval=$(this).parent().prev().prev().prev().find("input");
        //alert(needval.val());
        var that=$(this);
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
                    alert("删除成功");
                    that.parent().parent().remove();
                }else if(data==0){
                    alert("删除失败");
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
    });

    /*班车记录查询*/
    $.ajax({
        url:'php/non_get/temp_checkBook.php',
        dataType:'json',
        Type:'POST',
        success: function (data) {
            console.log(data);
            var items=data['check'];
            items.forEach(function (item, index, attr) {
                function check(val) {
                    if(val=='单程'){
                        return 'checked';
                    }
                }
                function check1(val) {
                    if(val=='往返'){
                        return 'checked';
                    }
                }
                var li=
                "<li>"+
                    "<div>"+
                        "<label for=''>预订人数:</label>"+
                        "<input type='text' disabled value='"+item['FNum']+"'/>"+"人"+
                    "</div>"+
                    "<div>"+
                        "<label for=''>预定日期:</label>"+
                        "<input type='text' disabled value='"+item['FRDate']+"'/>"+
                        "<label for=''>预订时间:</label>"+
                        "<input type='text' disabled value='"+item['FRTime']+"'/>"+
                    "</div>"+
                    "<div>"+
                        "<label for=''>发车地点:</label>"+
                        "<input type='text' disabled value='"+item['FEndStop']+"'/>"+
                        "<label for=''>终止地点:</label>"+
                        "<input type='text' disabled value='"+item['FStartStop']+"'/>"+
                    "</div>"+
                    "<div>"+
                        "<label for=''>单程<input name='line"+index+"' type='radio'"+ check(item['FType'])+"  disabled/></label>"+
                        "<label for=''>往返<input name='line"+index+"' type='radio' "+check1(item['FType'])+" disabled/></label>"+
                    "</div>"+
                    "<div>"+
                        "<button class='btn btn-success'>修改</button>"+
                        "<button class='btn btn-danger'>删除</button>"+
                    "</div>"+
                "</li>";

                $("#checktempBusul").append(li);
            })
        },
        error: function (err) {
            console.log(err);
        }
    })

};