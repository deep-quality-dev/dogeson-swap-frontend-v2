(this["webpackJsonppancake-frontend"]=this["webpackJsonppancake-frontend"]||[]).push([[5],{1553:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return A}));var c,j,i=n(8),o=n(6),l=n(1),r=n(10),a=n(2),b=n(4),d=n(15),s=n(99),O=n(34),x=n(56),u=n(194),p=n(27),h=n(645),g=n(110),f=n(30),y=n(55),m=n(108),v=n(445),T=n(115),k=n(143),I=n(152),E=n(329),N=n(0);!function(e){e[e.TOKEN0=0]="TOKEN0",e[e.TOKEN1=1]="TOKEN1"}(j||(j={}));var S=Object(b.e)(a.k)(c||(c=Object(o.a)(["\n  background-color: ",";\n  color: ",";\n  box-shadow: none;\n  border-radius: 16px;\n"])),(function(e){return e.theme.colors.input}),(function(e){return e.theme.colors.text}));function A(){var e,t=Object(f.a)().account,n=Object(d.b)().t,c=Object(l.useState)(j.TOKEN1),o=Object(i.a)(c,2),b=o[0],A=o[1],C=Object(l.useState)(r.d),K=Object(i.a)(C,2),w=K[0],q=K[1],B=Object(l.useState)(null),L=Object(i.a)(B,2),X=L[0],D=L[1],J=Object(g.b)(null!==w&&void 0!==w?w:void 0,null!==X&&void 0!==X?X:void 0),M=Object(i.a)(J,2),P=M[0],F=M[1],G=Object(y.f)();Object(l.useEffect)((function(){F&&G(F)}),[F,G]);var R=P===g.a.NOT_EXISTS||Boolean(P===g.a.EXISTS&&F&&r.e.equal(F.reserve0.raw,r.e.BigInt(0))&&r.e.equal(F.reserve1.raw,r.e.BigInt(0))),V=Object(m.d)(null!==t&&void 0!==t?t:void 0,null===F||void 0===F?void 0:F.liquidityToken),W=Boolean(V&&r.e.greaterThan(V.raw,r.e.BigInt(0))),Y=Object(l.useCallback)((function(e){b===j.TOKEN0?q(e):D(e)}),[b]),_=Object(N.jsx)(s.b,{padding:"45px 10px",children:Object(N.jsx)(a.nb,{textAlign:"center",children:n(t?"Select a token to find your liquidity.":"Connect to a wallet to find pools")})}),z=Object(a.Eb)(Object(N.jsx)(h.a,{onCurrencySelect:Y,showCommonBases:!0,selectedCurrency:null!==(e=b===j.TOKEN0?X:w)&&void 0!==e?e:void 0}),!0,!0,"selectCurrencyModal"),H=Object(i.a)(z,1)[0];return Object(N.jsx)(E.a,{children:Object(N.jsxs)(I.a,{children:[Object(N.jsx)(I.b,{title:n("Import Pool"),subtitle:n("Import an existing pool"),backTo:"/pool"}),Object(N.jsxs)(O.a,{style:{padding:"1rem"},gap:"md",children:[Object(N.jsx)(S,{endIcon:Object(N.jsx)(a.x,{}),onClick:function(){H(),A(j.TOKEN0)},children:w?Object(N.jsxs)(p.d,{children:[Object(N.jsx)(x.a,{currency:w}),Object(N.jsx)(a.nb,{ml:"8px",children:w.symbol})]}):Object(N.jsx)(a.nb,{ml:"8px",children:n("Select a Token")})}),Object(N.jsx)(O.b,{children:Object(N.jsx)(a.a,{})}),Object(N.jsx)(S,{endIcon:Object(N.jsx)(a.x,{}),onClick:function(){H(),A(j.TOKEN1)},children:X?Object(N.jsxs)(p.d,{children:[Object(N.jsx)(x.a,{currency:X}),Object(N.jsx)(a.nb,{ml:"8px",children:X.symbol})]}):Object(N.jsx)(a.nb,{as:p.d,children:n("Select a Token")})}),W&&Object(N.jsxs)(O.b,{style:{justifyItems:"center",backgroundColor:"",padding:"12px 0px",borderRadius:"12px"},children:[Object(N.jsx)(a.nb,{textAlign:"center",children:n("Pool Found!")}),Object(N.jsx)(v.a,{to:"/pool",children:Object(N.jsx)(a.nb,{textAlign:"center",children:n("Manage this pool.")})})]}),w&&X?P===g.a.EXISTS?W&&F?Object(N.jsx)(u.a,{pair:F}):Object(N.jsx)(s.b,{padding:"45px 10px",children:Object(N.jsxs)(O.a,{gap:"sm",justify:"center",children:[Object(N.jsx)(a.nb,{textAlign:"center",children:n("You don\u2019t have liquidity in this pool yet.")}),Object(N.jsx)(v.a,{to:"/add/".concat(Object(T.a)(w),"/").concat(Object(T.a)(X)),children:Object(N.jsx)(a.nb,{textAlign:"center",children:n("Add Liquidity")})})]})}):R?Object(N.jsx)(s.b,{padding:"45px 10px",children:Object(N.jsxs)(O.a,{gap:"sm",justify:"center",children:[Object(N.jsx)(a.nb,{textAlign:"center",children:n("No pool found.")}),Object(N.jsx)(v.a,{to:"/add/".concat(Object(T.a)(w),"/").concat(Object(T.a)(X)),children:n("Create pool.")})]})}):P===g.a.INVALID?Object(N.jsx)(s.b,{padding:"45px 10px",children:Object(N.jsx)(O.a,{gap:"sm",justify:"center",children:Object(N.jsx)(a.nb,{textAlign:"center",fontWeight:500,children:n("Invalid pair.")})})}):P===g.a.LOADING?Object(N.jsx)(s.b,{padding:"45px 10px",children:Object(N.jsx)(O.a,{gap:"sm",justify:"center",children:Object(N.jsxs)(a.nb,{textAlign:"center",children:[n("Loading"),Object(N.jsx)(k.a,{})]})})}):null:_]})]})})}}}]);
//# sourceMappingURL=5.b782d5ad.chunk.js.map