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
        alert(com_name+start+end);


        $.ajax({
            url:'php/get/statistics_weekend.php',
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


                function addtr(val) {

                    var web=data['web'];

                    var trs='';
                    web.forEach(function (item, index, attr) {
                        //console.log(item['FRDate']);
                        //console.log(val);
                        if(item['FRDate']==val){
                            console.log(item['FRDate']);
                            var tr=
                                "<tr>"+
                                "<td>"+item['FStop']+"</td>"+
                                "</tr>";
                            trs=trs+tr;
                            //console.log(trs,index);
                        }
                    });
                    return trs;
                };

                var date=data['res_num'];
                date.forEach(function (item, index, attr) {
                    var div=
                        "<div class='col-md-10 col-md-offset-1 well'>"+
                        "<label for='' class='control-label'>乘车日期:</label>"+
                        "<input type='text' class='form-control' value='"+item['FRDate']+"' disabled/>"+
                        "<label for='' class='control-label'>人数统计</label>"+
                        "<input type='text' class='form-control' value='"+item['num']+"' disabled/>"+
                        "<table class='table'>"+
                        "<thead>"+
                        "<tr>"+
                        "<th>上车站点</th>"+
                        "</tr>"+
                        "</thead>"+
                        "<tbody>"+
                        addtr(item['FRDate'])+
                        "</tbody>"+
                        "</table>"+
                        "</div>";
                    $('#showmain').append(div);
                })


            },
            error: function (err) {
                console.log(err);
            }
        })
    });

};
