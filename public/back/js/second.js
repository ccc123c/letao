$(function(){
    var pageSize=10;
    var currentPage=1;
    var $form=$('#form');
    function render(){
       $.ajax({
           url:"/category/querySecondCategoryPaging",
           type:"get",
           data:{
               page:currentPage,
               pageSize:pageSize
           },
           success:function(data){
               $('tbody').html(template('tpl',data));
               $('#pagintor').bootstrapPaginator({
                   bootstrapMajorVersion:3,
                   size:"small",
                   totalPages:Math.ceil(data.total/pageSize),
                   onPageClicked:function(a,b,c,page){
                       currentPage=page;
                       render();
                   }
               })
           }
       })
   }
    render();
    $('.btn_brand').on('click',function(){
        $('#addModal').modal("show");
    })

    /*显示一级分类的所有项的值*/
    $('.btn_first').on('click',function(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                pageSize:pageSize,
                page:currentPage
            },
            success:function(data){
                $('.dropdown-menu').html(template('tp2',data));
            }
        })
    })


    /*点击下拉框让某个值选中*/
    $('.dropdown-menu').on('click','a',function(){
        $('.dropdown-text').text($(this).text());
        $("#categoryId").val($(this).data("id"));
        $("#form").data('bootstrapValidator').updateStatus("categoryId","VALID")
    })

    /*上传图片并显示在模态框上*/
    $("#fileupload").fileupload({
        dataType:'json',
        done:function(e,data){
          $(".img_box img").attr("src",data.result.picAddr);
          $("#brandLogo").val(data.result.picAddr);
          $("#form").data('bootstrapValidator').updateStatus("brandLogo","VALID")
        }
    })


    /*验证表单*/
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传图片"
                    }
                }
            }
        }
    })

    /*表单验证成功后触发事件*/
    $form.on("success.form.bv",function(e){
        // console.log($form.serialize());
        e.preventDefault();
            $.ajax({
            type:"post",
            data:$form.serialize(),
            url:"/category/addSecondCategory",
            success:function(data){
                if(data.success){
                    $('#addModal').modal("hide");
                    currentPage=1;
                    render();
                    $("#form").data('bootstrapValidator').resetForm();
                    $("#form")[0].reset();
                    $(".dropdown-text").val("请选择一级分类");
                    $(".img_box img").attr("src","images/none.png");
                }
            }
        })
    })

});