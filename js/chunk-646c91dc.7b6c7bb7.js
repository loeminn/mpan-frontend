(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-646c91dc"],{"422c":function(e,t,n){},4824:function(e,t,n){},"56b3":function(e,t,n){},6198:function(e,t,n){},"727e":function(e,t,n){},"7bc3":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),s=Object(a["J"])("data-v-49141905");Object(a["t"])("data-v-49141905");var i={class:"share-content"};Object(a["r"])();var c=s((function(e,t,n,s,c,r){var o=Object(a["y"])("loading-mask"),u=Object(a["y"])("share-no-exists"),l=Object(a["y"])("share-validation"),f=Object(a["y"])("share-content-home");return Object(a["q"])(),Object(a["e"])("div",i,[c.isLoading?(Object(a["q"])(),Object(a["e"])(o,{key:0})):c.noExists?(Object(a["q"])(),Object(a["e"])(u,{key:1})):0!==c.shareInfo.isPublic||c.isVerify?(Object(a["q"])(),Object(a["e"])(f,{key:3,"share-info":c.shareInfo},null,8,["share-info"])):(Object(a["q"])(),Object(a["e"])(l,{key:2,"share-info":c.shareInfo,onChangeVerifyStatus:r.changeVerifyStatus},null,8,["share-info","onChangeVerifyStatus"]))])})),r=n("1da1"),o=(n("96cf"),n("d3b7"),Object(a["J"])("data-v-ffde5580"));Object(a["t"])("data-v-ffde5580");var u={class:"share-validation"},l={class:"validation-box"},f={class:"share-info"},h={class:"avatar"},d={class:"user-name"},b=Object(a["h"])("div",{class:"share-text"},"分享的文件",-1),j={class:"verify-form"},O=Object(a["h"])("div",{class:"verify-form-label"},"请输入提取码：",-1),v={class:"verify-form-body"},m=Object(a["g"])("提取文件"),p=Object(a["h"])("div",{class:"cloud-bg"},null,-1);Object(a["r"])();var g=o((function(e,t,n,s,i,c){var r=Object(a["y"])("m-input"),g=Object(a["y"])("m-form-item"),y=Object(a["y"])("m-form"),k=Object(a["y"])("m-button");return Object(a["q"])(),Object(a["e"])("div",u,[Object(a["h"])("div",l,[Object(a["h"])("div",f,[Object(a["h"])("div",h,[Object(a["h"])("img",{src:c.showAvatar},null,8,["src"])]),Object(a["h"])("div",null,[Object(a["h"])("div",d,Object(a["A"])(n.shareInfo.userName),1),b])]),Object(a["h"])("div",j,[O,Object(a["h"])("div",v,[Object(a["h"])(y,{ref:"verifyForm",model:i.form,rules:i.formRules},{default:o((function(){return[Object(a["h"])(g,{prop:"accessCode"},{default:o((function(){return[Object(a["h"])(r,{modelValue:i.form.accessCode,"onUpdate:modelValue":t[1]||(t[1]=function(e){return i.form.accessCode=e})},null,8,["modelValue"])]})),_:1})]})),_:1},8,["model","rules"]),Object(a["h"])(k,{onClick:t[2]||(t[2]=function(e){return c.extractFiles("verifyForm")})},{default:o((function(){return[m]})),_:1})])])]),p])})),y=n("6db1"),k=n("ab0b"),I=n("2746"),L=n("e6f9"),x=n("42e8"),C=n("acd9");n("ac1f"),n("1276"),n("159b");function w(e,t,n){var a=new Date;a.setTime(a.getTime()+6e4*n),document.cookie=e+"="+t+";expires="+a.toUTCString()}function $(e){var t=null,n=document.cookie.split("; ");return n.forEach((function(n){var a=n.split("=");if(e===a[0])return t=a[1],null})),t}var T={name:"ShareValidation",components:{MForm:x["a"],MFormItem:L["a"],MButton:I["a"],MInput:k["a"]},props:{shareInfo:Object},data:function(){return{form:{accessCode:""},formRules:{accessCode:[{required:!0,message:"请输入提取码"}]}}},computed:{showAvatar:function(){return this.shareInfo.userAvatar?Object(y["a"])(this.shareInfo.userAvatar):y["d"].defaultAvatar}},methods:{extractFiles:function(e){var t=this;this.$refs[e].validate((function(e){if(e){var n=t.$message.loading("正在提取","extractFiles");Object(C["i"])(t.shareInfo.id,t.form.accessCode).then((function(e){n(),w(t.shareInfo.id,e.data.shareToken,120),sessionStorage.setItem("shareToken",e.data.shareToken),t.$emit("changeVerifyStatus",!0)})).catch((function(e){t.$message.error(e.msg,1500,"extractFiles")}))}}))}}};n("9f16"),n("839a");T.render=g,T.__scopeId="data-v-ffde5580";var S=T,_=n("e0ad"),q=Object(a["J"])("data-v-4c7dd3a4");Object(a["t"])("data-v-4c7dd3a4");var A={class:"share-no-exists"},M=Object(a["h"])("div",{class:"img-box"},[Object(a["h"])("img",{src:"https://lm-icon.oss-cn-shenzhen.aliyuncs.com/mpan/file-icon/link-invalid.png"})],-1),F={class:"tip"},V=Object(a["h"])("div",{class:"text"}," 分享链接不存在或已过期 ",-1);Object(a["r"])();var E=q((function(e,t,n,s,i,c){return Object(a["q"])(),Object(a["e"])("div",A,[M,Object(a["h"])("div",F,[V,Object(a["h"])("div",null,[Object(a["h"])("div",{class:"action",onClick:t[1]||(t[1]=function(t){return e.$router.back()})},"回到上一页"),Object(a["h"])("div",{class:"action",onClick:t[2]||(t[2]=function(t){return e.$router.push("/")})},"回到首页")])])])})),D={name:"ShareNoExists"};n("c8b6");D.render=E,D.__scopeId="data-v-4c7dd3a4";var J=D,P=Object(a["J"])("data-v-d537f51a");Object(a["t"])("data-v-d537f51a");var z={class:"share-content-home"},R={class:"main"},U=Object(a["g"])("取消"),H=Object(a["g"])("保存到此");Object(a["r"])();var N=P((function(e,t,n,s,i,c){var r=Object(a["y"])("share-content-header"),o=Object(a["y"])("file-list-main"),u=Object(a["y"])("loading-mask"),l=Object(a["y"])("file-list-empty"),f=Object(a["y"])("file-list-table"),h=Object(a["y"])("dir-list"),d=Object(a["y"])("m-button"),b=Object(a["y"])("modal");return Object(a["q"])(),Object(a["e"])("div",z,[Object(a["h"])("div",R,[Object(a["h"])(r,{shareInfo:n.shareInfo,onSave:c.openSaveModal,onDownload:c.getDownloadUrl},null,8,["shareInfo","onSave","onDownload"]),Object(a["h"])(o,{"root-path":e.$route.path,title:"全部文件","file-length":i.fileList.length},null,8,["root-path","file-length"]),i.isLoading?(Object(a["q"])(),Object(a["e"])(u,{key:0})):0===i.fileList.length?(Object(a["q"])(),Object(a["e"])(l,{key:1,"has-upload":!1})):(Object(a["q"])(),Object(a["e"])(f,{key:2,"file-list":i.fileList,selectList:i.selectList,"onUpdate:selectList":t[1]||(t[1]=function(e){return i.selectList=e})},null,8,["file-list","selectList"])),Object(a["h"])(b,{title:"保存到",ref:"saveModal"},{body:P((function(){return[Object(a["h"])(h,{ref:"saveDirList","empty-text":"保存到此文件夹"},null,512)]})),footer:P((function(){return[Object(a["h"])(d,{type:"secondary",onClick:t[2]||(t[2]=function(t){return e.$refs.saveModal.close()})},{default:P((function(){return[U]})),_:1}),Object(a["h"])(d,{onClick:c.save},{default:P((function(){return[H]})),_:1},8,["onClick"])]})),_:1},512)])])})),B=n("53ca"),G=n("b85c"),W=(n("7db0"),n("2ca0"),n("b0c0"),Object(a["J"])("data-v-249c66d9"));Object(a["t"])("data-v-249c66d9");var K={class:"share-content-header"},Q={class:"share-info"},X={class:"main"},Y={class:"name-info"},Z={class:"name-text"},ee={class:"action"},te=Object(a["g"])("保存到网盘"),ne=Object(a["g"])("下载"),ae={class:"other-info"},se={class:"item"},ie=Object(a["h"])("span",null,[Object(a["h"])("svg",{class:"icon","aria-hidden":"true"},[Object(a["h"])("use",{"xlink:href":"#icon-shizhong"})])],-1),ce={class:"item"},re=Object(a["h"])("span",null,"过期时间：",-1),oe={key:0},ue={key:1},le={key:2,class:"expiring-soon"},fe={class:"user-info item"},he={class:"info-text"};Object(a["r"])();var de=W((function(e,t,n,s,i,c){var r=Object(a["y"])("m-button");return Object(a["q"])(),Object(a["e"])("div",K,[Object(a["h"])("div",Q,[Object(a["h"])("div",X,[Object(a["h"])("div",Y,[Object(a["h"])("img",{src:c.shareIcon},null,8,["src"]),Object(a["h"])("div",Z,Object(a["A"])(n.shareInfo.name),1)]),Object(a["h"])("div",ee,[Object(a["h"])(r,{icon:"wenjian_zhuancun",type:"secondary",onClick:c.saveClick},{default:W((function(){return[te]})),_:1},8,["onClick"]),Object(a["h"])(r,{icon:"download",type:"secondary",onClick:c.downloadClick},{default:W((function(){return[ne]})),_:1},8,["onClick"])])]),Object(a["h"])("div",ae,[Object(a["h"])("div",se,[ie,Object(a["g"])(" "+Object(a["A"])(c.createTime),1)]),Object(a["h"])("div",ce,[re,n.shareInfo.expiryTime?c.expiryTime?(Object(a["q"])(),Object(a["e"])("span",ue,Object(a["A"])(c.expiryTime)+"后",1)):(Object(a["q"])(),Object(a["e"])("span",le,"即将失效")):(Object(a["q"])(),Object(a["e"])("span",oe,"永久有效"))]),Object(a["h"])("div",fe,[Object(a["h"])("img",{src:c.userAvatar},null,8,["src"]),Object(a["h"])("div",he,Object(a["A"])(n.shareInfo.userName),1)])])])])})),be=n("73df"),je={name:"ShareContentHeader",components:{MButton:I["a"]},props:{shareInfo:Object},methods:{saveClick:function(){this.$emit("save")},downloadClick:function(){this.$emit("download")}},computed:{shareIcon:function(){return y["d"].shareIcon},userAvatar:function(){return this.shareInfo.userAvatar?Object(y["a"])(this.shareInfo.userAvatar):y["d"].defaultAvatar},createTime:function(){return Object(be["c"])(this.shareInfo.createTime)},expiryTime:function(){return Object(be["a"])(this.shareInfo.expiryTime)}}};n("d768");je.render=de,je.__scopeId="data-v-249c66d9";var Oe=je,ve=n("ff9c"),me=n("90d1"),pe=n("b2a2"),ge=n("385f"),ye=n("ebff"),ke={name:"ShareContentHome",components:{FileListEmpty:ye["a"],MButton:I["a"],DirList:ge["a"],Modal:pe["a"],LoadingMask:_["a"],FileListTable:me["a"],FileListMain:ve["a"],ShareContentHeader:Oe},props:{shareInfo:Object},data:function(){return{fileList:[],selectList:[],isLoading:!0}},methods:{loadFileList:function(){var e=this;this.isLoading=!0,this.fileList=[],this.selectList=[],Object(C["e"])(this.$route.query.path||"/").then((function(t){e.fileList=t.data,e.isLoading=!1}))},save:function(){var e=this;this.$refs.saveModal.close(),this.$message.loading("文件保存中","save"),Object(C["h"])(this.selectList,this.$refs.saveDirList.path).then((function(){e.$message.success("文件保存成功",1500,"save")})).catch((function(t){e.$message.error(t.msg,1500,"save")}))},openSaveModal:function(){if(0!==this.selectList.length){var e=localStorage.getItem("authorization");e?this.$refs.saveModal.open():this.$modal.confirm({title:"提示",content:"未登录，请先登录",icon:"info",okText:"去登陆",closeIcon:!0,lossFocusClose:!0,onOk:function(){location.href="/auth"}})}else this.$message.info("请先选择文件")},getDownloadUrl:function(){var e=this;if(0!==this.selectList.length){var t,n=Object(G["a"])(this.selectList);try{var a=function(){var n=t.value,a=e.fileList.find((function(e){return e.id===n}));if(1===a.isDir)return e.$message.warning("暂不支持文件夹下载"),{v:void 0}};for(n.s();!(t=n.n()).done;){var s=a();if("object"===Object(B["a"])(s))return s.v}}catch(i){n.e(i)}finally{n.f()}this.selectList.length>10?this.$message.info("一次下载请求最多包含10个文件"):Object(C["d"])(this.selectList).then((function(t){t.data.forEach((function(t){e.download(t)}))})).catch((function(t){e.$message.error(t.msg)}))}else this.$message.info("请先选择文件")},download:function(e){var t=document.createElement("iframe");t.setAttribute("style","display: none"),t.setAttribute("src",e),document.body.appendChild(t),setTimeout((function(){t.remove()}),1e3)}},watch:{$route:{handler:function(){this.$route.path.startsWith("/s/")&&this.loadFileList()}}},mounted:function(){this.loadFileList()}};n("b9ec");ke.render=N,ke.__scopeId="data-v-d537f51a";var Ie=ke,Le={name:"ShareContent",components:{ShareContentHome:Ie,ShareNoExists:J,LoadingMask:_["a"],ShareValidation:S},data:function(){return{shareInfo:{},isLoading:!0,noExists:!1,isVerify:!1}},methods:{changeVerifyStatus:function(e){this.isVerify=e},isPublicGetToken:function(){var e=this;return Object(C["i"])(this.shareInfo.id,null).then((function(t){w(e.shareInfo.id,t.data.shareToken,120),sessionStorage.setItem("shareToken",t.data.shareToken)})).catch((function(){Promise.reject()}))},checkExistingToken:function(){var e=this;return Object(C["b"])(this.shareInfo.id).then((function(){e.isVerify=!0,e.isLoading=!1,Promise.resolve(!0)})).catch((function(){w(e.shareInfo.id,"",new Date(1)),sessionStorage.removeItem("shareToken"),Promise.resolve(!1)}))},shareInitialization:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(C["f"])(e.$route.params.shortLink).then(function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(n){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.shareInfo=n.data,a=$(n.data.id),!a){t.next=9;break}return sessionStorage.setItem("shareToken",a),t.next=6,e.checkExistingToken();case 6:if(s=t.sent,!s){t.next=9;break}return t.abrupt("return");case 9:if(1!==e.shareInfo.isPublic){t.next=12;break}return t.next=12,e.isPublicGetToken();case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){-401===t.code?e.noExists=!0:e.$message.error(t.msg)}));case 2:e.isLoading=!1;case 3:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.shareInitialization()}};n("a6f8");Le.render=c,Le.__scopeId="data-v-49141905";t["default"]=Le},"839a":function(e,t,n){"use strict";n("727e")},"8df2":function(e,t,n){},"9f16":function(e,t,n){"use strict";n("56b3")},a6f8:function(e,t,n){"use strict";n("6198")},b9ec:function(e,t,n){"use strict";n("422c")},c8b6:function(e,t,n){"use strict";n("8df2")},d768:function(e,t,n){"use strict";n("4824")}}]);
//# sourceMappingURL=chunk-646c91dc.7b6c7bb7.js.map