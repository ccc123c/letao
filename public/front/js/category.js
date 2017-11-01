$(function(){
    var sc=mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategory",
            success:function(data){
                $(".lt_content_l ul").html(template("tpl",data));
                getSecond(data.rows[0].id);
            }
        })
    }
    render();
    function getSecond(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            success:function(data){
                $(".lt_content_r ul").html(template("tp2",data));
            }
        })
    }

    var $ul=$('.lt_content_l ul');
    $ul.on("click","li",function(){
        id=$(this).data("id");
        getSecond(id);
        $(this).addClass("now").siblings().removeClass("now");
        sc[1].scrollTo(0,0,500);
    })

});
