$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false
    });


    /*读取localStorage中的数据*/
    function getSearchHistory(){
        var search_history=localStorage.getItem('lt_search_history');
        var searchArray=JSON.parse(search_history);
        return searchArray;
    }


    /*渲染搜索列表*/
    function render(){
        var arr=getSearchHistory();
        $('.lt_history ul').html(template("tpl",{arr:arr}));
    }
    render();


    /*点击清空记录按钮，清空搜索列表*/
    $('.fa-trash').on('click',function(){
        localStorage.removeItem("lt_search_history");
        render();
    })


    /*点击叉号，删除这条记录*/
    $(".lt_history").on("click",".icon_empty",function(){
        var btnArray=["是","否"];
        var index=$(this).data("index");
        mui.confirm("您确定删除这条搜索记录吗","温馨提示",btnArray,function(data){
            if(data.index==0){
                var arr=getSearchHistory();
                arr.splice(index,1);
                localStorage.setItem("lt_search_history",JSON.stringify(arr));
                render();
            }
        });
    })

    /*添加搜索记录*/
    $(".btn_search").on("click",function(){
        var $search_text=$(".search_text ");
        var value=$search_text.val().trim();
        if(value.length===0){
            mui.alert("请输入搜索内容","温馨提示");
        }
        /*先判断是否搜索记录中已经存在，存在就删除那一条，并把值添加到最上面*/
        /*如果数组长度大于10，就删除最后一条，然后把当前条加入到第一条*/
        var arr=getSearchHistory();
        var index=arr.indexOf(value);
        if(index>-1){
            arr.splice(index,1);
        }
        if(arr.length>=10){
            arr.pop();
        }
        arr.unshift(value);
        localStorage.setItem("lt_search_history",JSON.stringify(arr));
        location.href="searchList.html?key="+value;
    })
});

