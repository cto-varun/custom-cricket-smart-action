"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = componentSmartAction;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _reactRouterDom = require("react-router-dom");
var _componentCache = require("@ivoyant/component-cache");
var _antdRobot = _interopRequireDefault(require("./assets/antdRobot.svg"));
var _shortid = _interopRequireDefault(require("shortid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const FooterButton = props => {
  const {
    text = '',
    hyperlink = 'closeActions',
    modalCloseFunction,
    index,
    optionsLength
  } = props;
  let style;
  if (hyperlink !== 'closeActions') {
    if (index === 0) {
      style = {
        color: 'white',
        backgroundColor: '#52c41a'
      };
    }
    if (index > 0 && index < optionsLength) {
      style = {
        color: '#52c41a',
        backgroundColor: '#f6ffed',
        borderColor: '#52c41a'
      };
    }
  }
  let onClickFunction;
  if (hyperlink === 'closeActions') {
    onClickFunction = modalCloseFunction;
  } else {
    onClickFunction = () => {
      _componentCache.cache.put('smartAction', {
        smartActionFiredOnce: true
      });
      window[sessionStorage?.tabId]?.navigateRoute(hyperlink);
      modalCloseFunction();
    };
  }
  return /*#__PURE__*/_react.default.createElement(_antd.Button, {
    key: text,
    onClick: onClickFunction,
    style: style
  }, text);
};
const getFooter = (options, modalCloseFunction) => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, options && options?.map((option, index) => {
    return /*#__PURE__*/_react.default.createElement(FooterButton, {
      text: option?.text,
      hyperlink: option?.hyperlink,
      modalCloseFunction: modalCloseFunction,
      index: _shortid.default.generate(),
      optionsLength: options?.length
    });
  }));
};
function componentSmartAction(props) {
  const location = (0, _reactRouterDom.useLocation)();
  const history = (0, _reactRouterDom.useHistory)();
  const {
    component,
    children,
    data,
    datasources
  } = props;
  const {
    params
  } = component;
  const {
    modalClassName = '',
    maskClosable = false,
    closable = false
  } = params;
  const recommendations = data?.data?.recommendations?.recommendations;
  const [modalVisible, setModalVisible] = (0, _react.useState)(recommendations?.length > 0 && _componentCache.cache.get('smartAction')?.smartActionFiredOnce !== true);
  const handleClose = () => {
    _componentCache.cache.put('smartAction', {
      smartActionFiredOnce: true
    });
    setModalVisible(false);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, recommendations?.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: modalClassName
  }, /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("img", {
      src: _antdRobot.default
    }), "\xA0Did you know?"),
    open: modalVisible,
    onCancel: handleClose,
    maskClosable: maskClosable,
    className: modalClassName,
    footer: getFooter(recommendations?.[0]?.options, handleClose),
    centered: true,
    closable: closable,
    forceRender: true
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "smartActionModalActionName",
    style: {
      color: '#52c41a'
    }
  }, recommendations?.[0]?.actionName), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", {
    className: "smartActionModalMessage"
  }, recommendations?.[0]?.message))));
}
module.exports = exports.default;