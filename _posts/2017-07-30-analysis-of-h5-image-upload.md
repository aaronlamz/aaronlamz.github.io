---
layout: post
title: "浅析H5图片上传"
date: 2017-07-30 22:46:51 +0800
categories:
---
## 概述
最近需求上需要实现图片上传的功能，简单记录下实现过程。目前实现的功能比较简单，主要有以下几点：
* 图片预览
* 图片删除
* 拖拽上传
* 压缩上传

## 移动端实现方案：使用File API

> 主要使用到 FileList、File、FileReader、canvas、拖放API

### FileList对象
一个FileList对象通常来自于一个HTML input元素的files属性,你可以通过这个对象访问到用户所选择的文件。当用户通过file控件选取文件后，这个控件的files属性值就是FileList对象。它在结构上类似于数组，包含用户选取的多个文件。

#### 通过表单控件获取FileList对象
通过监听onchange事件，选择图片后，可以通过files属性获取图片信息，其中accept属性为接收到文件格式，multiple 属性设置后支持选择多个文件。
```javascript
    <input type="file" name="demo" accept="image/jpeg,image/png" onchange="console.log(this.files.length)" multiple>
```
#### 通过拖放获取FileList对象
DataTransfer对象是用于保存在一次拖放操作的被拖动的数据。通过DataTransfer.files属性可以获取所有在数据传输中可用的本地文件的列表。具体查看[DataTransfer API](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer)和[拖放API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)。

### File对象
File API提供File对象，它是FileList对象的成员，包含了文件的一些元信息，比如文件名、上次改动时间、文件大小和文件类型。[File对象文档](https://developer.mozilla.org/zh-CN/docs/Web/API/File)。File对象的属性值如下:
* name：文件名，该属性只读。
* size：文件大小，单位为字节，该属性只读。
* type：文件的MIME类型，如果分辨不出类型，则为空字符串，该属性只读。
* lastModified：文件的上次修改时间，格式为时间戳。
* lastModifiedDate：文件的上次修改时间，格式为Date对象实例。
例如：
```javascript
<input type="file" name="demo" accept="image/jpeg,image/png" onchange="upload()" multiple>
<script>
    function upload(){
    var file = document.querySelector('input').files[0];
        document.writeln(file.name);
        document.writeln(file.size);
        document.writeln(file.type);
        document.writeln(file.lastModified);
        document.writeln(file.lastModifiedDate);
    }
</script>
// 13910DAB-D0EC-4DE6-8876-CFAF9EDA3086.png
// 28345
// image/png 
// 1500826120000
// Mon Jul 24 2017 00:08:40 GMT+0800 (CST)
```

### FileReader 对象
FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，它的参数是File对象或Blob对象。对于不同类型的文件，FileReader提供不同的方法读取文件。以下是相关方法及事件。详细查看[api](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

#### 方法
* readAsBinaryString：返回二进制字符串，该字符串每个字节包含一个0到255之间的整数。
* readAsText：返回文本字符串。默认情况下，文本编码格式是’UTF-8’，可以通过可选的格式参数，指定其他编码格式的文本。  
* readAsArrayBuffer：返回一个ArrayBuffer对象。   
* readAsDataURL：返回一个基于Base64编码的data-uri对象。

#### 事件处理
 * Onabort ：读取操作被中止时调用.
 * Onerror ：当读取操作发生错误时调用.
 * Onload ：当读取操作成功完成时调用.
 * Onloadend ：当读取操作完成时调用,不管是成功还是失败.该处理程序在onload或者onerror之后调用.
 * Onloadstart：当读取操作将要开始之前调用.
 * Onprogress ：在读取数据过程中周期性调用.

#### 创建一个FileReader对象
```javascript
    let reader = new FileReader();
```
####  readAsDataURL 实现图片预览
readAsDataURL方法返回一个data URL，它的作用基本上是将文件数据进行Base64编码。你可以将返回值设为图像的src属性。 
```javascript
<div class="imgPreview">
    <img src="" width="100" height="100" /> 
</div>
<input type="file" name="demo" accept="image/jpeg,image/png" onchange="upload()" multiple >
<script>
    function upload(){
        var file = document.querySelector('input').files[0];
        var reader = new FileReader();
        reader.onload = function(e){
            // onload事件的回调函数接受一个事件对象，该对象的target.result就是文件的内容
            document.querySelector('img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

</script>
```

## 浏览器兼容性
IE10以下的版本不支持FileReader()构造函数.不过可以利用滤镜来兼容旧版本的IE:[兼容IE的图片本地预览](https://mdn.mozillademos.org/files/3699/crossbrowser_image_preview.html).

## PC/第三方组件
需要兼容PC端可以使用webuploader组件
http://fex.baidu.com/webuploader/

## 参考资料
* [https://www.ibm.com/developerworks/cn/web/1101_hanbf_fileupload/index.html](https://www.ibm.com/developerworks/cn/web/1101_hanbf_fileupload/index.html)
* [http://www.techug.com/post/web-file-upload-method.html](http://www.techug.com/post/web-file-upload-method.html)
* [http://www.ruanyifeng.com/blog/2012/08/file_upload.html](http://www.ruanyifeng.com/blog/2012/08/file_upload.html)
* [https://juejin.im/post/58c64f2b0ce463005479f4d3](https://juejin.im/post/58c64f2b0ce463005479f4d3)
* [http://fex.baidu.com/webuploader/](http://fex.baidu.com/webuploader/)
* [http://www.jq22.com/jquery-info230](http://www.jq22.com/jquery-info230)
* [https://github.com/blueimp/jQuery-File-Upload/wiki/Setup](https://github.com/blueimp/jQuery-File-Upload/wiki/Setup)
* [https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)
* [http://javascript.ruanyifeng.com/htmlapi/file.html](http://javascript.ruanyifeng.com/htmlapi/file.html)
* [https://www.w3.org/TR/FileAPI/](https://www.w3.org/TR/FileAPI/)
* [https://developer.mozilla.org/zh-CN/docs/Web/API/File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)
* [http://uule.iteye.com/blog/2281846](http://uule.iteye.com/blog/2281846)
* [http://www.zuojj.com/archives/1402.html](http://www.zuojj.com/archives/1402.html)