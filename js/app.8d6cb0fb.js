(function(t){function e(e){for(var a,n,d=e[0],s=e[1],c=e[2],u=0,l=[];u<d.length;u++)n=d[u],Object.prototype.hasOwnProperty.call(o,n)&&o[n]&&l.push(o[n][0]),o[n]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);m&&m(e);while(l.length)l.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var r=i[e],a=!0,n=1;n<r.length;n++){var d=r[n];0!==o[d]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=r[0]))}return t}var a={},n={app:0},o={app:0},i=[];function d(t){return s.p+"js/"+({}[t]||t)+"."+{"chunk-079582c7":"77a833b4","chunk-2d0d6f02":"75fcfc3f","chunk-41aae142":"eacfdc10","chunk-45ac7166":"6e61e905"}[t]+".js"}function s(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.e=function(t){var e=[],r={"chunk-079582c7":1,"chunk-45ac7166":1};n[t]?e.push(n[t]):0!==n[t]&&r[t]&&e.push(n[t]=new Promise((function(e,r){for(var a="css/"+({}[t]||t)+"."+{"chunk-079582c7":"19f90597","chunk-2d0d6f02":"31d6cfe0","chunk-41aae142":"31d6cfe0","chunk-45ac7166":"1f66d1d1"}[t]+".css",o=s.p+a,i=document.getElementsByTagName("link"),d=0;d<i.length;d++){var c=i[d],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===a||u===o))return e()}var l=document.getElementsByTagName("style");for(d=0;d<l.length;d++){c=l[d],u=c.getAttribute("data-href");if(u===a||u===o)return e()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=e,m.onerror=function(e){var a=e&&e.target&&e.target.src||o,i=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete n[t],m.parentNode.removeChild(m),r(i)},m.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){n[t]=0})));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise((function(e,r){a=o[t]=[e,r]}));e.push(a[2]=i);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=d(t);var l=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(m);var r=o[t];if(0!==r){if(r){var a=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+n+")",l.name="ChunkLoadError",l.type=a,l.request=n,r[1](l)}o[t]=void 0}};var m=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},s.m=t,s.c=a,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(r,a,function(e){return t[e]}.bind(null,a));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/GTD---Project-Managment-App/",s.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var m=u;i.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"2c83":function(t,e,r){},"56d7":function(t,e,r){"use strict";r.r(e),r.d(e,"bus",(function(){return W}));r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[t.$route.path!==t.homeRoute.path?r("the-header"):t._e(),r("v-main",{staticClass:"primary"},[r("router-view",{key:t.$route.path})],1)],1)},o=[],i=(r("7db0"),r("b0c0"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("nav",[r("v-app-bar",{staticClass:"text-center primary",attrs:{flat:"",app:"",color:"rgba(0, 0, 0, .15)"}},[r("v-app-bar-nav-icon",{staticClass:"white--text",on:{click:function(e){e.stopPropagation(),t.drawer.state=!t.drawer.state}}}),r("v-btn",{staticClass:"white--text ml-4",attrs:{text:"",rounded:"",ripple:!1},on:{click:t.routeHome}},[r("v-icon",{attrs:{left:""}},[t._v(" "+t._s(t.drawer.icon)+" ")]),r("v-toolbar-title",[t._v(" "+t._s(t.appName)+" ")])],1),r("v-spacer"),r("v-dialog",{attrs:{"max-width":"30vw"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[r("v-btn",t._g({attrs:{fab:"",dark:"",color:"primary lighten-3 mr-4 mt-3"}},a),[r("v-icon",{attrs:{large:""}},[t._v("mdi-plus")])],1)]}}]),model:{value:t.newBoardBtn.dialog,callback:function(e){t.$set(t.newBoardBtn,"dialog",e)},expression:"newBoardBtn.dialog"}},[r("v-form",[r("v-card",{attrs:{"max-width":"30vw"}},[r("v-container",[r("v-row",[r("v-col",{staticClass:"text-center"},[r("v-text-field",{attrs:{rules:[t.newBoardData.rules.exists,t.newBoardData.rules.required],label:"Board Name",type:"text","prepend-icon":"mdi-clipboard-multiple-outline"},model:{value:t.newBoardData.boardName,callback:function(e){t.$set(t.newBoardData,"boardName",e)},expression:"newBoardData.boardName"}}),r("v-text-field",{attrs:{label:"Description",type:"text","prepend-icon":"mdi-text"},model:{value:t.newBoardData.description,callback:function(e){t.$set(t.newBoardData,"description",e)},expression:"newBoardData.description"}}),r("v-text-field",{attrs:{label:"Add Team Members",type:"text","prepend-icon":"mdi-account"},model:{value:t.newBoardData.teamNembers,callback:function(e){t.$set(t.newBoardData,"teamNembers",e)},expression:"newBoardData.teamNembers"}}),r("v-btn",{on:{click:t.createNewBoard}},[t._v(" "+t._s(t.newBoardBtn.submitText)+" ")])],1)],1)],1)],1)],1)],1),r("v-btn",{staticClass:"red mr-4 mt-3",attrs:{fab:"",dark:""}},[r("h4",[t._v("AJ")])])],1),r("v-navigation-drawer",{staticClass:"primary lighten-3",attrs:{app:"",temporary:""},model:{value:t.drawer.state,callback:function(e){t.$set(t.drawer,"state",e)},expression:"drawer.state"}},[r("v-list",[r("v-list-item-group",{attrs:{dark:""}},t._l(t.drawer.drawerItems,(function(e){return r("v-list-item",{key:e.title,on:{click:function(r){return t.toRoute(e.route)}}},[r("v-icon",{attrs:{left:""}},[t._v(t._s(e.icon))]),t._v(" "+t._s(e.title)+" ")],1)})),1)],1)],1)],1)}),d=[],s=(r("a4d3"),r("e01a"),r("caad"),r("d81d"),r("2532"),{data:function(){var t=this;return{appName:"Get Things Done",newBoardBtn:{dialog:!1,submitText:"Create Board"},newBoardData:{boardName:"",description:"",teamMembers:[],rules:{exists:function(e){return!t.boardsTitles.includes(e)||"Board title already exists"},required:function(t){return!!t||"Required"}}},drawer:{state:!1,icon:"mdi-clipboard-list-outline",drawerItems:[{title:"Boards",icon:"mdi-view-dashboard-outline",route:{name:"boards"}},{title:"About",icon:"mdi-information-outline",route:{name:"about"}},{title:"Sign out",icon:"mdi-logout-variant",route:{name:"home"}}]}}},methods:{createNewBoard:function(){if(!this.boardsTitles.includes(this.newBoardData.boardName)&&this.newBoardData.boardName.length){var t={title:this.newBoardData.boardName,id:Date.now(),description:this.newBoardData.description,team:this.newBoardData.teamMembers,icon:"mdi-poll",color:"primary lighten-1",lists:[{title:"To Do",items:[]},{title:"Doing",items:[]},{title:"Done",items:[]}]};this.$store.dispatch("addNewBoard",t),this.newBoardBtn.dialog=!1,this.newBoardData.boardName="",this.newBoardData.description="",this.newBoardData.teamMembers=[],this.$router.push({name:"boardDetails",params:{boardId:t.id}})}},toRoute:function(t){t.name!==this.$route.name&&this.$router.push(t)},routeHome:function(){this.$router.push({name:"boards"}).then((function(){return console.log("resolved")})).catch((function(t){return console.log("error: ",t)}))}},computed:{boards:function(){return this.$store.state.boards},boardsTitles:function(){return this.boards.map((function(t){return t.title}))}},mounted:function(){var t=this;W.$on("create-new-board",(function(){return t.newBoardBtn.dialog=!t.newBoardBtn.dialog}))}}),c=s,u=(r("b0eb"),r("2877")),l=r("6544"),m=r.n(l),f=r("40dc"),p=r("5bc1"),b=r("8336"),h=r("b0af"),v=r("62ad"),g=r("a523"),w=r("169a"),B=r("4bd4"),y=r("132d"),x=r("8860"),k=r("da13"),D=r("1baa"),N=r("f774"),T=r("0fd9"),C=r("2fa4"),L=r("8654"),_=r("2a7f"),I=Object(u["a"])(c,i,d,!1,null,"7db8eb6c",null),j=I.exports;m()(I,{VAppBar:f["a"],VAppBarNavIcon:p["a"],VBtn:b["a"],VCard:h["a"],VCol:v["a"],VContainer:g["a"],VDialog:w["a"],VForm:B["a"],VIcon:y["a"],VList:x["a"],VListItem:k["a"],VListItemGroup:D["a"],VNavigationDrawer:N["a"],VRow:T["a"],VSpacer:C["a"],VTextField:L["a"],VToolbarTitle:_["a"]});var O={name:"App",date:function(){return{}},components:{theHeader:j},computed:{homeRoute:function(){return this.$router.options.routes.find((function(t){return"home"===t.name}))}}},V=O,M=(r("5c0b"),r("7496")),$=r("f6c4"),S=Object(u["a"])(V,n,o,!1,null,null,null),A=S.exports;m()(S,{VApp:M["a"],VMain:$["a"]});var P=r("f309");a["a"].use(P["a"]);var E=new P["a"]({}),G=(r("d3b7"),r("8c4f"));a["a"].use(G["a"]);var R=[{path:"/",name:"home",component:function(){return r.e("chunk-41aae142").then(r.bind(null,"6511"))}},{path:"/boards",name:"boards",component:function(){return r.e("chunk-079582c7").then(r.bind(null,"6828"))}},{path:"/boards/:boardId",name:"boardDetails",props:!0,component:function(){return r.e("chunk-45ac7166").then(r.bind(null,"751f"))}},{path:"/about",name:"about",component:function(){return r.e("chunk-2d0d6f02").then(r.bind(null,"754b"))}}],q=new G["a"]({routes:R}),F=q,H=(r("c975"),r("a434"),r("2f62"));a["a"].use(H["a"]);var J=new H["a"].Store({state:{demoMode:!1,labels:[{content:"Long run",color:"green"},{content:"Watch closely",color:"yellow"},{content:"Check daily",color:"orange"},{content:"Very important",color:"red"},{content:"Shared with friends",color:"purple"},{content:"Treat lightly",color:"blue"},{content:"Maybe later",color:"indigo"}],boards:[{title:"Default GTD project",id:123,description:"Text that describes this project, click to check this board.",team:[{firstName:"Iron",LastName:"Man"},{firstName:"Dr",LastName:"Octopus"}],icon:"mdi-poll",color:"primary lighten-1",lists:[{title:"To Do",items:[{title:"Get someone to review your project",labels:[]},{title:"Find a developer position that push you forward",labels:[]}]},{title:"Doing",items:[{title:"Working hard on my programming skills",labels:[]}]},{title:"Done",items:[{title:"Finished GTD version 1.01",labels:[]},{title:"Becoming a developer",labels:[]}]}]}]},getters:{demoModeState:function(t){return t.demoMode},getBoardsList:function(t){return t.boards},getBoard:function(t){return function(e){return t.boards.find((function(t){return t.id===parseInt(e)}))}},getList:function(t,e){return function(t){var r=e.getBoard(t.boardId);return r.lists.find((function(e){return r.lists.indexOf(e)===t.listIndex}))}},getListCardItem:function(t,e){return function(t){var r=e.getList(t);return r.items.find((function(e){return r.items.indexOf(e)===t.cardIndex}))}},getLabels:function(t){return t.labels}},mutations:{demoModeToggle:function(t){t.demoMode=!t.demoMode},addNewBoard:function(t,e){t.boards.push(e)},addNewListToBoard:function(t,e){e.board.lists.push(e.list)},editListTitle:function(t,e){e.list.title=e.textareaValue},addNewCardToList:function(t,e){e.list.items.push(e.cardItem)},deleteList:function(t,e){e.board.lists.splice(e.listIndex,1)},editCardContent:function(t,e){e.card.title=e.textareaValue},insertCard:function(t,e){e.list.items.splice(e.cardIdsObj.cardIndex,0,e.card)},deleteCard:function(t,e){e.list.items.splice(e.cardIndex,1)}},actions:{demoModeToggle:function(t){var e=t.commit;e("demoModeToggle")},addNewBoard:function(t,e){var r=t.commit;r("addNewBoard",e)},addNewListToBoard:function(t,e){var r=t.getters,a=t.commit;e.board=r.getBoard(e.boardId),a("addNewListToBoard",e)},editListTitle:function(t,e){var r=t.getters,a=t.commit;e.list=r.getList(e.idsObj),a("editListTitle",e)},addNewCardToList:function(t,e){var r=t.getters,a=t.commit;e.list=r.getList(e.idsObj),a("addNewCardToList",e)},deleteList:function(t,e){var r=t.getters,a=t.commit;e.board=r.getBoard(e.boardId),a("deleteList",e)},editCardContent:function(t,e){var r=t.getters,a=t.commit;e.card=r.getListCardItem(e.idsObj),a("editCardContent",e)},insertCard:function(t,e){var r=t.getters,a=t.commit;e.list=r.getList(e.cardIdsObj),a("insertCard",e)},deleteCard:function(t,e){var r=t.getters,a=t.commit;e.list=r.getList(e),a("deleteCard",e)}}});a["a"].config.productionTip=!1;var W=new a["a"];new a["a"]({vuetify:E,router:F,store:J,render:function(t){return t(A)}}).$mount("#app")},"5c0b":function(t,e,r){"use strict";var a=r("9c0c"),n=r.n(a);n.a},"9c0c":function(t,e,r){},b0eb:function(t,e,r){"use strict";var a=r("2c83"),n=r.n(a);n.a}});
//# sourceMappingURL=app.8d6cb0fb.js.map