/**
 * Created by j on 2017/11/2.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    })
    var currentPage=1;
    var pageSize=10;
    var data={
        proName:'',
        brandId:'',
        price:'',
        num:'',
        page:currentPage,
        pageSize:pageSize
    }
    function render(data){
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:data,
            success:function(data){
                setTimeout(function(){
                    $(".lt_product ul").html(template("tpl",data));
                },1000);
            }
        })
    }
    /*获取地址栏的参数设置到文本框*/
    var key=tools.getValue("key");
    $('.lt_search .search_text').val(key);


    /*需要发送ajax请求，去后端获取数据*/
    data.proName=key;
   /* []语法表示属性名的时候要用引号，表示变量的时候不用引号
    data["proName"]=key;*/
    render(data);


  /*点击搜索按钮*/
    $('.btn_search').on("click",function(){
        var key=$('.lt_search .search_text').val().trim();
        if(key===""){
            mui.alert("请输入要搜索的内容","温馨提示");
        }
        /*需要保证所有的now都清掉，并且所有的箭头都向下*/
        $(".lt_sort a").removeClass("now");
        $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        data.price='';
        data.num='';
        /*这一步是用来当点击搜索按钮还能重新显示loading的那个小方块*/
        $('.lt_product ul').html('<div class="loading"></div>');
       data.proName=key;
        render(data);
    })


    /*排序功能*/
    $('.lt_sort>a[data-type]').on('click',function(){
        /*如果当前有now  只要切换箭头类型*/
        /*如果当前没有now 给当前a标签加上now，并且清除其他标签的now类和将所有箭头向下*/
        var $this=$(this);
        var $span=$this.find("span");
        if($this.hasClass('now')){
            $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else{
            $this.addClass("now").siblings().removeClass("now");
            $('.lt_sort a').find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        var type=$this.data("type");
        var value=$span.hasClass("fa-angle-down")?2:1;
        //设置num或者price ，在这之前需要保证之前的清空
        data.price='';
        data.num='';
        data[type]=value;
        render(data);
    })
});