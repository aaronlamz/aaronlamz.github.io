---
layout: post
title: "【译】编写更好JavaScript条件语句的5个技巧"
date: 2018-10-28 23:30:06 +0800
categories:
---

当我们写JavaScript代码时，经常会用到到条件判断处理，这里有5个技巧能使你写出更好、更简洁的条件语句。

## 1、使用Array.includes处理多种条件
让我们来看一下的例子：

```
// conditionfunction test(fruit) {
if (fruit == 'apple' || fruit == 'strawberry') {
console.log('red');
}}
```
一眼看去，以上的例子貌似没有什么问题。但是，如果我们加入更多的红色水果，比如车厘子（cherry）和蔓越橘（cranberries）？那就要使用||写更多的条件判断了。
为了解决以上问题，我们可以使用Array.includes来重写以上的条件判断。看以下例子：
```
function test(fruit) {
// extract conditions to array
const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
if (redFruits.includes(fruit)) {
console.log('red');
}}
```
将这些“红色水果”（条件）提取到数组里面，这样写就会看起来很简洁了。

## 2、减少嵌套，尽早return
下面我们增加两个条件判断来扩展下上一个例子：
* 如果没有水果则抛出异常
* 如果数量超出10则输出水果数量
```
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  // condition 1: fruit must has value
  if (fruit) {
    // condition 2: must be red
    if (redFruits.includes(fruit)) {
      console.log('red');
      // condition 3: must be big quantity
      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  } else {
    throw new Error('No fruit!');
  }
}
// test results
test(null); // error: No fruits
test('apple'); // print: red
test('apple', 20); // print: red, big quantity
```
看着以上的代码，发现以下的问题：
* 一个过滤无效条件的if/else语句
* 嵌套三级 if条件语句
我个人遵循的一般规则：在处理无效条件时尽早return
```
/_ return early when invalid conditions found _/
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  // condition 1: throw error early
  if (!fruit) throw new Error('No fruit!');
  // condition 2: must be red
  if (redFruits.includes(fruit)) {
    console.log('red');
    // condition 3: must be big quantity
    if (quantity > 10) {
      console.log('big quantity');
    }
  }
}
```

通过这种写法，可以减少一层嵌套。当if语句很长的时候，这种写法就比较好。（试想一下，你需要滚动到很底部才能看到else语言，这样不酷）。
我们也可以用相反的条件判断和尽早返回来减少if语句嵌套，看以下第二个条件是如何处理的。

```
/_ return early when invalid conditions found _/

function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  if (!fruit) throw new Error('No fruit!'); // condition 1: throw error early
  if (!redFruits.includes(fruit)) return; // condition 2: stop when fruit is not red
  console.log('red');
  // condition 3: must be big quantity
  if (quantity > 10) {
    console.log('big quantity');
  }
}
```
通过在第二个条件里取反的条件来判断，现在的代码释放了一个嵌套。当我们要写很长的逻辑以及想停止更一步的过程时，这种方法很凑效。
但是，这样写并不是硬性的，要看具体的场景。有时候，你要问下自己，这样的写法（没有嵌套）是否比之前那种（在条件2嵌套）更好或者更具可读性。

对我来说，我只会远离之前的那种写法（在条件2嵌套），注意有以下两个原因：
* 对比嵌套if语句，这种写法更短，更简洁
* 取反的条件判断可能招致更多的思考过程（增加认知负荷）

因此，始终旨在减少嵌套和及时及早返回（return），但是不要过度去这样做。如果感兴趣可以查看以下的一篇相关文章和在StackOverflow的关于这主题的更多讨论：
* 避免else，尽早return
* StackOverflow关于if/else代码风格的讨论

## 3、使用函数默认参数和解构
我猜以下的代码你看起来应该很熟悉了，我们仍然需要在执行JavaScript时检查空值（undefined或null）。
```
function test(fruit, quantity) {
  if (!fruit) return;
  const q = quantity || 1; // if quantity not provided, default to one
  console.log(`We have ${q} ${fruit}!`);
}
//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```
事实上，我们可以消除变量p来分配函数默认参数。看以下例子：
```
function test(fruit, quantity = 1) { // if quantity not provided, default to one
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}
//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```

是不是看起来很简单，很直观？请记住，每个参数都有自己的默认函数参数。例如，我们也可以为fruit分配默认值（即以上代码的第一个参数）:
```
function test(fruit = 'unknown', quantity = 1)
```
另外一个问题来了：如果fruit参数是Object类型怎么办？我们可以指定默认值吗？
```
function test(fruit) { 
  // printing fruit name if value provided
  if (fruit && fruit.name)  {
    console.log (fruit.name);
  } else {
    console.log('unknown');
  }
}
//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```
看看上面的例子，我们想要打印出fruit的名称如果值存在的话，否则打印出“unknow”。我们可以通过检查默认函数参数和对象解构来避免fruit&&fruit.name这个条件。看看以下例子：
```
// destructing - get name property only
// assign default empty object {}
function test({name} = {}) {
  console.log (name || 'unknown');
}
//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```
由于我们只需要fruit对象的name属性，可以使用{name}来解构对象，然后我们可以在代码中使用name作为变量代替fruit.name。
我们还将分配空对象{}作为默认参数。如果不这样做的话，在执行test(undefined)这行代码时就会报错：无法解析’undefined’或’null’的属性name，因为undefined没有name这个属性。
如果你不介意使用第三方库，有几个方法可以减少空值检查。
* 使用[Lodash get](https://lodash.com/docs/4.17.10#get)方法
* 使用Facebook 开源的[idx](https://github.com/facebookincubator/idx)库（和Bablejs）

以下是使用Lodash的例子：
```
// Include lodash library, you will get _
function test(fruit) {
  console.log(__.get(fruit, 'name', 'unknown'); // get property name, if not available, assign default value 'unknown'
}
//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```
你可以在[这里](http://jsbin.com/bopovajiye/edit?js,console)执行这个demo。另外，如果你热衷于使用函数式编程(FP)，你可能会选择用[Lodash fp](https://github.com/lodash/lodash/wiki/FP-Guide)，Lodash的函数式版本（方法改为get或getOr）。

## 4、支持Map或对象字面量而不是switch声明
我们来看看以下例子：
```
function test(color) {
  // use switch case to find fruits in color
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}
//test results
test(null); // []
test('yellow'); // ['banana', 'pineapple']
```
以上的代码看起来貌似没什么错误，但是我发现代码十分杂乱。其实可以用字面量对象更清晰的语法来实现相同的结果。例如：
```
// use object literal to find fruits in color
  const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
  };
function test(color) {
  return fruitColor[color] || [];
}
```
或者，你也可以用Map来实现同样的结果，例如：
```
// use Map to find fruits in color
  const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);
function test(color) {
  return fruitColor.get(color) || [];
}
```
[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)是自ES6开始才可用的对象类型，可以用来存储键值对。

## 5、对所有或部分规则使用Array.every和Array.some
最后一个技巧是关于利用新的（其实不是很新了）JavaScript数组方法来减少代码函数。看看下面的代码，我们想所有的水果是否都是红色的。
```
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];
function test() {
  let isAllRed = true;
  // condition: all fruits must be red
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }
  console.log(isAllRed); // false
}
```
上面的代码真的好冗长！我们可以用Array.every来减少代码行数。来看看：
```
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];
function test() {
  // condition: short way, all fruits must be red
  const isAllRed = fruits.every(f => f.color == 'red');
  console.log(isAllRed); // false
}
```
现在是不是简洁很多了？同样类似的方法，如果你想测试是否所有的水果都是红色，可以用Array.some一行代码即可实现。
```
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];
function test() {
  // condition: if any fruit is red
  const isAnyRed = fruits.some(f => f.color == 'red');
  console.log(isAnyRed); // true
}
```
## 总结
让我们一起生成更多可读代码。 我希望你能在本文中学到一些新东西。
就这样。 写代码快乐！
(完)

## 后记
以上译文仅用于学习交流，水平有限，难免有错误之处，敬请指正。

## 更多阅读
[解构赋值](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

## 原文链接
[原文](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-4-favor-map-object-literal-than-switch-statement])