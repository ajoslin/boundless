"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function toI(stringNumber){return parseInt(stringNumber,10)}var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0});var _react=require("react"),_react2=_interopRequireDefault(_react),_reactDom=require("react-dom"),_reactDom2=_interopRequireDefault(_reactDom),_UIView2=require("../UIView"),_UIView3=_interopRequireDefault(_UIView2),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),UIFittedText=function(_UIView){function UIFittedText(){return _classCallCheck(this,UIFittedText),_possibleConstructorReturn(this,Object.getPrototypeOf(UIFittedText).apply(this,arguments))}return _inherits(UIFittedText,_UIView),_createClass(UIFittedText,[{key:"componentDidMount",value:function(){this.rescale=this.rescale.bind(this),this.rescale(),window.addEventListener("resize",this.rescale,!0)}},{key:"componentDidUpdate",value:function(){this.rescale()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.rescale,!0)}},{key:"rescale",value:function(){var node=_reactDom2.default.findDOMNode(this),container=node.parentNode,containerBox=window.getComputedStyle(container),fontSize=toI(window.getComputedStyle(node).fontSize),containerHeight=toI(containerBox.height),containerWidth=toI(containerBox.width);("border-box"===containerBox.boxSizing||"padding-box"===containerBox.boxSizing)&&(containerHeight-=toI(containerBox.paddingTop)+toI(containerBox.paddingBottom),containerWidth-=toI(containerBox.paddingLeft)+toI(containerBox.paddingRight));var optimizeForHeight=Math.floor(fontSize/node.offsetHeight*containerHeight),optimizeForWidth=Math.floor(fontSize/node.offsetWidth*containerWidth);node.style.fontSize=(Math.min(this.props.maxFontSize,optimizeForHeight,optimizeForWidth)||1)+"px"}},{key:"render",value:function(){return _react2.default.createElement("span",_extends({},this.props,{className:(0,_classnames2.default)(_defineProperty({"ui-text":!0},this.props.className,!!this.props.className))}),this.props.children)}}]),UIFittedText}(_UIView3.default);UIFittedText.defaultProps={maxFontSize:Number.MAX_VALUE},UIFittedText.propTypes={children:_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string,_react2.default.PropTypes.number]),maxFontSize:_react2.default.PropTypes.number},exports.default=UIFittedText;