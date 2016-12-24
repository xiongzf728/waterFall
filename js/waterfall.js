(function ($) {

  $.fn.WaterFall = function () {

    /*父容器*/
    var $this = $(this);
    /*父容器的宽度*/
    var parentWidth = $this.width();
    /*子容器*/
    var items = $this.children();
    /*子容器的宽度*/
    var childWidth = items.width();
    /*每行子元素个数*/
    var columnCount = 5;
    /*计算间距*/
    var space = (parentWidth - childWidth * columnCount) / (columnCount - 1);

    /*记录每一列的高度*/
    var columnHeightArray = [];

    /*遍历所有的子元素*/
    items.each(function (i, item) {
      /*当前元素*/
      var $item = $(item);
      /*高度*/
      var height = $item.height();

      /*确定第一排的定位*/
      if (i < columnCount) {
        //都是第一排
        $item.css({ top: 0, left: i * (childWidth + space) });
        //记录每一列的高度
        columnHeightArray[i] = height;
      }
      /*排列其他盒子*/
      else {
        //找到最矮的那一列
        var min = columnHeightArray[0];
        var minIndex = 0;
        $.each(columnHeightArray, function (j, column) {
          if (min > column) {
            min = column;
            minIndex = j;
          }
        });

        /*做定位*/
        $item.css({ top: min + space, left: minIndex * (childWidth + space) });

        //更新保存每列高度的数组
        columnHeightArray[minIndex] = min + space + height;
      }
    });

    // 计算最高列的高度
    var max = columnHeightArray[0];
    $.each(columnHeightArray, function (i, item) {
      if (max < item) {
        max = item;
      }
    });
    /*把当前父容器的高度设置成最高的那一列的高度*/
    $this.height(max);
  }
})(jQuery);
