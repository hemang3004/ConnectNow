"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[215],{9951:function(e,n,t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t(2791)),r=a(t(4164)),i=a(t(2007)),u=a(t(8912));function a(e){return e&&e.__esModule?e:{default:e}}function s(e){return s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function c(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function l(e,n){return!n||"object"!==s(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},f(e)}function d(e,n){return d=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},d(e,n)}var p=function(e){setTimeout(e,1e3/60)},v=function(e){clearTimeout(e)},m="undefined"===typeof window?p:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||p,b="undefined"===typeof window?v:window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||v,h="undefined"!==typeof window&&window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow),y=function(){return h&&h.call(performance)||Date.now()},g=function(e){function n(e){var t;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),(t=l(this,f(n).call(this,e))).state={},t.node=void 0,t}var t,i,u;return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&d(e,n)}(n,e),t=n,(i=[{key:"componentDidMount",value:function(){this.props.count>0&&(this.node=r.default.findDOMNode(this.refs.badge),this.animate())}},{key:"componentDidUpdate",value:function(e){this.props.count>e.count&&(this.node=r.default.findDOMNode(this.refs.badge),this.animate())}},{key:"animate",value:function(){var e=this,n={"-moz-transform":this.props.effect[0],"-webkit-transform":this.props.effect[0],"-o-transform":this.props.effect[0],transform:this.props.effect[0]};this.attachStyle(n),this.props.effect[2]&&this.attachStyle(this.props.effect[2]);var t,o=y();!function n(){var r=y();if(Math.floor((r-o)/(1e3/60)%e.props.frameLength)===e.props.frameLength-1){b(t);var i={"-moz-transform":e.props.effect[1],"-webkit-transform":e.props.effect[1],"-o-transform":e.props.effect[1],transform:e.props.effect[1]};e.attachStyle(i),e.props.effect[3]&&e.attachStyle(e.props.effect[3])}else t=m(n)}()}},{key:"attachStyle",value:function(e){for(var n in e)e.hasOwnProperty(n)&&(this.node.style[n]=e[n])}},{key:"render",value:function(){var e=this.props.label||this.props.count;return o.default.createElement("span",{ref:"badge",style:this.props.style,className:this.props.className},e)}}])&&c(t.prototype,i),u&&c(t,u),n}(o.default.Component);g.propTypes={count:i.default.number,label:i.default.string,style:i.default.object,effect:i.default.array,frameLength:i.default.number,className:i.default.string},g.defaultProps={count:1,label:null,style:{},effect:u.default.SCALE,frameLength:30};var w=g;n.default=w},8912:function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default={ROTATE_X:["rotateX(-180deg)","rotateX(0deg)"],ROTATE_Y:["rotateY(-180deg)","rotateY(0deg)"],SCALE:["scale(1.8, 1.8)","scale(1, 1)"]}},7896:function(e,n,t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=u(t(2791)),r=u(t(2007)),i=u(t(9951));function u(e){return e&&e.__esModule?e:{default:e}}function a(e){return a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function s(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function c(e,n){return!n||"object"!==a(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}function f(e,n){return f=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},f(e,n)}var d={position:"relative",width:"100%",height:"100%"},p={WebkitTransition:"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",MozTransition:"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",msTransition:"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",transition:"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",display:"inline-block",position:"absolute",minWidth:"10px",padding:"3px 7px",fontSize:"12px",fontWeight:"700",lineHeight:"1",color:"#fff",textAlign:"center",whiteSpace:"nowrap",verticalAlign:"baseline",backgroundColor:"rgba(212, 19, 13, 1)",borderRadius:"10px",top:"-2px",right:"-2px"},v=function(e){function n(e){var t;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),(t=c(this,l(n).call(this,e))).state={},t}var t,r,u;return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&f(e,n)}(n,e),t=n,(r=[{key:"render",value:function(){var e=this.merge(p,this.props.style),n=this.merge(d,this.props.containerStyle),t=this.props.count>0?o.default.createElement(i.default,{key:"badgekey",style:e,className:this.props.className,count:this.props.count,label:this.props.label,effect:this.props.effect,fps:this.props.fps,frameLength:this.props.frameLength}):void 0;return o.default.createElement("div",{style:n},t)}},{key:"merge",value:function(e,n){var t={};for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r]);return t}}])&&s(t.prototype,r),u&&s(t,u),n}(o.default.Component);v.propTypes={containerStyle:r.default.object,count:r.default.number,label:r.default.string,style:r.default.object,className:r.default.string,effect:r.default.array,fps:r.default.number,frameLength:r.default.number},v.defaultProps={count:0,style:{},containerStyle:{}};var m=v;n.default=m},7799:function(e,n,t){t.d(n,{h:function(){return d}});var o=t(1413),r=t(9439),i=t(5987),u=t(2791);function a(){var e=(0,u.useRef)(new Map),n=e.current,t=(0,u.useCallback)((function(n,t,o,r){e.current.set(o,{type:t,el:n,options:r}),n.addEventListener(t,o,r)}),[]),o=(0,u.useCallback)((function(n,t,o,r){n.removeEventListener(t,o,r),e.current.delete(o)}),[]);return(0,u.useEffect)((function(){return function(){n.forEach((function(e,n){o(e.el,e.type,n,e.options)}))}}),[o,n]),{add:t,remove:o}}var s=t(6992),c=t(4591),l=["ref","isDisabled","isFocusable","clickOnEnter","clickOnSpace","onMouseDown","onMouseUp","onClick","onKeyDown","onKeyUp","tabIndex","onMouseOver","onMouseLeave"];function f(e){var n=e.target,t=n.tagName,o=n.isContentEditable;return"INPUT"!==t&&"TEXTAREA"!==t&&!0!==o}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.ref,t=e.isDisabled,d=e.isFocusable,p=e.clickOnEnter,v=void 0===p||p,m=e.clickOnSpace,b=void 0===m||m,h=e.onMouseDown,y=e.onMouseUp,g=e.onClick,w=e.onKeyDown,O=e.onKeyUp,E=e.tabIndex,x=e.onMouseOver,C=e.onMouseLeave,k=(0,i.Z)(e,l),N=(0,u.useState)(!0),M=(0,r.Z)(N,2),_=M[0],S=M[1],I=(0,u.useState)(!1),Z=(0,r.Z)(I,2),D=Z[0],T=Z[1],P=a(),L=function(e){e&&"BUTTON"!==e.tagName&&S(!1)},A=_?E:E||0,j=t&&!d,F=(0,u.useCallback)((function(e){if(t)return e.stopPropagation(),void e.preventDefault();e.currentTarget.focus(),null==g||g(e)}),[t,g]),R=(0,u.useCallback)((function(e){D&&f(e)&&(e.preventDefault(),e.stopPropagation(),T(!1),P.remove(document,"keyup",R,!1))}),[D,P]),z=(0,u.useCallback)((function(e){if(null==w||w(e),!(t||e.defaultPrevented||e.metaKey)&&f(e.nativeEvent)&&!_){var n=v&&"Enter"===e.key;if(b&&" "===e.key&&(e.preventDefault(),T(!0)),n)e.preventDefault(),e.currentTarget.click();P.add(document,"keyup",R,!1)}}),[t,_,w,v,b,P,R]),U=(0,u.useCallback)((function(e){(null==O||O(e),t||e.defaultPrevented||e.metaKey)||f(e.nativeEvent)&&!_&&b&&" "===e.key&&(e.preventDefault(),T(!1),e.currentTarget.click())}),[b,_,t,O]),q=(0,u.useCallback)((function(e){0===e.button&&(T(!1),P.remove(document,"mouseup",q,!1))}),[P]),K=(0,u.useCallback)((function(e){if(0===e.button){if(t)return e.stopPropagation(),void e.preventDefault();_||T(!0),e.currentTarget.focus({preventScroll:!0}),P.add(document,"mouseup",q,!1),null==h||h(e)}}),[t,_,h,P,q]),B=(0,u.useCallback)((function(e){0===e.button&&(_||T(!1),null==y||y(e))}),[y,_]),V=(0,u.useCallback)((function(e){t?e.preventDefault():null==x||x(e)}),[t,x]),W=(0,u.useCallback)((function(e){D&&(e.preventDefault(),T(!1)),null==C||C(e)}),[D,C]),G=(0,c.lq)(n,L);return _?(0,o.Z)((0,o.Z)({},k),{},{ref:G,type:"button","aria-disabled":j?void 0:t,disabled:j,onClick:F,onMouseDown:h,onMouseUp:y,onKeyUp:O,onKeyDown:w,onMouseOver:x,onMouseLeave:C}):(0,o.Z)((0,o.Z)({},k),{},{ref:G,role:"button","data-active":(0,s.PB)(D),"aria-disabled":t?"true":void 0,tabIndex:j?void 0:A,onClick:F,onMouseDown:K,onMouseUp:B,onKeyUp:U,onKeyDown:z,onMouseOver:V,onMouseLeave:W})}},546:function(e,n,t){t.d(n,{n:function(){return O}});var o=t(9439),r=t(1413),i=t(3144),u=t(5671),a=t(2791),s=Object.defineProperty,c=function(e,n,t){return function(e,n,t){n in e?s(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t}(e,"symbol"!==typeof n?n+"":n,t),t};function l(e){return e.sort((function(e,n){var t=e.compareDocumentPosition(n);if(t&Node.DOCUMENT_POSITION_FOLLOWING||t&Node.DOCUMENT_POSITION_CONTAINED_BY)return-1;if(t&Node.DOCUMENT_POSITION_PRECEDING||t&Node.DOCUMENT_POSITION_CONTAINS)return 1;if(t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)throw Error("Cannot sort the given nodes.");return 0}))}function f(e,n,t){var o=e+1;return t&&o>=n&&(o=0),o}function d(e,n,t){var o=e-1;return t&&o<0&&(o=n),o}var p="undefined"!==typeof window?a.useLayoutEffect:a.useEffect,v=(0,i.Z)((function e(){var n=this;(0,u.Z)(this,e),c(this,"descendants",new Map),c(this,"register",(function(e){var t;if(null!=e)return"object"==typeof(t=e)&&"nodeType"in t&&t.nodeType===Node.ELEMENT_NODE?n.registerNode(e):function(t){n.registerNode(t,e)}})),c(this,"unregister",(function(e){n.descendants.delete(e);var t=l(Array.from(n.descendants.keys()));n.assignIndex(t)})),c(this,"destroy",(function(){n.descendants.clear()})),c(this,"assignIndex",(function(e){n.descendants.forEach((function(n){var t=e.indexOf(n.node);n.index=t,n.node.dataset.index=n.index.toString()}))})),c(this,"count",(function(){return n.descendants.size})),c(this,"enabledCount",(function(){return n.enabledValues().length})),c(this,"values",(function(){return Array.from(n.descendants.values()).sort((function(e,n){return e.index-n.index}))})),c(this,"enabledValues",(function(){return n.values().filter((function(e){return!e.disabled}))})),c(this,"item",(function(e){if(0!==n.count())return n.values()[e]})),c(this,"enabledItem",(function(e){if(0!==n.enabledCount())return n.enabledValues()[e]})),c(this,"first",(function(){return n.item(0)})),c(this,"firstEnabled",(function(){return n.enabledItem(0)})),c(this,"last",(function(){return n.item(n.descendants.size-1)})),c(this,"lastEnabled",(function(){var e=n.enabledValues().length-1;return n.enabledItem(e)})),c(this,"indexOf",(function(e){var t,o;return e&&null!=(o=null==(t=n.descendants.get(e))?void 0:t.index)?o:-1})),c(this,"enabledIndexOf",(function(e){return null==e?-1:n.enabledValues().findIndex((function(n){return n.node.isSameNode(e)}))})),c(this,"next",(function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=f(e,n.count(),t);return n.item(o)})),c(this,"nextEnabled",(function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=n.item(e);if(o){var r=n.enabledIndexOf(o.node),i=f(r,n.enabledCount(),t);return n.enabledItem(i)}})),c(this,"prev",(function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=d(e,n.count()-1,t);return n.item(o)})),c(this,"prevEnabled",(function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=n.item(e);if(o){var r=n.enabledIndexOf(o.node),i=d(r,n.enabledCount()-1,t);return n.enabledItem(i)}})),c(this,"registerNode",(function(e,t){if(e&&!n.descendants.has(e)){var o=l(Array.from(n.descendants.keys()).concat(e));(null==t?void 0:t.disabled)&&(t.disabled=!!t.disabled);var i=(0,r.Z)({node:e,index:-1},t);n.descendants.set(e,i),n.assignIndex(o)}}))})),m=t(9886),b=t(4591);var h=(0,m.k)({name:"DescendantsProvider",errorMessage:"useDescendantsContext must be used within DescendantsProvider"}),y=(0,o.Z)(h,2),g=y[0],w=y[1];function O(){return[g,function(){return w()},function(){return function(){var e=(0,a.useRef)(new v);return p((function(){return function(){return e.current.destroy()}})),e.current}()},function(e){return function(e){var n=w(),t=(0,a.useState)(-1),r=(0,o.Z)(t,2),i=r[0],u=r[1],s=(0,a.useRef)(null);p((function(){return function(){s.current&&n.unregister(s.current)}}),[]),p((function(){if(s.current){var e=Number(s.current.dataset.index);i==e||Number.isNaN(e)||u(e)}}));var c=e?n.register(e):n.register;return{descendants:n,index:i,enabledIndex:n.enabledIndexOf(s.current),register:(0,b.lq)(c,s)}}(e)}]}},8652:function(e,n,t){t.d(n,{d:function(){return o}});var o=(0,t(5903).I)({d:"M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z",displayName:"AddIcon"})},1123:function(e,n,t){t.d(n,{D:function(){return o}});var o=(0,t(5903).I)({displayName:"BellIcon",d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"})},637:function(e,n,t){function o(e){var n=e.wasSelected,t=e.enabled,o=e.isSelected,r=e.mode;return!t||(!!o||!("keepMounted"!==(void 0===r?"unmount":r)||!n))}t.d(n,{k:function(){return o}})},2790:function(e,n,t){t.d(n,{q:function(){return m}});var o=t(1413),r=t(5987),i=t(9120),u=t(8865),a=t(6992),s=t(2952),c=t(7872),l=t(6151),f=t(184),d=["rootProps","motionProps"],p={enter:{visibility:"visible",opacity:1,scale:1,transition:{duration:.2,ease:[.4,0,.2,1]}},exit:{transitionEnd:{visibility:"hidden"},opacity:0,scale:.8,transition:{duration:.1,easings:"easeOut"}}},v=(0,s.m)(l.E.div),m=(0,c.G)((function(e,n){var t,c,l=e.rootProps,m=e.motionProps,b=(0,r.Z)(e,d),h=(0,u.Xh)(),y=h.isOpen,g=h.onTransitionEnd,w=h.unstable__animationState,O=(0,u._l)(b,n),E=(0,u.Qh)(l),x=(0,i.x)();return(0,f.jsx)(s.m.div,(0,o.Z)((0,o.Z)({},E),{},{__css:{zIndex:null!=(c=e.zIndex)?c:null==(t=x.list)?void 0:t.zIndex},children:(0,f.jsx)(v,(0,o.Z)((0,o.Z)((0,o.Z)({variants:p,initial:!1,animate:y?"enter":"exit",__css:(0,o.Z)({outline:0},x.list)},m),{},{className:(0,a.cx)("chakra-menu__menu-list",O.className)},O),{},{onUpdate:g,onAnimationComplete:(0,a.PP)(w.onComplete,O.onAnimationComplete)}))}))}));m.displayName="MenuList"},7067:function(e,n,t){t.d(n,{j:function(){return p}});var o=t(5987),r=t(1413),i=t(9120),u=t(8865),a=t(7872),s=t(2952),c=t(6992),l=t(184),f=["children","as"],d=(0,a.G)((function(e,n){var t=(0,i.x)();return(0,l.jsx)(s.m.button,(0,r.Z)((0,r.Z)({ref:n},e),{},{__css:(0,r.Z)({display:"inline-flex",appearance:"none",alignItems:"center",outline:0},t.button)}))})),p=(0,a.G)((function(e,n){e.children;var t=e.as,i=(0,o.Z)(e,f),a=(0,u.zZ)(i,n),p=t||d;return(0,l.jsx)(p,(0,r.Z)((0,r.Z)({},a),{},{className:(0,c.cx)("chakra-menu__menu-button",e.className),children:(0,l.jsx)(s.m.span,{__css:{pointerEvents:"none",flex:"1 1 auto",minW:0},children:e.children})}))}));p.displayName="MenuButton"},8865:function(e,n,t){t.d(n,{wN:function(){return T},Kb:function(){return R},H9:function(){return B},zZ:function(){return V},Xh:function(){return z},iX:function(){return H},_l:function(){return G},Qh:function(){return X}});var o=t(1413),r=t(5987),i=t(9439),u=t(3433),a=t(2791);function s(e){var n=e.key;return 1===n.length||n.length>1&&/[^a-zA-Z0-9]/.test(n)}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.timeout,t=void 0===n?300:n,o=e.preventDefault,r=void 0===o?function(){return!0}:o,c=(0,a.useState)([]),l=(0,i.Z)(c,2),f=l[0],d=l[1],p=(0,a.useRef)(),v=function(){p.current&&(clearTimeout(p.current),p.current=null)},m=function(){v(),p.current=setTimeout((function(){d([]),p.current=null}),t)};function b(e){return function(n){if("Backspace"===n.key){var t=(0,u.Z)(f);return t.pop(),void d(t)}if(s(n)){var o=f.concat(n.key);r(n)&&(n.preventDefault(),n.stopPropagation()),d(o),e(o.join("")),m()}}}return(0,a.useEffect)((function(){return v}),[]),b}function l(e,n,t,o){if(null==n)return o;if(!o)return e.find((function(e){return t(e).toLowerCase().startsWith(n.toLowerCase())}));var r,i=e.filter((function(e){return t(e).toLowerCase().startsWith(n.toLowerCase())}));return i.length>0?i.includes(o)?((r=i.indexOf(o)+1)===i.length&&(r=0),i[r]):(r=e.indexOf(i[0]),e[r]):o}var f=t(7799),d=t(546),p=t(3917),v=t(418),m=t(5280);function b(e,n){var t=n.shouldFocus,o=n.visible,r=n.focusRef,i=t&&!o;(0,m.r)((function(){if(i&&!function(e){var n=e.current;if(!n)return!1;var t=(0,p.vY)(n);return!!t&&!n.contains(t)&&!!(0,v.Wq)(t)}(e)){var n=(null==r?void 0:r.current)||e.current;n&&requestAnimationFrame((function(){n.focus()}))}}),[i,e,r])}var h=t(595),y=t(6079),g=t(6367);function w(e){var n=e.ref,t=e.handler,o=e.enabled,r=void 0===o||o,i=(0,g.W)(t),u=(0,a.useRef)({isPointerDown:!1,ignoreEmulatedMouseEvents:!1}).current;(0,a.useEffect)((function(){if(r){var e=function(e){O(e,n)&&(u.isPointerDown=!0)},o=function(e){u.ignoreEmulatedMouseEvents?u.ignoreEmulatedMouseEvents=!1:u.isPointerDown&&t&&O(e,n)&&(u.isPointerDown=!1,i(e))},a=function(e){u.ignoreEmulatedMouseEvents=!0,t&&u.isPointerDown&&O(e,n)&&(u.isPointerDown=!1,i(e))},s=E(n.current);return s.addEventListener("mousedown",e,!0),s.addEventListener("mouseup",o,!0),s.addEventListener("touchstart",e,!0),s.addEventListener("touchend",a,!0),function(){s.removeEventListener("mousedown",e,!0),s.removeEventListener("mouseup",o,!0),s.removeEventListener("touchstart",e,!0),s.removeEventListener("touchend",a,!0)}}}),[t,n,i,u,r])}function O(e,n){var t,o=e.target;if(e.button>0)return!1;if(o&&!E(o).contains(o))return!1;return!(null==(t=n.current)?void 0:t.contains(o))}function E(e){var n;return null!=(n=null==e?void 0:e.ownerDocument)?n:document}var x=t(8596);function C(e){var n=e.isOpen,t=e.ref,o=(0,a.useState)(n),r=(0,i.Z)(o,2),u=r[0],s=r[1],c=(0,a.useState)(!1),l=(0,i.Z)(c,2),f=l[0],d=l[1];return(0,a.useEffect)((function(){f||(s(n),d(!0))}),[n,f,u]),(0,x.O)((function(){return t.current}),"animationend",(function(){s(n)})),{present:!(!n&&!u),onComplete:function(){var e,n=new((0,p.kR)(t.current).CustomEvent)("animationend",{bubbles:!0});null==(e=t.current)||e.dispatchEvent(n)}}}var k=t(9886),N=t(4591),M=t(6992),_=t(637),S=["id","closeOnSelect","closeOnBlur","initialFocusRef","autoSelect","isLazy","isOpen","defaultIsOpen","onClose","onOpen","placement","lazyBehavior","direction","computePositionOnMount"],I=["onMouseEnter","onMouseMove","onMouseLeave","onClick","onFocus","isDisabled","isFocusable","closeOnSelect","type"],Z=(0,d.n)(),D=(0,i.Z)(Z,4),T=D[0],P=D[1],L=D[2],A=D[3],j=(0,k.k)({strict:!1,name:"MenuContext"}),F=(0,i.Z)(j,2),R=F[0],z=F[1];function U(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),o=1;o<n;o++)t[o-1]=arguments[o];var r=(0,a.useId)(),i=e||r;return(0,a.useMemo)((function(){return t.map((function(e){return"".concat(e,"-").concat(i)}))}),[i,t])}function q(e){var n;return null!=(n=null==e?void 0:e.ownerDocument)?n:document}function K(e){return q(e).activeElement===e}function B(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.id,t=e.closeOnSelect,u=void 0===t||t,s=e.closeOnBlur,c=void 0===s||s,l=e.initialFocusRef,f=e.autoSelect,d=void 0===f||f,p=e.isLazy,v=e.isOpen,g=e.defaultIsOpen,O=e.onClose,E=e.onOpen,x=e.placement,k=void 0===x?"bottom-start":x,N=e.lazyBehavior,M=void 0===N?"unmount":N,_=e.direction,I=e.computePositionOnMount,Z=void 0!==I&&I,D=(0,r.Z)(e,S),T=(0,a.useRef)(null),P=(0,a.useRef)(null),A=L(),j=(0,a.useCallback)((function(){requestAnimationFrame((function(){var e;null==(e=T.current)||e.focus({preventScroll:!1})}))}),[]),F=(0,a.useCallback)((function(){var e=setTimeout((function(){var e;if(l)null==(e=l.current)||e.focus();else{var n=A.firstEnabled();n&&$(n.index)}}));ue.current.add(e)}),[A,l]),R=(0,a.useCallback)((function(){var e=setTimeout((function(){var e=A.lastEnabled();e&&$(e.index)}));ue.current.add(e)}),[A]),z=(0,a.useCallback)((function(){null==E||E(),d?F():j()}),[d,F,j,E]),K=(0,y.q)({isOpen:v,defaultIsOpen:g,onClose:O,onOpen:z}),B=K.isOpen,V=K.onOpen,W=K.onClose,G=K.onToggle;w({enabled:B&&c,ref:T,handler:function(e){var n;(null==(n=P.current)?void 0:n.contains(e.target))||W()}});var X=(0,h.D)((0,o.Z)((0,o.Z)({},D),{},{enabled:B||Z,placement:k,direction:_})),H=(0,a.useState)(-1),Q=(0,i.Z)(H,2),J=Q[0],$=Q[1];(0,m.r)((function(){B||$(-1)}),[B]),b(T,{focusRef:P,visible:B,shouldFocus:!0});var ee=C({isOpen:B,ref:T}),ne=U(n,"menu-button","menu-list"),te=(0,i.Z)(ne,2),oe=te[0],re=te[1],ie=(0,a.useCallback)((function(){V(),j()}),[V,j]),ue=(0,a.useRef)(new Set([]));Y((function(){ue.current.forEach((function(e){return clearTimeout(e)})),ue.current.clear()}));var ae=(0,a.useCallback)((function(){V(),F()}),[F,V]),se=(0,a.useCallback)((function(){V(),R()}),[V,R]),ce=(0,a.useCallback)((function(){var e,n,t=q(T.current),o=null==(e=T.current)?void 0:e.contains(t.activeElement);if(B&&!o){var r=null==(n=A.item(J))?void 0:n.node;null==r||r.focus()}}),[B,J,A]);return{openAndFocusMenu:ie,openAndFocusFirstItem:ae,openAndFocusLastItem:se,onTransitionEnd:ce,unstable__animationState:ee,descendants:A,popper:X,buttonId:oe,menuId:re,forceUpdate:X.forceUpdate,orientation:"vertical",isOpen:B,onToggle:G,onOpen:V,onClose:W,menuRef:T,buttonRef:P,focusedIndex:J,closeOnSelect:u,closeOnBlur:c,autoSelect:d,setFocusedIndex:$,isLazy:p,lazyBehavior:M,initialFocusRef:l}}function V(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=z(),r=t.onToggle,i=t.popper,u=t.openAndFocusFirstItem,s=t.openAndFocusLastItem,c=(0,a.useCallback)((function(e){var n=e.key,t={Enter:u,ArrowDown:u,ArrowUp:s}[n];t&&(e.preventDefault(),e.stopPropagation(),t(e))}),[u,s]);return(0,o.Z)((0,o.Z)({},e),{},{ref:(0,N.lq)(t.buttonRef,n,i.referenceRef),id:t.buttonId,"data-active":(0,M.PB)(t.isOpen),"aria-expanded":t.isOpen,"aria-haspopup":"menu","aria-controls":t.menuId,onClick:(0,M.v0)(e.onClick,r),onKeyDown:(0,M.v0)(e.onKeyDown,c)})}function W(e){var n;return function(e){var n;if(!function(e){return null!=e&&"object"==typeof e&&"nodeType"in e&&e.nodeType===Node.ELEMENT_NODE}(e))return!1;var t=null!=(n=e.ownerDocument.defaultView)?n:window;return e instanceof t.HTMLElement}(e)&&!!(null==(n=null==e?void 0:e.getAttribute("role"))?void 0:n.startsWith("menuitem"))}function G(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=z();if(!t)throw new Error("useMenuContext: context is undefined. Seems you forgot to wrap component within <Menu>");var r=t.focusedIndex,i=t.setFocusedIndex,u=t.menuRef,s=t.isOpen,f=t.onClose,d=t.menuId,p=t.isLazy,v=t.lazyBehavior,m=t.unstable__animationState,b=P(),h=c({preventDefault:function(e){return" "!==e.key&&W(e.target)}}),y=(0,a.useCallback)((function(e){var n=e.key,t={Tab:function(e){return e.preventDefault()},Escape:f,ArrowDown:function(){var e=b.nextEnabled(r);e&&i(e.index)},ArrowUp:function(){var e=b.prevEnabled(r);e&&i(e.index)}}[n];if(t)return e.preventDefault(),void t(e);var o=h((function(e){var n=l(b.values(),e,(function(e){var n,t;return null!=(t=null==(n=null==e?void 0:e.node)?void 0:n.textContent)?t:""}),b.item(r));if(n){var t=b.indexOf(n.node);i(t)}}));W(e.target)&&o(e)}),[b,r,h,f,i]),g=(0,a.useRef)(!1);s&&(g.current=!0);var w=(0,_.k)({wasSelected:g.current,enabled:p,mode:v,isSelected:m.present});return(0,o.Z)((0,o.Z)({},e),{},{ref:(0,N.lq)(u,n),children:w?e.children:null,tabIndex:-1,role:"menu",id:d,style:(0,o.Z)((0,o.Z)({},e.style),{},{transformOrigin:"var(--popper-transform-origin)"}),"aria-orientation":"vertical",onKeyDown:(0,M.v0)(e.onKeyDown,y)})}function X(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=z(),t=n.popper,r=n.isOpen;return t.getPopperProps((0,o.Z)((0,o.Z)({},e),{},{style:(0,o.Z)({visibility:r?"visible":"hidden"},e.style)}))}function H(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=e.onMouseEnter,i=e.onMouseMove,u=e.onMouseLeave,s=e.onClick,c=e.onFocus,l=e.isDisabled,d=e.isFocusable,p=e.closeOnSelect,v=e.type,b=(0,r.Z)(e,I),h=z(),y=h.setFocusedIndex,g=h.focusedIndex,w=h.closeOnSelect,O=h.onClose,E=h.menuRef,x=h.isOpen,C=h.menuId,k=(0,a.useRef)(null),M="".concat(C,"-menuitem-").concat((0,a.useId)()),_=A({disabled:l&&!d}),S=_.index,Z=_.register,D=(0,a.useCallback)((function(e){null==t||t(e),l||y(S)}),[y,S,l,t]),T=(0,a.useCallback)((function(e){null==i||i(e),k.current&&!K(k.current)&&D(e)}),[D,i]),P=(0,a.useCallback)((function(e){null==u||u(e),l||y(-1)}),[y,l,u]),L=(0,a.useCallback)((function(e){null==s||s(e),W(e.currentTarget)&&(null!=p?p:w)&&O()}),[O,s,w,p]),j=(0,a.useCallback)((function(e){null==c||c(e),y(S)}),[y,c,S]),F=S===g,R=l&&!d;(0,m.r)((function(){x&&(F&&!R&&k.current?requestAnimationFrame((function(){var e;null==(e=k.current)||e.focus()})):E.current&&!K(E.current)&&E.current.focus())}),[F,R,E,x]);var U=(0,f.h)({onClick:L,onFocus:j,onMouseEnter:D,onMouseMove:T,onMouseLeave:P,ref:(0,N.lq)(Z,k,n),isDisabled:l,isFocusable:d});return(0,o.Z)((0,o.Z)((0,o.Z)({},b),U),{},{type:null!=v?v:U.type,id:M,role:"menuitem",tabIndex:F?0:-1})}function Y(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return(0,a.useEffect)((function(){return function(){return e()}}),n)}},447:function(e,n,t){t.d(n,{s:function(){return y}});var o=t(1413),r=t(5987),i=t(9120),u=t(7872),a=t(2952),s=t(184),c=(0,u.G)((function(e,n){var t=(0,i.x)();return(0,s.jsx)(a.m.span,(0,o.Z)((0,o.Z)({ref:n},e),{},{__css:t.command,className:"chakra-menu__command"}))}));c.displayName="MenuCommand";var l=t(2791),f=["type"],d=(0,u.G)((function(e,n){var t=e.type,u=(0,r.Z)(e,f),c=(0,i.x)(),d=u.as||t?null!=t?t:void 0:"button",p=(0,l.useMemo)((function(){return(0,o.Z)({textDecoration:"none",color:"inherit",userSelect:"none",display:"flex",width:"100%",alignItems:"center",textAlign:"start",flex:"0 0 auto",outline:0},c.item)}),[c.item]);return(0,s.jsx)(a.m.button,(0,o.Z)((0,o.Z)({ref:n,type:d},u),{},{__css:p}))})),p=t(8865),v=t(6992),m=["className","children"],b=function(e){var n=e.className,t=e.children,i=(0,r.Z)(e,m),u=l.Children.only(t),c=(0,l.isValidElement)(u)?(0,l.cloneElement)(u,{focusable:"false","aria-hidden":!0,className:(0,v.cx)("chakra-menu__icon",u.props.className)}):null,f=(0,v.cx)("chakra-menu__icon-wrapper",n);return(0,s.jsx)(a.m.span,(0,o.Z)((0,o.Z)({className:f},i),{},{__css:{flexShrink:0},children:c}))};b.displayName="MenuIcon";var h=["icon","iconSpacing","command","commandSpacing","children"],y=(0,u.G)((function(e,n){var t=e.icon,i=e.iconSpacing,u=void 0===i?"0.75rem":i,a=e.command,l=e.commandSpacing,f=void 0===l?"0.75rem":l,m=e.children,y=(0,r.Z)(e,h),g=(0,p.iX)(y,n),w=t||a?(0,s.jsx)("span",{style:{pointerEvents:"none",flex:1},children:m}):m;return(0,s.jsxs)(d,(0,o.Z)((0,o.Z)({},g),{},{className:(0,v.cx)("chakra-menu__menuitem",g.className),children:[t&&(0,s.jsx)(b,{fontSize:"0.8em",marginEnd:u,children:t}),w,a&&(0,s.jsx)(c,{marginStart:f,children:a})]}))}));y.displayName="MenuItem"},9120:function(e,n,t){t.d(n,{v:function(){return g},x:function(){return y}});var o=t(1413),r=t(5987),i=t(9439),u=t(8865),a=t(9886),s=t(9084),c=t(2030),l=t(5310),f=t(6992),d=t(2791),p=t(184),v=["descendants"],m=(0,a.k)({name:"MenuStylesContext",errorMessage:"useMenuStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<Menu />\" "}),b=(0,i.Z)(m,2),h=b[0],y=b[1],g=function(e){var n=e.children,t=(0,s.jC)("Menu",e),i=(0,c.Lr)(e),a=(0,l.F)().direction,m=(0,u.H9)((0,o.Z)((0,o.Z)({},i),{},{direction:a})),b=m.descendants,y=(0,r.Z)(m,v),g=(0,d.useMemo)((function(){return y}),[y]),w=g.isOpen,O=g.onClose,E=g.forceUpdate;return(0,p.jsx)(u.wN,{value:b,children:(0,p.jsx)(u.Kb,{value:g,children:(0,p.jsx)(h,{value:t,children:(0,f.Pu)(n,{isOpen:w,onClose:O,forceUpdate:E})})})})};g.displayName="Menu"}}]);
//# sourceMappingURL=215.5524f4a0.chunk.js.map