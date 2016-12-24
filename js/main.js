$(function () {
  /*瀑布流容器*/
  var $items = $('.items');
  /*加载按钮*/
  var $btn = $('.btn');

  /*获取数据并渲染到页面中*/
  var renderHtml = function () {
    $.ajax({
      type: 'get',
      url: 'data.php',
      dataType: 'json',
      data: {
        page: $btn.data('page') || 1,
        /*默认加载第一页*/
        pageSize: 30 /*条数10条*/
      },
      beforeSend: function () {
        $btn.addClass('loading').html('正在加载中...');
      },
      success: function (data) {
        /*把数据解析成html结构利用模板引擎渲染在页面当中*/
        var html = template('items_template', {
          model: data
        });
        $items.append(html);
        /*插件初始化*/
        $items.WaterFall();

        /*渲染完成之后*/
        if (!data.items.length) {
          /*当数据没有的时候，不能再请求的，提示没有更多数据*/
          $btn.addClass('loading').html('没有更多数据');
        } else {
          $btn.removeClass('loading').html('加载更多');
        }

        /*把下一页开始的page保存到jq对象中*/
        $btn.data('page', data.page);
      }
    });
  };

  /*初始化第一页数据*/
  renderHtml();

  /*加载更多按钮点击事件*/
  $btn.on('click', function () {
    /*点击的时候防止重复提交*/
    if ($btn.hasClass('loading')) {
      return false;
    }

    renderHtml();
  });

  /*当滚动到页面底部一定距离的时候 自动加载*/
  $(window).on('scroll', function () {
    /*布局容器距离顶部的高度*/
    var offsetTop = $('.items').offset().top;
    /*布局容器的高度*/
    var height = $('.items').height();
    /*当前文档距离浏览器顶部的高度*/
    var scrollTop = $(this).scrollTop();
    /*浏览器的高度*/
    var winHeight = $(this).height();
    /*整个文档多余的高度 */
    var offset = offsetTop + height - scrollTop - winHeight;
    /* 整个文档多余的高度  小于200的时候 去加载下一页的数据 */
    if (offset <= 200 && !$('.btn').hasClass('loading')) {
      renderHtml();
    }
  });
});
