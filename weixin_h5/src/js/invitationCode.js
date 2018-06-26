/**
 * Created by Administrator on 2016/8/1.
 */
//$(document).ready(function(){
//    $(".header-invitationCodeBox").text("你好");
//})

window.onload =function loadXMLDoc()
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var haha=xmlhttp.responseText;
            var lala=eval("(" + haha + ")");
            //var hehe="<img src='"+ lala.programmers[0].img +"' />"
            //document.getElementsByClassName("contentM1-img")[0].innerHTML=hehe;
            document.getElementsByClassName("header-invitationCodeBox")[0].innerHTML=lala.programmers[Math.floor(Math.random()*10+1)].comment;
            //document.getElementsByClassName("pointsValue")[0].innerHTML=lala.programmers[Math.floor(Math.random()*10+1)].time;
        }
    }
    xmlhttp.open("GET","js/invitationCode.json",true);
    xmlhttp.send();
}



//    function jiazaiXMLDoc()
//{
//    var xmlhttp;
//    if (window.XMLHttpRequest)
//    {// code for IE7+, Firefox, Chrome, Opera, Safari
//        xmlhttp=new XMLHttpRequest();
//    }
//    else
//    {// code for IE6, IE5
//        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//    }
//    xmlhttp.onreadystatechange=function()
//    {
//        if (xmlhttp.readyState==4 && xmlhttp.status==200)
//        {
//            var haha=xmlhttp.responseText;
//            var lala=eval("(" + haha + ")");
//            //var hehe="<img src='"+ lala.programmers[0].img +"' />"
//            //document.getElementsByClassName("contentM1-img")[0].innerHTML=hehe;
//            //alert(lala.programmers[Math.floor(Math.random()*10+1)].comment);
//            //alert(lala.programmers[10].comment);
//           confirm(lala.programmers[10].comment);
//        }
//    }
//    xmlhttp.open("GET","js/invitationCode.json",true);
//    xmlhttp.send();
//}

function jiazaiXMLDoc()
{
    //window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.hust.cash");
    //window.location.href="http://www.baidu.com"
    window.location.href="register.html";
}



