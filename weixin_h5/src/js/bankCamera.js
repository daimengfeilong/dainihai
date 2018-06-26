$(document).ready(function () {
    loadLogin_three();
    get_all_status(null,null,null);
    setTimeout(function () {
        bankInit(1);
    }, 1000);
    LoadingOver();
});


//央行征信报告拍摄和银行流水拍摄
function bankInit(index) {
    var u = new UploadPic();
    u.init({
        input: document.querySelector('.picfile-' + index),
        callback: function (base64) {
            var thisSrc = $("#cname-" + index).attr("src");
            loadwsan_datapic(base64, index, thisSrc);

        },
        loading: function () {
            Loading();
        }
    });
}

var num = 1;
//添加图片
function addPictureBox() {
    var pictureBoxArray = [];
    var $pictureBoxL = $(".content-box-right");

    $pictureBoxL.each(function (i) {
        pictureBoxArray.push(i);
    });

    if (pictureBoxArray.length < 5) {
        num++;
        var click = "uploadphotoJudgeZX(" + num + ")";
        var pictureBoxHtml = '  <div class="content-box-right" index="' +
            num +
            '" style="overflow: hidden;">' +
            ' <img border=0 src="" class="cname-' +
            num +
            '" id="cname-' +
            num +
            '" style="display: none;">' +
            '  <input type="file" class="picfile-' +
            num +
            '" capture="camera" accept="image/*" id="uploadphoto' +
            num +
            '" name="uploadfile" value="请点击上传图片" style="opacity: 0;height: 0;width: 0;position: absolute;"/>' +
            ' <div style="height: 100%;width: 100%;position: absolute;top: 0;left: 0;" onclick="' +
            click +
            '">' +

            ' </div>' +
            '  <div class="content-boxRight-area backImg-' +
            num +
            '">' +
            '  <p><img src="images_old/liftLimit/cross.png" alt="error"></p>' +

            '   <p>点击添加图片</p>' +
            '</div>' +
            '<input type="hidden" class="filname-' +
            num +
            '" value="">' +
            '<div onclick="deletePicture(this)" class="delete-picture-box delete-' +
            num +
            '">' +
            '   <i></i>' +
            '</div>' +
            '</div>';

        $(".content").append(pictureBoxHtml);
        resetIndex();
        setTimeout(function () {
            bankInit(num);
        }, 1000);

    }
}

//删除图片  isnot为1代表已添加图片，0代表未添加
function deletePicture(obj) {
	console.log(obj);
    var $fatherBox = $(obj).parent(".content-box-right");
    $fatherBox.remove();
    resetIndex();

    var $pictureBox = $(".content").find(".content-box-right");
    if ($pictureBox.length == 4) {
        var $last = $pictureBox.last();
        var isnot = $last.attr("isnot");
        console.log("isnot == " + isnot);
        if (isnot == 1) {
            addPictureBox();
        }
    }
}

//重置顺序
function resetIndex() {
    var $boxRight = $(".content").find(".content-box-right");
    var sortNum = 0;
    $boxRight.each(function (i) {
        $(this).attr("index", parseInt(i + 1));
    });
}

function subUpload(type) {
    if (type == 4) {
        if (btnstatusvalue(localStorage.int64_increase_status, 3) == 1) {
            ShowMsg("央行征信报告已提交！");
            return false;
        }
    } else if (type == 5) {
        if (btnstatusvalue(localStorage.int64_increase_status, 4) == 1) {
            ShowMsg("银行流水已提交！");
            return false;
        }
    }

    var $pictureArray = [];
    var $pictureBox = $(".content").find(".content-box-right");
    Loading();
    if ($pictureBox != "" && $pictureBox != 'undefined' && $pictureBox != null) {
        if ($pictureBox.length == 1) {
            var filnameVal = $(this).find(".filname-1").val();
            if (filnameVal == '' || filnameVal == 'undefined' || filnameVal == null) {
                LoadingOver();
                ShowMsg("请添加照片！");
            } else {
                var paraPicSrc = "";
                $pictureBox.each(function (i) {
                    var num = parseInt(i + 1);
                    var filnameVal = $(this).find("input[class^='filname-']").val();
                    if (filnameVal != '' && filnameVal != 'undefined' && filnameVal != null) {
                        paraPicSrc += "&pic_name" + parseInt(i + 1) + "=" + filnameVal;
                    }
                });
                upImgs(type, paraPicSrc);
            }
        } else if ($pictureBox.length > 1) {
            var paraPicSrc = "";
            $pictureBox.each(function (i) {
                var num = parseInt(i + 1);
                var filnameVal = $(this).find("input[class^='filname-']").val();
                if (filnameVal != '' && filnameVal != 'undefined' && filnameVal != null) {
                    paraPicSrc += "&pic_name" + parseInt(i + 1) + "=" + filnameVal;
                }
            });
            upImgs(type, paraPicSrc);
        }
    }
}

function stateBack(type){


}

function goBack() {
    window.location.href = "liftLimit.html";
}

//提交银行流水或征信报告
var upImgNum = 0;
function upImgs(type, paraPicSrc) {
	$("#loadd_pageinfog").show();
    //超过1.5秒之后，右上角就显示“请求超时”
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    //创建可扩展标记语言的传输请求
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        //表示需要发送的地址
        var _url = urlLink + "/web/loan/increase_limit";
        //post表示发送请求的方法，有get和post两种
        var _method = "POST";
        _xmlHttpRequest.open(_method, _url, true);
        _xmlHttpRequest.withCredentials = true;
        //XmlHttpRequest对象负责将用户信息以异步通信地发送到服务器端
        _xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //传输的状态，200表示已经成功了
        _xmlHttpRequest.onreadystatechange = function () {
            if (_xmlHttpRequest.readyState == 4) {
                if (_xmlHttpRequest.status == 200) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    //服务器返回的数据，就是这个responsetext，传回的信息
                    severResponse = _xmlHttpRequest.responseText;
                    //把传回的信息从json字符串，转换成json对象，并且命名为jsondata
                    var _datajson = JSON.parse(severResponse);
                    //jsondate的密码
                    switch (_datajson.code) {
                        //如果case到这个jsondata的code的值是0，那么这一次发送就是成功的
                        case 0: //OK
                            //调取本地资审核状态
//                            localStorage.int64_verify_status = _datajson.data.int64_verify_status;
                            //调取本地资料提交状态 如果成功 就返回主页面 ，改变图片变成已提交
//                            localStorage.int64_status = _datajson.data.int64_profile_status;
                            if (_datajson.data != null && _datajson.data != '' && _datajson.data != "undefined") {
                                goBack();
                            } else {
                                ShowMsg(_datajson.msg);
                            }
                            break;
                        //这种就是不成功的情况
                        case -10004:
                        case -10003:
                            session_expired(_datajson.msg);
                            break;
                        //404也是不成功的情况
                        case 404:
                        case -10002:
                            logout();
                            break;
                        default:
                            top_meassage(_datajson.msg);
                            show_topmessage();
                            break;
                    }
                }
            }
        }
        _xmlHttpRequest.send("increase_type=" + type + paraPicSrc);
    }
}


//function upImgs(type, filnameVal, $pictureBox) {
//    var upImgNum = 0;
//    var pictureBoxLen = $pictureBox.length;
//    $.ajax({
//        type: "post",
//        url: urlLink + "/web/user_profile/upload_img",
//        data: {
//            string_image_id: filnameVal,
//            int32_image_type: type
//        },
//        success: function (data) {
//            switch (data.code) {
//                //如果case到这个jsondata的code的值是0，那么这一次发送就是成功的
//                case 0: //OK
//                    upImgNum++;
//                    ShowMsg("上传成功" + upImgNum + "张");
//                    if (pictureBoxLen == upImgNum) {
//                        window.location.href = "liftLimit.html";
//                    }
//                    break;
//                //这种就是不成功的情况
////                case -10004:
//                case -10003:
//                    session_expired(data.msg);
//                    break;
//                //404也是不成功的情况
//                case 404:
//                case -10002:
//                    logout();
//                    break;
//                default:
//                    top_meassage(data.msg);
//                    show_topmessage();
//                    break;
//            }
//        },
//        error: function () {
//            ShowMsg("服务器繁忙！");
//            LoadingOver();
//        }
//    });
//}

/*sub pic load data*/
function loadwsan_datapic(pinsrc, index, thisSrc) {

    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlPicLink + "/upload/bytes";
        var _method = "POST";
        _xmlHttpRequest.open(_method, _url, true);
        _xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        _xmlHttpRequest.onreadystatechange = function () {
            if (_xmlHttpRequest.readyState == 4) {
                if (_xmlHttpRequest.status == 200) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    severResponsepic = _xmlHttpRequest.responseText;
                    var _datajsonpic = JSON.parse(severResponsepic);
                    switch (_datajsonpic.result_code) {
                        case 0: //OK
                            $(".filname-" + index).val(_datajsonpic.filename);

                            $(".backImg-" + index).hide();
                            $(".cname-" + index).attr("src", pinsrc);
                            $(".cname-" + index).parent(".content-box-right").attr("isnot", 1);
                            $(".cname-" + index).show();
                            $(".delete-" + index).show();
//                            document.querySelector(".cname" + index).src = pinsrc;
                            get_all_status(null,null,null);

                            if (thisSrc == null || thisSrc == '') {
                                addPictureBox();
                            }

                            LoadingOver();

                            break;
                        default:
                            if (_datajsonpic.error_message == "undefined") {
                                top_meassage('服务器忙，请稍后再试');
                                show_topmessage();
                            } else {
                                top_meassage(_datajsonpic.error_message);
                                show_topmessage();
                            }

                            LoadingOver();
                            break;
                    }
                }
            }
        }
        _xmlHttpRequest.send("bytes=" + pinsrc.split(",")[1] + "&type=png&encoder=urlbaes64");
    }
}