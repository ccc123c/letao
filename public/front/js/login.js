/**
 * Created by j on 2017/11/4.
 */
$(function(){
    $('.btn_login').on("click",function(){
        var username=$('[name=username]').val();
        var password=$('[name=password]').val();
        if(!username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!password){
            mui.toast("请输入密码");
            return false;
        }
        $.ajax({
            type:"post",
            url:"/user/login",
            data:{
                username:username,
                password:password
            },
            success:function(data){
                if(data.error===403){
                    mui.toast(data.message);
                }else{
                    /*判断传过来的地址中是否有retUrl有就转到retUrl所指向的地址，没有就转到user.html*/
                    /*?retUrl=http://localhost:3000/front/product.html?productId=1*/
                    var search=location.search;
                    if(search.indexOf("retUrl")>-1){
                        location.href=search.replace("?retUrl=","");
                    }else{
                        location.href="user.html";
                    }
                }
            }
        })

    })
})