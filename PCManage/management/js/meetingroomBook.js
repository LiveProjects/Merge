/**
 * Created by Administrator on 2015/8/19 0019.
 */
window.onload= function () {
    var gl={
        meetingroomBookbtn:document.getElementById('meetingroomBookbtn')
    };
    meetingroomBookbtn.onclick=function(){
        var dateval=this.previousElementSibling.value;
        //alert(input);
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
    }
};