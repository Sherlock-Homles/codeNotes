# PHP 面试题

### 1、使用swoole如何设置心跳？

```php
// swoole: 设置每5秒侦测一次心跳，一个TCP连接如果在10秒内未向服务器端发送数据，将会被切断
$this->serv->set([
    'heartbeat_check_interval' => 5,
    'heartbeat_idle_time' => 10,
]);
```

### 2、访问量达到100万，选择缓存，选择Redis还是memchache？

> 选择memchache，因为memchache只有一种类型，key-velue，而Redis的类型比memchache多，导致并发没有memchache好。

### 3、Redis 和 memchache 的主要区别。

Redis默认端口是6379，memchache默认端口是11211

> 1. 数据存储介质：memchache缓存的数据都是存放在内存中，一旦内存失效，数据就会丢失。Redis缓存的数据存放在内存和硬盘中，能够达到持久化存储，Redis能够利用快照和AOF把数据存放到硬盘中，当内存失效，也可以从磁盘中抽取出来，调入内存中，当物理内存使用完毕后，也可以自动的持久化到硬盘中。
> 2. 数据存储方式：Redis与memchache都是以键值对的方式存储，而Redis对于值使用比较丰富，支持Set、Hash、List、Zet（有序集合）等数据结构的存储，memchache只支持字符串，不过memchache也可以缓存图片、视频等非结构化数据。
> 3. 架构层次：Redis支持Master-Slave（主从）模式的应用，应用在单核上。memchache支持分布式，应用在多核上。
> 4. 存储数据大小：对于Redis单个value存储的数据量最大为1GB。而memchache存储的最大为1MB，而存储的value数据值大于100KB时，性能会更好。
> 5. Redis只支持单核，而memchache支持多核。

###  4、psr2 和 psr4 的区别。

> psr：php standards recommendation，意思是PHP标准建议。
>
> psr2：编码风格向导
>
> psr4：自动加载
>
> psr4:#完整的类名为\a\b\c\Log#命名空间前缀前缀为：a\b#前缀对应的基础目录为：./vendor#文件实际目录为：./vendor/c/Log.php#注：即把去掉最前面的命名空间分隔符后的a\b\c\Log中的命名空间前缀替换成基础目录，然后把命名空间分隔符替换成目录分隔符，并把文件名补上后缀 .php 。

### 5、mb_strlen 和 strlen 的区别？

> PHP 中常用的计算字符串长度的函数有两个，分别是 strlen() 和 mb_strlen() 函数。当处理全英文字符串时，这两个函数的效果是一样的，而处理中英文混合或纯中文的字符串时，这两个函数会有一些差异。
>
> 1、在 strlen() 函数中，数字、英文、小数点、下划线和空格占一个字符长度；而一个 GB2312 编码的汉字占两个字符长度，一个 UTF-8 编码的汉字占三个字符长度。
>
> 2、mb_strlen() 函数中，无论是汉字，还是英文、数字、小数点、下划线和空格，都只占一个字符长度。

```php
$a = "中国"
echo strlen($a)."\n"; // 6
echo mb_strlen($a); // 2
```

### 6、下面代码会输出什么？

```php
$str = 'abc';
$res = strpos($str, 'a');
if ($res) {
    echo ('找到了');
} else {
    echo ('未找到');
}
// 答案是：未找到，因为strpos是查找首字母出现的位置，并且索引是从0开始的，并且PHPs是弱类型的，所以会输出:未找到
```

### 7、使用二分法查找50出现的位置。

```php
//第一种方法
function binary(array &$arr, int $low, int $top, int $target)
{
    while ($low <= $top) {$mid = floor(($low + $top) / 2);
        if ($arr[$mid] === $target) {
            return $mid;
        } elseif ($arr[$mid] > $target) {
            $top = $mid - 1;
        } else if ($arr[$mid] < $target) {
            $low = $mid + 1;
        }
    }
    return -1;
}
$arr = [1, 3, 5, 12, 34, 45, 50];
echo binary($arr, 0, count($arr), 50); //6
//第二种方法
function binaryRecursive(array &$arr, int $low, int $top, int $target)
{
    $mid = floor(($low + $top) / 2);
    if ($arr[$mid] > $target) {
        return binaryRecursive($arr, $low, $mid - 1, $target);
    } elseif ($arr[$mid] < $target) {
        return binaryRecursive($arr, $mid + 1, $top, $target);
    } else if ($arr[$mid] === $target) {
        return $mid;
    } else {
        return -1;
    }
}
$arr = [1, 3, 5, 12, 34, 45, 50];
echo binaryRecursive($arr, 0, count($arr), 50); //6
```

### 8、将数组进行翻转，不使用内置函数？

```php
function overturn(array &$arr)
{
    $temp = [];
    for ($i = count($arr) - 1; $i >= 0; $i--) {
        $temp[] = $arr[$i];
    }
    // print_r($temp);
    return $temp;
}
$arr = [1, 3, 5, 12, 34, 45, 50];
echo overturn($arr);
//Array ( [0] => 50 [1] => 45 [2] => 34 [3] => 12 [4] => 5 [5] => 3 [6] => 1 )
```

### 9、请写出nginx负载均衡的算法？怎么检查配置用没有问题，如果有问题，怎么查看出现是问题，修改了配置文件，怎么生效？

1.round robin(默认)

> 解释：轮询方式，依次将请求分配到各个后台服务器中，默认的负载均衡方式，是否机器性能一致的情况下。

2.weight（权重）

```php
upstream bakend { 
    server 192.168.0.14 weight=10; 
    server 192.168.0.15 weight=10; 
}
```

> 解释：根据权重来分发请求到不同的机器中，指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。

3.IP_hash

```php
upstream bakend { 
	ip_hash; 
	server 192.168.0.14:88; 
	server 192.168.0.15:80; 
}
```

> 解释：根据请求者ip的hash值将请求发送到后台服务器中，可以保证来自同一ip的请求被打到固定的机器上，可以解决session问题。

4.url_hash

```php
upstream backend { 
    server squid1:3128; 
    server squid2:3128; 
    hash $request_uri; 
    hash_method crc32; 
}
```

> 解释：根据请求的url的hash值将请求分到不同的机器中，当后台服务器为缓存的时候效率高。

5.fair(第三方)

```php
upstream backend { 
    server server1; 
    server server2;
    fair; 
}
upstream bakend{
    #定义负载均衡设备的Ip及设备状态 
    ip_hash; server 127.0.0.1:9090 down; 
    server 127.0.0.1:8080 weight=2; 
    server 127.0.0.1:6060; 
    server 127.0.0.1:7070 backup; 
} 
//  每个设备的状态设置为: 
//	1.down 表示单前的server暂时不参与负载 
//  2.weight 默认为1.weight越大，负载的权重就越大。 
//  3.max_fails ：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误 
//  4.fail_timeout:max_fails次失败后，暂停的时间。 
//  5.backup： 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。 nginx支持同时设置多组的负载均衡，用来给不用的server来使用。 client_body_in_file_only 设置为On 可以讲client post过来的数据记录到文件中用来做debug client_body_temp_path 设置记录文件的目录 可以设置最多3层目录 location 对URL进行匹配.可以进行重定向或者进行新的代理 负载均衡
```

### 10、优化下面的代码

```php
$arr = [1,2,3,...n+1]; 
$userName = []; 
foreach ($arr as $v){ 
    $userName = $this->getUserNameFromyDb($v); 
} 
// 优化代码如下： 
$arr = [1,2,3,...n+1]; 
$userName = []; 
$userName = this->getUserNameFromyDb(implode(',',$arr))
```

### 11、实现一个单列模式。

```php
<?php class Singleton
{
    // 1.创建私有变量保存该对象
    private static $interface;
    // 2.禁止使用 new public function __construct() { }
    // 3.禁止克隆 public function __clone() { // TODO: Implement __clone() method. }
    // 4.判断对象是否存在
    public static function getInstance()
    {
        if (!self::$interface instanceof self) {
            self::$interface = new self();
        }return self::$interface;
    }
    public function test()
    {
        echo '测试单列模式';
    }
}
$singleton = Singleton::getInstance();
$singleton->test();
// 实现单列模式的意义，减少资源的占用
```

### 12、请简述一下观察者模式。

简单的一句话就是，多个不同类去执行方法名相同的代码。

实现：定义一个观察接口，实现该接口里的方法。

生活中的例子：

> 小明（观察者），狗（被观察者），猫（被观察者），牛（被观察者）
> 当小明看见狗，就知道它喜欢吃骨头。
> 当小明看见猫，就知道它喜欢吃鱼。
> 当小明看见牛，就知道它喜欢吃青草。

```php
<?php
//观察者接口
interface ObjectTest
{
    public function register(ObServerTest $obServerTest);
    //注册观察者对象
    public function detach(ObServerTest $obServerTest);
    //删除观察者对象
    public function notify();
    //通知所有的被观察者
}
//被观察者接口
interface ObServerTest
{
    public function eat();
}
class Action implements ObjectTest
{
    private $_obServersTest = [];
    public function register(ObServerTest $obServerTest)
    //注册对象
    {
        $this->_obServersTest[] = $obServerTest;
    }
    public function detach(ObServerTest $obServerTest)
    {
        $index = array_search($obServerTest, $this->_obServersTest);
        if (false === $index || !array_key_exists($index, $this->_obServersTest)) {
            throw new \Exception('该对象不存在');
        }
        unset($this->_obServersTest[$index]);
    }
    public function notify()
    //通知所有的对象
    {
        foreach ($this->_obServersTest as $k => $v) {
            $v->eat();
        }
    }
}
class Dog implements ObServerTest
{
    public function eat()
    {echo '狗吃骨头' . "\n";
    }
}
class Cat implements ObServerTest
{
    public function eat()
    {echo '猫吃鱼' . "\n";
    }
}
class Pink implements ObServerTest
{
    public function eat()
    {echo '猪吃了睡，睡了吃' . "\n";
    }
}
$action = new Action();
$action->register(new Dog());
$action->register(new Cat());
$action->register(new Pink());
$action->notify();
//结果: 狗吃骨头 猫吃鱼 猪吃了睡，睡了吃
```

### 13、请写出怎么获取请求头的信息？

```php
Apache: getallheaders();
nginx: function nginxGetAllHeaders()
{
    //获取请求头
    $headers = [];
    foreach ($_SERVER as $name => $value) {
        if (substr($name, 0, 5) == 'HTTP_') {
            $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
        }
    }
    return $headers;}
```

### 14、高访问量网站怎么优化？

> 软件：
>
> - 将不经常变化的数据直接静态化
> - 使用Redis和memchache缓存，减少数据库的访问
> - 控制大文件下载
> - 图片、视频服务器分离
> - 禁止外部盗链（可以通过refer实现）
> - 统计流量使用情况
>
> 硬件：
>
> - 服务器负载均衡
> - MySQL主从复制、读写分离

### 15、请说一下websoket原理、

> [看完让你彻底理解 WebSocket 原理，附完整的实战代码（包含前端和后端）](https://www.cnblogs.com/nnngu/p/9347635.html)

### 16、Redis 默认有多少个库？

> 16个库

### 17、Linux进程之间如何通信？

> - 管道
> - 信号量
> - 消息队列
> - 信号
> - 共享内容
> - 套接字（unix socket）

### 18、git 如何合并分支？

```shell
git checkout master
git merche 分支名
```

### 19、laravel外部引入路由。

> 1. 在route文件夹中添加php文件，并设置路由。
> 2. 在app/Providers/RouterServiceProvide中对应的文件路径。
> 3. 然后laravel启动就会加载该文件。

### 20、实现一个队列

```php
# redis的队列
// server.php
<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);
$password = '123456';
$redis->auth($password);
$arr = array('list1', 'list2');
foreach ($arr as $k => $v) {
    $redis->rpush("mylist", $v);
}
// client.php 
<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);
$password = '123456';
$redis->auth($password);
//list类型出队操作
$value = $redis->lpop('mylist');
if ($value) {
    if ($value === 'list1') {
        echo '执行list1的代码';
    }
    if ($value === 'list2') {
        echo '执行list2的代码';
    }
} else {
    echo "出队完成";
}
//执行两次 #第一次 执行list1的代码 #第二次 执行list2的代码 //rabbitmq #等不忙的时候再写
```

### 21、如何房子商品不会超卖？

> 采用Redis队列去实现。

### 22、单引号和双引号的区别。

> 1. 单引号比双引号执行速度快
> 2. 双引号会解析变量、换行，而单引号不会

### 23、微信、支付宝支付回调，如果在回调区间服务器崩溃了，如何解决？

> 1. 确定哪些订单没有收到回调
> 2. 通过订单号，去查询微信和支付宝的订单状态，确认是否支付成功。

### 24、在浏览器输入URL后回车，经历了哪些过程？

> 1. 解析域名，访问DNS，拿到IP地址           
> 2. 建立tcp连接
> 3. 发送一个http请求
> 4. 服务器处理相关请求
> 5. 返回响应的结果
> 6. 关闭tcp连接
> 7. 浏览器解析HTML
> 8. 浏览器进行布局渲染

### 补充：什么是 TCP/IP 的三次握手和四次挥手？

> TCP/IP三次握手：
>
> 1.客户端 向 服务端发起连接请求，其中TCP首部SYN=1，表示希望建立连接
>
> 2.服务端收到请求后，向客户端返回一个TCP首部SYN=1的报文，表示可以建立连接。
>
> 3.客户端收到返回的报文后，像服务端发送一个TCP首部ACK=1的报文，表示确认收到。
>
> 然后双方建立起连接。
>
> TCP/IP 四次挥手：
>
> 1.客户端 向 服务端发起断开请求，其中TCP首部FIN=1，表示希望断开连接
>
> 2.服务端收到请求后，向客户端返回一个TCP首部ACK=1的报文，表示确认收到。
>
> 3.客户端等待服务端发送 TCP首部FIN=1的报文，表示可以断开连接。
>
> 4.客户端收到后，返回一个TCP首部ACK=1的报文，表示确认收到。
>
> 5.如果客户端没有继续接收到服务端的报文，2S后双方断开连接。 

### 25、PHP常用的字符串处理函数

```php
mb_substr() // 截取字符串（中文）
substr() // 截取字符串（英文）
ucfirst() // 将字符串首字母变为大写
str_replace() // 替换字符串
```

### 26、为什么要减少数据库的访问次数？

> 因为方法数据库会有大量io、事务、网络传输操作，所以要减少数据库的访问次数。

### 27、require 和 include 的区别。

> include 在引入不存在文件时产生一个警告并且脚本还会继续执行，require 则会导致一个致命性错误且脚本停止执行。

### 28、PHP7 新特性。

1、支持标量和返回类型。

```php
<?php
class Test
{
    private $age;
    /** * @return mixed */
    public function getAge()
    {
        return $this->age;
    }
    /** * @param mixed $age */
    public function setAge(int $age): void
    {
        $this->age = $age;
    }
}
$test = new Test();
$test->setAge('1233ddsaf');
echo $test->getAge();
//1233,内部进行了转换
```

2、太空船运算符

```php
$var = $i??1; // 判断变量是否存在，存在则将该值给$var，不存在，则将1给$var
echo $var; // 1
```

3、可以使用 use 从同一个 namespace 中导入类、函数和常量。

4、可以通过 define() 来定义数组。

```php
define('test', ['12', 23]);
echo test[1]; // 23
```

5、可以使用new class来实现一个匿名类。

```php
<?php
interface Logger
{
    public function log(string $log);
}
class App
{
    private $logger;
    /** * @return mixed */
    public function getLogger()
    {
        return $this->logger;}
    /** * @param mixed $logger */
    public function setLogger($logger): void
    {
        $this->logger = $logger;
    }
}
$app = new App();
$app->setLogger(new class implements Logger
{
    public function log(string $log)
    {
        echo $log;
    }
});
$app->getLogger()->log('这是一条日志'); //这是一条日志
```

### 29、数据库优化策略。

#### 1、合理的表设计

> 1、依据三范式设计表：
>
> 1. 第一范式（1NF）：原子性（存储的数据应该具有“不可再分性”）
>
> 2. 第二范式（2NF）：唯一性 (消除非主键部分依赖联合主键中的部分字段)（一定要在第一范式已经满足的情况下）
>
> 3. 第三范式（3NF）：独立性，消除传递依赖(非主键值不依赖于另一个非主键值)
>
> 2、选择合适的字段
>
> 1. 尽量使用TYPEINT、SMALLINT、MEDIUM_INT代替INT的使用，一般索引，并且是字段递增，可以考虑设置为UNSIGNED。
> 2. 使用枚举代替字符串类型。
> 3. 减少null的使用，null很难优化，并且还占用额外的空间。
> 4. varchar长度分配给真正需要的空间。
> 5. 建立会话索引。
>
> 3、选择合适的引擎。

#### 2、SQL优化

> 1. 减少`*`的使用，只查询需要的字段。
> 2. 使用关联查询代替子查询。
> 3. like使用后匹配。
> 4. 合理使用索引。
> 5. 减少对null字段的判断，否则引擎放弃索引，对全表进行扫描。
> 6. 减少!=、<>的使用。
> 7. 减少where条件中使用or来连接条件。
>
> ```sql
> select id from t where num=10 or Name = ‘admin’
> #可以这样查询： 
> select id from t where num = 10 union select id from t where Name = ‘admin’
> ```

#### 3、减少数据库访问次数

> 将不经常变化的数据进行缓存（分类、权限等），可以使用Redis和memchache，（存疑：不要使用文件缓存，它也是对io进行操作）。

#### 4、硬件方面

> 1. 可以考虑分库、分表。
> 2. 可以采用主从复制、读写分离。（MySQL服务器根据SQL去判断是读还是写）

### 30、laravel 保存 session。

```php
$request->session()->put('admin',$res); 
$request->session()->save(); // 要加这一句，如果不加，不会保存session // 如果要保存session,都要调用save方法
```

