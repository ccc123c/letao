/**
 * Created by j on 2017/11/2.
 */
$(function(){
    var tools= {
        getUrl: function () {
            var url = decodeURI(location.search);
            url = url.slice(1);
            var arr = url.split("&");
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                var key = arr[i].split("=")[0];
                var value = arr[i].split("=")[1];
                obj[key] = value;
            }
            return obj;
        },
        getValue: function (name) {
            return this.getUrl()[name];
        }
    }

    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    })
    var key=tools.getValue("key");
    $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:{
            proName:key,
            page: 1,
            pageSize: 30
        },
        success:function(data){
            console.log(data);
            $(".lt_product ul").html(template("tpl",data));
        }
    })
});