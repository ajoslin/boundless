(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(22);

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIArrowKeyNavigation = function (_React$PureComponent) {
    _inherits(UIArrowKeyNavigation, _React$PureComponent);

    function UIArrowKeyNavigation() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIArrowKeyNavigation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            activeChildIndex: null
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    event.preventDefault();
                    _this.moveFocus(-1);
                    break;

                case 'ArrowDown':
                case 'ArrowRight':
                    event.preventDefault();
                    _this.moveFocus(1);
                    break;
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIArrowKeyNavigation.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.state.activeChildIndex !== null) {
            var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

            if (numChildren === 0) {
                this.setState({ activeChildIndex: null }); // eslint-disable-line react/no-did-update-set-state
            } else if (this.state.activeChildIndex >= numChildren) {
                this.setState({ activeChildIndex: numChildren - 1 }); // eslint-disable-line react/no-did-update-set-state
            } else if (this.state.activeChildIndex !== prevState.activeChildIndex) {
                this.setFocus(this.state.activeChildIndex);
            }
        }
    };

    UIArrowKeyNavigation.prototype.setFocus = function setFocus(index) {
        var childNode = (this.refs.wrapper instanceof HTMLElement ? this.refs.wrapper : (0, _reactDom.findDOMNode)(this.refs.wrapper)).children[index];

        if (childNode && childNode.getAttribute('tabindex') === '-1') {
            this.moveFocus(childNode.compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        } else if (childNode && document.activeElement !== childNode) {
            childNode.focus();
        }
    };

    UIArrowKeyNavigation.prototype.moveFocus = function moveFocus(delta) {
        var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

        var nextIndex = this.state.activeChildIndex + delta;

        if (nextIndex >= numChildren) {
            nextIndex = 0; // loop
        } else if (nextIndex < 0) {
            nextIndex = numChildren - 1; // reverse loop
        }

        this.setState({ activeChildIndex: nextIndex });
    };

    UIArrowKeyNavigation.prototype.handleChildBlur = function handleChildBlur(index, child, event) {
        if (this.state.activeChildIndex === index) {
            this.setState({ activeChildIndex: null });
        }

        event.stopPropagation();

        if (!(0, _isString2.default)(child) && (0, _isFunction2.default)(child.props.onBlur)) {
            child.props.onBlur(event);
        }
    };

    UIArrowKeyNavigation.prototype.handleChildFocus = function handleChildFocus(index, child, event) {
        this.setState({ activeChildIndex: index });

        event.stopPropagation();

        if (!(0, _isString2.default)(child) && (0, _isFunction2.default)(child.props.onFocus)) {
            child.props.onFocus(event);
        }
    };

    UIArrowKeyNavigation.prototype.children = function children() {
        var _this2 = this;

        return _react2.default.Children.map(this.props.children, function (child, index) {
            return _react2.default.cloneElement(child, {
                key: child.key || index,
                tabIndex: child.props.tabIndex !== undefined ? child.props.tabIndex : 0,
                onBlur: _this2.handleChildBlur.bind(_this2, index, child),
                onFocus: _this2.handleChildFocus.bind(_this2, index, child)
            });
        });
    };

    UIArrowKeyNavigation.prototype.render = function render() {
        return _react2.default.createElement(this.props.component, _extends({}, (0, _lodash2.default)(this.props, UIArrowKeyNavigation.internalKeys), {
            ref: 'wrapper',
            onKeyDown: this.handleKeyDown
        }), this.children());
    };

    return UIArrowKeyNavigation;
}(_react2.default.PureComponent);

UIArrowKeyNavigation.propTypes = {
    component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func])
};
UIArrowKeyNavigation.internalKeys = Object.keys(UIArrowKeyNavigation.propTypes);
UIArrowKeyNavigation.defaultProps = {
    component: 'div'
};
exports.default = UIArrowKeyNavigation;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"22":22,"34":34}],2:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIButton = function (_React$PureComponent) {
    _inherits(UIButton, _React$PureComponent);

    function UIButton() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleClick = function (event) {
            if (_this.props.disabled) {
                return;
            }

            _this.toggleState(event);

            if ((0, _isFunction2.default)(_this.props.onClick)) {
                _this.props.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            if (_this.props.disabled) {
                return;
            }

            switch (event.key) {
                case 'Enter':
                case 'Space':
                    event.preventDefault();
                    _this.toggleState(event);
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIButton.prototype.toggleState = function toggleState(event) {
        this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
    };

    UIButton.prototype.render = function render() {
        var _cx;

        return _react2.default.createElement(
            'button',
            _extends({}, (0, _lodash2.default)(this.props, UIButton.internalKeys), {
                ref: 'button',
                className: (0, _classnames2.default)((_cx = {
                    'ui-button': true,
                    'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                    'ui-button-pressed': this.props.pressed
                }, _cx[this.props.className] = !!this.props.className, _cx)),
                'aria-pressed': this.props.pressed,
                onKeyDown: this.handleKeyDown,
                onClick: this.handleClick }),
            this.props.children
        );
    };

    return UIButton;
}(_react2.default.PureComponent);

UIButton.propTypes = {
    children: _react2.default.PropTypes.node,
    onClick: _react2.default.PropTypes.func,
    onPressed: _react2.default.PropTypes.func,
    onUnpressed: _react2.default.PropTypes.func,
    pressed: _react2.default.PropTypes.bool
};
UIButton.internalKeys = Object.keys(UIButton.propTypes);
UIButton.defaultProps = {
    onPressed: _noop2.default,
    onUnpressed: _noop2.default
};
exports.default = UIButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"23":23,"28":28,"34":34}],3:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require(26);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An accessible checkbox with indeterminate support.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UICheckbox
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UICheckbox = function (_React$PureComponent) {
    _inherits(UICheckbox, _React$PureComponent);

    function UICheckbox() {
        var _temp, _this, _ret;

        _classCallCheck(this, UICheckbox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.id = (0, _uuid2.default)(), _this.handleChange = function (event) {
            // Send the opposite signal from what was passed to toggle the data
            if (_this.props.inputProps.disabled) {
                return;
            }

            _this.props[!_this.props.inputProps.checked ? 'onChecked' : 'onUnchecked'](_this.props.inputProps.name);

            if ((0, _isFunction2.default)(_this.props.inputProps.onChange)) {
                _this.props.inputProps.onChange(event);
            }
        }, _this.handleClick = function (event) {
            if (_this.props.inputProps.disabled) {
                return;
            }

            _this.refs.input.focus();

            if ((0, _isFunction2.default)(_this.props.inputProps.onClick)) {
                _this.props.inputProps.onClick(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UICheckbox.prototype.componentDidMount = function componentDidMount() {
        if (this.props.inputProps.indeterminate) {
            this.setIndeterminate();
        }
    };

    UICheckbox.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (prevProps.inputProps.indeterminate !== this.props.inputProps.indeterminate) {
            this.setIndeterminate();
        }
    };

    UICheckbox.prototype.setIndeterminate = function setIndeterminate() {
        this.refs.input.indeterminate = !!this.props.inputProps.indeterminate;
    };

    UICheckbox.prototype.getAriaState = function getAriaState() {
        return this.props.inputProps.indeterminate ? 'mixed' : String(this.props.inputProps.checked);
    };

    UICheckbox.prototype.renderInput = function renderInput() {
        var _cx;

        return _react2.default.createElement('input', _extends({}, (0, _lodash2.default)(this.props.inputProps, 'indeterminate'), {
            ref: 'input',
            type: 'checkbox',
            className: (0, _classnames2.default)((_cx = {
                'ui-checkbox': true,
                'ui-checkbox-mixed': this.props.inputProps.indeterminate,
                'ui-checkbox-checked': this.props.inputProps.checked,
                'ui-checkbox-unchecked': !this.props.inputProps.indeterminate && !this.props.inputProps.checked
            }, _cx[this.props.inputProps.className] = !!this.props.inputProps.className, _cx)),
            id: this.props.inputProps.id || this.id,
            'aria-checked': this.getAriaState(),
            onChange: this.handleChange,
            onClick: this.handleClick }));
    };

    UICheckbox.prototype.renderLabel = function renderLabel() {
        if (this.props.label) {
            var _cx2;

            return _react2.default.createElement(
                'label',
                _extends({}, this.props.labelProps, {
                    ref: 'label',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-checkbox-label': true
                    }, _cx2[this.props.labelProps.className] = !!this.props.labelProps.className, _cx2)),
                    htmlFor: this.props.inputProps.id || this.id }),
                this.props.label
            );
        }
    };

    UICheckbox.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UICheckbox.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-checkbox-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderInput(),
            this.renderLabel()
        );
    };

    return UICheckbox;
}(_react2.default.PureComponent);

UICheckbox.propTypes = {
    inputProps: _react.PropTypes.shape({
        checked: _react.PropTypes.bool,
        className: _react.PropTypes.string,
        disabled: _react.PropTypes.bool,
        id: _react.PropTypes.string,
        indeterminate: _react.PropTypes.bool,
        onChange: _react.PropTypes.func,
        onClick: _react.PropTypes.func,
        name: _react.PropTypes.string,
        value: _react.PropTypes.string
    }),
    label: _react.PropTypes.node,
    labelProps: _react.PropTypes.object,
    onChecked: _react.PropTypes.func,
    onUnchecked: _react.PropTypes.func
};
UICheckbox.internalKeys = Object.keys(UICheckbox.propTypes);
UICheckbox.defaultProps = {
    inputProps: {
        checked: false,
        indeterminate: false
    },
    labelProps: {},
    onChecked: _noop2.default,
    onUnchecked: _noop2.default
};
exports.default = UICheckbox;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"23":23,"26":26,"28":28,"34":34}],4:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _UICheckbox = require(3);

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related checkboxes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UICheckboxGroup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UICheckboxGroup = function (_React$PureComponent) {
    _inherits(UICheckboxGroup, _React$PureComponent);

    function UICheckboxGroup() {
        _classCallCheck(this, UICheckboxGroup);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UICheckboxGroup.prototype.allItemsChecked = function allItemsChecked() {
        return this.props.items.every(function (item) {
            return item.inputProps.checked === true;
        });
    };

    UICheckboxGroup.prototype.anyItemsChecked = function anyItemsChecked() {
        return this.props.items.some(function (item) {
            return item.inputProps.checked === true;
        });
    };

    UICheckboxGroup.prototype.renderSelectAll = function renderSelectAll() {
        if (this.props.selectAll) {
            var _cx;

            var allChecked = this.allItemsChecked();
            var inputProps = this.props.selectAllProps.inputProps;


            return _react2.default.createElement(_UICheckbox2.default, _extends({}, this.props.selectAllProps, {
                ref: 'select_all',
                key: 'cb_select_all',
                className: (0, _classnames2.default)((_cx = {
                    'ui-checkbox-group-selectall': true
                }, _cx[this.props.selectAllProps.className] = !!this.props.selectAllProps.className, _cx)),
                inputProps: _extends({}, inputProps, {
                    checked: allChecked,
                    indeterminate: !allChecked && this.anyItemsChecked(),
                    name: inputProps && inputProps.name ? inputProps.name : 'cb_select_all'
                }),
                label: this.props.selectAllProps.label || 'Select All',
                onChecked: this.props.onAllChecked,
                onUnchecked: this.props.onAllUnchecked }));
        }
    };

    UICheckboxGroup.prototype.renderCheckboxes = function renderCheckboxes() {
        var _this2 = this;

        return this.props.items.map(function (item) {
            return _react2.default.createElement(_UICheckbox2.default, _extends({}, item, {
                key: item.inputProps.name,
                onChecked: _this2.props.onChildChecked,
                onUnchecked: _this2.props.onChildUnchecked }));
        });
    };

    UICheckboxGroup.prototype.renderChildren = function renderChildren() {
        var toBeRendered = [this.renderCheckboxes()];

        if (this.props.selectAll && this.props.selectAllPosition) {
            switch (this.props.selectAllPosition) {
                case UICheckboxGroup.Constants.SELECT_ALL_BEFORE:
                    toBeRendered.unshift(this.renderSelectAll());
                    break;

                case UICheckboxGroup.Constants.SELECT_ALL_AFTER:
                    toBeRendered.push(this.renderSelectAll());
                    break;
            }
        }

        return toBeRendered;
    };

    UICheckboxGroup.prototype.render = function render() {
        var _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UICheckboxGroup.internalKeys), {
                ref: 'group',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-checkbox-group': true
                }, _cx2[this.props.className] = !!this.props.className, _cx2)) }),
            this.renderChildren()
        );
    };

    return UICheckboxGroup;
}(_react2.default.PureComponent);

UICheckboxGroup.Constants = {
    SELECT_ALL_BEFORE: 'SELECT_ALL_BEFORE',
    SELECT_ALL_AFTER: 'SELECT_ALL_AFTER'
};
UICheckboxGroup.propTypes = {
    items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        inputProps: _react.PropTypes.shape({
            checked: _react.PropTypes.bool.isRequired,
            label: _react.PropTypes.string,
            name: _react.PropTypes.string.isRequired,
            value: _react.PropTypes.string
        })
    })).isRequired,
    onAllChecked: _react.PropTypes.func,
    onAllUnchecked: _react.PropTypes.func,
    onChildChecked: _react.PropTypes.func,
    onChildUnchecked: _react.PropTypes.func,
    selectAll: _react.PropTypes.bool,
    selectAllProps: _react.PropTypes.object,
    selectAllPosition: _react.PropTypes.oneOf([UICheckboxGroup.Constants.SELECT_ALL_BEFORE, UICheckboxGroup.Constants.SELECT_ALL_AFTER])
};
UICheckboxGroup.internalKeys = Object.keys(UICheckboxGroup.propTypes);
UICheckboxGroup.defaultProps = {
    items: [],
    onAllChecked: _noop2.default,
    onAllUnchecked: _noop2.default,
    onChildChecked: _noop2.default,
    onChildUnchecked: _noop2.default,
    selectAll: false,
    selectAllProps: {},
    selectAllPosition: UICheckboxGroup.Constants.SELECT_ALL_BEFORE
};
exports.default = UICheckboxGroup;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"23":23,"28":28,"3":3,"34":34}],5:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require(26);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A non-blocking, focus-stealing container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIDialog
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIDialog = function (_React$PureComponent) {
    _inherits(UIDialog, _React$PureComponent);

    function UIDialog() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.mounted = false, _this.uuidHeader = (0, _uuid2.default)(), _this.uuidBody = (0, _uuid2.default)(), _this.callOnCloseIfMounted = function () {
            return _this.mounted && _this.props.onClose();
        }, _this.handleFocus = function (nativeEvent) {
            if (!_this.props.captureFocus) {
                if (_this.props.closeOnOutsideFocus) {
                    if (!_this.isPartOfDialog(nativeEvent.target)) {
                        return window.setTimeout(_this.callOnCloseIfMounted, 0);
                    }
                }

                return;
            }

            // explicitOriginalTarget is for Firefox, as it doesn't support relatedTarget
            var previous = nativeEvent.explicitOriginalTarget || nativeEvent.relatedTarget;

            if (_this.isPartOfDialog(previous) && !_this.isPartOfDialog(nativeEvent.target)) {
                nativeEvent.preventDefault();
                previous.focus(); // restore focus
            }
        }, _this.handleKeyDown = function (event) {
            if (_this.props.closeOnEscKey && event.key === 'Escape') {
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _this.handleOutsideClick = function (nativeEvent) {
            if (_this.props.closeOnOutsideClick && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }
        }, _this.handleOutsideScrollWheel = function (nativeEvent) {
            if (_this.props.closeOnOutsideScroll && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // fallbacks if one isn't passed


    UIDialog.prototype.componentDidMount = function componentDidMount() {
        this.mounted = true;

        if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
            this.$dialog.focus();
        }

        window.addEventListener('click', this.handleOutsideClick, true);
        window.addEventListener('contextmenu', this.handleOutsideClick, true);
        window.addEventListener('focus', this.handleFocus, true);
        window.addEventListener('scroll', this.handleOutsideScrollWheel, true);
        window.addEventListener('wheel', this.handleOutsideScrollWheel, true);
    };

    UIDialog.prototype.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;

        window.removeEventListener('click', this.handleOutsideClick, true);
        window.removeEventListener('contextmenu', this.handleOutsideClick, true);
        window.removeEventListener('focus', this.handleFocus, true);
        window.removeEventListener('scroll', this.handleOutsideScrollWheel, true);
        window.removeEventListener('wheel', this.handleOutsideScrollWheel, true);
    };

    UIDialog.prototype.isPartOfDialog = function isPartOfDialog(node) {
        if (!node || node === window) {
            return false;
        }

        return this.$wrapper.contains(node.nodeType === 3 ? node.parentNode : node);
    };

    UIDialog.prototype.renderBody = function renderBody() {
        var _cx;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props.bodyProps, {
                id: this.props.bodyProps.id || this.uuidBody,
                className: (0, _classnames2.default)((_cx = {
                    'ui-dialog-body': true
                }, _cx[this.props.bodyProps.className] = !!this.props.bodyProps.className, _cx)) }),
            this.props.children
        );
    };

    UIDialog.prototype.renderFooter = function renderFooter() {
        if (this.props.footer) {
            var _cx2;

            return _react2.default.createElement(
                'footer',
                _extends({}, this.props.footerProps, {
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-dialog-footer': true
                    }, _cx2[this.props.footerProps.className] = !!this.props.footerProps.className, _cx2)) }),
                this.props.footer
            );
        }
    };

    UIDialog.prototype.renderHeader = function renderHeader() {
        if (this.props.header) {
            var _cx3;

            return _react2.default.createElement(
                'header',
                _extends({}, this.props.headerProps, {
                    id: this.props.headerProps.id || this.uuidHeader,
                    className: (0, _classnames2.default)((_cx3 = {
                        'ui-dialog-header': true
                    }, _cx3[this.props.headerProps.className] = !!this.props.headerProps.className, _cx3)) }),
                this.props.header
            );
        }
    };

    UIDialog.prototype.renderFocusBoundary = function renderFocusBoundary() {
        if (this.props.captureFocus) {
            return _react2.default.createElement(
                'div',
                { className: 'ui-offscreen', tabIndex: '0', 'aria-hidden': 'true' },
                ' '
            );
        }
    }; // used to lock focus into a particular subset of DOM

    UIDialog.prototype.render = function render() {
        var _this2 = this,
            _cx4,
            _cx5;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props.wrapperProps, {
                ref: function ref(node) {
                    return _this2.$wrapper = node;
                },
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-dialog-wrapper': true
                }, _cx4[this.props.wrapperProps.className] = !!this.props.wrapperProps.className, _cx4)),
                tabIndex: '0' }),
            this.renderFocusBoundary(),
            this.props.before,
            _react2.default.createElement(
                'div',
                _extends({}, (0, _lodash2.default)(this.props, UIDialog.internalKeys), {
                    ref: function ref(node) {
                        return _this2.$dialog = node;
                    },
                    className: (0, _classnames2.default)((_cx5 = {
                        'ui-dialog': true
                    }, _cx5[this.props.className] = !!this.props.className, _cx5)),
                    onKeyDown: this.handleKeyDown,
                    role: 'dialog',
                    'aria-labelledby': this.uuidHeader,
                    'aria-describedby': this.uuidBody,
                    tabIndex: '0' }),
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            ),
            this.props.after,
            this.renderFocusBoundary()
        );
    };

    return UIDialog;
}(_react2.default.PureComponent);

UIDialog.propTypes = {
    after: _react2.default.PropTypes.node,
    before: _react2.default.PropTypes.node,
    bodyProps: _react2.default.PropTypes.object,
    captureFocus: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    closeOnEscKey: _react2.default.PropTypes.bool,
    closeOnOutsideClick: _react2.default.PropTypes.bool,
    closeOnOutsideFocus: _react2.default.PropTypes.bool,
    closeOnOutsideScroll: _react2.default.PropTypes.bool,
    footer: _react2.default.PropTypes.node,
    footerProps: _react2.default.PropTypes.object,
    header: _react2.default.PropTypes.node,
    headerProps: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func,
    wrapperProps: _react2.default.PropTypes.object
};
UIDialog.internalKeys = Object.keys(UIDialog.propTypes);
UIDialog.defaultProps = {
    bodyProps: {},
    captureFocus: true,
    closeOnEscKey: false,
    closeOnOutsideClick: false,
    closeOnOutsideFocus: false,
    closeOnOutsideScroll: false,
    footerProps: {},
    headerProps: {},
    onClose: _noop2.default,
    wrapperProps: {}
};
exports.default = UIDialog;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"23":23,"26":26,"28":28,"34":34}],6:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Fit given text inside a parent container, obeying implict and explicit constraints.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIFittedText
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var instances = [];

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

function rescale(instance) {
    var node = (0, _reactDom.findDOMNode)(instance);
    var containerBox = window.getComputedStyle(node.parentNode);
    var fontSize = toI(window.getComputedStyle(node).fontSize);

    var containerHeight = toI(containerBox.height);
    var containerWidth = toI(containerBox.width);

    if (containerBox.boxSizing === 'border-box' || containerBox.boxSizing === 'padding-box') {
        // need to account for padding
        containerHeight -= toI(containerBox.paddingTop) + toI(containerBox.paddingBottom);
        containerWidth -= toI(containerBox.paddingLeft) + toI(containerBox.paddingRight);
    }

    var optimizeForHeight = Math.floor(fontSize / node.offsetHeight * containerHeight);
    var optimizeForWidth = Math.floor(fontSize / node.offsetWidth * containerWidth);

    // the || 1 is a fallback to prevent fontSize from being set to zero, which fubars things
    node.style.fontSize = (Math.min(instance.props.maxFontSize, optimizeForHeight, optimizeForWidth) || 1) + 'px';
}

function handleWindowResize() {
    instances.forEach(function (instance) {
        return rescale(instance);
    });
}

function registerInstance(instance) {
    if (instances.length === 0) {
        window.addEventListener('resize', handleWindowResize, true);
    }

    instances.push(instance);
}

function unregisterInstance(instance) {
    instances.splice(instances.indexOf(instance), 1);

    if (instances.length === 0) {
        window.removeEventListener('resize', handleWindowResize, true);
    }
}

var UIFittedText = function (_React$PureComponent) {
    _inherits(UIFittedText, _React$PureComponent);

    function UIFittedText() {
        _classCallCheck(this, UIFittedText);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UIFittedText.prototype.componentDidMount = function componentDidMount() {
        rescale(this);

        // there are likely to be multiple instances of this component on a page, so it makes sense to just use
        // a shared global resize listener instead of each component having its own
        registerInstance(this);
    };

    UIFittedText.prototype.componentDidUpdate = function componentDidUpdate() {
        rescale(this);
    };

    UIFittedText.prototype.componentWillUnmount = function componentWillUnmount() {
        unregisterInstance(this);
    };

    UIFittedText.prototype.render = function render() {
        var _cx;

        return _react2.default.createElement(
            'span',
            _extends({}, (0, _lodash2.default)(this.props, UIFittedText.internalKeys), {
                className: (0, _classnames2.default)((_cx = {
                    'ui-text': true
                }, _cx[this.props.className] = !!this.props.className, _cx)) }),
            this.props.children
        );
    };

    return UIFittedText;
}(_react2.default.PureComponent);

UIFittedText.defaultProps = {
    maxFontSize: Number.MAX_VALUE
};
UIFittedText.propTypes = {
    children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    maxFontSize: _react2.default.PropTypes.number
};
UIFittedText.internalKeys = Object.keys(UIFittedText.propTypes);
exports.default = UIFittedText;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"28":28,"34":34}],7:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An image block with placeholder support for loading and fallback scenarios.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIImage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIImage = function (_React$PureComponent) {
    _inherits(UIImage, _React$PureComponent);

    function UIImage() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIImage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            status: UIImage.status.LOADING
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIImage.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.resetPreloader();
            this.setState({ status: UIImage.status.LOADING });
        }
    };

    UIImage.prototype.componentDidMount = function componentDidMount() {
        this.preload();
    };

    UIImage.prototype.componentDidUpdate = function componentDidUpdate() {
        this.preload();
    };

    UIImage.prototype.componentWillUnmount = function componentWillUnmount() {
        this.resetPreloader();
    };

    UIImage.prototype.resetPreloader = function resetPreloader() {
        this.loader.onload = null;
        this.loader.onerror = null;
        this.loader = null;
    };

    UIImage.prototype.preload = function preload() {
        var _this2 = this;

        if (this.loader) {
            return;
        }

        this.loader = document.createElement('img');

        this.loader.onload = function () {
            return _this2.setState({ status: UIImage.status.LOADED });
        };
        this.loader.onerror = function () {
            return _this2.setState({ status: UIImage.status.ERROR });
        };

        this.loader.src = this.props.src;
    };

    UIImage.prototype.renderImage = function renderImage() {
        var _cx2;

        if (this.props.displayAsBackgroundImage) {
            var _cx;

            return _react2.default.createElement('div', _extends({}, this.props.imageProps, {
                ref: 'image',
                className: (0, _classnames2.default)((_cx = {
                    'ui-image': true
                }, _cx[this.props.imageProps.className] = !!this.props.imageProps.className, _cx)),
                title: this.props.alt,
                style: _extends({}, this.props.imageProps.style, {
                    backgroundImage: 'url(' + this.props.src + ')'
                }) }));
        }

        return _react2.default.createElement('img', _extends({}, this.props.imageProps, {
            ref: 'image',
            className: (0, _classnames2.default)((_cx2 = {
                'ui-image': true
            }, _cx2[this.props.imageProps.className] = !!this.props.imageProps.className, _cx2)),
            src: this.props.src,
            alt: this.props.alt,
            onLoad: _noop2.default,
            onError: _noop2.default }));
    };

    UIImage.prototype.renderStatus = function renderStatus() {
        var _cx3;

        return _react2.default.createElement('div', _extends({}, this.props.statusProps, {
            ref: 'status',
            className: (0, _classnames2.default)((_cx3 = {
                'ui-image-status': true,
                'ui-image-loading': this.state.status === UIImage.status.LOADING,
                'ui-image-loaded': this.state.status === UIImage.status.LOADED,
                'ui-image-error': this.state.status === UIImage.status.ERROR
            }, _cx3[this.props.statusProps.className] = !!this.props.statusProps.className, _cx3)),
            role: 'presentation' }));
    };

    UIImage.prototype.render = function render() {
        var _cx4;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UIImage.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-image-wrapper': true
                }, _cx4[this.props.className] = !!this.props.className, _cx4)) }),
            this.renderImage(),
            this.renderStatus()
        );
    };

    return UIImage;
}(_react2.default.PureComponent);

UIImage.status = {
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    ERROR: 'ERROR'
};
UIImage.propTypes = {
    alt: _react2.default.PropTypes.string,
    displayAsBackgroundImage: _react2.default.PropTypes.bool,
    imageProps: _react2.default.PropTypes.object,
    src: _react2.default.PropTypes.string.isRequired,
    statusProps: _react2.default.PropTypes.object
};
UIImage.internalKeys = Object.keys(UIImage.propTypes);
UIImage.defaultProps = {
    imageProps: {},
    statusProps: {}
};
exports.default = UIImage;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"23":23,"28":28,"34":34}],8:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A blocking, focus-stealing container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIModal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIModal = function (_React$PureComponent) {
    _inherits(UIModal, _React$PureComponent);

    function UIModal() {
        _classCallCheck(this, UIModal);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UIModal.prototype.updateInternalModalCache = function updateInternalModalCache(instance) {
        this.modal = instance;
    };

    UIModal.prototype.componentWillMount = function componentWillMount() {
        this.$container = document.createElement('div');

        document.body.appendChild(this.$container);

        this.renderModal();
    };

    UIModal.prototype.componentDidUpdate = function componentDidUpdate() {
        this.renderModal();
    };

    UIModal.prototype.componentWillUnmount = function componentWillUnmount() {
        _reactDom2.default.unmountComponentAtNode(this.$container);
        document.body.removeChild(this.$container);
    };

    UIModal.prototype.renderModal = function renderModal() {
        var _cx, _cx2, _cx3;

        var props = this.props;


        this.updateInternalModalCache(_reactDom2.default.render(_react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(props, UIModal.internalKeys), {
                className: (0, _classnames2.default)((_cx = {
                    'ui-modal-wrapper': true
                }, _cx[props.className] = !!props.className, _cx)) }),
            _react2.default.createElement('div', _extends({}, props.maskProps, {
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-modal-mask': true
                }, _cx2[props.maskProps.className] = !!props.maskProps.className, _cx2)) })),
            _react2.default.createElement(
                _UIDialog2.default,
                _extends({}, (0, _extractChildProps2.default)(props, _UIDialog2.default.propTypes), props.modalProps, {
                    className: (0, _classnames2.default)((_cx3 = {
                        'ui-modal': true
                    }, _cx3[props.modalProps.className] = !!props.modalProps.className, _cx3)) }),
                props.children
            )
        ), this.$container));
    };

    UIModal.prototype.render = function render() {
        return _react2.default.createElement('div', null);
    };

    return UIModal;
}(_react2.default.PureComponent);

UIModal.propTypes = _extends({}, _UIDialog2.default.propTypes, {
    maskProps: _react2.default.PropTypes.object,
    modalProps: _react2.default.PropTypes.object
});
UIModal.internalKeys = Object.keys(UIModal.propTypes);
UIModal.defaultProps = _extends({}, _UIDialog2.default.defaultProps, {
    captureFocus: true,
    maskProps: {},
    modalProps: {}
});
exports.default = UIModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"20":20,"28":28,"34":34,"5":5}],9:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require(34);

var _lodash4 = _interopRequireDefault(_lodash3);

var _UISegmentedControl = require(14);

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require(1);

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require(26);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A utility view for paging the display of many data items of varying sizes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPagination
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
            data: _this.props.data
        }, _this.mounted = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Item.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data });
        }
    };

    Item.prototype.waitForContentIfNecessary = function waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetItemData(promise, value) {
                if (this.mounted && this.state.data === promise) {
                    this.setState({ data: value });
                } // only replace if we're looking at the same promise, otherwise do nothing
            }.bind(this, this.state.data));
        }
    };

    Item.prototype.componentDidMount = function componentDidMount() {
        this.mounted = true;
        this.waitForContentIfNecessary();
    };

    Item.prototype.componentDidUpdate = function componentDidUpdate() {
        this.waitForContentIfNecessary();
    };

    Item.prototype.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;
    };

    Item.prototype.getClasses = function getClasses(extraClasses) {
        return (0, _classnames2.default)({
            'ui-pagination-item': true,
            'ui-pagination-item-even': this.props.even,
            'ui-pagination-item-odd': !this.props.even,
            'ui-pagination-item-loading': this.state.data instanceof Promise
        }) + (extraClasses ? ' ' + extraClasses : '');
    };

    Item.prototype.render = function render() {
        if (this.state.data instanceof Promise) {
            return _react2.default.createElement(
                'div',
                _extends({}, (0, _lodash4.default)(this.props, Item.internalKeys), { className: this.getClasses() }),
                this.props.loadingContent
            );
        }

        var jsx = this.props.dataToJSXConverterFunc(this.state.data, this.props.index);

        return _react2.default.cloneElement(jsx, _extends({}, (0, _lodash4.default)(this.props, Item.internalKeys), {
            className: this.getClasses(jsx.props.className),
            'data-index': this.props.index
        }));
    };

    return Item;
}(_react2.default.Component);

Item.propTypes = {
    even: _react.PropTypes.bool,
    data: _react.PropTypes.object,
    dataToJSXConverterFunc: _react.PropTypes.func,
    index: _react.PropTypes.number,
    loadingContent: _react.PropTypes.node
};
Item.internalKeys = Object.keys(Item.propTypes);

var UIPagination = function (_React$PureComponent) {
    _inherits(UIPagination, _React$PureComponent);

    function UIPagination() {
        var _temp2, _this2, _ret2;

        _classCallCheck(this, UIPagination);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this2), _this2.state = {
            currentPage: _this2.props.initialPage,
            targetIndex: (_this2.props.initialPage - 1) * _this2.props.numItemsPerPage
        }, _this2.currentPage = function () {
            return _this2.state.currentPage;
        }, _this2.getPageForIndex = function (index) {
            var itemsPerPage = arguments.length <= 1 || arguments[1] === undefined ? _this2.props.numItemsPerPage : arguments[1];
            return Math.ceil((index + 1) / itemsPerPage);
        }, _this2.totalPages = function () {
            return Math.ceil(_this2.props.totalItems / _this2.props.numItemsPerPage);
        }, _this2.firstVisibleItemIndex = function () {
            return (_this2.currentPage() - 1) * _this2.props.numItemsPerPage;
        }, _this2.pageToIndex = function (i) {
            if (i < 0 || i >= _this2.props.totalItems) {
                return new Error('Cannot page to invalid index ' + i + '.');
            }

            _this2.setState({
                currentPage: _this2.getPageForIndex(i),
                targetIndex: i
            });
        }, _this2.handleClick = function (value) {
            var nextTargetIndex = void 0;

            switch (value) {
                case UIPagination.controls.FIRST:
                    nextTargetIndex = 0;
                    break;
                case UIPagination.controls.PREVIOUS:
                    nextTargetIndex = _this2.firstVisibleItemIndex() - _this2.props.numItemsPerPage;
                    break;
                case UIPagination.controls.NEXT:
                    nextTargetIndex = _this2.firstVisibleItemIndex() + _this2.props.numItemsPerPage;
                    break;
                case UIPagination.controls.LAST:
                    nextTargetIndex = _this2.props.totalItems - 1;
                    break;
                default:
                    nextTargetIndex = parseInt(value, 10) * _this2.props.numItemsPerPage - 1;
            }

            _this2.setState({
                currentPage: _this2.getPageForIndex(nextTargetIndex),
                targetIndex: nextTargetIndex
            });
        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    UIPagination.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.currentPage()) {
            (0, _reactDom.findDOMNode)(this.refs.item_0).focus();
        }
    };

    UIPagination.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
        var _this3 = this;

        var oldProps = this.props;

        // use transactional `setState()` syntax to ensure that pending state updates are honored,
        // like those from `pageToIndex()`
        this.setState(function (state, props) {
            // NOTE: `props` here is technically the `nextProps` you'd receive from the first cWRP argument
            // so that's why we're caching `oldProps` outside the `setState`
            if (props.identifier !== oldProps.identifier) {
                return {
                    currentPage: 1,
                    targetIndex: 0
                };
            }

            return {
                currentPage: _this3.getPageForIndex(state.targetIndex, props.numItemsPerPage),
                targetIndex: state.targetIndex
            };
        });
    };

    UIPagination.prototype.createPageButtonOptions = function createPageButtonOptions() {
        var options = [];
        var currentPage = this.currentPage();
        var numPageToggles = this.props.numPageToggles;
        var totalPages = this.totalPages();
        var startPage = currentPage - (currentPage - 1) % numPageToggles;
        var endPage = Math.min(startPage + numPageToggles - 1, totalPages);

        if (this.props.showPaginationState) {
            options.push({
                selected: false,
                content: (0, _isFunction2.default)(this.props.showPaginationState) ? this.props.showPaginationState(currentPage, totalPages) : currentPage + ' of ' + totalPages,
                value: '',
                disabled: true,
                className: 'ui-pagination-control ui-pagination-control-state'
            });
        }

        if (this.props.showJumpToFirst) {
            options.push({
                selected: false,
                content: this.props.jumpToFirstControlContent,
                value: UIPagination.controls.FIRST,
                disabled: this.currentPage() === 1,
                className: 'ui-pagination-control ui-pagination-control-first'
            });
        }

        options.push({
            selected: false,
            content: this.props.previousPageControlContent,
            value: UIPagination.controls.PREVIOUS,
            disabled: this.currentPage() === 1,
            className: 'ui-pagination-control ui-pagination-control-previous'
        });

        for (var i = startPage; i <= endPage; i++) {
            options.push({
                className: 'ui-pagination-control',
                'data-page-number': i,
                selected: i === this.currentPage(),
                content: i,
                value: i
            });
        }

        options.push({
            selected: false,
            content: this.props.nextPageControlContent,
            value: UIPagination.controls.NEXT,
            disabled: this.currentPage() === totalPages,
            className: 'ui-pagination-control ui-pagination-control-next'
        });

        if (this.props.showJumpToLast) {
            options.push({
                selected: false,
                content: this.props.jumpToLastControlContent,
                value: UIPagination.controls.LAST,
                disabled: this.currentPage() === totalPages,
                className: 'ui-pagination-control ui-pagination-control-last'
            });
        }

        if (this.props.customControlContent) {
            options.push({
                selected: false,
                content: this.props.customControlContent,
                value: (0, _uuid2.default)(),
                disabled: true,
                className: 'ui-pagination-control ui-pagination-control-custom'
            });
        }

        return options;
    };

    UIPagination.prototype.generateItems = function generateItems() {
        var generatedItems = [];
        var firstItemIndex = this.firstVisibleItemIndex();
        var lastItemIndex = Math.min(this.props.totalItems, firstItemIndex + this.props.numItemsPerPage) - 1;

        for (var i = firstItemIndex; i <= lastItemIndex; i += 1) {
            generatedItems.push({ data: this.props.getItem(i) });
        }

        return generatedItems;
    };

    UIPagination.prototype.renderItems = function renderItems() {
        var _cx,
            _this4 = this;

        var props = this.props.listWrapperProps;
        var indexOffset = this.props.numItemsPerPage * (this.currentPage() - 1);

        return _react2.default.createElement(
            _UIArrowKeyNavigation2.default,
            _extends({}, props, {
                ref: 'itemList',
                className: (0, _classnames2.default)((_cx = {
                    'ui-pagination-items': true
                }, _cx[props.className] = !!props.className, _cx)) }),
            this.generateItems().map(function (item, index) {
                return _react2.default.createElement(Item, {
                    ref: 'item_' + index,
                    key: index,
                    data: item.data,
                    dataToJSXConverterFunc: _this4.props.itemToJSXConverterFunc,
                    even: index % 2 === 0,
                    index: indexOffset + index,
                    loadingContent: _this4.props.itemLoadingContent });
            })
        );
    };

    UIPagination.prototype.renderControls = function renderControls(position) {
        var _cx2;

        if (this.props.hidePagerIfNotNeeded && this.props.totalItems <= this.props.numItemsPerPage) {
            return;
        }

        var props = this.props.toggleWrapperProps;
        var positionLower = position.toLowerCase();
        var positionCapitalized = positionLower[0].toUpperCase() + positionLower.slice(1);

        return _react2.default.createElement(_UISegmentedControl2.default, _extends({}, props, {
            ref: 'segmentedControl' + positionCapitalized,
            className: (0, _classnames2.default)((_cx2 = {
                'ui-pagination-controls': true
            }, _cx2['ui-pagination-controls-' + positionLower] = true, _cx2[props.className] = !!props.className, _cx2)),
            options: this.createPageButtonOptions(),
            onOptionSelected: this.handleClick }));
    };

    UIPagination.prototype.renderView = function renderView() {
        var props = this.props;

        var position = UIPagination.positions;

        return _react2.default.createElement(
            'div',
            {
                ref: 'paginatedView',
                className: 'ui-pagination' },
            props.position === position.ABOVE || props.position === position.BOTH ? this.renderControls(position.ABOVE) : _noop2.default,
            this.renderItems(),
            props.position === position.BELOW || props.position === position.BOTH ? this.renderControls(position.BELOW) : _noop2.default
        );
    };

    UIPagination.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash4.default)(this.props, UIPagination.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-pagination-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderView()
        );
    };

    return UIPagination;
}(_react2.default.PureComponent);

UIPagination.controls = {
    FIRST: 'FIRST',
    PREVIOUS: 'PREVIOUS',
    NEXT: 'NEXT',
    LAST: 'LAST'
};
UIPagination.positions = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BOTH: 'BOTH'
};
UIPagination.propTypes = {
    customControlContent: _react.PropTypes.node,
    getItem: _react.PropTypes.func,
    hidePagerIfNotNeeded: _react.PropTypes.bool,
    identifier: _react.PropTypes.string.isRequired,

    initialPage: function validateInitialPage(props) {
        if ((0, _lodash2.default)(props.initialPage) === false) {
            return new Error('`initialPage` must be an integer.');
        }

        var numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

        if (props.initialPage < 1 || props.initialPage > numberOfPages) {
            return new Error('`initialPage` must be between 1 and ' + numberOfPages + '.');
        }
    },

    itemLoadingContent: _react.PropTypes.node,
    itemToJSXConverterFunc: _react.PropTypes.func,
    jumpToFirstControlContent: _react.PropTypes.node,
    jumpToLastControlContent: _react.PropTypes.node,
    listWrapperProps: _react.PropTypes.object,
    nextPageControlContent: _react.PropTypes.node,

    numItemsPerPage: function validateNumItemsPerPage(props) {
        if ((0, _lodash2.default)(props.numItemsPerPage) === false) {
            return new Error('`numItemsPerPage` must be an integer.');
        } else if (props.numItemsPerPage < 1) {
            return new Error('`numItemsPerPage` must be greater than zero.');
        }
    },

    numPageToggles: _react.PropTypes.number,
    position: _react.PropTypes.oneOf(Object.keys(UIPagination.positions)),
    previousPageControlContent: _react.PropTypes.node,
    showJumpToFirst: _react.PropTypes.bool,
    showJumpToLast: _react.PropTypes.bool,
    showPaginationState: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
    toggleWrapperProps: _react.PropTypes.object,
    totalItems: _react.PropTypes.number.isRequired
};
UIPagination.internalKeys = Object.keys(UIPagination.propTypes);
UIPagination.defaultProps = {
    getItem: _noop2.default,
    hidePagerIfNotNeeded: false,
    initialPage: 1,
    itemToJSXConverterFunc: function itemToJSXConverterFunc(data) {
        return data;
    },
    jumpToFirstControlContent: '« First',
    jumpToLastControlContent: 'Last »',
    listWrapperProps: {},
    nextPageControlContent: 'Next ›',
    numItemsPerPage: 10,
    numPageToggles: 5,
    position: UIPagination.positions.ABOVE,
    previousPageControlContent: '‹ Previous',
    showJumpToFirst: true,
    showJumpToLast: true,
    toggleWrapperProps: {}
};
exports.default = UIPagination;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"14":14,"21":21,"23":23,"26":26,"28":28,"33":33,"34":34}],10:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require(36);

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require(35);

var _lodash6 = _interopRequireDefault(_lodash5);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _transformProperty = require(25);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A non-blocking container positioned to a specific anchor element.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPopover
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIPopover = function (_React$PureComponent) {
    _inherits(UIPopover, _React$PureComponent);

    function UIPopover(props) {
        _classCallCheck(this, UIPopover);

        var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this));

        _this.componentDidUpdate = function () {
            /*
                A nuance about this component: since it only renders a simple <div>, the main render() function
                never changes. Therefore, we need to manually call `componentDidUpdate` after `setState` to trigger
                a full re-render of the child dialog.
             */
            _this.renderDialog();
            _this.align();
        };

        _this.align = function () {
            var anchor = _this.props.anchor instanceof HTMLElement ? _this.props.anchor : _reactDom2.default.findDOMNode(_this.props.anchor);

            _this.cacheViewportCartography(anchor);

            var dx = Math.round(_this.getNextDialogXPosition(anchor));
            var dy = Math.round(_this.getNextDialogYPosition(anchor));

            var alignmentCorrection = _this.getAlignmentCorrectionIfOverflowing(dx, dy);

            if (alignmentCorrection && _this.didAlignmentChange(alignmentCorrection)) {
                return _this.setState(alignmentCorrection, _this.componentDidUpdate);
            }

            // the caret is initially positioned at 0,0 inside the dialog
            // which is already positioned at the anchor, so we just need to
            // make small adjustments as necessary to line up the caret
            // with the visual center of the anchor

            _this.$caret.style.left = Math.round(_this.getNextCaretXPosition(anchor)) + 'px';
            _this.$caret.style.top = Math.round(_this.getNextCaretYPosition(anchor)) + 'px';

            _this.applyTranslation(_this.$caret, _classnames2.default, 0);
            _this.applyTranslation(_this.$wrapper, dx, dy);
        };

        _this.state = {
            anchorXAlign: props.anchorXAlign || props.preset.anchorXAlign,
            anchorYAlign: props.anchorYAlign || props.preset.anchorYAlign,
            selfXAlign: props.selfXAlign || props.preset.selfXAlign,
            selfYAlign: props.selfYAlign || props.preset.selfYAlign
        };
        return _this;
    }

    UIPopover.prototype.updateDialogInternalCache = function updateDialogInternalCache(instance) {
        this.dialog = instance;
        this.$dialog = instance.$dialog; // used in testing, not relevant
        this.$wrapper = instance.$wrapper;
    };

    UIPopover.prototype.componentWillMount = function componentWillMount() {
        this.$container = document.createElement('div');
        document.body.appendChild(this.$container);

        this.renderDialog();
        this.align();

        window.addEventListener('resize', this.align, true);
    };

    UIPopover.prototype.componentWillUnmount = function componentWillUnmount() {
        _reactDom2.default.unmountComponentAtNode(this.$container);
        document.body.removeChild(this.$container);

        window.removeEventListener('resize', this.align, true);
    };

    UIPopover.prototype.cacheViewportCartography = function cacheViewportCartography(anchor) {
        var anchorRect = anchor.getBoundingClientRect();

        this.anchorLeft = anchorRect.left;
        this.anchorTop = anchorRect.top;
        this.anchorHeight = anchorRect.height;
        this.anchorWidth = anchorRect.width;

        this.bodyLeft = document.body.scrollLeft;
        this.bodyTop = document.body.scrollTop;
    };

    UIPopover.prototype.getNextCaretXPosition = function getNextCaretXPosition(anchor) {
        var caret = arguments.length <= 1 || arguments[1] === undefined ? this.$caret : arguments[1];
        var _state = this.state;
        var anchorXAlign = _state.anchorXAlign;
        var selfXAlign = _state.selfXAlign;
        var anchorYAlign = _state.anchorYAlign;
        var selfYAlign = _state.selfYAlign;

        var position = UIPopover.position;

        var nextX = 0;

        // we only want to change the X position when we're
        // fully above or below the anchor and selfXAlign isn't MIDDLE

        if (selfXAlign !== position.MIDDLE && (anchorYAlign === position.START && selfYAlign === position.END || anchorYAlign === position.END && selfYAlign === position.START)) {

            if (anchorXAlign === position.START) {
                nextX += this.anchorWidth / 2 - caret.clientWidth / 2;
            } else if (anchorXAlign === position.END) {
                nextX += this.$wrapper.clientWidth - this.anchorWidth / 2 - caret.clientWidth / 2;
            }
        }

        return nextX;
    };

    UIPopover.prototype.getNextCaretYPosition = function getNextCaretYPosition(anchor) {
        var caret = arguments.length <= 1 || arguments[1] === undefined ? this.$caret : arguments[1];
        var _state2 = this.state;
        var anchorXAlign = _state2.anchorXAlign;
        var selfXAlign = _state2.selfXAlign;
        var anchorYAlign = _state2.anchorYAlign;
        var selfYAlign = _state2.selfYAlign;

        var position = UIPopover.position;

        var nextY = 0;

        // we only want to change the Y position when we're
        // fully to the left or right of the anchor (start,end | end,start)
        // selfYAlign isn't MIDDLE

        if (selfYAlign !== position.MIDDLE && (anchorXAlign === position.START && selfXAlign === position.END || anchorXAlign === position.END && selfXAlign === position.START)) {

            if (anchorYAlign === position.START) {
                nextY += this.anchorHeight / 2 - caret.clientWidth / 2;
            } else if (anchorYAlign === position.END) {
                nextY += this.$wrapper.clientHeight - this.anchorWidth / 2 - caret.clientWidth / 2;
            }
        }

        return nextY;
    };

    UIPopover.prototype.getNextDialogXPosition = function getNextDialogXPosition(anchor) {
        var dialog = arguments.length <= 1 || arguments[1] === undefined ? this.$wrapper : arguments[1];
        var _state3 = this.state;
        var anchorXAlign = _state3.anchorXAlign;
        var selfXAlign = _state3.selfXAlign;

        var position = UIPopover.position;

        var nextX = this.anchorLeft + this.bodyLeft;

        switch (anchorXAlign) {
            case position.MIDDLE:
                nextX += this.anchorWidth / 2;
                break;

            case position.END:
                nextX += this.anchorWidth;
                break;
        }

        switch (selfXAlign) {
            case position.MIDDLE:
                nextX -= dialog.clientWidth / 2;
                break;

            case position.END:
                nextX -= dialog.clientWidth;
                break;
        }

        return nextX;
    };

    UIPopover.prototype.getNextDialogYPosition = function getNextDialogYPosition(anchor) {
        var dialog = arguments.length <= 1 || arguments[1] === undefined ? this.$wrapper : arguments[1];

        var state = this.state;
        var position = UIPopover.position;
        var anchorY = this.anchorTop + this.bodyTop;

        var nextY = anchorY + this.anchorHeight;

        switch (state.anchorYAlign) {
            case position.START:
                nextY = anchorY;
                break;

            case position.MIDDLE:
                nextY = anchorY + this.anchorHeight / 2;
                break;
        }

        switch (state.selfYAlign) {
            case position.MIDDLE:
                nextY -= dialog.clientHeight / 2;
                break;

            case position.END:
                nextY -= dialog.clientHeight;
                break;
        }

        return nextY;
    };

    UIPopover.prototype.getAlignmentCorrectionIfOverflowing = function getAlignmentCorrectionIfOverflowing(x, y) {
        if (!this.props.autoReposition) {
            return false;
        }

        var corrections = _extends({}, this.state);
        var position = UIPopover.position;

        var width = this.$wrapper.clientWidth;
        var height = this.$wrapper.clientHeight;
        var xMax = document.body.scrollWidth;
        var yMax = document.body.scrollHeight;

        if (x + width > xMax) {
            // overflowing off to the right
            corrections.anchorXAlign = position.START;
            corrections.selfXAlign = position.END;
        }

        if (x < 0) {
            // overflowing off to the left
            corrections.anchorXAlign = position.END;
            corrections.selfXAlign = position.START;
        }

        if (y + height > yMax) {
            // overflowing below
            // if left/right
            if (corrections.anchorXAlign === position.START && corrections.selfXAlign === position.END || corrections.anchorXAlign === position.END && corrections.selfXAlign === position.START) {
                corrections.anchorYAlign = position.END;
            } else {
                corrections.anchorYAlign = position.START;
            }

            corrections.selfYAlign = position.END;
        }

        if (y < 0) {
            // overflowing above
            // if left/right
            if (corrections.anchorXAlign === position.START && corrections.selfXAlign === position.END || corrections.anchorXAlign === position.END && corrections.selfXAlign === position.START) {
                corrections.anchorYAlign = position.START;
            } else {
                corrections.anchorYAlign = position.END;
            }

            corrections.selfYAlign = position.START;
        }

        return corrections;
    };

    UIPopover.prototype.applyTranslation = function applyTranslation(node, x, y) {
        if (_transformProperty2.default) {
            node.style[_transformProperty2.default] = 'translate(' + x + 'px, ' + y + 'px)';
        } else {
            node.style.left = x + 'px';
            node.style.top = y + 'px';
        }
    };

    UIPopover.prototype.didAlignmentChange = function didAlignmentChange(nextAlignment) {
        var currentAlignment = arguments.length <= 1 || arguments[1] === undefined ? this.state : arguments[1];

        return nextAlignment.anchorXAlign !== currentAlignment.anchorXAlign || nextAlignment.anchorYAlign !== currentAlignment.anchorYAlign || nextAlignment.selfXAlign !== currentAlignment.selfXAlign || nextAlignment.selfYAlign !== currentAlignment.selfYAlign;
    };

    UIPopover.prototype.getClassAlignmentFragment = function getClassAlignmentFragment(constant) {
        var position = UIPopover.position;

        switch (constant) {
            case position.START:
                return 'start';

            case position.MIDDLE:
                return 'middle';

            case position.END:
                return 'end';
        }
    };

    UIPopover.prototype.renderDialog = function renderDialog() {
        var _this2 = this,
            _cx,
            _cx2;

        var state = this.state;
        var getFrag = this.getClassAlignmentFragment;

        this.updateDialogInternalCache(_reactDom2.default.render(_react2.default.createElement(_UIDialog2.default, _extends({}, (0, _lodash2.default)(this.props, UIPopover.internalKeys), {
            before: _react2.default.cloneElement(this.props.caretComponent, {
                ref: function ref(node) {
                    return _this2.$caret = node;
                },
                className: (0, _classnames2.default)((_cx = {
                    'ui-popover-caret': true
                }, _cx[this.props.caretComponent.props.className] = !!this.props.caretComponent.props.className, _cx))
            }),
            wrapperProps: _extends({}, this.props.wrapperProps, {
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-popover': true
                }, _cx2['ui-popover-anchor-x-' + getFrag(state.anchorXAlign)] = true, _cx2['ui-popover-anchor-y-' + getFrag(state.anchorYAlign)] = true, _cx2['ui-popover-self-x-' + getFrag(state.selfXAlign)] = true, _cx2['ui-popover-self-y-' + getFrag(state.selfYAlign)] = true, _cx2[this.props.wrapperProps.className] = !!this.props.wrapperProps.className, _cx2))
            }) })), this.$container));
    };

    UIPopover.prototype.render = function render() {
        return _react2.default.createElement('div', null);
    };

    return UIPopover;
}(_react2.default.PureComponent);

UIPopover.position = {
    START: 'START',
    MIDDLE: 'MIDDLE',
    END: 'END'
};
UIPopover.positionValues = (0, _lodash6.default)(UIPopover.position);
UIPopover.preset = {
    'ABOVE': {
        anchorXAlign: UIPopover.position.MIDDLE,
        anchorYAlign: UIPopover.position.START,
        selfXAlign: UIPopover.position.MIDDLE,
        selfYAlign: UIPopover.position.END
    },
    'BELOW': {
        anchorXAlign: UIPopover.position.MIDDLE,
        anchorYAlign: UIPopover.position.END,
        selfXAlign: UIPopover.position.MIDDLE,
        selfYAlign: UIPopover.position.START
    },
    'LEFT': {
        anchorXAlign: UIPopover.position.START,
        anchorYAlign: UIPopover.position.MIDDLE,
        selfXAlign: UIPopover.position.END,
        selfYAlign: UIPopover.position.MIDDLE
    },
    'RIGHT': {
        anchorXAlign: UIPopover.position.END,
        anchorYAlign: UIPopover.position.MIDDLE,
        selfXAlign: UIPopover.position.START,
        selfYAlign: UIPopover.position.MIDDLE
    }
};
UIPopover.presetValues = (0, _lodash6.default)(UIPopover.preset);
UIPopover.propTypes = _extends({}, _UIDialog2.default.propTypes, {
    anchor: _react.PropTypes.oneOfType([_react.PropTypes.instanceOf(HTMLElement), _react.PropTypes.shape({
        props: _react.PropTypes.object,
        state: _react.PropTypes.object
    })]).isRequired,
    anchorXAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    anchorYAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    autoReposition: _react.PropTypes.bool,
    caretComponent: _react.PropTypes.element,
    preset: _react.PropTypes.oneOf(UIPopover.presetValues),
    selfXAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    selfYAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    wrapperProps: _react.PropTypes.object
});
UIPopover.internalKeys = _lodash4.default.apply(undefined, [Object.keys(UIPopover.propTypes)].concat(Object.keys(_UIDialog2.default.propTypes)));
UIPopover.defaultProps = _extends({}, _UIDialog2.default.defaultProps, {
    autoReposition: true,
    captureFocus: false,
    caretComponent: _react2.default.createElement(
        'svg',
        { viewBox: '0 0 14 9.5', xmlns: 'http://www.w3.org/2000/svg' },
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('polygon', { className: 'ui-popover-caret-border', fill: '#000', points: '7 0 14 10 0 10' }),
            _react2.default.createElement('polygon', { className: 'ui-popover-caret-fill', fill: '#FFF', points: '6.98230444 1.75 12.75 10 1.25 10' })
        )
    ),
    closeOnEscKey: true,
    closeOnOutsideClick: true,
    closeOnOutsideScroll: true,
    preset: UIPopover.preset.BELOW,
    wrapperProps: {}
});
exports.default = UIPopover;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"25":25,"28":28,"34":34,"35":35,"36":36,"5":5}],11:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An unopinionated progress implementation that allows for a variety of shapes and effects.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIProgress
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIProgress = function (_React$PureComponent) {
    _inherits(UIProgress, _React$PureComponent);

    function UIProgress() {
        _classCallCheck(this, UIProgress);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UIProgress.prototype.renderLabel = function renderLabel() {
        if (this.props.label) {
            var _cx;

            return _react2.default.createElement(
                'div',
                _extends({}, this.props.labelProps, {
                    ref: 'label',
                    className: (0, _classnames2.default)((_cx = {
                        'ui-progress-label': true
                    }, _cx[this.props.labelProps.className] = !!this.props.labelProps.className, _cx)) }),
                this.props.label
            );
        }
    };

    UIProgress.prototype.renderCancel = function renderCancel() {
        if (this.props.onCancel) {
            var _cx2;

            return _react2.default.createElement(_UIButton2.default, _extends({}, this.props.cancelProps, {
                ref: 'cancel',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-progress-cancel': true
                }, _cx2[this.props.cancelProps.className] = !!this.props.cancelProps.className, _cx2)),
                onPressed: this.props.onCancel }));
        }
    };

    UIProgress.prototype.renderProgress = function renderProgress() {
        var _cx3, _extends2;

        return _react2.default.createElement('div', _extends({}, this.props.progressProps, {
            ref: 'progress',
            className: (0, _classnames2.default)((_cx3 = {
                'ui-progress': true,
                'ui-progress-indeterminate': typeof this.props.progress === 'undefined'
            }, _cx3[this.props.progressProps.className] = !!this.props.progressProps.className, _cx3)),
            role: 'presentation',
            style: _extends({}, this.props.progressProps.style, (_extends2 = {}, _extends2[this.props.tweenProperty] = this.props.progress, _extends2)) }));
    };

    UIProgress.prototype.render = function render() {
        var _cx4;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UIProgress.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-progress-wrapper': true
                }, _cx4[this.props.className] = !!this.props.className, _cx4)) }),
            this.renderProgress(),
            this.renderLabel(),
            this.renderCancel()
        );
    };

    return UIProgress;
}(_react2.default.PureComponent);

UIProgress.propTypes = {
    cancelProps: _react2.default.PropTypes.object,
    label: _react2.default.PropTypes.node,
    labelProps: _react2.default.PropTypes.object,
    onCancel: _react2.default.PropTypes.func,
    progress: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    progressProps: _react2.default.PropTypes.object,
    tweenProperty: _react2.default.PropTypes.string
};
UIProgress.internalKeys = Object.keys(UIProgress.propTypes);
UIProgress.defaultProps = {
    cancelProps: {},
    labelProps: {},
    progressProps: {},
    tweenProperty: 'width'
};
exports.default = UIProgress;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"28":28,"34":34}],12:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Hide content until it's needed.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIProgressiveDisclosure
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIProgressiveDisclosure = function (_React$PureComponent) {
    _inherits(UIProgressiveDisclosure, _React$PureComponent);

    function UIProgressiveDisclosure() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIProgressiveDisclosure);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            expanded: _this.props.expanded
        }, _this.dispatchCallback = function () {
            _this.props[_this.state.expanded ? 'onExpand' : 'onHide']();
        }, _this.handleClick = function (event) {
            _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);

            /* istanbul ignore else */
            if ((0, _isFunction2.default)(_this.props.toggleProps.onClick)) {
                _this.props.toggleProps.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);
            }

            /* istanbul ignore else */
            if ((0, _isFunction2.default)(_this.props.toggleProps.onKeyDown)) {
                _this.props.toggleProps.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIProgressiveDisclosure.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if (newProps.expanded !== this.props.expanded) {
            this.setState({ expanded: newProps.expanded }, this.dispatchCallback);
        }
    };

    UIProgressiveDisclosure.prototype.renderContent = function renderContent() {
        if (this.state.expanded) {
            return _react2.default.createElement(
                'div',
                { ref: 'content',
                    className: 'ui-disclosure-content' },
                this.props.children
            );
        }
    };

    UIProgressiveDisclosure.prototype.render = function render() {
        var _cx, _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UIProgressiveDisclosure.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-disclosure': true,
                    'ui-disclosure-expanded': this.state.expanded
                }, _cx[this.props.className] = !!this.props.className, _cx)) }),
            _react2.default.createElement(
                'div',
                _extends({}, this.props.toggleProps, {
                    ref: 'toggle',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-disclosure-toggle': true
                    }, _cx2[this.props.toggleProps.className] = !!this.props.toggleProps.className, _cx2)),
                    onClick: this.handleClick,
                    onKeyDown: this.handleKeyDown,
                    tabIndex: '0' }),
                this.state.expanded ? this.props.teaserExpanded || this.props.teaser : this.props.teaser
            ),
            this.renderContent()
        );
    };

    return UIProgressiveDisclosure;
}(_react2.default.PureComponent);

UIProgressiveDisclosure.propTypes = {
    children: _react2.default.PropTypes.node,
    expanded: _react2.default.PropTypes.bool,
    onExpand: _react2.default.PropTypes.func,
    onHide: _react2.default.PropTypes.func,
    teaser: _react2.default.PropTypes.node,
    teaserExpanded: _react2.default.PropTypes.node,
    toggleProps: _react2.default.PropTypes.object
};
UIProgressiveDisclosure.internalKeys = Object.keys(UIProgressiveDisclosure.propTypes);
UIProgressiveDisclosure.defaultProps = {
    expanded: false,
    onExpand: _noop2.default,
    onHide: _noop2.default,
    toggleProps: {}
};
exports.default = UIProgressiveDisclosure;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"23":23,"28":28,"34":34}],13:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require(26);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An accessible radio form control.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIRadio
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIRadio = function (_React$PureComponent) {
    _inherits(UIRadio, _React$PureComponent);

    function UIRadio() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIRadio);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.uuid = (0, _uuid2.default)(), _this.handleChange = function (event) {
            if (event.target.checked) {
                _this.props.onSelected(event.target.value);
            }

            /* istanbul ignore else */
            if ((0, _isFunction2.default)(_this.props.inputProps.onChange)) {
                _this.props.inputProps.onChange(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIRadio.prototype.renderInput = function renderInput() {
        var _cx;

        return _react2.default.createElement('input', _extends({}, this.props.inputProps, {
            ref: 'input',
            type: 'radio',
            id: this.props.id || this.props.inputProps.id || this.uuid,
            className: (0, _classnames2.default)((_cx = {
                'ui-radio': true,
                'ui-radio-selected': this.props.selected
            }, _cx[this.props.inputProps.className] = !!this.props.inputProps.className, _cx)),
            name: this.props.name,
            value: this.props.value,
            checked: this.props.selected,
            'aria-checked': String(this.props.selected),
            onChange: this.handleChange }));
    };

    UIRadio.prototype.renderLabel = function renderLabel() {
        if (this.props.label) {
            var _cx2;

            return _react2.default.createElement(
                'label',
                _extends({}, this.props.labelProps, {
                    ref: 'label',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-radio-label': true
                    }, _cx2[this.props.labelProps.className] = !!this.props.labelProps.className, _cx2)),
                    htmlFor: this.props.id || this.props.inputProps.id || this.uuid }),
                this.props.label
            );
        }
    };

    UIRadio.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UIRadio.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-radio-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderInput(),
            this.renderLabel()
        );
    };

    return UIRadio;
}(_react2.default.PureComponent);

UIRadio.propTypes = {
    inputProps: _react2.default.PropTypes.object,
    label: _react2.default.PropTypes.node,
    labelProps: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string.isRequired,
    onSelected: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.bool,
    value: _react2.default.PropTypes.string.isRequired
};
UIRadio.internalKeys = Object.keys(UIRadio.propTypes);
UIRadio.defaultProps = {
    inputProps: {},
    labelProps: {},
    onSelected: _noop2.default,
    selected: false
};
exports.default = UIRadio;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"23":23,"26":26,"28":28,"34":34}],14:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related radio-style buttons.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UISegmentedControl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UISegmentedControl = function (_React$PureComponent) {
    _inherits(UISegmentedControl, _React$PureComponent);

    function UISegmentedControl() {
        var _temp, _this, _ret;

        _classCallCheck(this, UISegmentedControl);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            indexOfOptionInFocus: null
        }, _this.handleKeyDown = function (event) {
            var key = event.key;
            var activeItemIndex = _this.state.indexOfOptionInFocus;

            if (key === 'ArrowLeft') {
                _this.setFocus(_this.getPreviousOptionIndex(activeItemIndex));
                event.preventDefault();
            } else if (key === 'ArrowRight') {
                _this.setFocus(_this.getNextOptionIndex(activeItemIndex));
                event.preventDefault();
            } else if (key === 'Enter') {
                _this.handleOptionClick(_this.props.options[activeItemIndex]);
                event.preventDefault();
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UISegmentedControl.prototype.currentValue = function currentValue() {
        var value = void 0;

        this.props.options.some(function (option) {
            if (option.selected) {
                value = option.value;

                return true;
            }
        });

        return value;
    };

    UISegmentedControl.prototype.setFocus = function setFocus(index) {
        (0, _reactDom.findDOMNode)(this.refs['option_$' + index]).focus();
    };

    UISegmentedControl.prototype.getNextOptionIndex = function getNextOptionIndex(currentOptionIndex) {
        var next = currentOptionIndex + 1;

        return next < this.props.options.length ? next : 0;
    };

    UISegmentedControl.prototype.getPreviousOptionIndex = function getPreviousOptionIndex(currentOptionIndex) {
        var previous = currentOptionIndex - 1;

        return previous < 0 ? this.props.options.length - 1 : previous;
    };

    UISegmentedControl.prototype.handleOptionBlur = function handleOptionBlur(option, event) {
        if (this.state.indexOfOptionInFocus === this.props.options.indexOf(option)) {
            this.setState({ indexOfOptionInFocus: null });
        }

        if ((0, _isFunction2.default)(option.onBlur)) {
            option.onBlur(event);
        }
    };

    UISegmentedControl.prototype.handleOptionClick = function handleOptionClick(option, event) {
        this.props.onOptionSelected(option.value);

        if ((0, _isFunction2.default)(option.onClick)) {
            option.onClick(event);
        }
    };

    UISegmentedControl.prototype.handleOptionFocus = function handleOptionFocus(option, event) {
        this.setState({ indexOfOptionInFocus: this.props.options.indexOf(option) });

        if ((0, _isFunction2.default)(option.onFocus)) {
            option.onFocus(event);
        }
    };

    UISegmentedControl.prototype.renderOptions = function renderOptions() {
        var _this2 = this;

        return this.props.options.map(function (definition, index) {
            var _cx;

            return _react2.default.createElement(
                _UIButton2.default,
                _extends({}, (0, _lodash2.default)(definition, UISegmentedControl.internalChildKeys), {
                    role: 'radio',
                    'aria-checked': String(definition.selected),
                    ref: 'option_$' + index,
                    key: definition.value,
                    className: (0, _classnames2.default)((_cx = {
                        'ui-segmented-control-option': true,
                        'ui-segmented-control-option-selected': definition.selected
                    }, _cx[definition.className] = !!definition.className, _cx)),
                    tabIndex: definition.selected ? '0' : '-1',
                    onBlur: _this2.handleOptionBlur.bind(_this2, definition),
                    onPressed: _this2.handleOptionClick.bind(_this2, definition),
                    onFocus: _this2.handleOptionFocus.bind(_this2, definition) }),
                definition.content
            );
        });
    };

    UISegmentedControl.prototype.render = function render() {
        var _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UISegmentedControl.internalKeys), {
                ref: 'wrapper',
                'aria-role': 'radiogroup',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-segmented-control': true
                }, _cx2[this.props.className] = !!this.props.className, _cx2)),
                onKeyDown: this.handleKeyDown }),
            this.renderOptions()
        );
    };

    return UISegmentedControl;
}(_react2.default.PureComponent);

UISegmentedControl.propTypes = {
    onOptionSelected: _react2.default.PropTypes.func,
    options: function validateOptions(props) {
        if (props.options.length < 2) {
            throw new Error('Must provide at least two options.');
        }

        var missingSelected = props.options.some(function (option) {
            if (!('selected' in option)) {
                return true;
            }
        });

        if (missingSelected) {
            throw new Error('Must provide a `selected` prop for each option.');
        }

        var seenSelected = false;
        var multipleSelected = props.options.some(function (option) {
            if (option.selected) {
                if (seenSelected) {
                    return true;
                }

                seenSelected = true;
            }
        });

        if (multipleSelected) {
            throw new Error('Encountered multiple options with `selected: true`. There can be only one.');
        }

        if (props.options.some(function (option) {
            return typeof option.value === 'undefined';
        })) {
            throw new Error('Must provide a `value` prop for each option.');
        }
    }
};
UISegmentedControl.internalKeys = Object.keys(UISegmentedControl.propTypes);
UISegmentedControl.internalChildKeys = ['content', 'value', 'selected'];
UISegmentedControl.defaultProps = {
    options: [],
    onOptionSelected: _noop2.default
};
exports.default = UISegmentedControl;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"21":21,"23":23,"28":28,"34":34}],15:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _enigmaTable = require(29);

var _enigmaTable2 = _interopRequireDefault(_enigmaTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React wrapper for Table.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function didColumnsChange(currentColumns, prevColumns, tableInternalColumns) {
    /*
        1. there should be the same number of columns
        2. the columns should exactly match in the proper order
        3. each column property should be exactly the same
     */

    if (currentColumns.length !== prevColumns.length) {
        return true;
    }

    // did the column descriptors change in some way, or did the width change?
    // this will also catch if the order of the columns changed when comparing
    // the mapping property
    return currentColumns.some(function (column, index) {
        return column.mapping !== prevColumns[index].mapping || column.title !== prevColumns[index].title || column.resizable !== prevColumns[index].resizable || column.width !== undefined && column.width !== tableInternalColumns[index].width;
    });
}

var columnChildSpec = _react.PropTypes.shape({
    tag: _react.PropTypes.string,
    attributes: _react.PropTypes.object
});

var UITable = function (_React$PureComponent) {
    _inherits(UITable, _React$PureComponent);

    function UITable() {
        _classCallCheck(this, UITable);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UITable.prototype.getSubviewConfiguration = function getSubviewConfiguration() {
        return {
            wrapper: this.refs.wrapper,
            header: this.refs.header,
            body: this.refs.body,
            'x-scroll-track': this.refs['x-scroll-track'],
            'x-scroll-handle': this.refs['x-scroll-handle'],
            'y-scroll-track': this.refs['y-scroll-track'],
            'y-scroll-handle': this.refs['y-scroll-handle'],
            aria: this.refs.aria,

            activeRowChangedFunc: this.props.onActiveRowChanged,
            allowScrollPropagation: this.props.allowScrollPropagation,
            columns: this.props.columns,
            columnResizeFunc: this.props.onColumnResize,
            fitColumnsToTable: this.props.fitColumnsToTableWidth,
            headerColumnClickFunc: this.props.onHeaderCellInteract,
            rowClickFunc: this.props.onRowInteract,
            cellClickFunc: this.props.onCellInteract,
            getRow: this.props.getRow,
            preserveScrollState: this.props.preserveScrollState,
            throttleInterval: this.props.throttleInterval,
            totalRows: this.props.totalRows
        };
    };

    UITable.prototype.componentDidMount = function componentDidMount() {
        this.table = new _enigmaTable2.default(this.getSubviewConfiguration());

        if (this.props.jumpToRowIndex !== undefined) {
            this.table.jumpToRowIndex(this.props.jumpToRowIndex);
        }
    };

    UITable.prototype.componentWillUnmount = function componentWillUnmount() {
        this.table.destroy();
        this.table = null;
    };

    UITable.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        var props = this.props;

        var changedProps = [];
        var key = void 0;

        /* bidirectional key change detection */

        for (key in props) {
            if (props[key] !== prevProps[key]) {
                changedProps.push(key);
            }
        }

        for (key in prevProps) {
            if (prevProps[key] !== props[key] && changedProps.indexOf(key) === -1) {
                changedProps.push(key);
            }
        }

        if (changedProps.length) {
            if (changedProps.indexOf('jumpToRowIndex') !== -1) {
                /* jumpToRowIndex already triggers a regeneration, just avoiding running it twice */
                return this.table.jumpToRowIndex(props.jumpToRowIndex);
            }

            if (changedProps.length === 1 && changedProps[0] === 'columns') {
                /* did things materially change, or just updating a column width? */
                if (didColumnsChange(props.columns, prevProps.columns, this.table.columns) === false) {
                    return;
                }
            }

            this.table.regenerate(this.getSubviewConfiguration());
        }
    };

    UITable.prototype.renderXScroll = function renderXScroll() {
        return _react2.default.createElement(
            'div',
            { ref: 'x-scroll-track', className: 'ui-table-x-scroll-track' },
            _react2.default.createElement('div', { ref: 'x-scroll-handle', className: 'ui-table-x-scroll-handle' })
        );
    };

    UITable.prototype.renderYScroll = function renderYScroll() {
        return _react2.default.createElement(
            'div',
            { ref: 'y-scroll-track', className: 'ui-table-y-scroll-track' },
            _react2.default.createElement('div', { ref: 'y-scroll-handle', className: 'ui-table-y-scroll-handle' })
        );
    };

    UITable.prototype.renderAria = function renderAria() {
        return _react2.default.createElement('div', { ref: 'aria', className: this.props.offscreenClass || 'ui-offscreen', 'aria-live': 'polite' });
    };

    UITable.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UITable.internalKeys), {
                ref: 'wrapper',
                className: 'ui-table-wrapper ' + this.props.className,
                'data-set-identifier': this.props.identifier,
                tabIndex: '0' }),
            _react2.default.createElement('div', { ref: 'header', className: 'ui-table-header' }),
            _react2.default.createElement('div', { ref: 'body', className: 'ui-table-body' }),
            this.renderXScroll(),
            this.renderYScroll(),
            this.renderAria()
        );
    };

    return UITable;
}(_react2.default.PureComponent);

UITable.propTypes = {
    allowScrollPropagation: _react.PropTypes.bool,
    columns: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        children: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool, columnChildSpec, _react.PropTypes.arrayOf(columnChildSpec)]),
        mapping: _react.PropTypes.string,
        resizable: _react.PropTypes.bool,
        title: _react.PropTypes.string,
        width: _react.PropTypes.number
    })),
    fitColumnsToTableWidth: _react.PropTypes.bool,
    getRow: _react.PropTypes.func,
    identifier: _react.PropTypes.string,
    jumpToRowIndex: _react.PropTypes.number,
    offscreenClass: _react.PropTypes.string,
    onActiveRowChanged: _react.PropTypes.func,
    onCellInteract: _react.PropTypes.func,
    onColumnResize: _react.PropTypes.func,
    onHeaderCellInteract: _react.PropTypes.func,
    onRowInteract: _react.PropTypes.func,
    preserveScrollState: _react.PropTypes.bool,
    throttleInterval: _react.PropTypes.number,
    totalRows: _react.PropTypes.number
};
UITable.internalKeys = Object.keys(UITable.propTypes);
UITable.defaultProps = {
    allowScrollPropagation: false,
    className: '',
    fitColumnsToTableWidth: false,
    offscreenClass: 'ui-offscreen',
    preserveScrollState: true
};
exports.default = UITable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"29":29,"34":34}],16:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(22);

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UITextualInput = function (_React$PureComponent) {
    _inherits(UITextualInput, _React$PureComponent);

    function UITextualInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITextualInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            input: '',
            isControlled: (0, _isString2.default)(_this.props.inputProps.value),
            isFocused: false
        }, _this.setInputValue = function () {
            var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            return _this.setState(function (state) {
                return _extends({}, state, { input: value });
            });
        }, _this.getValue = function () {
            return _this.refs.field.value;
        }, _this.handleBlur = function (event) {
            _this.setState(function (state) {
                return _extends({}, state, { isFocused: false });
            });

            if ((0, _isFunction2.default)(_this.props.inputProps.onBlur) === true) {
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState(function (state) {
                return _extends({}, state, { isFocused: true });
            });

            if ((0, _isFunction2.default)(_this.props.inputProps.onFocus) === true) {
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleChange = function (event) {
            // for "controlled" scenarios, updates to the cached input text should come
            // exclusively via props (cWRP) so it exactly mirrors the current application
            // state, otherwise a re-render will occur before the new text has completed its
            // feedback loop and the cursor position is lost
            if (_this.state.isControlled === false) {
                _this.setInputValue(event.target.value);
            }

            if ((0, _isFunction2.default)(_this.props.inputProps.onChange) === true) {
                _this.props.inputProps.onChange(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITextualInput.prototype.componentWillMount = function componentWillMount() {
        if (this.state.isControlled === true) {
            return this.setInputValue(this.props.inputProps.value);
        }

        this.setInputValue(this.props.inputProps.defaultValue);
    };

    UITextualInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.setInputValue(nextProps.inputProps.value);
        }
    };

    UITextualInput.prototype.setValue = function setValue(nextValue) {
        this.setInputValue(nextValue);
        this.refs.field.value = nextValue;

        if (this.state.isControlled === true) {
            // simulate input change event flow
            this.refs.field.dispatchEvent(new Event('input', { bubbles: true }));
            this.refs.field.dispatchEvent(new Event('change', { bubbles: true }));
        }
    };

    UITextualInput.prototype.getPlaceholderText = function getPlaceholderText() {
        var isNonEmpty = this.state.input !== '';
        var shouldShowPlaceholder = this.props.hidePlaceholderOnFocus === true ? this.state.isFocused === false && isNonEmpty === false : isNonEmpty === false;

        return shouldShowPlaceholder ? this.props.inputProps.placeholder : '';
    };

    UITextualInput.prototype.renderPlaceholder = function renderPlaceholder() {
        return _react2.default.createElement(
            'div',
            { ref: 'placeholder', className: 'ui-textual-input-placeholder ui-textual-input' },
            this.getPlaceholderText()
        );
    };

    UITextualInput.prototype.render = function render() {
        var _cx, _cx2;

        var props = this.props;


        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(props, UITextualInput.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-textual-input-wrapper': true
                }, _cx[props.className] = Boolean(props.className), _cx)),
                title: this.getPlaceholderText() }),
            this.renderPlaceholder(),
            _react2.default.createElement('input', _extends({}, props.inputProps, {
                ref: 'field',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-textual-input': true
                }, _cx2[props.inputProps.className] = Boolean(props.inputProps.className), _cx2)),
                placeholder: null,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onChange: this.handleChange }))
        );
    };

    return UITextualInput;
}(_react2.default.PureComponent);

UITextualInput.propTypes = {
    hidePlaceholderOnFocus: _react.PropTypes.bool,
    inputProps: _react.PropTypes.shape({
        defaultValue: _react.PropTypes.string,
        onBlur: _react.PropTypes.func,
        onFocus: _react.PropTypes.func,
        onChange: _react.PropTypes.func,
        placeholder: _react.PropTypes.string,
        type: _react.PropTypes.string,
        value: _react.PropTypes.string
    })
};
UITextualInput.internalKeys = Object.keys(UITextualInput.propTypes);
UITextualInput.defaultProps = {
    hidePlaceholderOnFocus: true,
    inputProps: {
        type: 'text'
    }
};
exports.default = UITextualInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"22":22,"28":28,"34":34}],17:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _UITypeaheadInput = require(19);

var _UITypeaheadInput2 = _interopRequireDefault(_UITypeaheadInput);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distill rich entity data matched via typeahead input into simple visual abstractions.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITokenizedInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var first = function first(array) {
    return array[0];
};
var last = function last(array) {
    return array[array.length - 1];
};

var UITokenizedInput = function (_React$PureComponent) {
    _inherits(UITokenizedInput, _React$PureComponent);

    function UITokenizedInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITokenizedInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.focus = function () {
            return _this.refs.typeahead.focus();
        }, _this.getInputNode = function () {
            return _this.refs.typeahead.getInputNode();
        }, _this.getSelectedEntityText = function () {
            return _this.refs.typeahead.getSelectedEntityText();
        }, _this.getValue = function () {
            return _this.refs.typeahead.getValue();
        }, _this.select = function () {
            return _this.refs.typeahead.select();
        }, _this.setValue = function (value) {
            return _this.refs.typeahead.setValue(value);
        }, _this.add = function (index) {
            if (_this.props.tokens.indexOf(index) === -1) {
                _this.props.handleAddToken(index);
            }
        }, _this.handleInputClick = function (event) {
            _this.clearSelection();

            if ((0, _isFunction2.default)(_this.props.inputProps.onClick)) {
                _this.props.inputProps.onClick(event);
            }
        }, _this.handleInputFocus = function (event) {
            _this.clearSelection();

            if ((0, _isFunction2.default)(_this.props.inputProps.onFocus)) {
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.which) {
                case 37:
                    // left arrow
                    _this.selectPreviousToken(event.shiftKey);
                    break;

                case 39:
                    // right arrow
                    _this.selectNextToken(event.shiftKey);
                    break;

                case 8:
                    // backspace
                    if (_this.props.tokensSelected.length) {
                        _this.remove(_this.props.tokensSelected);
                        _this.focus();
                    }

                    break;

                case 65:
                    // letter "a"
                    if (event.metaKey) {
                        event.preventDefault();

                        _this.focus();
                        _this.select();

                        // hacky, but the only way unless we move selection management internal again
                        _this._suppressNextTokenSelection = true;

                        _this.props.handleNewSelection(_this.props.tokens);
                    } // "cmd"
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITokenizedInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        var previousSelectedIndexes = prevProps.tokensSelected;
        var currentSelectedIndexes = this.props.tokensSelected;

        if (this.props.tokens.length > prevProps.tokens.length) {
            this.setValue('');
        }

        if (this._suppressNextTokenSelection) {
            this._suppressNextTokenSelection = false;

            return;
        }

        if (previousSelectedIndexes !== currentSelectedIndexes && currentSelectedIndexes.length !== 0) {
            if (currentSelectedIndexes.length === 1 || currentSelectedIndexes[0] !== previousSelectedIndexes[0] /* multi selection, leftward */) {
                    return this.refs['token_' + currentSelectedIndexes[0]].focus();
                } else if (last(currentSelectedIndexes) !== last(previousSelectedIndexes) /* multi selection, rightward */) {
                    return this.refs['token_' + last(currentSelectedIndexes)].focus();
                }

            this.refs['token_' + currentSelectedIndexes[0]].focus();
        } // move focus
    };

    // passthroughs to UITypeaheadInput instance methods


    UITokenizedInput.prototype.remove = function remove(index) {
        var _this2 = this;

        var indexes = (Array.isArray(index) ? index : [index]).filter(function (idx) {
            return _this2.props.tokens.indexOf(idx) !== -1;
        });

        if (indexes.length) {
            this.props.handleRemoveTokens(indexes);
        }
    };

    UITokenizedInput.prototype.selectToken = function selectToken(index) {
        this.props.handleNewSelection([index]);
    };

    UITokenizedInput.prototype.selectTokens = function selectTokens(indexes) {
        this.props.handleNewSelection(indexes);
    };

    UITokenizedInput.prototype.selectPreviousToken = function selectPreviousToken(append) {
        var selected = this.props.tokensSelected;
        var indexes = this.props.tokens;

        if (selected.length === 1 && first(selected) === first(indexes)) {
            return; // already at leftmost bound
        }

        if (selected.length === 0) {
            // pick the rightmost
            this.selectToken(last(indexes));
        } else {
            // add the next leftmost to a reconstructed "selected" array
            var previousToken = indexes[indexes.indexOf(first(selected)) - 1];

            this.selectTokens(append ? [previousToken].concat(selected) : [previousToken]);
        }
    };

    UITokenizedInput.prototype.selectNextToken = function selectNextToken(append) {
        var selected = this.props.tokensSelected;
        var indexes = this.props.tokens;

        if (selected.length === 0) {
            return;
        }

        if (last(selected) === last(indexes)) {
            this.clearSelection();
            this.focus();
        } else {
            var nextToken = indexes[indexes.indexOf(last(selected)) + 1];

            this.selectTokens(append ? selected.concat(nextToken) : [nextToken]);
        }
    };

    UITokenizedInput.prototype.clearSelection = function clearSelection() {
        this.props.handleNewSelection([]);
    };

    UITokenizedInput.prototype.handleTokenCloseClick = function handleTokenCloseClick(index, event) {
        // if we don't stop propagation, the event bubbles and results in a failed token selection
        event.stopPropagation();

        this.remove(index);
        this.focus();

        if (this.props.tokenCloseComponent.props.onClick) {
            this.props.tokenCloseComponent.props.onClick(event);
        }
    };

    UITokenizedInput.prototype.renderTokenClose = function renderTokenClose(index) {
        if (this.props.tokenCloseVisible) {
            var _cx;

            return _react2.default.cloneElement(this.props.tokenCloseComponent, {
                className: (0, _classnames2.default)((_cx = {
                    'ui-tokenfield-token-close': true
                }, _cx[this.props.tokenCloseComponent.props.className] = Boolean(this.props.tokenCloseComponent.props.className), _cx)),
                onClick: this.handleTokenCloseClick.bind(this, index)
            });
        }
    };

    UITokenizedInput.prototype.handleTokenKeyDown = function handleTokenKeyDown(index, event) {
        switch (event.which) {
            case 13: // enter
            case 32:
                // space
                this.selectToken(index);
                event.preventDefault();
                break;

            case 8:
                // backspace
                this.remove(index);
                this.focus();
                event.preventDefault();
                break;
        }
    };

    UITokenizedInput.prototype.renderTokens = function renderTokens() {
        var _this3 = this;

        return _react2.default.createElement(
            'div',
            { className: 'ui-tokenfield-tokens' },
            this.props.tokens.map(function (index) {
                return _react2.default.createElement(
                    'div',
                    {
                        ref: 'token_' + index,
                        key: index,
                        className: (0, _classnames2.default)({
                            'ui-tokenfield-token': true,
                            'ui-tokenfield-token-selected': _this3.props.tokensSelected.indexOf(index) !== -1
                        }),
                        onClick: _this3.selectToken.bind(_this3, index),
                        onKeyDown: _this3.handleTokenKeyDown.bind(_this3, index),
                        tabIndex: '0' },
                    _this3.props.entities[index].text,
                    _this3.renderTokenClose(index)
                );
            })
        );
    };

    UITokenizedInput.prototype.render = function render() {
        var _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UITokenizedInput.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-tokenfield-wrapper': true
                }, _cx2[this.props.className] = !!this.props.className, _cx2)),
                onKeyDown: this.handleKeyDown }),
            this.renderTokens(),
            _react2.default.createElement(_UITypeaheadInput2.default, _extends({}, (0, _extractChildProps2.default)(this.props, _UITypeaheadInput2.default.propTypes), {
                ref: 'typeahead',
                className: 'ui-tokenfield',
                clearPartialInputOnSelection: true,
                inputProps: _extends({}, this.props.inputProps, {
                    onClick: this.handleInputClick,
                    onFocus: this.handleInputFocus
                }),
                onEntitySelected: this.add }))
        );
    };

    return UITokenizedInput;
}(_react2.default.PureComponent);

UITokenizedInput.propTypes = _extends({}, _UITypeaheadInput2.default.propTypes, {
    handleAddToken: _react2.default.PropTypes.func,
    handleRemoveTokens: _react2.default.PropTypes.func,
    handleNewSelection: _react2.default.PropTypes.func,
    tokenCloseComponent: _react2.default.PropTypes.element,
    tokenCloseVisible: _react2.default.PropTypes.bool,
    tokens: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    tokensSelected: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number)
});
UITokenizedInput.internalKeys = Object.keys(UITokenizedInput.propTypes);
UITokenizedInput.defaultProps = _extends({}, _UITypeaheadInput2.default.defaultProps, {
    handleAddToken: _noop2.default,
    handleRemoveTokens: _noop2.default,
    handleNewSelection: _noop2.default,
    tokenCloseComponent: _react2.default.createElement(
        'div',
        null,
        'X'
    ),
    tokenCloseVisible: true,
    tokens: [],
    tokensSelected: []
});
exports.default = UITokenizedInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"19":19,"20":20,"21":21,"23":23,"28":28,"34":34}],18:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A wrapper that displays provided text on hover.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITooltip
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITooltip = function (_React$PureComponent) {
    _inherits(UITooltip, _React$PureComponent);

    function UITooltip() {
        _classCallCheck(this, UITooltip);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UITooltip.prototype.render = function render() {
        var _cx;

        var position = this.props.position;


        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UITooltip.internalKeys), {
                className: (0, _classnames2.default)((_cx = {
                    'ui-tooltip': true,
                    'ui-tooltip-position-above': position === UITooltip.position.ABOVE,
                    'ui-tooltip-position-below': position === UITooltip.position.BELOW,
                    'ui-tooltip-position-before': position === UITooltip.position.BEFORE,
                    'ui-tooltip-position-after': position === UITooltip.position.AFTER
                }, _cx[this.props.className] = !!this.props.className, _cx)),
                'data-tooltip': this.props.text,
                'aria-label': this.props['aria-label'] || this.props.text }),
            this.props.children
        );
    };

    return UITooltip;
}(_react2.default.PureComponent);

UITooltip.position = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BEFORE: 'BEFORE',
    AFTER: 'AFTER'
};
UITooltip.propTypes = {
    position: _react2.default.PropTypes.oneOf(Object.keys(UITooltip.position)),
    text: _react2.default.PropTypes.string
};
UITooltip.internalKeys = Object.keys(UITooltip.propTypes);
UITooltip.defaultProps = {
    position: UITooltip.position.ABOVE
};
exports.default = UITooltip;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"28":28,"34":34}],19:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require(32);

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _lodash = require(34);

var _lodash2 = _interopRequireDefault(_lodash);

var _UITextualInput = require(16);

var _UITextualInput2 = _interopRequireDefault(_UITextualInput);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(22);

var _isString2 = _interopRequireDefault(_isString);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require(26);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Intelligently recommend entities via customizable, fuzzy recognition.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITypeaheadInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITypeaheadInput = function (_React$PureComponent) {
    _inherits(UITypeaheadInput, _React$PureComponent);

    function UITypeaheadInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITypeaheadInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITypeaheadInput.prototype.componentWillMount = function componentWillMount() {
        if (this.props.inputProps.value || this.props.inputProps.defaultValue) {
            this.computeMatches();
        }
    };

    UITypeaheadInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.entities !== this.props.entities) {
            this.computeMatches(nextProps.entities);
        }

        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.updateInputState(nextProps.inputProps.value);
            this.computeMatches();
        }
    };

    UITypeaheadInput.prototype.componentDidMount = function componentDidMount() {
        if (this.state.selectedEntityIndex >= 0) {
            this.props.onEntityHighlighted(this.state.selectedEntityIndex);
        }
    };

    UITypeaheadInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.state.entityMatchIndexes.length && !prevState.entityMatchIndexes.length) {
            this.refs.matches.scrollTop = 0;
        } // fix an odd bug in FF where it initializes the element with an incorrect scrollTop

        if (this.state.selectedEntityIndex >= 0 && this.props.entities[this.state.selectedEntityIndex] !== prevProps.entities[prevState.selectedEntityIndex]) {
            this.props.onEntityHighlighted(this.state.selectedEntityIndex);
        }
    };

    UITypeaheadInput.prototype.handleMatchClick = function handleMatchClick(index) {
        this.setState(function (state) {
            return _extends({}, state, { selectedEntityIndex: index });
        }, this.setValueWithSelectedEntity);
    };

    UITypeaheadInput.prototype.selectMatch = function selectMatch(delta) {
        var _this2 = this;

        var matches = this.state.entityMatchIndexes;
        var totalMatches = matches.length;
        var nextIndex = matches.indexOf(this.state.selectedEntityIndex) + delta;

        if (totalMatches) {
            (function () {
                if (nextIndex < 0) {
                    nextIndex = totalMatches - 1; // reverse loop
                } else if (nextIndex >= totalMatches) {
                    nextIndex = 0; // loop
                }

                var matchIndex = matches[nextIndex];
                var matchesNode = _this2.refs.matches;
                var matchesNodeYEnd = matchesNode.scrollTop + matchesNode.clientHeight;
                var matchNode = _this2.refs['match_$' + matchIndex];
                var matchNodeYStart = matchNode.offsetTop;
                var matchNodeYEnd = matchNodeYStart + matchNode.clientHeight;

                // bring into view if necessary
                if (matchNodeYEnd >= matchesNodeYEnd) {
                    // below
                    matchesNode.scrollTop += matchNodeYEnd - matchesNodeYEnd;
                } else if (matchNodeYStart <= matchesNode.scrollTop) {
                    // above
                    matchesNode.scrollTop = matchNodeYStart;
                }

                _this2.setState(function (state) {
                    return _extends({}, state, { selectedEntityIndex: matchIndex });
                });
            })();
        }
    };

    UITypeaheadInput.prototype.cursorAtEndOfInput = function cursorAtEndOfInput() {
        var node = this.getInputNode();

        return node.selectionStart === node.selectionEnd && node.selectionEnd === this.getValue().length;
    };

    UITypeaheadInput.prototype.markFuzzyMatchSubstring = function markFuzzyMatchSubstring(input, entity) {
        var entityContent = entity.text;
        var frags = entityContent.split(new RegExp('(' + (0, _escapeStringRegexp2.default)(input) + ')', 'ig'));
        var normalizedUserText = input.toLowerCase();
        var threshold = frags.length;
        var i = -1;

        while (++i < threshold) {
            if (frags[i].toLowerCase() === normalizedUserText) {
                frags[i] = _react2.default.createElement(
                    'mark',
                    { key: i, className: 'ui-typeahead-match-highlight' },
                    frags[i]
                );
            }
        }

        return frags;
    };

    UITypeaheadInput.prototype.markStartsWithMatchSubstring = function markStartsWithMatchSubstring(input, entity) {
        var entityContent = entity.text;
        var seekValue = input.toLowerCase();
        var indexStart = entityContent.toLowerCase().indexOf(seekValue);
        var indexEnd = indexStart + seekValue.length;

        return [_react2.default.createElement(
            'span',
            { key: '0' },
            entityContent.slice(0, indexStart)
        ), _react2.default.createElement(
            'mark',
            { key: '1', className: 'ui-typeahead-match-highlight' },
            entityContent.slice(indexStart, indexEnd)
        ), _react2.default.createElement(
            'span',
            { key: '2' },
            entityContent.slice(indexEnd)
        )];
    };

    UITypeaheadInput.prototype.getMarkingFunction = function getMarkingFunction() {
        if ((0, _isString2.default)(this.props.algorithm)) {
            if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                return this.markStartsWithMatchSubstring;
            }

            return this.markFuzzyMatchSubstring;
        } else if ((0, _isFunction2.default)(this.props.algorithm.marker)) {
            return this.props.algorithm.marker;
        }

        if (this.warnedMarker === undefined) {
            this.warnedMarker = true;
            console.warn('UITypeaheadInput: no `props.algorithm.marker` was provided; falling back to the default marking algorithm (FUZZY).');
        }

        return this.markFuzzyMatchSubstring;
    };

    UITypeaheadInput.prototype.getFuzzyMatchIndexes = function getFuzzyMatchIndexes(userText, entities) {
        var normalized = userText.toLowerCase();

        return entities.reduce(function findIndexes(result, entity, index) {
            return entity.text.toLowerCase().indexOf(normalized) !== -1 ? result.push(index) && result : result;
        }, []);
    };

    UITypeaheadInput.prototype.getStartsWithMatchIndexes = function getStartsWithMatchIndexes(userText, entities) {
        var seekValue = userText.toLowerCase();

        return entities.reduce(function seekMatch(results, entity, index) {
            if (entity.text.toLowerCase().indexOf(seekValue) === 0) {
                results.push(index);
            }

            return results;
        }, []);
    };

    UITypeaheadInput.prototype.getMatchingFunction = function getMatchingFunction() {
        if ((0, _isString2.default)(this.props.algorithm)) {
            if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                return this.getStartsWithMatchIndexes;
            }

            return this.getFuzzyMatchIndexes;
        } else if ((0, _isFunction2.default)(this.props.algorithm.matcher)) {
            return this.props.algorithm.matcher;
        }

        if (this.warnedMatcher === undefined) {
            this.warnedMatcher = true;
            console.warn('UITypeaheadInput: no `props.algorithm.matcher` was provided; falling back to the default matching algorithm (FUZZY).');
        }

        return this.getFuzzyMatchIndexes;
    };

    UITypeaheadInput.prototype.computeMatches = function computeMatches(providedEntities) {
        var _this3 = this;

        this.setState(function (state, props) {
            var entities = providedEntities || props.entities;
            var currentValue = state.input;
            var matches = currentValue === '' ? [] : _this3.getMatchIndexes(currentValue, entities);

            return _extends({}, state, {
                selectedEntityIndex: matches.length ? matches[0] : -1,
                entityMatchIndexes: matches
            });
        });
    };

    UITypeaheadInput.prototype.renderNotification = function renderNotification() {
        return _react2.default.createElement(
            'div',
            {
                ref: 'aria',
                id: this.state.id,
                className: this.props.offscreenClass,
                'aria-live': 'polite' },
            this.getSelectedEntityText()
        );
    };

    UITypeaheadInput.prototype.renderHint = function renderHint() {
        if (this.props.hint) {
            var _cx;

            var userText = this.state.input;
            var raw = this.getSelectedEntityText();
            var processed = '';

            if (raw && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
                processed = raw.replace(new RegExp(userText, 'i'), userText);
            }

            return _react2.default.createElement(
                'div',
                _extends({}, this.props.hintProps, {
                    ref: 'hint',
                    className: (0, _classnames2.default)((_cx = {
                        'ui-textual-input': true,
                        'ui-textual-input-placeholder': true,
                        'ui-typeahead-hint': true
                    }, _cx[this.props.hintProps.className] = !!this.props.hintProps.className, _cx)),
                    tabIndex: '-1' }),
                processed
            );
        }
    };

    UITypeaheadInput.prototype.renderMatches = function renderMatches() {
        var _this4 = this;

        if (this.state.entityMatchIndexes.length) {
            var _cx2;

            var props = this.props.matchWrapperProps;

            return _react2.default.createElement(
                'div',
                _extends({}, props, {
                    ref: 'matches',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-typeahead-match-wrapper': true
                    }, _cx2[props.className] = !!props.className, _cx2)) }),
                this.state.entityMatchIndexes.map(function (index) {
                    var _cx3;

                    var entity = _this4.props.entities[index];
                    var className = entity.className;
                    var text = entity.text;

                    var rest = _objectWithoutProperties(entity, ['className', 'text']);

                    return _react2.default.createElement(
                        'div',
                        _extends({}, rest, {
                            ref: 'match_$' + index,
                            className: (0, _classnames2.default)((_cx3 = {
                                'ui-typeahead-match': true,
                                'ui-typeahead-match-selected': _this4.state.selectedEntityIndex === index
                            }, _cx3[className] = !!className, _cx3)),
                            key: text,
                            onClick: _this4.handleMatchClick.bind(_this4, index) }),
                        _this4.markMatchSubstring(_this4.state.input, entity)
                    );
                })
            );
        }
    };

    UITypeaheadInput.prototype.render = function render() {
        var _cx4, _cx5;

        var props = this.props;
        var state = this.state;


        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(props, UITypeaheadInput.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-typeahead-wrapper': true
                }, _cx4[props.className] = !!props.className, _cx4)),
                onKeyDown: this.handleKeyDown }),
            this.renderNotification(),
            this.renderHint(),
            _react2.default.createElement(_UITextualInput2.default, _extends({}, (0, _extractChildProps2.default)(props, _UITextualInput2.default.propTypes), {
                ref: 'input',
                'aria-controls': state.id,
                inputProps: _extends({}, props.inputProps, {
                    className: (0, _classnames2.default)((_cx5 = {
                        'ui-typeahead': true
                    }, _cx5[props.inputProps.className] = !!props.inputProps.className, _cx5)),
                    onChange: this.handleChange
                }) })),
            this.renderMatches()
        );
    };

    return UITypeaheadInput;
}(_react2.default.PureComponent);

UITypeaheadInput.mode = {
    'STARTS_WITH': 'STARTS_WITH',
    'FUZZY': 'FUZZY'
};
UITypeaheadInput.propTypes = _extends({}, _UITextualInput2.default.propTypes, {
    algorithm: _react.PropTypes.oneOfType([_react.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY]), _react.PropTypes.shape({
        marker: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY])]),
        matcher: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY])])
    })]),
    clearPartialInputOnSelection: _react.PropTypes.bool,
    entities: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        text: _react.PropTypes.string
    })),
    hint: _react.PropTypes.bool,
    hintProps: _react.PropTypes.object,
    matchWrapperProps: _react.PropTypes.object,
    offscreenClass: _react.PropTypes.string,
    onComplete: _react.PropTypes.func,
    onEntityHighlighted: _react.PropTypes.func,
    onEntitySelected: _react.PropTypes.func
});
UITypeaheadInput.internalKeys = Object.keys(UITypeaheadInput.propTypes);
UITypeaheadInput.defaultProps = _extends({}, _UITextualInput2.default.defaultProps, {
    algorithm: UITypeaheadInput.mode.FUZZY,
    clearPartialInputOnSelection: false,
    entities: [],
    hintProps: {},
    matchWrapperProps: {},
    offscreenClass: 'ui-offscreen',
    onComplete: _noop2.default,
    onEntityHighlighted: _noop2.default,
    onEntitySelected: _noop2.default
});

var _initialiseProps = function _initialiseProps() {
    var _this5 = this;

    this.state = {
        entityMatchIndexes: [],
        id: (0, _uuid2.default)(),
        isControlled: (0, _isString2.default)(this.props.inputProps.value),
        input: this.props.inputProps.value || this.props.inputProps.defaultValue || '',
        selectedEntityIndex: -1
    };

    this.updateInputState = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        return _this5.setState(function (state) {
            return _extends({}, state, { input: value });
        });
    };

    this.getSelectedEntityText = function () {
        var entity = _this5.props.entities[_this5.state.selectedEntityIndex];

        return entity ? entity.text : '';
    };

    this.resetMatches = function () {
        _this5.setState(function (state) {
            return _extends({}, state, {
                selectedEntityIndex: -1,
                entityMatchIndexes: []
            });
        });
    };

    this.getInputNode = function () {
        return _this5.refs.input.refs.field;
    };

    this.select = function () {
        var input = _this5.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = _this5.getValue().length;
    };

    this.focus = function () {
        return _this5.getInputNode().focus();
    };

    this.getValue = function () {
        return _this5.refs.input.getValue();
    };

    this.setValue = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        _this5.refs.input.setValue(value);

        _this5.updateInputState(value);
        _this5.resetMatches();
        _this5.focus();
    };

    this.setValueWithSelectedEntity = function () {
        _this5.props.onEntitySelected(_this5.state.selectedEntityIndex);

        if (_this5.props.clearPartialInputOnSelection) {
            _this5.setValue('');
        } else {
            _this5.setValue(_this5.getSelectedEntityText());
        }

        // needs to happen after the upcoming render that will be triggered by `setValue`
        window.setTimeout(_this5.resetMatches, 0);
    };

    this.markMatchSubstring = function () {
        return _this5.getMarkingFunction().apply(undefined, arguments);
    };

    this.getMatchIndexes = function () {
        return _this5.getMatchingFunction().apply(undefined, arguments);
    };

    this.handleChange = function (event) {
        if (_this5.state.isControlled === false) {
            _this5.updateInputState(event.target.value);
            _this5.computeMatches();
        }

        if ((0, _isFunction2.default)(_this5.props.inputProps.onChange)) {
            _this5.props.inputProps.onChange(event);
        }
    };

    this.handleKeyDown = function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                if (event.target.selectionStart > 1) {
                    event.stopPropagation();
                }

                break;

            case 'Tab':
            case 'ArrowRight':
                if (_this5.state.selectedEntityIndex !== -1 && _this5.cursorAtEndOfInput() && _this5.getInputNode() === event.target && !event.shiftKey) {
                    event.nativeEvent.preventDefault();
                    _this5.setValueWithSelectedEntity();
                }

                break;

            case 'ArrowUp':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this5.selectMatch(-1);
                _this5.focus();
                break;

            case 'ArrowDown':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this5.selectMatch(1);
                _this5.focus();
                break;

            case 'Escape':
                if (_this5.state.selectedEntityIndex !== -1 && _this5.getInputNode() === event.target) {
                    _this5.resetMatches();
                }

                break;

            case 'Enter':
                if (_this5.state.selectedEntityIndex !== -1 && _this5.getInputNode() === event.target) {
                    event.nativeEvent.preventDefault();
                    _this5.setValueWithSelectedEntity();
                } else {
                    _this5.props.onComplete(_this5.state.input, event);
                }

                break;
        }

        if ((0, _isFunction2.default)(_this5.props.onKeyDown)) {
            _this5.props.onKeyDown(event);
        }
    };
};

exports.default = UITypeaheadInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"16":16,"20":20,"21":21,"22":22,"23":23,"26":26,"28":28,"32":32,"34":34}],20:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = extractChildProps;
/**
 * Returns an object containing all props listed in the propTypes of a child component
 * e.g. used in UITypeaheadInput to identify which props are meant for UITextualInput
 * @module UIUtils/extractChildProps
 *
 * @param  {Object} parentProps     props of the parent component
 * @param  {Object} childPropTypes  propTypes of the child component
 * @return {Object}                 props to be spread applied to a child component
 */

function extractChildProps(parentProps, childPropTypes) {
    return Object.keys(childPropTypes).reduce(function (childProps, key) {
        if (parentProps[key]) {
            childProps[key] = parentProps[key];
        }

        return childProps;
    }, {});
}

},{}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (test) {
  return typeof test === 'function';
};

},{}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (test) {
  return typeof test === 'string';
};

},{}],23:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = noop;
/**
 * A dummy function with no side effects. Commonly used when mocking interfaces.
 * @module UIKit/utils/noop
 */
function noop() {}

},{}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.errors = undefined;
exports.default = notify;

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(22);

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Trigger native toasts in supporting browsers.
 * @class UINotificationService
 */

var errors = exports.errors = {
    DISABLED: 'UIUtils/notify: web notifications are currently disabled by user settings.',
    NOT_AVAILABLE: 'UIUtils/notify: web notifications are not supported on this platform.',
    CONFIG_TYPE: 'UIUtils/notify: passed a non-object as configuration.',
    CONFIG_MISSING: 'UIUtils/notify: no configuration was passed.',
    BODY_TYPE: 'UIUtils/notify: `body` must be a string.',
    BODY_MISSING: 'UIUtils/notify: `body` was omitted from the configuration object.',
    HEADER_TYPE: 'UIUtils/notify: `header` must be a string.',
    HEADER_MISSING: 'UIUtils/notify: `header` was omitted from the configuration object.',
    ICON_TYPE: 'UIUtils/notify: `icon` must be a URL string.',
    ONCLICK_TYPE: 'UIUtils/notify: `onClick` must be a function.'
};

var NotificationAPI = function detectSupport() {
    if (window.Notification) {
        return window.Notification;
    } else if (window.webkitNotifications) {
        return window.webkitNotifications;
    } else if (navigator.mozNotification) {
        return navigator.mozNotification;
    }

    return false;
}();

function requestPermission() {
    return new Promise(function (resolve, reject) {
        NotificationAPI.requestPermission(function requestReceiver(status) {
            if (status === 'granted' || status === 0) {
                resolve();
            }

            reject(errors.DISABLED);
        });
    });
}

function checkPermission() {
    return new Promise(function (resolve, reject) {
        if (!NotificationAPI) {
            return reject(errors.NOT_AVAILABLE);
        }

        if ('permission' in NotificationAPI) {
            switch (NotificationAPI.permission) {
                case 'granted':
                    return resolve();

                case 'denied':
                    return reject(errors.DISABLED);
            }

            requestPermission().then(resolve, reject);
        } else if ('checkPermission' in NotificationAPI) {
            switch (NotificationAPI.checkPermission()) {
                case 0:
                    return resolve();

                case 1:
                    requestPermission().then(resolve, reject);
                    break;

                default:
                    return reject(errors.DISABLED);
            }
        }
    });
}

function notify(config) {
    return new Promise(function (resolve, reject) {
        if (config === undefined) {
            return reject(errors.CONFIG_MISSING);
        } else if (Object.prototype.toString.call(config) !== '[object Object]') {
            return reject(errors.CONFIG_TYPE);
        } else if (config.body === undefined) {
            return reject(errors.BODY_MISSING);
        } else if ((0, _isString2.default)(config.body) === false) {
            return reject(errors.BODY_TYPE);
        } else if (config.header === undefined) {
            return reject(errors.HEADER_MISSING);
        } else if ((0, _isString2.default)(config.header) === false) {
            return reject(errors.HEADER_TYPE);
        } else if (config.icon !== undefined && (0, _isString2.default)(config.icon) === false) {
            return reject(errors.ICON_TYPE);
        } else if (config.onClick !== undefined && (0, _isFunction2.default)(config.onClick) === false) {
            return reject(errors.ONCLICK_TYPE);
        }

        checkPermission().then(function spawnWebNotification() {
            var notification = new NotificationAPI(config.header, {
                body: config.body,
                icon: config.icon
            });

            /* istanbul ignore next */
            if (config.onClick) {
                notification.addEventListener('click', config.onClick);
            }

            resolve(notification);
        }, function (error) {
            return reject(error);
        });
    });
}

},{"21":21,"22":22}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;

/**
 * Returns the appropriate vendor-prefixed property for use in programmatic transform style manipulation.
 * @module UIUtils/transformProperty
 *
 * @return {String} the property key (e.g. `WebkitTransform`, `msTransform`)
 */

exports.default = function detectTransformProperty() {
    var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'webkit-transform'];

    for (var i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
}();

},{}],26:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = uuid;
/**
 * Generates a unique ID. Based on {@link https://gist.github.com/jed/982883 this implementation}.
 * @return {string} a unique identifier
 *
 * @example
 * uuid(); // 1f2cd27f-0754-4344-9d20-436a201b2f80
 */
function uuid() {
  /* eslint-disable */
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (a) {
    return (a ^ Math.random() * 16 >> a / 4).toString(16);
  });
  /* eslint-enable */
}

},{}],27:[function(require,module,exports){
(function (global){
'use strict';

/**
 * Used to create an ES5-compatible standalone build, and so it's possible to `require('enigma-uikit')``
 * and directly use a component like: `require('enigma-uikit').UIButton`
 */

global.UIKit = {};
global.UIKit.UIUtils = {};

module.exports = {
    UIArrowKeyNavigation: global.UIKit.UIArrowKeyNavigation = require(1).default,
    UIButton: global.UIKit.UIButton = require(2).default,
    UICheckbox: global.UIKit.UICheckbox = require(3).default,
    UICheckboxGroup: global.UIKit.UICheckboxGroup = require(4).default,
    UIDialog: global.UIKit.UIDialog = require(5).default,
    UIFittedText: global.UIKit.UIFittedText = require(6).default,
    UIImage: global.UIKit.UIImage = require(7).default,
    UIModal: global.UIKit.UIModal = require(8).default,
    UIPagination: global.UIKit.UIPagination = require(9).default,
    UIPopover: global.UIKit.UIPopover = require(10).default,
    UIProgress: global.UIKit.UIProgress = require(11).default,
    UIProgressiveDisclosure: global.UIKit.UIProgressiveDisclosure = require(12).default,
    UIRadio: global.UIKit.UIRadio = require(13).default,
    UISegmentedControl: global.UIKit.UISegmentedControl = require(14).default,
    UITable: global.UIKit.UITable = require(15).default,
    UITokenizedInput: global.UIKit.UITokenizedInput = require(17).default,
    UITextualInput: global.UIKit.UITextualInput = require(16).default,
    UITooltip: global.UIKit.UITooltip = require(18).default,
    UITypeaheadInput: global.UIKit.UITypeaheadInput = require(19).default,
    UIUtils: {
        extractChildProps: global.UIKit.UIUtils.extractChildProps = require(20).default,
        notify: global.UIKit.UIUtils.notify = require(24).default,
        transformProperty: global.UIKit.UIUtils.transformProperty = require(25).default,
        uuid: global.UIKit.UIUtils.uuid = require(26).default
    }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"2":2,"20":20,"24":24,"25":25,"26":26,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}],28:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Y_SCROLL_TRACK = exports.X_SCROLL_TRACK = exports.ROW_LOADING = exports.ROW_ACTIVE = exports.ROW_ODD = exports.ROW_EVEN = exports.ROW = exports.CELL_INNER = exports.CELL_ODD = exports.CELL_EVEN = exports.CELL = exports.HEADER_CELL_HANDLE = exports.HEADER_CELL = exports.INITIALIZED = undefined;

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _findWhere = require(30);

var _findWhere2 = _interopRequireDefault(_findWhere);

var _transformProperty = require(31);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return Array.from(arr);
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
} /**
   * A high-performance, infinite table view.
   */

var INITIALIZED = exports.INITIALIZED = 'ui-table-initialized';
var HEADER_CELL = exports.HEADER_CELL = 'ui-table-header-cell';
var HEADER_CELL_HANDLE = exports.HEADER_CELL_HANDLE = 'ui-table-header-cell-resize-handle';
var CELL = exports.CELL = 'ui-table-cell';
var CELL_EVEN = exports.CELL_EVEN = 'ui-table-cell-even';
var CELL_ODD = exports.CELL_ODD = 'ui-table-cell-odd';
var CELL_INNER = exports.CELL_INNER = 'ui-table-cell-inner';
var ROW = exports.ROW = 'ui-table-row';
var ROW_EVEN = exports.ROW_EVEN = 'ui-table-row-even';
var ROW_ODD = exports.ROW_ODD = 'ui-table-row-odd';
var ROW_ACTIVE = exports.ROW_ACTIVE = 'ui-table-row-active';
var ROW_LOADING = exports.ROW_LOADING = 'ui-table-row-loading';
var X_SCROLL_TRACK = exports.X_SCROLL_TRACK = 'ui-table-x-scroll-track';
var Y_SCROLL_TRACK = exports.Y_SCROLL_TRACK = 'ui-table-y-scroll-track';

var isObject = function isObject(test) {
    return Object.prototype.toString.call(test) === '[object Object]';
};
var noop = function noop() {};

/*

FOR FUTURE EYES

Scroll performance is a tricky beast -- moreso when trying to maintain 50+ FPS and pumping a lot of data to the DOM. There are a lot of choices in this component that may seem odd at first blush, but let it be known that we tried to do it the React Way™ and it was not performant enough.

The combination that was settled upon is a React shell with native DOM guts. This combination yields the best performance, while still being perfectly interoperable with the rest of UIKit and React use cases.

__Important Note__

Any time you create a document fragment, make sure you release it after by setting its variable to `null`. If you don't, it'll create a memory leak. Also, make sure all generated DOM is removed on componentWillUnmount.


ORDER OF OPERATIONS

1. render one row of cells
2. capture table & cell sizing metrics
3. render column heads and the rest of the cells

If the component updates due to new props, just blow away everything and start over. It's cheaper than trying to diff.

*/

function applyDelta(delta, num) {
    if (delta < 0) {
        return num < 0 ? num - delta : num + delta;
    }

    return num - delta;
}

function getKeyFromKeyCode(code) {
    switch (code) {
        case 192:
            return 'Escape';

        case 40:
            return 'ArrowDown';

        case 38:
            return 'ArrowUp';

        case 13:
            return 'Enter';
    }

    return null;
}

function translate3d() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
} // z is never used

/**
 * Generates a DOM cell.
 *
 * @param  {string}  content
 * @param  {string}  mapping
 * @param  {number}  width
 * @param  {number}  index
 *
 * @return {HTMLElement}
 */
function createDOMCell(content, mapping, width, index) {
    var cell = document.createElement('div');

    cell.className = CELL;
    cell.classList.add(index % 2 === 0 ? CELL_EVEN : CELL_ODD);

    cell.setAttribute('data-column', mapping);

    if (width) {
        cell.style.width = width + 'px';
    }

    var text = document.createElement('div');
    text.className = CELL_INNER;

    var text_node = document.createTextNode(content);
    text.appendChild(text_node);

    cell.appendChild(text);

    return cell;
}

/**
 * Converts a simple object DOM spec into equivalent DOM node(s).
 *
 * @param  {string}       options.tag
 * @param  {object}       options.attributes   - HTML attributes that must be set via `setAttribute()`, e.g. `data-*`
 * @param  {*}            options.children     - should be a string, DOM spec, or array of DOM specs;
 *                                               all other input will be stringified
 * @param  {object}       options.properties   - properties to be explicitly set, e.g. `className`
 *
 * @return {HTMLElement}
 */
function specToDOM(_ref) {
    var _ref$tag = _ref.tag;
    var tag = _ref$tag === undefined ? 'div' : _ref$tag;
    var _ref$attributes = _ref.attributes;
    var attributes = _ref$attributes === undefined ? {} : _ref$attributes;
    var children = _ref.children;

    var properties = _objectWithoutProperties(_ref, ['tag', 'attributes', 'children']);

    var node = document.createElement(tag);

    Object.keys(attributes).forEach(function (key) {
        return node.setAttribute(key, attributes[key]);
    });
    Object.keys(properties).forEach(function (key) {
        return node[key] = properties[key];
    });

    if (children) {
        if (Array.isArray(children)) {
            children.forEach(function (spec) {
                return node.appendChild(specToDOM(spec));
            });
        } else if (isObject(children)) {
            node.appendChild(specToDOM(children));
        } else {
            node.appendChild(document.createTextNode(String(children)));
        }
    }

    return node;
}

/**
 * Generates a header cell with resize handle and optional children as defined by the object DOM DSL.
 *
 * @param  {object}  column
 * @param  {*}       column.children    - should be a string, DOM spec, or array of DOM specs;
 *                                        all other input will be stringified
 * @param  {string}  column.mapping
 * @param  {boolean} column.resizable
 * @param  {string}  column.title
 * @param  {number}  width
 * @param  {number}  index
 *
 * @return {HTMLElement}
 */
function createDOMHeaderCell(column, width, index) {
    var cell = createDOMCell(column.title, column.mapping, width, index);
    cell.classList.add(HEADER_CELL);

    if (column.children) {
        if (Array.isArray(column.children)) {
            column.children.forEach(function (spec) {
                return cell.appendChild(specToDOM(spec));
            });
        } else if (isObject(column.children)) {
            cell.appendChild(specToDOM(column.children));
        } else {
            cell.appendChild(document.createTextNode(String(column.children)));
        }
    }

    if (column.resizable) {
        var handle = document.createElement('div');
        handle.className = HEADER_CELL_HANDLE;

        cell.appendChild(handle);
    }

    return cell;
}

function createHeaderCell(metadata, index) {
    var node = createDOMHeaderCell(metadata, metadata.width, index);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_metadata': metadata,
        '_title': metadata.title,
        get title() {
            return this._title;
        },
        set title(val) {
            if (val !== this._title) {
                this._title = val;

                this.node.setAttribute('title', this._title);
                this._textNode.nodeValue = this._title;
            }
        },
        '_width': metadata.width,
        get width() {
            return this._width;
        },
        set width(val) {
            if (val !== this._width) {
                this._width = val;
                this.node.style.width = this._width + 'px';
            }
        },
        mapping: metadata.mapping,
        node: node
    };
}

function createCell(content, mapping, width, index) {
    var node = createDOMCell(content, mapping, width, index);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_content': content,
        get content() {
            return this._content;
        },
        getTextToBeRendered: function getTextToBeRendered() {
            return this.content || ''; // do not render null/undefined
        },
        set content(val) {
            if (val !== this._content) {
                this._content = val;
                this._textNode.nodeValue = this.getTextToBeRendered();
            }
        },
        '_width': width,
        get width() {
            return this._width;
        },
        set width(val) {
            if (val !== this._width) {
                this._width = val;
                this.node.style.width = this._width + 'px';
            }
        },
        trueWidth: function trueWidth() {
            var style = this.node.getAttribute('style');
            var childClasses = this.node.children[0].className;

            this.node.setAttribute('style', '');

            // take off the inner class which is what causes the sizing constraint
            this.node.children[0].className = '';

            /* Capture the new adjusted size, have to use the hard way because .clientWidth returns an integer value, rather than the _actual_ width. SMH. */
            var newWidth = this.node.getBoundingClientRect().width;

            // Put everything back
            this.node.setAttribute('style', style);
            this.node.children[0].className = childClasses;

            return newWidth;
        },
        node: node
    };
}

function createDOMRow(setIndex, y) {
    var row = document.createElement('div');
    row.className = ROW;
    row.style[_transformProperty2.default] = translate3d(0, y);

    return row;
}

function createRow(metadata, columns) {
    /* IMPORTANT NOTE: metadata.data might be a promise. Plan accordingly. */

    var row = createDOMRow(metadata.setIndex, metadata.y);
    var cells = [];

    var fragment = document.createDocumentFragment();

    columns.forEach(function (column, index) {
        cells.push(createCell('', column.mapping, column.width, index));
        fragment.appendChild(cells[index].node);
    });

    row.appendChild(fragment);
    fragment = null;

    var rowObj = {
        node: row,
        cells: cells,
        '_iterator': null,
        '_active': false,
        get active() {
            return this._active;
        },
        set active(val) {
            if (val !== this._active) {
                this._active = val;

                if (val && this.node.classList.contains(ROW_ACTIVE) === false) {
                    this.node.classList.add(ROW_ACTIVE);
                } else if (!val && this.node.classList.contains(ROW_ACTIVE) === true) {
                    this.node.classList.remove(ROW_ACTIVE);
                }
            }
        },
        '_setIndex': null,
        get setIndex() {
            return this._setIndex;
        },
        set setIndex(val) {
            if (val !== this._setIndex) {
                if (val % 2 === 0) {
                    this.node.classList.add(ROW_EVEN);
                    this.node.classList.remove(ROW_ODD);
                } else {
                    this.node.classList.add(ROW_ODD);
                    this.node.classList.remove(ROW_EVEN);
                }

                this.node.setAttribute('data-index', val);

                this._setIndex = val;
            }
        },
        '_waitingForResolution': false,
        get waitingForResolution() {
            return this._waitingForResolution;
        },
        set waitingForResolution(val) {
            if (val !== this._waitingForResolution) {
                this._waitingForResolution = val;

                if (val && this.node.classList.contains(ROW_LOADING) === false) {
                    this.node.classList.add(ROW_LOADING);
                } else if (!val && this.node.classList.contains(ROW_LOADING) === true) {
                    this.node.classList.remove(ROW_LOADING);
                }
            }
        },
        '_data': null,
        get data() {
            return this._data;
        },
        set data(val) {
            if (val !== this._data) {
                this._data = val;

                if (this._data === null || this._data instanceof Promise) {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = '';
                    }

                    if (this._data instanceof Promise) {
                        this._data.then(function cautiouslySetRowData(promise, resolvedVal) {
                            if (this._data === promise) {
                                this.data = resolvedVal;
                            }
                        }.bind(this, this._data));
                    }

                    this.waitingForResolution = true;

                    return;
                }

                if (this._data) {
                    if (Array.isArray(this._data)) {
                        for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                            this.cells[this._iterator].content = this._data[this._iterator];
                        }
                    } else {
                        for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                            this.cells[this._iterator].content = this._data[columns[this._iterator].mapping];
                        }
                    }

                    this.waitingForResolution = false;

                    return;
                }

                for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                    this.cells[this._iterator].content = '';
                }

                this.waitingForResolution = false;
            }
        },
        '_y': metadata.y,
        get y() {
            return this._y;
        },
        set y(val) {
            if (val !== this._y) {
                this._y = val;
                this.node.style[_transformProperty2.default] = translate3d(0, this._y);
            }
        }
    };

    // Setting it separately to have the classes added automatically
    rowObj.setIndex = metadata.setIndex;
    rowObj.active = metadata.active;

    // Setting it separately so the Promise handling can take place if needed...
    rowObj.data = metadata.data;

    return rowObj;
}

function validateColumnShape(column) {
    return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && (column.width === undefined || typeof column.width === 'number');
}

function validateConfiguration(c) {
    if (!(c.wrapper instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `wrapper` element.');
    }

    if (!(c.header instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `header` element.');
    }

    if (!(c.body instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `body` element.');
    }

    if (!(c['x-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-track` element.');
    }

    if (!(c['y-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-track` element.');
    }

    if (!(c['x-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-handle` element.');
    }

    if (!(c['y-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-handle` element.');
    }

    if (!(c.aria instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `aria` element.');
    }

    if (Array.isArray(c.columns) === false || c.columns.length === 0 || c.columns.every(validateColumnShape) === false) {
        throw Error('Table was not passed valid `columns`. It should be an array with at least one object conforming to: {\n            mapping: string,\n            resizable: bool,\n            title: string,\n            width: number (optional),\n        }');
    }

    if (typeof c.throttleInterval !== 'number') {
        throw Error('Table was not passed a valid `throttleInterval`; it should be a Number.');
    }

    if (typeof c.totalRows !== 'number') {
        throw Error('Table was not passed a valid `totalRows`; it should be a Number.');
    }

    if (typeof c.getRow !== 'function') {
        throw Error('Table was not passed a valid `getRow`; it should be a function.');
    }

    if (c.activeRowChangedFunc !== undefined && typeof c.activeRowChangedFunc !== 'function') {
        throw Error('Table was not passed a valid `activeRowChangedFunc`; it should be a function.');
    }

    if (c.headerColumnClickFunc !== undefined && typeof c.headerColumnClickFunc !== 'function') {
        throw Error('Table was not passed a valid `headerColumnClickFunc`; it should be a function.');
    }

    if (c.rowClickFunc !== undefined && typeof c.rowClickFunc !== 'function') {
        throw Error('Table was not passed a valid `rowClickFunc`; it should be a function.');
    }

    if (c.cellClickFunc !== undefined && typeof c.cellClickFunc !== 'function') {
        throw Error('Table was not passed a valid `cellClickFunc`; it should be a function.');
    }

    if (c.columnResizeFunc !== undefined && typeof c.columnResizeFunc !== 'function') {
        throw Error('Table was not passed a valid `columnResizeFunc`; it should be a function.');
    }

    if (typeof c.allowScrollPropagation !== 'boolean') {
        throw Error('Table was not passed a valid `allowScrollPropagation`; it should be a boolean.');
    }

    if (typeof c.fitColumnsToTable !== 'boolean') {
        throw Error('Table was not passed a valid `fitColumnsToTable`; it should be a boolean.');
    }

    if (typeof c.preserveScrollState !== 'boolean') {
        throw Error('Table was not passed a valid `preserveScrollState`; it should be a boolean.');
    }
}

var Table = function () {
    _createClass(Table, [{
        key: '_processConfiguration',
        value: function _processConfiguration(_ref2) {
            var _ref2$allowScrollProp = _ref2.allowScrollPropagation;
            var allowScrollPropagation = _ref2$allowScrollProp === undefined ? false : _ref2$allowScrollProp;
            var _ref2$fitColumnsToTab = _ref2.fitColumnsToTable;
            var fitColumnsToTable = _ref2$fitColumnsToTab === undefined ? false : _ref2$fitColumnsToTab;
            var _ref2$preserveScrollS = _ref2.preserveScrollState;
            var preserveScrollState = _ref2$preserveScrollS === undefined ? true : _ref2$preserveScrollS;
            var _ref2$throttleInterva = _ref2.throttleInterval;
            var throttleInterval = _ref2$throttleInterva === undefined ? 300 : _ref2$throttleInterva;
            var _ref2$totalRows = _ref2.totalRows;
            var totalRows = _ref2$totalRows === undefined ? 0 : _ref2$totalRows;

            var others = _objectWithoutProperties(_ref2, ['allowScrollPropagation', 'fitColumnsToTable', 'preserveScrollState', 'throttleInterval', 'totalRows']);

            validateConfiguration(this.c = _extends({
                allowScrollPropagation: allowScrollPropagation,
                fitColumnsToTable: fitColumnsToTable,
                preserveScrollState: preserveScrollState,
                throttleInterval: throttleInterval,
                totalRows: totalRows
            }, others));
        }
    }]);

    function Table(config) {
        var _this = this;

        _classCallCheck(this, Table);

        this._handleWindowResize = function () {
            if (_this.c.wrapper.clientHeight !== _this.container_h) {
                /* more rows may be needed to display the data, so we need to rebuild */
                return _this.regenerate();
            } else if (_this.c.wrapper.clientWidth !== _this.container_w) {
                var old_width = _this.container_w;

                _this._calculateContainerDimensions();
                _this._calculateColumnWidths();
                _this._calculateXBound();
                _this._initializeScrollBars();

                _this.x_scroll_handle_position = _this.x / _this.x_table_pixel_ratio * -1;

                if (_this.x_scroll_handle_position + _this.x_scroll_handle_size > _this.x_scroll_track_w) {
                    _this.x_scroll_handle_position = _this.x_scroll_track_w - _this.x_scroll_handle_size;
                }

                _this._translateXScrollHandle(_this.x_scroll_handle_position);

                // getting larger and we're fully scrolled to the right
                if (old_width < _this.container_w && _this.x_scroll_handle_position + _this.x_scroll_handle_size === _this.x_scroll_track_w) {
                    _this.x += _this.container_w - old_width;

                    _this._translateHeader(_this.x);
                    _this._translateBody(_this.x, _this.last_body_y);
                }
            }
        };

        this._handleMoveIntent = function (event) {
            if (_this.c.allowScrollPropagation === false) {
                event.preventDefault();
            }

            if (event.deltaX === 0 && event.deltaY === 0) {
                return;
            }
            if (_this.y_scroll_locked && event.deltaY === 0) {
                return;
            }
            if (_this.x_scroll_locked && event.deltaX === 0) {
                return;
            }

            _this.delta_x = event.deltaX;

            // deltaMode 0 === pixels, 1 === lines
            _this.delta_y = event.deltaMode === 1 ? parseInt(event.deltaY, 10) * _this.cell_h : event.deltaY;

            /* lock the translation axis if the user is manipulating the synthetic scrollbars */
            _this.next_x = _this.y_scroll_locked ? _this.x : _this.x - _this.delta_x;
            _this.next_y = _this.x_scroll_locked ? _this.y : _this.y - _this.delta_y;

            if (_this.next_x > 0) {
                _this.next_x = 0;
            } else if (_this.next_x < _this.x_max) {
                _this.next_x = _this.x_max;
            }

            if (_this.n_rows_visible >= _this.c.totalRows) {
                /* negate the vertical movement, not enough rows to fill the body */
                _this.next_y = _this.y;
            } else if (_this.next_y < _this.y) {
                _this._scrollDown();
            } else if (_this.next_y > _this.y) {
                _this._scrollUp();
            }

            if (_this.reset_timer) {
                window.clearTimeout(_this.reset_timer);
            }

            /* reset row & wrapper Y values toward 0 to prevent overflowing */
            _this.reset_timer = window.setTimeout(function resetYAxis(instance) {
                instance.reset_timer = null;

                instance.reset_delta = instance.y_min;

                /* shift all the positioning variables */
                instance.y = applyDelta(instance.reset_delta, instance.y);
                instance.y_min = applyDelta(instance.reset_delta, instance.y_min);
                instance.y_max = applyDelta(instance.reset_delta, instance.y_max);

                /* shift all the rows */
                instance.rows_ordered_by_y.forEach(function (position, index) {
                    instance.rows[position].y = index * instance.cell_h;
                });

                /* shift the wrapper */
                instance._translateBody(instance.x, instance.y);
            }, 100, _this);

            _this.top_visible_row_index = _this._calculateVisibleTopRowIndex();

            /* queue up translations and the browser will execute them as able, need to pass in the values that will change due to more _handleMoveIntent invocations before this rAF eventually executes. */
            window.requestAnimationFrame(function rAF(nextX, currX, nextY, visibleTopRowIndex) {
                if (nextX === 0) {
                    this.x_scroll_handle_position = 0;
                } else {
                    this.x_scroll_handle_position += (nextX - currX) / this.x_table_pixel_ratio * -1;

                    if (this.x_scroll_handle_position + this.x_scroll_handle_size > this.x_scroll_track_w) {
                        this.x_scroll_handle_position = this.x_scroll_track_w - this.x_scroll_handle_size;
                    }
                }

                this.y_scroll_handle_position = visibleTopRowIndex * this.y_scrollbar_pixel_ratio;

                if (this.y_scroll_handle_position + this.y_scroll_handle_size > this.y_scroll_track_h) {
                    this.y_scroll_handle_position = this.y_scroll_track_h - this.y_scroll_handle_size;
                }

                // Do all transforms grouped together
                this._translateAll(nextX, nextY);
            }.bind(_this, _this.next_x, _this.x, _this.next_y, _this.top_visible_row_index));

            _this.x = _this.next_x;
            _this.y = _this.next_y;
        };

        this._handleTouchMove = function (event) {
            event.preventDefault();

            /* we handle touchmove by detecting the delta of pageX/Y and forwarding
            it to _handleMoveIntent() */

            _this.touch = event.touches.item(0);

            _this.evt.deltaX = _this.last_touch_pageX - _this.touch.pageX;
            _this.evt.deltaY = _this.last_touch_pageY - _this.touch.pageY;

            _this.last_touch_pageX = _this.touch.pageX;
            _this.last_touch_pageY = _this.touch.pageY;

            _this._handleMoveIntent(_this.evt);
        };

        this._handleTouchStart = function (event) {
            _this.touch = event.touches.item(0);
            _this.last_touch_pageX = _this.touch.pageX;
            _this.last_touch_pageY = _this.touch.pageY;
        };

        this._handleAdvanceToXScrollTrackLocation = function (event) {
            if (_this.x_scroll_locked) {
                return;
            }
            if (event.target.className !== X_SCROLL_TRACK) {
                return;
            }

            _this.evt.deltaX = Math.floor(applyDelta(_this.last_x_scroll_handle_x, event.pageX - _this.distance_from_left) * _this.x_table_pixel_ratio);

            _this.evt.deltaY = 0;

            _this._handleMoveIntent(_this.evt);

            _this.last_pageX = event.pageX;
        };

        this._handleAdvanceToYScrollTrackLocation = function (event) {
            if (_this.y_scroll_locked) {
                return;
            }
            if (event.target.className !== Y_SCROLL_TRACK) {
                return;
            }

            _this.evt.deltaX = 0;
            _this.evt.deltaY = Math.floor(applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

            _this._handleMoveIntent(_this.evt);
        };

        this._handleXScrollHandleDragStart = function (event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            _this.last_pageX = event.pageX;
            _this.x_scroll_locked = true;
            _this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', _this._handleDragEnd, true);
        };

        this._handleYScrollHandleDragStart = function (event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            /* adjusts for the pixel distance between where the handle is clicked and the top edge of it; the handle is positioned according to its top edge */
            _this.y_scroll_offset = event.offsetY;

            _this.y_scroll_locked = true;
            _this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', _this._handleDragEnd, true);
        };

        this._handleDragMove = function (event) {
            if (!_this.left_button_pressed) {
                return;
            }

            if (_this.y_scroll_locked) {
                if (_this.drag_timer) {
                    window.clearTimeout(_this.drag_timer);
                }

                /* x-axis doesn't need throttle protection since it doesn't cause a row fetch */
                _this.drag_timer = window.setTimeout(function () {
                    _this.drag_timer = null;

                    /* Now fetch, once drag has ceased for long enough. */
                    _this.rows.forEach(function (row) {
                        if (row.data === null) {
                            row.data = _this.c.getRow(row.setIndex);
                        }
                    });
                }, _this.c.throttleInterval);

                _this.evt.deltaX = 0;
                _this.evt.deltaY = Math.floor(applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top - _this.y_scroll_offset) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

                _this._handleMoveIntent(_this.evt);
            } else if (_this.x_scroll_locked) {
                _this.evt.deltaX = (event.pageX - _this.last_pageX) * _this.x_table_pixel_ratio;
                _this.evt.deltaY = 0;

                _this._handleMoveIntent(_this.evt);

                _this.last_pageX = event.pageX;
            } else if (_this.column_is_resizing) {
                _this._handleColumnResize(event.pageX - _this.last_column_x);

                _this.last_column_x = event.pageX;
            }
        };

        this._handleDragEnd = function (event) {
            window.removeEventListener('mouseup', _this._handleDragEnd, true);

            _this.left_button_pressed = false;

            /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
            window.setTimeout(function () {
                return _this._unlockDragToScroll();
            }, 0);
        };

        this._preventClickWhileDragging = function (event) {
            return event.stopImmediatePropagation();
        };

        this._handleColumnDragStart = function (event) {
            if (event.button === 0 && event.target.className === HEADER_CELL_HANDLE) {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                _this.left_button_pressed = true;

                _this.last_column_x = event.pageX;

                _this.column_is_resizing = (0, _findWhere2.default)(_this.columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

                window.addEventListener('click', _this._preventClickWhileDragging, true);

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', _this._handleDragEnd, true);
            }
        };

        this._handleColumnAutoExpand = function (event) {
            if (event.button === 0 && event.target.className === HEADER_CELL_HANDLE) {
                (function () {
                    var mapping = event.target.parentNode.getAttribute('data-column');
                    var column = (0, _findWhere2.default)(_this.columns, 'mapping', mapping);
                    var columnIndex = _this.columns.indexOf(column);

                    var width = column.width;
                    var cellWidth = void 0;

                    _this.rows.forEach(function (row) {
                        if (!(row.data instanceof Promise) && row.data !== null) {
                            cellWidth = row.cells[columnIndex].trueWidth();
                            width = width < cellWidth ? cellWidth : width;
                        }
                    }); /* find the rendered row with the longest content entry */

                    _this._applyNewColumnWidth(columnIndex, width);
                })();
            }
        };

        this._handleKeyDown = function (event) {
            var key = event.key || getKeyFromKeyCode(event.keyCode);

            switch (key) {
                case 'Escape':
                    _this.resetActiveRowIndex();
                    break;

                case 'ArrowDown':
                    if (_this.active_row !== -1 // already keying through the table
                    || _this.active_row === -1 && _this.row_start_index === 0 // at the beginning
                    ) {
                            _this._changeActiveRow(1);
                        } else {
                        // start the active row on the topmost row in the current viewport
                        _this._changeActiveRow(_this.row_start_index + _this.n_padding_rows + 1);
                    }

                    event.preventDefault();
                    break;

                case 'ArrowUp':
                    _this._changeActiveRow(-1);
                    event.preventDefault();
                    break;

                case 'Enter':
                    if (_this.active_row !== -1) {
                        (function () {
                            var row = (0, _findWhere2.default)(_this.rows, 'setIndex', _this.active_row).data;

                            _this._setAriaText(_this.columns.map(function (column) {
                                return column.title + ': ' + row[column.mapping];
                            }).join('\n'));
                        })();
                    }

                    event.preventDefault();
                    break;

                case 'c':
                    if ((event.metaKey || event.ctrlKey) && _this.active_row >= 0 && _this.copy_node) {
                        var active_row = (0, _findWhere2.default)(_this.rows, 'setIndex', _this.active_row);

                        _this.copy_node.value = _this.columns.map(function (column) {
                            return '"' + column.title.replace('"', '\\"') + '"';
                        }).join(',') + '\n' + active_row.cells.map(function (cell) {
                            return '"' + cell.node.textContent.replace('"', '\\"') + '"';
                        }).join(',') + '\n';

                        _this.copy_node.select();

                        document.execCommand('copy');
                    }

                    break;
            }
        };

        this._handleClick = function (event) {
            var map = _this._discoverCellAndRowNodes(event.target);

            if (map.row) {
                var row = (0, _findWhere2.default)(_this.rows, 'node', map.row);

                _this.setActiveRowIndex(row.setIndex);

                if (map.cell && _this.c.cellClickFunc) {
                    _this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
                }

                if (_this.c.rowClickFunc) {
                    _this.c.rowClickFunc(event, row.setIndex);
                }
            }
        };

        this._handleHeaderClick = function (event) {
            if (_this.c.headerColumnClickFunc) {
                var node = event.target;
                var mapping = void 0;

                while (!mapping && node) {
                    if (!node.hasAttribute('data-column')) {
                        node = node.parentElement;
                        continue;
                    }

                    mapping = node.getAttribute('data-column');
                }

                if (mapping) {
                    _this.c.headerColumnClickFunc(event, mapping);
                }
            }
        };

        this._processConfiguration(config);

        this.body = this.c.body;
        this.body_style = this.body.style;
        this.header = this.c.header;
        this.header_style = this.header.style;

        this.x_scroll_handle_style = this.c['x-scroll-handle'].style;
        this.y_scroll_handle_style = this.c['y-scroll-handle'].style;

        this._resetInternals();
        this.resetActiveRowIndex();

        /* used in scroll state preservation calculations */
        this.__x = this.__y = this.__row_start_index = null;

        this.regenerate();

        try {
            document.execCommand('copy');

            this.copy_node = document.createElement('textarea');
            this.copy_node.style.position = 'absolute';
            this.copy_node.style.clip = 'rect(1px, 1px, 1px, 1px)';
            this.copy_node.tabIndex = '-1';
            this.copy_node.style.opacity = 0;

            this.c.wrapper.appendChild(this.copy_node);
        } catch (e) {
            console.warn('Copying rows is not supported by this browser.');
        }

        window.addEventListener('resize', this._handleWindowResize);
        window.addEventListener('mousemove', this._handleDragMove);

        this.c.wrapper.addEventListener('wheel', this._handleMoveIntent);
        this.c.wrapper.addEventListener('touchstart', this._handleTouchStart);
        this.c.wrapper.addEventListener('touchmove', this._handleTouchMove);

        this.c.wrapper.addEventListener('keydown', this._handleKeyDown);

        this.header.addEventListener('mousedown', this._handleColumnDragStart);
        this.header.addEventListener('click', this._handleHeaderClick);
        this.header.addEventListener('dblclick', this._handleColumnAutoExpand);

        this.body.addEventListener('click', this._handleClick);

        this.c['x-scroll-handle'].addEventListener('mousedown', this._handleXScrollHandleDragStart);
        this.c['y-scroll-handle'].addEventListener('mousedown', this._handleYScrollHandleDragStart);

        this.c['x-scroll-track'].addEventListener('click', this._handleAdvanceToXScrollTrackLocation);
        this.c['y-scroll-track'].addEventListener('click', this._handleAdvanceToYScrollTrackLocation);
    }

    _createClass(Table, [{
        key: '_resetInternals',
        value: function _resetInternals() {
            this.columns = [];
            this.rows = [];
            this.rows_ordered_by_y = [];
            this.rows_ordered_by_y_length = 0;
            this.n_padding_rows = 3;

            this.x = this.y = 0;
            this.next_x = this.next_y = 0;

            if (this.c['y-scroll-track']) {
                this.c['y-scroll-track'].style.display = '';
            }

            this.distance_from_top = this.c['y-scroll-track'] ? this.c['y-scroll-track'].getBoundingClientRect().top + window.pageYOffset : null;

            if (this.c['x-scroll-track']) {
                this.c['x-scroll-track'].style.display = '';
            }

            this.distance_from_left = this.c['x-scroll-track'] ? this.c['x-scroll-track'].getBoundingClientRect().left + window.pageXOffset : null;

            this.x_scroll_handle_position = this.y_scroll_handle_position = 0;

            this.top_visible_row_index = 0;

            // temporary variables in various calculations
            this.i = null;
            this.n_rows_to_shift = null;
            this.ordered_y_array_index = null;
            this.ptr = null;
            this.shift_delta = null;
            this.target_index = null;

            // translation caches
            this.last_header_x = null;
            this.last_body_x = null;
            this.last_body_y = null;
            this.last_x_scroll_handle_x = null;
            this.last_y_scroll_handle_y = null;

            this.drag_timer = null;

            this.evt = { preventDefault: noop };

            this.touch = null;
            this.last_touch_pageX = this.last_touch_pageY = 0;

            this.x_scroll_track_w = this.x_scroll_track_h = this.y_scroll_track_h = null;
            this.x_scroll_handle_size = this.y_scroll_handle_size = null;

            // reset!
            this._translateAll();
        }
    }, {
        key: '_emptyHeader',
        value: function _emptyHeader() {
            this.columns.length = 0;

            while (this.header.firstChild) {
                this.header.removeChild(this.header.firstChild);
            }
        }
    }, {
        key: '_buildColumns',
        value: function _buildColumns() {
            var _this2 = this;

            this._emptyHeader();
            this.c.columns.forEach(function (column, index) {
                return _this2.columns.push(createHeaderCell(column, index));
            });
        }
    }, {
        key: '_computeMinMaxHeaderCellDimensions',
        value: function _computeMinMaxHeaderCellDimensions() {
            this.columns.forEach(function (column) {
                var cs = window.getComputedStyle(column.node);
                var max = cs['max-width'];
                var min = cs['min-width'];

                column.minWidth = min === 'none' ? Number.MIN_VALUE : parseInt(min, 10);
                column.maxWidth = max === 'none' ? Number.MAX_VALUE : parseInt(max, 10);
            });
        }
    }, {
        key: '_injectHeaderCells',
        value: function _injectHeaderCells() {
            var _this3 = this;

            this.fragment = document.createDocumentFragment();
            this.columns.forEach(function (column) {
                return _this3.fragment.appendChild(column.node);
            });

            this.header.appendChild(this.fragment);

            // must be done after they have been injected into the DOM
            this._computeMinMaxHeaderCellDimensions();

            this.fragment = null; // prevent memleak
        }
    }, {
        key: '_emptyBody',
        value: function _emptyBody() {
            this.rows.length = 0;
            this.rows_ordered_by_y.length = 0;
            this.rows_ordered_by_y_length = 0;

            while (this.body.firstChild) {
                this.body.removeChild(this.body.firstChild);
            }
        }
    }, {
        key: '_injectFirstRow',
        value: function _injectFirstRow() {
            this._emptyBody();

            this.rows.push(createRow({
                active: this.row_start_index === this.active_row,
                data: this.c.getRow(this.row_start_index),
                setIndex: this.row_start_index,
                y: 0
            }, this.columns));

            this.rows_ordered_by_y.push(0);
            this.rows_ordered_by_y_length += 1;

            this.body.appendChild(this.rows[0].node);
        }
    }, {
        key: '_injectRestOfRows',
        value: function _injectRestOfRows() {
            this.fragment = document.createDocumentFragment();

            for (this.i = 1; this.i < this.n_rows_rendered; this.i += 1) {
                this.rows.push(createRow({
                    active: this.i + this.row_start_index === this.active_row,
                    data: this.c.getRow(this.i + this.row_start_index),
                    setIndex: this.i + this.row_start_index,
                    y: this.cell_h * this.i
                }, this.columns));

                this.rows_ordered_by_y.push(this.i);
                this.rows_ordered_by_y_length += 1;

                this.fragment.appendChild(this.rows[this.i].node);
            }

            this.body.appendChild(this.fragment);
            this.fragment = null; // prevent memleak
        }
    }, {
        key: '_applyNewColumnWidth',
        value: function _applyNewColumnWidth(index, width) {
            this.c.columns[index].width = width; // the provided config objects
            this.columns[index].width = width; // the column nodes

            this.rows.forEach(function (row) {
                return row.cells[index].width = width;
            });

            this._calculateXBound();
            this._initializeScrollBars();

            if (this.c.columnResizeFunc) {
                this.c.columnResizeFunc(this.columns[index].mapping, width);
            }
        }
    }, {
        key: '_growColumnsToFillSpace',
        value: function _growColumnsToFillSpace() {
            var _this4 = this;

            var totalColumnWidth = this.columns.reduce(function (total, column) {
                return total += column.width;
            }, 0);
            var diff = this.container_w - totalColumnWidth;
            var diffRemainder = diff % this.columns.length;
            var pxToAdd = (diff - diffRemainder) / this.columns.length;

            this.columns.forEach(function (column, index, array) {
                column.width += pxToAdd;

                if (index === array.length - 1) {
                    column.width += diffRemainder;
                }

                if (column.width > column.maxWidth) {
                    column.width = column.maxWidth;
                } else if (column.width < column.minWidth) {
                    column.width = column.minWidth;
                }

                if (_this4.c.columnResizeFunc) {
                    _this4.c.columnResizeFunc(column.mapping, column.width);
                }
            });

            this._applyColumnWidths();
        }
    }, {
        key: '_shrinkColumnsToAvailableSpace',
        value: function _shrinkColumnsToAvailableSpace() {
            var _this5 = this;

            var totalColumnWidth = this.columns.reduce(function (total, column) {
                return total += column.width;
            }, 0);
            var diff = totalColumnWidth - this.container_w;
            var diffRemainder = diff % this.columns.length;
            var pxToSubtract = (diff - diffRemainder) / this.columns.length;

            this.columns.forEach(function (column, index, array) {
                column.width -= pxToSubtract;

                if (index === array.length - 1) {
                    column.width -= diffRemainder;
                }

                if (column.width > column.maxWidth) {
                    column.width = column.maxWidth;
                } else if (column.width < column.minWidth) {
                    column.width = column.minWidth;
                }

                if (_this5.c.columnResizeFunc) {
                    _this5.c.columnResizeFunc(column.mapping, column.width);
                }
            });

            this._applyColumnWidths();
        }
    }, {
        key: '_calculateColumnWidths',
        value: function _calculateColumnWidths() {
            var _this6 = this;

            var totalWidth = 0;

            this.columns.forEach(function (column, index) {
                if (column.width === undefined) {
                    column.width = Math.min(Math.max.apply(Math, _toConsumableArray(_this6.rows.map(function (row) {
                        return row.cells[index].node.clientWidth + 1 || column.minWidth;
                    }))), column.maxWidth);
                }

                totalWidth += column.width;
            });

            if (this.c.fitColumnsToTable) {
                if (totalWidth !== this.container_w) {
                    if (totalWidth > this.container_w) {
                        this._shrinkColumnsToAvailableSpace();
                    } else {
                        this._growColumnsToFillSpace();
                    }
                }
            } else {
                this._growColumnsToFillSpace();
            }
        }
    }, {
        key: '_applyColumnWidths',
        value: function _applyColumnWidths() {
            var _this7 = this;

            this.rows.forEach(function (row) {
                row.cells.forEach(function (cell, index) {
                    cell.width = _this7.columns[index].width;
                });
            });
        }
    }, {
        key: '_calculateCellHeight',
        value: function _calculateCellHeight() {
            this.cell_h = this.rows[0].cells[0].node.clientHeight || 40;
        }
    }, {
        key: '_calculateXBound',
        value: function _calculateXBound() {
            this.row_w = this.rows[0].node.clientWidth || 500;
            this.x_max = this.container_w <= this.row_w ? this.container_w - this.row_w : 0;
        }
    }, {
        key: '_calculateYBound',
        value: function _calculateYBound() {
            this.y_min = 0;
            this.y_max = this.body_h - this.n_rows_rendered * this.cell_h;
        }
    }, {
        key: '_calculateXScrollHandleSize',
        value: function _calculateXScrollHandleSize() {
            this.x_scroll_handle_size = this.x_scroll_track_w / this.row_w * this.x_scroll_track_w;

            if (this.x_scroll_handle_size < 12) {
                this.x_scroll_handle_size = 12;
            } else if (this.x_scroll_handle_size > this.x_scroll_track_w) {
                this.x_scroll_handle_size = this.x_scroll_track_w;
            }

            return this.x_scroll_handle_size;
        }
    }, {
        key: '_calculateYScrollHandleSize',
        value: function _calculateYScrollHandleSize() {
            this.y_scroll_handle_size = this.n_rows_visible === this.n_rows_rendered ? this.container_h : this.container_h * (this.n_rows_visible / this.c.totalRows);

            if (this.y_scroll_handle_size < 12) {
                this.y_scroll_handle_size = 12;
            }

            return this.y_scroll_handle_size;
        }
    }, {
        key: '_initializeScrollBars',
        value: function _initializeScrollBars() {
            this.x_scroll_track_w = this.c['x-scroll-track'].clientWidth || this.container_w;
            this.x_scroll_track_h = this.c['x-scroll-track'].clientHeight || 8;
            this.y_scroll_track_h = this.c['y-scroll-track'].clientHeight || this.container_h;
            this.x_scroll_handle_style.width = this._calculateXScrollHandleSize() + 'px';
            this.y_scroll_handle_style.height = this._calculateYScrollHandleSize() + 'px';

            /* total translatable space / scrollbar track size = relative value of a scrollbar pixel */
            this.x_table_pixel_ratio = Math.abs(this.x_max) / (this.x_scroll_track_w - this.x_scroll_handle_size);

            /* how many scrollbar pixels === one row? */
            this.y_scrollbar_pixel_ratio = (this.y_scroll_track_h - this.y_scroll_handle_size) / (this.c.totalRows - this.n_rows_visible);

            /* hide the scrollbars if they are not needed */

            if (this.x_scroll_handle_size === this.x_scroll_track_w) {
                this.c['x-scroll-track'].style.display = 'none';
                this.x_scroll_track_hidden = true;
            } else {
                this.c['x-scroll-track'].style.display = '';
                this.x_scroll_track_hidden = false;
            }

            if (this.y_scroll_handle_size === this.y_scroll_track_h) {
                this.c['y-scroll-track'].style.display = 'none';
                this.y_scroll_track_hidden = true;
            } else {
                this.c['y-scroll-track'].style.display = '';
                this.y_scroll_track_hidden = false;
            }
        }
    }, {
        key: '_calculateContainerDimensions',
        value: function _calculateContainerDimensions() {
            /* The fallback amounts are for unit testing, the browser will always have
            an actual number. */
            this.container_h = this.c.wrapper.clientHeight || 150;
            this.container_w = this.c.wrapper.clientWidth || 500;
            this.body_h = this.c.body.clientHeight || 110;
        }
    }, {
        key: '_translateHeader',
        value: function _translateHeader(x) {
            if (x !== this.last_header_x) {
                this.header_style[_transformProperty2.default] = translate3d(x);
                this.last_header_x = x;
            }
        }
    }, {
        key: '_translateBody',
        value: function _translateBody(x, y) {
            if (x !== this.last_body_x || y !== this.last_body_y) {
                this.body_style[_transformProperty2.default] = translate3d(x, y);
                this.last_body_x = x;
                this.last_body_y = y;
            }
        }
    }, {
        key: '_translateXScrollHandle',
        value: function _translateXScrollHandle(x) {
            if (x !== this.last_x_scroll_handle_x) {
                this.x_scroll_handle_style[_transformProperty2.default] = translate3d(x);
                this.last_x_scroll_handle_x = x;
            }
        }
    }, {
        key: '_translateYScrollHandle',
        value: function _translateYScrollHandle(y) {
            if (y !== this.last_y_scroll_handle_y) {
                this.y_scroll_handle_style[_transformProperty2.default] = translate3d(0, y);
                this.last_y_scroll_handle_y = y;
            }
        }
    }, {
        key: '_translateAll',
        value: function _translateAll(nextX, nextY) {
            this._translateHeader(nextX);
            this._translateBody(nextX, nextY);
            this._translateXScrollHandle(this.x_scroll_handle_position);
            this._translateYScrollHandle(this.y_scroll_handle_position);
        }
    }, {
        key: '_scrollUp',
        value: function _scrollUp() {
            /* at the logical start of the table (row index 0) we truncate upward scroll attempts
               to the upper translation boundary to keep from skipping off into nothingness */

            if (this.row_start_index === 0 && this.next_y > this.y_min) {
                this.next_y = this.y_min;

                return;
            }

            if (this.row_start_index === 0 || this.next_y <= this.y_min) {
                return;
            }

            /* Scrolling up, so we want to move the row in the visual bottom position to the top
               (above the lip of the view) */

            this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_min) / this.cell_h);

            /* prevent under-rotating below index zero, the logical start of a data set */
            if (this.row_start_index - this.n_rows_to_shift < 0) {
                this.next_y -= Math.abs(this.row_start_index - this.n_rows_to_shift) * this.cell_h;
                this.n_rows_to_shift = this.row_start_index;
            }

            if (this.n_rows_to_shift > 0) {
                if (this.n_rows_to_shift > this.n_rows_rendered) {
                    /* when the total movement ends up being larger than the set of rows already rendered, we can safely decrement the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                    this.shift_delta = this.n_rows_to_shift - this.n_rows_rendered;

                    this.row_start_index -= this.shift_delta;
                    this.row_end_index -= this.shift_delta;

                    /* accomodate for the number of pixels that will not be rendered */
                    this.next_y -= this.shift_delta * this.cell_h;

                    this.n_rows_to_shift = this.n_rows_rendered;
                }

                /* move the highest Y-value rows to the top of the ordering array */
                this.ordered_y_array_index = this.rows_ordered_by_y.length - 1;

                for (this.iterator = 1; this.iterator <= this.n_rows_to_shift; this.iterator += 1) {
                    this.target_index = this.row_start_index - this.iterator;

                    this.ptr = this.rows[this.rows_ordered_by_y[this.ordered_y_array_index]];

                    this.ptr.data = this.drag_timer ? null : this.c.getRow(this.target_index);
                    this.ptr.setIndex = this.target_index;
                    this.ptr.y = this.rows[this.rows_ordered_by_y[0]].y - this.cell_h;
                    this.ptr.active = this.target_index === this.active_row;

                    this.ptr = null;

                    this.rows_ordered_by_y.unshift(this.rows_ordered_by_y.pop());
                }

                this.row_start_index -= this.n_rows_to_shift;
                this.row_end_index -= this.n_rows_to_shift;

                this.y_min += this.n_rows_to_shift * this.cell_h;
                this.y_max += this.n_rows_to_shift * this.cell_h;
            }
        }
    }, {
        key: '_scrollDown',
        value: function _scrollDown() {
            /* at the logical end of the table (row index n) we truncate any scroll attempts  */
            if (this.row_end_index >= this.c.totalRows - 1 && this.next_y <= this.y_max) {
                this.next_y = this.y_max;

                if (this.x_scroll_track_hidden === false) {
                    this.next_y -= this.x_scroll_track_h;
                }

                return;
            } else if (this.next_y >= this.y_max) {
                return;
            }

            /* Scrolling down, so we want to move the row in the visual top position to the bottom
               (below the lip of the view) */

            this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_max) / this.cell_h);

            if (this.n_rows_to_shift + this.row_end_index + 1 >= this.c.totalRows) {
                /* more rows than there is data available, truncate */
                this.next_y += (this.n_rows_to_shift - (this.c.totalRows - this.row_end_index - (this.top_visible_row_index === 0 ? 0 : 1))) * this.cell_h;

                this.next_y = applyDelta(applyDelta(this.y_max, this.y) % this.cell_h, this.next_y);

                if (this.x_scroll_track_hidden === false) {
                    this.next_y -= this.x_scroll_track_h;
                }

                this.n_rows_to_shift = this.c.totalRows - this.row_end_index - 1;
            }

            if (this.n_rows_to_shift > 0) {
                if (this.n_rows_to_shift > this.n_rows_rendered) {
                    /* when the total movement ends up being larger than the set of rows already rendered, we can safely increment the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                    this.shift_delta = this.n_rows_to_shift - this.n_rows_rendered;

                    this.row_start_index += this.shift_delta;
                    this.row_end_index += this.shift_delta;

                    /* accomodate for the number of pixels that will not be rendered */
                    this.next_y += this.shift_delta * this.cell_h;

                    this.n_rows_to_shift = this.n_rows_rendered;
                }

                for (this.iterator = 1; this.iterator <= this.n_rows_to_shift; this.iterator += 1) {
                    this.target_index = this.row_end_index + this.iterator;

                    /* the padding rows will exceed the maximum index for a data set once the user has fully translated to the bottom of the screen */
                    if (this.target_index >= this.c.totalRows) {
                        this.rows_ordered_by_y.push(this.rows_ordered_by_y.shift());

                        continue;
                    }

                    /* move the lowest Y-value rows to the bottom of the ordering array */
                    this.ptr = this.rows[this.rows_ordered_by_y[0]];

                    this.ptr.data = this.drag_timer ? null : this.c.getRow(this.target_index);
                    this.ptr.setIndex = this.target_index;
                    this.ptr.y = this.rows[this.rows_ordered_by_y[this.rows_ordered_by_y_length - 1]].y + this.cell_h;
                    this.ptr.active = this.target_index === this.active_row;

                    this.ptr = null;

                    this.rows_ordered_by_y.push(this.rows_ordered_by_y.shift());
                }

                this.row_start_index += this.n_rows_to_shift;
                this.row_end_index += this.n_rows_to_shift;

                this.y_min -= this.n_rows_to_shift * this.cell_h;
                this.y_max -= this.n_rows_to_shift * this.cell_h;
            }
        }
    }, {
        key: '_calculateVisibleTopRowIndex',
        value: function _calculateVisibleTopRowIndex() {
            var targetY = arguments.length <= 0 || arguments[0] === undefined ? this.next_y : arguments[0];

            return this.rows[this.rows_ordered_by_y[Math.ceil(Math.abs(applyDelta(this.y_min, targetY) / this.cell_h))]].setIndex;
        }
    }, {
        key: '_unlockDragToScroll',
        value: function _unlockDragToScroll() {
            this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;

            window.removeEventListener('click', this._preventClickWhileDragging, true);
        }
    }, {
        key: '_handleColumnResize',
        value: function _handleColumnResize(delta) {
            if (delta === 0) {
                return;
            }

            var index = this.columns.indexOf(this.column_is_resizing);
            var adjusted_delta = delta;

            if (adjusted_delta < 0 && !isNaN(this.column_is_resizing.minWidth) && this.column_is_resizing.width + adjusted_delta < this.column_is_resizing.minWidth) {
                adjusted_delta = this.column_is_resizing.minWidth - this.column_is_resizing.width;
            } else if (!isNaN(this.column_is_resizing.maxWidth) && this.column_is_resizing.width + adjusted_delta > this.column_is_resizing.maxWidth) {
                adjusted_delta = this.column_is_resizing.maxWidth - this.column_is_resizing.width;
            }

            this._applyNewColumnWidth(index, this.column_is_resizing.width + adjusted_delta);

            /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
            we'll see unwanted whitespace on the right side. If the table width becomes smaller than
            the overall container, whitespace will appear regardless. */
            if (adjusted_delta < 0 && this.row_w + this.x + adjusted_delta < this.container_w) {
                this.evt.deltaX = adjusted_delta;
                this.evt.deltaY = 0;

                this._handleMoveIntent(this.evt);
            }
        }
    }, {
        key: '_setAriaText',
        value: function _setAriaText(text) {
            this.c.aria.innerText = text;
        }
    }, {
        key: '_changeActiveRow',
        value: function _changeActiveRow(delta) {
            var _this8 = this;

            if (this.active_row + delta >= this.c.totalRows) {
                return;
            }

            this.next_active_row = (0, _findWhere2.default)(this.rows, 'setIndex', this.active_row + delta);

            if (this.next_active_row) {
                this.setActiveRowIndex(this.next_active_row.setIndex);
                this._setAriaText(this.next_active_row.data[this.columns[0].mapping]);

                if (delta === -1 && this.next_active_row.y * -1 > this.y || delta === 1 && this.next_active_row.y * -1 < this.y - this.body_h + this.cell_h) {
                    // Destination row is outside the viewport, so simulate a scroll
                    this.evt.deltaX = 0;
                    this.evt.deltaY = this.cell_h * delta;

                    this._handleMoveIntent(this.evt);
                }
            } else if (delta < 0 && this.active_row > 0 || delta > 0 && this.active_row < this.c.totalRows) {
                /* The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown in the viewport. */
                this.evt.deltaX = 0;
                this.evt.deltaY = (this.row_start_index > this.active_row && this.active_row - this.row_start_index || (this.row_start_index < this.active_row && this.active_row - this.row_start_index) + delta) * this.cell_h;

                this._handleMoveIntent(this.evt);

                // start the process again, now that the row is available
                window.requestAnimationFrame(function () {
                    return _this8._changeActiveRow(delta);
                });
            }

            this.next_active_row = null;
        }
    }, {
        key: '_discoverCellAndRowNodes',
        value: function _discoverCellAndRowNodes(target) {
            var node = target;
            var nodeMap = {};

            if (node.classList.contains(ROW)) {
                return { row: node };
            }

            while ((!nodeMap.cell || !nodeMap.row) && node) {
                if (node.classList.contains(CELL)) {
                    nodeMap.cell = node;
                } else if (node.classList.contains(ROW)) {
                    nodeMap.row = node;
                }

                node = node.parentNode;
            }

            return nodeMap;
        }
    }, {
        key: 'getActiveRowIndex',

        // public APIs

        value: function getActiveRowIndex() {
            return this.active_row > -1 ? this.active_row : undefined;
        }
    }, {
        key: 'setActiveRowIndex',
        value: function setActiveRowIndex(setIndex) {
            this.active_row = setIndex;
            this.rows.forEach(function (row) {
                return row.active = row.setIndex === setIndex;
            });

            if (this.c.activeRowChangedFunc) {
                this.c.activeRowChangedFunc(this.active_row);
            }
        }
    }, {
        key: 'resetActiveRowIndex',
        value: function resetActiveRowIndex() {
            var _this9 = this;

            this.active_row = -1;
            this.next_active_row = null;
            this.rows.forEach(function (row) {
                return row.active = row.setIndex === _this9.active_row;
            });

            if (this.c.activeRowChangedFunc) {
                this.c.activeRowChangedFunc();
            }
        }
    }, {
        key: 'getXAmountScrolled',
        value: function getXAmountScrolled() {
            return this.x;
        }
    }, {
        key: 'getYAmountScrolled',
        value: function getYAmountScrolled() {
            return this.y;
        }
    }, {
        key: 'jumpToRowIndex',
        value: function jumpToRowIndex(index) {
            if (isNaN(index) || index === null) {
                return;
            } // ignore invalid input

            if (index < 0) {
                index = 0;
            } // underflow protection

            if (index > this.c.totalRows - 1) {
                index = this.c.totalRows - 1;
            } // overflow protection

            this.setActiveRowIndex(index);

            // if already visible, don't regenerate
            if (index >= this.top_visible_row_index && index <= this.row_end_index) {
                return;
            }

            if (index + this.n_rows_rendered < this.c.totalRows) {
                this.row_start_index = index;
                this.y = 0;
            } else {
                this.row_start_index = this.c.totalRows - this.n_rows_rendered;
                this.y = this.n_padding_rows * this.cell_h * -1;
            }

            this.regenerate();

            this.y_scroll_handle_position = index * this.y_scrollbar_pixel_ratio;

            if (this.y_scroll_handle_position + this.y_scroll_handle_size > this.y_scroll_track_h) {
                this.y_scroll_handle_position = this.y_scroll_track_h - this.y_scroll_handle_size;
            }

            this._translateYScrollHandle(this.y_scroll_handle_position);
        }
    }, {
        key: 'regenerate',
        value: function regenerate() {
            var config = arguments.length <= 0 || arguments[0] === undefined ? this.c : arguments[0];

            if (config !== this.c) {
                this._processConfiguration(config);
            }

            // allows for true sizes to be calculated; post-initialization, the flexbox auto-grow algorithm takes over
            // and will divvy up remaining space amongst the children... precalculating the true size means larger columns
            // will not be prematurely truncated
            this.c.wrapper.classList.remove(INITIALIZED);

            /* stores the current state of the union for if we need to rehydrate the previous scroll state */
            this.__x = this.x;
            this.__y = this.y;
            this.__row_start_index = this.row_start_index;

            this._resetInternals();

            if (this.active_row >= this.c.totalRows) {
                this.resetActiveRowIndex();
            }

            this._calculateContainerDimensions();

            this._buildColumns();

            this.row_start_index = this.c.preserveScrollState ? this.__row_start_index || 0 : 0;

            this._injectFirstRow();
            this._calculateCellHeight();

            this.n_rows_rendered = Math.ceil(this.body_h / this.cell_h) + this.n_padding_rows;

            if (this.n_rows_rendered > this.c.totalRows) {
                this.n_rows_rendered = this.c.totalRows;
            }

            this.n_rows_visible = Math.floor(this.body_h / this.cell_h);

            if (this.n_rows_visible > this.n_rows_rendered) {
                this.n_rows_visible = this.n_rows_rendered;
            }

            this.row_end_index = this.row_start_index + this.n_rows_rendered - 1;

            this._injectRestOfRows();
            this._injectHeaderCells();
            this._calculateColumnWidths();

            this._calculateXBound();
            this._calculateYBound();

            this.top_visible_row_index = this._calculateVisibleTopRowIndex();

            this._initializeScrollBars();

            if (this.c.preserveScrollState && this.__x !== null && this.__y !== null) {
                /* the cached values are then applied against the table to arrive at the previous state */

                this._handleMoveIntent({
                    deltaX: -this.__x,
                    deltaY: -this.__y,
                    preventDefault: noop
                });
            }

            // now that all the setup is complete, apply the flex algorithm to expand smaller cells if there
            // is extra room
            this.c.wrapper.classList.add(INITIALIZED);

            this.__x = this.__y = this.__row_start_index = null;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var _this10 = this;

            window.removeEventListener('resize', this._handleWindowResize);
            window.removeEventListener('mousemove', this._handleDragMove);

            this.c.wrapper.removeEventListener('wheel', this._handleMoveIntent);
            this.c.wrapper.removeEventListener('touchstart', this._handleTouchStart);
            this.c.wrapper.removeEventListener('touchmove', this._handleTouchMove);

            this.c.wrapper.removeEventListener('keydown', this._handleKeyDown);

            this.header.removeEventListener('mousedown', this._handleColumnDragStart);
            this.header.removeEventListener('click', this._handleHeaderClick);
            this.header.removeEventListener('dblclick', this._handleColumnAutoExpand);

            this.body.removeEventListener('click', this._handleClick);

            this.c['x-scroll-handle'].removeEventListener('mousedown', this._handleXScrollHandleDragStart);
            this.c['y-scroll-handle'].removeEventListener('mousedown', this._handleYScrollHandleDragStart);

            this.c['x-scroll-track'].removeEventListener('click', this._handleAdvanceToXScrollTrackLocation);
            this.c['y-scroll-track'].removeEventListener('click', this._handleAdvanceToYScrollTrackLocation);

            this._emptyHeader();
            this._emptyBody();

            // release cached DOM nodes
            Object.keys(this.c).forEach(function (key) {
                if (_this10.c[key] instanceof HTMLElement) {
                    _this10.c[key] = null;
                }
            });
        }
    }]);

    return Table;
}();

exports.default = Table;

},{"30":30,"31":31}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = findWhere;
/**
 * Searches and returns the first occurence of an array item with the given property.
 * @module UIKit/utils/findWhere
 */

var _findWhereIndex = null;

/**
 * @param  {Array[Object]} array     an array of objects
 * @param  {String}        property  the name of the property to match against
 * @param  {*}             value     the value to match against (uses strict equality)
 *
 * @return {Object|undefined} The matched array item, or nothing.
 */
function findWhere(array, property, value) {
    _findWhereIndex = array.length - 1;

    while (_findWhereIndex > -1) {
        if (array[_findWhereIndex][property] === value) {
            return array[_findWhereIndex];
        }

        _findWhereIndex -= 1;
    }
} // optimized specifically to only look for a single key:value match

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * Returns the appropriate vendor-prefixed property for use in programmatic
 * transform style manipulation.
 *
 * @return {String} the property key (e.g. `WebkitTransform`, `msTransform`)
 */
exports.default = function detectTransformProperty() {
    var possibilities = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'webkit-transform'];

    // used in JSDOM
    for (var i = 0, len = possibilities.length; i < len; i++) {
        if (possibilities[i] in document.documentElement.style) {
            return possibilities[i];
        }
    }

    return false;
}();

},{}],32:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

},{}],33:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = isInteger;

},{}],34:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return basePickBy(object, props, function(value, key) {
    return key in object;
  });
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick from.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, props, predicate) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Creates an array of the own and inherited enumerable symbol properties
 * of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable string keyed properties of `object` that are
 * not omitted.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = baseRest(function(object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap(baseFlatten(props, 1), toKey);
  return basePick(object, baseDifference(getAllKeysIn(object), props));
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = omit;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],35:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = values;

},{}],36:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `_.pull`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.xor
 * @example
 *
 * _.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 */
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = without;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[27])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRpb24vaW5kZXguanMiLCJVSVBvcG92ZXIvaW5kZXguanMiLCJVSVByb2dyZXNzL2luZGV4LmpzIiwiVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUvaW5kZXguanMiLCJVSVJhZGlvL2luZGV4LmpzIiwiVUlTZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiVUlUYWJsZS9pbmRleC5qcyIsIlVJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIlVJVG9vbHRpcC9pbmRleC5qcyIsIlVJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCJVSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzL2luZGV4LmpzIiwiVUlVdGlscy9pc0Z1bmN0aW9uL2luZGV4LmpzIiwiVUlVdGlscy9pc1N0cmluZy9pbmRleC5qcyIsIlVJVXRpbHMvbm9vcC9pbmRleC5qcyIsIlVJVXRpbHMvbm90aWZ5L2luZGV4LmpzIiwiVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eS9pbmRleC5qcyIsIlVJVXRpbHMvdXVpZC9pbmRleC5qcyIsImV4cG9ydHMuanMiLCJub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbmlnbWEtdGFibGUvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VuaWdtYS10YWJsZS9zcmMvdXRpbHMvZmluZFdoZXJlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VuaWdtYS10YWJsZS9zcmMvdXRpbHMvdHJhbnNmb3JtUHJvcGVydHkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXNjYXBlLXN0cmluZy1yZWdleHAvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmlzaW50ZWdlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gub21pdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudmFsdWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC53aXRob3V0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsb0I7Ozs7Ozs7Ozs7OztvS0FjakIsSyxHQUFRO0FBQ0osOEJBQWtCO0FBRGQsUyxRQW9EUixhLEdBQWdCLFVBQUMsS0FBRCxFQUFXO0FBQ3ZCLG9CQUFRLE1BQU0sR0FBZDtBQUNBLHFCQUFLLFNBQUw7QUFDQSxxQkFBSyxXQUFMO0FBQ0ksMEJBQU0sY0FBTjtBQUNBLDBCQUFLLFNBQUwsQ0FBZSxDQUFDLENBQWhCO0FBQ0E7O0FBRUoscUJBQUssV0FBTDtBQUNBLHFCQUFLLFlBQUw7QUFDSSwwQkFBTSxjQUFOO0FBQ0EsMEJBQUssU0FBTCxDQUFlLENBQWY7QUFDQTtBQVhKOztBQWNBLGdCQUFJLDBCQUFXLE1BQUssS0FBTCxDQUFXLFNBQXRCLENBQUosRUFBc0M7QUFDbEMsc0JBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsS0FBckI7QUFDSDtBQUNKLFM7OzttQ0FsRUQsa0IsK0JBQW1CLFMsRUFBVyxTLEVBQVc7QUFDckMsWUFBSSxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxLQUFnQyxJQUFwQyxFQUEwQztBQUN0QyxnQkFBTSxjQUFnQixLQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQ0MsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLEtBQUssS0FBTCxDQUFXLFFBQWxDLENBQUQsQ0FBOEMsTUFEOUMsR0FFQSxDQUZ0Qjs7QUFJ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O0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDelFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaDlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25kQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUFycm93S2V5TmF2aWdhdGlvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUFycm93S2V5TmF2aWdhdGlvbi5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBhY3RpdmVDaGlsZEluZGV4OiBudWxsLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgICAgICBpZiAobnVtQ2hpbGRyZW4gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudWxsfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBwcmV2U3RhdGUuYWN0aXZlQ2hpbGRJbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IChcbiAgICAgICAgICAgIHRoaXMucmVmcy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICA/IHRoaXMucmVmcy53cmFwcGVyXG4gICAgICAgICAgOiBmaW5kRE9NTm9kZSh0aGlzLnJlZnMud3JhcHBlcilcbiAgICAgICAgKS5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiBjaGlsZE5vZGUuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpID09PSAnLTEnKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1cyhcbiAgICAgICAgICAgICAgICBjaGlsZE5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24oZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX0ZPTExPV0lORyA/IC0xIDogMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZE5vZGUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gY2hpbGROb2RlKSB7XG4gICAgICAgICAgICBjaGlsZE5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVGb2N1cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IG51bUNoaWxkcmVuIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBuZXh0SW5kZXh9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkQmx1cihpbmRleCwgY2hpbGQsIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAoIWlzU3RyaW5nKGNoaWxkKSAmJiBpc0Z1bmN0aW9uKGNoaWxkLnByb3BzLm9uQmx1cikpIHtcbiAgICAgICAgICAgIGNoaWxkLnByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZEZvY3VzKGluZGV4LCBjaGlsZCwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogaW5kZXh9KTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAoIWlzU3RyaW5nKGNoaWxkKSAmJiBpc0Z1bmN0aW9uKGNoaWxkLnByb3BzLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSB8fCBpbmRleCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQucHJvcHMudGFiSW5kZXggIT09IHVuZGVmaW5lZCA/IGNoaWxkLnByb3BzLnRhYkluZGV4IDogMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQ2hpbGRCbHVyLmJpbmQodGhpcywgaW5kZXgsIGNoaWxkKSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUNoaWxkRm9jdXMuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgVUlBcnJvd0tleU5hdmlnYXRpb24uaW50ZXJuYWxLZXlzKSxcbiAgICAgICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4oKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9O1xuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQnV0dG9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9uUHJlc3NlZDogbm9vcCxcbiAgICAgICAgb25VbnByZXNzZWQ6IG5vb3AsXG4gICAgfTtcblxuICAgIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXShldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUJ1dHRvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICogQGNsYXNzIFVJQ2hlY2tib3hcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQ2hlY2tib3gucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25VbmNoZWNrZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgaWQgPSB1dWlkKClcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4geyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5wcm9wc1shdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQgPyAnb25DaGVja2VkJyA6ICdvblVuY2hlY2tlZCddKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFyaWFTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLmlucHV0UHJvcHMsICdpbmRldGVybWluYXRlJyl9XG4gICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1jaGVja2VkJzogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC11bmNoZWNrZWQnOiAhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmdldEFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQ2hlY2tib3guaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBDb25zdGFudHMgPSB7XG4gICAgICAgIFNFTEVDVF9BTExfQkVGT1JFOiAnU0VMRUNUX0FMTF9CRUZPUkUnLFxuICAgICAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgb25BbGxDaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlDaGVja2JveEdyb3VwLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgb25BbGxDaGVja2VkOiBub29wLFxuICAgICAgICBvbkFsbFVuY2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdEFsbDogZmFsc2UsXG4gICAgICAgIHNlbGVjdEFsbFByb3BzOiB7fSxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgfVxuXG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeShpdGVtID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBhbnlJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLnNvbWUoaXRlbSA9PiBpdGVtLmlucHV0UHJvcHMuY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuICAgICAgICAgICAgY29uc3Qge2lucHV0UHJvcHN9ID0gdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcztcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdzZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICBrZXk9J2NiX3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwLXNlbGVjdGFsbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGFsbENoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlOiAhYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaW5wdXRQcm9wcyAmJiBpbnB1dFByb3BzLm5hbWUgPyBpbnB1dFByb3BzLm5hbWUgOiAnY2Jfc2VsZWN0X2FsbCcsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmxhYmVsIHx8ICdTZWxlY3QgQWxsJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlucHV0UHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIGNvbnN0IHRvQmVSZW5kZXJlZCA9IFt0aGlzLnJlbmRlckNoZWNrYm94ZXMoKV07XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsICYmIHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC51bnNoaWZ0KHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUjpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQucHVzaCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0JlUmVuZGVyZWQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQ2hlY2tib3hHcm91cC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlEaWFsb2dcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRGlhbG9nIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWZ0ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBiZWZvcmU6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBib2R5UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGNhcHR1cmVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBmb290ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBmb290ZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgaGVhZGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGJvZHlQcm9wczoge30sXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IGZhbHNlLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICAgICAgb25DbG9zZTogbm9vcCxcbiAgICAgICAgd3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIC8vIGZhbGxiYWNrcyBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgdXVpZEhlYWRlciA9IHV1aWQoKVxuICAgIHV1aWRCb2R5ID0gdXVpZCgpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2coZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgIH1cblxuICAgIGlzUGFydE9mRGlhbG9nKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlIHx8IG5vZGUgPT09IHdpbmRvdykgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy4kd3JhcHBlci5jb250YWlucyhub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS5wYXJlbnROb2RlIDogbm9kZSk7XG4gICAgfVxuXG4gICAgY2FsbE9uQ2xvc2VJZk1vdW50ZWQgPSAoKSA9PiB0aGlzLm1vdW50ZWQgJiYgdGhpcy5wcm9wcy5vbkNsb3NlKClcblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQodGhpcy5jYWxsT25DbG9zZUlmTW91bnRlZCwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IGlzIGZvciBGaXJlZm94LCBhcyBpdCBkb2Vzbid0IHN1cHBvcnQgcmVsYXRlZFRhcmdldFxuICAgICAgICBsZXQgcHJldmlvdXMgPSBuYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0IHx8IG5hdGl2ZUV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKCAgIHRoaXMuaXNQYXJ0T2ZEaWFsb2cocHJldmlvdXMpXG4gICAgICAgICAgICAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcHJldmlvdXMuZm9jdXMoKTsgLy8gcmVzdG9yZSBmb2N1c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uRXNjS2V5ICYmIGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuY2FsbE9uQ2xvc2VJZk1vdW50ZWQsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLmNhbGxPbkNsb3NlSWZNb3VudGVkLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZVNjcm9sbCAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLmNhbGxPbkNsb3NlSWZNb3VudGVkLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuYm9keVByb3BzfVxuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmJvZHlQcm9wcy5pZCB8fCB0aGlzLnV1aWRCb2R5fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctYm9keSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxmb290ZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuZm9vdGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1mb290ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mb290ZXJ9XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGhlYWRlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5oZWFkZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuaWQgfHwgdGhpcy51dWlkSGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctaGVhZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaGVhZGVyfVxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckZvY3VzQm91bmRhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktb2Zmc2NyZWVuJyB0YWJJbmRleD0nMCcgYXJpYS1oaWRkZW49J3RydWUnPiZuYnNwOzwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0gLy8gdXNlZCB0byBsb2NrIGZvY3VzIGludG8gYSBwYXJ0aWN1bGFyIHN1YnNldCBvZiBET01cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy53cmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtub2RlID0+ICh0aGlzLiR3cmFwcGVyID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9jdXNCb3VuZGFyeSgpfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYmVmb3JlfVxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSURpYWxvZy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9e25vZGUgPT4gKHRoaXMuJGRpYWxvZyA9IG5vZGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2cnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy51dWlkSGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnV1aWRCb2R5fVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcigpfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYWZ0ZXJ9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb2N1c0JvdW5kYXJ5KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEZpdCBnaXZlbiB0ZXh0IGluc2lkZSBhIHBhcmVudCBjb250YWluZXIsIG9iZXlpbmcgaW1wbGljdCBhbmQgZXhwbGljaXQgY29uc3RyYWludHMuXG4gKiBAY2xhc3MgVUlGaXR0ZWRUZXh0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmNvbnN0IGluc3RhbmNlcyA9IFtdO1xuXG5mdW5jdGlvbiB0b0koc3RyaW5nTnVtYmVyKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHN0cmluZ051bWJlciwgMTApO1xufVxuXG5mdW5jdGlvbiByZXNjYWxlKGluc3RhbmNlKSB7XG4gICAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKGluc3RhbmNlKTtcbiAgICBjb25zdCBjb250YWluZXJCb3ggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLnBhcmVudE5vZGUpO1xuICAgIGNvbnN0IGZvbnRTaXplID0gdG9JKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmZvbnRTaXplKTtcblxuICAgIGxldCBjb250YWluZXJIZWlnaHQgPSB0b0koY29udGFpbmVyQm94LmhlaWdodCk7XG4gICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdG9JKGNvbnRhaW5lckJveC53aWR0aCk7XG5cbiAgICBpZiAoY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnIHx8IGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdwYWRkaW5nLWJveCcpIHsgLy8gbmVlZCB0byBhY2NvdW50IGZvciBwYWRkaW5nXG4gICAgICAgIGNvbnRhaW5lckhlaWdodCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdUb3ApICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgY29udGFpbmVyV2lkdGggLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nTGVmdCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdSaWdodCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVGb3JIZWlnaHQgPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0SGVpZ2h0KSAqIGNvbnRhaW5lckhlaWdodCk7XG4gICAgY29uc3Qgb3B0aW1pemVGb3JXaWR0aCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRXaWR0aCkgKiBjb250YWluZXJXaWR0aCk7XG5cbiAgICAvLyB0aGUgfHwgMSBpcyBhIGZhbGxiYWNrIHRvIHByZXZlbnQgZm9udFNpemUgZnJvbSBiZWluZyBzZXQgdG8gemVybywgd2hpY2ggZnViYXJzIHRoaW5nc1xuICAgIG5vZGUuc3R5bGUuZm9udFNpemUgPSAoTWF0aC5taW4oaW5zdGFuY2UucHJvcHMubWF4Rm9udFNpemUsIG9wdGltaXplRm9ySGVpZ2h0LCBvcHRpbWl6ZUZvcldpZHRoKSB8fCAxKSArICdweCc7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVdpbmRvd1Jlc2l6ZSgpIHtcbiAgICBpbnN0YW5jZXMuZm9yRWFjaChpbnN0YW5jZSA9PiByZXNjYWxlKGluc3RhbmNlKSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG59XG5cbmZ1bmN0aW9uIHVucmVnaXN0ZXJJbnN0YW5jZShpbnN0YW5jZSkge1xuICAgIGluc3RhbmNlcy5zcGxpY2UoaW5zdGFuY2VzLmluZGV4T2YoaW5zdGFuY2UpLCAxKTtcblxuICAgIGlmIChpbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVXaW5kb3dSZXNpemUsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlGaXR0ZWRUZXh0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBtYXhGb250U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlGaXR0ZWRUZXh0LnByb3BUeXBlcylcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICByZXNjYWxlKHRoaXMpO1xuXG4gICAgICAgIC8vIHRoZXJlIGFyZSBsaWtlbHkgdG8gYmUgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHRoaXMgY29tcG9uZW50IG9uIGEgcGFnZSwgc28gaXQgbWFrZXMgc2Vuc2UgdG8ganVzdCB1c2VcbiAgICAgICAgLy8gYSBzaGFyZWQgZ2xvYmFsIHJlc2l6ZSBsaXN0ZW5lciBpbnN0ZWFkIG9mIGVhY2ggY29tcG9uZW50IGhhdmluZyBpdHMgb3duXG4gICAgICAgIHJlZ2lzdGVySW5zdGFuY2UodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICByZXNjYWxlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB1bnJlZ2lzdGVySW5zdGFuY2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gey4uLm9taXQodGhpcy5wcm9wcywgVUlGaXR0ZWRUZXh0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGltYWdlIGJsb2NrIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCBmb3IgbG9hZGluZyBhbmQgZmFsbGJhY2sgc2NlbmFyaW9zLlxuICogQGNsYXNzIFVJSW1hZ2VcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUltYWdlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHN0YXR1cyA9IHtcbiAgICAgICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgICAgICBMT0FERUQ6ICdMT0FERUQnLFxuICAgICAgICBFUlJPUjogJ0VSUk9SJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGRpc3BsYXlBc0JhY2tncm91bmRJbWFnZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGltYWdlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBzdGF0dXNQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlJbWFnZS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbWFnZVByb3BzOiB7fSxcbiAgICAgICAgc3RhdHVzUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmltYWdlUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnByb3BzLnNyY30pYCxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cbiAgICAgICAgICAgICAgICBhbHQ9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgIG9uTG9hZD17bm9vcH1cbiAgICAgICAgICAgICAgICBvbkVycm9yPXtub29wfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuc3RhdHVzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nc3RhdHVzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXN0YXR1cyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJSW1hZ2UuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJTW9kYWxcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTW9kYWwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIG1hc2tQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbW9kYWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlNb2RhbC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgbWFza1Byb3BzOiB7fSxcbiAgICAgICAgbW9kYWxQcm9wczoge30sXG4gICAgfVxuXG4gICAgdXBkYXRlSW50ZXJuYWxNb2RhbENhY2hlKGluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMubW9kYWwgPSBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLnJlbmRlck1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlck1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy4kY29udGFpbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLiRjb250YWluZXIpO1xuICAgIH1cblxuICAgIHJlbmRlck1vZGFsKCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcblxuICAgICAgICB0aGlzLnVwZGF0ZUludGVybmFsTW9kYWxDYWNoZShcbiAgICAgICAgICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSU1vZGFsLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5tYXNrUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtbWFzayc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLm1hc2tQcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLm1hc2tQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0gLz5cblxuICAgICAgICAgICAgICAgICAgICA8VUlEaWFsb2dcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyhwcm9wcywgVUlEaWFsb2cucHJvcFR5cGVzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5tb2RhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgICAgICA8L1VJRGlhbG9nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgLCB0aGlzLiRjb250YWluZXIpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgLz4pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSB1dGlsaXR5IHZpZXcgZm9yIHBhZ2luZyB0aGUgZGlzcGxheSBvZiBtYW55IGRhdGEgaXRlbXMgb2YgdmFyeWluZyBzaXplcy5cbiAqIEBjbGFzcyBVSVBhZ2luYXRpb25cbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgaXNJbnRlZ2VyIGZyb20gJ2xvZGFzaC5pc2ludGVnZXInO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlTZWdtZW50ZWRDb250cm9sIGZyb20gJy4uL1VJU2VnbWVudGVkQ29udHJvbCc7XG5pbXBvcnQgVUlBcnJvd0tleU5hdmlnYXRpb24gZnJvbSAnLi4vVUlBcnJvd0tleU5hdmlnYXRpb24nO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5jbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBldmVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZGF0YTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgZGF0YVRvSlNYQ29udmVydGVyRnVuYzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBsb2FkaW5nQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKEl0ZW0ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiBuZXh0UHJvcHMuZGF0YX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRJdGVtRGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdW50ZWQgJiYgdGhpcy5zdGF0ZS5kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IHZhbHVlfSk7XG4gICAgICAgICAgICAgICAgfSAvLyBvbmx5IHJlcGxhY2UgaWYgd2UncmUgbG9va2luZyBhdCB0aGUgc2FtZSBwcm9taXNlLCBvdGhlcndpc2UgZG8gbm90aGluZ1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldENsYXNzZXMoZXh0cmFDbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjeCh7XG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UsXG4gICAgICAgIH0pICsgKGV4dHJhQ2xhc3NlcyA/ICcgJyArIGV4dHJhQ2xhc3NlcyA6ICcnKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbEtleXMpfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NlcygpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubG9hZGluZ0NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QganN4ID0gdGhpcy5wcm9wcy5kYXRhVG9KU1hDb252ZXJ0ZXJGdW5jKHRoaXMuc3RhdGUuZGF0YSwgdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChqc3gsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbEtleXMpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzZXMoanN4LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAnZGF0YS1pbmRleCc6IHRoaXMucHJvcHMuaW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQYWdpbmF0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGNvbnRyb2xzID0ge1xuICAgICAgICBGSVJTVDogJ0ZJUlNUJyxcbiAgICAgICAgUFJFVklPVVM6ICdQUkVWSU9VUycsXG4gICAgICAgIE5FWFQ6ICdORVhUJyxcbiAgICAgICAgTEFTVDogJ0xBU1QnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvbnMgPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQk9USDogJ0JPVEgnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGN1c3RvbUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZ2V0SXRlbTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaWRlbnRpZmllcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXG4gICAgICAgIGluaXRpYWxQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZUluaXRpYWxQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoaXNJbnRlZ2VyKHByb3BzLmluaXRpYWxQYWdlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgaW5pdGlhbFBhZ2VgIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChwcm9wcy50b3RhbEl0ZW1zIC8gcHJvcHMubnVtSXRlbXNQZXJQYWdlKTtcblxuICAgICAgICAgICAgaWYgKHByb3BzLmluaXRpYWxQYWdlIDwgMSB8fCBwcm9wcy5pbml0aWFsUGFnZSA+IG51bWJlck9mUGFnZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgaW5pdGlhbFBhZ2VgIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgbnVtYmVyT2ZQYWdlcyArICcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXRlbUxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgaXRlbVRvSlNYQ29udmVydGVyRnVuYzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuZXh0UGFnZUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcblxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlTnVtSXRlbXNQZXJQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoaXNJbnRlZ2VyKHByb3BzLm51bUl0ZW1zUGVyUGFnZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wcy5udW1JdGVtc1BlclBhZ2UgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBudW1QYWdlVG9nZ2xlczogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucG9zaXRpb25zKSksXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93UGFnaW5hdGlvblN0YXRlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHRvdGFsSXRlbXM6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQYWdpbmF0aW9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGdldEl0ZW06IG5vb3AsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBmYWxzZSxcbiAgICAgICAgaW5pdGlhbFBhZ2U6IDEsXG4gICAgICAgIGl0ZW1Ub0pTWENvbnZlcnRlckZ1bmM6IGRhdGEgPT4gZGF0YSxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sQ29udGVudDogJ8KrIEZpcnN0JyxcbiAgICAgICAganVtcFRvTGFzdENvbnRyb2xDb250ZW50OiAnTGFzdCDCuycsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBuZXh0UGFnZUNvbnRyb2xDb250ZW50OiAnTmV4dCDigLonLFxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IDEwLFxuICAgICAgICBudW1QYWdlVG9nZ2xlczogNSxcbiAgICAgICAgcG9zaXRpb246IFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMuQUJPVkUsXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50OiAn4oC5IFByZXZpb3VzJyxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiB0cnVlLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogdHJ1ZSxcbiAgICAgICAgdG9nZ2xlV3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2UsXG4gICAgICAgIHRhcmdldEluZGV4OiAodGhpcy5wcm9wcy5pbml0aWFsUGFnZSAtIDEpICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UgPSAoKSA9PiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlXG4gICAgZ2V0UGFnZUZvckluZGV4ID0gKGluZGV4LCBpdGVtc1BlclBhZ2UgPSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSkgPT4gTWF0aC5jZWlsKChpbmRleCArIDEpIC8gaXRlbXNQZXJQYWdlKVxuICAgIHRvdGFsUGFnZXMgPSAoKSA9PiBNYXRoLmNlaWwodGhpcy5wcm9wcy50b3RhbEl0ZW1zIC8gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpXG5cbiAgICBmaXJzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiAodGhpcy5jdXJyZW50UGFnZSgpIC0gMSkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmIChwcmV2U3RhdGUuY3VycmVudFBhZ2UgIT09IHRoaXMuY3VycmVudFBhZ2UoKSkge1xuICAgICAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzLml0ZW1fMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7XG4gICAgICAgIGNvbnN0IG9sZFByb3BzID0gdGhpcy5wcm9wcztcblxuICAgICAgICAvLyB1c2UgdHJhbnNhY3Rpb25hbCBgc2V0U3RhdGUoKWAgc3ludGF4IHRvIGVuc3VyZSB0aGF0IHBlbmRpbmcgc3RhdGUgdXBkYXRlcyBhcmUgaG9ub3JlZCxcbiAgICAgICAgLy8gbGlrZSB0aG9zZSBmcm9tIGBwYWdlVG9JbmRleCgpYFxuICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgICAgICAgICAgIC8vIE5PVEU6IGBwcm9wc2AgaGVyZSBpcyB0ZWNobmljYWxseSB0aGUgYG5leHRQcm9wc2AgeW91J2QgcmVjZWl2ZSBmcm9tIHRoZSBmaXJzdCBjV1JQIGFyZ3VtZW50XG4gICAgICAgICAgICAvLyBzbyB0aGF0J3Mgd2h5IHdlJ3JlIGNhY2hpbmcgYG9sZFByb3BzYCBvdXRzaWRlIHRoZSBgc2V0U3RhdGVgXG4gICAgICAgICAgICBpZiAocHJvcHMuaWRlbnRpZmllciAhPT0gb2xkUHJvcHMuaWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleDogMCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChzdGF0ZS50YXJnZXRJbmRleCwgcHJvcHMubnVtSXRlbXNQZXJQYWdlKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleDogc3RhdGUudGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwYWdlVG9JbmRleCA9IGkgPT4ge1xuICAgICAgICBpZiAoaSA8IDAgfHwgaSA+PSB0aGlzLnByb3BzLnRvdGFsSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYENhbm5vdCBwYWdlIHRvIGludmFsaWQgaW5kZXggJHtpfS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KGkpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IGksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZSgpO1xuICAgICAgICBjb25zdCBudW1QYWdlVG9nZ2xlcyA9IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSB0aGlzLnRvdGFsUGFnZXMoKTtcbiAgICAgICAgY29uc3Qgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSAoKGN1cnJlbnRQYWdlIC0gMSkgJSBudW1QYWdlVG9nZ2xlcyk7XG4gICAgICAgIGNvbnN0IGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyBudW1QYWdlVG9nZ2xlcyAtIDEsIHRvdGFsUGFnZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICAgaXNGdW5jdGlvbih0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUoY3VycmVudFBhZ2UsIHRvdGFsUGFnZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHtjdXJyZW50UGFnZX0gb2YgJHt0b3RhbFBhZ2VzfWAsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtc3RhdGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvRmlyc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvRmlyc3RDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkZJUlNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IDEsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1maXJzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLnByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5QUkVWSU9VUyxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IDEsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLXByZXZpb3VzJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sJyxcbiAgICAgICAgICAgICAgICAnZGF0YS1wYWdlLW51bWJlcic6IGksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGkgPT09IHRoaXMuY3VycmVudFBhZ2UoKSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5uZXh0UGFnZUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5ORVhULFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gdG90YWxQYWdlcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbmV4dCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9MYXN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0xhc3RDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkxBU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gdG90YWxQYWdlcyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWxhc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jdXN0b21Db250cm9sQ29udGVudCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5jdXN0b21Db250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdXVpZCgpLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtY3VzdG9tJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVJdGVtcygpIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtSW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgICAgICBjb25zdCBsYXN0SXRlbUluZGV4ID0gTWF0aC5taW4odGhpcy5wcm9wcy50b3RhbEl0ZW1zLCBmaXJzdEl0ZW1JbmRleCArIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SXRlbUluZGV4OyBpIDw9IGxhc3RJdGVtSW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZ2VuZXJhdGVkSXRlbXMucHVzaCh7ZGF0YTogdGhpcy5wcm9wcy5nZXRJdGVtKGkpfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVkSXRlbXM7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAodmFsdWUpID0+IHtcbiAgICAgICAgbGV0IG5leHRUYXJnZXRJbmRleDtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkZJUlNUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5QUkVWSU9VUzpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCkgLSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5ORVhUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSArIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkxBU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLnByb3BzLnRvdGFsSXRlbXMgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSBwYXJzZUludCh2YWx1ZSwgMTApICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgobmV4dFRhcmdldEluZGV4KSxcbiAgICAgICAgICAgIHRhcmdldEluZGV4OiBuZXh0VGFyZ2V0SW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcztcbiAgICAgICAgY29uc3QgaW5kZXhPZmZzZXQgPSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAqICh0aGlzLmN1cnJlbnRQYWdlKCkgLSAxKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJQXJyb3dLZXlOYXZpZ2F0aW9uXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naXRlbUxpc3QnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW1zJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZW5lcmF0ZUl0ZW1zKCkubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BpdGVtXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVG9KU1hDb252ZXJ0ZXJGdW5jPXt0aGlzLnByb3BzLml0ZW1Ub0pTWENvbnZlcnRlckZ1bmN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbj17aW5kZXggJSAyID09PSAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4PXtpbmRleE9mZnNldCArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdDb250ZW50PXt0aGlzLnByb3BzLml0ZW1Mb2FkaW5nQ29udGVudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvVUlBcnJvd0tleU5hdmlnYXRpb24+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udHJvbHMocG9zaXRpb24pIHtcbiAgICAgICAgaWYgKCAgIHRoaXMucHJvcHMuaGlkZVBhZ2VySWZOb3ROZWVkZWRcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMudG90YWxJdGVtcyA8PSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wcztcbiAgICAgICAgY29uc3QgcG9zaXRpb25Mb3dlciA9IHBvc2l0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQ2FwaXRhbGl6ZWQgPSBwb3NpdGlvbkxvd2VyWzBdLnRvVXBwZXJDYXNlKCkgKyBwb3NpdGlvbkxvd2VyLnNsaWNlKDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17YHNlZ21lbnRlZENvbnRyb2wke3Bvc2l0aW9uQ2FwaXRhbGl6ZWR9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24tY29udHJvbHMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbYHVpLXBhZ2luYXRpb24tY29udHJvbHMtJHtwb3NpdGlvbkxvd2VyfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5jcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmlldygpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQYWdpbmF0aW9uLnBvc2l0aW9ucztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0ncGFnaW5hdGVkVmlldydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXBhZ2luYXRpb24nPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkFCT1ZFIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQUJPVkUpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgKHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CRUxPVyB8fCBwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKHBvc2l0aW9uLkJFTE9XKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQYWdpbmF0aW9uLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVmlldygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZyBjb250YWluZXIgcG9zaXRpb25lZCB0byBhIHNwZWNpZmljIGFuY2hvciBlbGVtZW50LlxuICogQGNsYXNzIFVJUG9wb3ZlclxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgd2l0aG91dCBmcm9tICdsb2Rhc2gud2l0aG91dCc7XG5pbXBvcnQgdmFsdWVzIGZyb20gJ2xvZGFzaC52YWx1ZXMnO1xuXG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgU1RBUlQ6ICdTVEFSVCcsXG4gICAgICAgIE1JRERMRTogJ01JRERMRScsXG4gICAgICAgIEVORDogJ0VORCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9uVmFsdWVzID0gdmFsdWVzKFVJUG9wb3Zlci5wb3NpdGlvbilcblxuICAgIHN0YXRpYyBwcmVzZXQgPSB7XG4gICAgICAgICdBQk9WRSc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIH0sXG4gICAgICAgICdCRUxPVyc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIH0sXG4gICAgICAgICdMRUZUJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgfSxcbiAgICAgICAgJ1JJR0hUJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJlc2V0VmFsdWVzID0gdmFsdWVzKFVJUG9wb3Zlci5wcmVzZXQpXG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIGFuY2hvcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgICAgIHN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICAgIGFuY2hvclhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIGFuY2hvcllBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2FyZXRDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICBwcmVzZXQ6IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucHJlc2V0VmFsdWVzKSxcbiAgICAgICAgc2VsZlhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIHNlbGZZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IHdpdGhvdXQoT2JqZWN0LmtleXMoVUlQb3BvdmVyLnByb3BUeXBlcyksIC4uLk9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcykpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjYXJldENvbXBvbmVudDogKFxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PScwIDAgMTQgOS41JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPlxuICAgICAgICAgICAgICAgIDxnPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtYm9yZGVyJyBmaWxsPScjMDAwJyBwb2ludHM9JzcgMCAxNCAxMCAwIDEwJz48L3BvbHlnb24+XG4gICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT0ndWktcG9wb3Zlci1jYXJldC1maWxsJyBmaWxsPScjRkZGJyBwb2ludHM9JzYuOTgyMzA0NDQgMS43NSAxMi43NSAxMCAxLjI1IDEwJz48L3BvbHlnb24+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICksXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiB0cnVlLFxuICAgICAgICBwcmVzZXQ6IFVJUG9wb3Zlci5wcmVzZXQuQkVMT1csXG4gICAgICAgIHdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiAgIHByb3BzLmFuY2hvclhBbGlnbiAgfHwgcHJvcHMucHJlc2V0LmFuY2hvclhBbGlnbixcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogICBwcm9wcy5hbmNob3JZQWxpZ24gIHx8IHByb3BzLnByZXNldC5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiAgICAgcHJvcHMuc2VsZlhBbGlnbiAgICB8fCBwcm9wcy5wcmVzZXQuc2VsZlhBbGlnbixcbiAgICAgICAgICAgIHNlbGZZQWxpZ246ICAgICBwcm9wcy5zZWxmWUFsaWduICAgIHx8IHByb3BzLnByZXNldC5zZWxmWUFsaWduLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWxvZ0ludGVybmFsQ2FjaGUoaW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cgPSBpbnN0YW5jZTtcbiAgICAgICAgdGhpcy4kZGlhbG9nID0gaW5zdGFuY2UuJGRpYWxvZzsgICAgLy8gdXNlZCBpbiB0ZXN0aW5nLCBub3QgcmVsZXZhbnRcbiAgICAgICAgdGhpcy4kd3JhcHBlciA9IGluc3RhbmNlLiR3cmFwcGVyO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLypcbiAgICAgICAgICAgIEEgbnVhbmNlIGFib3V0IHRoaXMgY29tcG9uZW50OiBzaW5jZSBpdCBvbmx5IHJlbmRlcnMgYSBzaW1wbGUgPGRpdj4sIHRoZSBtYWluIHJlbmRlcigpIGZ1bmN0aW9uXG4gICAgICAgICAgICBuZXZlciBjaGFuZ2VzLiBUaGVyZWZvcmUsIHdlIG5lZWQgdG8gbWFudWFsbHkgY2FsbCBgY29tcG9uZW50RGlkVXBkYXRlYCBhZnRlciBgc2V0U3RhdGVgIHRvIHRyaWdnZXJcbiAgICAgICAgICAgIGEgZnVsbCByZS1yZW5kZXIgb2YgdGhlIGNoaWxkIGRpYWxvZy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLiRjb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuJGNvbnRhaW5lcik7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeShhbmNob3IpIHtcbiAgICAgICAgY29uc3QgYW5jaG9yUmVjdCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLmFuY2hvckxlZnQgPSBhbmNob3JSZWN0LmxlZnQ7XG4gICAgICAgIHRoaXMuYW5jaG9yVG9wID0gYW5jaG9yUmVjdC50b3A7XG4gICAgICAgIHRoaXMuYW5jaG9ySGVpZ2h0ID0gYW5jaG9yUmVjdC5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYW5jaG9yV2lkdGggPSBhbmNob3JSZWN0LndpZHRoO1xuXG4gICAgICAgIHRoaXMuYm9keUxlZnQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG4gICAgICAgIHRoaXMuYm9keVRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWCBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IGFib3ZlIG9yIGJlbG93IHRoZSBhbmNob3IgYW5kIHNlbGZYQWxpZ24gaXNuJ3QgTUlERExFXG5cbiAgICAgICAgaWYgKCAgIHNlbGZYQWxpZ24gIT09IHBvc2l0aW9uLk1JRERMRVxuICAgICAgICAgICAgJiYgKCAgIGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uRU5EXG4gICAgICAgICAgICAgICAgfHwgYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG5cbiAgICAgICAgICAgIGlmIChhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy4kd3JhcHBlci5jbGllbnRXaWR0aCAtIHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFlQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWSBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IHRvIHRoZSBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBhbmNob3IgKHN0YXJ0LGVuZCB8IGVuZCxzdGFydClcbiAgICAgICAgLy8gc2VsZllBbGlnbiBpc24ndCBNSURETEVcblxuICAgICAgICBpZiAoICAgc2VsZllBbGlnbiAhPT0gcG9zaXRpb24uTUlERExFXG4gICAgICAgICAgICAmJiAoICAgYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkRcbiAgICAgICAgICAgICAgICB8fCBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcblxuICAgICAgICAgICAgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLmFuY2hvckhlaWdodCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFkgKz0gdGhpcy4kd3JhcHBlci5jbGllbnRIZWlnaHQgLSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IHRoaXMuYW5jaG9yTGVmdCArIHRoaXMuYm9keUxlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChhbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzZWxmWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbihhbmNob3IsIGRpYWxvZyA9IHRoaXMuJHdyYXBwZXIpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IHRoaXMuYW5jaG9yVG9wICsgdGhpcy5ib2R5VG9wO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcoeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0gey4uLnRoaXMuc3RhdGV9O1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuJHdyYXBwZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuJHdyYXBwZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCB4TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3QgeU1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGlmICh4ICsgd2lkdGggPiB4TWF4KSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZEFsaWdubWVudENoYW5nZShuZXh0QWxpZ25tZW50LCBjdXJyZW50QWxpZ25tZW50ID0gdGhpcy5zdGF0ZSkge1xuICAgICAgICByZXR1cm4gICAgbmV4dEFsaWdubWVudC5hbmNob3JYQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuYW5jaG9yWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LmFuY2hvcllBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5hbmNob3JZQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuc2VsZlhBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5zZWxmWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LnNlbGZZQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuc2VsZllBbGlnbjtcbiAgICB9XG5cbiAgICBhbGlnbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gICB0aGlzLnByb3BzLmFuY2hvciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5hbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnByb3BzLmFuY2hvcik7XG5cbiAgICAgICAgdGhpcy5jYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkoYW5jaG9yKTtcblxuICAgICAgICBjb25zdCBkeCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvcikpO1xuICAgICAgICBjb25zdCBkeSA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWVBvc2l0aW9uKGFuY2hvcikpO1xuXG4gICAgICAgIGNvbnN0IGFsaWdubWVudENvcnJlY3Rpb24gPSB0aGlzLmdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKGR4LCBkeSk7XG5cbiAgICAgICAgaWYgKGFsaWdubWVudENvcnJlY3Rpb24gJiYgdGhpcy5kaWRBbGlnbm1lbnRDaGFuZ2UoYWxpZ25tZW50Q29ycmVjdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24sIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBjYXJldCBpcyBpbml0aWFsbHkgcG9zaXRpb25lZCBhdCAwLDAgaW5zaWRlIHRoZSBkaWFsb2dcbiAgICAgICAgLy8gd2hpY2ggaXMgYWxyZWFkeSBwb3NpdGlvbmVkIGF0IHRoZSBhbmNob3IsIHNvIHdlIGp1c3QgbmVlZCB0b1xuICAgICAgICAvLyBtYWtlIHNtYWxsIGFkanVzdG1lbnRzIGFzIG5lY2Vzc2FyeSB0byBsaW5lIHVwIHRoZSBjYXJldFxuICAgICAgICAvLyB3aXRoIHRoZSB2aXN1YWwgY2VudGVyIG9mIHRoZSBhbmNob3JcblxuICAgICAgICB0aGlzLiRjYXJldC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLnRvcCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0Q2FyZXRZUG9zaXRpb24oYW5jaG9yKSkgKyAncHgnO1xuXG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLiRjYXJldCwgY3gsIDApO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy4kd3JhcHBlciwgZHgsIGR5KTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRGlhbG9nKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEaWFsb2dJbnRlcm5hbENhY2hlKFxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBvcG92ZXIuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNhcmV0Q29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAobm9kZSkgPT4gKHRoaXMuJGNhcmV0ID0gbm9kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyLWNhcmV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhcmV0Q29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlclByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLndyYXBwZXJQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgLCB0aGlzLiRjb250YWluZXIpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgLz4pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqIEBjbGFzcyBVSVByb2dyZXNzXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNhbmNlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgcHJvZ3Jlc3M6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgXSksXG4gICAgICAgIHByb2dyZXNzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUHJvZ3Jlc3MucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczoge30sXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuY2FuY2VsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nY2FuY2VsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1jYW5jZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQcm9ncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVByb2dyZXNzLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3Mtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclByb2dyZXNzKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDYW5jZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogSGlkZSBjb250ZW50IHVudGlsIGl0J3MgbmVlZGVkLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBleHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25IaWRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdGVhc2VyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdGVhc2VyRXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0b2dnbGVQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgICBvbkV4cGFuZDogbm9vcCxcbiAgICAgICAgb25IaWRlOiBub29wLFxuICAgICAgICB0b2dnbGVQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1kaXNjbG9zdXJlLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLWV4cGFuZGVkJzogdGhpcy5zdGF0ZS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0ndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkID8gdGhpcy5wcm9wcy50ZWFzZXJFeHBhbmRlZCB8fCB0aGlzLnByb3BzLnRlYXNlciA6IHRoaXMucHJvcHMudGVhc2VyfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIHJhZGlvIGZvcm0gY29udHJvbC5cbiAqIEBjbGFzcyBVSVJhZGlvXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVJhZGlvIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUmFkaW8ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvblNlbGVjdGVkOiBub29wLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgdXVpZCA9IHV1aWQoKVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGVkKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgdHlwZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVJhZGlvLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2wgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBvbk9wdGlvblNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb3B0aW9uczogZnVuY3Rpb24gdmFsaWRhdGVPcHRpb25zKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYXQgbGVhc3QgdHdvIG9wdGlvbnMuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKCdzZWxlY3RlZCcgaW4gb3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG1pc3NpbmdTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHNlbGVjdGVkYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNlZW5TZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlZW5TZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzZWVuU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobXVsdGlwbGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRW5jb3VudGVyZWQgbXVsdGlwbGUgb3B0aW9ucyB3aXRoIGBzZWxlY3RlZDogdHJ1ZWAuIFRoZXJlIGNhbiBiZSBvbmx5IG9uZS4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4gdHlwZW9mIG9wdGlvbi52YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgdmFsdWVgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVNlZ21lbnRlZENvbnRyb2wucHJvcFR5cGVzKVxuICAgIHN0YXRpYyBpbnRlcm5hbENoaWxkS2V5cyA9IFtcbiAgICAgICAgJ2NvbnRlbnQnLFxuICAgICAgICAndmFsdWUnLFxuICAgICAgICAnc2VsZWN0ZWQnLFxuICAgIF1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICBvbk9wdGlvblNlbGVjdGVkOiBub29wLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbCxcbiAgICB9XG5cbiAgICBjdXJyZW50VmFsdWUoKSB7XG4gICAgICAgIGxldCB2YWx1ZTtcblxuICAgICAgICB0aGlzLnByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnNbJ29wdGlvbl8kJyArIGluZGV4XSkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0T3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBuZXh0ID0gY3VycmVudE9wdGlvbkluZGV4ICsgMTtcblxuICAgICAgICByZXR1cm4gbmV4dCA8IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggPyBuZXh0IDogMDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c09wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBjdXJyZW50T3B0aW9uSW5kZXggLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoIC0gMSA6IHByZXZpb3VzO1xuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkJsdXIob3B0aW9uLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cyA9PT0gdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkJsdXIpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICBvcHRpb24ub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25Gb2N1cyhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cztcblxuICAgICAgICBpZiAoa2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzT3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0TmV4dE9wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT3B0aW9uQ2xpY2sodGhpcy5wcm9wcy5vcHRpb25zW2FjdGl2ZUl0ZW1JbmRleF0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChkZWZpbml0aW9uLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxDaGlsZEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByb2xlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17J29wdGlvbl8kJyArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2RlZmluaXRpb24udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkZWZpbml0aW9uLmNsYXNzTmFtZV06ICEhZGVmaW5pdGlvbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17ZGVmaW5pdGlvbi5zZWxlY3RlZCA/ICcwJyA6ICctMSd9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVPcHRpb25CbHVyLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5oYW5kbGVPcHRpb25DbGljay5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZU9wdGlvbkZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgICAgICB7ZGVmaW5pdGlvbi5jb250ZW50fVxuICAgICAgICAgICAgICAgIDwvVUlCdXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlTZWdtZW50ZWRDb250cm9sLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGFyaWEtcm9sZT0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZWFjdCB3cmFwcGVyIGZvciBUYWJsZS5cbiAqIEBjbGFzcyBVSVRhYmxlXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgVGFibGUgZnJvbSAnZW5pZ21hLXRhYmxlJztcblxuZnVuY3Rpb24gZGlkQ29sdW1uc0NoYW5nZShjdXJyZW50Q29sdW1ucywgcHJldkNvbHVtbnMsIHRhYmxlSW50ZXJuYWxDb2x1bW5zKSB7XG4gICAgLypcbiAgICAgICAgMS4gdGhlcmUgc2hvdWxkIGJlIHRoZSBzYW1lIG51bWJlciBvZiBjb2x1bW5zXG4gICAgICAgIDIuIHRoZSBjb2x1bW5zIHNob3VsZCBleGFjdGx5IG1hdGNoIGluIHRoZSBwcm9wZXIgb3JkZXJcbiAgICAgICAgMy4gZWFjaCBjb2x1bW4gcHJvcGVydHkgc2hvdWxkIGJlIGV4YWN0bHkgdGhlIHNhbWVcbiAgICAgKi9cblxuICAgIGlmIChjdXJyZW50Q29sdW1ucy5sZW5ndGggIT09IHByZXZDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkaWQgdGhlIGNvbHVtbiBkZXNjcmlwdG9ycyBjaGFuZ2UgaW4gc29tZSB3YXksIG9yIGRpZCB0aGUgd2lkdGggY2hhbmdlP1xuICAgIC8vIHRoaXMgd2lsbCBhbHNvIGNhdGNoIGlmIHRoZSBvcmRlciBvZiB0aGUgY29sdW1ucyBjaGFuZ2VkIHdoZW4gY29tcGFyaW5nXG4gICAgLy8gdGhlIG1hcHBpbmcgcHJvcGVydHlcbiAgICByZXR1cm4gY3VycmVudENvbHVtbnMuc29tZSgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gICAgY29sdW1uLm1hcHBpbmcgIT09IHByZXZDb2x1bW5zW2luZGV4XS5tYXBwaW5nXG4gICAgICAgICAgICAgICB8fCBjb2x1bW4udGl0bGUgIT09IHByZXZDb2x1bW5zW2luZGV4XS50aXRsZVxuICAgICAgICAgICAgICAgfHwgY29sdW1uLnJlc2l6YWJsZSAhPT0gcHJldkNvbHVtbnNbaW5kZXhdLnJlc2l6YWJsZVxuICAgICAgICAgICAgICAgfHwgKGNvbHVtbi53aWR0aCAhPT0gdW5kZWZpbmVkICYmIGNvbHVtbi53aWR0aCAhPT0gdGFibGVJbnRlcm5hbENvbHVtbnNbaW5kZXhdLndpZHRoKTtcbiAgICB9KTtcbn1cblxuY29uc3QgY29sdW1uQ2hpbGRTcGVjID0gUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0YWc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXR0cmlidXRlczogUHJvcFR5cGVzLm9iamVjdCxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRhYmxlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWxsb3dTY3JvbGxQcm9wYWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5DaGlsZFNwZWMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5hcnJheU9mKGNvbHVtbkNoaWxkU3BlYyksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWFwcGluZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICByZXNpemFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgZml0Q29sdW1uc1RvVGFibGVXaWR0aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGdldFJvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGp1bXBUb1Jvd0luZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25BY3RpdmVSb3dDaGFuZ2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DZWxsSW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNvbHVtblJlc2l6ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uSGVhZGVyQ2VsbEludGVyYWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25Sb3dJbnRlcmFjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICB0aHJvdHRsZUludGVydmFsOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICB0b3RhbFJvd3M6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVGFibGUucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYWxsb3dTY3JvbGxQcm9wYWdhdGlvbjogZmFsc2UsXG4gICAgICAgIGNsYXNzTmFtZTogJycsXG4gICAgICAgIGZpdENvbHVtbnNUb1RhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGU6IHRydWUsXG4gICAgfVxuXG4gICAgZ2V0U3Vidmlld0NvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3cmFwcGVyOiB0aGlzLnJlZnMud3JhcHBlcixcbiAgICAgICAgICAgIGhlYWRlcjogdGhpcy5yZWZzLmhlYWRlcixcbiAgICAgICAgICAgIGJvZHk6IHRoaXMucmVmcy5ib2R5LFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd4LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgIGFyaWE6IHRoaXMucmVmcy5hcmlhLFxuXG4gICAgICAgICAgICBhY3RpdmVSb3dDaGFuZ2VkRnVuYzogdGhpcy5wcm9wcy5vbkFjdGl2ZVJvd0NoYW5nZWQsXG4gICAgICAgICAgICBhbGxvd1Njcm9sbFByb3BhZ2F0aW9uOiB0aGlzLnByb3BzLmFsbG93U2Nyb2xsUHJvcGFnYXRpb24sXG4gICAgICAgICAgICBjb2x1bW5zOiB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVGdW5jOiB0aGlzLnByb3BzLm9uQ29sdW1uUmVzaXplLFxuICAgICAgICAgICAgZml0Q29sdW1uc1RvVGFibGU6IHRoaXMucHJvcHMuZml0Q29sdW1uc1RvVGFibGVXaWR0aCxcbiAgICAgICAgICAgIGhlYWRlckNvbHVtbkNsaWNrRnVuYzogdGhpcy5wcm9wcy5vbkhlYWRlckNlbGxJbnRlcmFjdCxcbiAgICAgICAgICAgIHJvd0NsaWNrRnVuYzogdGhpcy5wcm9wcy5vblJvd0ludGVyYWN0LFxuICAgICAgICAgICAgY2VsbENsaWNrRnVuYzogdGhpcy5wcm9wcy5vbkNlbGxJbnRlcmFjdCxcbiAgICAgICAgICAgIGdldFJvdzogdGhpcy5wcm9wcy5nZXRSb3csXG4gICAgICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiB0aGlzLnByb3BzLnByZXNlcnZlU2Nyb2xsU3RhdGUsXG4gICAgICAgICAgICB0aHJvdHRsZUludGVydmFsOiB0aGlzLnByb3BzLnRocm90dGxlSW50ZXJ2YWwsXG4gICAgICAgICAgICB0b3RhbFJvd3M6IHRoaXMucHJvcHMudG90YWxSb3dzLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gbmV3IFRhYmxlKHRoaXMuZ2V0U3Vidmlld0NvbmZpZ3VyYXRpb24oKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuanVtcFRvUm93SW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy50YWJsZS5qdW1wVG9Sb3dJbmRleCh0aGlzLnByb3BzLmp1bXBUb1Jvd0luZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICAgICAgY29uc3QgY2hhbmdlZFByb3BzID0gW107XG4gICAgICAgIGxldCBrZXk7XG5cbiAgICAgICAgLyogYmlkaXJlY3Rpb25hbCBrZXkgY2hhbmdlIGRldGVjdGlvbiAqL1xuXG4gICAgICAgIGZvciAoa2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcHNba2V5XSAhPT0gcHJldlByb3BzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcHMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChrZXkgaW4gcHJldlByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJldlByb3BzW2tleV0gIT09IHByb3BzW2tleV0gJiYgY2hhbmdlZFByb3BzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcHMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZWRQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkUHJvcHMuaW5kZXhPZignanVtcFRvUm93SW5kZXgnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvKiBqdW1wVG9Sb3dJbmRleCBhbHJlYWR5IHRyaWdnZXJzIGEgcmVnZW5lcmF0aW9uLCBqdXN0IGF2b2lkaW5nIHJ1bm5pbmcgaXQgdHdpY2UgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZS5qdW1wVG9Sb3dJbmRleChwcm9wcy5qdW1wVG9Sb3dJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VkUHJvcHMubGVuZ3RoID09PSAxICYmIGNoYW5nZWRQcm9wc1swXSA9PT0gJ2NvbHVtbnMnKSB7XG4gICAgICAgICAgICAgICAgLyogZGlkIHRoaW5ncyBtYXRlcmlhbGx5IGNoYW5nZSwgb3IganVzdCB1cGRhdGluZyBhIGNvbHVtbiB3aWR0aD8gKi9cbiAgICAgICAgICAgICAgICBpZiAoZGlkQ29sdW1uc0NoYW5nZShwcm9wcy5jb2x1bW5zLCBwcmV2UHJvcHMuY29sdW1ucywgdGhpcy50YWJsZS5jb2x1bW5zKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50YWJsZS5yZWdlbmVyYXRlKHRoaXMuZ2V0U3Vidmlld0NvbmZpZ3VyYXRpb24oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJYU2Nyb2xsKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcllTY3JvbGwoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQXJpYSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJyBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3MgfHwgJ3VpLW9mZnNjcmVlbid9IGFyaWEtbGl2ZT0ncG9saXRlJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVRhYmxlLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J3VpLXRhYmxlLXdyYXBwZXIgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgIGRhdGEtc2V0LWlkZW50aWZpZXI9e3RoaXMucHJvcHMuaWRlbnRpZmllcn1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2hlYWRlcicgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInIC8+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2JvZHknIGNsYXNzTmFtZT0ndWktdGFibGUtYm9keScgLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclhTY3JvbGwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJZU2Nyb2xsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQXJpYSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRleHR1YWxJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiB0cnVlLFxuICAgICAgICBpbnB1dFByb3BzOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGlucHV0OiAnJyxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpc0ZvY3VzZWQ6IGZhbHNlLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbnB1dFZhbHVlID0gKHZhbHVlID0gJycpID0+IHRoaXMuc2V0U3RhdGUoKHN0YXRlKSA9PiAoey4uLnN0YXRlLCBpbnB1dDogdmFsdWV9KSlcblxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLmZpZWxkLnZhbHVlXG5cbiAgICBzZXRWYWx1ZShuZXh0VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKG5leHRWYWx1ZSk7XG4gICAgICAgIHRoaXMucmVmcy5maWVsZC52YWx1ZSA9IG5leHRWYWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHNpbXVsYXRlIGlucHV0IGNoYW5nZSBldmVudCBmbG93XG4gICAgICAgICAgICB0aGlzLnJlZnMuZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0Jywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgICAgICB0aGlzLnJlZnMuZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHtidWJibGVzOiB0cnVlfSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1ciA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUpID0+ICh7Li4uc3RhdGUsIGlzRm9jdXNlZDogZmFsc2V9KSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cikgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlKSA9PiAoey4uLnN0YXRlLCBpc0ZvY3VzZWQ6IHRydWV9KSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSBldmVudCA9PiB7XG4gICAgICAgIC8vIGZvciBcImNvbnRyb2xsZWRcIiBzY2VuYXJpb3MsIHVwZGF0ZXMgdG8gdGhlIGNhY2hlZCBpbnB1dCB0ZXh0IHNob3VsZCBjb21lXG4gICAgICAgIC8vIGV4Y2x1c2l2ZWx5IHZpYSBwcm9wcyAoY1dSUCkgc28gaXQgZXhhY3RseSBtaXJyb3JzIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uXG4gICAgICAgIC8vIHN0YXRlLCBvdGhlcndpc2UgYSByZS1yZW5kZXIgd2lsbCBvY2N1ciBiZWZvcmUgdGhlIG5ldyB0ZXh0IGhhcyBjb21wbGV0ZWQgaXRzXG4gICAgICAgIC8vIGZlZWRiYWNrIGxvb3AgYW5kIHRoZSBjdXJzb3IgcG9zaXRpb24gaXMgbG9zdFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQbGFjZWhvbGRlclRleHQoKSB7XG4gICAgICAgIGNvbnN0IGlzTm9uRW1wdHkgPSB0aGlzLnN0YXRlLmlucHV0ICE9PSAnJztcbiAgICAgICAgY29uc3Qgc2hvdWxkU2hvd1BsYWNlaG9sZGVyID0gICB0aGlzLnByb3BzLmhpZGVQbGFjZWhvbGRlck9uRm9jdXMgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUuaXNGb2N1c2VkID09PSBmYWxzZSAmJiBpc05vbkVtcHR5ID09PSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNOb25FbXB0eSA9PT0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHNob3VsZFNob3dQbGFjZWhvbGRlciA/IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5wbGFjZWhvbGRlciA6ICcnO1xuICAgIH1cblxuICAgIHJlbmRlclBsYWNlaG9sZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J3BsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXIgdWktdGV4dHVhbC1pbnB1dCc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0UGxhY2Vob2xkZXJUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJVGV4dHVhbElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUGxhY2Vob2xkZXIoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdmaWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBEaXN0aWxsIHJpY2ggZW50aXR5IGRhdGEgbWF0Y2hlZCB2aWEgdHlwZWFoZWFkIGlucHV0IGludG8gc2ltcGxlIHZpc3VhbCBhYnN0cmFjdGlvbnMuXG4gKiBAY2xhc3MgVUlUb2tlbml6ZWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNvbnN0IGZpcnN0ID0gYXJyYXkgPT4gYXJyYXlbMF07XG5jb25zdCBsYXN0ID0gYXJyYXkgPT4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9rZW5pemVkSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB0b2tlbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVG9rZW5pemVkSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGhhbmRsZUFkZFRva2VuOiBub29wLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IG5vb3AsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogbm9vcCxcbiAgICAgICAgdG9rZW5DbG9zZUNvbXBvbmVudDogKDxkaXY+WDwvZGl2PiksXG4gICAgICAgIHRva2VuQ2xvc2VWaXNpYmxlOiB0cnVlLFxuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyA9IHByZXZQcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkSW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmxlbmd0aCA+IHByZXZQcm9wcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgIHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRleGVzXG4gICAgICAgICAgICAmJiBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgfSAvLyBtb3ZlIGZvY3VzXG4gICAgfVxuXG4gICAgLy8gcGFzc3Rocm91Z2hzIHRvIFVJVHlwZWFoZWFkSW5wdXQgaW5zdGFuY2UgbWV0aG9kc1xuICAgIGZvY3VzID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpXG4gICAgZ2V0SW5wdXROb2RlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRJbnB1dE5vZGUoKVxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0VmFsdWUoKVxuICAgIHNlbGVjdCA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuc2VsZWN0KClcbiAgICBzZXRWYWx1ZSA9IHZhbHVlID0+IHRoaXMucmVmcy50eXBlYWhlYWQuc2V0VmFsdWUodmFsdWUpXG5cbiAgICBhZGQgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmluZGV4T2YoaW5kZXgpID09PSAtMSkgeyB0aGlzLnByb3BzLmhhbmRsZUFkZFRva2VuKGluZGV4KTsgfVxuICAgIH1cblxuICAgIHJlbW92ZShpbmRleCkge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gKEFycmF5LmlzQXJyYXkoaW5kZXgpID8gaW5kZXggOiBbaW5kZXhdKS5maWx0ZXIoaWR4ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGlkeCkgIT09IC0xO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhlcy5sZW5ndGgpIHsgdGhpcy5wcm9wcy5oYW5kbGVSZW1vdmVUb2tlbnMoaW5kZXhlcyk7IH1cbiAgICB9XG5cbiAgICBzZWxlY3RUb2tlbihpbmRleCkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBzZWxlY3RUb2tlbnMoaW5kZXhlcykge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihpbmRleGVzKTtcbiAgICB9XG5cbiAgICBzZWxlY3RQcmV2aW91c1Rva2VuKGFwcGVuZCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2VucztcblxuICAgICAgICBpZiAoICAgc2VsZWN0ZWQubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAmJiBmaXJzdChzZWxlY3RlZCkgPT09IGZpcnN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIGFscmVhZHkgYXQgbGVmdG1vc3QgYm91bmRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHsgLy8gcGljayB0aGUgcmlnaHRtb3N0XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGxhc3QoaW5kZXhlcykpO1xuICAgICAgICB9IGVsc2UgeyAvLyBhZGQgdGhlIG5leHQgbGVmdG1vc3QgdG8gYSByZWNvbnN0cnVjdGVkIFwic2VsZWN0ZWRcIiBhcnJheVxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGZpcnN0KHNlbGVjdGVkKSkgLSAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gW3ByZXZpb3VzVG9rZW5dLmNvbmNhdChzZWxlY3RlZCkgOiBbcHJldmlvdXNUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TmV4dFRva2VuKGFwcGVuZCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2VucztcblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdChzZWxlY3RlZCkgPT09IGxhc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGxhc3Qoc2VsZWN0ZWQpKSArIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBzZWxlY3RlZC5jb25jYXQobmV4dFRva2VuKSA6IFtuZXh0VG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihbXSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dEZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDM3OiAgICAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOTogICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogICAgIC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY1OiAgICAvLyBsZXR0ZXIgXCJhXCJcbiAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFja3ksIGJ1dCB0aGUgb25seSB3YXkgdW5sZXNzIHdlIG1vdmUgc2VsZWN0aW9uIG1hbmFnZW1lbnQgaW50ZXJuYWwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbih0aGlzLnByb3BzLnRva2Vucyk7XG4gICAgICAgICAgICB9IC8vIFwiY21kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5DbG9zZUNsaWNrKGluZGV4LCBldmVudCkge1xuICAgICAgICAvLyBpZiB3ZSBkb24ndCBzdG9wIHByb3BhZ2F0aW9uLCB0aGUgZXZlbnQgYnViYmxlcyBhbmQgcmVzdWx0cyBpbiBhIGZhaWxlZCB0b2tlbiBzZWxlY3Rpb25cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmUoaW5kZXgpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbkNsb3NlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2VuQ2xvc2VWaXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1jbG9zZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbih0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljay5iaW5kKHRoaXMsIGluZGV4KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5LZXlEb3duKGluZGV4LCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMTM6IC8vIGVudGVyXG4gICAgICAgIGNhc2UgMzI6IC8vIHNwYWNlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6IC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW5zJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2tlbnMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2B0b2tlbl8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmluZGV4T2YoaW5kZXgpICE9PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdFRva2VuLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVUb2tlbktleURvd24uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlUb2tlbml6ZWRJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHRoaXMucHJvcHMsIFVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0eXBlYWhlYWQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVJbnB1dENsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbkVudGl0eVNlbGVjdGVkPXt0aGlzLmFkZH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSB3cmFwcGVyIHRoYXQgZGlzcGxheXMgcHJvdmlkZWQgdGV4dCBvbiBob3Zlci5cbiAqIEBjbGFzcyBVSVRvb2x0aXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRvb2x0aXAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICAgICAgQUZURVI6ICdBRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb29sdGlwLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cG9zaXRpb259ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVG9vbHRpcC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFib3ZlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVsb3cnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFTE9XLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWZvcmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFRk9SRSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWZ0ZXInOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFGVEVSLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGRhdGEtdG9vbHRpcD17dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSB8fCB0aGlzLnByb3BzLnRleHR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBJbnRlbGxpZ2VudGx5IHJlY29tbWVuZCBlbnRpdGllcyB2aWEgY3VzdG9taXphYmxlLCBmdXp6eSByZWNvZ25pdGlvbi5cbiAqIEBjbGFzcyBVSVR5cGVhaGVhZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgZXNjYXBlciBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVRleHR1YWxJbnB1dCBmcm9tICcuLi9VSVRleHR1YWxJbnB1dCc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVHlwZWFoZWFkSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgbW9kZSA9IHtcbiAgICAgICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAgICAgJ0ZVWlpZJzogJ0ZVWlpZJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMsXG4gICAgICAgIGFsZ29yaXRobTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbWFya2VyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG1hdGNoZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSksXG4gICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBlbnRpdGllczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBoaW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaGludFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlUZXh0dWFsSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgICAgICBhbGdvcml0aG06IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogZmFsc2UsXG4gICAgICAgIGVudGl0aWVzOiBbXSxcbiAgICAgICAgaGludFByb3BzOiB7fSxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgICAgIG9uQ29tcGxldGU6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIGlkOiB1dWlkKCksXG4gICAgICAgIGlzQ29udHJvbGxlZDogaXNTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaW5wdXQ6ICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZVxuICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZVxuICAgICAgICAgICAgICAgfHwgJycsXG4gICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgIH1cblxuICAgIHVwZGF0ZUlucHV0U3RhdGUgPSAodmFsdWUgPSAnJykgPT4gdGhpcy5zZXRTdGF0ZSgoc3RhdGUpID0+ICh7Li4uc3RhdGUsIGlucHV0OiB2YWx1ZX0pKVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCAmJiAhcHJldlN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5tYXRjaGVzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0gLy8gZml4IGFuIG9kZCBidWcgaW4gRkYgd2hlcmUgaXQgaW5pdGlhbGl6ZXMgdGhlIGVsZW1lbnQgd2l0aCBhbiBpbmNvcnJlY3Qgc2Nyb2xsVG9wXG5cbiAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0gIT09IHByZXZQcm9wcy5lbnRpdGllc1twcmV2U3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGVudGl0eSA/IGVudGl0eS50ZXh0IDogJyc7XG4gICAgfVxuXG4gICAgaGFuZGxlTWF0Y2hDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAgKHN0YXRlKSA9PiAoey4uLnN0YXRlLCBzZWxlY3RlZEVudGl0eUluZGV4OiBpbmRleH0pLFxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZWxlY3RNYXRjaChkZWx0YSkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsTWF0Y2hlcyA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICBsZXQgbmV4dEluZGV4ID0gbWF0Y2hlcy5pbmRleE9mKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCkgKyBkZWx0YTtcblxuICAgICAgICBpZiAodG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IHRvdGFsTWF0Y2hlcyAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPj0gdG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gbWF0Y2hlc1tuZXh0SW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGUgPSB0aGlzLnJlZnMubWF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlWUVuZCA9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArIG1hdGNoZXNOb2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZSA9IHRoaXMucmVmc1tgbWF0Y2hfJCR7bWF0Y2hJbmRleH1gXTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlTdGFydCA9IG1hdGNoTm9kZS5vZmZzZXRUb3A7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZRW5kID0gbWF0Y2hOb2RlWVN0YXJ0ICsgbWF0Y2hOb2RlLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgLy8gYnJpbmcgaW50byB2aWV3IGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKG1hdGNoTm9kZVlFbmQgPj0gbWF0Y2hlc05vZGVZRW5kKSB7IC8vIGJlbG93XG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICs9IG1hdGNoTm9kZVlFbmQgLSBtYXRjaGVzTm9kZVlFbmQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoTm9kZVlTdGFydCA8PSBtYXRjaGVzTm9kZS5zY3JvbGxUb3ApIHsgLy8gYWJvdmVcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgPSBtYXRjaE5vZGVZU3RhcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlKSA9PiAoey4uLnN0YXRlLCBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaEluZGV4fSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRNYXRjaGVzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SW5wdXROb2RlID0gKCkgPT4gdGhpcy5yZWZzLmlucHV0LnJlZnMuZmllbGRcblxuICAgIHNlbGVjdCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gMDtcbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb2N1cyA9ICgpID0+IHRoaXMuZ2V0SW5wdXROb2RlKCkuZm9jdXMoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLmlucHV0LmdldFZhbHVlKClcblxuICAgIHNldFZhbHVlID0gKHZhbHVlID0gJycpID0+IHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUodmFsdWUpO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gICAgbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmRcbiAgICAgICAgICAgICAgICYmIG5vZGUuc2VsZWN0aW9uRW5kID09PSB0aGlzLmdldFZhbHVlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBuZWVkcyB0byBoYXBwZW4gYWZ0ZXIgdGhlIHVwY29taW5nIHJlbmRlciB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIGJ5IGBzZXRWYWx1ZWBcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5yZXNldE1hdGNoZXMsIDApO1xuICAgIH1cblxuICAgIG1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBmcmFncyA9IGVudGl0eUNvbnRlbnQuc3BsaXQobmV3IFJlZ0V4cCgnKCcgKyBlc2NhcGVyKGlucHV0KSArICcpJywgJ2lnJykpO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXNlclRleHQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmcmFncy5sZW5ndGg7XG4gICAgICAgIGxldCBpID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKGZyYWdzW2ldLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRVc2VyVGV4dCkge1xuICAgICAgICAgICAgICAgIGZyYWdzW2ldID0gPG1hcmsga2V5PXtpfSBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntmcmFnc1tpXX08L21hcms+O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdzO1xuICAgIH1cblxuICAgIG1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldE1hcmtpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndhcm5lZE1hcmtlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZE1hcmtlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWFya2VyYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXJraW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG4gICAgfVxuXG4gICAgbWFya01hdGNoU3Vic3RyaW5nID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWFya2luZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGdldEZ1enp5TWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIGZpbmRJbmRleGVzKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuICAgZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGl6ZWQpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gc2Vla01hdGNoKHJlc3VsdHMsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChpbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuXG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaGluZ0Z1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNTdHJpbmcodGhpcy5wcm9wcy5hbGdvcml0aG0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hbGdvcml0aG0gPT09IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53YXJuZWRNYXRjaGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkTWF0Y2hlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWF0Y2hlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWF0Y2hpbmcgYWxnb3JpdGhtIChGVVpaWSkuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcbiAgICB9XG5cbiAgICBnZXRNYXRjaEluZGV4ZXMgPSAoLi4uYXJncykgPT4gdGhpcy5nZXRNYXRjaGluZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGNvbXB1dGVNYXRjaGVzKHByb3ZpZGVkRW50aXRpZXMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUsIHByb3BzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRpdGllcyA9IHByb3ZpZGVkRW50aXRpZXMgfHwgcHJvcHMuZW50aXRpZXM7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBzdGF0ZS5pbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kZXhlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IG1hdGNoZXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCA+IDEpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuY3Vyc29yQXRFbmRPZklucHV0KClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goLTEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgxKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLmlucHV0LCBldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJIaW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaW50KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nLTEnPlxuICAgICAgICAgICAgICAgICAgICB7cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck1hdGNoZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcztcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIHRleHQsIC4uLnJlc3R9ID0gZW50aXR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc05hbWVdOiAhIWNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUuaW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wcywgc3RhdGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVR5cGVhaGVhZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaW50KCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUZXh0dWFsSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHByb3BzLCBVSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtzdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgcHJvcHMgbGlzdGVkIGluIHRoZSBwcm9wVHlwZXMgb2YgYSBjaGlsZCBjb21wb25lbnRcbiAqIGUuZy4gdXNlZCBpbiBVSVR5cGVhaGVhZElucHV0IHRvIGlkZW50aWZ5IHdoaWNoIHByb3BzIGFyZSBtZWFudCBmb3IgVUlUZXh0dWFsSW5wdXRcbiAqIEBtb2R1bGUgVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wc1xuICpcbiAqIEBwYXJhbSAge09iamVjdH0gcGFyZW50UHJvcHMgICAgIHByb3BzIG9mIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNoaWxkUHJvcFR5cGVzICBwcm9wVHlwZXMgb2YgdGhlIGNoaWxkIGNvbXBvbmVudFxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgcHJvcHMgdG8gYmUgc3ByZWFkIGFwcGxpZWQgdG8gYSBjaGlsZCBjb21wb25lbnRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0Q2hpbGRQcm9wcyhwYXJlbnRQcm9wcywgY2hpbGRQcm9wVHlwZXMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY2hpbGRQcm9wVHlwZXMpLnJlZHVjZSgoY2hpbGRQcm9wcywga2V5KSA9PiB7XG4gICAgICAgIGlmIChwYXJlbnRQcm9wc1trZXldKSB7XG4gICAgICAgICAgICBjaGlsZFByb3BzW2tleV0gPSBwYXJlbnRQcm9wc1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkUHJvcHM7XG4gICAgfSwge30pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgKHRlc3QpID0+IHR5cGVvZiB0ZXN0ID09PSAnZnVuY3Rpb24nXG4iLCJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdzdHJpbmcnXG4iLCIvKipcbiAqIEEgZHVtbXkgZnVuY3Rpb24gd2l0aCBubyBzaWRlIGVmZmVjdHMuIENvbW1vbmx5IHVzZWQgd2hlbiBtb2NraW5nIGludGVyZmFjZXMuXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL25vb3BcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCIvKipcbiAqIFRyaWdnZXIgbmF0aXZlIHRvYXN0cyBpbiBzdXBwb3J0aW5nIGJyb3dzZXJzLlxuICogQGNsYXNzIFVJTm90aWZpY2F0aW9uU2VydmljZVxuICovXG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL2lzU3RyaW5nJztcblxuZXhwb3J0IGNvbnN0IGVycm9ycyA9IHtcbiAgICBESVNBQkxFRDogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgY3VycmVudGx5IGRpc2FibGVkIGJ5IHVzZXIgc2V0dGluZ3MuJyxcbiAgICBOT1RfQVZBSUxBQkxFOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyxcbiAgICBDT05GSUdfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBwYXNzZWQgYSBub24tb2JqZWN0IGFzIGNvbmZpZ3VyYXRpb24uJyxcbiAgICBDT05GSUdfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBubyBjb25maWd1cmF0aW9uIHdhcyBwYXNzZWQuJyxcbiAgICBCT0RZX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBCT0RZX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSEVBREVSX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEhFQURFUl9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSUNPTl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBpY29uYCBtdXN0IGJlIGEgVVJMIHN0cmluZy4nLFxuICAgIE9OQ0xJQ0tfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgb25DbGlja2AgbXVzdCBiZSBhIGZ1bmN0aW9uLicsXG59O1xuXG5jb25zdCBOb3RpZmljYXRpb25BUEkgPSAoZnVuY3Rpb24gZGV0ZWN0U3VwcG9ydCgpIHtcbiAgICBpZiAod2luZG93Lk5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gd2luZG93Lk5vdGlmaWNhdGlvbjtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxuZnVuY3Rpb24gcmVxdWVzdFBlcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgTm90aWZpY2F0aW9uQVBJLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uIHJlcXVlc3RSZWNlaXZlcihzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdncmFudGVkJyB8fCBzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5OT1RfQVZBSUxBQkxFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgncGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5wZXJtaXNzaW9uKSB7XG4gICAgICAgICAgICBjYXNlICdncmFudGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlICdkZW5pZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICgnY2hlY2tQZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLmNoZWNrUGVybWlzc2lvbigpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3RpZnkoY29uZmlnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNvbmZpZykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmJvZHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb25maWcuYm9keSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5oZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbmZpZy5oZWFkZXIpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5pY29uICE9PSB1bmRlZmluZWQgJiYgaXNTdHJpbmcoY29uZmlnLmljb24pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSUNPTl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcub25DbGljayAhPT0gdW5kZWZpbmVkICYmIGlzRnVuY3Rpb24oY29uZmlnLm9uQ2xpY2spID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuT05DTElDS19UWVBFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrUGVybWlzc2lvbigpLnRoZW4oXG4gICAgICAgICAgICBmdW5jdGlvbiBzcGF3bldlYk5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uQVBJKGNvbmZpZy5oZWFkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogY29uZmlnLmJvZHksXG4gICAgICAgICAgICAgICAgICAgIGljb246IGNvbmZpZy5pY29uLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLm9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlnLm9uQ2xpY2spO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9KTtcbn1cbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHlcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwcm9wZXJ0eSBrZXkgKGUuZy4gYFdlYmtpdFRyYW5zZm9ybWAsIGBtc1RyYW5zZm9ybWApXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIGRldGVjdFRyYW5zZm9ybVByb3BlcnR5KCkge1xuICAgIGNvbnN0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgICAgICd3ZWJraXQtdHJhbnNmb3JtJywgLy8gdXNlZCBpbiBKU0RPTVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb3BzW2ldIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICpcbiAqIEBleGFtcGxlXG4gKiB1dWlkKCk7IC8vIDFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgcmV0dXJuIChbMWU3XSstMWUzKy00ZTMrLThlMystMWUxMSkucmVwbGFjZSgvWzAxOF0vZyxhPT4oYV5NYXRoLnJhbmRvbSgpKjE2Pj5hLzQpLnRvU3RyaW5nKDE2KSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xufVxuIiwiLyoqXG4gKiBVc2VkIHRvIGNyZWF0ZSBhbiBFUzUtY29tcGF0aWJsZSBzdGFuZGFsb25lIGJ1aWxkLCBhbmQgc28gaXQncyBwb3NzaWJsZSB0byBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JylgYFxuICogYW5kIGRpcmVjdGx5IHVzZSBhIGNvbXBvbmVudCBsaWtlOiBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JykuVUlCdXR0b25gXG4gKi9cblxuZ2xvYmFsLlVJS2l0ID0ge307XG5nbG9iYWwuVUlLaXQuVUlVdGlscyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBVSUFycm93S2V5TmF2aWdhdGlvbjogKGdsb2JhbC5VSUtpdC5VSUFycm93S2V5TmF2aWdhdGlvbiA9IHJlcXVpcmUoJy4vVUlBcnJvd0tleU5hdmlnYXRpb24nKS5kZWZhdWx0KSxcbiAgICBVSUJ1dHRvbjogKGdsb2JhbC5VSUtpdC5VSUJ1dHRvbiA9IHJlcXVpcmUoJy4vVUlCdXR0b24nKS5kZWZhdWx0KSxcbiAgICBVSUNoZWNrYm94OiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3ggPSByZXF1aXJlKCcuL1VJQ2hlY2tib3gnKS5kZWZhdWx0KSxcbiAgICBVSUNoZWNrYm94R3JvdXA6IChnbG9iYWwuVUlLaXQuVUlDaGVja2JveEdyb3VwID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94R3JvdXAnKS5kZWZhdWx0KSxcbiAgICBVSURpYWxvZzogKGdsb2JhbC5VSUtpdC5VSURpYWxvZyA9IHJlcXVpcmUoJy4vVUlEaWFsb2cnKS5kZWZhdWx0KSxcbiAgICBVSUZpdHRlZFRleHQ6IChnbG9iYWwuVUlLaXQuVUlGaXR0ZWRUZXh0ID0gcmVxdWlyZSgnLi9VSUZpdHRlZFRleHQnKS5kZWZhdWx0KSxcbiAgICBVSUltYWdlOiAoZ2xvYmFsLlVJS2l0LlVJSW1hZ2UgPSByZXF1aXJlKCcuL1VJSW1hZ2UnKS5kZWZhdWx0KSxcbiAgICBVSU1vZGFsOiAoZ2xvYmFsLlVJS2l0LlVJTW9kYWwgPSByZXF1aXJlKCcuL1VJTW9kYWwnKS5kZWZhdWx0KSxcbiAgICBVSVBhZ2luYXRpb246IChnbG9iYWwuVUlLaXQuVUlQYWdpbmF0aW9uID0gcmVxdWlyZSgnLi9VSVBhZ2luYXRpb24nKS5kZWZhdWx0KSxcbiAgICBVSVBvcG92ZXI6IChnbG9iYWwuVUlLaXQuVUlQb3BvdmVyID0gcmVxdWlyZSgnLi9VSVBvcG92ZXInKS5kZWZhdWx0KSxcbiAgICBVSVByb2dyZXNzOiAoZ2xvYmFsLlVJS2l0LlVJUHJvZ3Jlc3MgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3MnKS5kZWZhdWx0KSxcbiAgICBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZTogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzaXZlRGlzY2xvc3VyZSA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUnKS5kZWZhdWx0KSxcbiAgICBVSVJhZGlvOiAoZ2xvYmFsLlVJS2l0LlVJUmFkaW8gPSByZXF1aXJlKCcuL1VJUmFkaW8nKS5kZWZhdWx0KSxcbiAgICBVSVNlZ21lbnRlZENvbnRyb2w6IChnbG9iYWwuVUlLaXQuVUlTZWdtZW50ZWRDb250cm9sID0gcmVxdWlyZSgnLi9VSVNlZ21lbnRlZENvbnRyb2wnKS5kZWZhdWx0KSxcbiAgICBVSVRhYmxlOiAoZ2xvYmFsLlVJS2l0LlVJVGFibGUgPSByZXF1aXJlKCcuL1VJVGFibGUnKS5kZWZhdWx0KSxcbiAgICBVSVRva2VuaXplZElucHV0OiAoZ2xvYmFsLlVJS2l0LlVJVG9rZW5pemVkSW5wdXQgPSByZXF1aXJlKCcuL1VJVG9rZW5pemVkSW5wdXQnKS5kZWZhdWx0KSxcbiAgICBVSVRleHR1YWxJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVRleHR1YWxJbnB1dCA9IHJlcXVpcmUoJy4vVUlUZXh0dWFsSW5wdXQnKS5kZWZhdWx0KSxcbiAgICBVSVRvb2x0aXA6IChnbG9iYWwuVUlLaXQuVUlUb29sdGlwID0gcmVxdWlyZSgnLi9VSVRvb2x0aXAnKS5kZWZhdWx0KSxcbiAgICBVSVR5cGVhaGVhZElucHV0OiAoZ2xvYmFsLlVJS2l0LlVJVHlwZWFoZWFkSW5wdXQgPSByZXF1aXJlKCcuL1VJVHlwZWFoZWFkSW5wdXQnKS5kZWZhdWx0KSxcbiAgICBVSVV0aWxzOiB7XG4gICAgICAgIGV4dHJhY3RDaGlsZFByb3BzOiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMuZXh0cmFjdENoaWxkUHJvcHMgPSByZXF1aXJlKCcuL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnKS5kZWZhdWx0KSxcbiAgICAgICAgbm90aWZ5OiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMubm90aWZ5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL25vdGlmeScpLmRlZmF1bHQpLFxuICAgICAgICB0cmFuc2Zvcm1Qcm9wZXJ0eTogKGdsb2JhbC5VSUtpdC5VSVV0aWxzLnRyYW5zZm9ybVByb3BlcnR5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JykuZGVmYXVsdCksXG4gICAgICAgIHV1aWQ6IChnbG9iYWwuVUlLaXQuVUlVdGlscy51dWlkID0gcmVxdWlyZSgnLi9VSVV0aWxzL3V1aWQnKS5kZWZhdWx0KSxcbiAgICB9LFxufTtcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiLyoqXG4gKiBBIGhpZ2gtcGVyZm9ybWFuY2UsIGluZmluaXRlIHRhYmxlIHZpZXcuXG4gKi9cblxuaW1wb3J0IGZ3IGZyb20gJy4vdXRpbHMvZmluZFdoZXJlJztcbmltcG9ydCB0cCBmcm9tICcuL3V0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcblxuZXhwb3J0IGNvbnN0IElOSVRJQUxJWkVEID0gJ3VpLXRhYmxlLWluaXRpYWxpemVkJztcbmV4cG9ydCBjb25zdCBIRUFERVJfQ0VMTCA9ICd1aS10YWJsZS1oZWFkZXItY2VsbCc7XG5leHBvcnQgY29uc3QgSEVBREVSX0NFTExfSEFORExFID0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnO1xuZXhwb3J0IGNvbnN0IENFTEwgPSAndWktdGFibGUtY2VsbCc7XG5leHBvcnQgY29uc3QgQ0VMTF9FVkVOID0gJ3VpLXRhYmxlLWNlbGwtZXZlbic7XG5leHBvcnQgY29uc3QgQ0VMTF9PREQgPSAndWktdGFibGUtY2VsbC1vZGQnO1xuZXhwb3J0IGNvbnN0IENFTExfSU5ORVIgPSAndWktdGFibGUtY2VsbC1pbm5lcic7XG5leHBvcnQgY29uc3QgUk9XID0gJ3VpLXRhYmxlLXJvdyc7XG5leHBvcnQgY29uc3QgUk9XX0VWRU4gPSAndWktdGFibGUtcm93LWV2ZW4nO1xuZXhwb3J0IGNvbnN0IFJPV19PREQgPSAndWktdGFibGUtcm93LW9kZCc7XG5leHBvcnQgY29uc3QgUk9XX0FDVElWRSA9ICd1aS10YWJsZS1yb3ctYWN0aXZlJztcbmV4cG9ydCBjb25zdCBST1dfTE9BRElORyA9ICd1aS10YWJsZS1yb3ctbG9hZGluZyc7XG5leHBvcnQgY29uc3QgWF9TQ1JPTExfVFJBQ0sgPSAndWktdGFibGUteC1zY3JvbGwtdHJhY2snO1xuZXhwb3J0IGNvbnN0IFlfU0NST0xMX1RSQUNLID0gJ3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJztcblxuY29uc3QgaXNPYmplY3QgPSAodGVzdCkgPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRlc3QpID09PSAnW29iamVjdCBPYmplY3RdJztcbmNvbnN0IG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuXG4vKlxuXG5GT1IgRlVUVVJFIEVZRVNcblxuU2Nyb2xsIHBlcmZvcm1hbmNlIGlzIGEgdHJpY2t5IGJlYXN0IC0tIG1vcmVzbyB3aGVuIHRyeWluZyB0byBtYWludGFpbiA1MCsgRlBTIGFuZCBwdW1waW5nIGEgbG90IG9mIGRhdGEgdG8gdGhlIERPTS4gVGhlcmUgYXJlIGEgbG90IG9mIGNob2ljZXMgaW4gdGhpcyBjb21wb25lbnQgdGhhdCBtYXkgc2VlbSBvZGQgYXQgZmlyc3QgYmx1c2gsIGJ1dCBsZXQgaXQgYmUga25vd24gdGhhdCB3ZSB0cmllZCB0byBkbyBpdCB0aGUgUmVhY3QgV2F54oSiIGFuZCBpdCB3YXMgbm90IHBlcmZvcm1hbnQgZW5vdWdoLlxuXG5UaGUgY29tYmluYXRpb24gdGhhdCB3YXMgc2V0dGxlZCB1cG9uIGlzIGEgUmVhY3Qgc2hlbGwgd2l0aCBuYXRpdmUgRE9NIGd1dHMuIFRoaXMgY29tYmluYXRpb24geWllbGRzIHRoZSBiZXN0IHBlcmZvcm1hbmNlLCB3aGlsZSBzdGlsbCBiZWluZyBwZXJmZWN0bHkgaW50ZXJvcGVyYWJsZSB3aXRoIHRoZSByZXN0IG9mIFVJS2l0IGFuZCBSZWFjdCB1c2UgY2FzZXMuXG5cbl9fSW1wb3J0YW50IE5vdGVfX1xuXG5BbnkgdGltZSB5b3UgY3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQsIG1ha2Ugc3VyZSB5b3UgcmVsZWFzZSBpdCBhZnRlciBieSBzZXR0aW5nIGl0cyB2YXJpYWJsZSB0byBgbnVsbGAuIElmIHlvdSBkb24ndCwgaXQnbGwgY3JlYXRlIGEgbWVtb3J5IGxlYWsuIEFsc28sIG1ha2Ugc3VyZSBhbGwgZ2VuZXJhdGVkIERPTSBpcyByZW1vdmVkIG9uIGNvbXBvbmVudFdpbGxVbm1vdW50LlxuXG5cbk9SREVSIE9GIE9QRVJBVElPTlNcblxuMS4gcmVuZGVyIG9uZSByb3cgb2YgY2VsbHNcbjIuIGNhcHR1cmUgdGFibGUgJiBjZWxsIHNpemluZyBtZXRyaWNzXG4zLiByZW5kZXIgY29sdW1uIGhlYWRzIGFuZCB0aGUgcmVzdCBvZiB0aGUgY2VsbHNcblxuSWYgdGhlIGNvbXBvbmVudCB1cGRhdGVzIGR1ZSB0byBuZXcgcHJvcHMsIGp1c3QgYmxvdyBhd2F5IGV2ZXJ5dGhpbmcgYW5kIHN0YXJ0IG92ZXIuIEl0J3MgY2hlYXBlciB0aGFuIHRyeWluZyB0byBkaWZmLlxuXG4qL1xuXG5mdW5jdGlvbiBhcHBseURlbHRhKGRlbHRhLCBudW0pIHtcbiAgICBpZiAoZGVsdGEgPCAwKSB7XG4gICAgICAgIHJldHVybiBudW0gPCAwID8gbnVtIC0gZGVsdGEgOiBudW0gKyBkZWx0YTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVtIC0gZGVsdGE7XG59XG5cbmZ1bmN0aW9uIGdldEtleUZyb21LZXlDb2RlKGNvZGUpIHtcbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlIDE5MjpcbiAgICAgICAgcmV0dXJuICdFc2NhcGUnO1xuXG4gICAgY2FzZSA0MDpcbiAgICAgICAgcmV0dXJuICdBcnJvd0Rvd24nO1xuXG4gICAgY2FzZSAzODpcbiAgICAgICAgcmV0dXJuICdBcnJvd1VwJztcblxuICAgIGNhc2UgMTM6XG4gICAgICAgIHJldHVybiAnRW50ZXInO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGUzZCh4ID0gMCwgeSA9IDApIHtcbiAgICByZXR1cm4gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMHB4KSc7XG59IC8vIHogaXMgbmV2ZXIgdXNlZFxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIERPTSBjZWxsLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gIGNvbnRlbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gIG1hcHBpbmdcbiAqIEBwYXJhbSAge251bWJlcn0gIHdpZHRoXG4gKiBAcGFyYW0gIHtudW1iZXJ9ICBpbmRleFxuICpcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoLCBpbmRleCkge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNlbGwuY2xhc3NOYW1lID0gQ0VMTDtcbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoaW5kZXggJSAyID09PSAwID8gQ0VMTF9FVkVOIDogQ0VMTF9PREQpO1xuXG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJywgbWFwcGluZyk7XG5cbiAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSBDRUxMX0lOTkVSO1xuXG4gICAgY29uc3QgdGV4dF9ub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCk7XG4gICAgICAgICAgdGV4dC5hcHBlbmRDaGlsZCh0ZXh0X25vZGUpO1xuXG4gICAgY2VsbC5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiBjZWxsO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgc2ltcGxlIG9iamVjdCBET00gc3BlYyBpbnRvIGVxdWl2YWxlbnQgRE9NIG5vZGUocykuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICBvcHRpb25zLnRhZ1xuICogQHBhcmFtICB7b2JqZWN0fSAgICAgICBvcHRpb25zLmF0dHJpYnV0ZXMgICAtIEhUTUwgYXR0cmlidXRlcyB0aGF0IG11c3QgYmUgc2V0IHZpYSBgc2V0QXR0cmlidXRlKClgLCBlLmcuIGBkYXRhLSpgXG4gKiBAcGFyYW0gIHsqfSAgICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4gICAgIC0gc2hvdWxkIGJlIGEgc3RyaW5nLCBET00gc3BlYywgb3IgYXJyYXkgb2YgRE9NIHNwZWNzO1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbCBvdGhlciBpbnB1dCB3aWxsIGJlIHN0cmluZ2lmaWVkXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgIG9wdGlvbnMucHJvcGVydGllcyAgIC0gcHJvcGVydGllcyB0byBiZSBleHBsaWNpdGx5IHNldCwgZS5nLiBgY2xhc3NOYW1lYFxuICpcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBzcGVjVG9ET00oe3RhZyA9ICdkaXYnLCBhdHRyaWJ1dGVzID0ge30sIGNoaWxkcmVuLCAuLi5wcm9wZXJ0aWVzfSkge1xuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG5cbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChrZXkpID0+IG5vZGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKSk7XG4gICAgT2JqZWN0LmtleXMocHJvcGVydGllcykuZm9yRWFjaCgoa2V5KSA9PiAobm9kZVtrZXldID0gcHJvcGVydGllc1trZXldKSk7XG5cbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKHNwZWMgPT4gbm9kZS5hcHBlbmRDaGlsZChzcGVjVG9ET00oc3BlYykpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChjaGlsZHJlbikpIHtcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoc3BlY1RvRE9NKGNoaWxkcmVuKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhjaGlsZHJlbikpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGhlYWRlciBjZWxsIHdpdGggcmVzaXplIGhhbmRsZSBhbmQgb3B0aW9uYWwgY2hpbGRyZW4gYXMgZGVmaW5lZCBieSB0aGUgb2JqZWN0IERPTSBEU0wuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgY29sdW1uXG4gKiBAcGFyYW0gIHsqfSAgICAgICBjb2x1bW4uY2hpbGRyZW4gICAgLSBzaG91bGQgYmUgYSBzdHJpbmcsIERPTSBzcGVjLCBvciBhcnJheSBvZiBET00gc3BlY3M7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGwgb3RoZXIgaW5wdXQgd2lsbCBiZSBzdHJpbmdpZmllZFxuICogQHBhcmFtICB7c3RyaW5nfSAgY29sdW1uLm1hcHBpbmdcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGNvbHVtbi5yZXNpemFibGVcbiAqIEBwYXJhbSAge3N0cmluZ30gIGNvbHVtbi50aXRsZVxuICogQHBhcmFtICB7bnVtYmVyfSAgd2lkdGhcbiAqIEBwYXJhbSAge251bWJlcn0gIGluZGV4XG4gKlxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURPTUhlYWRlckNlbGwoY29sdW1uLCB3aWR0aCwgaW5kZXgpIHtcbiAgICBjb25zdCBjZWxsID0gY3JlYXRlRE9NQ2VsbChjb2x1bW4udGl0bGUsIGNvbHVtbi5tYXBwaW5nLCB3aWR0aCwgaW5kZXgpO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChIRUFERVJfQ0VMTCk7XG5cbiAgICBpZiAoY29sdW1uLmNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbi5jaGlsZHJlbikpIHtcbiAgICAgICAgICAgIGNvbHVtbi5jaGlsZHJlbi5mb3JFYWNoKHNwZWMgPT4gY2VsbC5hcHBlbmRDaGlsZChzcGVjVG9ET00oc3BlYykpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChjb2x1bW4uY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBjZWxsLmFwcGVuZENoaWxkKHNwZWNUb0RPTShjb2x1bW4uY2hpbGRyZW4pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoU3RyaW5nKGNvbHVtbi5jaGlsZHJlbikpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2x1bW4ucmVzaXphYmxlKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICBoYW5kbGUuY2xhc3NOYW1lID0gSEVBREVSX0NFTExfSEFORExFO1xuXG4gICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoaGFuZGxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyQ2VsbChtZXRhZGF0YSwgaW5kZXgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NSGVhZGVyQ2VsbChtZXRhZGF0YSwgbWV0YWRhdGEud2lkdGgsIGluZGV4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfbWV0YWRhdGEnOiBtZXRhZGF0YSxcbiAgICAgICAgJ190aXRsZSc6IG1ldGFkYXRhLnRpdGxlLFxuICAgICAgICBnZXQgdGl0bGUoKSB7IHJldHVybiB0aGlzLl90aXRsZTsgfSxcbiAgICAgICAgc2V0IHRpdGxlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fdGl0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX3RpdGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogbWV0YWRhdGEud2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWFwcGluZzogbWV0YWRhdGEubWFwcGluZyxcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoLCBpbmRleCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoLCBpbmRleCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnX3RleHROb2RlJzogbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzID8gbm9kZS5jaGlsZE5vZGVzWzBdIDogbm9kZS5jaGlsZHJlblswXS5jaGlsZE5vZGVzWzBdLFxuICAgICAgICAnX2NvbnRlbnQnOiBjb250ZW50LFxuICAgICAgICBnZXQgY29udGVudCgpIHsgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7IH0sXG4gICAgICAgIGdldFRleHRUb0JlUmVuZGVyZWQ6IGZ1bmN0aW9uIGdldFRleHRUb0JlUmVuZGVyZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50IHx8ICcnOyAvLyBkbyBub3QgcmVuZGVyIG51bGwvdW5kZWZpbmVkXG4gICAgICAgIH0sXG4gICAgICAgIHNldCBjb250ZW50KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fY29udGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5nZXRUZXh0VG9CZVJlbmRlcmVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0cnVlV2lkdGg6IGZ1bmN0aW9uIHRydWVXaWR0aCgpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ2xhc3NlcyA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWU7XG5cbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJycpO1xuXG4gICAgICAgICAgICAvLyB0YWtlIG9mZiB0aGUgaW5uZXIgY2xhc3Mgd2hpY2ggaXMgd2hhdCBjYXVzZXMgdGhlIHNpemluZyBjb25zdHJhaW50XG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gJyc7XG5cbiAgICAgICAgICAgIC8qIENhcHR1cmUgdGhlIG5ldyBhZGp1c3RlZCBzaXplLCBoYXZlIHRvIHVzZSB0aGUgaGFyZCB3YXkgYmVjYXVzZSAuY2xpZW50V2lkdGggcmV0dXJucyBhbiBpbnRlZ2VyIHZhbHVlLCByYXRoZXIgdGhhbiB0aGUgX2FjdHVhbF8gd2lkdGguIFNNSC4gKi9cbiAgICAgICAgICAgIGNvbnN0IG5ld1dpZHRoID0gdGhpcy5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG4gICAgICAgICAgICAvLyBQdXQgZXZlcnl0aGluZyBiYWNrXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWUgPSBjaGlsZENsYXNzZXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdXaWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVET01Sb3coc2V0SW5kZXgsIHkpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICByb3cuY2xhc3NOYW1lID0gUk9XO1xuICAgICAgICAgIHJvdy5zdHlsZVt0cF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcblxuICAgIHJldHVybiByb3c7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdyhtZXRhZGF0YSwgY29sdW1ucykge1xuICAgIC8qIElNUE9SVEFOVCBOT1RFOiBtZXRhZGF0YS5kYXRhIG1pZ2h0IGJlIGEgcHJvbWlzZS4gUGxhbiBhY2NvcmRpbmdseS4gKi9cblxuICAgIGNvbnN0IHJvdyA9IGNyZWF0ZURPTVJvdyhtZXRhZGF0YS5zZXRJbmRleCwgbWV0YWRhdGEueSk7XG4gICAgY29uc3QgY2VsbHMgPSBbXTtcblxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICBjZWxscy5wdXNoKGNyZWF0ZUNlbGwoJycsIGNvbHVtbi5tYXBwaW5nLCBjb2x1bW4ud2lkdGgsIGluZGV4KSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNlbGxzW2luZGV4XS5ub2RlKTtcbiAgICB9KTtcblxuICAgIHJvdy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgZnJhZ21lbnQgPSBudWxsO1xuXG4gICAgY29uc3Qgcm93T2JqID0ge1xuICAgICAgICBub2RlOiByb3csXG4gICAgICAgIGNlbGxzOiBjZWxscyxcbiAgICAgICAgJ19pdGVyYXRvcic6IG51bGwsXG4gICAgICAgICdfYWN0aXZlJzogZmFsc2UsXG4gICAgICAgIGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmU7IH0sXG4gICAgICAgIHNldCBhY3RpdmUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHRoaXMubm9kZS5jbGFzc0xpc3QuY29udGFpbnMoUk9XX0FDVElWRSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKFJPV19BQ1RJVkUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbCAmJiB0aGlzLm5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFJPV19BQ1RJVkUpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKFJPV19BQ1RJVkUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19zZXRJbmRleCc6IG51bGwsXG4gICAgICAgIGdldCBzZXRJbmRleCgpIHsgcmV0dXJuIHRoaXMuX3NldEluZGV4OyB9LFxuICAgICAgICBzZXQgc2V0SW5kZXgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9zZXRJbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKFJPV19FVkVOKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoUk9XX09ERCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoUk9XX09ERCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKFJPV19FVkVOKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgdmFsKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEluZGV4ID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dhaXRpbmdGb3JSZXNvbHV0aW9uJzogZmFsc2UsXG4gICAgICAgIGdldCB3YWl0aW5nRm9yUmVzb2x1dGlvbigpIHsgcmV0dXJuIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uOyB9LFxuICAgICAgICBzZXQgd2FpdGluZ0ZvclJlc29sdXRpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB0aGlzLm5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFJPV19MT0FESU5HKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoUk9XX0xPQURJTkcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbCAmJiB0aGlzLm5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFJPV19MT0FESU5HKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZShST1dfTE9BRElORyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX2RhdGEnOiBudWxsLFxuICAgICAgICBnZXQgZGF0YSgpIHsgcmV0dXJuIHRoaXMuX2RhdGE7IH0sXG4gICAgICAgIHNldCBkYXRhKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gbnVsbCB8fCB0aGlzLl9kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldFJvd0RhdGEocHJvbWlzZSwgcmVzb2x2ZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNvbHZlZFZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5fZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX2RhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSB0aGlzLl9kYXRhW3RoaXMuX2l0ZXJhdG9yXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbY29sdW1uc1t0aGlzLl9pdGVyYXRvcl0ubWFwcGluZ107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfeSc6IG1ldGFkYXRhLnksXG4gICAgICAgIGdldCB5KCkgeyByZXR1cm4gdGhpcy5feTsgfSxcbiAgICAgICAgc2V0IHkodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGVbdHBdID0gdHJhbnNsYXRlM2QoMCwgdGhpcy5feSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIFNldHRpbmcgaXQgc2VwYXJhdGVseSB0byBoYXZlIHRoZSBjbGFzc2VzIGFkZGVkIGF1dG9tYXRpY2FsbHlcbiAgICByb3dPYmouc2V0SW5kZXggPSBtZXRhZGF0YS5zZXRJbmRleDtcbiAgICByb3dPYmouYWN0aXZlID0gbWV0YWRhdGEuYWN0aXZlO1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHNvIHRoZSBQcm9taXNlIGhhbmRsaW5nIGNhbiB0YWtlIHBsYWNlIGlmIG5lZWRlZC4uLlxuICAgIHJvd09iai5kYXRhID0gbWV0YWRhdGEuZGF0YTtcblxuICAgIHJldHVybiByb3dPYmo7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29sdW1uU2hhcGUoY29sdW1uKSB7XG4gICAgcmV0dXJuICAgIHR5cGVvZiBjb2x1bW4ubWFwcGluZyA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgJiYgdHlwZW9mIGNvbHVtbi5yZXNpemFibGUgPT09ICdib29sZWFuJ1xuICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnRpdGxlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAmJiAoY29sdW1uLndpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGNvbHVtbi53aWR0aCA9PT0gJ251bWJlcicpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNvbmZpZ3VyYXRpb24oYykge1xuICAgIGlmICghKGMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgd3JhcHBlcmAgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShjLmhlYWRlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgaGVhZGVyYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGMuYm9keSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgYm9keWAgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShjWyd4LXNjcm9sbC10cmFjayddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC10cmFja2AgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShjWyd5LXNjcm9sbC10cmFjayddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB5LXNjcm9sbC10cmFja2AgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShjWyd4LXNjcm9sbC1oYW5kbGUnXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeC1zY3JvbGwtaGFuZGxlYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGNbJ3ktc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB5LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoYy5hcmlhIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBhcmlhYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICggICBBcnJheS5pc0FycmF5KGMuY29sdW1ucykgPT09IGZhbHNlXG4gICAgICAgIHx8IGMuY29sdW1ucy5sZW5ndGggPT09IDBcbiAgICAgICAgfHwgYy5jb2x1bW5zLmV2ZXJ5KHZhbGlkYXRlQ29sdW1uU2hhcGUpID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBFcnJvcihgVGFibGUgd2FzIG5vdCBwYXNzZWQgdmFsaWQgXFxgY29sdW1uc1xcYC4gSXQgc2hvdWxkIGJlIGFuIGFycmF5IHdpdGggYXQgbGVhc3Qgb25lIG9iamVjdCBjb25mb3JtaW5nIHRvOiB7XG4gICAgICAgICAgICBtYXBwaW5nOiBzdHJpbmcsXG4gICAgICAgICAgICByZXNpemFibGU6IGJvb2wsXG4gICAgICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICAgICAgd2lkdGg6IG51bWJlciAob3B0aW9uYWwpLFxuICAgICAgICB9YCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjLnRocm90dGxlSW50ZXJ2YWwgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB0aHJvdHRsZUludGVydmFsYDsgaXQgc2hvdWxkIGJlIGEgTnVtYmVyLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYy50b3RhbFJvd3MgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB0b3RhbFJvd3NgOyBpdCBzaG91bGQgYmUgYSBOdW1iZXIuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjLmdldFJvdyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgZ2V0Um93YDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKGMuYWN0aXZlUm93Q2hhbmdlZEZ1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYy5hY3RpdmVSb3dDaGFuZ2VkRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgYWN0aXZlUm93Q2hhbmdlZEZ1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoYy5oZWFkZXJDb2x1bW5DbGlja0Z1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYy5oZWFkZXJDb2x1bW5DbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGhlYWRlckNvbHVtbkNsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmIChjLnJvd0NsaWNrRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjLnJvd0NsaWNrRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgcm93Q2xpY2tGdW5jYDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKGMuY2VsbENsaWNrRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjLmNlbGxDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGNlbGxDbGlja0Z1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoYy5jb2x1bW5SZXNpemVGdW5jICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGMuY29sdW1uUmVzaXplRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgY29sdW1uUmVzaXplRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYy5hbGxvd1Njcm9sbFByb3BhZ2F0aW9uICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGFsbG93U2Nyb2xsUHJvcGFnYXRpb25gOyBpdCBzaG91bGQgYmUgYSBib29sZWFuLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYy5maXRDb2x1bW5zVG9UYWJsZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBmaXRDb2x1bW5zVG9UYWJsZWA7IGl0IHNob3VsZCBiZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjLnByZXNlcnZlU2Nyb2xsU3RhdGUgIT09ICdib29sZWFuJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgcHJlc2VydmVTY3JvbGxTdGF0ZWA7IGl0IHNob3VsZCBiZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSB7XG4gICAgX3Byb2Nlc3NDb25maWd1cmF0aW9uKHtcbiAgICAgICAgYWxsb3dTY3JvbGxQcm9wYWdhdGlvbiA9IGZhbHNlLFxuICAgICAgICBmaXRDb2x1bW5zVG9UYWJsZSA9IGZhbHNlLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlID0gdHJ1ZSxcbiAgICAgICAgdGhyb3R0bGVJbnRlcnZhbCA9IDMwMCxcbiAgICAgICAgdG90YWxSb3dzID0gMCxcbiAgICAgICAgLi4ub3RoZXJzLFxuICAgIH0pIHtcbiAgICAgICAgdmFsaWRhdGVDb25maWd1cmF0aW9uKFxuICAgICAgICAgICAgKHRoaXMuYyA9IHtcbiAgICAgICAgICAgICAgICBhbGxvd1Njcm9sbFByb3BhZ2F0aW9uLFxuICAgICAgICAgICAgICAgIGZpdENvbHVtbnNUb1RhYmxlLFxuICAgICAgICAgICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGUsXG4gICAgICAgICAgICAgICAgdGhyb3R0bGVJbnRlcnZhbCxcbiAgICAgICAgICAgICAgICB0b3RhbFJvd3MsXG4gICAgICAgICAgICAgICAgLi4ub3RoZXJzLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKTtcblxuICAgICAgICB0aGlzLmJvZHkgPSB0aGlzLmMuYm9keTtcbiAgICAgICAgdGhpcy5ib2R5X3N0eWxlID0gdGhpcy5ib2R5LnN0eWxlO1xuICAgICAgICB0aGlzLmhlYWRlciA9IHRoaXMuYy5oZWFkZXI7XG4gICAgICAgIHRoaXMuaGVhZGVyX3N0eWxlID0gdGhpcy5oZWFkZXIuc3R5bGU7XG5cbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGUgPSB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZSA9IHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10uc3R5bGU7XG5cbiAgICAgICAgdGhpcy5fcmVzZXRJbnRlcm5hbHMoKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2ZVJvd0luZGV4KCk7XG5cbiAgICAgICAgLyogdXNlZCBpbiBzY3JvbGwgc3RhdGUgcHJlc2VydmF0aW9uIGNhbGN1bGF0aW9ucyAqL1xuICAgICAgICB0aGlzLl9feCA9IHRoaXMuX195ID0gdGhpcy5fX3Jvd19zdGFydF9pbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5yZWdlbmVyYXRlKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG5cbiAgICAgICAgICAgIHRoaXMuY29weV9ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgICAgICAgIHRoaXMuY29weV9ub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIHRoaXMuY29weV9ub2RlLnN0eWxlLmNsaXAgPSAncmVjdCgxcHgsIDFweCwgMXB4LCAxcHgpJztcbiAgICAgICAgICAgIHRoaXMuY29weV9ub2RlLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgIHRoaXMuY29weV9ub2RlLnN0eWxlLm9wYWNpdHkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmNvcHlfbm9kZSk7XG5cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb3B5aW5nIHJvd3MgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGJyb3dzZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlV2luZG93UmVzaXplKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZURyYWdNb3ZlKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5faGFuZGxlVG91Y2hTdGFydCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2hhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlSGVhZGVyQ2xpY2spO1xuICAgICAgICB0aGlzLmhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuX2hhbmRsZUNvbHVtbkF1dG9FeHBhbmQpO1xuXG4gICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUNsaWNrKTtcblxuICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2hhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2hhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgIH1cblxuICAgIF9yZXNldEludGVybmFscygpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgICAgIHRoaXMucm93cyA9IFtdO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95ID0gW107XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5uX3BhZGRpbmdfcm93cyA9IDM7XG5cbiAgICAgICAgdGhpcy54ID0gdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLm5leHRfeSA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXSkge1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzdGFuY2VfZnJvbV90b3AgPSAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXSkge1xuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzdGFuY2VfZnJvbV9sZWZ0ID0gICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gMDtcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgdmFyaWFibGVzIGluIHZhcmlvdXMgY2FsY3VsYXRpb25zXG4gICAgICAgIHRoaXMuaSA9IG51bGw7XG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vcmRlcmVkX3lfYXJyYXlfaW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG4gICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IG51bGw7XG5cbiAgICAgICAgLy8gdHJhbnNsYXRpb24gY2FjaGVzXG4gICAgICAgIHRoaXMubGFzdF9oZWFkZXJfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfYm9keV95ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95ID0gbnVsbDtcblxuICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZXZ0ID0ge3ByZXZlbnREZWZhdWx0OiBub29wfTtcblxuICAgICAgICB0aGlzLnRvdWNoID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gMDtcblxuICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2ggPSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggPSBudWxsO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IG51bGw7XG5cbiAgICAgICAgLy8gcmVzZXQhXG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZUFsbCgpO1xuICAgIH1cblxuICAgIF9lbXB0eUhlYWRlcigpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuaGVhZGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUNoaWxkKHRoaXMuaGVhZGVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2J1aWxkQ29sdW1ucygpIHtcbiAgICAgICAgdGhpcy5fZW1wdHlIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5jLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpbmRleCkgPT4gdGhpcy5jb2x1bW5zLnB1c2goY3JlYXRlSGVhZGVyQ2VsbChjb2x1bW4sIGluZGV4KSkpO1xuICAgIH1cblxuICAgIF9jb21wdXRlTWluTWF4SGVhZGVyQ2VsbERpbWVuc2lvbnMoKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICBjb25zdCBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbHVtbi5ub2RlKTtcbiAgICAgICAgICAgIGNvbnN0IG1heCA9IGNzWydtYXgtd2lkdGgnXTtcbiAgICAgICAgICAgIGNvbnN0IG1pbiA9IGNzWydtaW4td2lkdGgnXTtcblxuICAgICAgICAgICAgY29sdW1uLm1pbldpZHRoID0gbWluID09PSAnbm9uZScgPyBOdW1iZXIuTUlOX1ZBTFVFIDogcGFyc2VJbnQobWluLCAxMCk7XG4gICAgICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSBtYXggPT09ICdub25lJyA/IE51bWJlci5NQVhfVkFMVUUgOiBwYXJzZUludChtYXgsIDEwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2luamVjdEhlYWRlckNlbGxzKCkge1xuICAgICAgICB0aGlzLmZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4gdGhpcy5mcmFnbWVudC5hcHBlbmRDaGlsZChjb2x1bW4ubm9kZSkpO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuZnJhZ21lbnQpO1xuXG4gICAgICAgIC8vIG11c3QgYmUgZG9uZSBhZnRlciB0aGV5IGhhdmUgYmVlbiBpbmplY3RlZCBpbnRvIHRoZSBET01cbiAgICAgICAgdGhpcy5fY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIF9lbXB0eUJvZHkoKSB7XG4gICAgICAgIHRoaXMucm93cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5ib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaW5qZWN0Rmlyc3RSb3coKSB7XG4gICAgICAgIHRoaXMuX2VtcHR5Qm9keSgpO1xuXG4gICAgICAgIHRoaXMucm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICBhY3RpdmU6IHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3csXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmMuZ2V0Um93KHRoaXMucm93X3N0YXJ0X2luZGV4KSxcbiAgICAgICAgICAgIHNldEluZGV4OiB0aGlzLnJvd19zdGFydF9pbmRleCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sIHRoaXMuY29sdW1ucykpO1xuXG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCgwKTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggKz0gMTtcblxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yb3dzWzBdLm5vZGUpO1xuICAgIH1cblxuICAgIF9pbmplY3RSZXN0T2ZSb3dzKCkge1xuICAgICAgICB0aGlzLmZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgIGZvciAodGhpcy5pID0gMTsgdGhpcy5pIDwgdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7IHRoaXMuaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogdGhpcy5pICsgdGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdyxcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmMuZ2V0Um93KHRoaXMuaSArIHRoaXMucm93X3N0YXJ0X2luZGV4KSxcbiAgICAgICAgICAgICAgICBzZXRJbmRleDogdGhpcy5pICsgdGhpcy5yb3dfc3RhcnRfaW5kZXgsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5jZWxsX2ggKiB0aGlzLmksXG4gICAgICAgICAgICB9LCB0aGlzLmNvbHVtbnMpKTtcblxuICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMuaSk7XG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCArPSAxO1xuXG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMucm93c1t0aGlzLmldLm5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZnJhZ21lbnQpO1xuICAgICAgICB0aGlzLmZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgX2FwcGx5TmV3Q29sdW1uV2lkdGgoaW5kZXgsIHdpZHRoKSB7XG4gICAgICAgIHRoaXMuYy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHdpZHRoOyAgICAvLyB0aGUgcHJvdmlkZWQgY29uZmlnIG9iamVjdHNcbiAgICAgICAgdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHdpZHRoOyAgICAgIC8vIHRoZSBjb2x1bW4gbm9kZXNcblxuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4gcm93LmNlbGxzW2luZGV4XS53aWR0aCA9IHdpZHRoKTtcblxuICAgICAgICB0aGlzLl9jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICBpZiAodGhpcy5jLmNvbHVtblJlc2l6ZUZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMuYy5jb2x1bW5SZXNpemVGdW5jKHRoaXMuY29sdW1uc1tpbmRleF0ubWFwcGluZywgd2lkdGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dyb3dDb2x1bW5zVG9GaWxsU3BhY2UoKSB7XG4gICAgICAgIGNvbnN0IHRvdGFsQ29sdW1uV2lkdGggPSB0aGlzLmNvbHVtbnMucmVkdWNlKCh0b3RhbCwgY29sdW1uKSA9PiAodG90YWwgKz0gY29sdW1uLndpZHRoKSwgMCk7XG4gICAgICAgIGNvbnN0IGRpZmYgPSB0aGlzLmNvbnRhaW5lcl93IC0gdG90YWxDb2x1bW5XaWR0aDtcbiAgICAgICAgY29uc3QgZGlmZlJlbWFpbmRlciA9IGRpZmYgJSB0aGlzLmNvbHVtbnMubGVuZ3RoO1xuICAgICAgICBjb25zdCBweFRvQWRkID0gKGRpZmYgLSBkaWZmUmVtYWluZGVyKSAvIHRoaXMuY29sdW1ucy5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICBjb2x1bW4ud2lkdGggKz0gcHhUb0FkZDtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBhcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLndpZHRoICs9IGRpZmZSZW1haW5kZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW4ud2lkdGggPiBjb2x1bW4ubWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4ud2lkdGggPSBjb2x1bW4ubWF4V2lkdGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi53aWR0aCA8IGNvbHVtbi5taW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi53aWR0aCA9IGNvbHVtbi5taW5XaWR0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYy5jb2x1bW5SZXNpemVGdW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jLmNvbHVtblJlc2l6ZUZ1bmMoY29sdW1uLm1hcHBpbmcsIGNvbHVtbi53aWR0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2FwcGx5Q29sdW1uV2lkdGhzKCk7XG4gICAgfVxuXG4gICAgX3Nocmlua0NvbHVtbnNUb0F2YWlsYWJsZVNwYWNlKCkge1xuICAgICAgICBjb25zdCB0b3RhbENvbHVtbldpZHRoID0gdGhpcy5jb2x1bW5zLnJlZHVjZSgodG90YWwsIGNvbHVtbikgPT4gKHRvdGFsICs9IGNvbHVtbi53aWR0aCksIDApO1xuICAgICAgICBjb25zdCBkaWZmID0gdG90YWxDb2x1bW5XaWR0aCAtIHRoaXMuY29udGFpbmVyX3c7XG4gICAgICAgIGNvbnN0IGRpZmZSZW1haW5kZXIgPSBkaWZmICUgdGhpcy5jb2x1bW5zLmxlbmd0aDtcbiAgICAgICAgY29uc3QgcHhUb1N1YnRyYWN0ID0gKGRpZmYgLSBkaWZmUmVtYWluZGVyKSAvIHRoaXMuY29sdW1ucy5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICBjb2x1bW4ud2lkdGggLT0gcHhUb1N1YnRyYWN0O1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IGFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4ud2lkdGggLT0gZGlmZlJlbWFpbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbHVtbi53aWR0aCA+IGNvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi53aWR0aCA9IGNvbHVtbi5tYXhXaWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sdW1uLndpZHRoIDwgY29sdW1uLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLndpZHRoID0gY29sdW1uLm1pbldpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jLmNvbHVtblJlc2l6ZUZ1bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMuY29sdW1uUmVzaXplRnVuYyhjb2x1bW4ubWFwcGluZywgY29sdW1uLndpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fYXBwbHlDb2x1bW5XaWR0aHMoKTtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlQ29sdW1uV2lkdGhzKCkge1xuICAgICAgICBsZXQgdG90YWxXaWR0aCA9IDA7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChjb2x1bW4ud2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi53aWR0aCA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1heCguLi50aGlzLnJvd3MubWFwKChyb3cpID0+IHJvdy5jZWxsc1tpbmRleF0ubm9kZS5jbGllbnRXaWR0aCArIDEgfHwgY29sdW1uLm1pbldpZHRoKSksXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbi5tYXhXaWR0aCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3RhbFdpZHRoICs9IGNvbHVtbi53aWR0aDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYy5maXRDb2x1bW5zVG9UYWJsZSkge1xuICAgICAgICAgICAgaWYgKHRvdGFsV2lkdGggIT09IHRoaXMuY29udGFpbmVyX3cpIHtcbiAgICAgICAgICAgICAgICBpZiAodG90YWxXaWR0aCA+IHRoaXMuY29udGFpbmVyX3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hyaW5rQ29sdW1uc1RvQXZhaWxhYmxlU3BhY2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncm93Q29sdW1uc1RvRmlsbFNwYWNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZ3Jvd0NvbHVtbnNUb0ZpbGxTcGFjZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2FwcGx5Q29sdW1uV2lkdGhzKCkge1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICAgICAgICByb3cuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjZWxsLndpZHRoID0gdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlQ2VsbEhlaWdodCgpIHtcbiAgICAgICAgdGhpcy5jZWxsX2ggPSB0aGlzLnJvd3NbMF0uY2VsbHNbMF0ubm9kZS5jbGllbnRIZWlnaHQgfHwgNDA7XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVhCb3VuZCgpIHtcbiAgICAgICAgdGhpcy5yb3dfdyA9IHRoaXMucm93c1swXS5ub2RlLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy54X21heCA9IHRoaXMuY29udGFpbmVyX3cgPD0gdGhpcy5yb3dfdyA/IHRoaXMuY29udGFpbmVyX3cgLSB0aGlzLnJvd193IDogMDtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlWUJvdW5kKCkge1xuICAgICAgICB0aGlzLnlfbWluID0gMDtcbiAgICAgICAgdGhpcy55X21heCA9IHRoaXMuYm9keV9oIC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQgKiB0aGlzLmNlbGxfaDtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLyB0aGlzLnJvd193ICogdGhpcy54X3Njcm9sbF90cmFja193O1xuXG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gdGhpcy54X3Njcm9sbF90cmFja193O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVlTY3JvbGxIYW5kbGVTaXplKCkge1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gICB0aGlzLm5fcm93c192aXNpYmxlID09PSB0aGlzLm5fcm93c19yZW5kZXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNvbnRhaW5lcl9oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY29udGFpbmVyX2ggKiAodGhpcy5uX3Jvd3NfdmlzaWJsZSAvIHRoaXMuYy50b3RhbFJvd3MpO1xuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgIH1cblxuICAgIF9pbml0aWFsaXplU2Nyb2xsQmFycygpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja193ID0gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmNsaWVudFdpZHRoIHx8IHRoaXMuY29udGFpbmVyX3c7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgODtcbiAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oID0gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCB0aGlzLmNvbnRhaW5lcl9oO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZS53aWR0aCA9IHRoaXMuX2NhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZS5oZWlnaHQgPSB0aGlzLl9jYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcblxuICAgICAgICAvKiB0b3RhbCB0cmFuc2xhdGFibGUgc3BhY2UgLyBzY3JvbGxiYXIgdHJhY2sgc2l6ZSA9IHJlbGF0aXZlIHZhbHVlIG9mIGEgc2Nyb2xsYmFyIHBpeGVsICovXG4gICAgICAgIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbyA9IE1hdGguYWJzKHRoaXMueF9tYXgpIC8gKHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUpO1xuXG4gICAgICAgIC8qIGhvdyBtYW55IHNjcm9sbGJhciBwaXhlbHMgPT09IG9uZSByb3c/ICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW8gPSAodGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSkgLyAodGhpcy5jLnRvdGFsUm93cyAtIHRoaXMubl9yb3dzX3Zpc2libGUpO1xuXG4gICAgICAgIC8qIGhpZGUgdGhlIHNjcm9sbGJhcnMgaWYgdGhleSBhcmUgbm90IG5lZWRlZCAqL1xuXG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cpIHtcbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9PT0gdGhpcy55X3Njcm9sbF90cmFja19oKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKSB7XG4gICAgICAgIC8qIFRoZSBmYWxsYmFjayBhbW91bnRzIGFyZSBmb3IgdW5pdCB0ZXN0aW5nLCB0aGUgYnJvd3NlciB3aWxsIGFsd2F5cyBoYXZlXG4gICAgICAgIGFuIGFjdHVhbCBudW1iZXIuICovXG4gICAgICAgIHRoaXMuY29udGFpbmVyX2ggPSB0aGlzLmMud3JhcHBlci5jbGllbnRIZWlnaHQgfHwgMTUwO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcl93ID0gdGhpcy5jLndyYXBwZXIuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLmJvZHlfaCA9IHRoaXMuYy5ib2R5LmNsaWVudEhlaWdodCB8fCAxMTA7XG4gICAgfVxuXG4gICAgX2hhbmRsZVdpbmRvd1Jlc2l6ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCAhPT0gdGhpcy5jb250YWluZXJfaCkge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIG1heSBiZSBuZWVkZWQgdG8gZGlzcGxheSB0aGUgZGF0YSwgc28gd2UgbmVlZCB0byByZWJ1aWxkICovXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdlbmVyYXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jLndyYXBwZXIuY2xpZW50V2lkdGggIT09IHRoaXMuY29udGFpbmVyX3cpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZF93aWR0aCA9IHRoaXMuY29udGFpbmVyX3c7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNvbHVtbldpZHRocygpO1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuXG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueCAvIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbyAqIC0xO1xuXG4gICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLSB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl90cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcblxuICAgICAgICAgICAgLy8gZ2V0dGluZyBsYXJnZXIgYW5kIHdlJ3JlIGZ1bGx5IHNjcm9sbGVkIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgaWYgKG9sZF93aWR0aCA8IHRoaXMuY29udGFpbmVyX3cgJiYgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5jb250YWluZXJfdyAtIG9sZF93aWR0aDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZUhlYWRlcih0aGlzLngpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZUJvZHkodGhpcy54LCB0aGlzLmxhc3RfYm9keV95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90cmFuc2xhdGVIZWFkZXIoeCkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2hlYWRlcl94KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZVt0cF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9oZWFkZXJfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJhbnNsYXRlQm9keSh4LCB5KSB7XG4gICAgICAgIGlmICh4ICE9PSB0aGlzLmxhc3RfYm9keV94IHx8IHkgIT09IHRoaXMubGFzdF9ib2R5X3kpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keV9zdHlsZVt0cF0gPSB0cmFuc2xhdGUzZCh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSB4O1xuICAgICAgICAgICAgdGhpcy5sYXN0X2JvZHlfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJhbnNsYXRlWFNjcm9sbEhhbmRsZSh4KSB7XG4gICAgICAgIGlmICh4ICE9PSB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3gpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3N0eWxlW3RwXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHkpIHtcbiAgICAgICAgaWYgKHkgIT09IHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSkge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHBdID0gdHJhbnNsYXRlM2QoMCwgeSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RyYW5zbGF0ZUFsbChuZXh0WCwgbmV4dFkpIHtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlSGVhZGVyKG5leHRYKTtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlQm9keShuZXh0WCwgbmV4dFkpO1xuICAgICAgICB0aGlzLl90cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgX3Njcm9sbFVwKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBzdGFydCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCAwKSB3ZSB0cnVuY2F0ZSB1cHdhcmQgc2Nyb2xsIGF0dGVtcHRzXG4gICAgICAgICAgIHRvIHRoZSB1cHBlciB0cmFuc2xhdGlvbiBib3VuZGFyeSB0byBrZWVwIGZyb20gc2tpcHBpbmcgb2ZmIGludG8gbm90aGluZ25lc3MgKi9cblxuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDAgJiYgdGhpcy5uZXh0X3kgPiB0aGlzLnlfbWluKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9taW47XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCB8fCB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWluKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyB1cCwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSByb3cgaW4gdGhlIHZpc3VhbCBib3R0b20gcG9zaXRpb24gdG8gdGhlIHRvcFxuICAgICAgICAgICAoYWJvdmUgdGhlIGxpcCBvZiB0aGUgdmlldykgKi9cblxuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21pbikgLyB0aGlzLmNlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIC8qIHByZXZlbnQgdW5kZXItcm90YXRpbmcgYmVsb3cgaW5kZXggemVybywgdGhlIGxvZ2ljYWwgc3RhcnQgb2YgYSBkYXRhIHNldCAqL1xuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLm5fcm93c190b19zaGlmdCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95IC09IE1hdGguYWJzKHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQpICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMucm93X3N0YXJ0X2luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICAvKiB3aGVuIHRoZSB0b3RhbCBtb3ZlbWVudCBlbmRzIHVwIGJlaW5nIGxhcmdlciB0aGFuIHRoZSBzZXQgb2Ygcm93cyBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBjYW4gc2FmZWx5IGRlY3JlbWVudCB0aGUgXCJ2aWV3YWJsZVwiIHJvdyByYW5nZSBhY2NvcmRpbmdseSBhbmQgdGhlIG5leHQgc3RlcCB3aGVyZSB0aGUgY29udGVudCBpcyBzdWJzdGl0dXRlZCB3aWxsIGF1dG9tYXRpY2FsbHkgaW5zZXJ0IHRoZSBuZXh0IGxvZ2ljYWwgcm93IGludG8gaXRzIHBsYWNlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSB0aGlzLm5fcm93c19yZW5kZXJlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG5cbiAgICAgICAgICAgICAgICAvKiBhY2NvbW9kYXRlIGZvciB0aGUgbnVtYmVyIG9mIHBpeGVscyB0aGF0IHdpbGwgbm90IGJlIHJlbmRlcmVkICovXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy5zaGlmdF9kZWx0YSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogbW92ZSB0aGUgaGlnaGVzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIHRvcCBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgIHRoaXMub3JkZXJlZF95X2FycmF5X2luZGV4ID0gdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W3RoaXMub3JkZXJlZF95X2FycmF5X2luZGV4XVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5kYXRhID0gdGhpcy5kcmFnX3RpbWVyID8gbnVsbCA6IHRoaXMuYy5nZXRSb3codGhpcy50YXJnZXRfaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnNldEluZGV4ID0gdGhpcy50YXJnZXRfaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIueSA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXS55IC0gdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kudW5zaGlmdCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnBvcCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zY3JvbGxEb3duKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBlbmQgb2YgdGhlIHRhYmxlIChyb3cgaW5kZXggbikgd2UgdHJ1bmNhdGUgYW55IHNjcm9sbCBhdHRlbXB0cyAgKi9cbiAgICAgICAgaWYgKHRoaXMucm93X2VuZF9pbmRleCA+PSB0aGlzLmMudG90YWxSb3dzIC0gMSAmJiB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9tYXg7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95ID49IHRoaXMueV9tYXgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIGRvd24sIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgcm93IGluIHRoZSB2aXN1YWwgdG9wIHBvc2l0aW9uIHRvIHRoZSBib3R0b21cbiAgICAgICAgICAgKGJlbG93IHRoZSBsaXAgb2YgdGhlIHZpZXcpICovXG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5uZXh0X3kgLSB0aGlzLnlfbWF4KSAvIHRoaXMuY2VsbF9oKTtcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgKyB0aGlzLnJvd19lbmRfaW5kZXggKyAxID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgKz0gKFxuICAgICAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gKHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLnJvd19lbmRfaW5kZXggLSAodGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPT09IDAgPyAwIDogMSkpXG4gICAgICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICBhcHBseURlbHRhKHRoaXMueV9tYXgsIHRoaXMueSkgJSB0aGlzLmNlbGxfaCwgdGhpcy5uZXh0X3lcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIC8qIHdoZW4gdGhlIHRvdGFsIG1vdmVtZW50IGVuZHMgdXAgYmVpbmcgbGFyZ2VyIHRoYW4gdGhlIHNldCBvZiByb3dzIGFscmVhZHkgcmVuZGVyZWQsIHdlIGNhbiBzYWZlbHkgaW5jcmVtZW50IHRoZSBcInZpZXdhYmxlXCIgcm93IHJhbmdlIGFjY29yZGluZ2x5IGFuZCB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnQgdGhlIG5leHQgbG9naWNhbCByb3cgaW50byBpdHMgcGxhY2UgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSB0aGlzLm5fcm93c190b19zaGlmdCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSArPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X2VuZF9pbmRleCArIHRoaXMuaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAvKiB0aGUgcGFkZGluZyByb3dzIHdpbGwgZXhjZWVkIHRoZSBtYXhpbXVtIGluZGV4IGZvciBhIGRhdGEgc2V0IG9uY2UgdGhlIHVzZXIgaGFzIGZ1bGx5IHRyYW5zbGF0ZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0X2luZGV4ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMucm93c19vcmRlcmVkX2J5X3kuc2hpZnQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgbG93ZXN0IFktdmFsdWUgcm93cyB0byB0aGUgYm90dG9tIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbMF1dO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuZGF0YSA9IHRoaXMuZHJhZ190aW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMudGFyZ2V0X2luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5zZXRJbmRleCA9IHRoaXMudGFyZ2V0X2luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnkgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVt0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCAtIDFdXS55ICsgdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcbiAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcblxuICAgICAgICAgICAgdGhpcy55X21pbiAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy55X21heCAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVZpc2libGVUb3BSb3dJbmRleCh0YXJnZXRZID0gdGhpcy5uZXh0X3kpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm93c1tcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lbXG4gICAgICAgICAgICAgICAgTWF0aC5jZWlsKE1hdGguYWJzKFxuICAgICAgICAgICAgICAgICAgICBhcHBseURlbHRhKHRoaXMueV9taW4sIHRhcmdldFkpIC8gdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgXVxuICAgICAgICBdLnNldEluZGV4O1xuICAgIH1cblxuICAgIF9oYW5kbGVNb3ZlSW50ZW50ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmMuYWxsb3dTY3JvbGxQcm9wYWdhdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQuZGVsdGFYID09PSAwICAgJiYgZXZlbnQuZGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFYID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZGVsdGFfeCA9IGV2ZW50LmRlbHRhWDtcblxuICAgICAgICAvLyBkZWx0YU1vZGUgMCA9PT0gcGl4ZWxzLCAxID09PSBsaW5lc1xuICAgICAgICB0aGlzLmRlbHRhX3kgPSAgIGV2ZW50LmRlbHRhTW9kZSA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KGV2ZW50LmRlbHRhWSwgMTApICogdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICAgICAgICAgOiBldmVudC5kZWx0YVk7XG5cbiAgICAgICAgLyogbG9jayB0aGUgdHJhbnNsYXRpb24gYXhpcyBpZiB0aGUgdXNlciBpcyBtYW5pcHVsYXRpbmcgdGhlIHN5bnRoZXRpYyBzY3JvbGxiYXJzICovXG4gICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy55X3Njcm9sbF9sb2NrZWQgPyB0aGlzLnggOiB0aGlzLnggLSB0aGlzLmRlbHRhX3g7XG4gICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy54X3Njcm9sbF9sb2NrZWQgPyB0aGlzLnkgOiB0aGlzLnkgLSB0aGlzLmRlbHRhX3k7XG5cbiAgICAgICAgaWYgKHRoaXMubmV4dF94ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3ggPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF94IDwgdGhpcy54X21heCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLnhfbWF4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3Zpc2libGUgPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgLyogbmVnYXRlIHRoZSB2ZXJ0aWNhbCBtb3ZlbWVudCwgbm90IGVub3VnaCByb3dzIHRvIGZpbGwgdGhlIGJvZHkgKi9cbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95IDwgdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxEb3duKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3kgPiB0aGlzLnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXNldF90aW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMucmVzZXRfdGltZXIpOyB9XG5cbiAgICAgICAgLyogcmVzZXQgcm93ICYgd3JhcHBlciBZIHZhbHVlcyB0b3dhcmQgMCB0byBwcmV2ZW50IG92ZXJmbG93aW5nICovXG4gICAgICAgIHRoaXMucmVzZXRfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiByZXNldFlBeGlzKGluc3RhbmNlKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF90aW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgIGluc3RhbmNlLnJlc2V0X2RlbHRhID0gaW5zdGFuY2UueV9taW47XG5cbiAgICAgICAgICAgIC8qIHNoaWZ0IGFsbCB0aGUgcG9zaXRpb25pbmcgdmFyaWFibGVzICovXG4gICAgICAgICAgICBpbnN0YW5jZS55ID0gYXBwbHlEZWx0YShpbnN0YW5jZS5yZXNldF9kZWx0YSwgaW5zdGFuY2UueSk7XG4gICAgICAgICAgICBpbnN0YW5jZS55X21pbiA9IGFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnlfbWluKTtcbiAgICAgICAgICAgIGluc3RhbmNlLnlfbWF4ID0gYXBwbHlEZWx0YShpbnN0YW5jZS5yZXNldF9kZWx0YSwgaW5zdGFuY2UueV9tYXgpO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCBhbGwgdGhlIHJvd3MgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnJvd3Nfb3JkZXJlZF9ieV95LmZvckVhY2goKHBvc2l0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLnJvd3NbcG9zaXRpb25dLnkgPSBpbmRleCAqIGluc3RhbmNlLmNlbGxfaDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCB0aGUgd3JhcHBlciAqL1xuICAgICAgICAgICAgaW5zdGFuY2UuX3RyYW5zbGF0ZUJvZHkoaW5zdGFuY2UueCwgaW5zdGFuY2UueSk7XG5cbiAgICAgICAgfSwgMTAwLCB0aGlzKTtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IHRoaXMuX2NhbGN1bGF0ZVZpc2libGVUb3BSb3dJbmRleCgpO1xuXG4gICAgICAgIC8qIHF1ZXVlIHVwIHRyYW5zbGF0aW9ucyBhbmQgdGhlIGJyb3dzZXIgd2lsbCBleGVjdXRlIHRoZW0gYXMgYWJsZSwgbmVlZCB0byBwYXNzIGluIHRoZSB2YWx1ZXMgdGhhdCB3aWxsIGNoYW5nZSBkdWUgdG8gbW9yZSBfaGFuZGxlTW92ZUludGVudCBpbnZvY2F0aW9ucyBiZWZvcmUgdGhpcyByQUYgZXZlbnR1YWxseSBleGVjdXRlcy4gKi9cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiByQUYobmV4dFgsIGN1cnJYLCBuZXh0WSwgdmlzaWJsZVRvcFJvd0luZGV4KSB7XG4gICAgICAgICAgICBpZiAobmV4dFggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICs9ICgobmV4dFggLSBjdXJyWCkgLyB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8pICogLTE7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy54X3Njcm9sbF90cmFja193IC0gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdmlzaWJsZVRvcFJvd0luZGV4ICogdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbztcblxuICAgICAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueV9zY3JvbGxfdHJhY2tfaCkge1xuICAgICAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRG8gYWxsIHRyYW5zZm9ybXMgZ3JvdXBlZCB0b2dldGhlclxuICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlQWxsKG5leHRYLCBuZXh0WSk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMubmV4dF94LCB0aGlzLngsIHRoaXMubmV4dF95LCB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCkpO1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMubmV4dF94O1xuICAgICAgICB0aGlzLnkgPSB0aGlzLm5leHRfeTtcbiAgICB9XG5cbiAgICBfaGFuZGxlVG91Y2hNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogd2UgaGFuZGxlIHRvdWNobW92ZSBieSBkZXRlY3RpbmcgdGhlIGRlbHRhIG9mIHBhZ2VYL1kgYW5kIGZvcndhcmRpbmdcbiAgICAgICAgaXQgdG8gX2hhbmRsZU1vdmVJbnRlbnQoKSAqL1xuXG4gICAgICAgIHRoaXMudG91Y2ggPSBldmVudC50b3VjaGVzLml0ZW0oMCk7XG5cbiAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gdGhpcy5sYXN0X3RvdWNoX3BhZ2VYIC0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gdGhpcy5sYXN0X3RvdWNoX3BhZ2VZIC0gdGhpcy50b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSB0aGlzLnRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgIH1cblxuICAgIF9oYW5kbGVUb3VjaFN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMudG91Y2ggPSBldmVudC50b3VjaGVzLml0ZW0oMCk7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2xvY2tlZCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgIT09IFhfU0NST0xMX1RSQUNLKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICBhcHBseURlbHRhKFxuICAgICAgICAgICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCwgZXZlbnQucGFnZVggLSB0aGlzLmRpc3RhbmNlX2Zyb21fbGVmdFxuICAgICAgICAgICAgKSAqIHRoaXMueF90YWJsZV9waXhlbF9yYXRpb1xuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgfVxuXG4gICAgX2hhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2xvY2tlZCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgIT09IFlfU0NST0xMX1RSQUNLKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICBhcHBseURlbHRhKFxuICAgICAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSwgZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wXG4gICAgICAgICAgICApIC8gdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpb1xuICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgfVxuXG4gICAgX2hhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgX2hhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8qIGFkanVzdHMgZm9yIHRoZSBwaXhlbCBkaXN0YW5jZSBiZXR3ZWVuIHdoZXJlIHRoZSBoYW5kbGUgaXMgY2xpY2tlZCBhbmQgdGhlIHRvcCBlZGdlIG9mIGl0OyB0aGUgaGFuZGxlIGlzIHBvc2l0aW9uZWQgYWNjb3JkaW5nIHRvIGl0cyB0b3AgZWRnZSAqL1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX29mZnNldCA9IGV2ZW50Lm9mZnNldFk7XG5cbiAgICAgICAgdGhpcy55X3Njcm9sbF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX2hhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgIH1cblxuICAgIF9oYW5kbGVEcmFnTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubGVmdF9idXR0b25fcHJlc3NlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmRyYWdfdGltZXIpOyB9XG5cbiAgICAgICAgICAgIC8qIHgtYXhpcyBkb2Vzbid0IG5lZWQgdGhyb3R0bGUgcHJvdGVjdGlvbiBzaW5jZSBpdCBkb2Vzbid0IGNhdXNlIGEgcm93IGZldGNoICovXG4gICAgICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIC8qIE5vdyBmZXRjaCwgb25jZSBkcmFnIGhhcyBjZWFzZWQgZm9yIGxvbmcgZW5vdWdoLiAqL1xuICAgICAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdGEgPSB0aGlzLmMuZ2V0Um93KHJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMuYy50aHJvdHRsZUludGVydmFsKTtcblxuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95LFxuICAgICAgICAgICAgICAgICAgICBldmVudC5wYWdlWSAtIHRoaXMuZGlzdGFuY2VfZnJvbV90b3AgLSB0aGlzLnlfc2Nyb2xsX29mZnNldFxuICAgICAgICAgICAgICAgICkgLyB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvXG4gICAgICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IChldmVudC5wYWdlWCAtIHRoaXMubGFzdF9wYWdlWCkgKiB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW87XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbHVtbl9pc19yZXNpemluZykge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlQ29sdW1uUmVzaXplKGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0X2NvbHVtbl94KTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X2NvbHVtbl94ID0gZXZlbnQucGFnZVg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdW5sb2NrRHJhZ1RvU2Nyb2xsKCkge1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA9IHRoaXMueV9zY3JvbGxfbG9ja2VkID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcgPSBmYWxzZTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9wcmV2ZW50Q2xpY2tXaGlsZURyYWdnaW5nLCB0cnVlKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRHJhZ0VuZCA9IChldmVudCkgPT4ge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX2hhbmRsZURyYWdFbmQsIHRydWUpO1xuXG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qIHRoZSBicm93c2VyIGZpcmVzIHRoZSBtb3VzZXVwIGFuZCBjbGljayBldmVudHMgc2ltdWx0YW5lb3VzbHksIGFuZCB3ZSBkb24ndCB3YW50IG91ciBjbGljayBoYW5kbGVyIHRvIGJlIGV4ZWN1dGVkLCBzbyBhIHplcm8tZGVsYXkgc2V0VGltZW91dCB3b3JrcyBoZXJlIHRvIGxldCB0aGUgc3RhY2sgY2xlYXIgYmVmb3JlIGFsbG93aW5nIGNsaWNrIGV2ZW50cyBhZ2Fpbi4gKi9cbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5fdW5sb2NrRHJhZ1RvU2Nyb2xsKCksIDApO1xuICAgIH1cblxuICAgIF9wcmV2ZW50Q2xpY2tXaGlsZURyYWdnaW5nID0gKGV2ZW50KSA9PiBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuXG4gICAgX2hhbmRsZUNvbHVtbkRyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IEhFQURFUl9DRUxMX0hBTkRMRSkge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X2NvbHVtbl94ID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgICAgIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZncodGhpcy5jb2x1bW5zLCAnbWFwcGluZycsIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX3ByZXZlbnRDbGlja1doaWxlRHJhZ2dpbmcsIHRydWUpO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlQ29sdW1uUmVzaXplKGRlbHRhKSB7XG4gICAgICAgIGlmIChkZWx0YSA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nKTtcbiAgICAgICAgbGV0IGFkanVzdGVkX2RlbHRhID0gZGVsdGE7XG5cbiAgICAgICAgaWYgKCAgIGFkanVzdGVkX2RlbHRhIDwgMFxuICAgICAgICAgICAgJiYgIWlzTmFOKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoKVxuICAgICAgICAgICAgJiYgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSA8IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWRfZGVsdGEgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5taW5XaWR0aCAtIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aClcbiAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhID4gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGFkanVzdGVkX2RlbHRhID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGggLSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FwcGx5TmV3Q29sdW1uV2lkdGgoaW5kZXgsIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEpO1xuXG4gICAgICAgIC8qIElmIGEgY29sdW1uIHNocmlua3MsIHRoZSB3cmFwcGVyIFggdHJhbnNsYXRpb24gbmVlZHMgdG8gYmUgYWRqdXN0ZWQgYWNjb3JkaW5nbHkgb3JcbiAgICAgICAgd2UnbGwgc2VlIHVud2FudGVkIHdoaXRlc3BhY2Ugb24gdGhlIHJpZ2h0IHNpZGUuIElmIHRoZSB0YWJsZSB3aWR0aCBiZWNvbWVzIHNtYWxsZXIgdGhhblxuICAgICAgICB0aGUgb3ZlcmFsbCBjb250YWluZXIsIHdoaXRlc3BhY2Ugd2lsbCBhcHBlYXIgcmVnYXJkbGVzcy4gKi9cbiAgICAgICAgaWYgKGFkanVzdGVkX2RlbHRhIDwgMCAmJiB0aGlzLnJvd193ICsgdGhpcy54ICsgYWRqdXN0ZWRfZGVsdGEgPCB0aGlzLmNvbnRhaW5lcl93KSB7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSBhZGp1c3RlZF9kZWx0YTtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2hhbmRsZUNvbHVtbkF1dG9FeHBhbmQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBIRUFERVJfQ0VMTF9IQU5ETEUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcHBpbmcgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJyk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW4gPSBmdyh0aGlzLmNvbHVtbnMsICdtYXBwaW5nJywgbWFwcGluZyk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbHVtbik7XG5cbiAgICAgICAgICAgIGxldCB3aWR0aCA9IGNvbHVtbi53aWR0aDtcbiAgICAgICAgICAgIGxldCBjZWxsV2lkdGg7XG5cbiAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEocm93LmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSAmJiByb3cuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsV2lkdGggPSByb3cuY2VsbHNbY29sdW1uSW5kZXhdLnRydWVXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoIDwgY2VsbFdpZHRoID8gY2VsbFdpZHRoIDogd2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7IC8qIGZpbmQgdGhlIHJlbmRlcmVkIHJvdyB3aXRoIHRoZSBsb25nZXN0IGNvbnRlbnQgZW50cnkgKi9cblxuICAgICAgICAgICAgdGhpcy5fYXBwbHlOZXdDb2x1bW5XaWR0aChjb2x1bW5JbmRleCwgd2lkdGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3NldEFyaWFUZXh0KHRleHQpIHtcbiAgICAgICAgdGhpcy5jLmFyaWEuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG5cbiAgICBfY2hhbmdlQWN0aXZlUm93KGRlbHRhKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZV9yb3cgKyBkZWx0YSA+PSB0aGlzLmMudG90YWxSb3dzKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gZncodGhpcy5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLmFjdGl2ZV9yb3cgKyBkZWx0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMubmV4dF9hY3RpdmVfcm93KSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVJvd0luZGV4KHRoaXMubmV4dF9hY3RpdmVfcm93LnNldEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuX3NldEFyaWFUZXh0KHRoaXMubmV4dF9hY3RpdmVfcm93LmRhdGFbdGhpcy5jb2x1bW5zWzBdLm1hcHBpbmddKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5uZXh0X2FjdGl2ZV9yb3cueSAqIC0xID4gdGhpcy55KVxuICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLm5leHRfYWN0aXZlX3Jvdy55ICogLTEgPCB0aGlzLnkgLSB0aGlzLmJvZHlfaCArIHRoaXMuY2VsbF9oKVxuICAgICAgICAgICAgKSB7IC8vIERlc3RpbmF0aW9uIHJvdyBpcyBvdXRzaWRlIHRoZSB2aWV3cG9ydCwgc28gc2ltdWxhdGUgYSBzY3JvbGxcbiAgICAgICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IHRoaXMuY2VsbF9oICogZGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggICAoZGVsdGEgPCAwICYmIHRoaXMuYWN0aXZlX3JvdyA+IDApXG4gICAgICAgICAgICAgICAgICAgfHwgKGRlbHRhID4gMCAmJiB0aGlzLmFjdGl2ZV9yb3cgPCB0aGlzLmMudG90YWxSb3dzKSkge1xuICAgICAgICAgICAgLyogVGhlIGRlc3RpbmF0aW9uIHJvdyBpc24ndCByZW5kZXJlZCwgc28gd2UgbmVlZCB0byB0cmFuc2xhdGUgZW5vdWdoIHJvd3MgZm9yIGl0IHRvIGZlYXNpYmx5IGJlIHNob3duIGluIHRoZSB2aWV3cG9ydC4gKi9cbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAoICAgKCAgICB0aGlzLnJvd19zdGFydF9pbmRleCA+IHRoaXMuYWN0aXZlX3Jvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5hY3RpdmVfcm93IC0gdGhpcy5yb3dfc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgKCAgICB0aGlzLnJvd19zdGFydF9pbmRleCA8IHRoaXMuYWN0aXZlX3Jvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5hY3RpdmVfcm93IC0gdGhpcy5yb3dfc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBkZWx0YSkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBwcm9jZXNzIGFnYWluLCBub3cgdGhhdCB0aGUgcm93IGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9jaGFuZ2VBY3RpdmVSb3coZGVsdGEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gbnVsbDtcbiAgICB9XG5cbiAgICBfaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXkgfHwgZ2V0S2V5RnJvbUtleUNvZGUoZXZlbnQua2V5Q29kZSk7XG5cbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmVSb3dJbmRleCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLmFjdGl2ZV9yb3cgIT09IC0xIC8vIGFscmVhZHkga2V5aW5nIHRocm91Z2ggdGhlIHRhYmxlXG4gICAgICAgICAgICAgICAgfHwgKHRoaXMuYWN0aXZlX3JvdyA9PT0gLTEgJiYgdGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDApIC8vIGF0IHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUFjdGl2ZVJvdygxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgdGhlIGFjdGl2ZSByb3cgb24gdGhlIHRvcG1vc3Qgcm93IGluIHRoZSBjdXJyZW50IHZpZXdwb3J0XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlQWN0aXZlUm93KHRoaXMucm93X3N0YXJ0X2luZGV4ICsgdGhpcy5uX3BhZGRpbmdfcm93cyArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VBY3RpdmVSb3coLTEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZV9yb3cgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZncodGhpcy5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLmFjdGl2ZV9yb3cpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRBcmlhVGV4dCh0aGlzLmNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb2x1bW4udGl0bGV9OiAke3Jvd1tjb2x1bW4ubWFwcGluZ119YDtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgIGlmICgoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5KSAmJiB0aGlzLmFjdGl2ZV9yb3cgPj0gMCAmJiB0aGlzLmNvcHlfbm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZV9yb3cgPSBmdyh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3Jvdyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNvcHlfbm9kZS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICA9ICAgdGhpcy5jb2x1bW5zLm1hcChjb2x1bW4gPT4gYFwiJHtjb2x1bW4udGl0bGUucmVwbGFjZSgnXCInLCAnXFxcXFwiJyl9XCJgKS5qb2luKCcsJylcbiAgICAgICAgICAgICAgICAgICAgICArICdcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgKyBhY3RpdmVfcm93LmNlbGxzLm1hcChjZWxsID0+IGBcIiR7Y2VsbC5ub2RlLnRleHRDb250ZW50LnJlcGxhY2UoJ1wiJywgJ1xcXFxcIicpfVwiYCkuam9pbignLCcpXG4gICAgICAgICAgICAgICAgICAgICAgKyAnXFxuJztcblxuICAgICAgICAgICAgICAgIHRoaXMuY29weV9ub2RlLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZGlzY292ZXJDZWxsQW5kUm93Tm9kZXModGFyZ2V0KSB7XG4gICAgICAgIGxldCBub2RlID0gdGFyZ2V0O1xuICAgICAgICBjb25zdCBub2RlTWFwID0ge307XG5cbiAgICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFJPVykpIHtcbiAgICAgICAgICAgIHJldHVybiB7cm93OiBub2RlfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICgoIW5vZGVNYXAuY2VsbCB8fCAhbm9kZU1hcC5yb3cpICYmIG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhDRUxMKSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAuY2VsbCA9IG5vZGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFJPVykpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLnJvdyA9IG5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZU1hcDtcbiAgICB9XG5cbiAgICBfaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5fZGlzY292ZXJDZWxsQW5kUm93Tm9kZXMoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICBpZiAobWFwLnJvdykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZncodGhpcy5yb3dzLCAnbm9kZScsIG1hcC5yb3cpO1xuXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVJvd0luZGV4KHJvdy5zZXRJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChtYXAuY2VsbCAmJiB0aGlzLmMuY2VsbENsaWNrRnVuYykge1xuICAgICAgICAgICAgICAgIHRoaXMuYy5jZWxsQ2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgsIG1hcC5jZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmMucm93Q2xpY2tGdW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jLnJvd0NsaWNrRnVuYyhldmVudCwgcm93LnNldEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9oYW5kbGVIZWFkZXJDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jLmhlYWRlckNvbHVtbkNsaWNrRnVuYykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgbWFwcGluZztcblxuICAgICAgICAgICAgd2hpbGUgKCFtYXBwaW5nICYmIG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuaGFzQXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1hcHBpbmcgPSBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMuaGVhZGVyQ29sdW1uQ2xpY2tGdW5jKGV2ZW50LCBtYXBwaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHB1YmxpYyBBUElzXG5cbiAgICBnZXRBY3RpdmVSb3dJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlX3JvdyA+IC0xID8gdGhpcy5hY3RpdmVfcm93IDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVJvd0luZGV4KHNldEluZGV4KSB7XG4gICAgICAgIHRoaXMuYWN0aXZlX3JvdyA9IHNldEluZGV4O1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4gKHJvdy5hY3RpdmUgPSByb3cuc2V0SW5kZXggPT09IHNldEluZGV4KSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYy5hY3RpdmVSb3dDaGFuZ2VkRnVuYykge1xuICAgICAgICAgICAgdGhpcy5jLmFjdGl2ZVJvd0NoYW5nZWRGdW5jKHRoaXMuYWN0aXZlX3Jvdyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldEFjdGl2ZVJvd0luZGV4KCkge1xuICAgICAgICB0aGlzLmFjdGl2ZV9yb3cgPSAtMTtcbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4gKHJvdy5hY3RpdmUgPSByb3cuc2V0SW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdykpO1xuXG4gICAgICAgIGlmICh0aGlzLmMuYWN0aXZlUm93Q2hhbmdlZEZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMuYy5hY3RpdmVSb3dDaGFuZ2VkRnVuYygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0WEFtb3VudFNjcm9sbGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54O1xuICAgIH1cblxuICAgIGdldFlBbW91bnRTY3JvbGxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueTtcbiAgICB9XG5cbiAgICBqdW1wVG9Sb3dJbmRleChpbmRleCkge1xuICAgICAgICBpZiAoaXNOYU4oaW5kZXgpIHx8IGluZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gaWdub3JlIGludmFsaWQgaW5wdXRcblxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0gLy8gdW5kZXJmbG93IHByb3RlY3Rpb25cblxuICAgICAgICBpZiAoaW5kZXggPiB0aGlzLmMudG90YWxSb3dzIC0gMSkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmMudG90YWxSb3dzIC0gMTtcbiAgICAgICAgfSAvLyBvdmVyZmxvdyBwcm90ZWN0aW9uXG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3dJbmRleChpbmRleCk7XG5cbiAgICAgICAgLy8gaWYgYWxyZWFkeSB2aXNpYmxlLCBkb24ndCByZWdlbmVyYXRlXG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCAmJiBpbmRleCA8PSB0aGlzLnJvd19lbmRfaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmRleCArIHRoaXMubl9yb3dzX3JlbmRlcmVkIDwgdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCA9IHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMubl9wYWRkaW5nX3Jvd3MgKiB0aGlzLmNlbGxfaCAqIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWdlbmVyYXRlKCk7XG5cbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSBpbmRleCAqIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW87XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueV9zY3JvbGxfdHJhY2tfaCkge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggLSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgcmVnZW5lcmF0ZShjb25maWcgPSB0aGlzLmMpIHtcbiAgICAgICAgaWYgKGNvbmZpZyAhPT0gdGhpcy5jKSB7IHRoaXMuX3Byb2Nlc3NDb25maWd1cmF0aW9uKGNvbmZpZyk7IH1cblxuICAgICAgICAvLyBhbGxvd3MgZm9yIHRydWUgc2l6ZXMgdG8gYmUgY2FsY3VsYXRlZDsgcG9zdC1pbml0aWFsaXphdGlvbiwgdGhlIGZsZXhib3ggYXV0by1ncm93IGFsZ29yaXRobSB0YWtlcyBvdmVyXG4gICAgICAgIC8vIGFuZCB3aWxsIGRpdnZ5IHVwIHJlbWFpbmluZyBzcGFjZSBhbW9uZ3N0IHRoZSBjaGlsZHJlbi4uLiBwcmVjYWxjdWxhdGluZyB0aGUgdHJ1ZSBzaXplIG1lYW5zIGxhcmdlciBjb2x1bW5zXG4gICAgICAgIC8vIHdpbGwgbm90IGJlIHByZW1hdHVyZWx5IHRydW5jYXRlZFxuICAgICAgICB0aGlzLmMud3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKElOSVRJQUxJWkVEKTtcblxuICAgICAgICAvKiBzdG9yZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHVuaW9uIGZvciBpZiB3ZSBuZWVkIHRvIHJlaHlkcmF0ZSB0aGUgcHJldmlvdXMgc2Nyb2xsIHN0YXRlICovXG4gICAgICAgIHRoaXMuX194ID0gdGhpcy54O1xuICAgICAgICB0aGlzLl9feSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5fX3Jvd19zdGFydF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4O1xuXG4gICAgICAgIHRoaXMuX3Jlc2V0SW50ZXJuYWxzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZlUm93SW5kZXgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLl9idWlsZENvbHVtbnMoKTtcblxuICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCA9IHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlID8gdGhpcy5fX3Jvd19zdGFydF9pbmRleCB8fCAwIDogMDtcblxuICAgICAgICB0aGlzLl9pbmplY3RGaXJzdFJvdygpO1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVDZWxsSGVpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgPSBNYXRoLmNlaWwodGhpcy5ib2R5X2ggLyB0aGlzLmNlbGxfaCkgKyB0aGlzLm5fcGFkZGluZ19yb3dzO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c19yZW5kZXJlZCA+IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3JlbmRlcmVkID0gdGhpcy5jLnRvdGFsUm93cztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubl9yb3dzX3Zpc2libGUgPSBNYXRoLmZsb29yKHRoaXMuYm9keV9oIC8gdGhpcy5jZWxsX2gpO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c192aXNpYmxlID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3Zpc2libGUgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm93X2VuZF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4ICsgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgLSAxO1xuXG4gICAgICAgIHRoaXMuX2luamVjdFJlc3RPZlJvd3MoKTtcbiAgICAgICAgdGhpcy5faW5qZWN0SGVhZGVyQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ29sdW1uV2lkdGhzKCk7XG5cbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVlCb3VuZCgpO1xuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gdGhpcy5fY2FsY3VsYXRlVmlzaWJsZVRvcFJvd0luZGV4KCk7XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICBpZiAodGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgJiYgdGhpcy5fX3ggIT09IG51bGwgJiYgdGhpcy5fX3kgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8qIHRoZSBjYWNoZWQgdmFsdWVzIGFyZSB0aGVuIGFwcGxpZWQgYWdhaW5zdCB0aGUgdGFibGUgdG8gYXJyaXZlIGF0IHRoZSBwcmV2aW91cyBzdGF0ZSAqL1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICBkZWx0YVg6IC10aGlzLl9feCxcbiAgICAgICAgICAgICAgICBkZWx0YVk6IC10aGlzLl9feSxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm93IHRoYXQgYWxsIHRoZSBzZXR1cCBpcyBjb21wbGV0ZSwgYXBwbHkgdGhlIGZsZXggYWxnb3JpdGhtIHRvIGV4cGFuZCBzbWFsbGVyIGNlbGxzIGlmIHRoZXJlXG4gICAgICAgIC8vIGlzIGV4dHJhIHJvb21cbiAgICAgICAgdGhpcy5jLndyYXBwZXIuY2xhc3NMaXN0LmFkZChJTklUSUFMSVpFRCk7XG5cbiAgICAgICAgdGhpcy5fX3ggPSB0aGlzLl9feSA9IHRoaXMuX19yb3dfc3RhcnRfaW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlRHJhZ01vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5faGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVIZWFkZXJDbGljayk7XG4gICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5faGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG5cbiAgICAgICAgdGhpcy5fZW1wdHlIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5fZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgLy8gcmVsZWFzZSBjYWNoZWQgRE9NIG5vZGVzXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY1trZXldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNba2V5XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogU2VhcmNoZXMgYW5kIHJldHVybnMgdGhlIGZpcnN0IG9jY3VyZW5jZSBvZiBhbiBhcnJheSBpdGVtIHdpdGggdGhlIGdpdmVuIHByb3BlcnR5LlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9maW5kV2hlcmVcbiAqL1xuXG5sZXQgX2ZpbmRXaGVyZUluZGV4ID0gbnVsbDtcblxuLyoqXG4gKiBAcGFyYW0gIHtBcnJheVtPYmplY3RdfSBhcnJheSAgICAgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgcHJvcGVydHkgIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYXRjaCBhZ2FpbnN0XG4gKiBAcGFyYW0gIHsqfSAgICAgICAgICAgICB2YWx1ZSAgICAgdGhlIHZhbHVlIHRvIG1hdGNoIGFnYWluc3QgKHVzZXMgc3RyaWN0IGVxdWFsaXR5KVxuICpcbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9IFRoZSBtYXRjaGVkIGFycmF5IGl0ZW0sIG9yIG5vdGhpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRXaGVyZShhcnJheSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgX2ZpbmRXaGVyZUluZGV4ID0gYXJyYXkubGVuZ3RoIC0gMTtcblxuICAgIHdoaWxlIChfZmluZFdoZXJlSW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXlbX2ZpbmRXaGVyZUluZGV4XVtwcm9wZXJ0eV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbX2ZpbmRXaGVyZUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9maW5kV2hlcmVJbmRleCAtPSAxO1xuICAgIH1cbn0gLy8gb3B0aW1pemVkIHNwZWNpZmljYWxseSB0byBvbmx5IGxvb2sgZm9yIGEgc2luZ2xlIGtleTp2YWx1ZSBtYXRjaFxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWNcbiAqIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgY29uc3QgcG9zc2liaWxpdGllcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICdXZWJraXRUcmFuc2Zvcm0nLFxuICAgICAgICAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgJ09UcmFuc2Zvcm0nLFxuICAgICAgICAnbXNUcmFuc2Zvcm0nLFxuICAgICAgICAnd2Via2l0LXRyYW5zZm9ybScsIC8vIHVzZWQgaW4gSlNET01cbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHBvc3NpYmlsaXRpZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHBvc3NpYmlsaXRpZXNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zc2liaWxpdGllc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHJldHVybiBzdHIucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlLCAnXFxcXCQmJyk7XG59O1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCxcbiAgICBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uXG4gKiBbYE51bWJlci5pc0ludGVnZXJgXShodHRwczovL21kbi5pby9OdW1iZXIvaXNJbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNJbnRlZ2VyKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNJbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNJbnRlZ2VyKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PSB0b0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIGZpbml0ZSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEyLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0Zpbml0ZSgzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b0Zpbml0ZShOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9GaW5pdGUoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvRmluaXRlKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b0Zpbml0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiAwO1xuICB9XG4gIHZhbHVlID0gdG9OdW1iZXIodmFsdWUpO1xuICBpZiAodmFsdWUgPT09IElORklOSVRZIHx8IHZhbHVlID09PSAtSU5GSU5JVFkpIHtcbiAgICB2YXIgc2lnbiA9ICh2YWx1ZSA8IDAgPyAtMSA6IDEpO1xuICAgIHJldHVybiBzaWduICogTUFYX0lOVEVHRVI7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IHZhbHVlIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9JbnRlZ2VyYF0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvaW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgaW50ZWdlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0ludGVnZXIoMy4yKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLnRvSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDBcbiAqXG4gKiBfLnRvSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICpcbiAqIF8udG9JbnRlZ2VyKCczLjInKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSB0b0Zpbml0ZSh2YWx1ZSksXG4gICAgICByZW1haW5kZXIgPSByZXN1bHQgJSAxO1xuXG4gIHJldHVybiByZXN1bHQgPT09IHJlc3VsdCA/IChyZW1haW5kZXIgPyByZXN1bHQgLSByZW1haW5kZXIgOiByZXN1bHQpIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW50ZWdlcjtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmNsdWRlc2AgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBzcGVjaWZ5aW5nIGFuIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFycmF5SW5jbHVkZXNgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYSBjb21wYXJhdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlc1dpdGgoYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGNvbXBhcmF0b3IodmFsdWUsIGFycmF5W2luZGV4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZEluZGV4YCBhbmQgYF8uZmluZExhc3RJbmRleGAgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmluZGV4T2ZgIHdpdGhvdXQgYGZyb21JbmRleGAgYm91bmRzIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICBpZiAodmFsdWUgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIGJhc2VGaW5kSW5kZXgoYXJyYXksIGJhc2VJc05hTiwgZnJvbUluZGV4KTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmFOYCB3aXRob3V0IHN1cHBvcnQgZm9yIG51bWJlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KSxcbiAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlLFxuICAgIHNwcmVhZGFibGVTeW1ib2wgPSBTeW1ib2wgPyBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gICAgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyh2YWx1ZSk7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBtZXRob2RzIGxpa2UgYF8uZGlmZmVyZW5jZWAgd2l0aG91dCBzdXBwb3J0XG4gKiBmb3IgZXhjbHVkaW5nIG11bHRpcGxlIGFycmF5cyBvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGV4Y2x1ZGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmF0b3JdIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBmaWx0ZXJlZCB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VEaWZmZXJlbmNlKGFycmF5LCB2YWx1ZXMsIGl0ZXJhdGVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzLFxuICAgICAgaXNDb21tb24gPSB0cnVlLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gW10sXG4gICAgICB2YWx1ZXNMZW5ndGggPSB2YWx1ZXMubGVuZ3RoO1xuXG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoaXRlcmF0ZWUpIHtcbiAgICB2YWx1ZXMgPSBhcnJheU1hcCh2YWx1ZXMsIGJhc2VVbmFyeShpdGVyYXRlZSkpO1xuICB9XG4gIGlmIChjb21wYXJhdG9yKSB7XG4gICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICB9XG4gIGVsc2UgaWYgKHZhbHVlcy5sZW5ndGggPj0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgIGluY2x1ZGVzID0gY2FjaGVIYXM7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB2YWx1ZXMgPSBuZXcgU2V0Q2FjaGUodmFsdWVzKTtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIHZhbHVlID0gKGNvbXBhcmF0b3IgfHwgdmFsdWUgIT09IDApID8gdmFsdWUgOiAwO1xuICAgIGlmIChpc0NvbW1vbiAmJiBjb21wdXRlZCA9PT0gY29tcHV0ZWQpIHtcbiAgICAgIHZhciB2YWx1ZXNJbmRleCA9IHZhbHVlc0xlbmd0aDtcbiAgICAgIHdoaWxlICh2YWx1ZXNJbmRleC0tKSB7XG4gICAgICAgIGlmICh2YWx1ZXNbdmFsdWVzSW5kZXhdID09PSBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFpbmNsdWRlcyh2YWx1ZXMsIGNvbXB1dGVkLCBjb21wYXJhdG9yKSkge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZsYXR0ZW5gIHdpdGggc3VwcG9ydCBmb3IgcmVzdHJpY3RpbmcgZmxhdHRlbmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge251bWJlcn0gZGVwdGggVGhlIG1heGltdW0gcmVjdXJzaW9uIGRlcHRoLlxuICogQHBhcmFtIHtib29sZWFufSBbcHJlZGljYXRlPWlzRmxhdHRlbmFibGVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1N0cmljdF0gUmVzdHJpY3QgdG8gdmFsdWVzIHRoYXQgcGFzcyBgcHJlZGljYXRlYCBjaGVja3MuXG4gKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0PVtdXSBUaGUgaW5pdGlhbCByZXN1bHQgdmFsdWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGbGF0dGVuKGFycmF5LCBkZXB0aCwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHByZWRpY2F0ZSB8fCAocHJlZGljYXRlID0gaXNGbGF0dGVuYWJsZSk7XG4gIHJlc3VsdCB8fCAocmVzdWx0ID0gW10pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChkZXB0aCA+IDAgJiYgcHJlZGljYXRlKHZhbHVlKSkge1xuICAgICAgaWYgKGRlcHRoID4gMSkge1xuICAgICAgICAvLyBSZWN1cnNpdmVseSBmbGF0dGVuIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICBiYXNlRmxhdHRlbih2YWx1ZSwgZGVwdGggLSAxLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlQdXNoKHJlc3VsdCwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWlzU3RyaWN0KSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0QWxsS2V5c2AgYW5kIGBnZXRBbGxLZXlzSW5gIHdoaWNoIHVzZXNcbiAqIGBrZXlzRnVuY2AgYW5kIGBzeW1ib2xzRnVuY2AgdG8gZ2V0IHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN5bWJvbHNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNGdW5jLCBzeW1ib2xzRnVuYykge1xuICB2YXIgcmVzdWx0ID0ga2V5c0Z1bmMob2JqZWN0KTtcbiAgcmV0dXJuIGlzQXJyYXkob2JqZWN0KSA/IHJlc3VsdCA6IGFycmF5UHVzaChyZXN1bHQsIHN5bWJvbHNGdW5jKG9iamVjdCkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzSW4ob2JqZWN0KTtcbiAgfVxuICB2YXIgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucGlja2Agd2l0aG91dCBzdXBwb3J0IGZvciBpbmRpdmlkdWFsXG4gKiBwcm9wZXJ0eSBpZGVudGlmaWVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBwaWNrLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZVBpY2sob2JqZWN0LCBwcm9wcykge1xuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgcmV0dXJuIGJhc2VQaWNrQnkob2JqZWN0LCBwcm9wcywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJldHVybiBrZXkgaW4gb2JqZWN0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiAgYF8ucGlja0J5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gcGljayBmcm9tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQaWNrQnkob2JqZWN0LCBwcm9wcywgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0ge307XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5KSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzSW4sIGdldFN5bWJvbHNJbik7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2wgcHJvcGVydGllcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9IG5hdGl2ZUdldFN5bWJvbHMgPyBvdmVyQXJnKG5hdGl2ZUdldFN5bWJvbHMsIE9iamVjdCkgOiBzdHViQXJyYXk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBzeW1ib2wgcHJvcGVydGllc1xuICogb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3ltYm9scy5cbiAqL1xudmFyIGdldFN5bWJvbHNJbiA9ICFuYXRpdmVHZXRTeW1ib2xzID8gc3R1YkFycmF5IDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgd2hpbGUgKG9iamVjdCkge1xuICAgIGFycmF5UHVzaChyZXN1bHQsIGdldFN5bWJvbHMob2JqZWN0KSk7XG4gICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBmbGF0dGVuYWJsZSBgYXJndW1lbnRzYCBvYmplY3Qgb3IgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZmxhdHRlbmFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNGbGF0dGVuYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpIHx8XG4gICAgISEoc3ByZWFkYWJsZVN5bWJvbCAmJiB2YWx1ZSAmJiB2YWx1ZVtzcHJlYWRhYmxlU3ltYm9sXSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAqIFtgT2JqZWN0LmtleXNgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGV4Y2VwdCB0aGF0IGl0IGluY2x1ZGVzIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZUtleXNJbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGUgb3Bwb3NpdGUgb2YgYF8ucGlja2A7IHRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZVxuICogb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBgb2JqZWN0YCB0aGF0IGFyZVxuICogbm90IG9taXR0ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uKHN0cmluZ3xzdHJpbmdbXSl9IFtwcm9wc10gVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIG9taXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqXG4gKiBfLm9taXQob2JqZWN0LCBbJ2EnLCAnYyddKTtcbiAqIC8vID0+IHsgJ2InOiAnMicgfVxuICovXG52YXIgb21pdCA9IGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgcHJvcHMpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIHByb3BzID0gYXJyYXlNYXAoYmFzZUZsYXR0ZW4ocHJvcHMsIDEpLCB0b0tleSk7XG4gIHJldHVybiBiYXNlUGljayhvYmplY3QsIGJhc2VEaWZmZXJlbmNlKGdldEFsbEtleXNJbihvYmplY3QpLCBwcm9wcykpO1xufSk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb21pdDtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy52YWx1ZXNgIGFuZCBgXy52YWx1ZXNJbmAgd2hpY2ggY3JlYXRlcyBhblxuICogYXJyYXkgb2YgYG9iamVjdGAgcHJvcGVydHkgdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByb3BlcnR5IG5hbWVzXG4gKiBvZiBgcHJvcHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gZ2V0IHZhbHVlcyBmb3IuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VWYWx1ZXMob2JqZWN0LCBwcm9wcykge1xuICByZXR1cm4gYXJyYXlNYXAocHJvcHMsIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3Rba2V5XTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnR5IHZhbHVlcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy52YWx1ZXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbMSwgMl0gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLnZhbHVlcygnaGknKTtcbiAqIC8vID0+IFsnaCcsICdpJ11cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKG9iamVjdCkge1xuICByZXR1cm4gb2JqZWN0ID8gYmFzZVZhbHVlcyhvYmplY3QsIGtleXMob2JqZWN0KSkgOiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2YWx1ZXM7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5jbHVkZXNgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogc3BlY2lmeWluZyBhbiBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXMoYXJyYXksIHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIDApID4gLTE7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhcnJheUluY2x1ZGVzYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGEgY29tcGFyYXRvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXNXaXRoKGFycmF5LCB2YWx1ZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChjb21wYXJhdG9yKHZhbHVlLCBhcnJheVtpbmRleF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDEgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBgZnJvbUluZGV4YCBib3VuZHMgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUlzTmFOLCBmcm9tSW5kZXgpO1xuICB9XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYU5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbnVtYmVyIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYE5hTmAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSGFzKGNhY2hlLCBrZXkpIHtcbiAgcmV0dXJuIGNhY2hlLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIG1ldGhvZHMgbGlrZSBgXy5kaWZmZXJlbmNlYCB3aXRob3V0IHN1cHBvcnRcbiAqIGZvciBleGNsdWRpbmcgbXVsdGlwbGUgYXJyYXlzIG9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gZXhjbHVkZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGZpbHRlcmVkIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZURpZmZlcmVuY2UoYXJyYXksIHZhbHVlcywgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXMsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBbXSxcbiAgICAgIHZhbHVlc0xlbmd0aCA9IHZhbHVlcy5sZW5ndGg7XG5cbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmIChpdGVyYXRlZSkge1xuICAgIHZhbHVlcyA9IGFycmF5TWFwKHZhbHVlcywgYmFzZVVuYXJ5KGl0ZXJhdGVlKSk7XG4gIH1cbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXNXaXRoO1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gIH1cbiAgZWxzZSBpZiAodmFsdWVzLmxlbmd0aCA+PSBMQVJHRV9BUlJBWV9TSVpFKSB7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIHZhbHVlcyA9IG5ldyBTZXRDYWNoZSh2YWx1ZXMpO1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgdmFsdWUgPSAoY29tcGFyYXRvciB8fCB2YWx1ZSAhPT0gMCkgPyB2YWx1ZSA6IDA7XG4gICAgaWYgKGlzQ29tbW9uICYmIGNvbXB1dGVkID09PSBjb21wdXRlZCkge1xuICAgICAgdmFyIHZhbHVlc0luZGV4ID0gdmFsdWVzTGVuZ3RoO1xuICAgICAgd2hpbGUgKHZhbHVlc0luZGV4LS0pIHtcbiAgICAgICAgaWYgKHZhbHVlc1t2YWx1ZXNJbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWluY2x1ZGVzKHZhbHVlcywgY29tcHV0ZWQsIGNvbXBhcmF0b3IpKSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgZXhjbHVkaW5nIGFsbCBnaXZlbiB2YWx1ZXMgdXNpbmdcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogKipOb3RlOioqIFVubGlrZSBgXy5wdWxsYCwgdGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsuLi4qfSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGV4Y2x1ZGUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBmaWx0ZXJlZCB2YWx1ZXMuXG4gKiBAc2VlIF8uZGlmZmVyZW5jZSwgXy54b3JcbiAqIEBleGFtcGxlXG4gKlxuICogXy53aXRob3V0KFsyLCAxLCAyLCAzXSwgMSwgMik7XG4gKiAvLyA9PiBbM11cbiAqL1xudmFyIHdpdGhvdXQgPSBiYXNlUmVzdChmdW5jdGlvbihhcnJheSwgdmFsdWVzKSB7XG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdChhcnJheSlcbiAgICA/IGJhc2VEaWZmZXJlbmNlKGFycmF5LCB2YWx1ZXMpXG4gICAgOiBbXTtcbn0pO1xuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpdGhvdXQ7XG4iXX0=
