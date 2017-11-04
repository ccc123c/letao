/**
 * Created by j on 2017/11/3.
 */
//获得slider插件对象
 $(function(){
     
     mui('.mui-scroll-wrapper').scroll({
         indicators:false
     })


     /*发送ajax请求，获取后台数据*/
     var productId=tools.getValue("productId");
     $.ajax({
        type:"get",
         url:"/product/queryProductDetail",
         data:{
             id:productId
         },
         success:function(data){
             $('.mui-scroll').html(template("tpl",data));
             /*轮播图要渲染之后初始化*/
             var gallery = mui('.mui-slider');
             gallery.slider({
                 interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
             });
             mui('.mui-numbox').numbox();
         }
     })

     /*点击尺码选中*/
     $('.mui-scroll').on("click",".size",function(){
         $(this).addClass("now").siblings().removeClass("now");
     })


     /*加入购物车功能*/
     $('.btn_add_cart').on("click",function(){
         var size=$(".size.now").html();
         var num=$('.mui-numbox-input').val();
         if(!size){
             mui.toast("请选择尺码");
             return;
         }
         /*发送ajax请求*/
         $.ajax({
             type:'post',
             url:'/cart/addCart',
             data:{
                 productId:productId,
                 num:num,
                 size:size
             },
             success:function(data){
                 if(data.error===400){
                     location.href="login.html?retUrl="+location.href;
                 }
                 if(data.success){
                     mui.toast("添加成功");
                 }
             }
         })
     })
 })