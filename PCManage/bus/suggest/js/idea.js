/**
 * Created by Administrator on 2015/8/13 0013.
 */

window.onload= function () {


    $("#ideasub").click(function(){
        var ideaType=$("#ideasel option:selected").text();
        var ideaCon=$("#ideaCon").val();
        var ideaAdd=$("#ideaAdd").val();
        //alert(ideaType+ideaCon+ideaAdd);
        /*到时候统一改成绝对路径*/
        var path=window.location.host;
        $.ajax({
            url:'../../../common/idea.php',
            dataType:'json',
            Type:'POST',
            data:{
                ideaType:ideaType,
                ideaCon:ideaCon,
                ideaAdd:ideaAdd
            },
            success:function(data){
                console.log(data);
                if(data==1){
                    alert("您的建议已提交");
                    $("#ideamain").val('');
                    $("#ideaadd").val('');
                    $(this).attr('rows','2');
                    $("#ideamain").find("textarea").val('');
                }else if(data==2){
                    alert("请检查空项");
                }else if(data==0){
                    alert("提交失败");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })

    });
    $("#ideaset").click(function () {
        //$("#ideasel option:selected").text('');
        $("#ideamain").find("textarea").val('');
    })
};