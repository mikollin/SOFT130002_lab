//1. 获取url中名为name的参数。在URL输入框输入url，点击同行submit按钮后，其中的参数名为name的参数值需要出现在Argument value输入框内。
//如果没有名为name的参数，那么可以在Argument value输入框出现任何值。
//请仅在showWindowHref函数内写代码。

//提示：url指代 （若干字符串）?（参数名1）=（参数1值）&（参数2）=（参数2值）...  这样的字符串。具体可以上网查找。例如：hjsdghgbj?name=666666&group=876。
//url、url_submit、url_result指代对应id的三个对象，其中url和url_result可以通过url.value或者url_result.value获得值。
//字符数组处理可以使用相关函数
let url = document.getElementById("url");
let url_submit = document.getElementById("url_submit");
let url_result = document.getElementById("url-result");
url_submit.addEventListener('click',showWindowHref);
function showWindowHref(){
    let result="can't find the argument";
    let queryName="name";
    let urlstring=url.value;
    let vars = (urlstring||"").split("?"); //增加未定义(空字符串)的情况
    //solve TypeError: Cannot read property 'split' of undefined
    urlstring=vars[1];//获取url中"?"符后的字串
    if (urlstring!=undefined) { //判断是否有参数
        var str = urlstring.substr(0);
        let vars = str.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == queryName) {
                result=pair[1];  //逐个搜索
            }
        }

    }
    url_result.value=result;
}
//2. 每隔五秒运行一次函数直到某一整分钟停止，比如从20:55:45运行到20:56:00停止；或者运行10次，先到的为准。从1开始每过五秒，输入框内数值翻倍。初始值为1。
//注意：你可以在函数 timeTest内部 和 timeTest外部 写代码使得该功能实现。
//与设置时间相关的函数可以上网查找。

//提示：mul为html中id为"mul"的元素对象，可直接通过mul.value获得其内的输入值。
let mul = document.getElementById("mul");
mul.value=1;
let i=0;
let interval=setInterval(timeTest,5000);//页面载入后，每经过指定毫秒值后执行指定表达式，是间隔多次执行的
function timeTest(){
mul.value=mul.value*2;
i=i+1;
if(i==10)
    clearInterval(interval);
}
//3. 判断输入框most里出现最多的字符，并统计出来。统计出是信息在most_result输入框内以"The most character is:" + index + " times:" + max的形式显示。
//如果多个出现数量一样则选择一个即可。
//请仅在arrSameStr函数内写代码。

//提示：most、result、most_submit的解释及其.value与上面类似。
let most = document.getElementById("most");
let result = document.getElementById("most-result");
let most_submit = document.getElementById("most_submit");
most_submit.addEventListener('click',arrSameStr);
function arrSameStr(){

    mostv=most.value;
    let json = {};
    for (var i = 0; i < mostv.length; i++) {
        if(!json[mostv.charAt(i)]){
            json[mostv.charAt(i)] = 1;//给一个初始值
        }else{
            json[mostv.charAt(i)]++;//有初始值后再次出现++
        }
    };
    var iMax = 0;
    var iIndex = '';
    for(var i in json){
        if(json[i]>iMax){
            iMax = json[i];
            iIndex = i;
        }
    }
    result.value='出现次数最多的是:'+iIndex+'出现'+iMax+'次';

}
