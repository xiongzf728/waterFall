# 基于 jQuery 的瀑布流 demo

> 请在服务器环境中打开

## waterfall.js

封装了一个简单的 jQuery 插件，实现瀑布流布局，主要思路如下：

  1. 第一排的都是 `top` 为 0，`left` 和当前列的索引有关系
  2. 排列下一个子元素的时候,不是在第一排的情况
    1. 需要找到最矮的那一列  确定top的定位
    2. 需要找到最矮的这一列的索引  确定left的定位
  3. 定位完成之后 要跟新当前这一列的高度
  4. 记录五列盒子的高度变化

## main.js

- 向后台发起 Ajax 请求，获取数据，接口如下：

  ```
    接口说明：瀑布流分页数据
    接口地址：data.php
    请求方式：get
    接口参数：page      当前是第几页    
              pageSize  当前页需要显示多少条
    返回数据：page      下一页的页码
              items     返回当前页的数据
                path    图片地址
                text    文字
                {page: 2,items:[{path: "./images/1.jpg",text:''},…]}
  ```
  
  返回数据结构如下：

  ```json
    [{
      "path": "./images/1.jpg",
      "text": "一支素笔，一杯花茶，一段时光，浅笑又安然一场盛世的繁华，愿不倾城，不倾国，只倾我所有。只为过简单安稳的生活，单纯不平凡。一支素笔，一杯花茶，一段时光，浅笑又安然。早安！"
    }, {
      "path": "./images/2.jpg",
      "text": "青春，青春，一场盛世不平凡。一支素笔，一杯花茶，一段时光，浅笑又安然一场盛世的繁华，愿不倾城，不倾国，只倾我所有。只为过简单安稳的生活，单纯不平凡。一支素笔，一杯花茶，一段时光，浅笑又安然。早安！"
    }]
  ```

- 利用模板引擎将获取到的数据渲染到页面中

- 点击按钮和向下滚动到一定的位置都会触发新的加载

- 有文字提示来表明当前状态：“正在加载中...”、“加载更多”、“没有更多数据”
