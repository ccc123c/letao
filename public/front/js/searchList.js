/**
 * Created by j on 2017/11/2.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    })
    var currentPage=1;
    var pageSize=10;
    /*获取地址栏的参数设置到文本框*/
    var key=tools.getValue("key");
    $('.lt_search .search_text').val(key);


    /*需要发送ajax请求，去后端获取数据*/
    $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:{
            proName:key,
            page: currentPage,
            pageSize: pageSize
        },
        success:function(data){
            setTimeout(function(){
                $(".lt_product ul").html(template("tpl",data));
            },1000);
        }
    })


  /*点击搜索按钮*/
    $('.btn_search').on("click",function(){
        var key=$('.lt_search .search_text').val().trim();
        if(key===""){
            mui.alert("请输入要搜索的内容","温馨提示");
        }
        /*这一步是用来当点击搜索按钮还能重新显示loading的那个小方块*/
        $('.lt_product ul').html('<div class="loading"></div>');
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:{
                proName:key,
                page: currentPage,
                pageSize: pageSize
            },
            success:function(data){
              setTimeout(function(){
                  $(".lt_product ul").html(template("tpl",data));

              },1000);

            }
        })

    })
});