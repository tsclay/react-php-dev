(this["webpackJsonpbasic-app"]=this["webpackJsonpbasic-app"]||[]).push([[0],{18:function(e,t,n){e.exports=n(42)},23:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(14),c=n.n(o);n(23);var u=function(){return r.a.createElement("div",{className:"heading"},r.a.createElement("h1",null,"Hello, RAPP app!"))},l=n(2),s=n.n(l),p=n(4),i=n(15),m=n(17),d=n(16),P=n(3),f=n.n(P),g=function(e){Object(m.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this)).componentDidMount=function(e){f.a.get(a.API_URL).then((function(e){a.setState({people:e.data})}))},a.createPerson=function(e){e.preventDefault(),f.a.post(a.API_URL,{name:a.state.newPersonName,age:a.state.newPersonAge}).then((function(e){console.log(e),a.setState({people:e.data})}))},a.updatePerson=function(){var e=Object(p.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=t.target.getAttribute("id"),e.next=4,f.a.put("".concat(a.API_URL,"/").concat(n),{name:a.state.updatePersonName,age:a.state.updatePersonAge});case 4:r=e.sent,a.setState({people:r.data});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.deletePerson=function(){var e=Object(p.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.delete("".concat(a.API_URL,"/").concat(t.target.value));case 2:n=e.sent,console.log(n.data),a.setState({people:n.data});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.changeNewPersonName=function(e){a.setState({newPersonName:e.target.value})},a.changeNewPersonAge=function(e){a.setState({newPersonAge:e.target.value})},a.updatePersonAge=function(e){a.setState({updatePersonAge:e.target.value})},a.updatePersonName=function(e){a.setState({updatePersonName:e.target.value})},a.render=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,"Add new person"),r.a.createElement("form",{onSubmit:a.createPerson},r.a.createElement("input",{onKeyUp:a.changeNewPersonName,type:"text",placeholder:"name"}),r.a.createElement("br",null),r.a.createElement("input",{onKeyUp:a.changeNewPersonAge,type:"number",placeholder:"age"}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"CREATE")),r.a.createElement("h2",null,"Contact List"),r.a.createElement("ul",null,a.state.people.map((function(e){return r.a.createElement("li",{key:e.id},e.name,": ",e.age,r.a.createElement("button",{value:e.id,onClick:a.deletePerson},"DELETE"),r.a.createElement("form",{id:e.id,onSubmit:a.updatePerson},r.a.createElement("input",{onKeyUp:a.updatePersonName,type:"text",placeholder:"name"}),r.a.createElement("input",{onKeyUp:a.updatePersonAge,type:"text",placeholder:"age"}),r.a.createElement("button",{type:"submit"},"Change")))}))))},a.state={people:[]},a.API_URL=e.API_URL,a}return n}(r.a.Component),E="";E="http://localhost:8888/people",c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u,null),r.a.createElement(g,{API_URL:E})),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.4d0ead11.chunk.js.map