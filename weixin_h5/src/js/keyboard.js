;
(function (exports) {
    var KeyBoard = function (input, type, options) {
        var body = document.getElementsByTagName('body')[0];
        var DIV_ID = options && options.divId || '__w_l_h_v_c_z_e_r_o_divid';

        if (document.getElementById(DIV_ID)) {
            body.removeChild(document.getElementById(DIV_ID));
        }

        this.input = input;
        this.el = document.createElement('div');
        var self = this;
        var zIndex = options && options.zIndex || 9999;
        var width = options && options.width || '100%';
        var height = options && options.height || 'auto';
        var fontSize = options && options.fontSize || '15px';
        var backgroundColor = options && options.backgroundColor || '#fff';
        var TABLE_ID = options && options.table_id || 'table_0909099';
        var mobile = typeof orientation !== 'undefined';

        this.el.id = DIV_ID;
        this.el.style.position = 'fixed';
        this.el.style.left = 0;
        this.el.style.right = 0;
        this.el.style.bottom = 0;
        this.el.style.zIndex = zIndex;
        this.el.style.fontSize = "0.35rem";
        this.el.style.width = width;
        this.el.style.height = height;
        this.el.style.backgroundColor = backgroundColor;

        //样式
        var cssStr = '<style type="text/css">';
        cssStr += '#' + TABLE_ID + '{text-align:center;width:100%;height:auto;border-top:1px solid #CECDCE;background-color:#FFF;}';
        cssStr += '#' + TABLE_ID + ' td{width:33%;border:1px solid #ddd;border-right:0;border-top:0;}';
        if (!mobile) {
            cssStr += '#' + TABLE_ID + ' td:hover{background-color:#1FB9FF;color:#FFF;}';
        }
        cssStr += '#' + TABLE_ID + ' ' + 'tr{line-height:0.8rem;}';
        cssStr += '</style>';

        //Button
//        var btnStr = '<div style="width:60px;height:28px;background-color:#1FB9FF;';
//        btnStr += 'float:right;margin-right:5px;text-align:center;color:#fff;';
//        btnStr += 'line-height:28px;border-radius:3px;margin:5px 5px 5px 0;cursor:pointer;    font-size: 0.3rem;">完成</div>';

        //table
        var tableStr = '<table id="' + TABLE_ID + '" border="0" cellspacing="0" cellpadding="0">';
        tableStr += '<tr><td>1</td><td>2</td><td>3</td></tr>';
        tableStr += '<tr><td>4</td><td>5</td><td>6</td></tr>';
        tableStr += '<tr><td>7</td><td>8</td><td>9</td></tr>';
        tableStr += '<tr><td style="background-color:#D3D9DF;"></td><td>0</td>';
        tableStr += '<td style="background-color:#D3D9DF;">删除</td></tr>';
        tableStr += '</table>';
//        this.el.innerHTML = cssStr + btnStr + tableStr;
        this.el.innerHTML = cssStr + tableStr;
        function addEvent(e) {
            e.preventDefault();
            var ev = e || window.event;
            var clickEl = ev.element || ev.target;
            var value = clickEl.textContent || clickEl.innerText;
            if (clickEl.tagName.toLocaleLowerCase() === 'td' && value !== "删除") {
                if (self.input) {
                    var lenva = $("#txt_paypwd").val().length;

                    switch (vtype) {
                        case 0:
                            if (lenva < 6) {
                                $("#btnpayul").find("li").eq(lenva).html("●");
                                self.input.value += value;
                            }
                            break;
                        case 1:
                            if (lenva < 6) {
                                $("#btnpayul").find("li").eq(lenva).html("●");
                                self.input.value += value;
                                if (lenva == 5) {
                                    var opwd = $("#txt_paypwd").val();
                                    check_password(opwd);
                                }
                            }
                            break;
                        case 2:
                            if (lenva < 6) {
                                $("#btnpayul").find("li").eq(lenva).html("●");
                                self.input.value += value;
                                if (lenva == 5) {
                                    var opwd = $("#txt_paypwd").val();
                                    check_password(opwd);
                                }
                            }
                            break;
                        case 5:
                            if (lenva < 6) {
                                $("#btnpayul").find("li").eq(lenva).html("●");
                                self.input.value += value;
                                if (lenva == 5) {
                                    var $opwdn = $("#o_paypwd");
                                    var $opwd = $("#txt_paypwd");
                                    if ($opwdn.val() == "") {
                                        $(".titlent").html("请再次输入支付密码");
                                        $opwdn.val($("#txt_paypwd").val());
                                        $opwd.val("");
                                        $("#btnpayul").find("li").html("");
                                    } else {
                                        if ($opwdn.val() == $opwd.val()) {
                                            if (localStorage.int32_is_set_pay_password == 0) {
//                                                History.pushState(null, null, "add_bankcard.html?keyboard=1");
                                                set_password($opwdn.val(), type);
                                            } else {
                                                check_password($opwdn.val());
                                            }
                                        } else {
                                            $(".titlent").html("两次输入不一致，请重新输入");
                                            $opwdn.val("");
                                            $opwd.val("");
                                            $("#btnpayul").find("li").html("");
                                        }
                                    }
                                }
                            }
                            break;
                        case 6:
                            if (lenva < 6) {
                                $("#btnpayul").find("li").eq(lenva).html("●");
                                self.input.value += value;
                                if (lenva == 5) {
                                    var $opwdn = $("#o_paypwd");
                                    var $opwd = $("#txt_paypwd");
                                    if ($opwdn.val() == "") {
                                        $(".titlent").html("请再次输入支付密码");
                                        $opwdn.val($("#txt_paypwd").val());
                                        $opwd.val("");
                                        $("#btnpayul").find("li").html("");
                                    } else {
                                        if ($opwdn.val() == $opwd.val()) {
                                            if (localStorage.int32_is_set_pay_password == 1) {
                                                reset_password($opwdn.val(), $("#txt_vcode").val());
                                            }
                                        } else {
                                            $(".titlent").html("两次输入不一致，请重新设置");
                                            $opwdn.val("");
                                            $opwd.val("");
                                            $("#btnpayul").find("li").html("");
                                        }
                                    }
                                }
                            }
                            break;
                        case 9:
                            if (lenva < 6) {
                                $("#btnpayul").find("li").eq(lenva).html("●");
                                self.input.value += value;
                                if (lenva == 5) {
                                    var opwd = $("#txt_paypwd").val();
                                    Cancel_checkpassword(opwd);
                                }
                            }
                            break;
                    }
                }
            } else if (clickEl.tagName.toLocaleLowerCase() === 'div' && value === "完成") {
                body.removeChild(self.el);
            } else if (clickEl.tagName.toLocaleLowerCase() === 'td' && value === "删除") {
                var num = self.input.value;
                if (num) {
                    var newNum = num.substr(0, num.length - 1);
                    self.input.value = newNum;
                    var lenva = $("#txt_paypwd").val().length;
                    $("#btnpayul").find("li").eq(lenva).html("");
                }
            }
        }

        if (mobile) {
            this.el.ontouchstart = addEvent;
        } else {
            this.el.onclick = addEvent;
        }
        body.appendChild(this.el);
    }

    exports.KeyBoard = KeyBoard;

})(window);