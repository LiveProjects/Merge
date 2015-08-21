/**
 * Created by Administrator on 2015/8/19 0019.
 */
window.onload= function () {
    var gl={
        meetingroomBookbtn:document.getElementById('meetingroomBookbtn')
    };

    var time=['8:00-10:00','14:00-15:00','18:00-20:00'];
    /*time的填充*/
    time.forEach(function (item, index, attr) {
        var arr=item.split("-");
        console.log(arr[0]);
        console.log(arr[1]);
    });

    /*选择查询*/
    meetingroomBookbtn.onclick=function(){
        var dateval=this.previousElementSibling.value;
        //alert(dateval);
        $.ajax({
            url:'php/get/meetingroombook.php',
            dataType:'json',
            Type:'POST',
            data:{
                'date':dateval
            },
            success:function(data){
                console.log(data);
                $("#name").val(data['emp_name']);
                $("#phone").val(data['phone']);
                $("#section").val(data['com_name']);
                $("#datetime").val(data['sec_name']);
                /*插入数据*/
                $("#meetingroomtbody").empty();
                var time=data['room'];
                console.log(time);



                time.forEach(function(item,index,attr){
                    var tr=document.createElement("tr");

                    for(var i=0;i<27;i++){
                        if(i==0){
                            var td=document.createElement('td');
                            var txt=document.createTextNode(item['FName']);
                            td.appendChild(txt);
                            tr.appendChild(td);
                        }
                        else if(i==1){
                            var td=document.createElement('td');
                            var txt=document.createTextNode(item['FNum']);
                            td.appendChild(txt);
                            tr.appendChild(td);
                        }else{
                            var td=document.createElement('td');
                            var txt=document.createTextNode("空");
                            td.appendChild(txt);
                            tr.appendChild(td);
                        }
                    };
                    $("#meetingroomtbody").append(tr);
                });

                var time=['8:00-10:00','14:00-15:00','18:00-20:00'];
                /*time的填充*/
                time.forEach(function (item, index, attr) {
                    var arr=item.split("-");
                    console.log(arr[0]);
                    console.log(arr[1]);
                })


            },
            error:function(err){
                console.log(err);
            }
        })
    };
    /*重置*/
    $("#meetingroomBookreset").click(function(){
        $(this).prevAll('input').val('');
    });
    /*提交申请*/
    $("#meetingroomBooksub").click(function(){
        var name=$("#name").val();
        var phone=$("#phone").val();
        var section=$("#section").val();
        var datetime=$("#datetime").val();
        var num=$("#num").val();
        var starttime=$("#starttime").val();
        var endtime=$("#endtime").val();
        var meetroom=$("#meetroom").val();
        $.ajax({
            url:'',
            dataType:'json',
            Type:'POST',
            data:{
                'dateval':dateval
            },
            success:function(data){
                console.log(data);
            },
            error:function(err){
                console.log(err);
            }
        })

    });




    /*行为处理*/
    $("#meetingpanel table tbody").delegate('tr td','click',function(){
        $(this).css('background-color','#9d9d9d');
        $(this).siblings().css('background-color','white');
        $(this).parent().siblings().find('td').css('background-color','white');
    });
};