/**
 * Created by Administrator on 2015/8/13 0013.
 */
window.onload= function () {
    var gl={
        uploadimg:document.getElementById('uploadimg').firstElementChild.nextElementSibling,
        upbox:document.getElementById('upbox').firstElementChild,
        uploadbtn:document.getElementById('uploadbtn'),
        upboxbtn:document.getElementById('upboxbtn')
    };

    /*上传文件*/
    gl.uploadimg.onclick= function () {
        gl.upbox.click();
    };
    gl.uploadbtn.onclick=function(){
    	gl.upboxbtn.click();
    }
    
    


};