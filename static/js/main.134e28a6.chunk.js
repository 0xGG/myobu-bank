(this["webpackJsonpmyobu-bank"]=this["webpackJsonpmyobu-bank"]||[]).push([[0],{272:function(e,t,n){},287:function(e,t){},310:function(e,t){},312:function(e,t){},388:function(e,t){},390:function(e,t){},422:function(e,t){},427:function(e,t){},429:function(e,t){},436:function(e,t){},449:function(e,t){},534:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(22),i=n.n(s),c=(n(272),n(576)),o=n(64),u=n(42),p=Object(u.a)(),l=n(23),d=n.n(l),b=n(50),y=n(51),m=n(76),f=n(566),j=n(568),h=n(569),x=n(580),O=n(570),g=n(571),v=n(96),w=n(572),T=n(573),k=n(579),C=n(578),M=n(577),_=n(582),A=n(564),S=n(149),I=n.n(S),F=n(4),N=n(245),P=n.n(N),D="0x75d12e4f91df721fafcae4c6cd1d5280381370ac",E=[{inputs:[{internalType:"address payable",name:"addr1",type:"address"},{internalType:"address payable",name:"addr2",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"_maxTxAmount",type:"uint256"}],name:"MaxTxAmountUpdated",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[],name:"addLiquidity",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"pure",type:"function"},{inputs:[],name:"manualsend",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"manualswap",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"pure",type:"function"},{inputs:[],name:"openTrading",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bool",name:"onoff",type:"bool"}],name:"setCooldownEnabled",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"maxTxPercent",type:"uint256"}],name:"setMaxTxPercent",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"pure",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"sender",type:"address"},{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{stateMutability:"payable",type:"receive"}],W=n.p+"static/media/myobu.7c92efa4.png",U=n(9),B=Object(A.a)((function(e){return{root:{backgroundColor:e.palette.background.default,width:"100%",height:"100%",overflow:"auto"},myobuInfoCard:{marginTop:e.spacing(8),position:"relative"},userInfoCard:{marginTop:e.spacing(4),position:"relative"},developerInfoCard:{marginTop:e.spacing(4),position:"relative"}}}));function H(e){var t=B(),n=Object(o.d)().walletAddress,r=Object(a.useState)(null),s=Object(y.a)(r,2),i=s[0],c=s[1],u=Object(a.useState)(null),l=Object(y.a)(u,2),A=l[0],S=l[1],N=Object(a.useState)(n||""),H=Object(y.a)(N,2),L=H[0],$=H[1],G=Object(a.useState)(0),Y=Object(y.a)(G,2),J=Y[0],K=Y[1],R=Object(a.useState)(0),V=Object(y.a)(R,2),Z=V[0],q=V[1],z=Object(a.useState)([]),X=Object(y.a)(z,2),Q=X[0],ee=X[1],te=Object(a.useState)(""),ne=Object(y.a)(te,2),ae=ne[0],re=ne[1],se=Object(m.a)(),ie=Object(a.useCallback)(function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i){e.next=2;break}return e.abrupt("return",0);case 2:return e.next=4,i.methods.balanceOf(t).call({},"latest");case 4:if(e.t0=e.sent,e.t0){e.next=7;break}e.t0=0;case 7:return e.t1=e.t0,e.abrupt("return",e.t1/1e9);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[i]),ce=Object(a.useCallback)(function(){var e=Object(b.a)(d.a.mark((function e(t,n){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i){e.next=2;break}return e.abrupt("return",0);case 2:return e.next=4,i.methods.balanceOf(t).call({from:t},n);case 4:if(e.t0=e.sent,e.t0){e.next=7;break}e.t0=0;case 7:return e.t1=e.t0,a=e.t1/1e9,e.abrupt("return",a);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[i]),oe=Object(a.useCallback)(Object(b.a)(d.a.mark((function e(){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.coingecko.com/api/v3/simple/price?ids=myobu&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true",{method:"get"});case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,a={price:n.myobu.usd,marketCap:n.myobu.usd_market_cap,volume:n.myobu.usd_24h_vol,priceChange:n.myobu.usd_24h_change,lastUpdatedAt:new Date(1e3*n.myobu.last_updated_at)},S(a);case 8:case"end":return e.stop()}}),e)}))),[]),ue=Object(a.useCallback)(Object(b.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,ie(n);case 4:t=e.sent,K(t);case 6:case"end":return e.stop()}}),e)}))),[n,ie]);return Object(a.useEffect)((function(){function e(){return(e=Object(b.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=new P.a("https://eth-mainnet.alchemyapi.io/v2/BfPioABnA3btK_rV-rORjlu-wzk-b5Ih"),n=new t.eth.Contract(E,D),c(n);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(a.useEffect)((function(){if(!n)return re(""),ee([]);Object(b.a)(d.a.mark((function e(){var t,a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=".concat(D,"&address=").concat(n,"&page=1&offset=10&sort=desc&apikey=PAZ5RUHY6ZWHUCG98CAG5FHJNKNP1ABWX2"),{method:"get"});case 2:return t=e.sent,e.next=5,t.json();case 5:if((a=e.sent).message.match(/^ok$/i)){e.next=11;break}return re(""),e.abrupt("return",ee([]));case 11:return r=a.result.map((function(e){return{createdAt:new Date(1e3*parseInt(e.timeStamp)),blockNumber:parseInt(e.blockNumber),hash:e.hash}})),re(r[0].hash),e.abrupt("return",ee(r));case 14:case"end":return e.stop()}}),e)})))()}),[n]),Object(a.useEffect)((function(){if(Q.length&&ae&&n){var e=Q.find((function(e){return e.hash===ae}));e&&Object(b.a)(d.a.mark((function t(){var a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ce(n,e.blockNumber);case 2:a=t.sent,q(a);case 4:case"end":return t.stop()}}),t)})))()}}),[J,ae,Q,n,ce]),Object(a.useEffect)((function(){oe(),ue()}),[n,oe,ue]),I()(oe,5e3),I()(ue,1e4),Object(U.jsx)("div",{className:Object(F.a)(t.root),children:Object(U.jsxs)(f.a,{maxWidth:"sm",children:[Object(U.jsxs)(j.a,{className:Object(F.a)(t.myobuInfoCard),children:[Object(U.jsx)(h.a,{avatar:Object(U.jsx)(x.a,{src:W}),title:"My\u014dbu",subheader:Object(U.jsx)(O.a,{href:"https://etherscan.io/token/0x75d12e4f91df721fafcae4c6cd1d5280381370ac",target:"_blank",color:"primary",children:D})}),Object(U.jsxs)(g.a,{children:[Object(U.jsxs)("p",{style:{margin:0},children:["Current price:"," ",A?Object(U.jsx)(v.a,{color:"primary",component:"strong",children:"$"+A.price}):"-"]}),Object(U.jsxs)("p",{style:{margin:0},children:["Market cap:"," ",A&&A.marketCap?Object(U.jsx)(v.a,{color:"primary",component:"strong",children:"$"+A.marketCap}):"-"]}),Object(U.jsxs)("p",{style:{margin:0},children:["24Hr volume:"," ",A?Object(U.jsx)(v.a,{color:"primary",component:"strong",children:"$"+A.volume}):"-"]}),Object(U.jsxs)("p",{style:{margin:0},children:["24Hr price change:"," ",A?Object(U.jsx)(v.a,{color:"primary",component:"strong",children:A.priceChange.toFixed(2)+"%"}):"-"]}),Object(U.jsx)(v.a,{children:"Last updated: "+(A?A.lastUpdatedAt.toLocaleString():"-")})]}),Object(U.jsxs)(w.a,{children:[Object(U.jsx)(T.a,{variant:"outlined",color:"primary",href:"https://app.uniswap.org/#/swap?outputCurrency=0x75D12E4F91Df721faFCae4c6cD1d5280381370AC&use=V2",target:"_blank",children:"Trade on Uniswap"}),Object(U.jsx)(T.a,{variant:"outlined",color:"primary",href:"https://www.dextools.io/app/uniswap/pair-explorer/0xa440baf25ac41b26a6ea40f864542b54a76ce530",target:"_blank",children:"Open on Dextools"})]})]}),Object(U.jsxs)(j.a,{className:Object(F.a)(t.userInfoCard),children:[Object(U.jsx)(h.a,{title:"Wallet"}),Object(U.jsxs)(g.a,{children:[Object(U.jsx)(k.a,{fullWidth:!0,placeholder:"0x1234... Press 'Enter' when done entering",helperText:"Please enter your wallet address to view your profit earned so far",onChange:function(e){$(e.currentTarget.value)},value:L,onKeyDown:function(e){13===e.which&&(L.startsWith("0x")&&42===L.trim().length?p.push("/".concat(L.trim())):alert("Invalid wallet address"))}}),Object(U.jsxs)(C.a,{style:{marginTop:se.spacing(2)},children:[n&&Object(U.jsxs)("p",{children:["You are now holding"," ",Object(U.jsx)(v.a,{color:"primary",component:"strong",children:J})," ","My\u014dbu tokens."]}),n&&Q.length&&A?Object(U.jsxs)(U.Fragment,{children:[Object(U.jsxs)(v.a,{children:["Compared with your latest"," ",Object(U.jsx)("strong",{children:Q.length})," transactions:"]}),Object(U.jsx)(M.a,{value:ae,fullWidth:!0,onChange:function(e){re(e.target.value)},children:Q.map((function(e){return Object(U.jsxs)(_.a,{value:e.hash,children:[Object(U.jsx)(v.a,{children:e.hash.slice(0,20)+"..."}),Object(U.jsx)(v.a,{variant:"caption",children:e.createdAt.toString()})]})}))}),Object(U.jsxs)("p",{children:["You were holding"," ",Object(U.jsx)(v.a,{color:"primary",component:"strong",children:Z})," ","My\u014dbu tokens at the selected transaction time."]}),Object(U.jsxs)("p",{children:["You earned"," ",Object(U.jsx)(v.a,{color:"primary",component:"strong",children:J-Z})," ","My\u014dbu tokens."]}),Object(U.jsxs)("p",{children:["\u2248"," ",Object(U.jsxs)(v.a,{color:"primary",component:"strong",children:["$",((J-Z)*A.price).toFixed(2)]})]})]}):null]})]})]}),Object(U.jsx)(j.a,{className:Object(F.a)(t.developerInfoCard),children:Object(U.jsxs)(g.a,{children:[Object(U.jsx)(v.a,{variant:"subtitle2",children:"This website is MIT licensed"}),Object(U.jsxs)(v.a,{variant:"subtitle2",children:["Source code can be found at"," ",Object(U.jsx)(O.a,{href:"https://github.com/0xGG/myobu-bank",target:"_blank",children:"github.com/0xgg/myobu-bank"})]})]})})]})})}var L=n(251),$=n(34),G=Object(L.a)({palette:{type:"dark",common:{black:"#000",white:"#fff"},background:{paper:Object($.d)("#1e1e1e",.05),default:"#1e1e1e"},primary:{light:"#7986cb",main:"rgba(144, 19, 254, 1)",dark:"#303f9f",contrastText:"#fff"},secondary:{light:"#ff4081",main:"#f50057",dark:"#c51162",contrastText:"#fff"},error:{light:"#e57373",main:"#f44336",dark:"#d32f2f",contrastText:"rgba(197, 197, 197, 1)"},text:{primary:"#ccc",secondary:"rgba(180, 180, 180, 1)"},action:{active:"rgba(180, 180, 180, 1)"}}});var Y=function(){return Object(U.jsx)(c.a,{theme:G,children:Object(U.jsx)(o.b,{history:p,children:Object(U.jsxs)(o.c,{children:[Object(U.jsx)(o.a,{path:"/:walletAddress",render:function(e){return Object(U.jsx)(H,{})}}),Object(U.jsx)(o.a,{path:"/",render:function(e){return Object(U.jsx)(H,{})}})]})})})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,584)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),s(e),i(e)}))};i.a.render(Object(U.jsx)(r.a.StrictMode,{children:Object(U.jsx)(Y,{})}),document.getElementById("root")),J()}},[[534,1,2]]]);
//# sourceMappingURL=main.134e28a6.chunk.js.map