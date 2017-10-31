$(function(){
    var currentPage=1;
    var pageSize=5;
    $.ajax({
        type:"get",
        url:"/product/queryProductDetailList",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function(data){
            $("tbody").html(template("tpl",data));
        }
    })
})