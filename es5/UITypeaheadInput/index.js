"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0});var _react=require("react"),_react2=_interopRequireDefault(_react),_UIView2=require("../UIView"),_UIView3=_interopRequireDefault(_UIView2),_noop=require("../UIUtils/noop"),_noop2=_interopRequireDefault(_noop),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),_escapeStringRegexp=require("escape-string-regexp"),_escapeStringRegexp2=_interopRequireDefault(_escapeStringRegexp),UITypeaheadInput=function(_UIView){function UITypeaheadInput(){return _classCallCheck(this,UITypeaheadInput),_possibleConstructorReturn(this,Object.getPrototypeOf(UITypeaheadInput).apply(this,arguments))}return _inherits(UITypeaheadInput,_UIView),_createClass(UITypeaheadInput,[{key:"initialState",value:function(){return{entityMatchIndexes:[],selectedEntityIndex:-1,id:this.uuid(),userInput:this.props.defaultValue}}},{key:"componentWillMount",value:function(){this.props.defaultValue&&this.computeMatches()}},{key:"componentWillReceiveProps",value:function(nextProps){nextProps.entities!==this.props.entities&&this.computeMatches(nextProps.entities)}},{key:"componentDidUpdate",value:function(prevProps,prevState){this.state.entityMatchIndexes.length&&!prevState.entityMatchIndexes.length&&(this.refs.matches.scrollTop=0)}},{key:"getSelectedEntityText",value:function(){var entity=this.props.entities[this.state.selectedEntityIndex];return entity?entity.text:""}},{key:"handleMatchClick",value:function(index){var _this2=this;this.setState({selectedEntityIndex:index},function(){return _this2.setValueWithSelectedEntity()})}},{key:"selectMatch",value:function(delta){var matches=this.state.entityMatchIndexes,totalMatches=matches.length,nextIndex=matches.indexOf(this.state.selectedEntityIndex)+delta;if(totalMatches){0>nextIndex?nextIndex=totalMatches-1:nextIndex>=totalMatches&&(nextIndex=0);var matchIndex=matches[nextIndex],matchesNode=this.refs.matches,matchesNodeYEnd=matchesNode.scrollTop+matchesNode.clientHeight,matchNode=this.refs["match_$"+matchIndex],matchNodeYStart=matchNode.offsetTop,matchNodeYEnd=matchNodeYStart+matchNode.clientHeight;matchNodeYEnd>=matchesNodeYEnd?matchesNode.scrollTop+=matchNodeYEnd-matchesNodeYEnd:matchNodeYStart<=matchesNode.scrollTop&&(matchesNode.scrollTop=matchNodeYStart),this.setState({selectedEntityIndex:matchIndex})}}},{key:"resetMatches",value:function(){this.setState({selectedEntityIndex:-1,entityMatchIndexes:[]})}},{key:"getInputNode",value:function(){return this.refs.input}},{key:"focusInput",value:function(){this.getInputNode().focus()}},{key:"setValue",value:function(newValue){this.getInputNode().value=newValue,this.setState({userInput:newValue}),this.resetMatches(),this.focusInput()}},{key:"cursorAtEndOfInput",value:function(){var node=this.getInputNode();return node.selectionStart===node.selectionEnd&&node.selectionEnd===node.value.length}},{key:"setValueWithSelectedEntity",value:function(){this.props.onEntitySelected(this.state.selectedEntityIndex),this.props.clearPartialInputOnSelection?this.setValue(""):this.setValue(this.getSelectedEntityText())}},{key:"markFuzzyMatchSubstring",value:function(entityContent,userText){for(var frags=entityContent.split(new RegExp("("+(0,_escapeStringRegexp2.default)(userText)+")","ig")),normalizedUserText=userText.toLowerCase(),threshold=frags.length,i=-1;++i<threshold;)frags[i].toLowerCase()===normalizedUserText&&(frags[i]=_react2.default.createElement("mark",{key:i,className:"ui-typeahead-match-highlight"},frags[i]));return frags}},{key:"markStartsWithMatchSubstring",value:function(entityContent,userInput){var seekValue=userInput.toLowerCase(),indexStart=entityContent.toLowerCase().indexOf(seekValue),indexEnd=indexStart+seekValue.length;return[_react2.default.createElement("span",{key:"0"},entityContent.slice(0,indexStart)),_react2.default.createElement("mark",{key:"1",className:"ui-typeahead-match-highlight"},entityContent.slice(indexStart,indexEnd)),_react2.default.createElement("span",{key:"2"},entityContent.slice(indexEnd))]}},{key:"markMatchSubstring",value:function(){switch(this.props.algorithm){case UITypeaheadInput.mode.STARTS_WITH:return this.markStartsWithMatchSubstring.apply(this,arguments);case UITypeaheadInput.mode.FUZZY:return this.markFuzzyMatchSubstring.apply(this,arguments)}if("function"==typeof this.props.algorithm.markFunc){var _props$algorithm;return(_props$algorithm=this.props.algorithm).markFunc.apply(_props$algorithm,arguments)}return console.warn("No `props.algorithm.markFunc` was provided to UITypeaheadInput; falling back to the default marking algorithm."),this.markStartsWithMatchSubstring.apply(this,arguments)}},{key:"getFuzzyMatchIndexes",value:function(userText,entities){var normalized=userText.toLowerCase();return entities.reduce(function(result,entity,index){return-1!==entity.text.toLowerCase().indexOf(normalized)?result.push(index)&&result:result},[])}},{key:"getStartsWithMatchIndexes",value:function(userText,entities){var seekValue=userText.toLowerCase();return entities.reduce(function(result,entity,index){return 0===entity.text.toLowerCase().indexOf(seekValue)?result.push(index)&&result:result},[])}},{key:"getMatchIndexes",value:function(){switch(this.props.algorithm){case UITypeaheadInput.mode.STARTS_WITH:return this.getStartsWithMatchIndexes.apply(this,arguments);case UITypeaheadInput.mode.FUZZY:return this.getFuzzyMatchIndexes.apply(this,arguments)}if("function"==typeof this.props.algorithm.matchFunc){var _props$algorithm2;return(_props$algorithm2=this.props.algorithm).matchFunc.apply(_props$algorithm2,arguments)}return console.warn("No `props.algorithm.matchFunc` was provided to UITypeaheadInput; falling back to the default matching algorithm."),this.getStartsWithMatchIndexes.apply(this,arguments)}},{key:"computeMatches",value:function(){var entities=arguments.length<=0||void 0===arguments[0]?this.props.entities:arguments[0],currentValue=this.state.userInput,matches=""===currentValue?[]:this.getMatchIndexes(currentValue,entities);this.setState({selectedEntityIndex:matches.length?matches[0]:-1,entityMatchIndexes:matches})}},{key:"handleInput",value:function(event){var _this3=this;this.setState({userInput:event.target.value},function(){return _this3.computeMatches()}),this.props.onInput&&(event.persist(),this.props.onInput(event)),"function"==typeof this.props.inputProps.onInput&&(event.persist(),this.props.inputProps.onInput(event))}},{key:"handleKeyDown",value:function(event){switch(event.key){case"ArrowLeft":event.target.selectionStart>1&&event.stopPropagation();break;case"Tab":case"ArrowRight":-1!==this.state.selectedEntityIndex&&this.cursorAtEndOfInput()&&this.getInputNode()===event.target&&(event.nativeEvent.preventDefault(),this.setValueWithSelectedEntity());break;case"ArrowUp":event.nativeEvent.preventDefault(),this.selectMatch(-1),this.focusInput();break;case"ArrowDown":event.nativeEvent.preventDefault(),this.selectMatch(1),this.focusInput();break;case"Escape":-1!==this.state.selectedEntityIndex&&this.getInputNode()===event.target&&this.resetMatches();break;case"Enter":-1!==this.state.selectedEntityIndex&&this.getInputNode()===event.target?(event.nativeEvent.preventDefault(),this.setValueWithSelectedEntity()):this.props.onComplete(this.state.userInput)}"function"==typeof this.props.onKeyDown&&(event.persist(),this.props.onKeyDown(event))}},{key:"renderNotification",value:function(){return _react2.default.createElement("div",{ref:"aria",id:this.state.id,className:this.props.offscreenClass,"aria-live":"polite"},this.getSelectedEntityText())}},{key:"renderHint",value:function(){if(this.props.hint){var userText=this.state.userInput,raw=this.getSelectedEntityText(),processed="";return raw&&0===raw.toLowerCase().indexOf(userText.toLowerCase())&&(processed=raw.replace(new RegExp(userText,"i"),userText)),_react2.default.createElement("input",_extends({},this.props.hintProps,{ref:"hint",type:this.props.type||this.props.inputProps.type||"text",className:(0,_classnames2.default)(_defineProperty({"ui-typeahead-hint":!0},this.props.hintProps.className,!!this.props.hintProps.className)),value:processed,disabled:!0,tabIndex:"-1"}))}}},{key:"renderMatches",value:function(){var _this4=this;return this.state.entityMatchIndexes.length?_react2.default.createElement("div",_extends({},this.props.matchWrapperProps,{ref:"matches",className:(0,_classnames2.default)(_defineProperty({"ui-typeahead-match-wrapper":!0},this.props.matchWrapperProps.className,!!this.props.matchWrapperProps.className))}),this.state.entityMatchIndexes.map(function(index){var entity=_this4.props.entities[index];return _react2.default.createElement("div",_extends({},entity,{ref:"match_$"+index,className:(0,_classnames2.default)(_defineProperty({"ui-typeahead-match":!0,"ui-typeahead-match-selected":_this4.state.selectedEntityIndex===index},entity.className,!!entity.className)),key:entity.text,onClick:_this4.handleMatchClick.bind(_this4,index)}),_this4.markMatchSubstring(entity.text,_this4.state.userInput))})):void 0}},{key:"render",value:function(){return _react2.default.createElement("div",_extends({},this.props,{type:null,ref:"wrapper",className:(0,_classnames2.default)(_defineProperty({"ui-typeahead-wrapper":!0},this.props.className,!!this.props.className)),onKeyDown:this.handleKeyDown.bind(this)}),this.renderNotification(),this.renderHint(),_react2.default.createElement("input",_extends({},this.props.inputProps,{ref:"input",className:(0,_classnames2.default)(_defineProperty({"ui-typeahead":!0},this.props.inputProps.className,!!this.props.inputProps.className)),defaultValue:this.props.defaultValue||this.props.inputProps.defaultValue,name:this.props.name||this.props.inputProps.name,type:this.props.type||this.props.inputProps.type||"text","aria-controls":this.state.id,onInput:this.handleInput.bind(this)})),this.renderMatches())}}]),UITypeaheadInput}(_UIView3.default);UITypeaheadInput.mode={STARTS_WITH:"STARTS_WITH",FUZZY:"FUZZY"},UITypeaheadInput.propTypes={algorithm:_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH,UITypeaheadInput.mode.FUZZY]),_react2.default.PropTypes.shape({markFunc:_react2.default.PropTypes.func,matchFunc:_react2.default.PropTypes.func})]),clearPartialInputOnSelection:_react2.default.PropTypes.bool,defaultValue:_react2.default.PropTypes.string,entities:_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({text:_react2.default.PropTypes.string})),hint:_react2.default.PropTypes.bool,hintProps:_react2.default.PropTypes.object,inputProps:_react2.default.PropTypes.object,matchWrapperProps:_react2.default.PropTypes.object,name:_react2.default.PropTypes.string,offscreenClass:_react2.default.PropTypes.string,onComplete:_react2.default.PropTypes.func,onInput:_react2.default.PropTypes.func,onEntitySelected:_react2.default.PropTypes.func,type:_react2.default.PropTypes.string},UITypeaheadInput.defaultProps={algorithm:UITypeaheadInput.mode.STARTS_WITH,clearPartialInputOnSelection:!1,defaultValue:"",entities:[],hintProps:{},inputProps:{},matchWrapperProps:{},offscreenClass:"ui-offscreen",onComplete:_noop2.default,onEntitySelected:_noop2.default},exports.default=UITypeaheadInput;