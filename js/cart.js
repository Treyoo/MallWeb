//加载购物车数据
function loadCart() {
    //先判断购物车是否为空
    if(localStorage.length<=0){
        $("#cart").html("<h1 align='center' style='padding-top: 300px'>购物车里空空如也</h1>");
        return;
    }
    var count=0;
    //遍历localStorage
    for (var i=0;i<localStorage.length;i++){
        var goodName=localStorage.key(i);
        var goodInfo=localStorage.getItem(goodName);
        var obj=$.parseJSON(goodInfo);
        var goodImg=obj.goodImg;
        var goodDescr=obj.goodDescr;
        var goodPrice=obj.goodPrice;
        var goodNum=obj.goodNum;
        var itemID="cartItem"+count++;
        var item="<div id=\""+itemID+"\">\n" +
            "<div class=\"row\">\n" +
            "     <div class=\"col-xs-4 col-sm-4 col-md-4\"><img src=\""+goodImg+"\" class=\"img-responsive\"></div>\n" +
            "     <div class=\"col-xs-8 col-sm-8 col-md-8\" style=\"line-height:200%\">\n" +
            "         <div class=\"row\">\n" +
            "             <div class=\"col-xs-12 col-sm-12 col-md-12\">"+goodName+"</div>\n" +
            "         </div>\n" +
            "         <div class=\"row\">\n" +
            "             <div class=\"col-xs-12 col-sm-12 col-md-12 cart_descr\">"+goodDescr+"</div>\n" +
            "         </div>\n" +
            "         <div class=\"row\">\n" +
            "             <div class=\"col-xs-6 col-sm-6 col-md-6 cart_price\">"+goodPrice+"</div>\n" +
            "             <div class=\"col-xs-6 col-sm-6 col-md-6 cart_itemTotal\">合计￥"+goodPrice*goodNum+"</div>\n" +
            "         </div>\n" +
            "         <div class=\"row\">\n" +
            "             <div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
            "                 <input type=\"text\" class=\"spinner\" disabled/>\n" +
            "             </div>\n" +
            "             <div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
            "                 <a class=\"btn\" onclick=\"removeFromCart('"+goodName+"','"+itemID+"')\" style=\"color: black\">" +
            "                    <span class=\"glyphicon glyphicon-trash\"></span></a>\n" +
            "             </div>\n" +
            "         </div>\n" +
            "     </div>\n" +
            "</div>\n" +
            "<hr/>\n"+
            "</div>";
        $("#cart").append(item);
        $('.spinner').last().spinner(itemID,goodName,goodNum);
    }
    $("#cart").append("<div class=\"row\" align=\"right\" style=\"padding-bottom: 60px\">\n" +
        "                <button class=\"btn btn-primary btn-lg\" onclick=\"alert('您的订单被妖怪吃了！');\">提交</button>\n" +
        "            </div>");
}

//将商品从购物车移除
function removeFromCart(goodName,itemID){
    if(!confirm("将该商品从购物车移除？")){
        return;
    }
    localStorage.removeItem(goodName);
    $("#"+itemID).remove();
}