(this["webpackJsonpultimate-systems-recr-task"]=this["webpackJsonpultimate-systems-recr-task"]||[]).push([[0],{100:function(e,t,r){},227:function(e,t,r){},228:function(e,t,r){},229:function(e,t,r){"use strict";r.r(t);var s,a=r(0),n=r(41),c=r.n(n),o=(r(98),r(99),r(100),r(8)),i=r(9),l=r(26),u=r(11),d=r(12),j=r(24),b=r(3),m=r.n(b),p=r(2),f=r(13),O=r(88),h=r.n(O).a.create({baseURL:"https://recruitment.ultimate.systems/",timeout:1e3}),g=Object(j.b)("user/login",function(){var e=Object(f.a)(m.a.mark((function e(t,r){var s,a,n,c,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.identifier,a=t.password,e.prev=1,e.next=4,h.post("auth/local",{identifier:s,password:a});case 4:if(n=e.sent,c=n.data,i={token:c.jwt,email:c.user.email,login:c.user.username,isLogged:!0},200!==n.status){e.next=12;break}return localStorage.setItem("user",JSON.stringify(i)),e.abrupt("return",Object(o.a)({},c));case 12:return e.abrupt("return",r.rejectWithValue.apply(r,Object(p.a)(c)));case 13:e.next=19;break;case 15:return e.prev=15,e.t0=e.catch(1),console.log("Error",e.t0.response.data),e.abrupt("return",r.rejectWithValue(e.t0.response.data));case 19:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(t,r){return e.apply(this,arguments)}}()),x=Object(j.b)("user/register",function(){var e=Object(f.a)(m.a.mark((function e(t,r){var s,a,n,c,i,l;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.username,a=t.email,n=t.password,e.prev=1,e.next=4,h.post("auth/local/register",{username:s,email:a,password:n});case 4:if(c=e.sent,i=c.data,l={token:i.jwt,email:i.user.email,login:i.user.username,isLogged:!0},200!==c.status){e.next=12;break}return localStorage.setItem("user",JSON.stringify(l)),e.abrupt("return",Object(o.a)({},i));case 12:return console.log("Error",c.status),console.log("Error",c.data),e.abrupt("return",r.rejectWithValue.apply(r,Object(p.a)(i)));case 15:e.next=21;break;case 17:return e.prev=17,e.t0=e.catch(1),console.log("Error",e.t0.response.data),e.abrupt("return",r.rejectWithValue(e.t0.response.data));case 21:case"end":return e.stop()}}),e,null,[[1,17]])})));return function(t,r){return e.apply(this,arguments)}}()),v=Object(j.b)("user/todos",function(){var e=Object(f.a)(m.a.mark((function e(t,r){var s,a,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.foundUserToken,e.prev=1,e.next=4,h.get("to-do-lists",{headers:{Authorization:"Bearer "+s}});case 4:if(a=e.sent,n=a.data,200!==a.status){e.next=10;break}return e.abrupt("return",n);case 10:return console.log("Error",a.status),console.log("Error",a.data),e.abrupt("return",r.rejectWithValue.apply(r,Object(p.a)(n)));case 13:e.next=19;break;case 15:return e.prev=15,e.t0=e.catch(1),console.log("Error",e.t0.response.data),e.abrupt("return",r.rejectWithValue(e.t0.response.data));case 19:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(t,r){return e.apply(this,arguments)}}()),k=r(19),w=k.a().shape({identifier:k.c().required("email or username is required"),password:k.c().required("password is required")}),L=k.a().shape({username:k.c().required("username is required"),email:k.c().email().required("email is required"),password:k.c().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,"at least 8 characters, one uppercase and one special character").required(),rePassword:k.c().oneOf([k.b("password"),null],"passwords must match").required("passwords must match")}),N="alph",y="by-done",S="by-undone",E="by-date",T=Object(j.c)({name:"user",initialState:{email:"",login:"",isLoading:!1,isLogged:!1,isError:!1,errorMsg:"",todoLists:[],filteredTodoLists:[]},reducers:{clearState:function(e){return e.isLoading=!1,e.isError=!1,e.errorMsg="",e},cleanWholeState:function(e){e.email="",e.login="",e.isLoading=!1,e.isLogged=!1,e.isError=!1,e.errorMsg="",e.todoLists=[],e.filteredTodoLists=[]},sortToDoListsBy:function(e,t){switch(t.payload){case N:e.filteredTodoLists.sort((function(e,t){return e.name.toLowerCase()>t.name.toLowerCase()?1:-1}));break;case y:e.filteredTodoLists.sort((function(e,t){return e.task.filter((function(e){return e.isDone})).length>t.task.filter((function(e){return e.isDone})).length?-1:1}));break;case S:e.filteredTodoLists.sort((function(e,t){return e.task.filter((function(e){return!e.isDone})).length>t.task.filter((function(e){return!e.isDone})).length?-1:1}));break;default:e.filteredTodoLists.sort((function(e,t){return e.created_at<t.created_at?1:-1}))}},searchToDoList:function(e,t){var r=t.payload;r.length>0?e.filteredTodoLists=e.todoLists.filter((function(e){return-1!==e.name.toLowerCase().search(r)&&e})):e.filteredTodoLists=e.todoLists},setPreviouslyLoggedUser:function(e,t){var r=t.payload;e.email=r.email,e.login=r.login,e.isLogged=!0}},extraReducers:(s={},Object(d.a)(s,g.fulfilled,(function(e,t){var r=t.payload;e.email=r.user.email,e.login=r.user.username,e.isLoading=!1,e.isLogged=!0,e.isError=!1})),Object(d.a)(s,g.pending,(function(e){e.isLoading=!0})),Object(d.a)(s,g.rejected,(function(e,t){var r=t.payload;e.isLoading=!1,e.isLogged=!1,e.isError=!0,e.errorMsg=r.message[0].messages[0].message})),Object(d.a)(s,x.fulfilled,(function(e,t){var r=t.payload;e.email=r.user.email,e.login=r.user.username,e.isLoading=!1,e.isLogged=!0,e.isError=!1})),Object(d.a)(s,x.pending,(function(e){e.isLoading=!0})),Object(d.a)(s,x.rejected,(function(e,t){var r=t.payload;e.isLoading=!1,e.isLogged=!1,e.isError=!0,e.errorMsg=r.message[0].messages[0].message})),Object(d.a)(s,v.fulfilled,(function(e,t){var r=t.payload;e.isLoading=!1,e.todoLists=r,e.filteredTodoLists=r})),Object(d.a)(s,v.pending,(function(e){e.isLoading=!0})),Object(d.a)(s,v.rejected,(function(e){e.isLoading=!1})),s)}),C=T.reducer,D=T.actions,I=D.clearState,q=D.cleanWholeState,M=D.sortToDoListsBy,B=D.searchToDoList,P=D.setPreviouslyLoggedUser,U=C,J=r(21),W=r(43),A=r(1),V=function(){var e,t,r=Object(i.g)(),s=Object(u.b)(),n=Object(u.c)((function(e){return e.user})),c=n.isLoading,d=n.isLogged,j=n.isError,b=n.errorMsg,m=Object(J.d)({resolver:Object(W.a)(w)}),p=m.register,f=m.handleSubmit,O=m.reset,h=m.formState.errors;return Object(a.useEffect)((function(){return function(){s(I())}}),[]),Object(a.useEffect)((function(){O(),j&&setTimeout((function(){return s(I())}),3500),d&&(s(I()),r.push("/"))}),[j,d]),Object(A.jsxs)("div",{className:"login-form-wrapper",children:[Object(A.jsx)("span",{className:"login-header",children:"Login"}),Object(A.jsxs)("form",{onSubmit:f((function(e){s(g(e))})),className:"login-form",children:[Object(A.jsx)("input",Object(o.a)({placeholder:"Email or Username",type:"text"},p("identifier"))),Object(A.jsx)("p",{className:"form-error",children:null===(e=h.identifier)||void 0===e?void 0:e.message}),Object(A.jsx)("input",Object(o.a)({placeholder:"Password",type:"password"},p("password"))),Object(A.jsx)("p",{className:"form-error",children:null===(t=h.password)||void 0===t?void 0:t.message}),Object(A.jsxs)("button",{type:"submit",className:"login-btn",children:[c?"Loading...":"Login"," "]})]}),Object(A.jsx)("p",{children:"or"}),Object(A.jsx)(l.b,{to:"/register",className:"register-link",children:" create an account "}),j&&Object(A.jsxs)("div",{children:[" ",b," "]})]})},z=r.p+"static/media/left-arrow.a7008190.svg",R=function(){var e,t,r,s,n=Object(i.g)(),c=Object(u.b)(),d=Object(u.c)((function(e){return e.user})),j=d.isLoading,b=d.isLogged,m=d.isError,p=d.errorMsg,f=Object(J.d)({resolver:Object(W.a)(L)}),O=f.register,h=f.handleSubmit,g=f.reset,v=f.formState.errors;return Object(a.useEffect)((function(){return function(){c(I())}}),[]),Object(a.useEffect)((function(){g(),m&&setTimeout((function(){return c(I())}),5e3),b&&(c(I()),n.push("/"))}),[m,b]),Object(A.jsxs)("div",{className:"login-form-wrapper",children:[Object(A.jsx)(l.b,{to:"/login",children:Object(A.jsx)("img",{className:"back-to-login",src:z,alt:"left-arrow"})}),Object(A.jsx)("span",{className:"login-header",children:"Create an new account"}),Object(A.jsxs)("form",{onSubmit:h((function(e){var t=e.username,r=e.email,s=e.password;c(x({username:t,email:r,password:s}))})),className:"login-form",children:[Object(A.jsx)("input",Object(o.a)({placeholder:"Username",type:"text"},O("username"))),Object(A.jsx)("p",{className:"form-error",children:null===(e=v.username)||void 0===e?void 0:e.message}),Object(A.jsx)("input",Object(o.a)({placeholder:"Email"},O("email"))),Object(A.jsx)("p",{className:"form-error",children:null===(t=v.email)||void 0===t?void 0:t.message}),Object(A.jsx)("input",Object(o.a)({placeholder:"Password",type:"password"},O("password"))),Object(A.jsx)("p",{className:"form-error",children:null===(r=v.password)||void 0===r?void 0:r.message}),Object(A.jsx)("input",Object(o.a)({placeholder:"Repeat Password",type:"password"},O("rePassword"))),Object(A.jsx)("p",{className:"form-error",children:null===(s=v.rePassword)||void 0===s?void 0:s.message}),Object(A.jsx)("button",{type:"submit",className:"login-btn",children:j?"Loading...":"Create"})]}),m&&Object(A.jsxs)("div",{children:[" ",p," "]})]})},$=r(7),_=(r(227),r(228),r(93)),F=function(e){var t=e.task,r=e.onChange,s=e.remove,a=e.disabled;return Object(A.jsx)("div",{children:Object(A.jsxs)("div",{className:"new-task-content",children:[Object(A.jsxs)("label",{className:"checkbox",children:[Object(A.jsx)("input",{"data-testid":"task-checkbox",type:"checkbox",checked:t.isDone,onChange:r,disabled:a}),Object(A.jsx)("span",{})]}),Object(A.jsx)("input",{type:"text",placeholder:"Task name",value:t.name,disabled:!0}),!a&&Object(A.jsx)(_.a,{className:"remove-btn",onClick:s})]})})},Z=function(e){var t=e.setIsModal,r=e.chosenToDoIdx,s=Object(u.b)(),n=Object(u.c)((function(e){return e.user})).filteredTodoLists,c=Object(a.useState)(""),i=Object($.a)(c,2),l=i[0],d=i[1],j=Object(a.useState)([]),b=Object($.a)(j,2),O=b[0],g=b[1],x=Object(a.useState)(""),k=Object($.a)(x,2),w=k[0],L=k[1],N=Object(a.useState)({name:"",isDone:!1}),y=Object($.a)(N,2),S=y[0],E=y[1],T=Object(a.useState)(-1!==r),C=Object($.a)(T,2),D=C[0];C[1];Object(a.useEffect)((function(){if(-1!==r){var e=n[r],t=e.name,s=e.task;d(t),g(s)}}),[n]);var I=function(e){L(e),setTimeout((function(){L("")}),3500)},q=function(){var e=Object(f.a)(m.a.mark((function e(){var t,r,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Boolean(l.match(/^(?!\s*$).+/))){e.next=17;break}return t=localStorage.getItem("user"),r=JSON.parse(t).token,a={name:l,task:O},e.prev=4,e.next=7,h.post("to-do-lists",a,{headers:{Authorization:"Bearer "+r}});case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(4),console.log("Error "+e.t0.response.data);case 12:s(v({foundUserToken:r})),d(""),g([]),I("New todo list has been added"),e.next=18;break;case 17:I("Please insert a new todo list name");case 18:case"end":return e.stop()}}),e,null,[[4,9]])})));return function(){return e.apply(this,arguments)}}();return Object(A.jsx)("div",{className:"modal-container",children:Object(A.jsxs)("div",{className:"modal-content",children:[Object(A.jsx)("input",{className:"new-todo-name",type:"text",placeholder:"List name",value:l,onChange:function(e){return d(e.target.value)},disabled:D}),Object(A.jsx)("div",{className:"divider"}),Object(A.jsxs)("div",{className:"todo-tasks",children:[Object(A.jsx)("ul",{children:O.map((function(e,t){return Object(A.jsx)(F,{task:e,onChange:function(){return function(e){var t=Object(p.a)(O);t[e].isDone=!t[e].isDone,g(t)}(t)},remove:function(){return function(e){var t=O.filter((function(t,r){return r!==e}));g(t)}(t)},disabled:D},t)}))}),!D&&Object(A.jsxs)(A.Fragment,{children:[Object(A.jsxs)("div",{className:"new-task-content",children:[Object(A.jsxs)("label",{className:"checkbox",children:[Object(A.jsx)("input",{type:"checkbox",checked:S.isDone,onChange:function(e){E((function(t){return Object(o.a)(Object(o.a)({},t),{},{isDone:e.target.checked})}))}}),Object(A.jsx)("span",{})]}),Object(A.jsx)("input",{type:"text",placeholder:"Task name",value:S.name,onChange:function(e){E((function(t){return Object(o.a)(Object(o.a)({},t),{},{name:e.target.value})}))}})]}),Object(A.jsxs)("div",{className:"add-new-task-menu",children:[Object(A.jsx)("button",{className:"cancel-new-todo",onClick:function(){return E({name:"",isDone:!1})},children:"Cancel"}),Object(A.jsx)("button",{className:"add-new-todo",onClick:function(){Boolean(S.name.match(/^(?!\s*$).+/))&&(E({name:"",isDone:!1}),g((function(e){return[].concat(Object(p.a)(e),[S])})))},children:"Add"})]})]})]}),Object(A.jsxs)("div",{className:"modal-footer",children:[Object(A.jsx)("p",{className:"modal-close",onClick:function(){t(!1)},children:"Cancel"}),Boolean(w)&&Object(A.jsx)("p",{className:"modal-message",children:w}),!D&&Object(A.jsx)("button",{className:"save-todo-btn",onClick:q,children:"Save"})]})]})})},G=function(){var e=Object(u.b)(),t=Object(a.useState)(!1),r=Object($.a)(t,2),s=r[0],n=r[1],c=Object(a.useState)(-1),o=Object($.a)(c,2),i=o[0],l=o[1],d=Object(u.c)((function(e){return e.user})).filteredTodoLists;return Object(a.useEffect)((function(){var t=localStorage.getItem("user"),r=JSON.parse(t).token;e(v({foundUserToken:r}))}),[]),Object(A.jsxs)("div",{className:"to-do-lists-container",children:[Object(A.jsxs)("menu",{className:"to-do-lists-menu",children:[Object(A.jsx)("input",{placeholder:"Search",onChange:function(t){return e(B(t.target.value))}}),Object(A.jsxs)("select",{placeholder:"Search",onChange:function(t){return e(M(t.target.value))},children:[Object(A.jsx)("option",{value:E,children:"Sort by"}),Object(A.jsx)("option",{value:N,children:"alphabetically"}),Object(A.jsx)("option",{value:y,children:"by done tasks"}),Object(A.jsx)("option",{value:S,children:"by undone tasks"})]})]}),Object(A.jsxs)("ul",{className:"to-do-lists",children:[d.map((function(e,t){var r=e.task.length,s=e.task.filter((function(e){return e.isDone})).length,a=function(e){var t=e.substr(0,10).split("-");return"".concat(t[2],"-").concat(t[1],"-").concat(t[0])}(e.created_at);return Object(A.jsxs)("li",{onClick:function(){return function(e){l(e),n(!0)}(t)},children:[Object(A.jsx)("span",{className:"to-do-name",children:e.name}),Object(A.jsx)("span",{className:"to-do-creation-date",children:"Created at: ".concat(a)}),Object(A.jsx)("span",{className:"to-do-tasks-status",children:"Completed: ".concat(s," Uncompleted: ").concat(r-s," All: ").concat(r)})]},e.id)})),Object(A.jsx)("div",{className:"add-new-to-do",onClick:function(){l(-1),n(!0)},children:Object(A.jsx)("div",{className:"add-new-to-do"})})]}),s&&Object(A.jsx)(Z,{setIsModal:n,chosenToDoIdx:i})]})},H=r(92),K=["children"],Q=function(e){var t=e.children,r=Object(H.a)(e,K),s=localStorage.getItem("user"),a=JSON.parse(s);return Object(A.jsx)(i.b,Object(o.a)(Object(o.a)({},r),{},{render:function(e){var r=e.location;return Boolean(a)?t:Object(A.jsx)(i.a,{to:{pathname:"/login",state:{from:r}}})}}))},X=function(){return Object(A.jsx)("div",{children:Object(A.jsx)("p",{children:"Not found"})})},Y=r.p+"static/media/door.02cf749c.svg",ee=r.p+"static/media/arrow.3c6d235c.svg";function te(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.user})).isLogged;return Object(a.useEffect)((function(){var t=JSON.parse(localStorage.getItem("user"));t&&e(P(t))}),[]),Object(A.jsx)(l.a,{children:Object(A.jsxs)("div",{className:"App",children:[Object(A.jsx)("div",{className:"app-name",children:Object(A.jsx)("h1",{children:"ToDo-List"})}),Object(A.jsxs)(i.d,{children:[Object(A.jsx)(i.b,{exact:!0,path:"/login",component:V}),Object(A.jsx)(i.b,{exact:!0,path:"/register",component:R}),Object(A.jsxs)(Q,{exact:!0,path:"/",children:[" ",Object(A.jsx)(G,{})," "]}),Object(A.jsx)(i.b,{component:X})]}),t&&Object(A.jsxs)("div",{className:"logout-button",onClick:function(){localStorage.clear(),e(q())},children:[Object(A.jsx)("img",{className:"door-icon",src:Y,alt:"door-icon"}),Object(A.jsx)("img",{className:"right-arrow-icon",src:ee,alt:"right-arrow-icon"})]})]})})}var re=Object(j.a)({reducer:{user:U}});c.a.render(Object(A.jsx)(a.StrictMode,{children:Object(A.jsx)(u.a,{store:re,children:Object(A.jsx)(te,{})})}),document.getElementById("root"))},98:function(e,t,r){},99:function(e,t,r){}},[[229,1,2]]]);
//# sourceMappingURL=main.0403b8f5.chunk.js.map