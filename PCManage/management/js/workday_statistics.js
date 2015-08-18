/**
 * Created by Administrator on 2015/8/18 0018.
 */
window.onload= function () {
    /*数据获取*/

    $("#workday_statisticsbtn").click(function (e) {
        var com_name=$("#comname").val();
        var start=$("#starttime").val();
        var end=$("#end").val();
        alert(com_name+start+end);
        $.ajax({
            URL:'php/get/nonstatistics_overwork.php',
            dataType:'json',
            Type:'POST',
            data:{
                'com_name':com_name,
                'start':start,
                'end':end
            },
            success: function (data) {
                console.log(data);
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

};
