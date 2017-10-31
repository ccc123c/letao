$(function(){
    var currentPage=1;
    var pageSize=3;
    var $form=$("#form");
    render();
   function render(){
       $.ajax({
           type:"get",
           url:"/category/queryTopCategoryPaging",
           data:{
               page:currentPage,
               pageSize:pageSize
           },
           success:function(data){
               $('tbody').html(template('tpl',data));
               $('#pagintor').bootstrapPaginator({
                   bootstrapMajorVersion:3,
                   currentPage:currentPage,
                   totalPages:Math.ceil(data.total/pageSize),
                   size:"small",
                   onPageClicked:function(a,b,c,page){
                       currentPage=page;
                       render();
                   }
               })
           }
       });

   }
    $('.btn_category').on('click',function(){
        $('#addModal').modal("show"); 

    })

    /*表单验证*/
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类不能为空"
                    }
                }
            }
        }
    });
    $form.on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function(data){
                if(data.success){
                    currentPage=1;
                    render();
                    $('#addModal').modal("hide");
                    /*重置表单*/
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                }
            }
        })
    })
})
