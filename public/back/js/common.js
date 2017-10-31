$(function(){
    /*检测是否登录*/
    if(location.href.indexOf("login.html")<0){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function(data){
               if(data.error===400){
                   location.href="login.html";
               }
            }
        })
    };


    /*进度条*/
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },500);
    });

    /*侧边栏显示和隐藏*/
    var $icon_menu=$('.icon_menu');
    $icon_menu.on('click',function(){
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
        $('.lt_header').toggleClass('now');
    })


    /*二级列表显示*/
    var $child=$('.child');
    $child.prev().on('click',function(){
        $child.slideToggle();
    })


    /*退出登录*/
    var $icon_logout=$('.icon_logout');
    $icon_logout.on('click',function(){
        $('#myModal').modal('show');
    });
    $('.btn_logout').on('click',function(){
        $.ajax({
            url:'/employee/employeeLogout',
            type:'get',
            success:function(data){
                if(data.success){
                    window.location.href="login.html";
                }
            }
        });
    })

});