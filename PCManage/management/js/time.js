/**
 * Created by Administrator on 2015/8/22 0022.
 */
$(document).ready(function(){
    $("#checktempBusul").delegate('.selecttime','focus',function(e){
        var that=$(this);
        $(this).addClass('selectedtime');


        if(!$.contains("body","#checktempBusul")){
            e.stopPropagation();
            e.cancelBubble=true;

            var doc=document.createDocumentFragment();
            var div=document.createElement("div");
            div.setAttribute('id','selecttimebox');

            div.style.cssText="position:relative;width:300px;height:220px; z-index:102;background-color:white;border-radius:2px;position:fixed;top:0;bottom:0;left:0;right:0;margin: auto auto;";
            var ul=document.createElement("ul");
            ul.style.cssText="width:40%;height:100%;overflow-y:scroll;float:left;";
            var ol=document.createElement("ol");
            ol.style.cssText="width:60%;height:100%;overflow-y:scroll;float:left;";


            var h4=document.createElement("h4");
            h4.style.cssText='width:100%;height:30px;text-align:center;line-height:30px;font-weight;bold;position:absolute;top:-41px;background-color:white';
            h4.appendChild(document.createTextNode("时间选择"));
            div.appendChild(h4);

            var button=document.createElement("button");
            button.appendChild(document.createTextNode("确定"));
            button.setAttribute('id','timesub');
            button.style.cssText="width:100px;height:30px; margin:10px auto; background-color:#39f;left:0;right:0;color:white;position:absolute;top:100%;border-radius:4px;";
            div.appendChild(button);

            !function(){
                for(var i=1;i<=24;i++){
                    if(i<10){
                        /*var hou="0"+i;*/
                        var hou=i;
                    }else{
                        var hou=i;
                    }
                    var li=document.createElement("li");
                    li.style.cssText="width:100%;height:30px;line-height:30px;text-align:center;";
                    var txt=document.createTextNode(hou);
                    li.appendChild(txt);
                    ul.appendChild(li);
                }
            }();
            !function(){
                for(var i=1;i<=60;i++){
                    if(i<10){
                        var sec="0"+i;
                    }else{
                        var sec=i;
                    }
                    var li=document.createElement("li");
                    li.style.cssText="width:100%;height:30px;line-height:30px;text-align:center;";
                    var txt=document.createTextNode(sec);
                    li.appendChild(txt);
                    li.appendChild(txt);
                    ol.appendChild(li);
                }
            }();

            div.appendChild(ul);
            div.appendChild(ol);

            var shadow=document.createElement("div");
            shadow.setAttribute('id','shadow');
            shadow.style.cssText="width:100%; z-index:101;position:fixed;top:0;left:0;background-color:#999999;opacity:0.6;";
            shadow.style.height=window.innerHeight+"px";
            //alert(window.innerHeight);
            document.body.appendChild(shadow);
            document.body.appendChild(div);
        }
    });

    /*事件*/
    /*$("#checktempBusul").delegate('.selecttime','blur',function(e){
        $(this).removeClass("selectedtime");
    });*/
    /*$("body").delegate('#selecttimebox li','mouseenter',function(){
        $(this).css('background-color','gray').addClass('selecttime');
        $(this).siblings().css('background-color','white').removeClass('selecttime');
    });*/
    $("body").delegate('#selecttimebox li','click',function(){
        $(this).css('background-color','gray').addClass('selecttime');
        $(this).siblings().css('background-color','white').removeClass('selecttime');
    });


    $("body").delegate('#shadow','click',function(){
        $(this).fadeOut();
        $(this).next().fadeOut();

        $(this).next().remove();
        $(this).remove();
    });

    $("body").delegate('#timesub','click',function(){
        var val=$(this).parent().find('li.selecttime');
        if(val.length==2){
            console.log(val.eq(0).text());
            console.log(val.eq(1).text());

            $(".selectedtime").val(val.eq(0).text()+":"+val.eq(1).text());

            $(".selectedtime").removeClass("selectedtime");
            $(this).parent().prev().remove();
            $(this).parent().remove();

        }else{
            alert("请选择完整");
        }
    });

    /*缺陷重复占用资源，改成加载即插入，隐藏即可，跟date一样*/

});