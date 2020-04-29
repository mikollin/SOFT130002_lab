/*
1.
背景：
    每隔五秒运行一次函数直到某一整分钟停止，比如从20:55:45运行到20:56:00停止；
    或者运行10次，先到的为准。从1开始每过五秒，输入框内数值翻倍。初始值为1。
注意：
    你可以在函数 timeTest内部 和 timeTest外部 写代码使得该功能实现。
要求：
    ①要求使用JS闭包的方式使得计数实现局部私有，不可以在全局区域声明计数变量。
    ②使用console.log打印计数即可，到达一分钟提前停止也需要console.log相应的提示语句。
*/

function testTime(){
    let value=1;
    let i=0;
    console.log(value);
    let interval=setInterval(function(){
        value=value*2;
        i=i+1;
        console.log(value);
        if(new Date().getSeconds()===0||i===10) {
            console.log('已运行10次！停止！')
            clearInterval(interval);
            clearInterval(stop);
        }
    },5000);//页面载入后，每经过指定毫秒值后执行指定表达式，是间隔多次执行的
    let stop =setInterval(function () {
        if (new Date().getSeconds()===0){
            console.log('一分钟到了！停止!')
            clearInterval(stop);
            clearInterval(interval);
        }
    },1);
    
}
//testTime();

/*
2.
要求：
    ①能够对传入的、移动手机电话（11位）、邮箱字符串（上网查找其要求）进行正则判定。
    ②使用console.log打印即可，例如，电话不符合要求但是邮箱符合要求，则console.log("The telephone is right and the mail is wrong!")。
    ③邮箱字符串的正则匹配的理解需写入lab文档。
    ④telephone与mail均是字符串。
*/
function testMail(telephone,mail) {
    let reTel=/^1(3|4|5|7|8)\d{9}$/;
    let reMail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //邮箱的基本格式为“名称@域名”，需要使用“^”匹配邮箱的开始部分，用“$”匹配邮箱结束部分以保证邮箱前后不能有其他字符
    let telr=reTel.test(telephone);
    let mailr=reMail.test(mail);
    if(telr&&mailr){
        console.log("The telephone and the mail are both right!");
    }
    else if(telr&&(!mailr)){
        console.log("The telephone is right and the mail is wrong!");
    }
    else if((!telr)&&mailr){
        console.log("The telephone is wrong and the mail is right!");
    }
    else{
        console.log("The telephone and the mail are both wrong!");
    }




}

/*
3.
要求：
    ①输入一段全英文语句，要求使用正则表达式找到相邻的重复单词放入一个Set，如果集合中元素超过10个，则按照首字母顺序取前10个于集合。
    ②使用console.log打印即可，将该集合打印出来。
    ③例如：输入"Is is the iS is cost of of gasoline going up up"，输出：Set { 'Is is', 'iS is', 'of of', 'up up' }。
    ④对该函数中用的正则匹配的理解需写入lab文档。
    ⑤str为字符串。
*/
function testRedundancy(str) {
    function compare(a,b){//首字母比较
        if((a.toLocaleUpperCase())[0]===(b.toLocaleUpperCase())[0])
            return a-b;//ASCII 从小到大
        else
            return a.localeCompare(b)
    }
    let reg=/\b([a-zA-z]+) \1\b/ig;
    //\b是匹配一个单词的边界 \1是引用第一个括号的内容

    /* 原先的错误做法orzzz
    let set=new Set();
     set.add(str.match(reg));

    let value;
    let result="";
    for(let x of set){
        if(x.length>10){
            x.sort(compare);
            x=x.slice(0,10)
        }
        x.sort(compare);
        value=x.toString().split(",");
    }

    for(let x of value){
        result+="'"+x+"',";
        //console.log(result);
    }
    result=result.substring(0,result.length-1);
    console.log("Set { "+result+" }");
   //console.log(set);
*/

    let array=str.match(reg);
    array.sort(compare);
    let result=new Array();
    let set=new Set(array);
    if(set.size>10) {

        for(i=10;i<array.length;i++) {
            result = array.slice(0, i);
            set = new Set(result);
            if (set.size === 10)
                break;

        }
        console.log(set);
    }
    else{

        console.log(set);
    }


}
//testRedundancy("Is is the iS is  up up cost of of GoIng going let Let new New we We is to To go Go and And FF ff");
//testRedundancy("Is is the iS is cost of of gasoline going up up");
/*
4.
背景：
    旧键盘上坏了几个键，于是在敲一段文字的时候，对应的字符就不会出现。
    现在给出应该输入的一段文字、以及实际被输入的文字，请你使用Set列出肯定坏掉的那些键。
    例如：输入7_This_is_a_test和_hs_s_a_es    输出：Set { '7', 'T', 'I' }
要求：
    ①需要使用Set。
    ②只能使用一次循环。
    ③使用console.log打印即可，将该集合打印出来。
    ④wantInput和actualInput为字符串。
注意：
    ①注意联系生活，并注意观察我给的上述例子。
*/
function testKeyBoard(wantInput, actualInput) {

    wantInput=wantInput.toLocaleUpperCase();
    actualInput=actualInput.toLocaleUpperCase();
    let len=wantInput.length;

    let set=new Set();
    for(let i=0,j=0;i<len&&j<len;){
        // let pattern='/'+actualInput[i]+'/'+'i';
        // let reg=pattern;
        if(wantInput[i]===actualInput[j]) {
            i++;
            j++;
        }
        else{
                set.add(wantInput[i].toLocaleUpperCase());
                //result+="'"+wantInput[i].toLocaleUpperCase()+"' ,";
                i++;
        }

    }
    console.log(set);

}
// testKeyBoard("7_This_is_a_test", "_hs_s_a_es");

/*
5.
背景：
    给定一个输入英文语句字符串，反转该语句。例如the sky is blue变成blue is sky the。
要求：
    ①如果输入的字符串前后有空格，输出中应该去除前后空格。如果输入字符串中间出现连续的两个空格，输出应该变为一个。
    比如输入是“  hello  world!  ”，输出应该是“world! hello”。
    ②请使用Array。
    ③使用console.log打印即可，将该数组打印出来。
    ④只能显式使用一次循环。
    ⑤str为字符串。
*/
function testSpecialReverse(str) {
    let array=new Array();
    let result=new Array();
    array=str.split(" ");
    //console.log(array);
    for(let i=array.length-1;i>=0;i--){
        if(array[i]==='')
            continue;
        result.push(array[i]);

    }
    result=result.join(" ");
    console.log("\""+result.toString()+"\"");
}
//testSpecialReverse("  hello  world!  ");
//testSpecialReverse("the sky is blue");
/*
6.
背景：
    给定一个整数数组和一个值，找出相加为该值的两个元素下标并保存在一个数组中。
    例如给定 [2, 7, 11, 15]和9,
    打印结果为[0,1]
要求：
    ①使用Map。
    ②只能显式使用一次循环。
    ③使用console.log打印即可，将满足条件的数组打印出来。
    ④nums为数字数组，如[1,2,3,4],target为数字,如5，那么输出为
    [ 0, 3 ]
    [ 1, 2 ]
*/

function twoSum(nums, target) {
    let result=[];
    let map=new Map();
    for(let i=0;i<nums.length;i++){
        result[target-nums[i]] = i;
        if(result[nums[i]] !==undefined){
           map.set(result[nums[i]],i);
        }

    }

    result=Array.from(map);
    result.sort();
    result=result.join(']\n[');

    console.log('['+result+']');


}
// twoSum([1,2,3,4], 5);

/*
7.
背景：
    打印最长的包含不同字符串的子字符串长度。
要求：
    ①使用Map。
    ②例如：输入"abbbbb",输出2，输入"bbbbb",输出1；
    ③只能显式使用一次循环。
    ④使用console.log打印即可。
    ⑤str为字符串。
*/
function lengthOfLongestSubstring(str) {

        let result='';//当前最长字串
        let lens=0;
        let char;
        let index;
        for(let i=0;i<str.length;i++){
            char=str.charAt(i);
            index=result.indexOf(char);
            if(index===-1){
                result+=char;
                lens=lens<result.length?result.length:lens;
            }
            else{
                result=result.substr(index+1)+char;
            }
        }

        console.log(lens);

}
//lengthOfLongestSubstring("abbcdcbbb");
//lengthOfLongestSubstring("bbbbb");


/*
8.
背景：
    该部分只是为了让你们自己动动手更好地感受不同继承方式。
要求：
    ①借助构造函数、原型链、和Object.create分别编写DevelopingCountry、PoorCountry、DevelopedCountry以实现对Country的继承，
    并在三者分别添加sayHi、saySad、sayHappy函数分别打印"Hi,i am a developing country."、"I am a sad poor country."、"I am a Happy developed country."
    ②请调用他们并打印相关语句即可。
*/
function Country() {
    this.name = "国家";
}

function DevelopingCountry(name){
    Country.call(this,name);//借助构造函数
}
DevelopingCountry.prototype.sayHi=function(){
   return "Hi,i am a developing country.";
     //console.log()默认接受函数时会打印返回值，如果没有设定，会返回 undefined。
}
 let developingCountry=new DevelopingCountry("developing country");

function PoorCountry(){

}
PoorCountry.prototype=new Country();  //原型链
PoorCountry.prototype.saySad=function () {
    //console.log("I am a sad poor country.");
    return "I am a sad poor country.";
}
let poorCountry=new PoorCountry();

// Country.prototype.sayHappy=function(){
//     //console.log("I am a Happy developed country.");
//     return "I am a Happy developed country.";
//}
  let developedCountry=Object.create(Country.prototype);//,{
 //     sayHappy:{
 //         value:function(){  //Object.create
 //             return "I am a Happy developed country."
 //         }
 //     }
 // });
    developedCountry.sayHappy=function(){
        //console.log("I am a Happy developed country.");
        return "I am a Happy developed country.";
    }


// console.log(developingCountry.sayHi());
// console.log(poorCountry.saySad());
// console.log(developedCountry.sayHappy());


//调用函数tet
function test(){
    // testTime();//最后调用
    testMail("13812238483","ai324@126.com");
    testMail("145defdqf","edj.dejn@rdjcn.enjd.com");
    testMail("13817772345","edj.dejn@rdjcn.enjd.com");
    testMail("145defdqf","edj@fudan.edu.cn");
    //testRedundancy("Is is the iS is  up up cost of of iS is GoIng going let Let new New we We is to To go Go and And FF ff");
    testRedundancy("Is is the iS is cost of of gasoline going up up");
    testKeyBoard("7_This_is_a_test", "_hs_s_a_es");
    testSpecialReverse("  hello  world!  ");
    //testSpecialReverse("the sky is blue");
    twoSum([1,2,3,4], 5);
    //lengthOfLongestSubstring("abbcdcbbb");
    lengthOfLongestSubstring("abbbbb");



    console.log(developingCountry.sayHi());
    console.log(poorCountry.saySad());
    console.log(developedCountry.sayHappy());

    testTime();
}
test();


