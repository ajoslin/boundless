webpackJsonp([6,30],{486:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),s=n.n(i),c=n(101),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=function(e){function t(){var e,r,i,c;a(this,t);for(var l=arguments.length,u=Array(l),d=0;d<l;d++)u[d]=arguments[d];return r=i=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),i.state={items:n(581),identifier:"rolodex1000"},i.itemToJSX=function(e){return s.a.createElement("div",{onFocus:function(){return console.log("focused id: "+e.id)},onKeyDown:function(t){return console.log("pressed "+t.key+" on id: "+e.id)}},s.a.createElement("div",{className:"card-left"},s.a.createElement("strong",null,e.first_name," ",e.last_name),s.a.createElement("br",null),s.a.createElement("em",null,e.job_title)),s.a.createElement("div",{className:"card-right"},e.address1,s.a.createElement("br",null),e.city,", ",e.country,s.a.createElement("br",null),s.a.createElement("strong",null,"p:")," ",e.phone,s.a.createElement("br",null),s.a.createElement("strong",null,"e:")," ",e.email))},i.handleItemRequest=function(e){return e>=10?new Promise(function(t){window.setTimeout(function(e){t(i.state.items[e])},2e3,e)}):i.state.items[e]},c=r,o(i,c)}return r(t,e),l(t,[{key:"render",value:function(){return s.a.createElement(c.default,{className:"demo-pagination",customControlContent:"Your custom content",getItem:this.handleItemRequest,identifier:this.state.identifier,itemToJSXConverter:this.itemToJSX,jumpToFirstPageControlContent:"⇤",jumpToLastPageControlContent:"⇥",jumpToNextPageControlContent:"→",jumpToPreviousPageControlContent:"←",numItemsPerPage:5,showPaginationState:!0,totalItems:this.state.items.length})}}]),t}(s.a.PureComponent);t.default=u,u.__docgenInfo={description:""}},581:function(e,t){e.exports=[{id:1,first_name:"Louise",last_name:"Fernandez",job_title:"Database Administrator I",phone:"6-(697)972-8601",email:"lfernandez1@opera.com",address1:"5049 Barnett Road",city:"Nglengkir",country:"Indonesia",country_code:"ID"},{id:2,first_name:"Dennis",last_name:"Nichols",job_title:"Nurse",phone:"9-(896)552-6623",email:"dnichols0@ycombinator.com",address1:"0 Drewry Drive",city:"Canggetelo",country:"Indonesia",country_code:"ID"},{id:3,first_name:"Stephen",last_name:"Hamilton",job_title:"Dental Hygienist",phone:"1-(274)517-4270",email:"shamilton2@amazon.co.jp",address1:"11 David Crossing",city:"Kotabaru",country:"Indonesia",country_code:"ID"},{id:4,first_name:"Shawn",last_name:"Richards",job_title:"Librarian",phone:"1-(173)205-8062",email:"srichards3@4shared.com",address1:"47533 Sherman Street",city:"Viengxay",country:"Laos",country_code:"LA"},{id:5,first_name:"John",last_name:"Hansen",job_title:"Staff Scientist",phone:"5-(650)401-5661",email:"jhansen4@sfgate.com",address1:"955 Jackson Park",city:"South Tangerang",country:"Indonesia",country_code:"ID"},{id:6,first_name:"Ronald",last_name:"Alexander",job_title:"Structural Engineer",phone:"7-(675)732-2723",email:"ralexander5@usgs.gov",address1:"0858 Hooker Court",city:"Kardítsa",country:"Greece",country_code:"GR"},{id:7,first_name:"Shawn",last_name:"Myers",job_title:"Executive Secretary",phone:"0-(903)830-7054",email:"smyers6@addtoany.com",address1:"69605 Rusk Junction",city:"Erpeldange",country:"Luxembourg",country_code:"LU"},{id:8,first_name:"Andrew",last_name:"Hill",job_title:"Research Nurse",phone:"9-(825)250-8207",email:"ahill7@sohu.com",address1:"4 Lunder Junction",city:"Naji",country:"China",country_code:"CN"},{id:9,first_name:"Susan",last_name:"Fowler",job_title:"Product Engineer",phone:"2-(891)897-3096",email:"sfowler8@addtoany.com",address1:"17 Artisan Pass",city:"Oslomej",country:"Macedonia",country_code:"MK"},{id:10,first_name:"Denise",last_name:"Gonzalez",job_title:"Associate Professor",phone:"7-(665)859-5877",email:"dgonzalez9@answers.com",address1:"8538 Sage Hill",city:"Baiima",country:"Sierra Leone",country_code:"SL"},{id:11,first_name:"Janice",last_name:"Russell",job_title:"Paralegal",phone:"9-(331)739-3071",email:"jrussella@miitbeian.gov.cn",address1:"3027 Eastwood Way",city:"Shuangta",country:"China",country_code:"CN"},{id:12,first_name:"Sara",last_name:"Schmidt",job_title:"Analog Circuit Design manager",phone:"6-(053)706-0646",email:"sschmidtb@army.mil",address1:"192 Arapahoe Lane",city:"Loma Alta",country:"Honduras",country_code:"HN"},{id:13,first_name:"Nicole",last_name:"Carter",job_title:"Dental Hygienist",phone:"0-(074)579-1178",email:"ncarterc@alibaba.com",address1:"8768 Everett Avenue",city:"Naili",country:"Philippines",country_code:"PH"},{id:14,first_name:"Nicholas",last_name:"Olson",job_title:"Structural Analysis Engineer",phone:"5-(488)878-9954",email:"nolsond@imgur.com",address1:"7767 Vahlen Center",city:"Végueta",country:"Peru",country_code:"PE"},{id:15,first_name:"Jose",last_name:"Shaw",job_title:"Junior Executive",phone:"3-(596)678-9655",email:"jshawe@mozilla.com",address1:"07124 Roth Center",city:"Jalgung",country:"Indonesia",country_code:"ID"},{id:16,first_name:"Melissa",last_name:"Gilbert",job_title:"Desktop Support Technician",phone:"7-(291)303-4672",email:"mgilbertf@adobe.com",address1:"7 Badeau Point",city:"Sañgay",country:"Philippines",country_code:"PH"},{id:17,first_name:"Robin",last_name:"Scott",job_title:"Senior Editor",phone:"7-(080)370-9889",email:"rscottg@arstechnica.com",address1:"61 Pine View Trail",city:"Londrina",country:"Brazil",country_code:"BR"},{id:18,first_name:"David",last_name:"Kim",job_title:"Software Engineer IV",phone:"7-(109)412-0503",email:"dkimh@opensource.org",address1:"82409 Comanche Avenue",city:"Moglicë",country:"Albania",country_code:"AL"},{id:19,first_name:"Heather",last_name:"Simpson",job_title:"Senior Sales Associate",phone:"9-(542)139-8088",email:"hsimpsoni@yelp.com",address1:"89 Browning Crossing",city:"Saitama",country:"Japan",country_code:"JP"}]}});