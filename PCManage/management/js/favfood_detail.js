/**
 * Created by Administrator on 2015/8/18 0018.
 */
window.onload= function () {
    var detailimgurl=sessionStorage.getItem('favfooddetailurl');
    var username=sessionStorage.getItem('user');
    var dishname;
    //alert(username);
    //alert(detailimgurl);
    $("#detailimg").attr('src',"../"+detailimgurl);

    /*获取session存的数据的数据库数据*/
    $.ajax({
        url:'php/get/favdetail.php',
        dataType:'json',
        Type:'POST',
        data:{
            'detailimgurl':detailimgurl
        },
        success:function(data){
            console.log(data);
            dishname=data['dishName'];
            console.log(dishname);
            $("#detailcontent").text(data['intro']);
        },
        error: function (err) {
            console.log(err);
        }
    });


    /*提交评论*/
    $("#detailsubbtn").bind('click', function () {
        var content=$(this).prev().val();
        $.ajax({
            url:'php/get/favdetailsub.php',
            dataType:'json',
            Type:'POST',
            data:{
                'dishname':dishname,
                'content':content
            },
            success: function (data) {
                console.log(data);
                if(data==1){
                    alert("评论成功");

                    var div=
                        "<div class='media well well-sm container-fluid'>"+
                        "<div class='media-left col-md-2'>"+
                        "<a href='#'>"+
                        "<img class='media-object' src='common/images/login.jpg' alt='...'>"+
                        "</a>"+
                        "</div>"+
                        "<div class='media-body'>"+
                        "<h4 class='media-heading'>"+sessionStorage.getItem('username')+"</h4>"+
                        "<p>"+content+"</p>"+
                        "</div>"+
                        "</div>"+
                        "</div>";
                    $("#favfooddetailpinglun").prepend(div);

                }else{
                    alert("评论失败");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    /*查评论*/
    $.ajax({
        url:'php/get/favdetailpinglun.php',
        dataType:'json',
        Type:'POST',
        data:{
            'detailimgurl':detailimgurl
        },
        success:function(data){
            console.log(data);
            /*dishname=data['dishName'];
            console.log(dishname);
            $("#detailcontent").text(data['intro']);*/
            data.forEach(function (item, index, attr) {
                var div=
                    "<div class='media well well-sm container-fluid'>"+
                        "<div class='media-left col-md-2'>"+
                            "<a href='#'>"+
                                "<img class='media-object' src='common/images/login.jpg' alt='...'>"+
                                "</a>"+
                            "</div>"+
                           "<div class='media-body'>"+
                                "<h4 class='media-heading'>"+item['username']+"</h4>"+
                                "<p>"+item['pingluncon']+"</p>"+
                            "</div>"+
                        "</div>"+
                    "</div>";

                $("#favfooddetailpinglun").append(div);

            })
        },
        error: function (err) {
            console.log(err);
        }
    });


};