(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0881b895"],{"0109":function(e,t,i){},"122e":function(e,t,i){"use strict";i.r(t);var s=i("7a23"),l={class:"file-list"},c={key:2,style:{height:"calc(100% - 78px)"}},n={key:3,style:{height:"calc(100% - 78px)"}};function a(e,t,i,a,o,h){var r=Object(s["y"])("file-list-tool-bar"),u=Object(s["y"])("file-list-main"),d=Object(s["y"])("loading-mask"),b=Object(s["y"])("file-list-empty"),f=Object(s["y"])("search-file-list"),O=Object(s["y"])("file-list-table");return Object(s["q"])(),Object(s["e"])("div",l,[Object(s["h"])(r,{"select-list":o.selectList,"file-list":o.fileList,onLoading:h.loadingStatus},null,8,["select-list","file-list","onLoading"]),Object(s["h"])(u,{title:"全部文件","root-path":"/","file-length":o.fileList.length,total:o.total,"is-search":o.isSearch},null,8,["file-length","total","is-search"]),o.isLoading?(Object(s["q"])(),Object(s["e"])(d,{key:0})):0!==o.fileList.length||o.newDir?o.isSearch?(Object(s["q"])(),Object(s["e"])("div",c,[Object(s["h"])(f,{"file-list":o.fileList,selectList:o.selectList,"onUpdate:selectList":t[1]||(t[1]=function(e){return o.selectList=e}),onBottomLoading:h.searchBottomLoading,bottomLoadingStatus:o.bottomLoadingStatus,style:{height:"100%"}},null,8,["file-list","selectList","onBottomLoading","bottomLoadingStatus"])])):(Object(s["q"])(),Object(s["e"])("div",n,[Object(s["h"])(O,{ref:"fileList","file-list":o.fileList,"create-dir":o.newDir,selectList:o.selectList,"onUpdate:selectList":t[2]||(t[2]=function(e){return o.selectList=e}),onBottomLoading:h.bottomLoading,bottomLoadingStatus:o.bottomLoadingStatus,style:{height:"100%"}},null,8,["file-list","create-dir","selectList","onBottomLoading","bottomLoadingStatus"])])):(Object(s["q"])(),Object(s["e"])(b,{key:1}))])}var o=i("2909"),h=(i("ac1f"),i("841c"),i("9df6")),r=i("ff9c"),u=i("90d1"),d=i("3f5e"),b=i("e0ad"),f=i("ebff"),O=i("2746"),j=i("af45"),m=Object(s["J"])("data-v-07b5b3f8");Object(s["t"])("data-v-07b5b3f8");var p={class:"file-list-table"},L={class:"header"},g=Object(s["h"])("colgroup",null,[Object(s["h"])("col",{style:{width:"6%","min-width":"40px"}}),Object(s["h"])("col",{style:{width:"37%"}}),Object(s["h"])("col",{style:{width:"20%"}}),Object(s["h"])("col",{style:{width:"20%"}}),Object(s["h"])("col",{style:{width:"17%"}})],-1),y={class:"is-select"},I={key:0},v={key:1},k=Object(s["h"])("th",null,[Object(s["h"])("span",null,"上传时间")],-1),S=Object(s["h"])("th",null,[Object(s["h"])("span",null,"大小")],-1),$=Object(s["h"])("th",null,[Object(s["h"])("span",null,"所在目录")],-1),w=Object(s["h"])("colgroup",null,[Object(s["h"])("col",{style:{width:"6%","min-width":"40px"}}),Object(s["h"])("col",{style:{width:"37%"}}),Object(s["h"])("col",{style:{width:"20%"}}),Object(s["h"])("col",{style:{width:"20%"}}),Object(s["h"])("col",{style:{width:"17%"}})],-1);Object(s["r"])();var q=m((function(e,t,i,l,c,n){var a=Object(s["y"])("m-checkbox"),o=Object(s["y"])("search-file-item"),h=Object(s["y"])("loading-new-data");return Object(s["q"])(),Object(s["e"])("div",p,[Object(s["h"])("div",L,[Object(s["h"])("table",null,[g,Object(s["h"])("thead",null,[Object(s["h"])("tr",null,[Object(s["h"])("th",y,[Object(s["h"])(a,{modelValue:c.allChecked,"onUpdate:modelValue":t[1]||(t[1]=function(e){return c.allChecked=e}),onClickInput:n.selectAll},null,8,["modelValue","onClickInput"])]),Object(s["h"])("th",null,[0===i.selectList.length?(Object(s["q"])(),Object(s["e"])("span",I,"文件名")):(Object(s["q"])(),Object(s["e"])("span",v,"已选中"+Object(s["A"])(i.selectList.length)+"个文件/文件夹",1))]),k,S,$])])])]),Object(s["h"])("div",{class:"body",ref:"fileBody",onScroll:t[3]||(t[3]=function(){return n.bottomLoading&&n.bottomLoading.apply(n,arguments)})},[Object(s["h"])("table",null,[w,Object(s["h"])("tbody",null,[(Object(s["q"])(!0),Object(s["e"])(s["a"],null,Object(s["w"])(i.fileList,(function(e){return Object(s["q"])(),Object(s["e"])(o,{"file-info":e,selectList:i.selectList,"onUpdate:selectList":[t[2]||(t[2]=function(e){return i.selectList=e}),n.changeSelectList]},null,8,["file-info","selectList","onUpdate:selectList"])})),256))])]),i.bottomLoadingStatus?(Object(s["q"])(),Object(s["e"])(h,{key:0})):Object(s["f"])("",!0)],544)])})),x=(i("d81d"),i("ecff")),F=i("d79e"),C=i("7de5"),T=Object(s["J"])("data-v-0d3f0b2e");Object(s["t"])("data-v-0d3f0b2e");var R={class:"is-select"},D={class:"list-name"},A={class:"edit-action"},B=Object(s["h"])("svg",{class:"icon","aria-hidden":"true"},[Object(s["h"])("use",{"xlink:href":"#icon-dui"})],-1),V=Object(s["h"])("svg",{class:"icon","aria-hidden":"true"},[Object(s["h"])("use",{"xlink:href":"#icon-quxiao"})],-1),N={key:0},U={key:1};Object(s["r"])();var M=T((function(e,t,i,l,c,n){var a=Object(s["y"])("m-checkbox"),o=Object(s["y"])("m-input");return Object(s["q"])(),Object(s["e"])("tr",{onClick:t[10]||(t[10]=function(e){return n.selectThis()}),onDblclick:t[11]||(t[11]=function(){return n.openFile&&n.openFile.apply(n,arguments)}),class:{selected:-1!==i.selectList.indexOf(i.fileInfo.id)}},[Object(s["h"])("td",R,[Object(s["h"])(a,{value:i.fileInfo.id,modelValue:i.selectList,"onUpdate:modelValue":[t[1]||(t[1]=function(e){return i.selectList=e}),n.changeSelectList]},null,8,["value","modelValue","onUpdate:modelValue"])]),Object(s["h"])("td",null,[Object(s["h"])("span",D,[Object(s["h"])("img",{src:n.fileIcon},null,8,["src"]),c.isRenamed?(Object(s["q"])(),Object(s["e"])("span",{key:0,class:"edit-item",onClick:t[7]||(t[7]=Object(s["I"])((function(){}),["stop"]))},[Object(s["h"])(o,{modelValue:c.fileRenamed,"onUpdate:modelValue":t[2]||(t[2]=function(e){return c.fileRenamed=e})},null,8,["modelValue"]),Object(s["h"])("span",A,[Object(s["h"])("span",{onClick:t[3]||(t[3]=Object(s["I"])((function(){return n.checkRenamed&&n.checkRenamed.apply(n,arguments)}),["stop"])),onDblclick:t[4]||(t[4]=Object(s["I"])((function(){}),["stop"]))},[B],32),Object(s["h"])("span",{onClick:t[5]||(t[5]=Object(s["I"])((function(){return n.cancelRenamed&&n.cancelRenamed.apply(n,arguments)}),["stop"])),onDblclick:t[6]||(t[6]=Object(s["I"])((function(){}),["stop"]))},[V],32)])])):(Object(s["q"])(),Object(s["e"])("span",{key:1,class:"text",title:i.fileInfo.fileName,onClick:t[8]||(t[8]=Object(s["I"])((function(){return n.openFile&&n.openFile.apply(n,arguments)}),["stop"]))},Object(s["A"])(i.fileInfo.fileName),9,["title"]))])]),Object(s["h"])("td",null,Object(s["A"])(n.createTime),1),Object(s["h"])("td",null,[1===i.fileInfo.isDir?(Object(s["q"])(),Object(s["e"])("span",N,"-")):(Object(s["q"])(),Object(s["e"])("span",U,Object(s["A"])(n.fileSize(i.fileInfo.size)),1))]),Object(s["h"])("td",null,[Object(s["h"])("span",{title:i.fileInfo.path,onClick:t[9]||(t[9]=function(t){return e.$router.push({path:"",query:{path:i.fileInfo.path}})}),style:{"text-decoration":"underline",color:"#05082c",cursor:"pointer"}},Object(s["A"])(n.filePath),9,["title"])])],34)})),_=(i("1276"),i("caad"),i("2532"),i("a434"),i("498a"),i("6db1")),J=i("73df"),z=i("41dc"),H=i("ab0b"),E={name:"SearchFileItem",components:{MInput:H["a"],MCheckbox:C["a"]},props:{fileInfo:Object,selectList:Array},data:function(){return{timeoutID:null,isRenamed:!1,fileRenamed:null}},computed:{fileIcon:function(){return Object(_["b"])(this.fileInfo)},createTime:function(){return Object(J["c"])(this.fileInfo.createTime)},filePath:function(){if("/"===this.fileInfo.path)return"全部文件";var e=this.fileInfo.path.split("/");return e[e.length-1]}},methods:{selectThis:function(){var e=this;clearTimeout(this.timeoutID),this.timeoutID=setTimeout((function(){var t=e.selectList;t.includes(e.fileInfo.id)?t.splice(t.indexOf(e.fileInfo.id),1):t.push(e.fileInfo.id),e.$emit("update:selectList",t)}),200)},fileSize:function(e){return Object(z["a"])(e)},changeSelectList:function(e){this.$emit("update:selectList",e)},openFile:function(){if(clearTimeout(this.timeoutID),1===this.fileInfo.isDir){var e=this.$route.query.path||"";e=e+"/"+this.fileInfo.fileName,this.$router.push({path:"",query:{path:e}})}else this.$message.info("暂不支持预览此文件")},rename:function(){var e=this;this.fileRenamed!==this.fileInfo.fileName?(this.$message.loading("文件名修改中","rename"),Object(d["g"])(this.fileRenamed,this.fileInfo.id).then((function(t){e.$message.success("文件名修改成功",1500,"rename"),e.fileInfo.fileName=e.fileRenamed,e.isRenamed=!1})).catch((function(t){e.$message.error(t.msg,1500,"rename")}))):this.isRenamed=!1},checkRenamed:function(){if(0!==this.fileRenamed.length){for(var e=["?","*","<",">",":",'"',"\\","/","|"],t=0,i=e;t<i.length;t++){var s=i[t];if(-1!==this.fileRenamed.indexOf(s))return void this.$message.error("文件名不能包含以下字符 < >丨* ? \\ /")}this.fileRenamed=this.fileRenamed.trim(),this.fileRenamed.length>255?this.$message.error("文件名长度不能超过255字节"):this.rename()}else this.$message.error("文件名不能为空")},cancelRenamed:function(){this.isRenamed=!1,this.fileRenamed=this.fileInfo.fileName}},mounted:function(){var e=this;this.fileRenamed=this.fileInfo.fileName,this.$bus.on("openRenamed",(function(t){e.isRenamed=e.fileInfo.id===t}))},beforeUnmount:function(){this.$bus.all.delete("openRenamed")}};E.render=M,E.__scopeId="data-v-0d3f0b2e";var P=E,G={name:"SearchFileList",components:{SearchFileItem:P,MCheckbox:C["a"],FileListBodyItem:F["a"],LoadingNewData:x["a"]},methods:{changeSelectList:function(e){this.$emit("update:selectList",e),this.allChecked=this.selectList.length===this.fileList.length},selectAll:function(e){if(e){var t=this.fileList.map((function(e){return e.id}));this.$emit("update:selectList",t)}else this.$emit("update:selectList",[])},bottomLoading:function(){var e=this.$refs.fileBody.scrollTop,t=this.$refs.fileBody.clientHeight,i=this.$refs.fileBody.scrollHeight;e+t>i-200&&this.$emit("bottomLoading")}},props:{fileList:{type:Array},selectList:Array,bottomLoadingStatus:Boolean},data:function(){return{allChecked:!1}}};G.render=q,G.__scopeId="data-v-07b5b3f8";var K=G,Q={name:"AllFile",components:{SearchFileList:K,ShareFileList:j["a"],MButton:O["a"],FileListEmpty:f["a"],LoadingMask:b["a"],FileListTable:u["a"],FileListMain:r["a"],FileListToolBar:h["a"]},data:function(){return{fileList:[],selectList:[],isLoading:!0,refresh:null,newDir:!1,bottomLoadingStatus:!1,pageNum:1,total:0,isSearch:!1}},methods:{loadFileList:function(){var e=this;this.newDir=!1,this.isLoading=!0,this.fileList=[],this.selectList=[],this.$bus.emit("toggleCreateDirItem",!1),Object(d["j"])(this.$route.query.path||"/",1).then((function(t){e.pageNum=t.data.current,e.fileList=t.data.records,e.total=t.data.total,e.isLoading=!1}))},loadSearchFile:function(){var e=this;this.newDir=!1,this.isLoading=!0,this.fileList=[],this.selectList=[],this.$bus.emit("toggleCreateDirItem",!1),Object(d["n"])(this.$route.query.search,1).then((function(t){e.pageNum=t.data.current,e.fileList=t.data.records,e.total=t.data.total,e.isLoading=!1}))},loadingStatus:function(e){this.isLoading=e},bottomLoading:function(){var e=this;this.fileList.length<this.total&&(this.bottomLoadingStatus||(this.bottomLoadingStatus=!0,Object(d["j"])(this.$route.query.path||"/",++this.pageNum).then((function(t){var i;e.pageNum=t.data.current,(i=e.fileList).push.apply(i,Object(o["a"])(t.data.records)),e.total=t.data.total,e.bottomLoadingStatus=!1}))))},searchBottomLoading:function(){var e=this;this.fileList.length<this.total&&(this.bottomLoadingStatus||(this.bottomLoadingStatus=!0,Object(d["n"])(this.$route.query.search,++this.pageNum).then((function(t){var i;e.pageNum=t.data.current,(i=e.fileList).push.apply(i,Object(o["a"])(t.data.records)),e.total=t.data.total,e.bottomLoadingStatus=!1}))))}},watch:{$route:{handler:function(){"/"===this.$route.path&&(this.$route.query.search?(this.isSearch=!0,this.loadSearchFile()):(this.isSearch=!1,this.loadFileList()))}}},created:function(){this.$route.query.search&&(this.isSearch=!0)},mounted:function(){var e=this;this.isSearch?this.loadSearchFile():this.loadFileList(),this.$route.query.search?this.isSearch=!0:this.loadFileList(),this.$bus.on("loadFileList",(function(){e.loadFileList()})),this.$bus.on("refreshFileList",(function(t){clearTimeout(e.refresh),e.refresh=setTimeout((function(){e.isSearch||t!==(e.$route.query.path||"/")||e.loadFileList()}),1500)})),this.$bus.on("toggleCreateDirItem",(function(t){e.newDir=t,t&&setTimeout((function(){e.$refs.fileList.$refs.fileBody.scrollTo(0,0)}),100)}))},beforeUnmount:function(){this.$bus.all.delete("loadFileList"),this.$bus.all.delete("refreshFileList"),this.$bus.all.delete("toggleCreateDirItem")}};Q.render=a;t["default"]=Q},"15d1":function(e,t,i){"use strict";i("0109")},af45:function(e,t,i){"use strict";var s=i("7a23"),l=Object(s["J"])("data-v-526c3129");Object(s["t"])("data-v-526c3129");var c={class:"file-list-table"},n={class:"header"},a=Object(s["h"])("colgroup",null,[Object(s["h"])("col",{style:{width:"3%","min-width":"40px"}}),Object(s["h"])("col",{style:{width:"50%"}}),Object(s["h"])("col",{style:{width:"15%"}}),Object(s["h"])("col",{style:{width:"15%"}}),Object(s["h"])("col",{style:{width:"15%"}})],-1),o={class:"is-select"},h={key:0},r={key:1},u=Object(s["h"])("th",null,[Object(s["h"])("span",null,"分享时间")],-1),d=Object(s["h"])("th",null,[Object(s["h"])("span",null,"状态")],-1),b=Object(s["h"])("th",null,[Object(s["h"])("span",null,"保存次数")],-1),f=Object(s["h"])("colgroup",null,[Object(s["h"])("col",{style:{width:"3%","min-width":"40px"}}),Object(s["h"])("col",{style:{width:"50%"}}),Object(s["h"])("col",{style:{width:"15%"}}),Object(s["h"])("col",{style:{width:"15%"}}),Object(s["h"])("col",{style:{width:"15%"}})],-1);Object(s["r"])();var O=l((function(e,t,i,l,O,j){var m=Object(s["y"])("m-checkbox"),p=Object(s["y"])("share-file-list-item"),L=Object(s["y"])("loading-new-data");return Object(s["q"])(),Object(s["e"])("div",c,[Object(s["h"])("div",n,[Object(s["h"])("table",null,[a,Object(s["h"])("thead",null,[Object(s["h"])("tr",null,[Object(s["h"])("th",o,[Object(s["h"])(m,{modelValue:O.allChecked,"onUpdate:modelValue":t[1]||(t[1]=function(e){return O.allChecked=e}),onClickInput:j.selectAll},null,8,["modelValue","onClickInput"])]),Object(s["h"])("th",null,[0===i.selectList.length?(Object(s["q"])(),Object(s["e"])("span",h,"分享文件")):(Object(s["q"])(),Object(s["e"])("span",r,"已选中"+Object(s["A"])(i.selectList.length)+"条分享记录",1))]),u,d,b])])])]),Object(s["h"])("div",{class:"body",ref:"fileBody",onScroll:t[3]||(t[3]=function(){return j.bottomLoading&&j.bottomLoading.apply(j,arguments)})},[Object(s["h"])("table",null,[f,Object(s["h"])("tbody",null,[(Object(s["q"])(!0),Object(s["e"])(s["a"],null,Object(s["w"])(i.shareList,(function(e){return Object(s["q"])(),Object(s["e"])(p,{"share-info":e,selectList:i.selectList,"onUpdate:selectList":[t[2]||(t[2]=function(e){return i.selectList=e}),j.changeSelectList]},null,8,["share-info","selectList","onUpdate:selectList"])})),256))])]),i.bottomLoadingStatus?(Object(s["q"])(),Object(s["e"])(L,{key:0})):Object(s["f"])("",!0)],544)])})),j=(i("d81d"),i("7de5")),m=(i("b0c0"),Object(s["J"])("data-v-736e58d4"));Object(s["t"])("data-v-736e58d4");var p={class:"is-select"},L={class:"list-name"},g={class:"share-create-time"},y={class:"share-code"},I={key:0},v={key:1},k={key:0},S={key:1},$={key:2,class:"expiring-soon"},w={key:3,class:"expiring-soon"};Object(s["r"])();var q=m((function(e,t,i,l,c,n){var a=Object(s["y"])("m-checkbox");return Object(s["q"])(),Object(s["e"])("tr",{onClick:t[2]||(t[2]=function(e){return n.selectThis()}),class:["share-item",{selected:-1!==i.selectList.indexOf(i.shareInfo.id)}]},[Object(s["h"])("td",p,[Object(s["h"])(a,{value:i.shareInfo.id,modelValue:i.selectList,"onUpdate:modelValue":[t[1]||(t[1]=function(e){return i.selectList=e}),n.changeSelectList]},null,8,["value","modelValue","onUpdate:modelValue"])]),Object(s["h"])("td",null,[Object(s["h"])("span",L,[Object(s["h"])("img",{src:n.fileIcon},null,8,["src"]),Object(s["h"])("span",{class:"text",title:i.shareInfo.name},Object(s["A"])(i.shareInfo.name),9,["title"])])]),Object(s["h"])("td",null,[Object(s["h"])("span",g,Object(s["A"])(n.createTime),1),Object(s["h"])("span",y,[0===i.shareInfo.isPublic?(Object(s["q"])(),Object(s["e"])("span",I,"提取码: "+Object(s["A"])(i.shareInfo.accessCode),1)):(Object(s["q"])(),Object(s["e"])("span",v,"公开分享"))])]),Object(s["h"])("td",null,[i.shareInfo.expiryTime?n.expiryTime?(Object(s["q"])(),Object(s["e"])("span",S,Object(s["A"])(n.expiryTime)+"后失效",1)):n.isExpire?(Object(s["q"])(),Object(s["e"])("span",$,"已失效")):(Object(s["q"])(),Object(s["e"])("span",w,"即将失效")):(Object(s["q"])(),Object(s["e"])("span",k,"永久有效"))]),Object(s["h"])("td",null,Object(s["A"])(i.shareInfo.saveCount)+"次",1)],2)})),x=(i("caad"),i("2532"),i("a434"),i("73df")),F=i("41dc"),C=i("6db1"),T={name:"ShareFileListItem",components:{MCheckbox:j["a"]},props:{shareInfo:Object,selectList:Array},computed:{fileIcon:function(){return C["d"].shareIcon},createTime:function(){return Object(x["c"])(this.shareInfo.createTime)},expiryTime:function(){return Object(x["a"])(this.shareInfo.expiryTime)},isExpire:function(){return(new Date).getTime()>new Date(this.shareInfo.expiryTime).getTime()}},methods:{selectThis:function(){var e=this.selectList;e.includes(this.shareInfo.id)?e.splice(e.indexOf(this.shareInfo.id),1):e.push(this.shareInfo.id),this.$emit("update:selectList",e)},fileSize:function(e){return Object(F["a"])(e)},changeSelectList:function(e){this.$emit("update:selectList",e)}}};i("15d1");T.render=q,T.__scopeId="data-v-736e58d4";var R=T,D=i("ecff"),A={name:"ShareFileList",components:{LoadingNewData:D["a"],ShareFileListItem:R,MCheckbox:j["a"]},methods:{changeSelectList:function(e){this.$emit("update:selectList",e),this.allChecked=this.shareList.length===this.selectList.length},selectAll:function(e){if(e){var t=this.shareList.map((function(e){return e.id}));this.$emit("update:selectList",t)}else this.$emit("update:selectList",[])},bottomLoading:function(){var e=this.$refs.fileBody.scrollTop,t=this.$refs.fileBody.clientHeight,i=this.$refs.fileBody.scrollHeight;e+t>i-200&&this.$emit("bottomLoading")}},props:{shareList:{type:Array},selectList:Array,bottomLoadingStatus:Boolean},data:function(){return{allChecked:!1}}};A.render=O,A.__scopeId="data-v-526c3129";t["a"]=A}}]);
//# sourceMappingURL=chunk-0881b895.d3c6464f.js.map