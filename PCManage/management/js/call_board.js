/**
 * Created by Administrator on 2015/8/14 0014.
 */
window.onload= function () {

    $("#callbtn").bind('click', function () {
        var calltype=$("#calltype option:selected").text();
        var callcon=$("#callcon").val();

        //alert(calltype+callcon);
        $.ajax({
            url:'php/get/call_board.php',
            dataType:'json',
            Type:'POST',
            data:{
                'calltype':calltype,
                'callcon':callcon
            },
            success: function (data) {
                console.log(data);
                if(data==1){
                    alert("创建成功");
                }else if(data==0){
                    alert("创建失败")

                }else if(data==2){
                    alert("请检查空值");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })


    });
};