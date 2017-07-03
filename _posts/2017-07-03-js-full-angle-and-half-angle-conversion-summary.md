---
layout: post
title: "JS全角与半角转化小结"
date: 2017-07-03 22:44:02 +0800
categories: JS 
---

最近在做PC端网站的页面的一个表单校验，需要把全角输入转化成半角符号。之前没有了解过这些编码的知识，还是得Google一下查查资料，故简单总结一下。

#### 什么是全角、半角
传统上，英语或拉丁字母语言使用的电脑系统，每一个字母或符号，都是使用一字节的空间（一字节由8比特组成，共256个编码空间）来储存；而汉语、日语及韩语文字，由于数量大大超过256个，故惯常使用两字节来储存一个字符。在使用等宽字体（如DOS、部分文字编辑器等）的环境下，中日韩文字此时占据两倍于西文字符的显示宽度。所以，中、日、韩等文字称为全角字符，相比起来，拉丁字母或数字就称为半角字符。有时为了使字体看起来齐整，英文字母、数字及其他符号也由原来只占一个字空间，改为占用两个字的空间显示、使用两个字节储存的格式。（[维基百科](https://zh.m.wikipedia.org/wiki/%E5%85%A8%E5%BD%A2%E5%92%8C%E5%8D%8A%E5%BD%A2)）

#### 转化原理
* 全角空格unicode编码为12288，半角空格为32
* 其他字符半角(33-126)与全角(65281-65374)的unicode编码对应关系是：均相差65248

#### 全角转半角
```javascript
   function ToCDB(str) {
       var tmp = "";
       for (var i = 0; i < str.length; i++) {
           if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
               tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
           }
           else {
               tmp += String.fromCharCode(str.charCodeAt(i));
           }
       }
       return tmp
   }
```

#### 半角转全角
```javascript
    function ToDBC(txtstring) {
        var tmp = "";
        for (var i = 0; i < txtstring.length; i++) {
            if (txtstring.charCodeAt(i) == 32) {
                tmp = tmp + String.fromCharCode(12288);
            }
            if (txtstring.charCodeAt(i) < 127) {
                tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
            }
        }
        return tmp;
    }
```


