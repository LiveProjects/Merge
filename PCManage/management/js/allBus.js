/**
 * Created by Administrator on 2015/8/12 0012.
 */
window.onload=function(){
    $("#allBusmain ul").delegate('li','click',function(){
        var index=$(this).index();
        $("#allBusmain ol li").eq(index).show();
        $("#allBusmain ol li").eq(index).siblings().hide();
    })
};