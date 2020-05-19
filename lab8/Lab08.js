
/*请在该区域内声明或者获取所要使用的全局变量*/
/********************************************begin************************************/

let index =0;

let wrap = document.querySelector(".wrap");
let container=document.querySelector(".container")
let next = document.querySelector(".arrow_right");
let prev = document.querySelector(".arrow_left");
let dots = document.getElementsByTagName("span");
let table=document.getElementsByTagName('table')[0];
let td=document.getElementsByTagName('td');

//let flag=0;

let timer;

/*********************************************end*************************************/



/* 任务一
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击左箭头prev和右箭头next的时候，可以切换到前一张图片和下一张图片。（左右箭头为html中的a标签）
 * ②每切换一张图片，右下角的数字标记对应变化。
 *      如：一开始，第1张图片显示出来，右下角的1-5的数值中，数值1位红色，2-4为绿色，表示当前显示第1张图片。
 *      点击next箭头，图片切换到第2张，同时，右下角红色数值从1切换为2，数值1,3,4,5为绿色。
 * ③当当前图片为第1张时，点击prev箭头，切换到第5张图片，且数值5置为红色。
 * 当当前图片为第5张时，点击next箭头，切换到第1张图片，且数值1置为红色。
 * ④切换图片的过程不要求，可直接切换，也可动画切换，但要求保证一定的切换动画合理性，不能出去明显的衔接不当。
 * ⑤本部分只能使用原生JS。
 */
/********************************************begin************************************/
document.write("<style> body{background-color: lavender;}h3{display:none;}table{width: 600px;margin:40px auto 10px auto;font-weight: bold;table-layout: fixed; box-shadow: 2px 2px 5px #888888;border-radius:10px; }</style>");
//fixed 列宽由表格宽度和列宽度设定。


function showCurrentDot () {
    for(let i = 0, len = dots.length; i < len; i++){
        dots[i].className = "";
    }
    dots[index].className = "on";
}

next.onclick = function () {
    next_pic();
}
prev.onclick = function () {
    prev_pic();
}
function next_pic () {
    let newLeft;
    if(wrap.style.left === "-3600px"){
        newLeft = -1200;
    }else{
        newLeft = parseInt(wrap.style.left)-600;
    }
    wrap.style.left = newLeft + "px";
    index++;
    if(index > 4){
        index = 0;
    }
    showCurrentDot();
}
function prev_pic () {
    let newLeft;
    if(wrap.style.left === "0px"){
        newLeft = -2400;
    }else{
        newLeft = parseInt(wrap.style.left)+600;
    }
    wrap.style.left = newLeft + "px";
    index--;
    if(index < 0){
        index = 4;
    }
    showCurrentDot();
}

/*********************************************end*************************************/



/* 任务二
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①轮播可以自动播放，切换图片间隔为2s，每一次切换的效果与点击next箭头的效果一致。
 * ②当鼠标移入轮播区域内时，停止自动播放。
 * ③当鼠标不在轮播区域内时，开始自动播放。
 * ④页面刚加载完成时，如果鼠标不在轮播区域内，自动开始自动播放；否则，等待直到鼠标移出轮播区域，再进行自动播放。
 * ⑤本部分只能使用原生JS。
 */
/********************************************begin************************************/



function autoPlay () {

    timer = setInterval(function () {
        next_pic();
        //flag=1;

    },2000);
}
 container.addEventListener("mouseover",function(){clearInterval(timer);});
 container.addEventListener("mouseout",function(){autoPlay();});
 autoPlay();


/*********************************************end*************************************/



/* 任务三
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击右下角的任意一个数值，能够切换到对应图片，且相应数值变为红色。
 * ②进行①操作过后，是否自动播放，其规则与上一个任务一致。
 * ③本部分只能使用原生JS。
 */
/********************************************begin************************************/

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

/*********************************************end*************************************/


/*任务四
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击某一非表头的单元格，可以编辑其内容，编辑完毕后点击其他部位，可以在界面上显示修改后的内容。
 * ②点击单元格后，光标自动定位于单元格的首个字符或者汉字前。
 * ③本部分可以使用jQuery，也可以使用原生JS。
 */
/********************************************begin************************************/

for(let i=0;i<td.length;i++) {
     td[i].addEventListener('click',function(){
         td[i].setAttribute('contenteditable', 'true');
         //$(this).focus();
         //let cur=$(this).createTextRange();
         let r=window.getSelection();
         //if(flag==1) {
         r.collapse(td[i], 0);
           //  flag=0;
         //}


     });

     /*
     td[i].addEventListener('mouseenter',function(){
        flag=1;
       // console.log("FF");
     });

      */
      }


//可编辑效果 contenteditable='true'

/*********************************************end*************************************/