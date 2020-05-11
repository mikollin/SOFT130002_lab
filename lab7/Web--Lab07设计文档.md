### Web--Lab07设计文档

#### ——18300290055 赵一玲

##### · lab完成过程中的困难与解决方法

首先研究html和css文件，感觉应该是让我们新建item块到如下的div中。

```html
<div class="flex-container justify"></div>
```

同时比对css文件中的颜色，发现紫色底为class：item，紫灰色底为class：inner-box，按钮直接为button。

首先要通过document.createElement('div')标签名新建节点，然后通过xxx.className设置类名,然后通过xxx.innerHTML方法往节点内写html,最后通过方法把该节点加入到已有DOM树中。

在这里一开始我是直接用了写死的方法如下：

```js
		var i=0;
		var item1 = document.createElement('div');
    item1.className = "item";

   item1.innerHTML = '<h4> Genre:Human </h4>' + '<div class=' + '"' + 'inner-box' + '"' + '>' + '<h3 style="display:inline">' + works[i].author + '</h3>' + '<p style="display:inline"> &nbsp&nbsp lifetime:' + works[i].lifetime + '</p></div>';
   item1.innerHTML = item1.innerHTML + '<div class=' + '"' + 'inner-box' + '"' + '>' + '<h3>Popular Photos</h3>' + '<img class="photo" src=' + works[i].photos[0] + '/>' + '<img class="photo" src=' + works[i].photos[1] + '/>' + '<img class="photo" src=' + works[i].photos[2] + '/>' + '</div>';

    item1.innerHTML = item1.innerHTML + '<button >Visit</button>'+ '</div>';
    var bo = document.body; //获取body对象.
 //动态插入到body中
    bo.insertBefore(item1, bo.lastChild);
```

之后发现有几个问题：

1、太多重复的代码，于是设想希望用一个for循环来重复调用。但是这个时候竟然发现图片竟然跑到了innner-box层的下面，觉得很疑惑也不知道为什么。

2、bo.insertBefore(item1, bo.lastChild);这行代码经过chrome的检查之后发现插在了

```html
<div class="flex-container justify"></div>
```

的前面，而根据html中的结构，感觉应该暗示我们写在这个div的里面，这里写错了。

解决方法：

1、试图把inner-box和h3的Popular Photos和图片同时写在一起。这里新建了一个变量photohtml，来把相应的语句一起拼起来之后再赋值给item1.innerhtml

2、将这句代码改成 bo.lastChild.appendChild(item1);



之后仔细比对自己完成的js后形成的html与图片仔细比对又发现了一个问题。

lifetime我一开始用的是item p，但是如果不加粗看上去比起图片来更细了，如果加粗看上去比起图片来又粗了点……经询问助教后发现不应该使用字体设置，于是改用h5，同时设置1em的margin-left

最后的完成代码如下：

```javascript
var i=0;
for(;i<works.length;i++) {
    var item1 = document.createElement('div');
    item1.className = "item";


    item1.innerHTML = '<h4> Genre : '+works[i].tips+' </h4>' + '<div class=' + '"' + 'inner-box' + '"' + '>' + '<h3 style="display:inline">' + works[i].author + '</h3>' + '<h5 style="display:inline;margin-left: 1em">lifetime:' + works[i].lifetime + '</p></div>';

    var photohtml="";
       for(var j=0;j<works[i].photos.length;j++) {
           if(j==0)
           photohtml = photohtml + '<div class=' + '"' + 'inner-box' + '"' + '>' + '<h3>Popular Photos</h3>';
          photohtml = photohtml + '<img class="photo" src=' + works[i].photos[j] + '/>';
       }
    item1.innerHTML = item1.innerHTML+photohtml +'</div>'+ '<button >Visit</button>'+'</div>';
    var bo = document.body; //获取body对象.
//动态插入到body中
     bo.lastChild.appendChild(item1);

}
```



