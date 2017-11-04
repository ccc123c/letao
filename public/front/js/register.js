/**
 * Created by j on 2017/11/4.
 */
$(function(){
    /*获取验证码*/
    $('.btn_getcode').on("click",function(){
        var $this=$(this);
        /*判断是否有disabled这个类,如果有,则不往下做处理了*/
        if($this.hasClass("disabled")){
            return false;
        }
        $this.addClass("disabled").html("正在发送中...");
        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function(data){
                console.log(data.vCode);
                var num=60;
                var timer=setInterval(function(){
                    num--;
                    $this.html(num+"秒后再次发送");
                    if(num<=0){
                        $this.removeClass("disabled").html("再次发送");
                        clearInterval(timer);
                    }
                },1000);
            }

        })

    })

    /*手机注册功能*/
    $('.btn_register').on('click',function () {
        console.log(2);
        var username=$('[name=username]').val();
        var password=$('[name=password]').val();
        var repassword=$('[name=repassword]').val();
        var mobile=$('[name=mobile]').val();
        var vCode=$('[name=vCode]').val();
        if(!username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!password){
            mui.toast("请输入密码");
            return false;
        }
        if(!repassword){
            mui.toast("请输入确认密码");
            return false;
        }
        if(password!=repassword){
            mui.toast("确认密码与密码不一致");
            return false;
        }
        if(!vCode){
            mui.toast("请输入验证码");
        }
        if(!/^\d{6}$/.test(vCode)){
            mui.toast("请输入有效的验证码");
            return false;
        }
        if(!mobile){
            mui.toast("请输入手机号");
        }
        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast("请输入有效手机号");
            return false;
        }
        /*发送ajax请求*/
        $.ajax({
            type:'post',
            url:'/user/register',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function(data){
                if(data.success){
                    location.href="login.html";
                }else{
                    mui.toast(data.message);
                }
            }
        })
    })
})