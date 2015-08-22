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
        //alert(gl.upbox.value);
    };

    function createObjectURL(blob) {
        if(window.URL){
            return window.URL.createObjectURL(blob);
        }else if(window.webkitURL){
            return window.webkitURL.createObjectURL(blob);
        }else{
            return;
        }
    };
    if(typeof FileReader==='undefined'){
        result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
        input.setAttribute('disabled','disabled');
    }else{
        gl.upbox.addEventListener('change',function(){
            var file = this.files[0];
            if(!/image\/\w+/.test(file.type)){
                alert("文件必须为图片！");
                return false;
            };
            var reader = new FileReader();
            reader.readAsDataURL(file);
            //console.log(reader);
            reader.onload = function(e){
                //result.innerHTML = '<img src="'+this.result+'" alt=""/>'
                gl.uploadimg.setAttribute('src',this.result);
            };

        },false);
    }

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