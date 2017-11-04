/**
 * Created by j on 2017/11/4.
 */
$(function(){
    mui(".mui-scroll-wrapper").scroll({
        indicators:false
    });
    /*下拉刷新*/
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                callback:function(){
                    $.ajax({
                        type:"get",
                        url:"/cart/queryCart",
                        success:function(data){
                            setTimeout(function(){
                                tools.checkLogin(data);
                                $('#OA_task_2').html(template("tpl",{data:data}));
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            },1000);
                        }
                    });
                }
            }
        }
    });

    /*删除一条记录*/
    $("#OA_task_2").on("tap",".lt_cart_delete",function(){
        var id=$(this).data("id");
        $.ajax({
            type:"get",
            url:"/cart/deleteCart",
            data:{
                id:[id]
            },
            success:function(data){
                tools.checkLogin(data);
                if(data.success){
                   /*成功之后,下拉刷新一次*/
                    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                }
            }
        })
    })
});