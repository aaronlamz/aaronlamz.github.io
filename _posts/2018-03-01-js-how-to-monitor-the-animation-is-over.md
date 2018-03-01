---
layout: post
title: "JS如何监听动画结束"
date: 2018-03-01 20:50:21 +0800
categories:
---
## 场景描述
在使用JS控制动画时一般需要在动画结束后执行回调去进行DOM的相关操作，所以需要监听动画结束进行回调。JS提供了以下事件用于监听动画的结束，简单总结学习下。

## CSS3动画监听事件
### transitionEnd事件
transitionEnd事件会在CSS transition动画结束后触发。
#### 动画结束后触发监听事件
```
<!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        .demo{
            margin:100px;
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
        }
        .demo:hover{
            width: 200px;
        }
    </style>
</head>
<body>
    <div id="demo" class="demo">
        鼠标移入
    </div>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
    </script>
</body>
</html>
```
#### 事件多次触发问题 
当存在多个属性过渡变化时，结束时会多次触发transitionend事件。看个例子： 
当过渡结束时，width和background-color都发生变化，会触发两次transionend事件 
```
<!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
        }
        .w200{
            width: 200px;
            background-color: #fef;
        }
    </style>
</head>
<body>
    <div id="demo" class="demo" onmouseover="change()" onmouseout="change()">
    </div>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo w200': 'demo'
        }
    </script>
</body>
</html>
```
#### 事件失效问题及解决方案
1、在transiton动画完成前设置display:none，事件不会触发。
```
<!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
        }
        .w200{
            width: 200px;
        }
    </style>
</head>
<body>
    <div id="demo" class="demo" onmouseover="change()" onmouseout="change()">
    </div>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo w200': 'demo'
            // 500ms后设置display:none
            setTimeout(function (){
                element.style.display = 'none'
            },400)
        }
    </script>
</body>
</html>
```
2、当transition完成前移除transition一些属性时，事件也不会触发，例如：
```
<!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
        }
        .noTranstion{
            width:100px;
            height: 100px;
            background-color: #ddc;
        }
        .w200{
            width: 200px;
        }
    </style>
</head>
<body>
    <div id="demo" class="demo" onmouseover="change()" onmouseout="change()">
    </div>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo w200': 'demo'
            setTimeout(function(){
                element.className = 'noTranstion'
            },400)
        }
    </script>
</body>
</html>
```
3、元素从display:none到block，不会有过渡，导致无法触发transitionend事件 
例如：元素从display:none 到block opacity从0到1，无法触发过渡效果。 
```
<!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        body{padding: 50px;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
            opacity:0;
            display: none;
        }
        .noTranstion{
            width:100px;
            height: 100px;
            background-color: #ddc;
        }
        .opt{
            display: block;
            opacity:1
        }

        .w200{
            width: 200px;
        }
        button{position: absolute;top: 200px;width: 100px;height: 40px;}
    </style>
</head>
<body>
    <div id="demo" class="demo" onmouseover="change()" onmouseout="change()">
    </div>
    <button onclick="change()">Click</button>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo opt': 'demo'
        }
    </script>
</body>
</html>
```
无法触发过渡效果原因： 
元素从none到block，刚生成未能即时渲染，导致过渡失效。所以需要主动触发页面重绘，刷新DOM。页面重绘可以通过改变一些CSS属性来触发，例如：offsetTop、offsetLeft、offsetWidth、scrollTop等。 
触发过渡效果解决方案：
1、通过定时器延迟渲染 
```
<!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        body{padding: 50px;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
            opacity: 0;
            display: none;
        }
        .opt{
            display: block;
        }
        button{position: absolute;top: 200px;width: 100px;height: 40px;}
    </style>
</head>
<body>
    <div id="demo" class="demo">
    </div>
    <button id="button" onclick="change()">点击</button>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        var button = document.getElementById('button')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo opt': 'demo'
            if(element.className === 'demo'){
                        element.style.opacity = null
                    button.innerHTML = '点击'
            }else{
                setTimeout(function(){
                element.style.opacity = '1'
                button.innerHTML = '重置'
            },10)
            }
        }
    </script>
</body>
</html>
```
2、强制获取当前内联样式 
通过window.getComputedStyle()方法返回应用样式后的元的所有CSS属性的值，并解析这些值可能包含的任何基本计算。也就是说返回的属性值是已计算后的值，即DOM元素的样式已经更新了。然后再改变对应属性值触发过渡效果。例如： 
```js
<!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        body{padding: 50px;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
            opacity: 0;
            display: none;
        }
        .opt{
            display: block;
        }
        button{position: absolute;top: 200px;width: 100px;height: 40px;}
    </style>
</head>
<body>
    <div id="demo" class="demo">
    </div>
    <button id="button" onclick="change()">点击</button>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        var button = document.getElementById('button')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo opt': 'demo'
            if(element.className === 'demo'){
                        element.style.opacity = null
                    button.innerHTML = '点击'
            }else{
                // setTimeout(function(){
                //     element.style.opacity = '1'
                //     button.innerHTML = '重置'
                // },10)
                window.getComputedStyle(element, null).opacity
                element.style.opacity = '1'
                button.innerHTML = '重置'
            }
        }
    </script>
</body>
</html>
```
3、触发重绘刷新DOM 
通过clientWidth触发重绘，例如： 
```js
<!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        body{padding: 50px;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
            opacity: 0;
            display: none;
        }
        .opt{
            display: block;
        }
        button{position: absolute;top: 200px;width: 100px;height: 40px;}
    </style>
</head>
<body>
    <div id="demo" class="demo">
    </div>
    <button id="button" onclick="change()">点击</button>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        var button = document.getElementById('button')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo opt': 'demo'
            if(element.className === 'demo'){
                        element.style.opacity = null
                    button.innerHTML = '点击'
            }else{
                // setTimeout(function(){
                //     element.style.opacity = '1'
                //     button.innerHTML = '重置'
                // },10)
                // window.getComputedStyle(element, null).opacity
                element.clientWidth;
                element.style.opacity = '1'
                button.innerHTML = '重置'
            }
        }
    </script>
</body>
</html>
```
#### 浏览器兼容性
移动端基本支持 android2.1+、webkit3.2+
详见[浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)
### animationEnd事件
与transitonend事件类似，[详见](https://developer.mozilla.org/zh-CN/docs/Web/Events/animationend) 

## Zepto中animate结束回调实现
查看了下zepto动画模块的源代码，animate()方法在动画结束后触发回调也是通过transitionend、animationend事件来触发。
另外在一些低版本的Android手机可能无法触发transitionend事件，需要手动触发。
```
$.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }
// 手动触发事件
if (duration > 0){
      this.bind(endEvent, wrappedCallback)
      // transitionEnd is not always firing on older Android phones
      // so make sure it gets fired
      setTimeout(function(){
        if (fired) return
        wrappedCallback.call(that)
      }, ((duration + delay) * 1000) + 25)
    }
```
## 参考链接
[zepto动画模块源码](https://github.com/madrobby/zepto/blob/master/src/fx.js#files) 
[transitionend事件MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend) 
[transtion属性详解MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) 
[transitionend事件详解](http://www.cnblogs.com/surfaces/p/4324044.html) 
[Window.getComputedStyle() 方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)