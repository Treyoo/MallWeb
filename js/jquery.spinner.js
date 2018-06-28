/* ==============================================================================
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
;(function ($) {
  $.fn.spinner = function (itemID,name,num) {
    // alert(name);
    //return this.each(function () {
      var defaults = {value:num, min:1}
      var options = $.extend(defaults, name)
      var keyCodes = {up:38, down:40}
      var container = $('<div></div>')
      container.addClass('spinner')
      var textField = $(this).addClass('value').attr('maxlength', '2').val(options.value)
        .bind('keyup paste change', function (e) {
          var field = $(this)
          if (e.keyCode == keyCodes.up){
              changeNum(name,1);
          }
          else if (e.keyCode == keyCodes.down){
              if(this.value>1){//大于1才可以减小
                changeNum(name,-1);
              }
          }
          else if (getValue(field) != container.data('lastValidValue')){
              validateAndTrigger(field);
          }
        })
      textField.wrap(container)

      var increaseButton = $('<button class="increase">+</button>').click(function () {
          changeNum(name,1);
      })
      var decreaseButton = $('<button class="decrease">-</button>').click(function () {
          changeNum(name,-1);
      })

      validate(textField)
      container.data('lastValidValue', options.value)
      textField.before(decreaseButton)
      textField.after(increaseButton)

      /*修改购物车商品数量（自加函数）*/
      function changeNum(name,delta) {
          changeValue(delta);
          //修改localStorage
          var goodInfo=localStorage.getItem(name);
          var obj=$.parseJSON(goodInfo);
          var goodImg=obj.goodImg;
          var goodDescr=obj.goodDescr;
          var goodPrice=obj.goodPrice;
          var goodNum=obj.goodNum+delta;
          //移除
          localStorage.removeItem(name);
          // 将商品信息重新封装成json数据存储到localStorage
          var goodInfo={
              "goodImg":goodImg,
              "goodDescr":goodDescr,
              "goodPrice":goodPrice,
              "goodNum":goodNum
          }
          var goodInfoStr=JSON.stringify(goodInfo);
          localStorage.setItem(name,goodInfoStr);

          //计算合计价格
          $("#"+itemID).find(".cart_itemTotal").text("合计￥"+goodPrice*goodNum);
      }

      function changeValue(delta) {
        textField.val(getValue() + delta)
        validateAndTrigger(textField)
      }

      function validateAndTrigger(field) {
        clearTimeout(container.data('timeout'))
        var value = validate(field)
        if (!isInvalid(value)) {
          textField.trigger('update', [field, value]);
        }
      }

      function validate(field) {
        var value = getValue()
        if (value <= options.min) decreaseButton.attr('disabled', 'disabled')
        else decreaseButton.removeAttr('disabled')
        field.toggleClass('invalid', isInvalid(value)).toggleClass('passive', value === 0)

        if (isInvalid(value)) {
          var timeout = setTimeout(function () {
            textField.val(container.data('lastValidValue'))
            validate(field)
          }, 500)
          container.data('timeout', timeout)
        } else {
          container.data('lastValidValue', value)
        }
        return value
      }

      function isInvalid(value) { return isNaN(+value) || value < options.min; }

      function getValue(field) {
        field = field || textField;
        return parseInt(field.val() || 0, 10)
      }
    //})
  }
})(jQuery)
