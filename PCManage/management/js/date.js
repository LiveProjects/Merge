$(document).ready(function(){

    /*结构样式部分*/
    var div=document.createElement("div");
    div.style.cssText='width:324px;z-index:101;display:none;position:absolute; top:0;bottom:0;left:0;right:0;margin:auto auto;z-index:100;height:280px';
    div.setAttribute('class','well');
    div.setAttribute('id','datepanel');
    var h6=document.createElement('h6');
    var txt=document.createTextNode('日期选择  ');
    h6.appendChild(txt);
    div.appendChild(h6);

    var ul=document.createElement('ul');
    ul.style.cssText='width:100%;over-flow:hidden; height:160px;padding-left:0;border-radius:4px;overflow:hidden;';
    //div.appenfChild(ul);
    var date=new Date();

    var doc=document.createDocumentFragment();
    var monnum=date.getMonth()+1;


    function makepannel(monnum) {
        switch(monnum){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12: makeday(31);break;

            case 2:makeday(29);break;
            case 4:
            case 6:
            case 9:
            case 11:makeday(30);break;
            default:break;

        }
        function makeday(argument) {
            for(var i=1;i<=argument;i++){

                var li=document.createElement('li');
                var dattxt=document.createTextNode(i)
                li.appendChild(dattxt);
                /*后期可以改成insertRule()*/
                li.style.cssText='list-style:none;float:left;width:40px;height:30px;background-color:#999999; text-align:center;line-height:30px;cursor:pointer;'
                doc.appendChild(li);
            }
            ul.appendChild(doc);
        }
    };
    makepannel(monnum);
    div.appendChild(ul);

    var button=document.createElement('button');
    button.setAttribute('class','btn btn-info');
    var btntxt=document.createTextNode('上个月');
    button.setAttribute('id','buttonlast');
    button.appendChild(btntxt);

    var button1=document.createElement('button');
    button1.setAttribute('class','btn btn-info');
    button1.setAttribute('id','buttonnext');
    button1.style.cssFloat='right';
    button1.style.stylefloat='right';
    var btntxt1=document.createTextNode('下个月');
    button1.appendChild(btntxt1);



    div.appendChild(button);
    div.appendChild(button1);

    var shawow=document.createElement("div");
    shawow.style.cssText="position:fixed;top:0;left:0;z-index:100;display:none;width:100%;background-color:#999999;opacity:0.7;";
    shawow.style.height=window.innerHeight+"px";

    document.body.appendChild(shawow);
    document.body.appendChild(div);



    /*事件控制部分*/
    //var datepanel=document.getElementById('datepanel').lastElementChild.ChildNodes;
    $("body").delegate('#datepanel ul li','click',function (e) {
        e.stopPropagation();
        e.cancelBubble=true;
        var day=$(this).text();
        var year=date.getFullYear();
        var val=year+'-'+monnum+'-'+day;
        //alert(val);
        $("#date").val(val);
        $("#datepanel h6").text('日期选择  '+val);

        $(this).parent().parent().prev().slideUp(10);
        $(this).parent().parent().fadeOut(10);

    });

    $("body").delegate('#datepanel ul li','mouseenter',function (e) {
        $(this).css('background-color','white');
    });
    $("body").delegate('#datepanel ul li','mouseleave',function (e) {
        $(this).css('background-color','#999999');
    });


    $("body").delegate('#buttonlast','click',function(){
        if(monnum==12){
            monnum=1;
        }else{
            monnum=monnum-1;
        }
        hdate();
        $("#datepanel ul").empty();
        makepannel(monnum);
    });
    $("body").delegate('#buttonnext','click',function(){
        if(monnum==12){
            monnum=1;
        }else{
            monnum=monnum+1;
        }
        hdate();
        $("#datepanel ul").empty();
        makepannel(monnum);
    });


    var inputs=document.getElementById('date');


    inputs.onfocus=function (e) {
        $('#datepanel').prev().slideDown(200);
        $('#datepanel').fadeIn();

        /*var pagex=e.pageX;
        var pagey=e.pageY;*/
        //console.log(pagex+pagey);
        //div.style.top=pagey+70+'px';
        /*div.style.left=pagex+60+'px';*/
    };
    /*inputs.onblur=function (argument) {
     $('#datepanel').fadeOut();
     };*/


    /*填充当前日期*/
    function hdate(){
        var day=date.getDate();
        var year=date.getFullYear();
        var val=year+'-'+monnum+'-'+day;
        $("#date").val(val);
        $("#datepanel h6").text('日期选择  '+val);
    };
    hdate();
});