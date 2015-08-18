/**
 * Created by Administrator on 2015/8/15 0015.
 */
window.onload=function(){
    function addalert() {
        var div=
            "<div id='warning' class='alert alert-warning alert-dismissible col-md-4 col-sm-4 col-xs-4 navbar-fixed-top container-fluid hidden' role='alert'>"+
            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+
            "<strong>Warning!</strong> Better check yourself, you're not looking too good."+
            "</div>;";

        var txt=document.createTextNode(div);
        document.appendChild(div);
    };
};