//获取广告数据
function loadAd() {
    /*无法跨域访问？
            $.ajax({
                    url:'http://yunxtec.com/test/adlist.json',
                    dataType:'jsonp',
                    //crossDomain:true,
                    jsonpCallback:"",
                    success:function (data) {
                        alert("jsonp OK!");
                    }
                }
            );*/
    $.ajax({
            url:"http://yunxtec.com/test/adlist.php",
            dataType:"json",
            success:function (data) {
                //添加第一个广告
                $("#ad").append("<div class='item active'>" +
                    "<a href='"+data.adlist[0].url+"'>" +
                    "   <img calss='img-responsive' src='"+data.adlist[0].img+"'/></a></div>");
                $("#indicators").append("<li data-targer='#myCarousel' data-slide-to='0',class='activer'></li>");
                //添加后续广告
                for(var i=1;i<data.adlist.length;i++){
                    $("#ad").append("<div class='item'>" +
                        "<a href='"+data.adlist[i].url+"'>" +
                        "<img calss='img-responsive' src='"+data.adlist[i].img+"'/></a></div>");
                    $("#indicators").append("<li data-targer='#myCarousel' data-slide-to="+i+"></li>");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("获取广告数据错误！"+
                    "\nXMLHttpRequest.status:"+XMLHttpRequest.status +
                    "\nXMLHttpRequest.readyState:"+XMLHttpRequest.readyState+
                    "\ntextStatus:"+textStatus);
            }
        }
    );
}

//获取今日优惠数据
function loadDiscount () {
    $.ajax({
            url:"http://yunxtec.com/test/discount.php",
            dataType:"json",
            success:function (data) {
                //添加优惠商品
                for(var i=0;i<data.discount.length;i++){
                    var goods=data.discount[i].goods;
                    var descr=data.discount[i].descr;
                    var img=data.discount[i].img;
                    var url=data.discount[i].url;
                    var price=data.discount[i].price;
                    var dprice=data.discount[i].dprice;
                    var item="<a href="+url+">" +
                        "<div class=\"row\">\n" +
                        "            <div class=\"col-xs-4 col-sm-4 col-md-4\"><img src='"+img+"' class=\"img-responsive\"></div>\n" +
                        "            <div class=\"col-xs-8 col-sm-8 col-md-8 discountText\">\n" +
                        "                <div class=\"row\">\n" +
                        "                    <div class=\"col-xs-12 col-sm-12 col-md-12\">"+goods+"</div>\n" +
                        "                </div>\n" +
                        "                <div class=\"row\">\n" +
                        "                    <div class=\"col-xs-12 col-sm-12 col-md-12 descr\">"+descr+"</div>\n" +
                        "                </div>\n" +
                        "                <div class=\"row\">\n" +
                        "                   <div class=\"col-xs-6 col-sm-6 col-md-6 price\">￥"+price+"</div>\n" +
                        "                   <div class=\"col-xs-6 col-sm-6 col-md-6 dprice\">￥"+dprice+"</div>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>" +
                        "</a>";
                    $("#discount").append(item);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("获取优惠数据错误！"+
                    "\nXMLHttpRequest.status:"+XMLHttpRequest.status +
                    "\nXMLHttpRequest.readyState:"+XMLHttpRequest.readyState+
                    "\ntextStatus:"+textStatus);
            }
        }
    );
}