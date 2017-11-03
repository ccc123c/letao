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
