$(function(){
    var currentPage=1;
    var pageSize=5;
    var id=0;
    var isDelete=0;
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                var html =template('tpl',data);
                $('tbody').html(html);

                //分页功能
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(data.total/pageSize),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage=page;
                        render();
                    }
                });
            }
        })
    }
    $('tbody').on("click",".btn",function(){
        id=$(this).parent().data('id');
        isDelete=$(this).parent().data('isDelete');
        $("#userModal").modal("show");
    })

    $('.btn_confirm').on('click',function(){
        isDelete=isDelete===1?0:1;
        $("#userModal").modal("hide");
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(data){
                if(data.success){
                    render();
                }
            }
        })
    })

});