!function(){function e(e,t){this.file=e,this.defaults={quality:.7,done:null,fail:null,before:null,always:null};for(var a in t)this.defaults[a]=t[a];this.defaults.quality>1&&(this.defaults.quality=1),this.results={origin:null,base64:null,base64Len:null},this.init()}window.URL=window.URL||window.webkitURL;var t=detect.parse(navigator.userAgent);e.prototype={constructor:e,init:function(){var e=this;if(void 0===window.URL||"function"!=typeof document.createElement("canvas").getContext){var t=new Error("不支持此设备");return"function"==typeof e.defaults.fail&&e.defaults.fail(t),void("function"==typeof e.defaults.always&&e.defaults.always())}e.create(e.file)},create:function(e){var a=this,i=new Image,n=a.results,s="string"==typeof e?e:URL.createObjectURL(e);i.crossOrigin="*",i.onerror=function(){return ShowMsg("图片上传只限bmp,png,gif,jpeg,jpg格式"),!1},i.onload=function(){function r(e){canvas=null,i=null,URL.revokeObjectURL(s),e.base64Len=e.base64.length,"function"==typeof a.defaults.done&&a.defaults.done(e),"function"==typeof a.defaults.always&&a.defaults.always()}EXIF.getData(i,function(){var s,l=EXIF.getTag(this,"Orientation"),h=a.resize(this,l),o=document.createElement("canvas");if(o.width=h.w,o.height=h.h,s=o.getContext("2d"),s.fillStyle="#fff",s.fillRect(0,0,h.w,h.h),n.origin=e,"iOS"===t.os.family&&parseInt(t.os.version)<8){var w=new MegaPixImage(i);"5678".indexOf(l)>-1?w.render(o,{width:o.height,height:o.width,orientation:l}):w.render(o,{width:o.width,height:o.height,orientation:l}),n.base64=o.toDataURL("image/png",a.defaults.quality),r(n)}else{switch(l){case 3:s.rotate(180*Math.PI/180),s.drawImage(i,-h.w,-h.h,h.w,h.h);break;case 6:s.rotate(90*Math.PI/180),s.drawImage(i,0,-h.w,h.h,h.w);break;case 8:s.rotate(270*Math.PI/180),s.drawImage(i,-h.h,0,h.h,h.w);break;case 2:s.translate(h.w,0),s.scale(-1,1),s.drawImage(i,0,0,h.w,h.h);break;case 4:s.translate(h.w,0),s.scale(-1,1),s.rotate(180*Math.PI/180),s.drawImage(i,-h.w,-h.h,h.w,h.h);break;case 5:s.translate(h.w,0),s.scale(-1,1),s.rotate(90*Math.PI/180),s.drawImage(i,0,-h.w,h.h,h.w);break;case 7:s.translate(h.w,0),s.scale(-1,1),s.rotate(270*Math.PI/180),s.drawImage(i,-h.h,0,h.h,h.w);break;default:s.drawImage(i,0,0,h.w,h.h)}if("Android"===t.os.family&&t.os.version.slice(0,3)<4.5){var f=new JPEGEncoder;n.base64=f.encode(s.getImageData(0,0,o.width,o.height),100*a.defaults.quality)}else n.base64=o.toDataURL("image/png",a.defaults.quality);r(n)}})},"function"==typeof this.defaults.before&&this.defaults.before(),i.src=s},resize:function(e,t){var a=this.defaults.width,i=this.defaults.height,n={w:e.width,h:e.height};"5678".indexOf(t)>-1&&(n.w=e.height,n.h=e.width);var s=n.w/n.h;return a&&i?s>=a/i?n.w>a&&(n.w=a,n.h=Math.ceil(a/s)):n.h>i&&(n.h=i,n.w=Math.ceil(i*s)):a?(n.w=a,n.h=Math.ceil(a/s)):i&&(n.w=Math.ceil(i*s),n.h=i),(n.w>=3264||n.h>=2448)&&(n.w*=.8,n.h*=.8),n}},window.lrz=function(t,a){return new e(t,a)}}();