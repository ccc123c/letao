$(function(){
    var currentPage=1;
    var pageSize=8;
    var $form=$('#form');
    var picArr=[];
   function render(){
       $.ajax({
           type:"get",
           url:"/product/queryProductDetailList",
           data:{
               page:currentPage,
               pageSize:pageSize
           },
           success:function(data){
               $("tbody").html(template("tpl",data));
               $("#pagintor").bootstrapPaginator({
                   bootstrapMajorVersion:3,
                   size:"small",
                   totalPages:Math.ceil(data.total/pageSize),
                   currentPage:currentPage,
                   onPageClicked(a,b,c,page){
                       currentPage=page;
                       render();
                   }
               })
           }
       })
   }
    render();
    $(".btn_product").on('click',function(){
        $("#addModal").modal("show");
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:20
            },
            success:function(data){
                $(".dropdown-menu").html(template("tp2",data));
            }
        })
    })
    $(".dropdown-menu").on("click","a",function(){
        $('.dropdown-text').text($(this).text());
        $("#brandId").val($(this).data("id"));
        $form.data('bootstrapValidator').updateStatus("brandId","VALID")
    })
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"商品库存不能为空"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"请输入一个大于0的数"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"商品尺寸不能为空"
                    },
                    regexp:{
                        //33-55
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入正确的尺码（30-50）"
                    }
                }

            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品折扣价"
                    }
                }
            },
            productLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传3张图片"
                    }
                }
            }
        }
    })
    $("#fileupload").fileupload({
        dataType:"json",
        done:function(e,data){
            picArr.push(data.result);
            $(".img_box").append('<img width="100px" height="100px" src="'+data.result.picAddr+'">');
            if(picArr.length===3){
                $form.data("bootstrapValidator").updateStatus("productLogo","VALID");
            }else{
                $form.data("bootstrapValidator").updateStatus("productLogo","INVALID");

            }
        }
    })
    $form.on("success.form.bv",function(e){
        e.preventDefault();
  /*      var param = $form.serialize();
        还需要拼接3张图片的地址
        param += "&picName1="+imgArray[0].picName+"&picAddr1="+imgArray[0].picAddr;
        param += "&picName2="+imgArray[1].picName+"&picAddr2="+imgArray[1].picAddr;
        param += "&picName3="+imgArray[2].picName+"&picAddr3="+imgArray[2].picAddr;*/
       $.ajax({
           type:"post",
           url:"/product/addProduct",
           data:$form.serialize(),
           success:function(data){
               if(data.success){
                   $("#addModal").modal("hide");
                   currentPage=1;
                   render();
                   /*初始化模态框*/
                   $form.data("bootstrapValidator").resetForm();
                   $form[0].reset();
                   $('.dropdown-text').text("请选择二级分类");
                   $(".img_box img").remove();
                   picArr=[];
               }
           }
       })
    })
})