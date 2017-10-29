$(function(){
    var $form=$('#form');
    var $reset=$("[type='reset']");
    $form.bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    callback:{
                        message:'用户名错误'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    callback:{
                        message:'用户密码错误'
                    },
                    stringLength:{
                        min:6,
                        max:30,
                        message:'密码必须在6-12位'
                    }
                }
            }
        }
    })
    /*获取表单校验实例*/
    var validator=$form.data('bootstrapValidator');
    /*注册表单校验成功事件*/
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            success:function(data){
                if(data.success){
                    location.href="index.html"
                }else{
                    if(data.error===1000){
                        validator.updateStatus("username","INVALID","callback")
                    }
                    if(data.error===1001){
                        validators.updateStatus("password","INVALID","callback")
                    }
                }
            }
        })
    })
    /*重置按钮功能*/
    $reset.on('click',function(){
        validator.resetForm();
    })
});