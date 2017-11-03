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
             console.log(data);
             $('.mui-scroll').html(template("tpl",data));
             /*轮播图要渲染之后初始化*/
             var gallery = mui('.mui-slider');
             gallery.slider({
                 interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
             });
             mui('.mui-numbox').numbox();
         }
     })
 })