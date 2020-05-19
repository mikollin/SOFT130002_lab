### LAB8设计文档

——18300290055 赵一玲

#### · lab8实现过程

首先一开始以为这个lab的html和css都不可修改，所以整体浏览了这两个文件，试图理解他们的意思，通过如下代码

```css
.container .wrap {
    position: absolute;
    width: 4200px;
    height: 400px;
    z-index: 1;
}
.container .wrap img {
    float: left;
    width: 600px;
    height: 400px;
}
```

```html
<div class="wrap" style="left: -600px;">
    <img src="5.jpg" alt="5">
    <img src="1.jpg" alt="1">
    <img src="2.jpg" alt="2">
    <img src="3.jpg" alt="3">
    <img src="4.jpg" alt="4">
    <img src="5.jpg" alt="5">
    <img src="1.jpg" alt="1">
</div>
```

可以看出这七张图片是平铺在一起，然后外面被container包裹，导致在container框外的都被hidden掉，通过改wrap的left就可以切换不同图片显示在container中，同时推测只有5张图片却用7张来轮播，是为了实现无缝轮播。

了解了基本背景和原理就可以来做我们的任务了。

##### 任务一

首先我先设置了css样式，基本与样例相同。

```js
document.write("<style> body{background-color: lavender;}h3{display:none;}table{width: 600px;margin:40px auto 10px auto;font-weight: bold;table-layout: fixed; box-shadow: 2px 2px 5px #888888;border-radius:10px; }</style>");
//fixed 列宽由表格宽度和列宽度设定。
```

由于样例图片中没有h3，这里把它设置成none，同时仔细观察table，发现有阴影且有圆角，相应的设置，同时设置整体的背景色，看上去是lavender。

之后是我们的正式任务一：先获取往左往右的按钮，左为prev，右为 next，之后建立两个函数prev_pic ()，和next_pic ()，都是修改wrap的left，prev，上一张，就整体右移，next，下一张就整体左移，通过parseInt(wrap.style.left)来获取当前的left的数值，然后修改，最后赋值给left的时候还要加上单位。

这里有一个问题——边界情况的考察，即为了转换平滑在i=0的第五张图片和i=6的第一张图片多放的两张图片，就是一开始显示的图片是右移600px之后的，那到了0px，再右移就是空白，同理到了最右的第五张之后，再左移，也是空白，所以要控制当取到边界情况即，-3600px与0px的时候，-3600px时，为第1张，它的next应该是第二张，将newLeft设置为-1200px，当为0px时为第五张图，prev应该是第四张，设置newLeft为-2400px。

同时要设置右下角的点的数字标记。这里建立了一个showCurrentDot（）方法，显示当前的图片对应的点设置成红色，观察css文件，发现普通的点没有class，当前点有on这个class，所以这个函数就是把所有点重置为绿色，然后设置当前点为红色，这里需要一个index全局变量来控制是第几张图片，一开始为0（第一张图片时），next就++，prev就--，在边界情况index>4时，即是i为6的第一张图片，所以修改index为0，同理对于prev

```js
if(index < 0){
    index = 4;
}
```

修正完index后，调用showCurrentDot来显示当前点。

以上任务一完成。



##### 任务二

任务二的完成代码如下：

```js
function autoPlay () {

    timer = setInterval(function () {
        next_pic();
        flag=1;

    },2000);
}
 container.addEventListener("mouseover",function(){clearInterval(timer);});
 container.addEventListener("mouseout",function(){autoPlay();});
 autoPlay();
```

首先由于鼠标移入轮播区停止自动播放，移出继续自动播放，绑定事件mouseover和mouseout，自动播放用了定时器，每一次切换与next同效果，即调用next_pic()，然后由于刚加载完如果鼠标在container外需要自动播放，所以先调用autoplay（）来使其自动播放，之后鼠标移动就会有事件发生，会相应停止。

同时助教说了不需要考虑鼠标放在container内然后按键刷新的情况，感觉这样的实现能满足要求。



##### 任务三

```js
for (let i = 0, len = dots.length; i < len; i++){
   
         dots[i].addEventListener('click', function () {
            //clearInterval(timer);
            let dis = index - i;
            //alert(dis);
            if(index == 4 && parseInt(wrap.style.left)!==-3000){
                dis = dis - 5;

            }
            //和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可
            if(index == 0 && parseInt(wrap.style.left)!== -600){
                dis = 5 + dis;

            }
            //alert(dis);
            wrap.style.left = (parseInt(wrap.style.left) +  dis * 600)+"px";
            index = i;
            showCurrentDot();

        });
   
}
```

基本实现如上，先通过span的tagName来获得所有点，然后对每个点绑定一个click事件,将当前click的点i与index即当前点之间的差命名为dis（distance缩写），然后在当前的left基础上加上差*600px然后修改index为当前i，然后showCurrentDot();即可，这里也有一个边界问题，即最开始的照片5和最终的照片1在使用时会出现问题，比如我现在是最终的第一张图，然后我现在click了3，其实我应该是右移3x600px，但如果按照index，就会认为是i=1的第一张图，那么应该是左移2x600px，所以设置，另一种情况同理，因此增加修正：

```js
if(index == 4 && parseInt(wrap.style.left)!==-3000){
    dis = dis - 5;

}

if(index == 0 && parseInt(wrap.style.left)!== -600){
    dis = 5 + dis;

}
```

##### 任务四

最后是任务四。

经查阅资料发现让table变成可编辑，加上属性 contenteditable='true'，即可，由于这里要求点击非表头的单元格可编辑内容，将所有的td通过tagName先get，然后均绑定click事件，将它们增加可编辑的属性。

同时这里的一大难点在于点击单元格后，光标自动定位于单元格的首个字符或者汉字前。查了很久很久的资料，最终解决手段如下：

```js
for(let i=0;i<td.length;i++) {
     td[i].addEventListener('click',function(){
         td[i].setAttribute('contenteditable', 'true');
       
         let r=window.getSelection();
         
         r.collapse(td[i], 0);
           

     });
```

但是这种方法就会导致点击了之后光标一直都在行首，只能通过键盘移动。

之后我想到希望设置一个flag，只有当mouseenter事件发生时，把flag设置成1，只有flag为1时才设置collapse，希望单元格内移动编辑不会光标在前。（主要是我查了两个小时的资料也没找到collapse设置了之后怎么取消orzzzz，也希望助教能够在这个lab结束之后公布一下答案～

我的第二个方法实现如下

```js
let flag=0;
for(let i=0;i<td.length;i++) {
     td[i].addEventListener('click',function(){
         td[i].setAttribute('contenteditable', 'true');
         
         let r=window.getSelection();
         if(flag==1) {
         		 r.collapse(td[i], 0);
             flag=0;
         }


     });

     
     td[i].addEventListener('mouseenter',function(){
        flag=1;
       // console.log("FF");
     });

      
      }
```

但是实际在网页中检查发现确实可以单击单元格，光标自动在行首，再点击想编辑的区域可以编辑，但是第二次点击之后的点击一会儿会自动跳到行首，一会儿又不会了，感觉可能是方法实现还是有点问题。

最后询问助教第一种这种用键盘控制移动编辑的方法可行。最终还是采取了第一种方法不改了。

以上是我这次lab的完成情况。

