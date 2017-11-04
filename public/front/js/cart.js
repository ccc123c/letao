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
                            // console.log(data);
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
        mui.confirm("确定删除吗?","温馨提示",["是","否"],function(e){
            if(e.index===0){
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
            }
        })

    })
    
    /*编辑记录*/
    $("#OA_task_2").on("tap",".lt_cart_edit",function(){
        var data=this.dataset;
        console.log(data);
        var html=template("tp2",data);
        html=html.replace(/\n/g,"");/*去除空格换行*/
        /*编辑商品*/
        mui.confirm(html,"编辑商品",["确定","取消"],function(e){
            if(e.index===0){
                $.ajax({
                    type:"post",
                    url:"/cart/updateCart",
                    data:{
                        id:data.id,
                        size:$('.lt_cart_size .size').html(),
                        num:$('.mui-numbox-input').val()
                    },
                    success:function(data){
                        tools.checkLogin(data);
                        if(data.success){
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })
        /*修改尺码*/
        $(".lt_cart_size .size").on("click",function(){
            $(this).addClass("now").siblings().removeClass("now");
        })
        /*修改数量*/
        mui(".mui-numbox").numbox();
    })

    /*计算订单总金额*/
    $("#OA_task_2").on("change",".ck",function(){
        var total=0;
        $(":checked").each(function(i,e){
            total+=$(this).data("num")*$(this).data("price");
        })
        $(".lt_cart_total .price").html(total);
    })

});