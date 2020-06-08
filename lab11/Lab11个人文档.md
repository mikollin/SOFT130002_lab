# Lab11个人文档

### 赵一玲 18300290055

## 1. the function of cookie and session

由于http是无状态的，服务器可以利用Cookie或Session包含信息的任意性来筛选并经常性维护这些信息，来记录和维护状态。

Cookie 用于保存客户浏览器请求服务器页面的请求信息,程序员也可以用它存放非敏感性的用户信息，信息保存的时间可以根据需要设置.如果没有设置Cookie失效日期,它们仅保存到关闭浏览器程序为止。通过把Cookie的日期设置为过去的时间来使Cookie失效。

Session用于保存每个用户的专用信息. 每个客户端用户访问时，服务器都为每个用户分配一个唯一的会话ID（Session ID) . 它的生存期是用户持续请求时间再加上一段时间(一般是20分钟左右)。Session中的信息保存在Web服务器内容中,保存的数据量可大可小。当 Session超时或被关闭时将自动释放保存的数据信息。



## 2. the advantages & disadvantages of cookie and session

### cookie：

#### 1.advantages：

cookie存放在客户的浏览器上，减轻服务器性能负担。

服务器重启/关机，不易丢失。cookie为浏览器所内置，使用方便。即使用户不小心关闭了浏览器窗口，只要在cookie定义的有效期内，购物车中的信息也不会丢失；

#### 2.disadvantages:

由于cookie数据存放在客户的浏览器上不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗 考虑到安全应当使用session 。

cookie有最大存储量限制，需要磁盘IO，速度较慢。同时有些服务器不支持。还需要字符串解析，代价高。

cookie需要占据网络带宽资源。

### session:

#### 1.advantages：

session数据放在服务器上。较为安全。

session不会占用传送流量。

#### 2.disadvantages:

由于用户停止使用应用程序后session仍然在内存中保持一段时间，因此使用session对象使保存用户数据的方法效率很低。对于小量的数据,使用session对象保存还是一个不错的选择。

服务器重启/关机，易丢失。

同时由于session数据放在服务器上且一定时间内都保存在内存上，当访问增多会比较占用服务器的性能。同时在集群条件下，session有单点故障/难以达到负载均衡的缺点。



## 3.本次lab遇到的问题和体会

这里简单提几句这次lab中遇到的问题。

首先是打开了sql文件，根据其中的sql语句才发现需要建的数据库名字为Login，之前看php文件中的art，一直不成功，之后打开了sql文件才得以确认。

还有就是config.php文件需要根据自己的用户和密码进行更改，同时还要改成Login，这里一开始因为没有这么做，导致看不到input框和登录后的信息。

还有就是setcookie莫名其妙的失效。。我的浏览器没有禁用，网上查了很多情况，甚至单独开了一个php文件试试setcookie，isset判断，并相应echo，但还是走isset为false的路线。。。我服了

之后通过助教的帮助发现setcookie要求必须在html标签之前声明，所以需要在页面的最前面加上以下代码先把缓存区打开，终于成功了！！终于！！！

```php
<?php
  ob_start();
?>
```

然后这次lab让我对cookie最深切的体会就是，对cookie的赋值只有等下一次浏览请求时才能生效，即cookie在使用时，在php端设置了cookie后并不能直接使用的，因为此时只是告诉浏览器我设置了一个cookie，以及参数是什么。需要浏览器刷新后才能使用刚才设置的这个cookie。若要马上使用需要：

```php
setcookie(“user_name”, “张三”, time()+3600); //此处设置cookie，过期时间为1小时
$_COOKIE[‘user_name’] = “张三”; //直接将值再一次付给cookie后，下面就能直接使用cookiel了
```

即总结cookie生效过程：

当我们首次访问设置Cookie的页面时，服务器会把设置的Cookie值通过响应头发送过来，告诉浏览器将cookie存储的本地相应文件夹中（注意:第一次访问时本地还没有存储Cookie,所以此时获取不到值）;
当第二次访问(或在进行cookie设置后,过期前所有的访问)时，请求头信息你中都会把Cookie值携带。

就我个人体会感觉还是目前的lab、pj方面的还是session方便好用。

本次lab帮我们完整的感受了整个cookie和session的使用过程，包括set和unset的方法和查看信息等等。更全面理解了cookie和session保存状态的功能，也两种方式相互对比理解，更深入。