/**
 * Created by Administrator on 2015/8/18 0018.
 */
window.onload= function () {
    /*数据获取*/
    var gl={
        showmain:document.getElementById('showmain')
    };

    $("#workday_statisticsbtn").click(function (e) {
        var com_name=$("#comname").val();
        var start=$("#starttime").val();
        var end=$("#endtime").val();
        //alert(com_name+start+end);

        $.ajax({
            url:'php/get/statistics_college.php',
            dataType:'json',
            Type:'POST',
            data:{
                'com_name':com_name,
                'start':start,
                'end':end,
                'type':'web'
            },
            success: function (data) {
                console.log(data);

                data.forEach(function (item, index, attr) {
                    var div=
                        "<div class='col-md-10 col-md-offset-1 well'>"+
                        "<label for='' class='form-control' style='background-color: inherit;border: none;'>乘车日期:</label>"+
                        "<input type='text' class='form-control' value='"+item['FRDate']+"' disabled/>"+
                        "<label for='' class='form-control' style='background-color: inherit;border: none;'>人数统计</label>"+
                        "<input type='text' class='form-control' value='"+item['FNum']+"' disabled/>"+
                        "<table class='table'>"+
                        "<thead>"+
                        "<tr>"+
                        "<th>提报人姓名</th>"+
                        "<th>人数</th>"+
                        "<th>乘车日期</th>"+
                        "<th>乘车时间</th>"+
                        "<th>始发站</th>"+
                        "<th>终点站</th>"+
                        "</tr>"+
                        "</thead>"+
                        "<tbody>"+
                        "<tr>"+
                        "<td>"+item['emp_name']+"</td>"+
                        "<td>"+item['FNum']+"</td>"+
                        "<td>"+item['FRDate']+"</td>"+
                        "<td>"+item['FRTime']+"</td>"+
                        "<td>"+item['FStartStop']+"</td>"+
                        "<td>"+item['FEndStop']+"</td>"+
                        "</tr>"+
                        "</tbody>"+
                        "</table>"+
                        "</div>";
                    $('#showmain').append(div);




                });





            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    /*导出Excel*/
    $("#button").click(function(){
        var com_name=$("#comname").val();
        var start=$("#starttime").val();
        var end=$("#endtime").val();

        window.location.href="php/get/statistics_temp.php?com_name="+com_name+"&&start="+start+"&&end="+end+"&&type=excel";

        /*$.ajax({
         url:'php/get/statistics_temp.php',
         dataType:'json',
         Type:'POST',
         data:{
         'com_name':com_name,
         'start':start,
         'end':end,
         'type':'excel'
         },
         success: function (data) {
         console.log(data);
         },
         error:function(err){
         console.log(err);
         },
         finish: function () {
         //..
         }
         });*/
    });

};
