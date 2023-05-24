"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[53],{42110:function(Ct,Ee){var u={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"};Ee.Z=u},49053:function(Ct,Ee,u){u.d(Ee,{Z:function(){return Za}});var Tt=u(62208),Et=u(35872),W=u(1413),n=u(67294),Pt=u(42110),Rt=u(93771),He=function(t,a){return n.createElement(Rt.Z,(0,W.Z)((0,W.Z)({},t),{},{ref:a,icon:Pt.Z}))};He.displayName="PlusOutlined";var wt=n.forwardRef(He),Zt=u(94184),j=u.n(Zt),re=u(87462),G=u(4942),N=u(97685),Pe=u(71002),he=u(91),Nt=u(31131),We=u(21770),Lt=u(82225),$e=(0,n.createContext)(null),It=n.forwardRef(function(e,t){var a=e.prefixCls,r=e.className,o=e.style,i=e.id,l=e.active,s=e.tabKey,c=e.children;return n.createElement("div",{id:i&&"".concat(i,"-panel-").concat(s),role:"tabpanel",tabIndex:l?0:-1,"aria-labelledby":i&&"".concat(i,"-tab-").concat(s),"aria-hidden":!l,style:o,className:j()(a,l&&"".concat(a,"-active"),r),ref:t},c)}),je=It,Ot=["key","forceRender","style","className"];function Bt(e){var t=e.id,a=e.activeKey,r=e.animated,o=e.tabPosition,i=e.destroyInactiveTabPane,l=n.useContext($e),s=l.prefixCls,c=l.tabs,$=r.tabPane,C="".concat(s,"-tabpane");return n.createElement("div",{className:j()("".concat(s,"-content-holder"))},n.createElement("div",{className:j()("".concat(s,"-content"),"".concat(s,"-content-").concat(o),(0,G.Z)({},"".concat(s,"-content-animated"),$))},c.map(function(v){var x=v.key,R=v.forceRender,w=v.style,I=v.className,B=(0,he.Z)(v,Ot),Z=x===a;return n.createElement(Lt.ZP,(0,re.Z)({key:x,visible:Z,forceRender:R,removeOnLeave:!!i,leavedClassName:"".concat(C,"-hidden")},r.tabPaneMotion),function(O,y){var k=O.style,A=O.className;return n.createElement(je,(0,re.Z)({},B,{prefixCls:C,id:t,tabKey:x,animated:$,active:Z,style:(0,W.Z)((0,W.Z)({},w),k),className:j()(I,A),ref:y}))})})))}var Ge=u(74902),Ke=u(48555),At=u(66680),Xe=u(75164),zt=u(42550),Ve={width:0,height:0,left:0,top:0};function Mt(e,t,a){return(0,n.useMemo)(function(){for(var r,o=new Map,i=t.get((r=e[0])===null||r===void 0?void 0:r.key)||Ve,l=i.left+i.width,s=0;s<e.length;s+=1){var c=e[s].key,$=t.get(c);if(!$){var C;$=t.get((C=e[s-1])===null||C===void 0?void 0:C.key)||Ve}var v=o.get(c)||(0,W.Z)({},$);v.right=l-v.left-v.width,o.set(c,v)}return o},[e.map(function(r){return r.key}).join("_"),t,a])}function Ue(e,t){var a=n.useRef(e),r=n.useState({}),o=(0,N.Z)(r,2),i=o[1];function l(s){var c=typeof s=="function"?s(a.current):s;c!==a.current&&t(c,a.current),a.current=c,i({})}return[a.current,l]}var Dt=.1,Fe=.01,xe=20,Ye=Math.pow(.995,xe);function kt(e,t){var a=(0,n.useState)(),r=(0,N.Z)(a,2),o=r[0],i=r[1],l=(0,n.useState)(0),s=(0,N.Z)(l,2),c=s[0],$=s[1],C=(0,n.useState)(0),v=(0,N.Z)(C,2),x=v[0],R=v[1],w=(0,n.useState)(),I=(0,N.Z)(w,2),B=I[0],Z=I[1],O=(0,n.useRef)();function y(h){var P=h.touches[0],d=P.screenX,S=P.screenY;i({x:d,y:S}),window.clearInterval(O.current)}function k(h){if(o){h.preventDefault();var P=h.touches[0],d=P.screenX,S=P.screenY;i({x:d,y:S});var p=d-o.x,m=S-o.y;t(p,m);var X=Date.now();$(X),R(X-c),Z({x:p,y:m})}}function A(){if(o&&(i(null),Z(null),B)){var h=B.x/x,P=B.y/x,d=Math.abs(h),S=Math.abs(P);if(Math.max(d,S)<Dt)return;var p=h,m=P;O.current=window.setInterval(function(){if(Math.abs(p)<Fe&&Math.abs(m)<Fe){window.clearInterval(O.current);return}p*=Ye,m*=Ye,t(p*xe,m*xe)},xe)}}var T=(0,n.useRef)();function E(h){var P=h.deltaX,d=h.deltaY,S=0,p=Math.abs(P),m=Math.abs(d);p===m?S=T.current==="x"?P:d:p>m?(S=P,T.current="x"):(S=d,T.current="y"),t(-S,-S)&&h.preventDefault()}var z=(0,n.useRef)(null);z.current={onTouchStart:y,onTouchMove:k,onTouchEnd:A,onWheel:E},n.useEffect(function(){function h(p){z.current.onTouchStart(p)}function P(p){z.current.onTouchMove(p)}function d(p){z.current.onTouchEnd(p)}function S(p){z.current.onWheel(p)}return document.addEventListener("touchmove",P,{passive:!1}),document.addEventListener("touchend",d,{passive:!1}),e.current.addEventListener("touchstart",h,{passive:!1}),e.current.addEventListener("wheel",S),function(){document.removeEventListener("touchmove",P),document.removeEventListener("touchend",d)}},[])}var Ht=u(8410);function _e(e){var t=(0,n.useState)(0),a=(0,N.Z)(t,2),r=a[0],o=a[1],i=(0,n.useRef)(0),l=(0,n.useRef)();return l.current=e,(0,Ht.o)(function(){var s;(s=l.current)===null||s===void 0||s.call(l)},[r]),function(){i.current===r&&(i.current+=1,o(i.current))}}function Wt(e){var t=(0,n.useRef)([]),a=(0,n.useState)({}),r=(0,N.Z)(a,2),o=r[1],i=(0,n.useRef)(typeof e=="function"?e():e),l=_e(function(){var c=i.current;t.current.forEach(function($){c=$(c)}),t.current=[],i.current=c,o({})});function s(c){t.current.push(c),l()}return[i.current,s]}var Qe={width:0,height:0,left:0,top:0,right:0};function jt(e,t,a,r,o,i,l){var s=l.tabs,c=l.tabPosition,$=l.rtl,C,v,x;return["top","bottom"].includes(c)?(C="width",v=$?"right":"left",x=Math.abs(a)):(C="height",v="top",x=-a),(0,n.useMemo)(function(){if(!s.length)return[0,0];for(var R=s.length,w=R,I=0;I<R;I+=1){var B=e.get(s[I].key)||Qe;if(B[v]+B[C]>x+t){w=I-1;break}}for(var Z=0,O=R-1;O>=0;O-=1){var y=e.get(s[O].key)||Qe;if(y[v]<x){Z=O+1;break}}return[Z,w]},[e,t,r,o,i,x,c,s.map(function(R){return R.key}).join("_"),$])}function Je(e){var t;return e instanceof Map?(t={},e.forEach(function(a,r){t[r]=a})):t=e,JSON.stringify(t)}var Gt="TABS_DQ";function qe(e){return String(e).replace(/"/g,Gt)}function Kt(e,t){var a=e.prefixCls,r=e.editable,o=e.locale,i=e.style;return!r||r.showAdd===!1?null:n.createElement("button",{ref:t,type:"button",className:"".concat(a,"-nav-add"),style:i,"aria-label":(o==null?void 0:o.addAriaLabel)||"Add tab",onClick:function(s){r.onEdit("add",{event:s})}},r.addIcon||"+")}var et=n.forwardRef(Kt),Xt=n.forwardRef(function(e,t){var a=e.position,r=e.prefixCls,o=e.extra;if(!o)return null;var i,l={};return(0,Pe.Z)(o)==="object"&&!n.isValidElement(o)?l=o:l.right=o,a==="right"&&(i=l.right),a==="left"&&(i=l.left),i?n.createElement("div",{className:"".concat(r,"-extra-content"),ref:t},i):null}),tt=Xt,Vt=u(60057),at=u(97868),U=u(15105);function Ut(e,t){var a=e.prefixCls,r=e.id,o=e.tabs,i=e.locale,l=e.mobile,s=e.moreIcon,c=s===void 0?"More":s,$=e.moreTransitionName,C=e.style,v=e.className,x=e.editable,R=e.tabBarGutter,w=e.rtl,I=e.removeAriaLabel,B=e.onTabClick,Z=e.getPopupContainer,O=e.popupClassName,y=(0,n.useState)(!1),k=(0,N.Z)(y,2),A=k[0],T=k[1],E=(0,n.useState)(null),z=(0,N.Z)(E,2),h=z[0],P=z[1],d="".concat(r,"-more-popup"),S="".concat(a,"-dropdown"),p=h!==null?"".concat(d,"-").concat(h):null,m=i==null?void 0:i.dropdownAriaLabel;function X(f,M){f.preventDefault(),f.stopPropagation(),x.onEdit("remove",{key:M,event:f})}var ue=n.createElement(at.ZP,{onClick:function(M){var F=M.key,K=M.domEvent;B(F,K),T(!1)},prefixCls:"".concat(S,"-menu"),id:d,tabIndex:-1,role:"listbox","aria-activedescendant":p,selectedKeys:[h],"aria-label":m!==void 0?m:"expanded dropdown"},o.map(function(f){var M=x&&f.closable!==!1&&!f.disabled;return n.createElement(at.sN,{key:f.key,id:"".concat(d,"-").concat(f.key),role:"option","aria-controls":r&&"".concat(r,"-panel-").concat(f.key),disabled:f.disabled},n.createElement("span",null,f.label),M&&n.createElement("button",{type:"button","aria-label":I||"remove",tabIndex:0,className:"".concat(S,"-menu-item-remove"),onClick:function(K){K.stopPropagation(),X(K,f.key)}},f.closeIcon||x.removeIcon||"\xD7"))}));function J(f){for(var M=o.filter(function(ie){return!ie.disabled}),F=M.findIndex(function(ie){return ie.key===h})||0,K=M.length,q=0;q<K;q+=1){F=(F+f+K)%K;var ce=M[F];if(!ce.disabled){P(ce.key);return}}}function V(f){var M=f.which;if(!A){[U.Z.DOWN,U.Z.SPACE,U.Z.ENTER].includes(M)&&(T(!0),f.preventDefault());return}switch(M){case U.Z.UP:J(-1),f.preventDefault();break;case U.Z.DOWN:J(1),f.preventDefault();break;case U.Z.ESC:T(!1);break;case U.Z.SPACE:case U.Z.ENTER:h!==null&&B(h,f);break}}(0,n.useEffect)(function(){var f=document.getElementById(p);f&&f.scrollIntoView&&f.scrollIntoView(!1)},[h]),(0,n.useEffect)(function(){A||P(null)},[A]);var Q=(0,G.Z)({},w?"marginRight":"marginLeft",R);o.length||(Q.visibility="hidden",Q.order=1);var ve=j()((0,G.Z)({},"".concat(S,"-rtl"),w)),oe=l?null:n.createElement(Vt.Z,{prefixCls:S,overlay:ue,trigger:["hover"],visible:o.length?A:!1,transitionName:$,onVisibleChange:T,overlayClassName:j()(ve,O),mouseEnterDelay:.1,mouseLeaveDelay:.1,getPopupContainer:Z},n.createElement("button",{type:"button",className:"".concat(a,"-nav-more"),style:Q,tabIndex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":d,id:"".concat(r,"-more"),"aria-expanded":A,onKeyDown:V},c));return n.createElement("div",{className:j()("".concat(a,"-nav-operations"),v),style:C,ref:t},oe,n.createElement(et,{prefixCls:a,locale:i,editable:x}))}var Ft=n.memo(n.forwardRef(Ut),function(e,t){return t.tabMoving});function Yt(e){var t,a=e.prefixCls,r=e.id,o=e.active,i=e.tab,l=i.key,s=i.label,c=i.disabled,$=i.closeIcon,C=e.closable,v=e.renderWrapper,x=e.removeAriaLabel,R=e.editable,w=e.onClick,I=e.onFocus,B=e.style,Z="".concat(a,"-tab"),O=R&&C!==!1&&!c;function y(T){c||w(T)}function k(T){T.preventDefault(),T.stopPropagation(),R.onEdit("remove",{key:l,event:T})}var A=n.createElement("div",{key:l,"data-node-key":qe(l),className:j()(Z,(t={},(0,G.Z)(t,"".concat(Z,"-with-remove"),O),(0,G.Z)(t,"".concat(Z,"-active"),o),(0,G.Z)(t,"".concat(Z,"-disabled"),c),t)),style:B,onClick:y},n.createElement("div",{role:"tab","aria-selected":o,id:r&&"".concat(r,"-tab-").concat(l),className:"".concat(Z,"-btn"),"aria-controls":r&&"".concat(r,"-panel-").concat(l),"aria-disabled":c,tabIndex:c?null:0,onClick:function(E){E.stopPropagation(),y(E)},onKeyDown:function(E){[U.Z.SPACE,U.Z.ENTER].includes(E.which)&&(E.preventDefault(),y(E))},onFocus:I},s),O&&n.createElement("button",{type:"button","aria-label":x||"remove",tabIndex:0,className:"".concat(Z,"-remove"),onClick:function(E){E.stopPropagation(),k(E)}},$||R.removeIcon||"\xD7"));return v?v(A):A}var _t=Yt,se=function(t){var a=t.current||{},r=a.offsetWidth,o=r===void 0?0:r,i=a.offsetHeight,l=i===void 0?0:i;return[o,l]},ye=function(t,a){return t[a?0:1]};function Qt(e,t){var a,r=n.useContext($e),o=r.prefixCls,i=r.tabs,l=e.className,s=e.style,c=e.id,$=e.animated,C=e.activeKey,v=e.rtl,x=e.extra,R=e.editable,w=e.locale,I=e.tabPosition,B=e.tabBarGutter,Z=e.children,O=e.onTabClick,y=e.onTabScroll,k=(0,n.useRef)(),A=(0,n.useRef)(),T=(0,n.useRef)(),E=(0,n.useRef)(),z=(0,n.useRef)(),h=(0,n.useRef)(),P=(0,n.useRef)(),d=I==="top"||I==="bottom",S=Ue(0,function(g,b){d&&y&&y({direction:g>b?"left":"right"})}),p=(0,N.Z)(S,2),m=p[0],X=p[1],ue=Ue(0,function(g,b){!d&&y&&y({direction:g>b?"top":"bottom"})}),J=(0,N.Z)(ue,2),V=J[0],Q=J[1],ve=(0,n.useState)([0,0]),oe=(0,N.Z)(ve,2),f=oe[0],M=oe[1],F=(0,n.useState)([0,0]),K=(0,N.Z)(F,2),q=K[0],ce=K[1],ie=(0,n.useState)([0,0]),fe=(0,N.Z)(ie,2),Re=fe[0],we=fe[1],Ze=(0,n.useState)([0,0]),pe=(0,N.Z)(Ze,2),Ne=pe[0],Le=pe[1],L=Wt(new Map),ee=(0,N.Z)(L,2),be=ee[0],Na=ee[1],Se=Mt(i,be,q[0]),Ie=ye(f,d),me=ye(q,d),Oe=ye(Re,d),lt=ye(Ne,d),st=Ie<me+Oe,Y=st?Ie-lt:Ie-Oe,La="".concat(o,"-nav-operations-hidden"),te=0,le=0;d&&v?(te=0,le=Math.max(0,me-Y)):(te=Math.min(0,Y-me),le=0);function Be(g){return g<te?te:g>le?le:g}var ct=(0,n.useRef)(),Ia=(0,n.useState)(),dt=(0,N.Z)(Ia,2),Ce=dt[0],ut=dt[1];function Ae(){ut(Date.now())}function ze(){window.clearTimeout(ct.current)}kt(E,function(g,b){function D(H,ne){H(function(_){var Wa=Be(_+ne);return Wa})}return st?(d?D(X,g):D(Q,b),ze(),Ae(),!0):!1}),(0,n.useEffect)(function(){return ze(),Ce&&(ct.current=window.setTimeout(function(){ut(0)},100)),ze},[Ce]);var Oa=jt(Se,Y,d?m:V,me,Oe,lt,(0,W.Z)((0,W.Z)({},e),{},{tabs:i})),vt=(0,N.Z)(Oa,2),Ba=vt[0],Aa=vt[1],ft=(0,At.Z)(function(){var g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:C,b=Se.get(g)||{width:0,height:0,left:0,right:0,top:0};if(d){var D=m;v?b.right<m?D=b.right:b.right+b.width>m+Y&&(D=b.right+b.width-Y):b.left<-m?D=-b.left:b.left+b.width>-m+Y&&(D=-(b.left+b.width-Y)),Q(0),X(Be(D))}else{var H=V;b.top<-V?H=-b.top:b.top+b.height>-V+Y&&(H=-(b.top+b.height-Y)),X(0),Q(Be(H))}}),Te={};I==="top"||I==="bottom"?Te[v?"marginRight":"marginLeft"]=B:Te.marginTop=B;var pt=i.map(function(g,b){var D=g.key;return n.createElement(_t,{id:c,prefixCls:o,key:D,tab:g,style:b===0?void 0:Te,closable:g.closable,editable:R,active:D===C,renderWrapper:Z,removeAriaLabel:w==null?void 0:w.removeAriaLabel,onClick:function(ne){O(D,ne)},onFocus:function(){ft(D),Ae(),E.current&&(v||(E.current.scrollLeft=0),E.current.scrollTop=0)}})}),bt=function(){return Na(function(){var b=new Map;return i.forEach(function(D){var H,ne=D.key,_=(H=z.current)===null||H===void 0?void 0:H.querySelector('[data-node-key="'.concat(qe(ne),'"]'));_&&b.set(ne,{width:_.offsetWidth,height:_.offsetHeight,left:_.offsetLeft,top:_.offsetTop})}),b})};(0,n.useEffect)(function(){bt()},[i.map(function(g){return g.key}).join("_")]);var Me=_e(function(){var g=se(k),b=se(A),D=se(T);M([g[0]-b[0]-D[0],g[1]-b[1]-D[1]]);var H=se(P);we(H);var ne=se(h);Le(ne);var _=se(z);ce([_[0]-H[0],_[1]-H[1]]),bt()}),za=i.slice(0,Ba),Ma=i.slice(Aa+1),mt=[].concat((0,Ge.Z)(za),(0,Ge.Z)(Ma)),Da=(0,n.useState)(),gt=(0,N.Z)(Da,2),ka=gt[0],Ha=gt[1],ae=Se.get(C),ht=(0,n.useRef)();function $t(){Xe.Z.cancel(ht.current)}(0,n.useEffect)(function(){var g={};return ae&&(d?(v?g.right=ae.right:g.left=ae.left,g.width=ae.width):(g.top=ae.top,g.height=ae.height)),$t(),ht.current=(0,Xe.Z)(function(){Ha(g)}),$t},[ae,d,v]),(0,n.useEffect)(function(){ft()},[C,te,le,Je(ae),Je(Se),d]),(0,n.useEffect)(function(){Me()},[v]);var xt=!!mt.length,ge="".concat(o,"-nav-wrap"),De,ke,yt,St;return d?v?(ke=m>0,De=m!==le):(De=m<0,ke=m!==te):(yt=V<0,St=V!==te),n.createElement(Ke.Z,{onResize:Me},n.createElement("div",{ref:(0,zt.x1)(t,k),role:"tablist",className:j()("".concat(o,"-nav"),l),style:s,onKeyDown:function(){Ae()}},n.createElement(tt,{ref:A,position:"left",extra:x,prefixCls:o}),n.createElement("div",{className:j()(ge,(a={},(0,G.Z)(a,"".concat(ge,"-ping-left"),De),(0,G.Z)(a,"".concat(ge,"-ping-right"),ke),(0,G.Z)(a,"".concat(ge,"-ping-top"),yt),(0,G.Z)(a,"".concat(ge,"-ping-bottom"),St),a)),ref:E},n.createElement(Ke.Z,{onResize:Me},n.createElement("div",{ref:z,className:"".concat(o,"-nav-list"),style:{transform:"translate(".concat(m,"px, ").concat(V,"px)"),transition:Ce?"none":void 0}},pt,n.createElement(et,{ref:P,prefixCls:o,locale:w,editable:R,style:(0,W.Z)((0,W.Z)({},pt.length===0?void 0:Te),{},{visibility:xt?"hidden":null})}),n.createElement("div",{className:j()("".concat(o,"-ink-bar"),(0,G.Z)({},"".concat(o,"-ink-bar-animated"),$.inkBar)),style:ka})))),n.createElement(Ft,(0,re.Z)({},e,{removeAriaLabel:w==null?void 0:w.removeAriaLabel,ref:h,prefixCls:o,tabs:mt,className:!xt&&La,tabMoving:!!Ce})),n.createElement(tt,{ref:T,position:"right",extra:x,prefixCls:o})))}var nt=n.forwardRef(Qt),Jt=["renderTabBar"],qt=["label","key"];function ea(e){var t=e.renderTabBar,a=(0,he.Z)(e,Jt),r=n.useContext($e),o=r.tabs;if(t){var i=(0,W.Z)((0,W.Z)({},a),{},{panes:o.map(function(l){var s=l.label,c=l.key,$=(0,he.Z)(l,qt);return n.createElement(je,(0,re.Z)({tab:s,key:c,tabKey:c},$))})});return t(i,nt)}return n.createElement(nt,a)}var ja=u(80334);function ta(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{inkBar:!0,tabPane:!1},t;return e===!1?t={inkBar:!1,tabPane:!1}:e===!0?t={inkBar:!0,tabPane:!1}:t=(0,W.Z)({inkBar:!0},(0,Pe.Z)(e)==="object"?e:{}),t.tabPaneMotion&&t.tabPane===void 0&&(t.tabPane=!0),!t.tabPaneMotion&&t.tabPane&&(t.tabPane=!1),t}var aa=["id","prefixCls","className","items","direction","activeKey","defaultActiveKey","editable","animated","tabPosition","tabBarGutter","tabBarStyle","tabBarExtraContent","locale","moreIcon","moreTransitionName","destroyInactiveTabPane","renderTabBar","onChange","onTabClick","onTabScroll","getPopupContainer","popupClassName"],rt=0;function na(e,t){var a,r=e.id,o=e.prefixCls,i=o===void 0?"rc-tabs":o,l=e.className,s=e.items,c=e.direction,$=e.activeKey,C=e.defaultActiveKey,v=e.editable,x=e.animated,R=e.tabPosition,w=R===void 0?"top":R,I=e.tabBarGutter,B=e.tabBarStyle,Z=e.tabBarExtraContent,O=e.locale,y=e.moreIcon,k=e.moreTransitionName,A=e.destroyInactiveTabPane,T=e.renderTabBar,E=e.onChange,z=e.onTabClick,h=e.onTabScroll,P=e.getPopupContainer,d=e.popupClassName,S=(0,he.Z)(e,aa),p=n.useMemo(function(){return(s||[]).filter(function(L){return L&&(0,Pe.Z)(L)==="object"&&"key"in L})},[s]),m=c==="rtl",X=ta(x),ue=(0,n.useState)(!1),J=(0,N.Z)(ue,2),V=J[0],Q=J[1];(0,n.useEffect)(function(){Q((0,Nt.Z)())},[]);var ve=(0,We.Z)(function(){var L;return(L=p[0])===null||L===void 0?void 0:L.key},{value:$,defaultValue:C}),oe=(0,N.Z)(ve,2),f=oe[0],M=oe[1],F=(0,n.useState)(function(){return p.findIndex(function(L){return L.key===f})}),K=(0,N.Z)(F,2),q=K[0],ce=K[1];(0,n.useEffect)(function(){var L=p.findIndex(function(be){return be.key===f});if(L===-1){var ee;L=Math.max(0,Math.min(q,p.length-1)),M((ee=p[L])===null||ee===void 0?void 0:ee.key)}ce(L)},[p.map(function(L){return L.key}).join("_"),f,q]);var ie=(0,We.Z)(null,{value:r}),fe=(0,N.Z)(ie,2),Re=fe[0],we=fe[1];(0,n.useEffect)(function(){r||(we("rc-tabs-".concat(rt)),rt+=1)},[]);function Ze(L,ee){z==null||z(L,ee);var be=L!==f;M(L),be&&(E==null||E(L))}var pe={id:Re,activeKey:f,animated:X,tabPosition:w,rtl:m,mobile:V},Ne,Le=(0,W.Z)((0,W.Z)({},pe),{},{editable:v,locale:O,moreIcon:y,moreTransitionName:k,tabBarGutter:I,onTabClick:Ze,onTabScroll:h,extra:Z,style:B,panes:null,getPopupContainer:P,popupClassName:d});return n.createElement($e.Provider,{value:{tabs:p,prefixCls:i}},n.createElement("div",(0,re.Z)({ref:t,id:r,className:j()(i,"".concat(i,"-").concat(w),(a={},(0,G.Z)(a,"".concat(i,"-mobile"),V),(0,G.Z)(a,"".concat(i,"-editable"),v),(0,G.Z)(a,"".concat(i,"-rtl"),m),a),l)},S),Ne,n.createElement(ea,(0,re.Z)({},Le,{renderTabBar:T})),n.createElement(Bt,(0,re.Z)({destroyInactiveTabPane:A},pe,{animated:X}))))}var ra=n.forwardRef(na),oa=ra,ia=oa,la=u(53124),sa=u(97647),ca=u(33603);const da={motionAppear:!1,motionEnter:!0,motionLeave:!0};function ua(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{inkBar:!0,tabPane:!1},a;return t===!1?a={inkBar:!1,tabPane:!1}:t===!0?a={inkBar:!0,tabPane:!0}:a=Object.assign({inkBar:!0},typeof t=="object"?t:{}),a.tabPane&&(a.tabPaneMotion=Object.assign(Object.assign({},da),{motionName:(0,ca.mL)(e,"switch")})),a}var va=u(50344),fa=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(a[r[o]]=e[r[o]]);return a};function pa(e){return e.filter(t=>t)}function ba(e,t){if(e)return e;const a=(0,va.Z)(t).map(r=>{if(n.isValidElement(r)){const{key:o,props:i}=r,l=i||{},{tab:s}=l,c=fa(l,["tab"]);return Object.assign(Object.assign({key:String(o)},c),{label:s})}return null});return pa(a)}var ma=()=>null,ga=u(67968),ha=u(45503),de=u(14747),ot=u(67771),$a=e=>{const{componentCls:t,motionDurationSlow:a}=e;return[{[t]:{[`${t}-switch`]:{"&-appear, &-enter":{transition:"none","&-start":{opacity:0},"&-active":{opacity:1,transition:`opacity ${a}`}},"&-leave":{position:"absolute",transition:"none",inset:0,"&-start":{opacity:1},"&-active":{opacity:0,transition:`opacity ${a}`}}}}},[(0,ot.oN)(e,"slide-up"),(0,ot.oN)(e,"slide-down")]]};const xa=e=>{const{componentCls:t,tabsCardHorizontalPadding:a,tabsCardHeadBackground:r,tabsCardGutter:o,colorBorderSecondary:i}=e;return{[`${t}-card`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{margin:0,padding:a,background:r,border:`${e.lineWidth}px ${e.lineType} ${i}`,transition:`all ${e.motionDurationSlow} ${e.motionEaseInOut}`},[`${t}-tab-active`]:{color:e.colorPrimary,background:e.colorBgContainer},[`${t}-ink-bar`]:{visibility:"hidden"}},[`&${t}-top, &${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab + ${t}-tab`]:{marginLeft:{_skip_check_:!0,value:`${o}px`}}}},[`&${t}-top`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:`${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`},[`${t}-tab-active`]:{borderBottomColor:e.colorBgContainer}}},[`&${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:`0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px`},[`${t}-tab-active`]:{borderTopColor:e.colorBgContainer}}},[`&${t}-left, &${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab + ${t}-tab`]:{marginTop:`${o}px`}}},[`&${t}-left`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`${e.borderRadiusLG}px 0 0 ${e.borderRadiusLG}px`}},[`${t}-tab-active`]:{borderRightColor:{_skip_check_:!0,value:e.colorBgContainer}}}},[`&${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px 0`}},[`${t}-tab-active`]:{borderLeftColor:{_skip_check_:!0,value:e.colorBgContainer}}}}}}},ya=e=>{const{componentCls:t,tabsHoverColor:a,dropdownEdgeChildVerticalPadding:r}=e;return{[`${t}-dropdown`]:Object.assign(Object.assign({},(0,de.Wf)(e)),{position:"absolute",top:-9999,left:{_skip_check_:!0,value:-9999},zIndex:e.zIndexPopup,display:"block","&-hidden":{display:"none"},[`${t}-dropdown-menu`]:{maxHeight:e.tabsDropdownHeight,margin:0,padding:`${r}px 0`,overflowX:"hidden",overflowY:"auto",textAlign:{_skip_check_:!0,value:"left"},listStyleType:"none",backgroundColor:e.colorBgContainer,backgroundClip:"padding-box",borderRadius:e.borderRadiusLG,outline:"none",boxShadow:e.boxShadowSecondary,"&-item":Object.assign(Object.assign({},de.vS),{display:"flex",alignItems:"center",minWidth:e.tabsDropdownWidth,margin:0,padding:`${e.paddingXXS}px ${e.paddingSM}px`,color:e.colorText,fontWeight:"normal",fontSize:e.fontSize,lineHeight:e.lineHeight,cursor:"pointer",transition:`all ${e.motionDurationSlow}`,"> span":{flex:1,whiteSpace:"nowrap"},"&-remove":{flex:"none",marginLeft:{_skip_check_:!0,value:e.marginSM},color:e.colorTextDescription,fontSize:e.fontSizeSM,background:"transparent",border:0,cursor:"pointer","&:hover":{color:a}},"&:hover":{background:e.controlItemBgHover},"&-disabled":{"&, &:hover":{color:e.colorTextDisabled,background:"transparent",cursor:"not-allowed"}}})}})}},Sa=e=>{const{componentCls:t,margin:a,colorBorderSecondary:r}=e;return{[`${t}-top, ${t}-bottom`]:{flexDirection:"column",[`> ${t}-nav, > div > ${t}-nav`]:{margin:`0 0 ${a}px 0`,"&::before":{position:"absolute",right:{_skip_check_:!0,value:0},left:{_skip_check_:!0,value:0},borderBottom:`${e.lineWidth}px ${e.lineType} ${r}`,content:"''"},[`${t}-ink-bar`]:{height:e.lineWidthBold,"&-animated":{transition:`width ${e.motionDurationSlow}, left ${e.motionDurationSlow},
            right ${e.motionDurationSlow}`}},[`${t}-nav-wrap`]:{"&::before, &::after":{top:0,bottom:0,width:e.controlHeight},"&::before":{left:{_skip_check_:!0,value:0},boxShadow:e.boxShadowTabsOverflowLeft},"&::after":{right:{_skip_check_:!0,value:0},boxShadow:e.boxShadowTabsOverflowRight},[`&${t}-nav-wrap-ping-left::before`]:{opacity:1},[`&${t}-nav-wrap-ping-right::after`]:{opacity:1}}}},[`${t}-top`]:{[`> ${t}-nav,
        > div > ${t}-nav`]:{"&::before":{bottom:0},[`${t}-ink-bar`]:{bottom:0}}},[`${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{order:1,marginTop:`${a}px`,marginBottom:0,"&::before":{top:0},[`${t}-ink-bar`]:{top:0}},[`> ${t}-content-holder, > div > ${t}-content-holder`]:{order:0}},[`${t}-left, ${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{flexDirection:"column",minWidth:e.controlHeight*1.25,[`${t}-tab`]:{padding:`${e.paddingXS}px ${e.paddingLG}px`,textAlign:"center"},[`${t}-tab + ${t}-tab`]:{margin:`${e.margin}px 0 0 0`},[`${t}-nav-wrap`]:{flexDirection:"column","&::before, &::after":{right:{_skip_check_:!0,value:0},left:{_skip_check_:!0,value:0},height:e.controlHeight},"&::before":{top:0,boxShadow:e.boxShadowTabsOverflowTop},"&::after":{bottom:0,boxShadow:e.boxShadowTabsOverflowBottom},[`&${t}-nav-wrap-ping-top::before`]:{opacity:1},[`&${t}-nav-wrap-ping-bottom::after`]:{opacity:1}},[`${t}-ink-bar`]:{width:e.lineWidthBold,"&-animated":{transition:`height ${e.motionDurationSlow}, top ${e.motionDurationSlow}`}},[`${t}-nav-list, ${t}-nav-operations`]:{flex:"1 0 auto",flexDirection:"column"}}},[`${t}-left`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-ink-bar`]:{right:{_skip_check_:!0,value:0}}},[`> ${t}-content-holder, > div > ${t}-content-holder`]:{marginLeft:{_skip_check_:!0,value:`-${e.lineWidth}px`},borderLeft:{_skip_check_:!0,value:`${e.lineWidth}px ${e.lineType} ${e.colorBorder}`},[`> ${t}-content > ${t}-tabpane`]:{paddingLeft:{_skip_check_:!0,value:e.paddingLG}}}},[`${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{order:1,[`${t}-ink-bar`]:{left:{_skip_check_:!0,value:0}}},[`> ${t}-content-holder, > div > ${t}-content-holder`]:{order:0,marginRight:{_skip_check_:!0,value:-e.lineWidth},borderRight:{_skip_check_:!0,value:`${e.lineWidth}px ${e.lineType} ${e.colorBorder}`},[`> ${t}-content > ${t}-tabpane`]:{paddingRight:{_skip_check_:!0,value:e.paddingLG}}}}}},Ca=e=>{const{componentCls:t,padding:a}=e;return{[t]:{"&-small":{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:`${e.paddingXS}px 0`,fontSize:e.fontSize}}},"&-large":{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:`${a}px 0`,fontSize:e.fontSizeLG}}}},[`${t}-card`]:{[`&${t}-small`]:{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:`${e.paddingXXS*1.5}px ${a}px`}},[`&${t}-bottom`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:`0 0 ${e.borderRadius}px ${e.borderRadius}px`}},[`&${t}-top`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:`${e.borderRadius}px ${e.borderRadius}px 0 0`}},[`&${t}-right`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`0 ${e.borderRadius}px ${e.borderRadius}px 0`}}},[`&${t}-left`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`${e.borderRadius}px 0 0 ${e.borderRadius}px`}}}},[`&${t}-large`]:{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:`${e.paddingXS}px ${a}px ${e.paddingXXS*1.5}px`}}}}}},Ta=e=>{const{componentCls:t,tabsActiveColor:a,tabsHoverColor:r,iconCls:o,tabsHorizontalGutter:i}=e,l=`${t}-tab`;return{[l]:{position:"relative",display:"inline-flex",alignItems:"center",padding:`${e.paddingSM}px 0`,fontSize:`${e.fontSize}px`,background:"transparent",border:0,outline:"none",cursor:"pointer","&-btn, &-remove":Object.assign({"&:focus:not(:focus-visible), &:active":{color:a}},(0,de.Qy)(e)),"&-btn":{outline:"none",transition:"all 0.3s"},"&-remove":{flex:"none",marginRight:{_skip_check_:!0,value:-e.marginXXS},marginLeft:{_skip_check_:!0,value:e.marginXS},color:e.colorTextDescription,fontSize:e.fontSizeSM,background:"transparent",border:"none",outline:"none",cursor:"pointer",transition:`all ${e.motionDurationSlow}`,"&:hover":{color:e.colorTextHeading}},"&:hover":{color:r},[`&${l}-active ${l}-btn`]:{color:e.colorPrimary,textShadow:e.tabsActiveTextShadow},[`&${l}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed"},[`&${l}-disabled ${l}-btn, &${l}-disabled ${t}-remove`]:{"&:focus, &:active":{color:e.colorTextDisabled}},[`& ${l}-remove ${o}`]:{margin:0},[o]:{marginRight:{_skip_check_:!0,value:e.marginSM}}},[`${l} + ${l}`]:{margin:{_skip_check_:!0,value:`0 0 0 ${i}px`}}}},Ea=e=>{const{componentCls:t,tabsHorizontalGutter:a,iconCls:r,tabsCardGutter:o}=e;return{[`${t}-rtl`]:{direction:"rtl",[`${t}-nav`]:{[`${t}-tab`]:{margin:{_skip_check_:!0,value:`0 0 0 ${a}px`},[`${t}-tab:last-of-type`]:{marginLeft:{_skip_check_:!0,value:0}},[r]:{marginRight:{_skip_check_:!0,value:0},marginLeft:{_skip_check_:!0,value:`${e.marginSM}px`}},[`${t}-tab-remove`]:{marginRight:{_skip_check_:!0,value:`${e.marginXS}px`},marginLeft:{_skip_check_:!0,value:`-${e.marginXXS}px`},[r]:{margin:0}}}},[`&${t}-left`]:{[`> ${t}-nav`]:{order:1},[`> ${t}-content-holder`]:{order:0}},[`&${t}-right`]:{[`> ${t}-nav`]:{order:0},[`> ${t}-content-holder`]:{order:1}},[`&${t}-card${t}-top, &${t}-card${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab + ${t}-tab`]:{marginRight:{_skip_check_:!0,value:`${o}px`},marginLeft:{_skip_check_:!0,value:0}}}}},[`${t}-dropdown-rtl`]:{direction:"rtl"},[`${t}-menu-item`]:{[`${t}-dropdown-rtl`]:{textAlign:{_skip_check_:!0,value:"right"}}}}},Pa=e=>{const{componentCls:t,tabsCardHorizontalPadding:a,tabsCardHeight:r,tabsCardGutter:o,tabsHoverColor:i,tabsActiveColor:l,colorBorderSecondary:s}=e;return{[t]:Object.assign(Object.assign(Object.assign(Object.assign({},(0,de.Wf)(e)),{display:"flex",[`> ${t}-nav, > div > ${t}-nav`]:{position:"relative",display:"flex",flex:"none",alignItems:"center",[`${t}-nav-wrap`]:{position:"relative",display:"flex",flex:"auto",alignSelf:"stretch",overflow:"hidden",whiteSpace:"nowrap",transform:"translate(0)","&::before, &::after":{position:"absolute",zIndex:1,opacity:0,transition:`opacity ${e.motionDurationSlow}`,content:"''",pointerEvents:"none"}},[`${t}-nav-list`]:{position:"relative",display:"flex",transition:`opacity ${e.motionDurationSlow}`},[`${t}-nav-operations`]:{display:"flex",alignSelf:"stretch"},[`${t}-nav-operations-hidden`]:{position:"absolute",visibility:"hidden",pointerEvents:"none"},[`${t}-nav-more`]:{position:"relative",padding:a,background:"transparent",border:0,color:e.colorText,"&::after":{position:"absolute",right:{_skip_check_:!0,value:0},bottom:0,left:{_skip_check_:!0,value:0},height:e.controlHeightLG/8,transform:"translateY(100%)",content:"''"}},[`${t}-nav-add`]:Object.assign({minWidth:`${r}px`,marginLeft:{_skip_check_:!0,value:`${o}px`},padding:`0 ${e.paddingXS}px`,background:"transparent",border:`${e.lineWidth}px ${e.lineType} ${s}`,borderRadius:`${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`,outline:"none",cursor:"pointer",color:e.colorText,transition:`all ${e.motionDurationSlow} ${e.motionEaseInOut}`,"&:hover":{color:i},"&:active, &:focus:not(:focus-visible)":{color:l}},(0,de.Qy)(e))},[`${t}-extra-content`]:{flex:"none"},[`${t}-ink-bar`]:{position:"absolute",background:e.colorPrimary,pointerEvents:"none"}}),Ta(e)),{[`${t}-content`]:{position:"relative",width:"100%"},[`${t}-content-holder`]:{flex:"auto",minWidth:0,minHeight:0},[`${t}-tabpane`]:{outline:"none","&-hidden":{display:"none"}}}),[`${t}-centered`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-nav-wrap`]:{[`&:not([class*='${t}-nav-wrap-ping'])`]:{justifyContent:"center"}}}}}};var Ra=(0,ga.Z)("Tabs",e=>{const t=e.controlHeightLG,a=(0,ha.TS)(e,{tabsHoverColor:e.colorPrimaryHover,tabsActiveColor:e.colorPrimaryActive,tabsCardHorizontalPadding:`${(t-Math.round(e.fontSize*e.lineHeight))/2-e.lineWidth}px ${e.padding}px`,tabsCardHeight:t,tabsCardGutter:e.marginXXS/2,tabsHorizontalGutter:32,tabsCardHeadBackground:e.colorFillAlter,dropdownEdgeChildVerticalPadding:e.paddingXXS,tabsActiveTextShadow:"0 0 0.25px currentcolor",tabsDropdownHeight:200,tabsDropdownWidth:120});return[Ca(a),Ea(a),Sa(a),ya(a),xa(a),Pa(a),$a(a)]},e=>({zIndexPopup:e.zIndexPopupBase+50})),wa=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(a[r[o]]=e[r[o]]);return a};function it(e){var{type:t,className:a,rootClassName:r,size:o,onEdit:i,hideAdd:l,centered:s,addIcon:c,popupClassName:$,children:C,items:v,animated:x}=e,R=wa(e,["type","className","rootClassName","size","onEdit","hideAdd","centered","addIcon","popupClassName","children","items","animated"]);const{prefixCls:w,moreIcon:I=n.createElement(Et.Z,null)}=R,{direction:B,getPrefixCls:Z,getPopupContainer:O}=n.useContext(la.E_),y=Z("tabs",w),[k,A]=Ra(y);let T;t==="editable-card"&&(T={onEdit:(S,p)=>{let{key:m,event:X}=p;i==null||i(S==="add"?X:m,S)},removeIcon:n.createElement(Tt.Z,null),addIcon:c||n.createElement(wt,null),showAdd:l!==!0});const E=Z(),z=ba(v,C),h=ua(y,x),P=n.useContext(sa.Z),d=o!==void 0?o:P;return k(n.createElement(ia,Object.assign({direction:B,getPopupContainer:O,moreTransitionName:`${E}-slide-up`},R,{items:z,className:j()({[`${y}-${d}`]:d,[`${y}-card`]:["card","editable-card"].includes(t),[`${y}-editable-card`]:t==="editable-card",[`${y}-centered`]:s},a,r,A),popupClassName:j()($,A),editable:T,moreIcon:I,prefixCls:y,animated:h})))}it.TabPane=ma;var Za=it}}]);
