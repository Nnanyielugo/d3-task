(this["webpackJsonpsyrup-tech-screener"]=this["webpackJsonpsyrup-tech-screener"]||[]).push([[0],{208:function(t,e,a){},210:function(t,e,a){},216:function(t,e,a){},217:function(t,e,a){"use strict";a.r(e);var n,r,o,i,c,l,s,u,d,p,f,b,j,h,v,g,m,x=a(0),y=a.n(x),O=a(9),k=a.n(O),w=(a(208),a(13)),T=a(5),S=a(58),C=(a(210),1200),_=600,F=50,L=40,A=50,G=80;function P(t,e,a,b){T.o("svg").remove(),h=e,v=a,g=t,m=b,n=T.o(t.current).append("svg").attr("width",C+G+L).attr("height",_+F+A).append("g").attr("transform","translate(".concat(G,", ").concat(F,")")),r=T.n().range([0,C]),o=T.m().range([_,0]),c=n.append("g").append("circle").style("fill","grey").attr("stroke","black").attr("r",4.5).style("opacity",0),u=T.c((function(t){return t.date})).left,l=T.o("body").append("div").attr("class","tooltip").style("opacity",0),l.append("div").attr("class","tooltip-date"),(s=l.append("div")).append("span").attr("class","tooltip-label"),s.append("span").attr("class","tooltip-value"),a?(p=n.append("g").transition().duration(500).attr("transform","translate(0, ".concat(_,")")).attr("class","x-axis"),f=n.append("g").transition().duration(500).attr("class","y-axis")):(p=n.append("g").attr("transform","translate(0, ".concat(_,")")).attr("class","x-axis"),f=n.append("g").attr("class","y-axis")),function(t,e){if(i=T.j(t,(function(t){return+t.value})),r.domain(T.g(t,(function(t){return t.date}))),o.domain([0,i]),n.append("defs").append("svg:clipPath").attr("id","clip").append("svg:rect").attr("width",C).attr("height",_).attr("x",0).attr("y",0),n.append("g").append("text").attr("y",-10).attr("x",-20).text(m),j=T.d().extent([[0,0],[C,_]]).on("end",E),n.append("linearGradient").attr("id","line-gradient").attr("gradientUnits","userSpaceOnUse").attr("x1",0).attr("y1",o(0)).attr("x2",0).attr("y2",o(i)).selectAll("stop").data([{offset:"0%",color:"red"},{offset:"100%",color:"blue"}]).enter().append("stop").attr("offset",(function(t){return t.offset})).attr("stop-color",(function(t){return t.color})),d=n.append("g").attr("clip-path","url(#clip)"),e){p.call(T.a(r)),f.call(T.b(o));var a=d.append("path").datum(t).attr("fill","none").attr("class","line").attr("stroke",e?"url(#line-gradient)":"steelblue").attr("stroke-linejoin","round").attr("stroke-linecap","round").attr("stroke-width",1.8).attr("d",T.i().x((function(t){return r(t.date)})).y((function(t){return o(t.value)}))),s=a.node().getTotalLength();a.attr("stroke-dash-offset",s).attr("stroke-dasharray",s).transition().duration(3500).ease(T.f).attrTween("stroke-dasharray",(function(){return T.h("0,".concat(s),"".concat(s,",").concat(s))})),n.append("g").attr("fill","none").attr("pointer-events","all").selectAll("rect").data(T.k(t)).join("rect").attr("x",(function(t){var e=Object(w.a)(t,2),a=e[0];e[1];return r(a.date)})).attr("height",_).attr("width",(function(t){var e=Object(w.a)(t,2),a=e[0],n=e[1];return r(n.date)-r(a.date)})).on("touchmove mousemove",(function(e){return function(t,e){var a=r.invert(T.l(t)[0]),n=u(e,a,1),i=e[n-1],s=e[n],d=a.getTime()-i.date.getTime()>s.date.getTime()-a.getTime()?s:i,p=d.date,f=d.value,b=r(p),j=o(f);l.style("opacity",.9),l.select(".tooltip-date").text(function(t){return t.toLocaleString("en",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}(p)),l.select(".tooltip-value").text("$"===m?Object(S.formatMoney)(f):Object(S.formatNumber)(f)),l.select(".tooltip-label").text(m),l.style("left","".concat(t.pageX,"px")).style("top","".concat(t.pageY,"px")),c.attr("cx",b).attr("cy",j).style("opacity",1)}(e,t)})).on("touchend mouseleave",D)}else p.transition().duration(1e3).call(T.a(r)),f.transition().duration(1e3).call(T.b(o)),d.append("path").datum(t).transition().duration(1e3).attr("fill","none").attr("class","line").attr("stroke",e?"url(#line-gradient)":"steelblue").attr("stroke-linejoin","round").attr("stroke-linecap","round").attr("stroke-width",1.8).attr("d",T.i().x((function(t){return r(t.date)})).y((function(t){return o(t.value)})));d.append("g").attr("class","brush").call(j)}(e,a)}function D(){c.style("opacity",0),l.style("opacity",0)}function E(t){var e=t.selection;if(e)r.domain([r.invert(e[0]),r.invert(e[1])]),d.select(".brush").call(j.move,null);else{if(!b)return b=setTimeout(I,350);r.domain([4,8])}p.transition().duration(1e3).call(T.a(r)),d.select(".line").transition().duration(1e3).attr("d",T.i().x((function(t){return r(t.date)})).y((function(t){return o(t.value)}))),n.on("dblclick",M)}function I(){b=null}function M(){P(g,h,v,m)}var N=a(59),R=a(218),U=a(240),z=a(241),B=a(243),J=a(247),V=a(242),$=a(248),X=a(250),Y=a(249),Z=a(3),q=function(t){var e=t.options,a=t.handleClick,n=x.useState(!1),r=Object(w.a)(n,2),o=r[0],i=r[1],c=x.useRef(null),l=x.useState(0),s=Object(w.a)(l,2),u=s[0],d=s[1],p=function(t){c.current&&c.current.contains(t.target)||i(!1)};return Object(Z.jsxs)(Z.Fragment,{children:[Object(Z.jsxs)(U.a,{variant:"contained",color:"primary",ref:c,"aria-label":"split button",style:{margin:10},children:[Object(Z.jsx)(R.a,{children:e[u].label}),Object(Z.jsx)(R.a,{color:"primary",size:"small","aria-controls":o?"split-button-menu":void 0,"aria-expanded":o?"true":void 0,"aria-label":"select merge strategy","aria-haspopup":"menu",onClick:function(){i((function(t){return!t}))},children:Object(Z.jsx)(z.a,{children:"expand_more"})})]}),Object(Z.jsx)($.a,{open:o,anchorEl:c.current,role:void 0,transition:!0,disablePortal:!0,children:function(t){var n=t.TransitionProps,r=t.placement;return Object(Z.jsx)(J.a,Object(N.a)(Object(N.a)({},n),{},{style:{transformOrigin:"bottom"===r?"center top":"center bottom"},children:Object(Z.jsx)(V.a,{children:Object(Z.jsx)(B.a,{onClickAway:p,children:Object(Z.jsx)(Y.a,{id:"split-button-menu",children:e.map((function(t,n){return Object(Z.jsx)(X.a,{disabled:2===n,selected:n===u,onClick:function(){return function(t){d(t);var n=e[t];a(n.value),i(!1)}(n)},children:t.label},t.label)}))})})})}))}})]})},H="total_rev",K="total_vol",Q=[{label:"Total Revenue",value:"total_revenue"},{label:"Total Volume",value:"total_volume"}],W=[{label:"Tooltip and Animated Gradient",value:!0},{label:"Selectable Dates",value:!1}],tt=function(){var t=x.createRef(),e=x.useState("total_revenue"),a=Object(w.a)(e,2),n=a[0],r=a[1],o=x.useState(!0),i=Object(w.a)(o,2),c=i[0],l=i[1];x.useEffect((function(){T.e(",","".concat("/d3-task","/data/aggregated_stock_exchange.csv"),(function(t){return{date:new Date(t.date),value:"total_revenue"===n?+t[H]:+t[K]}})).then((function(e){P(t,e,c,"total_revenue"===n?"$":"N")}))}));return Object(Z.jsxs)(Z.Fragment,{children:[Object(Z.jsx)("div",{id:"chart",ref:t}),Object(Z.jsx)(q,{handleClick:function(t){r(t)},options:Q}),Object(Z.jsx)(q,{handleClick:function(t){l(t)},options:W})]})},et=a(81),at=a.n(et),nt=a(246),rt=a(244),ot=a(82),it=Object(ot.a)(rt.a)({flexGrow:1,backgroundColor:"whitesmoke",margin:0,padding:0,alignItems:"flex-start",height:10}),ct=Object(ot.a)("h3")({marginLeft:"10vw"}),lt=Object(ot.a)("div")({alignSelf:"center",marginLeft:"60vw"});function st(){return Object(Z.jsx)(nt.a,{sx:{flexGrow:1},children:Object(Z.jsx)(it,{children:Object(Z.jsxs)(rt.a,{children:[Object(Z.jsx)(ct,{children:"Syrup Tech Screener"}),Object(Z.jsx)(lt,{children:Object(Z.jsx)(R.a,{onClick:function(){at.a.save(T.o("svg").node(),{filename:"MySVGFile"})},color:"inherit",size:"small",children:Object(Z.jsx)(z.a,{children:"file_download"})})})]})})})}a(216);var ut=function(){return Object(Z.jsxs)("div",{className:"App",children:[Object(Z.jsx)(st,{}),Object(Z.jsx)(tt,{})]})},dt=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,253)).then((function(e){var a=e.getCLS,n=e.getFID,r=e.getFCP,o=e.getLCP,i=e.getTTFB;a(t),n(t),r(t),o(t),i(t)}))};k.a.render(Object(Z.jsx)(y.a.StrictMode,{children:Object(Z.jsx)(ut,{})}),document.getElementById("root")),dt()}},[[217,1,2]]]);
//# sourceMappingURL=main.209f8f2b.chunk.js.map