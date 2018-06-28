//获取商品数据
function loadGoodsList() {
    $.ajax({
            url:"http://yunxtec.com/test/goodslist.php",
            dataType:"json",
            success:function (data) {
                //添加商品信息
                for(var i=0;i<data.goodslist.length;i++){
                    var goods=data.goodslist[i].goods;
                    var descr=data.goodslist[i].descr;
                    var img=data.goodslist[i].img;
                    var url=data.goodslist[i].url;
                    var price=data.goodslist[i].price;
                    var item="<div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
                        "                <a href=\""+url+"\" style=\"color: black\">\n" +
                        "                    <div class=\"thumbnail\">\n" +
                        "                        <img src=\""+img+"\" class=\"img-responsive\"/>\n" +
                        "                        <div class=\"caption\">\n" +
                        "                            <div><h5>"+goods+"</h5></div>\n" +
                        "                               <div hidden>"+descr+"</div>"+
                        "                            <div class=\"row\">\n" +
                        "                                <div class=\"col-xs-6 col-sm-6 col-md-6\"" +
                        "                                   style=\"color: red;\">￥"+price+"</div>\n" +
                        "                                <div class=\"col-xs-6 col-sm-6 col-md-6\" align=\"end\">\n" +
                        "                                    <a href=\"javascript:void(0);\" class=\"btn glyphicon glyphicon-plus-sign\"\n" +
                        "                                    onclick=\"addToCart('"+goods+"','"+img+"','"+descr+"','"+price+"')" +
                        "                                       \" style=\"color: red;\"></a>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                </a>\n" +
                        "            </div>";
                    $("#goodslist").append(item);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("获取商品数据错误！"+
                    "\nXMLHttpRequest.status:"+XMLHttpRequest.status +
                    "\nXMLHttpRequest.readyState:"+XMLHttpRequest.readyState+
                    "\ntextStatus:"+textStatus);
            }
        }
    );
}

//将商品加入购物车
function addToCart(goods,img,descr,price) {
    if(window.localStorage=='undefined') {
        alert("浏览器不支持localStorage！");
        return;
    }
    // 将商品信息封装成json数据存储到localStorage
    var goodInfo={
        "goodImg":img,
        "goodDescr":descr,
        "goodPrice":price,
        "goodNum":1
    }
    var goodInfoStr=JSON.stringify(goodInfo);
    for(var i=0;i<localStorage.length;i++){
        if(localStorage.key(i)==goods){
            alert("该商品已经在购物车里啦！");
            return;
        }
    }
    localStorage.setItem(goods,goodInfoStr);
    alert(goods+" 加入购物车成功！");
}