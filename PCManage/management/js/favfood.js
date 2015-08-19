/**
 * Created by Administrator on 2015/8/13 0013.
 */
window.onload= function () {
    var gl={
        uploadimg:document.getElementById('uploadimg').firstElementChild.nextElementSibling,
        upbox:document.getElementById('upbox').firstElementChild,
        uploadbtn:document.getElementById('uploadbtn'),
        upboxbtn:document.getElementById('upboxbtn'),
        caiming:document.getElementById('caiming'),
        jiehsao:document.getElementById('jiehsao'),
        dishname:document.getElementById('dishname'),
        favCon:document.getElementById('favCon')
    };

    /*上传文件*/
    gl.uploadimg.onclick= function () {
        gl.upbox.click();
    };
    gl.uploadbtn.onclick=function(){
    	
    	
    	var name=$("dishname").val();
    	var dishintro=$("favCon").val();
    	
    	if(gl.dishname.value!=''&&gl.favCon!=''){
    		gl.caiming.value=gl.dishname.value;
    		gl.jiehsao.value=gl.favCon.value;
    		
    		//alert(gl.caiming.value+gl.jiehsao.value);
    	}else{
    		alert("请检查空项");
    	}
    	
    	//ajax方法不行
    	/*$.ajax({
    		url:'../management/php/get/upload.php',
    		Type:'POST',
    		dataType:'json',
    		data:{
    			'name':name,
    			'dishintro':dishintro
    		},
    		success:function(data){
    			alert(data);
    			if(data==1){
    				alert("上传成功");
    			}
    		},
    		error:function(err){
    			console.log(err);
    		}
    	})*/
    	gl.upboxbtn.click();
    	
    }


};