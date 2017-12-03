---
layout: post
title: "JS浮点计算精度问题分析与解决"
date: 2017-12-03 22:30:53 +0800
categories:
---

## 问题描述
在JS计算四则运算时会遇到精度丢失的问题，会引起诸多问题，看看以下例子：
例如：在chrome控制台输入 0.1 + 0.7 
输出结果是 0.7999999999999999
例如：0.1+0.2
输出结果：0.30000000000000004
例如：0.1277*1000000000000
输出结果：127700000000.00002

## 问题代码
bMsg.expectRate的值为0.1277
bMsg.expectRate * 1000000000000 / 10000000000
如问题描述的输出结果可以看到，结果并不是预期的12.77，而是127700000000.00002

## 问题原因分析
问题原因是Javascript采用了IEEE-745浮点数表示法（几乎所有的编程语言都采用），这是一种二进制表示法，可以精确地表示分数，比如1/2，1/8，1/1024。遗憾的是，我们常用的分数（特别是在金融的计算方面）都是十进制分数1/10，1/100等。二进制浮点数表示法并不能精确的表示类似0.1这样 的简单的数字。

## 二进制浮点数表示
0.1 + 0.2计算过程会转化成二进制，但由于换算为二进制表达时是无穷的。例如：
0.1 -> 0.0001100110011001...(无限)
0.2 -> 0.0011001100110011...(无限)
IEEE 754 标准的 64 位双精度浮点数的小数部分最多支持 53 位二进制位，所以两者相加之后得到二进制为
0.0100110011001100110011001100110011001100110011001100
因浮点数小数位的限制而截断的二进制数字，再转换为十进制，就成了 0.30000000000000004。所以在进行算术计算时会产生误差。

## 解决方案
为了解决浮点数运算精度丢失问题，一般有以下的方案：
### 使用类库
math.js 、decimal.js

### toFixed方法
在IE6、7、8版本会存在兼容性问题，返回值不准确。

### 小数部分转化为整数，计算后再转化成小数（推荐使用）
以下是一些封装好的方法

#### 加法函数
```
/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}
 
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};
```

#### 减法函数
```
/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
 
// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
    return accMul(arg, this);
};
```

#### 乘法函数
```
/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
 
// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};
```

#### 除法函数
```
/** 
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
 
//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};
```
## 更多参考
* [浮点数的二进制表示](http://www.ruanyifeng.com/blog/2010/06/ieee_floating-point_representation.html)
* [浮点数前世今生](https://www.zhihu.com/question/26806477)
* [IEEE754](https://zh.wikipedia.org/wiki/IEEE_754)
* [浮点数运算问题](http://www.css88.com/archives/7340)
* [格式浮点数](http://www.css88.com/archives/7324)


