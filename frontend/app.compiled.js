"use strict";

var _excluded = ["name", "className"];
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useMemo = _React.useMemo;

// Safe LocalStorage Wrapper to prevent crashes in private-browsing or restricted cookie environments
var safeStorage = {
  getItem: function getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("localStorage.getItem failed:", e);
      return null;
    }
  },
  setItem: function setItem(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {
      console.warn("localStorage.setItem failed:", e);
    }
  },
  removeItem: function removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("localStorage.removeItem failed:", e);
    }
  }
};

// In-React high-fidelity SVG icon system
var Icon = function Icon(_ref) {
  var name = _ref.name,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "w-5 h-5" : _ref$className,
    props = _objectWithoutProperties(_ref, _excluded);
  var icons = {
    book: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    })),
    fileText: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })),
    video: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    })),
    plus: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 4v16m8-8H4"
    })),
    search: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    })),
    arrowLeft: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M10 19l-7-7m0 0l7-7m-7 7h18"
    })),
    trash: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })),
    upload: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })),
    download: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    })),
    externalLink: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    })),
    layers: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    })),
    clock: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    })),
    edit: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })),
    save: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    })),
    bookOpen: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    })),
    chevronRight: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 5l7 7-7 7"
    })),
    play: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "currentColor",
      viewBox: "0 0 24 24",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      d: "M8 5v14l11-7z"
    })),
    folder: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    })),
    folderPlus: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })),
    check: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    })),
    loader: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17"
    })),
    sparkles: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.096.813zM19.071 4.929l-.707 1.414-1.414.707 1.414.707.707 1.414.707-1.414 1.414-.707-1.414-.707-.707-1.414z"
    })),
    alertTriangle: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })),
    eye: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    }), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    }))
  };
  return icons[name] || /*#__PURE__*/React.createElement("svg", _extends({
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    className: className
  }, props), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }));
};
var LOCAL_BACKEND_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://127.0.0.1:8000" : ""; // Use backend API routes relative to current host in production
var API_BASE = LOCAL_BACKEND_URL;
function App() {
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    courses = _useState2[0],
    setCourses = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    activeCourse = _useState4[0],
    setActiveCourse = _useState4[1];

  // Two primary sections: "books" or "slides"
  var _useState5 = useState("books"),
    _useState6 = _slicedToArray(_useState5, 2),
    primarySection = _useState6[0],
    setPrimarySection = _useState6[1];

  // Academic Level & Term selections
  var _useState7 = useState(function () {
      return safeStorage.getItem("che_selected_level") || "Level-3";
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedLevel = _useState8[0],
    setSelectedLevel = _useState8[1];
  var _useState9 = useState(function () {
      return safeStorage.getItem("che_selected_term") || "Term-2";
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    selectedTerm = _useState10[0],
    setSelectedTerm = _useState10[1];
  var _useState11 = useState(""),
    _useState12 = _slicedToArray(_useState11, 2),
    searchQuery = _useState12[0],
    setSearchQuery = _useState12[1];
  var _useState13 = useState(""),
    _useState14 = _slicedToArray(_useState13, 2),
    fileSearchQuery = _useState14[0],
    setFileSearchQuery = _useState14[1];
  var _useState15 = useState(true),
    _useState16 = _slicedToArray(_useState15, 2),
    loading = _useState16[0],
    setLoading = _useState16[1];

  // Links state
  var _useState17 = useState([]),
    _useState18 = _slicedToArray(_useState17, 2),
    referenceLinks = _useState18[0],
    setReferenceLinks = _useState18[1];
  var _useState19 = useState({
      title: "",
      url: "",
      category: "YouTube"
    }),
    _useState20 = _slicedToArray(_useState19, 2),
    newLink = _useState20[0],
    setNewLink = _useState20[1];
  var _useState21 = useState(false),
    _useState22 = _slicedToArray(_useState21, 2),
    isSavingLink = _useState22[0],
    setIsSavingLink = _useState22[1];
  var _useState23 = useState(null),
    _useState24 = _slicedToArray(_useState23, 2),
    playingVideoUrl = _useState24[0],
    setPlayingVideoUrl = _useState24[1];

  // Files & Preview states
  var _useState25 = useState(null),
    _useState26 = _slicedToArray(_useState25, 2),
    previewFile = _useState26[0],
    setPreviewFile = _useState26[1]; // {name, path, size, type}
  var _useState27 = useState(""),
    _useState28 = _slicedToArray(_useState27, 2),
    previewUrl = _useState28[0],
    setPreviewUrl = _useState28[1];
  var _useState29 = useState(false),
    _useState30 = _slicedToArray(_useState29, 2),
    previewLoading = _useState30[0],
    setPreviewLoading = _useState30[1];
  var prevPreviewFileRef = useRef(null);

  // Reset preview states on file switch
  useEffect(function () {
    if (previewFile) {
      if (prevPreviewFileRef.current && prevPreviewFileRef.current.index === previewFile.index && prevPreviewFileRef.current.name === previewFile.name) {
        return;
      }
    }
    prevPreviewFileRef.current = previewFile;
  }, [previewFile]);

  // Book upload states
  var _useState31 = useState([]),
    _useState32 = _slicedToArray(_useState31, 2),
    bookUploadFile = _useState32[0],
    setBookUploadFile = _useState32[1];
  var _useState33 = useState(false),
    _useState34 = _slicedToArray(_useState33, 2),
    isBookUploading = _useState34[0],
    setIsBookUploading = _useState34[1];
  var _useState35 = useState(0),
    _useState36 = _slicedToArray(_useState35, 2),
    bookUploadProgress = _useState36[0],
    setBookUploadProgress = _useState36[1];
  var _useState37 = useState({
      type: "",
      message: ""
    }),
    _useState38 = _slicedToArray(_useState37, 2),
    bookUploadStatus = _useState38[0],
    setBookUploadStatus = _useState38[1];
  var bookFileInputRef = useRef(null);

  // Slide upload states
  var _useState39 = useState([]),
    _useState40 = _slicedToArray(_useState39, 2),
    slideUploadFile = _useState40[0],
    setSlideUploadFile = _useState40[1];
  var _useState41 = useState(false),
    _useState42 = _slicedToArray(_useState41, 2),
    isSlideUploading = _useState42[0],
    setIsSlideUploading = _useState42[1];
  var _useState43 = useState(0),
    _useState44 = _slicedToArray(_useState43, 2),
    slideUploadProgress = _useState44[0],
    setSlideUploadProgress = _useState44[1];
  var _useState45 = useState({
      type: "",
      message: ""
    }),
    _useState46 = _slicedToArray(_useState45, 2),
    slideUploadStatus = _useState46[0],
    setSlideUploadStatus = _useState46[1];
  var slideFileInputRef = useRef(null);

  // Term-Final Question upload states
  var _useState47 = useState([]),
    _useState48 = _slicedToArray(_useState47, 2),
    questionUploadFile = _useState48[0],
    setQuestionUploadFile = _useState48[1];
  var _useState49 = useState(false),
    _useState50 = _slicedToArray(_useState49, 2),
    isQuestionUploading = _useState50[0],
    setIsQuestionUploading = _useState50[1];
  var _useState51 = useState(0),
    _useState52 = _slicedToArray(_useState51, 2),
    questionUploadProgress = _useState52[0],
    setQuestionUploadProgress = _useState52[1];
  var _useState53 = useState({
      type: "",
      message: ""
    }),
    _useState54 = _slicedToArray(_useState53, 2),
    questionUploadStatus = _useState54[0],
    setQuestionUploadStatus = _useState54[1];
  var questionFileInputRef = useRef(null);

  // Solution Manual upload states
  var _useState55 = useState([]),
    _useState56 = _slicedToArray(_useState55, 2),
    solutionUploadFile = _useState56[0],
    setSolutionUploadFile = _useState56[1];
  var _useState57 = useState(false),
    _useState58 = _slicedToArray(_useState57, 2),
    isSolutionUploading = _useState58[0],
    setIsSolutionUploading = _useState58[1];
  var _useState59 = useState(0),
    _useState60 = _slicedToArray(_useState59, 2),
    solutionUploadProgress = _useState60[0],
    setSolutionUploadProgress = _useState60[1];
  var _useState61 = useState({
      type: "",
      message: ""
    }),
    _useState62 = _slicedToArray(_useState61, 2),
    solutionUploadStatus = _useState62[0],
    setSolutionUploadStatus = _useState62[1];
  var solutionFileInputRef = useRef(null);

  // Term-Final Solved upload states
  var _useState63 = useState([]),
    _useState64 = _slicedToArray(_useState63, 2),
    solvedUploadFile = _useState64[0],
    setSolvedUploadFile = _useState64[1];
  var _useState65 = useState(false),
    _useState66 = _slicedToArray(_useState65, 2),
    isSolvedUploading = _useState66[0],
    setIsSolvedUploading = _useState66[1];
  var _useState67 = useState(0),
    _useState68 = _slicedToArray(_useState67, 2),
    solvedUploadProgress = _useState68[0],
    setSolvedUploadProgress = _useState68[1];
  var _useState69 = useState({
      type: "",
      message: ""
    }),
    _useState70 = _slicedToArray(_useState69, 2),
    solvedUploadStatus = _useState70[0],
    setSolvedUploadStatus = _useState70[1];
  var solvedFileInputRef = useRef(null);

  // Current active folder in slides section
  var _useState71 = useState("Root"),
    _useState72 = _slicedToArray(_useState71, 2),
    currentFolder = _useState72[0],
    setCurrentFolder = _useState72[1];

  // Current active folder in recorded class section
  var _useState73 = useState("Root"),
    _useState74 = _slicedToArray(_useState73, 2),
    currentVideoFolder = _useState74[0],
    setCurrentVideoFolder = _useState74[1];
  var _useState75 = useState(""),
    _useState76 = _slicedToArray(_useState75, 2),
    videoSearchQuery = _useState76[0],
    setVideoSearchQuery = _useState76[1];

  // Recorded Class video upload states
  var _useState77 = useState([]),
    _useState78 = _slicedToArray(_useState77, 2),
    videoUploadFile = _useState78[0],
    setVideoUploadFile = _useState78[1];
  var _useState79 = useState(false),
    _useState80 = _slicedToArray(_useState79, 2),
    isVideoUploading = _useState80[0],
    setIsVideoUploading = _useState80[1];
  var _useState81 = useState(0),
    _useState82 = _slicedToArray(_useState81, 2),
    videoUploadProgress = _useState82[0],
    setVideoUploadProgress = _useState82[1];
  var _useState83 = useState({
      type: "",
      message: ""
    }),
    _useState84 = _slicedToArray(_useState83, 2),
    videoUploadStatus = _useState84[0],
    setVideoUploadStatus = _useState84[1];
  var videoFileInputRef = useRef(null);

  // Reference to track previous course ID to prevent tab resetting on same-course refresh
  var prevCourseIdRef = useRef(null);

  // Dynamic course creator states
  var _useState85 = useState({
      code: "",
      title: "",
      description: ""
    }),
    _useState86 = _slicedToArray(_useState85, 2),
    newCourse = _useState86[0],
    setNewCourse = _useState86[1];
  var _useState87 = useState(false),
    _useState88 = _slicedToArray(_useState87, 2),
    isCreatingCourse = _useState88[0],
    setIsCreatingCourse = _useState88[1];
  var _useState89 = useState(""),
    _useState90 = _slicedToArray(_useState89, 2),
    courseError = _useState90[0],
    setCourseError = _useState90[1];

  // Dynamic course editor states
  var _useState91 = useState(null),
    _useState92 = _slicedToArray(_useState91, 2),
    editingCourse = _useState92[0],
    setEditingCourse = _useState92[1];
  var _useState93 = useState({
      code: "",
      title: "",
      description: ""
    }),
    _useState94 = _slicedToArray(_useState93, 2),
    editCourseFields = _useState94[0],
    setEditCourseFields = _useState94[1];
  var _useState95 = useState(false),
    _useState96 = _slicedToArray(_useState95, 2),
    isSavingCourseEdit = _useState96[0],
    setIsSavingCourseEdit = _useState96[1];
  var _useState97 = useState(""),
    _useState98 = _slicedToArray(_useState97, 2),
    editCourseError = _useState98[0],
    setEditCourseError = _useState98[1];

  // Administrative Passcode System States
  var _useState99 = useState(false),
    _useState100 = _slicedToArray(_useState99, 2),
    showAuthModal = _useState100[0],
    setShowAuthModal = _useState100[1];
  var _useState101 = useState(""),
    _useState102 = _slicedToArray(_useState101, 2),
    authPasswordInput = _useState102[0],
    setAuthPasswordInput = _useState102[1];
  var _useState103 = useState(""),
    _useState104 = _slicedToArray(_useState103, 2),
    authError = _useState104[0],
    setAuthError = _useState104[1];
  var _useState105 = useState(null),
    _useState106 = _slicedToArray(_useState105, 2),
    pendingAuthCallback = _useState106[0],
    setPendingAuthCallback = _useState106[1];
  var _useState107 = useState(false),
    _useState108 = _slicedToArray(_useState107, 2),
    isAuthorizedState = _useState108[0],
    setIsAuthorizedState = _useState108[1];

  // Secure Download Passcode System States
  var _useState109 = useState(false),
    _useState110 = _slicedToArray(_useState109, 2),
    showDownloadAuthModal = _useState110[0],
    setShowDownloadAuthModal = _useState110[1];
  var _useState111 = useState(""),
    _useState112 = _slicedToArray(_useState111, 2),
    downloadPasswordInput = _useState112[0],
    setDownloadPasswordInput = _useState112[1];
  var _useState113 = useState(""),
    _useState114 = _slicedToArray(_useState113, 2),
    downloadAuthError = _useState114[0],
    setDownloadAuthError = _useState114[1];
  var _useState115 = useState(null),
    _useState116 = _slicedToArray(_useState115, 2),
    pendingDownloadCallback = _useState116[0],
    setPendingDownloadCallback = _useState116[1];

  // Fetch all courses on mount
  var fetchCourses = async function fetchCourses() {
    try {
      setLoading(true);
      var res = await fetch("".concat(API_BASE, "/api/courses?t=").concat(Date.now()));
      if (!res.ok) throw new Error("Failed to load courses");
      var data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(function () {
    fetchCourses();
  }, []);

  // Persist Level & Term changes
  useEffect(function () {
    safeStorage.setItem("che_selected_level", selectedLevel);
    safeStorage.setItem("che_selected_term", selectedTerm);
  }, [selectedLevel, selectedTerm]);

  // Load PDF directly — always use backend URL for preview (Catbox blocks CORS from browser fetch)
  // PDF.js needs fetch access to the URL; Catbox doesn't send Access-Control-Allow-Origin headers
  useEffect(function () {
    if (!previewFile || !activeCourse) {
      setPreviewUrl("");
      setPreviewLoading(false);
      return;
    }
    var isPdf = (previewFile.type || "").toUpperCase().includes('PDF') || (previewFile.name || "").toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setPreviewUrl("");
      setPreviewLoading(false);
      return;
    }
    setPreviewLoading(true);

    // Backend proxy URL — supports CORS and streams bytes to PDF.js for progressive rendering
    var directUrl = "".concat(API_BASE, "/api/download/").concat(activeCourse.id, "/").concat(previewFile.index, "?preview=true");
    setPreviewUrl(directUrl);
    var safetyTimer = setTimeout(function () {
      setPreviewLoading(false);
    }, 15000);
    return function () {
      return clearTimeout(safetyTimer);
    };
  }, [previewFile, activeCourse]);

  // Trigger MathJax typesetting whenever the preview file changes
  useEffect(function () {
    if (window.MathJax && previewFile && previewFile.summary) {
      // Allow the DOM to update first, then typeset
      var timer = setTimeout(function () {
        try {
          window.MathJax.typesetPromise();
        } catch (err) {
          console.error("MathJax typesetting failed:", err);
        }
      }, 300);
      return function () {
        return clearTimeout(timer);
      };
    }
  }, [previewFile]);

  // Restore active course from safeStorage once courses list is loaded
  useEffect(function () {
    if (courses.length > 0 && !activeCourse) {
      var savedCourseId = safeStorage.getItem("che_active_course_id");
      if (savedCourseId) {
        var found = courses.find(function (c) {
          return c.id === savedCourseId;
        });
        if (found) {
          setActiveCourse(found);
        }
      }
    }
  }, [courses]);

  // Persist active course ID when activeCourse changes
  useEffect(function () {
    if (activeCourse) {
      safeStorage.setItem("che_active_course_id", activeCourse.id);
    } else {
      safeStorage.removeItem("che_active_course_id");
    }
  }, [activeCourse]);

  // Fetch course-specific resources on active course change
  useEffect(function () {
    if (!activeCourse) return;

    // Only reset states if the student has switched to a different course
    var isNewCourse = prevCourseIdRef.current !== activeCourse.id;
    prevCourseIdRef.current = activeCourse.id;
    if (isNewCourse) {
      setPreviewFile(null);
      setFileSearchQuery("");
      setVideoSearchQuery("");
      setPrimarySection("books"); // Default to Books section
      var firstFolder = activeCourse.folders && activeCourse.folders.length > 0 ? activeCourse.folders[0] : "Root";
      setCurrentFolder(firstFolder);
      var firstVideoFolder = activeCourse.video_folders && activeCourse.video_folders.length > 0 ? activeCourse.video_folders[0] : "Root";
      setCurrentVideoFolder(firstVideoFolder);
    }

    // Load reference links
    var loadLinks = async function loadLinks() {
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(activeCourse.id, "/links"));
        var data = await res.json();
        setReferenceLinks(data);
      } catch (err) {
        console.error("Links load failed", err);
      }
    };
    loadLinks();
  }, [activeCourse]);

  // Admin Session Expiry checker (12 hours duration)
  useEffect(function () {
    var checkStatus = function checkStatus() {
      var authTime = safeStorage.getItem("che_auth_until");
      setIsAuthorizedState(authTime && Date.now() < parseInt(authTime));
    };
    checkStatus();
    var interval = setInterval(checkStatus, 15000); // Check expiry every 15 seconds
    return function () {
      return clearInterval(interval);
    };
  }, []);

  // Secure authorization wrapper for creating, editing, and deleting items
  var checkAuthAndExecute = function checkAuthAndExecute(callback) {
    var authTime = safeStorage.getItem("che_auth_until");
    var isAuthorized = authTime && Date.now() < parseInt(authTime);
    if (isAuthorized) {
      callback();
    } else {
      setPendingAuthCallback(function () {
        return callback;
      });
      setAuthPasswordInput("");
      setAuthError("");
      setShowAuthModal(true);
    }
  };

  // Passcode verification
  var handleVerifyPassword = function handleVerifyPassword(e) {
    e.preventDefault();
    if (authPasswordInput.trim() === "che@ddc") {
      var expiry = Date.now() + 12 * 60 * 60 * 1000; // 12 hours session
      safeStorage.setItem("che_auth_until", expiry.toString());
      setIsAuthorizedState(true);
      setShowAuthModal(false);
      setAuthError("");
      if (pendingAuthCallback) {
        pendingAuthCallback();
        setPendingAuthCallback(null);
      }
    } else {
      setAuthError("Incorrect passcode. Access denied.");
    }
  };

  // Secure authorization wrapper for downloading files/videos
  var checkDownloadAuthAndExecute = function checkDownloadAuthAndExecute(callback) {
    var authTime = safeStorage.getItem("che_download_auth_until");
    var isAuthorized = authTime && Date.now() < parseInt(authTime);
    if (isAuthorized) {
      callback();
    } else {
      setPendingDownloadCallback(function () {
        return callback;
      });
      setDownloadPasswordInput("");
      setDownloadAuthError("");
      setShowDownloadAuthModal(true);
    }
  };

  // Passcode verification for downloads (supports designated and admin passcodes)
  var handleVerifyDownloadPassword = function handleVerifyDownloadPassword(e) {
    if (e) e.preventDefault();
    var inputPass = downloadPasswordInput.trim();
    if (inputPass === "che@obe" || inputPass === "che@ddc") {
      var expiry = Date.now() + 6 * 60 * 60 * 1000; // Exactly 6 hours session
      safeStorage.setItem("che_download_auth_until", expiry.toString());
      setShowDownloadAuthModal(false);
      setDownloadAuthError("");
      if (pendingDownloadCallback) {
        pendingDownloadCallback();
        setPendingDownloadCallback(null);
      }
    } else {
      setDownloadAuthError("Incorrect download passcode. Access denied.");
    }
  };

  // Dynamic book classifier
  var isBookFile = function isBookFile(file) {
    var name = file.name.toLowerCase();
    return name.includes("book") || name.includes("edition") || name.includes("manual") || name.includes("solution") || name.includes("levenspiel") || name.includes("fogler") || name.includes("geankopolis") || name.includes("wankat") || name.includes("cussler") || name.includes("brennan") || name.includes("foust") || name.includes("coulson") || name.includes("rhodes") || name.includes("chopra") || file.bytes > 5 * 1024 * 1024; // Files > 5MB are highly likely books
  };

  // Split files into Books, Solutions, Slides, Questions, Solved, and Videos
  var _useMemo = useMemo(function () {
      if (!activeCourse || !activeCourse.files) return {
        booksList: [],
        solutionsList: [],
        slidesList: [],
        questionsList: [],
        solvedList: [],
        videosList: []
      };
      var books = [];
      var solutions = [];
      var slides = [];
      var questions = [];
      var solved = [];
      var videos = [];
      activeCourse.files.forEach(function (file, index) {
        var fileWithIndex = {
          ...file,
          index: index
        };
        var typeLower = (file.type || "").toLowerCase();
        if (typeLower.includes("video") || typeLower.includes("recorded class") || file.category === "video" || file.category === "recorded_class") {
          videos.push(fileWithIndex);
        } else if (typeLower.includes("reference book") || typeLower.includes("book") && !typeLower.includes("manual") && !typeLower.includes("solved") && !typeLower.includes("solution")) {
          books.push(fileWithIndex);
        } else if (typeLower.includes("solution manual") || typeLower.includes("manual")) {
          solutions.push(fileWithIndex);
        } else if (typeLower.includes("term-final question") || typeLower.includes("question")) {
          questions.push(fileWithIndex);
        } else if (typeLower.includes("term-final solved") || typeLower.includes("solved") || typeLower.includes("solve")) {
          solved.push(fileWithIndex);
        } else {
          slides.push(fileWithIndex);
        }
      });
      return {
        booksList: books,
        solutionsList: solutions,
        slidesList: slides,
        questionsList: questions,
        solvedList: solved,
        videosList: videos
      };
    }, [activeCourse]),
    booksList = _useMemo.booksList,
    solutionsList = _useMemo.solutionsList,
    slidesList = _useMemo.slidesList,
    questionsList = _useMemo.questionsList,
    solvedList = _useMemo.solvedList,
    videosList = _useMemo.videosList;

  // Handle dynamic course creation
  var handleCreateCourse = function handleCreateCourse(e) {
    if (e) e.preventDefault();
    if (!newCourse.code || !newCourse.title || !selectedLevel || !selectedTerm) {
      setCourseError("Please specify Course Code, Title, and select a Level & Term.");
      return;
    }
    checkAuthAndExecute(async function () {
      setIsCreatingCourse(true);
      setCourseError("");
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            code: newCourse.code,
            title: newCourse.title,
            description: newCourse.description || "Study materials for ".concat(newCourse.code),
            level: selectedLevel,
            term: selectedTerm
          })
        });
        if (res.ok) {
          await fetchCourses();
          setNewCourse({
            code: "",
            title: "",
            description: ""
          });
        } else {
          var errData = await res.json();
          setCourseError(errData.detail || "Failed to create course");
        }
      } catch (err) {
        setCourseError("Network error. Failed to connect to server.");
      } finally {
        setIsCreatingCourse(false);
      }
    });
  };

  // Start course editing flow
  var handleStartEditCourse = function handleStartEditCourse(course) {
    setEditingCourse(course);
    setEditCourseFields({
      code: course.code,
      title: course.title,
      description: course.description
    });
    setEditCourseError("");
  };

  // Save course updates
  var handleSaveCourseEdit = function handleSaveCourseEdit(e) {
    if (e) e.preventDefault();
    if (!editCourseFields.code || !editCourseFields.title) {
      setEditCourseError("Course Code and Title are required.");
      return;
    }
    checkAuthAndExecute(async function () {
      setIsSavingCourseEdit(true);
      setEditCourseError("");
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(editingCourse.id), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editCourseFields)
        });
        if (res.ok) {
          await fetchCourses();
          setEditingCourse(null);
        } else {
          var errData = await res.json();
          setEditCourseError(errData.detail || "Failed to save course changes");
        }
      } catch (err) {
        setEditCourseError("Failed to save changes: connection error");
      } finally {
        setIsSavingCourseEdit(false);
      }
    });
  };

  // Handle adding a reference link
  var handleAddLink = function handleAddLink(e) {
    if (e) e.preventDefault();
    if (!newLink.title || !newLink.url) return;
    checkAuthAndExecute(async function () {
      setIsSavingLink(true);
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(activeCourse.id, "/links"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newLink)
        });
        if (res.ok) {
          var data = await res.json();
          setReferenceLinks(data);
          setNewLink({
            title: "",
            url: "",
            category: "YouTube"
          });
        }
      } catch (err) {
        console.error("Failed to add link", err);
      } finally {
        setIsSavingLink(false);
      }
    });
  };

  // Handle deleting a reference link
  var handleDeleteLink = function handleDeleteLink(linkId) {
    checkAuthAndExecute(async function () {
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(activeCourse.id, "/links/").concat(linkId), {
          method: "DELETE"
        });
        if (res.ok) {
          var data = await res.json();
          setReferenceLinks(data);
        }
      } catch (err) {
        console.error("Failed to delete link", err);
      }
    });
  };

  // Handle deleting a course file
  var handleDeleteFile = function handleDeleteFile(fileIndex) {
    checkAuthAndExecute(async function () {
      if (!window.confirm("Are you sure you want to completely delete this file from the course catalog?")) {
        return;
      }
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(activeCourse.id, "/files/").concat(fileIndex, "?t=").concat(Date.now()), {
          method: "DELETE"
        });
        if (res.ok) {
          setPreviewFile(null);
          await fetchCourses();
          var updatedRes = await fetch("".concat(API_BASE, "/api/courses?t=").concat(Date.now()));
          var coursesList = await updatedRes.json();
          var found = coursesList.find(function (c) {
            return c.id === activeCourse.id;
          });
          if (found) setActiveCourse(found);
        } else {
          var data = await res.json();
          alert(data.detail || "Failed to delete file");
        }
      } catch (err) {
        alert("Delete failed: network error");
      }
    });
  };

  // Handle creating a virtual folder in the active course
  var handleCreateFolder = function handleCreateFolder() {
    checkAuthAndExecute(async function () {
      var folderName = window.prompt("Enter new folder name:");
      if (!folderName) return;
      var trimmed = folderName.trim();
      if (!trimmed) {
        alert("Folder name cannot be empty");
        return;
      }
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(activeCourse.id, "/folders"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: trimmed
          })
        });
        if (res.ok) {
          await fetchCourses();
          var updatedRes = await fetch("".concat(API_BASE, "/api/courses?t=").concat(Date.now()));
          var coursesList = await updatedRes.json();
          var found = coursesList.find(function (c) {
            return c.id === activeCourse.id;
          });
          if (found) {
            setActiveCourse(found);
            setCurrentFolder(trimmed); // Auto-select the newly created folder!
          }
        } else {
          var data = await res.json();
          alert(data.detail || "Failed to create folder");
        }
      } catch (err) {
        alert("Failed to create folder: network error");
      }
    });
  };

  // Handle deleting a virtual folder and all its contents
  var handleDeleteFolder = function handleDeleteFolder(e, folderName) {
    if (e) e.stopPropagation(); // Prevent selecting the folder chip when clicking delete
    if (folderName === "Root") {
      alert("Cannot delete the Root folder");
      return;
    }
    checkAuthAndExecute(async function () {
      if (!window.confirm("Are you sure you want to delete the folder \"".concat(folderName, "\"? This will completely purge all slides cataloged inside it!"))) {
        return;
      }
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(activeCourse.id, "/folders/").concat(encodeURIComponent(folderName), "?t=").concat(Date.now()), {
          method: "DELETE"
        });
        if (res.ok) {
          await fetchCourses();
          var updatedRes = await fetch("".concat(API_BASE, "/api/courses?t=").concat(Date.now()));
          var coursesList = await updatedRes.json();
          var found = coursesList.find(function (c) {
            return c.id === activeCourse.id;
          });
          if (found) {
            setActiveCourse(found);
            if (currentFolder === folderName) {
              var remaining = found.folders || [];
              setCurrentFolder(remaining.length > 0 ? remaining[0] : "Root");
            }
          }
        } else {
          var data = await res.json();
          alert(data.detail || "Failed to delete folder");
        }
      } catch (err) {
        alert("Failed to delete folder: network error");
      }
    });
  };

  // Handle renaming a virtual folder
  var handleRenameFolder = function handleRenameFolder(e, oldName) {
    if (e) e.stopPropagation(); // Prevent selecting the folder chip when clicking rename
    checkAuthAndExecute(async function () {
      var newName = window.prompt("Enter new name for folder \"".concat(oldName, "\":"), oldName);
      if (!newName) return;
      var trimmed = newName.trim();
      if (!trimmed) {
        alert("Folder name cannot be empty");
        return;
      }
      if (trimmed === oldName) return;
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(activeCourse.id, "/folders/").concat(encodeURIComponent(oldName)), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            new_name: trimmed
          })
        });
        if (res.ok) {
          if (currentFolder === oldName) {
            setCurrentFolder(trimmed); // Preserves active folder view under the new name!
          }

          await fetchCourses();
          var updatedRes = await fetch("".concat(API_BASE, "/api/courses?t=").concat(Date.now()));
          var coursesList = await updatedRes.json();
          var found = coursesList.find(function (c) {
            return c.id === activeCourse.id;
          });
          if (found) setActiveCourse(found);
        } else {
          var data = await res.json();
          alert(data.detail || "Failed to rename folder");
        }
      } catch (err) {
        alert("Failed to rename folder: network error");
      }
    });
  };

  // Handle creating a virtual video folder in the active course
  var handleCreateVideoFolder = function handleCreateVideoFolder() {
    checkAuthAndExecute(async function () {
      var folderName = window.prompt("Enter new video folder name:");
      if (!folderName) return;
      var trimmed = folderName.trim();
      if (!trimmed) {
        alert("Folder name cannot be empty");
        return;
      }
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(activeCourse.id, "/video-folders"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: trimmed
          })
        });
        if (res.ok) {
          await fetchCourses();
          var updatedRes = await fetch("".concat(API_BASE, "/api/courses?t=").concat(Date.now()));
          var coursesList = await updatedRes.json();
          var found = coursesList.find(function (c) {
            return c.id === activeCourse.id;
          });
          if (found) {
            setActiveCourse(found);
            setCurrentVideoFolder(trimmed); // Auto-select the newly created folder!
          }
        } else {
          var data = await res.json();
          alert(data.detail || "Failed to create video folder");
        }
      } catch (err) {
        alert("Failed to create video folder: network error");
      }
    });
  };

  // Handle deleting a virtual video folder and all its contents
  var handleDeleteVideoFolder = function handleDeleteVideoFolder(e, folderName) {
    if (e) e.stopPropagation(); // Prevent selecting the folder chip when clicking delete
    if (folderName === "Root") {
      alert("Cannot delete the Root folder");
      return;
    }
    checkAuthAndExecute(async function () {
      if (!window.confirm("Are you sure you want to delete the video folder \"".concat(folderName, "\"? This will completely purge all recorded class videos cataloged inside it!"))) {
        return;
      }
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(activeCourse.id, "/video-folders/").concat(encodeURIComponent(folderName), "?t=").concat(Date.now()), {
          method: "DELETE"
        });
        if (res.ok) {
          await fetchCourses();
          var updatedRes = await fetch("".concat(API_BASE, "/api/courses?t=").concat(Date.now()));
          var coursesList = await updatedRes.json();
          var found = coursesList.find(function (c) {
            return c.id === activeCourse.id;
          });
          if (found) {
            setActiveCourse(found);
            if (currentVideoFolder === folderName) {
              var remaining = found.video_folders || [];
              setCurrentVideoFolder(remaining.length > 0 ? remaining[0] : "Root");
            }
          }
        } else {
          var data = await res.json();
          alert(data.detail || "Failed to delete video folder");
        }
      } catch (err) {
        alert("Failed to delete video folder: network error");
      }
    });
  };

  // Handle renaming a virtual video folder
  var handleRenameVideoFolder = function handleRenameVideoFolder(e, oldName) {
    if (e) e.stopPropagation(); // Prevent selecting the folder chip when clicking rename
    checkAuthAndExecute(async function () {
      var newName = window.prompt("Enter new name for video folder \"".concat(oldName, "\":"), oldName);
      if (!newName) return;
      var trimmed = newName.trim();
      if (!trimmed) {
        alert("Folder name cannot be empty");
        return;
      }
      if (trimmed === oldName) return;
      try {
        var res = await fetch("".concat(API_BASE, "/api/courses/").concat(activeCourse.id, "/video-folders/").concat(encodeURIComponent(oldName)), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            new_name: trimmed
          })
        });
        if (res.ok) {
          if (currentVideoFolder === oldName) {
            setCurrentVideoFolder(trimmed); // Preserves active folder view under the new name!
          }

          await fetchCourses();
          var updatedRes = await fetch("".concat(API_BASE, "/api/courses?t=").concat(Date.now()));
          var coursesList = await updatedRes.json();
          var found = coursesList.find(function (c) {
            return c.id === activeCourse.id;
          });
          if (found) setActiveCourse(found);
        } else {
          var data = await res.json();
          alert(data.detail || "Failed to rename video folder");
        }
      } catch (err) {
        alert("Failed to rename video folder: network error");
      }
    });
  };
  var handleDownloadFile = async function handleDownloadFile(fileIndex, fileName) {
    if (!activeCourse) return;
    checkDownloadAuthAndExecute(async function () {
      // Route exclusively through backend download endpoint
      var url = "".concat(API_BASE, "/api/download/").concat(activeCourse.id, "/").concat(fileIndex);
      window.location.href = url;
    });
  };

  // Handle downloading generated PDF summary as Markdown
  var handleDownloadSummary = function handleDownloadSummary(file) {
    if (!file || !file.summary) return;
    var element = document.createElement("a");
    var fileContent = "# AI Study Summary: ".concat(file.name, "\n\n").concat(file.summary);
    var fileBlob = new Blob([fileContent], {
      type: 'text/markdown;charset=utf-8;'
    });
    element.href = URL.createObjectURL(fileBlob);
    var cleanCourseCode = activeCourse ? activeCourse.code.replace(/[^a-zA-Z0-9_-]/g, "_") : "course";
    var cleanFileName = file.name.replace(/\.[a-zA-Z0-9]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
    element.download = "".concat(cleanCourseCode, "_").concat(cleanFileName, "_summary.md");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to update summary state across all arrays
  var updateSummaryState = function updateSummaryState(courseId, fileIndex, summaryText) {
    setPreviewFile(function (prev) {
      if (prev && prev.index === fileIndex) {
        return {
          ...prev,
          summary: summaryText
        };
      }
      return prev;
    });
    setActiveCourse(function (prev) {
      if (!prev) return prev;
      if (prev.id !== courseId) return prev;
      var updatedFiles = prev.files.map(function (file, idx) {
        if (idx === fileIndex) {
          return {
            ...file,
            summary: summaryText
          };
        }
        return file;
      });
      return {
        ...prev,
        files: updatedFiles
      };
    });
    setCourses(function (prev) {
      return prev.map(function (c) {
        if (c.id === courseId) {
          var updatedFiles = c.files.map(function (file, idx) {
            if (idx === fileIndex) {
              return {
                ...file,
                summary: summaryText
              };
            }
            return file;
          });
          return {
            ...c,
            files: updatedFiles
          };
        }
        return c;
      });
    });
  };

  // PDF AI Summary Card disabled as requested

  // Reusable PDF viewer or placeholder renderer
  var renderPdfViewerOrPlaceholder = function renderPdfViewerOrPlaceholder(file) {
    if (!file) return null;
    return React.createElement('div', {
      className: "w-full h-full relative bg-dark-900"
    }, previewLoading && React.createElement('div', {
      className: "absolute inset-0 z-10 flex flex-col items-center justify-center space-y-4 bg-dark-900 text-slate-400"
    }, React.createElement('div', {
      className: "w-10 h-10 rounded-full border-4 border-[#5C061C] border-t-transparent animate-spin"
    }), React.createElement('div', {
      className: "text-center space-y-1"
    }, React.createElement('p', {
      className: "text-xs font-bold text-slate-300"
    }, "Loading PDF pages progressively..."), React.createElement('p', {
      className: "text-[10px] text-slate-500"
    }, "First pages will appear shortly."))), previewUrl && React.createElement(PdfJsViewer, {
      url: previewUrl,
      onFirstPageReady: function onFirstPageReady() {
        return setPreviewLoading(false);
      }
    }));
  };

  // PDF.js Progressive Viewer Component — renders pages lazily as user scrolls
  // Only fetches bytes needed for visible pages (Catbox supports HTTP Range requests)
  var PdfJsViewer = function PdfJsViewer(_ref2) {
    var _React2;
    var url = _ref2.url,
      onFirstPageReady = _ref2.onFirstPageReady;
    var containerRef = useRef(null);
    var pdfDocRef = useRef(null);
    var renderedPagesRef = useRef(new Set());
    var renderingRef = useRef(new Set());
    var _useState117 = useState(0),
      _useState118 = _slicedToArray(_useState117, 2),
      totalPages = _useState118[0],
      setTotalPages = _useState118[1];
    var _useState119 = useState(null),
      _useState120 = _slicedToArray(_useState119, 2),
      error = _useState120[0],
      setError = _useState120[1];
    useEffect(function () {
      if (!url || !window.pdfjsLib) {
        setError("PDF viewer library not loaded. Try refreshing the page.");
        return;
      }
      var cancelled = false;
      renderedPagesRef.current = new Set();
      renderingRef.current = new Set();
      var loadPdf = async function loadPdf() {
        try {
          // PDF.js will use range requests automatically when the server supports Accept-Ranges
          // This means only the bytes for the requested pages are downloaded, not the whole file
          var loadingTask = pdfjsLib.getDocument({
            url: url,
            rangeChunkSize: 65536,
            // 64KB chunks for progressive loading
            disableAutoFetch: true,
            // Don't prefetch the entire PDF — only fetch on demand
            disableStream: false // Allow streaming
          });

          var pdf = await loadingTask.promise;
          if (cancelled) return;
          pdfDocRef.current = pdf;
          setTotalPages(pdf.numPages);

          // Render first 3 pages immediately for instant preview
          var initialPages = Math.min(3, pdf.numPages);
          for (var i = 1; i <= initialPages; i++) {
            if (cancelled) return;
            await renderPage(pdf, i);
            if (i === 1 && onFirstPageReady) onFirstPageReady();
          }
        } catch (err) {
          if (!cancelled) {
            console.error("PDF.js loading error:", err);
            setError("Failed to load PDF. The file may be temporarily unavailable.");
          }
        }
      };
      var renderPage = async function renderPage(pdf, pageNum) {
        if (renderedPagesRef.current.has(pageNum) || renderingRef.current.has(pageNum)) return;
        renderingRef.current.add(pageNum);
        try {
          var page = await pdf.getPage(pageNum);
          if (cancelled) return;
          var _container = containerRef.current;
          if (!_container) return;
          var canvasId = "pdf-page-".concat(pageNum);
          var canvas = _container.querySelector("#".concat(canvasId));
          if (!canvas) return;
          var containerWidth = _container.clientWidth - 32; // 16px padding each side
          var viewport = page.getViewport({
            scale: 1
          });
          var scale = containerWidth / viewport.width;
          var scaledViewport = page.getViewport({
            scale: scale
          });
          canvas.width = scaledViewport.width;
          canvas.height = scaledViewport.height;
          canvas.style.width = scaledViewport.width + 'px';
          canvas.style.height = scaledViewport.height + 'px';
          var ctx = canvas.getContext('2d');
          await page.render({
            canvasContext: ctx,
            viewport: scaledViewport
          }).promise;
          renderedPagesRef.current.add(pageNum);
          renderingRef.current.delete(pageNum);

          // Remove placeholder styling
          var wrapper = canvas.parentElement;
          if (wrapper) {
            wrapper.style.minHeight = 'auto';
            var placeholder = wrapper.querySelector('.page-placeholder');
            if (placeholder) placeholder.style.display = 'none';
          }
        } catch (err) {
          renderingRef.current.delete(pageNum);
          console.error("Failed to render page ".concat(pageNum, ":"), err);
        }
      };
      loadPdf();
      return function () {
        cancelled = true;
        if (pdfDocRef.current) {
          pdfDocRef.current.destroy();
          pdfDocRef.current = null;
        }
      };
    }, [url]);

    // Set up IntersectionObserver for lazy loading remaining pages
    useEffect(function () {
      if (totalPages === 0 || !containerRef.current) return;
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var pageNum = parseInt(entry.target.dataset.page);
            if (pdfDocRef.current && !renderedPagesRef.current.has(pageNum) && !renderingRef.current.has(pageNum)) {
              var renderPage = async function renderPage() {
                renderingRef.current.add(pageNum);
                try {
                  var page = await pdfDocRef.current.getPage(pageNum);
                  var _container2 = containerRef.current;
                  if (!_container2) return;
                  var canvas = _container2.querySelector("#pdf-page-".concat(pageNum));
                  if (!canvas) return;
                  var containerWidth = _container2.clientWidth - 32;
                  var viewport = page.getViewport({
                    scale: 1
                  });
                  var scale = containerWidth / viewport.width;
                  var scaledViewport = page.getViewport({
                    scale: scale
                  });
                  canvas.width = scaledViewport.width;
                  canvas.height = scaledViewport.height;
                  canvas.style.width = scaledViewport.width + 'px';
                  canvas.style.height = scaledViewport.height + 'px';
                  var ctx = canvas.getContext('2d');
                  await page.render({
                    canvasContext: ctx,
                    viewport: scaledViewport
                  }).promise;
                  renderedPagesRef.current.add(pageNum);
                  renderingRef.current.delete(pageNum);
                  var wrapper = canvas.parentElement;
                  if (wrapper) {
                    wrapper.style.minHeight = 'auto';
                    var placeholder = wrapper.querySelector('.page-placeholder');
                    if (placeholder) placeholder.style.display = 'none';
                  }
                } catch (err) {
                  renderingRef.current.delete(pageNum);
                }
              };
              renderPage();
            }
          }
        });
      }, {
        root: containerRef.current,
        rootMargin: '200px'
      }); // Pre-load pages 200px before they're visible

      var wrappers = containerRef.current.querySelectorAll('[data-page]');
      wrappers.forEach(function (el) {
        return observer.observe(el);
      });
      return function () {
        return observer.disconnect();
      };
    }, [totalPages]);
    if (error) {
      return React.createElement('div', {
        className: "w-full h-full flex items-center justify-center text-slate-400 text-sm p-8 text-center"
      }, error);
    }

    // Render canvas placeholders for all pages
    var pageElements = [];
    for (var i = 1; i <= totalPages; i++) {
      pageElements.push(React.createElement('div', {
        key: i,
        'data-page': i,
        className: "relative mb-4 flex flex-col items-center",
        style: {
          minHeight: i > 3 ? '800px' : 'auto'
        }
      }, React.createElement('canvas', {
        id: "pdf-page-".concat(i),
        className: "shadow-lg rounded",
        style: {
          maxWidth: '100%'
        }
      }), i > 3 && React.createElement('div', {
        className: "page-placeholder absolute inset-0 flex items-center justify-center text-slate-500 text-xs"
      }, "Loading page ".concat(i, "..."))));
    }
    return (_React2 = React).createElement.apply(_React2, ['div', {
      ref: containerRef,
      className: "w-full h-full overflow-y-auto p-4 bg-[#2a2a2a]",
      style: {
        scrollBehavior: 'smooth'
      }
    }, totalPages > 0 && React.createElement('div', {
      className: "text-center text-slate-400 text-xs mb-3 font-semibold"
    }, "".concat(totalPages, " pages \u2022 Scroll to load more"))].concat(pageElements));
  };
  // Handle file uploads recursively for multiple files sequentially
  var handleFileUpload = async function handleFileUpload(e, filesInput, category, setters) {
    if (e) e.preventDefault();
    var files = Array.isArray(filesInput) ? filesInput : filesInput ? [filesInput] : [];
    if (files.length === 0) return;
    checkAuthAndExecute(async function () {
      var setIsUploading = setters.setIsUploading,
        setUploadProgress = setters.setUploadProgress,
        setUploadStatus = setters.setUploadStatus,
        setUploadFile = setters.setUploadFile,
        fileInputRef = setters.fileInputRef;
      setIsUploading(true);
      setUploadProgress(0);

      // Initialize files status map in state to show queue visual indicators
      var initialQueueStatus = files.map(function (f, index) {
        return {
          name: f.name,
          size: f.size,
          status: index === 0 ? "uploading" : "pending",
          progress: 0,
          error: ""
        };
      });
      setUploadStatus({
        type: "batch",
        queue: initialQueueStatus
      });

      // Sequential Queue loop
      var _loop = async function _loop(i) {
        var file = files[i];

        // Update state to highlight currently uploading file
        setUploadStatus(function (prev) {
          var queue = prev.queue ? prev.queue : initialQueueStatus;
          var newQueue = _toConsumableArray(queue);
          if (newQueue[i]) {
            newQueue[i].status = "uploading";
          }
          return {
            type: "batch",
            queue: newQueue
          };
        });
        try {
          await new Promise(function (resolve) {
            var isLargeFile = file.size > 4 * 1024 * 1024; // 4 MB threshold

            var updateProgress = function updateProgress(loaded, total) {
              var percentage = Math.round(loaded / total * 90);
              setUploadProgress(Math.round((i * 100 + percentage) / files.length));
              setUploadStatus(function (prev) {
                var queue = prev.queue ? prev.queue : initialQueueStatus;
                var newQueue = _toConsumableArray(queue);
                if (newQueue[i]) {
                  newQueue[i].progress = percentage;
                }
                return {
                  type: "batch",
                  queue: newQueue
                };
              });
            };
            var markSuccess = function markSuccess() {
              setUploadStatus(function (prev) {
                var queue = prev.queue ? prev.queue : initialQueueStatus;
                var newQueue = _toConsumableArray(queue);
                if (newQueue[i]) {
                  newQueue[i].status = "success";
                  newQueue[i].progress = 100;
                }
                return {
                  type: "batch",
                  queue: newQueue
                };
              });
              resolve();
            };
            var markError = function markError(err) {
              setUploadStatus(function (prev) {
                var queue = prev.queue ? prev.queue : initialQueueStatus;
                var newQueue = _toConsumableArray(queue);
                if (newQueue[i]) {
                  newQueue[i].status = "error";
                  newQueue[i].error = err;
                }
                return {
                  type: "batch",
                  queue: newQueue
                };
              });
              resolve();
            };
            if (isLargeFile) {
              // Chunked upload to our backend API
              var chunkSize = 2 * 1024 * 1024; // 2MB chunks
              var totalChunks = Math.ceil(file.size / chunkSize);
              var sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
              var nextChunkIndex = 0;
              var activeUploads = 0;
              var hasFailed = false;
              var chunkProgress = new Array(totalChunks).fill(0);
              var uploadedFileIds = new Array(totalChunks).fill(null); // Keep track of Telegram file_id per chunk

              var sendCompleteRequest = function sendCompleteRequest() {
                var completeFormData = new FormData();
                completeFormData.append("session_id", sessionId);
                completeFormData.append("filename", file.name);
                completeFormData.append("total_chunks", totalChunks);
                completeFormData.append("telegram_file_ids", uploadedFileIds.join(","));
                completeFormData.append("file_size", file.size);
                completeFormData.append("category", category);
                if ((category === "slide" || category === "video") && (currentFolder || currentVideoFolder)) {
                  completeFormData.append("folder", category === "video" ? currentVideoFolder : currentFolder);
                }
                var completeXhr = new XMLHttpRequest();
                completeXhr.addEventListener("load", function () {
                  if (completeXhr.status >= 200 && completeXhr.status < 300) {
                    markSuccess();
                  } else {
                    var err = "Merge and upload failed";
                    try {
                      var data = JSON.parse(completeXhr.responseText);
                      err = data.detail || err;
                    } catch (e) {}
                    markError(err);
                  }
                });
                completeXhr.addEventListener("error", function () {
                  markError("Backend completion connection error");
                });
                completeXhr.open("POST", "".concat(API_BASE, "/api/upload/complete/").concat(activeCourse.id));
                completeXhr.send(completeFormData);
              };
              var uploadChunk = function uploadChunk(chunkIdx) {
                var start = chunkIdx * chunkSize;
                var end = Math.min(start + chunkSize, file.size);
                var chunk = file.slice(start, end);
                var chunkFormData = new FormData();
                chunkFormData.append("file_chunk", chunk, file.name);
                chunkFormData.append("session_id", sessionId);
                chunkFormData.append("chunk_index", chunkIdx);
                chunkFormData.append("total_chunks", totalChunks);
                chunkFormData.append("filename", file.name);
                var chunkXhr = new XMLHttpRequest();
                chunkXhr.upload.addEventListener("progress", function (event) {
                  if (event.lengthComputable && !hasFailed) {
                    chunkProgress[chunkIdx] = event.loaded;
                    var totalLoaded = chunkProgress.reduce(function (sum, val) {
                      return sum + val;
                    }, 0);
                    var percentage = Math.round(totalLoaded / file.size * 90);
                    setUploadProgress(Math.round((i * 100 + percentage) / files.length));
                    setUploadStatus(function (prev) {
                      var queue = prev.queue ? prev.queue : initialQueueStatus;
                      var newQueue = _toConsumableArray(queue);
                      if (newQueue[i]) {
                        newQueue[i].progress = percentage;
                      }
                      return {
                        type: "batch",
                        queue: newQueue
                      };
                    });
                  }
                });
                chunkXhr.addEventListener("load", function () {
                  if (hasFailed) return;
                  if (chunkXhr.status >= 200 && chunkXhr.status < 300) {
                    chunkProgress[chunkIdx] = end - start;
                    try {
                      var response = JSON.parse(chunkXhr.responseText);
                      uploadedFileIds[chunkIdx] = response.file_id;
                    } catch (e) {
                      hasFailed = true;
                      markError("Failed to parse chunk upload response");
                      return;
                    }
                    activeUploads--;
                    startUpload();
                  } else {
                    hasFailed = true;
                    var err = "Chunk ".concat(chunkIdx + 1, " upload failed");
                    try {
                      var data = JSON.parse(chunkXhr.responseText);
                      err = data.detail || err;
                    } catch (e) {}
                    markError(err);
                  }
                });
                chunkXhr.addEventListener("error", function () {
                  hasFailed = true;
                  markError("Network error on chunk ".concat(chunkIdx + 1));
                });
                chunkXhr.open("POST", "".concat(API_BASE, "/api/upload/chunk"));
                chunkXhr.send(chunkFormData);
              };
              var startUpload = function startUpload() {
                if (hasFailed) return;
                if (nextChunkIndex >= totalChunks) {
                  if (activeUploads === 0) {
                    sendCompleteRequest();
                  }
                  return;
                }
                while (activeUploads < 3 && nextChunkIndex < totalChunks && !hasFailed) {
                  var chunkIdx = nextChunkIndex++;
                  activeUploads++;
                  uploadChunk(chunkIdx);
                }
              };
              startUpload();
            } else {
              // Direct upload for smaller files
              var xhr = new XMLHttpRequest();
              xhr.upload.addEventListener("progress", function (event) {
                if (event.lengthComputable) {
                  updateProgress(event.loaded, event.total);
                }
              });
              xhr.addEventListener("load", function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                  markSuccess();
                } else {
                  var err = "Upload failed";
                  try {
                    var data = JSON.parse(xhr.responseText);
                    err = data.detail || err;
                  } catch (e) {}
                  markError(err);
                }
              });
              xhr.addEventListener("error", function () {
                markError("Network timeout");
              });
              var formData = new FormData();
              formData.append("file", file);
              formData.append("category", category);
              if ((category === "slide" || category === "video") && (currentFolder || currentVideoFolder)) {
                formData.append("folder", category === "video" ? currentVideoFolder : currentFolder);
              }
              xhr.open("POST", "".concat(API_BASE, "/api/upload/").concat(activeCourse.id));
              xhr.send(formData);
            }
          });
        } catch (err) {
          console.error("Queue execution error:", err);
        }
      };
      for (var i = 0; i < files.length; i++) {
        await _loop(i);
      }

      // Finish entire batch upload
      setUploadProgress(100);
      setUploadFile(Array.isArray(filesInput) ? [] : null); // Clear queue state
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Reload course contents
      await fetchCourses();
      var updatedRes = await fetch("".concat(API_BASE, "/api/courses?t=").concat(Date.now()));
      var coursesList = await updatedRes.json();
      var found = coursesList.find(function (c) {
        return c.id === activeCourse.id;
      });
      if (found) setActiveCourse(found);
      setTimeout(function () {
        setIsUploading(false);
        setUploadProgress(0);
        setUploadStatus({
          type: "",
          message: ""
        });
      }, 2000);
    });
  };

  // Helper to extract YouTube video ID
  var getYouTubeEmbedUrl = function getYouTubeEmbedUrl(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
      return "https://www.youtube.com/embed/".concat(match[2]);
    }
    return null;
  };

  // Preprocess LaTeX math delimiters and mask math blocks to protect them from Markdown parsing
  var preprocessMarkdownMath = function preprocessMarkdownMath(text) {
    if (!text) return {
      processed: "",
      mathBlocks: []
    };
    var processed = text;
    var mathBlocks = [];

    // Helper to balance unescaped curly braces in math blocks
    var balanceMathBraces = function balanceMathBraces(content) {
      var openCount = 0;
      var closeCount = 0;
      for (var i = 0; i < content.length; i++) {
        if (content[i] === '{') {
          var backslashCount = 0;
          var j = i - 1;
          while (j >= 0 && content[j] === '\\') {
            backslashCount++;
            j--;
          }
          if (backslashCount % 2 === 0) {
            openCount++;
          }
        } else if (content[i] === '}') {
          var _backslashCount = 0;
          var _j = i - 1;
          while (_j >= 0 && content[_j] === '\\') {
            _backslashCount++;
            _j--;
          }
          if (_backslashCount % 2 === 0) {
            closeCount++;
          }
        }
      }
      if (openCount > closeCount) {
        return content + '}'.repeat(openCount - closeCount);
      }
      return content;
    };

    // Auto-close unclosed display/inline math blocks at paragraph level
    var paragraphs = processed.split(/\n\n+/);
    for (var i = 0; i < paragraphs.length; i++) {
      var p = paragraphs[i].trim();

      // Case 1: starts with $$ and no other $$ or odd number of $$
      if (p.startsWith('$$')) {
        var dollarCount = (p.match(/\$\$/g) || []).length;
        if (dollarCount % 2 !== 0) {
          paragraphs[i] = paragraphs[i] + '\n$$';
        }
      }
      // Case 2: starts with \[ and no \]
      else if (p.startsWith('\\[') && !p.includes('\\]')) {
        paragraphs[i] = paragraphs[i] + '\n\\]';
      }
      // Case 3: starts with \( and no \)
      else if (p.startsWith('\\(') && !p.includes('\\)')) {
        paragraphs[i] = paragraphs[i] + '\n\\)';
      }
      // Case 4: starts with [ (not a link, checkbox, or task) and has math indicators but no ]
      else if (p.startsWith('[') && !p.includes(']')) {
        var isLinkOrCheckbox = p.startsWith('[ ]') || p.startsWith('[x]') || p.startsWith('[X]') || /^[a-zA-Z0-9\s]+\]\(/.test(p);
        var hasMath = /[\_=^\\+\-*\/]/.test(p) || p.includes('\\mathcal') || p.includes('\\frac');
        if (!isLinkOrCheckbox && hasMath) {
          paragraphs[i] = paragraphs[i] + '\n]';
        }
      }
    }
    processed = paragraphs.join('\n\n');
    var maskPattern = function maskPattern(regex) {
      processed = processed.replace(regex, function (match) {
        var placeholder = "MATHBLOCKPLACEHOLDERXYZ".concat(mathBlocks.length);
        mathBlocks.push({
          placeholder: placeholder,
          content: match
        });
        return placeholder;
      });
    };

    // Stage 1: Mask all existing standard math blocks (protecting them from any further replacements!)
    maskPattern(/\$\$[\s\S]*?\$\$/g);
    maskPattern(/\\\[[\s\S]*?\\\]/g);
    maskPattern(/\\begin\{([a-zA-Z\*]+)\}[\s\S]*?\\end\{\1\}/g);
    maskPattern(/\\\([\s\S]*?\\\)/g);

    // Mask single dollar math blocks (without paragraph breaks)
    processed = processed.replace(/\$[^\$]+?\$/g, function (match) {
      if (match.includes('\n\n') || match.includes('\r\n\r\n')) {
        return match;
      }
      var placeholder = "MATHBLOCKPLACEHOLDERXYZ".concat(mathBlocks.length);
      mathBlocks.push({
        placeholder: placeholder,
        content: match
      });
      return placeholder;
    });
    // Stage 2: Process non-standard display delimiters (display blocks wrapped in [ ... ])
    var blockRegex = /(?<!\\)\[\s*((?:[^\[\]]|\[[^\[\]]*\])+?)\s*\]/g;
    processed = processed.replace(blockRegex, function (match, content) {
      var hasSpaces = match.startsWith('[ ') && match.endsWith(' ]');
      var hasMathChars = /[\_=^\\+\-*\/]/.test(content);
      var isCheckbox = content === ' ' || content === 'x' || content === 'X';
      if ((hasSpaces || hasMathChars) && !isCheckbox && content.length > 2) {
        return "\n$$\n".concat(content.trim(), "\n$$\n");
      }
      return match;
    });

    // Mask newly created block display equations
    maskPattern(/\$\$[\s\S]*?\$\$/g);

    // Stage 2.5: Process raw mathematical equations LHS = RHS
    processed = processed.replace(/(?<![\w\$])([\w\(\)\[\]\/\\\{\}\+\-\^']+\s*=\s*[a-zA-Z\d_\{\}\(\)\[\]\+\-\*\/\\'\.\^\s\:\,\;\!\?\-\’]+)/g, function (match, eqPart) {
      var tokens = eqPart.split(/(\s+)/);
      var equationTokens = [];
      var textTokens = [];
      var foundText = false;
      var stopWords = new Set(['with', 'parameters', 'and', 'the', 'is', 'for', 'at', 'by', 'on', 'where', 'of', 'in', 'to', 'a', 'an']);
      for (var _i = 0; _i < tokens.length; _i++) {
        var token = tokens[_i].trim();
        if (!token) {
          if (!foundText) equationTokens.push(tokens[_i]);else textTokens.push(tokens[_i]);
          continue;
        }
        if (foundText) {
          textTokens.push(tokens[_i]);
          continue;
        }
        var isWord = /^[a-z]{3,}$/.test(token) && !/^(ln|log|exp|sin|cos|tan|sqrt)$/.test(token);
        if (stopWords.has(token.toLowerCase()) || isWord) {
          foundText = true;
          if (equationTokens.length > 0 && /^\s+$/.test(equationTokens[equationTokens.length - 1])) {
            textTokens.push(equationTokens.pop());
          }
          textTokens.push(tokens[_i]);
        } else {
          equationTokens.push(tokens[_i]);
        }
      }
      var eqText = equationTokens.join('').trim();
      var remainingText = textTokens.join('');
      if (eqText.includes('=') && eqText.length > 3) {
        var hasMathIndicator = /[\_=^\\+\-*\/\[\]\d]/.test(eqText) || eqText.length > 8;
        if (hasMathIndicator) {
          return "$".concat(eqText, "$").concat(remainingText);
        }
      }
      return match;
    });

    // Mask newly created raw equations
    maskPattern(/\$[^\$]+?\$/g);

    // Stage 3: Process inline equations/symbols wrapped in ( ... )
    var inlineRegex = /(?<![a-zA-Z0-9])\(\s*([^\(\)\r\n]+?)\s*\)(?=[\s\:\,\.\;\-\?\!\)]|$)/g;
    processed = processed.replace(inlineRegex, function (match, content, offset, string) {
      var trimmed = content.trim();
      var hasSpaces = match.startsWith('( ') && match.endsWith(' )');
      var isSingleChar = trimmed.length === 1 && /^[a-zA-Z\d]$/.test(trimmed);
      var hasMathSymbols = /[\_=^\\+\-*\/\[\]]/.test(trimmed);

      // Guard: do not replace if preceded by \left or followed by \right (with optional backslashes)
      var before = string.substring(0, offset);
      var after = string.substring(offset + match.length);
      var isStartOfLine = /^\s*$/.test(before) || /[\r\n]\s*$/.test(before);
      var isListItem = isStartOfLine && /^[a-d|i-j\d]$/i.test(trimmed);
      if (/\\?left\s*$/i.test(before) || /^\s*\\?right\b/i.test(after)) {
        return match;
      }
      if (trimmed.length <= 30 && (hasMathSymbols || isSingleChar && !isListItem)) {
        return '$' + trimmed + '$';
      }
      return match;
    });

    // Mask newly created inline parenthesized blocks
    maskPattern(/\$[^\$]+?\$/g);

    // Stage 4: Process raw subscript variables, concentrations, and LaTeX keywords
    // a. Bracketed chemical concentrations/species, e.g. [S], [E], [ES], [P] (excluding markdown links)
    processed = processed.replace(/(?<!\\)\[\s*([a-zA-Z0-9\-\+]+)\s*\](?!\()/g, function (match, content) {
      if (content === ' ' || content === 'x' || content === 'X') {
        return match;
      }
      return "$[".concat(content.trim(), "]$");
    });

    // b. Subscripted variables, e.g. V_max, V_{\text{max}}, K_m, k_d, C_A, C_{A0}, r_A
    var subscriptVarRegex = /\b([a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+_(?:[a-zA-Z0-9]+|\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}))(?![a-zA-Z0-9])/g;
    processed = processed.replace(subscriptVarRegex, function (match) {
      if (match.startsWith('MATHBLOCKPLACEHOLDERXYZ')) return match;
      return "$".concat(match, "$");
    });

    // c. Raw LaTeX commands/Greek letters (excluding left/right layout modifiers)
    var rawLatexRegex = /\\(?!n|r|t|left|right\b)[a-zA-Z]+(?:\{[^{}]*\})*/g;
    processed = processed.replace(rawLatexRegex, function (match, offset, string) {
      var before = string.substring(Math.max(0, offset - 1), offset);
      var after = string.substring(offset + match.length, offset + match.length + 1);
      if (before === '$' && after === '$') {
        return match;
      }
      return "$".concat(match, "$");
    });

    // Mask the newly created math blocks from Stage 4
    maskPattern(/\$[^\$]+?\$/g);

    // 5. Correct malformed LaTeX commands inside the masked math blocks (100% safe from URLs)
    var malformedLayoutRegex = /[\|\/]+\\?(frac|overline|underline|sqrt|left|right|begin|end)\b/g;
    var malformedSymbolRegex = /[\|\/]+(text|mathrm|mu|alpha|beta|gamma|delta|epsilon|theta|lambda|pi|rho|sigma|tau|phi|omega|partial|sum|int|infty|times|div|pm|mp|le|ge|ne|approx|hat|bar|tilde|dot|ddot|matrix|array|sin|cos|tan|ln|log|exp|deg)\b/g;
    mathBlocks.forEach(function (block) {
      block.content = block.content.replace(malformedLayoutRegex, '\\$1');
      block.content = block.content.replace(malformedSymbolRegex, '\\$1');

      // Auto-balance braces and \left/\right delimiters
      var delimStart = "";
      var delimEnd = "";
      var inner = block.content;
      if (block.content.startsWith('$$') && block.content.endsWith('$$')) {
        delimStart = '$$';
        delimEnd = '$$';
        inner = block.content.slice(2, -2);
      } else if (block.content.startsWith('\\[') && block.content.endsWith('\\]')) {
        delimStart = '\\[';
        delimEnd = '\\]';
        inner = block.content.slice(2, -2);
      } else if (block.content.startsWith('\\(') && block.content.endsWith('\\)')) {
        delimStart = '\\(';
        delimEnd = '\\)';
        inner = block.content.slice(2, -2);
      } else if (block.content.startsWith('$') && block.content.endsWith('$')) {
        delimStart = '$';
        delimEnd = '$';
        inner = block.content.slice(1, -1);
      }
      inner = inner.trim();
      inner = balanceMathBraces(inner);
      var leftCount = (inner.match(/\\left\b/g) || []).length;
      var rightCount = (inner.match(/\\right\b/g) || []).length;
      if (leftCount > rightCount) {
        inner += ' \\right.'.repeat(leftCount - rightCount);
      }
      if (delimStart === '$$' || delimStart === '\\[') {
        block.content = "".concat(delimStart, "\n").concat(inner, "\n").concat(delimEnd);
      } else if (delimStart === '$' || delimStart === '\\(') {
        block.content = "".concat(delimStart).concat(inner).concat(delimEnd);
      } else {
        block.content = inner;
      }
    });
    return {
      processed: processed,
      mathBlocks: mathBlocks
    };
  };

  // Render markdown text dynamically using Marked
  var renderMarkdown = function renderMarkdown(text) {
    if (!text) return {
      __html: ""
    };
    var _preprocessMarkdownMa = preprocessMarkdownMath(text),
      processed = _preprocessMarkdownMa.processed,
      mathBlocks = _preprocessMarkdownMa.mathBlocks;
    var parsedHtml = marked.parse(processed);

    // Restore math blocks in reverse order
    var _loop2 = function _loop2(i) {
      parsedHtml = parsedHtml.replace(mathBlocks[i].placeholder, function () {
        return mathBlocks[i].content;
      });
    };
    for (var i = mathBlocks.length - 1; i >= 0; i--) {
      _loop2(i);
    }

    // Correct malformed LaTeX in the remaining text
    var globalLayoutRegex = /(?<![a-zA-Z0-9\:\.\/])[\|\/]+\\?(frac|overline|underline|sqrt|left|right|begin|end)\b/g;
    var globalSymbolRegex = /(?<![a-zA-Z0-9\:\.\/])[\|\/]+(text|mathrm|mu|alpha|beta|gamma|delta|epsilon|theta|lambda|pi|rho|sigma|tau|phi|omega|partial|sum|int|infty|times|div|pm|mp|le|ge|ne|approx|hat|bar|tilde|dot|ddot|matrix|array|sin|cos|tan|ln|log|exp|deg)\b/g;
    parsedHtml = parsedHtml.replace(globalLayoutRegex, '\\$1');
    parsedHtml = parsedHtml.replace(globalSymbolRegex, '\\$1');
    return {
      __html: parsedHtml
    };
  };

  // Filtering courses by search bar, level, and term
  var filteredCourses = useMemo(function () {
    return courses.filter(function (c) {
      var matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase()) || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
      var matchesLevel = !selectedLevel || c.level === selectedLevel;
      var matchesTerm = !selectedLevel || !selectedTerm || c.term === selectedTerm;
      return matchesSearch && matchesLevel && matchesTerm;
    });
  }, [courses, searchQuery, selectedLevel, selectedTerm]);

  // Filtering books inside active section
  var filteredBooks = useMemo(function () {
    return booksList.filter(function (f) {
      return f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(fileSearchQuery.toLowerCase());
    });
  }, [booksList, fileSearchQuery]);

  // Filtering slides inside active section
  var filteredSlides = useMemo(function () {
    return slidesList.filter(function (f) {
      var matchesSearch = f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(fileSearchQuery.toLowerCase());
      var defaultFolder = activeCourse && activeCourse.folders && activeCourse.folders.length > 0 ? activeCourse.folders[0] : "Root";
      var fileFolder = f.folder || defaultFolder;
      return matchesSearch && fileFolder === currentFolder;
    });
  }, [slidesList, fileSearchQuery, currentFolder, activeCourse]);

  // Filtering videos inside active section
  var filteredVideos = useMemo(function () {
    return videosList.filter(function (f) {
      var matchesSearch = f.name.toLowerCase().includes(videoSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(videoSearchQuery.toLowerCase());
      var defaultVideoFolder = activeCourse && activeCourse.video_folders && activeCourse.video_folders.length > 0 ? activeCourse.video_folders[0] : "Root";
      var fileFolder = f.folder || defaultVideoFolder;
      return matchesSearch && fileFolder === currentVideoFolder;
    });
  }, [videosList, videoSearchQuery, currentVideoFolder, activeCourse]);

  // Filtering questions inside active section
  var filteredQuestions = useMemo(function () {
    return questionsList.filter(function (f) {
      return f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(fileSearchQuery.toLowerCase());
    });
  }, [questionsList, fileSearchQuery]);

  // Filtering solutions inside active section
  var filteredSolutions = useMemo(function () {
    return solutionsList.filter(function (f) {
      return f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(fileSearchQuery.toLowerCase());
    });
  }, [solutionsList, fileSearchQuery]);

  // Filtering solved inside active section
  var filteredSolved = useMemo(function () {
    return solvedList.filter(function (f) {
      return f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(fileSearchQuery.toLowerCase());
    });
  }, [solvedList, fileSearchQuery]);

  // Pre-compiled colorful stats dashboard counts
  var totalFilesCount = useMemo(function () {
    return courses.reduce(function (acc, c) {
      return acc + (c.fileCount || 0);
    }, 0);
  }, [courses]);
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-grow flex items-center justify-center flex-col space-y-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 border-4 border-accent-sky border-t-transparent rounded-full animate-spin"
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-glow text-accent-sky font-display font-medium tracking-wide"
    }, "Loading Academic Space..."));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, editingCourse && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-accent-sky border-opacity-30"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setEditingCourse(null);
    },
    className: "absolute top-4 right-4 bg-dark-900 p-2 rounded-full border border-white/10 text-slate-300 hover:text-white transition-colors"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-accent-sky"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    className: "w-5 h-5 animate-pulse"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-lg text-white"
  }, "Edit Course Details")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveCourseEdit,
    className: "space-y-4 pt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[10px] uppercase font-bold text-slate-400 tracking-wider font-display block mb-1"
  }, "Course Code"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: editCourseFields.code,
    onChange: function onChange(e) {
      return setEditCourseFields({
        ...editCourseFields,
        code: e.target.value
      });
    },
    className: "glass-input w-full p-2.5 rounded-xl text-sm focus:border-sky-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[10px] uppercase font-bold text-slate-400 tracking-wider font-display block mb-1"
  }, "Course Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: editCourseFields.title,
    onChange: function onChange(e) {
      return setEditCourseFields({
        ...editCourseFields,
        title: e.target.value
      });
    },
    className: "glass-input w-full p-2.5 rounded-xl text-sm focus:border-sky-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[10px] uppercase font-bold text-slate-400 tracking-wider font-display block mb-1"
  }, "Description"), /*#__PURE__*/React.createElement("textarea", {
    rows: 3,
    value: editCourseFields.description,
    onChange: function onChange(e) {
      return setEditCourseFields({
        ...editCourseFields,
        description: e.target.value
      });
    },
    className: "glass-input w-full p-2.5 rounded-xl text-sm focus:border-sky-500 resize-none"
  })), editCourseError && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-rose-400 font-semibold"
  }, editCourseError), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3 pt-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setEditingCourse(null);
    },
    className: "w-1/2 py-2.5 che-cancel-btn font-display font-semibold text-xs rounded-xl"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSavingCourseEdit,
    className: "w-1/2 py-2.5 che-submit-btn text-white font-display font-semibold text-xs rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
  }, isSavingCourseEdit ? "Saving..." : "Save Changes")))))), showAuthModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel w-full max-w-sm rounded-2xl p-6 shadow-2xl relative border border-accent-rose border-opacity-30"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setShowAuthModal(false);
      setPendingAuthCallback(null);
    },
    className: "absolute top-4 right-4 bg-dark-900 p-2 rounded-full border border-white/10 text-black hover:text-black transition-colors che-admin-auth-close"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M6 18L18 6M6 6l12 12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-accent-rose mx-auto mb-2 animate-bounce"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-6 h-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-lg text-white"
  }, "Administrative Lock"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs leading-relaxed"
  }, "This action requires administrative authorization. Enter the academic access passcode to unlock edits."), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleVerifyPassword,
    className: "space-y-4 pt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    placeholder: "Enter session passcode...",
    value: authPasswordInput,
    onChange: function onChange(e) {
      return setAuthPasswordInput(e.target.value);
    },
    className: "glass-input w-full p-2.5 rounded-xl text-sm focus:border-rose-500 text-center",
    autoFocus: true
  })), authError && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-rose-400 font-semibold"
  }, authError), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-2.5 bg-gradient-to-r from-accent-rose to-red-600 text-white font-display font-semibold text-xs rounded-xl shadow-lg shadow-rose-500/25 transition-transform hover:scale-[1.02]"
  }, "Verify and Unlock (1 Hour)"))))), showDownloadAuthModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel w-full max-w-sm rounded-2xl p-6 shadow-2xl relative border border-accent-sky border-opacity-30"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setShowDownloadAuthModal(false);
      setPendingDownloadCallback(null);
    },
    className: "absolute top-4 right-4 bg-dark-900 p-2 rounded-full border border-white/10 text-black hover:text-black transition-colors che-admin-auth-close",
    title: "Close Panel"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M6 18L18 6M6 6l12 12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20 text-accent-sky mx-auto mb-2 animate-bounce"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-6 h-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-lg text-white"
  }, "Secure Download Lock"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs leading-relaxed"
  }, "This asset requires download authorization. Enter the passcode to unlock all files and videos for the next 6 hours."), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleVerifyDownloadPassword,
    className: "space-y-4 pt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    placeholder: "Enter download passcode...",
    value: downloadPasswordInput,
    onChange: function onChange(e) {
      return setDownloadPasswordInput(e.target.value);
    },
    className: "glass-input w-full p-2.5 rounded-xl text-sm focus:border-accent-sky text-center text-white placeholder-slate-500 border border-white border-opacity-15 bg-white bg-opacity-5",
    autoFocus: true
  })), downloadAuthError && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-rose-400 font-semibold"
  }, downloadAuthError), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-2.5 bg-gradient-to-r from-accent-sky to-accent-violet text-white font-display font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02]"
  }, "Verify and Unlock (6 Hours)"))))), playingVideoUrl && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative border-brand"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPlayingVideoUrl(null);
    },
    className: "absolute top-4 right-4 bg-dark-900 bg-opacity-80 p-2 rounded-full border border-white border-opacity-10 text-slate-300 hover:text-white transition-colors z-10"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-6 h-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "aspect-video w-full"
  }, /*#__PURE__*/React.createElement("iframe", {
    src: playingVideoUrl,
    className: "w-full h-full",
    title: "YouTube Video Player",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true
  })))), /*#__PURE__*/React.createElement("header", {
    className: "glass-panel sticky top-0 z-40 border-b border-white border-opacity-10 px-4 md:px-6 py-3.5 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3.5 md:gap-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between w-full md:w-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2.5 md:space-x-3 cursor-pointer",
    onClick: function onClick() {
      setActiveCourse(null);
      setSearchQuery("");
      setFileSearchQuery("");
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "che_hub_logo.png",
    alt: "ChE StudySpace Logo",
    className: "w-9 h-9 md:w-10 md:h-10 rounded-xl shadow-lg shadow-sky-500/20 object-cover flex-shrink-0 border border-white/10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display font-extrabold text-base md:text-lg tracking-wide text-glow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "che-brand-text"
  }, "ChE"), " ", /*#__PURE__*/React.createElement("span", {
    className: "gradient-text"
  }, "StudySpace")), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] md:text-[10px] text-slate-400 font-medium tracking-widest uppercase truncate"
  }, "Department of Chemical Engineering"))), activeCourse && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setActiveCourse(null);
      setSearchQuery("");
      setFileSearchQuery("");
    },
    className: "md:hidden che-return-to-hub-btn px-3 py-1.5 rounded-xl text-[10px] font-display font-bold uppercase tracking-wider"
  }, "Return to Hub")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between md:justify-end w-full md:w-auto space-x-4 md:space-x-8 text-sm border-t border-white/5 pt-2.5 md:pt-0 md:border-t-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px] font-medium tracking-wider uppercase"
  }, "Active Courses"), /*#__PURE__*/React.createElement("span", {
    className: "font-display font-semibold text-white"
  }, courses.length, " courses")), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block h-8 w-px bg-white bg-opacity-10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-left md:text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[9px] md:text-[11px] font-semibold tracking-wider uppercase"
  }, "Resources Loaded"), /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs md:text-sm text-accent-sky"
  }, totalFilesCount, " files")), /*#__PURE__*/React.createElement("div", {
    className: "h-6 md:h-8 w-px bg-white bg-opacity-10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5 cursor-pointer select-none",
    onClick: function onClick() {
      if (isAuthorizedState) {
        if (window.confirm("Do you want to end your administrator session?")) {
          safeStorage.removeItem("che_auth_until");
          setIsAuthorizedState(false);
        }
      } else {
        checkAuthAndExecute(function () {});
      }
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full ".concat(isAuthorizedState ? 'bg-violet-400 animate-pulse' : 'bg-slate-500')
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-display text-[9px] md:text-[10px] font-bold uppercase tracking-wider ".concat(isAuthorizedState ? 'text-violet-400' : 'text-slate-500')
  }, isAuthorizedState ? '🔓 Admin Active' : '🔒 Guest')), /*#__PURE__*/React.createElement("div", {
    className: "h-6 md:h-8 w-px bg-white bg-opacity-10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col text-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[9px] md:text-[10px] font-bold tracking-wider uppercase mb-1"
  }, "Level and term"), /*#__PURE__*/React.createElement("select", {
    value: selectedLevel && selectedTerm ? "".concat(selectedLevel, ", ").concat(selectedTerm) : "",
    onChange: function onChange(e) {
      var val = e.target.value;
      if (!val) {
        setSelectedLevel("");
        setSelectedTerm("");
      } else {
        var _val$split = val.split(", "),
          _val$split2 = _slicedToArray(_val$split, 2),
          lvl = _val$split2[0],
          trm = _val$split2[1];
        setSelectedLevel(lvl);
        setSelectedTerm(trm);
      }
      // Transition cleanly back to the dashboard filtered by the newly selected Level/Term
      setActiveCourse(null);
      setPreviewFile(null);
      setPreviewUrl("");
      setSearchQuery("");
      setFileSearchQuery("");
    },
    className: "glass-input px-2.5 py-1.5 rounded-xl text-[10px] md:text-[11px] font-semibold bg-dark-900 cursor-pointer focus:border-sky-500 border border-white/10"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All Levels & Terms"), /*#__PURE__*/React.createElement("option", {
    value: "Level-1, Term-1"
  }, "Level 1, Term 1"), /*#__PURE__*/React.createElement("option", {
    value: "Level-1, Term-2"
  }, "Level 1, Term 2"), /*#__PURE__*/React.createElement("option", {
    value: "Level-2, Term-1"
  }, "Level 2, Term 1"), /*#__PURE__*/React.createElement("option", {
    value: "Level-2, Term-2"
  }, "Level 2, Term 2"), /*#__PURE__*/React.createElement("option", {
    value: "Level-3, Term-1"
  }, "Level 3, Term 1"), /*#__PURE__*/React.createElement("option", {
    value: "Level-3, Term-2"
  }, "Level 3, Term 2"), /*#__PURE__*/React.createElement("option", {
    value: "Level-4, Term-1"
  }, "Level 4, Term 1"), /*#__PURE__*/React.createElement("option", {
    value: "Level-4, Term-2"
  }, "Level 4, Term 2"))))), /*#__PURE__*/React.createElement("main", {
    className: "flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col"
  }, !activeCourse ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 flex-grow flex flex-col justify-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-end justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight"
  }, "Welcome to Your ", /*#__PURE__*/React.createElement("span", {
    className: "gradient-text text-glow"
  }, "Study Hub")), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 mt-2 text-sm max-w-xl"
  }, "Centralized academic hub for Chemical Engineering slides, textbooks, and interactive study notes.")), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full md:w-80"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search active courses...",
    value: searchQuery,
    onChange: function onChange(e) {
      return setSearchQuery(e.target.value);
    },
    className: "glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:border-sky-500"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3.5 top-3 w-4 h-4 text-slate-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
  }, selectedLevel && selectedTerm && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-2xl p-6 flex flex-col justify-between min-h-[220px] bg-sky-950/5 relative overflow-hidden group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "z-10 w-full space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-sky-300"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-5 h-5 text-accent-sky animate-pulse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-display font-semibold text-xs uppercase tracking-wider"
  }, "Create Course Segment")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleCreateCourse,
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    placeholder: "Course Code (e.g. ChE 403)",
    value: newCourse.code,
    onChange: function onChange(e) {
      return setNewCourse({
        ...newCourse,
        code: e.target.value
      });
    },
    className: "glass-input w-full px-3 py-1.5 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    placeholder: "Course Title (e.g. Process Control)",
    value: newCourse.title,
    onChange: function onChange(e) {
      return setNewCourse({
        ...newCourse,
        title: e.target.value
      });
    },
    className: "glass-input w-full px-3 py-1.5 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Description (optional)",
    rows: 1,
    value: newCourse.description,
    onChange: function onChange(e) {
      return setNewCourse({
        ...newCourse,
        description: e.target.value
      });
    },
    className: "glass-input w-full px-3 py-1.5 rounded-lg text-xs resize-none"
  }), courseError && /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-rose-400 font-medium"
  }, courseError), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isCreatingCourse,
    className: "w-full py-2 bg-gradient-to-r from-accent-sky to-accent-violet text-white font-display font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02] flex items-center justify-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isCreatingCourse ? "Adding Course..." : "Add Course"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    className: "w-3.5 h-3.5"
  }))))), filteredCourses.map(function (course, idx) {
    // Generates dynamic aesthetic gradient backgrounds by course code
    var gradients = ["from-accent-sky to-sky-900/30", "from-accent-violet to-violet-900/30", "from-accent-violet to-violet-900/30", "from-accent-blue to-blue-900/30", "from-accent-rose to-rose-900/30"];
    var grad = gradients[idx % gradients.length];
    return /*#__PURE__*/React.createElement("div", {
      key: course.id,
      onClick: function onClick() {
        return setActiveCourse(course);
      },
      className: "glass-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer min-h-[220px] relative overflow-hidden group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ".concat(grad, " opacity-20 blur-2xl group-hover:opacity-40 transition-opacity")
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-course-badge inline-block px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/10 font-display"
    }, course.code), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick(e) {
        e.stopPropagation();
        handleStartEditCourse(course);
      },
      className: "che-edit-course-btn p-1.5 rounded-lg bg-white border border-slate-200 transition-all relative z-10",
      title: "Edit Course Details"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      className: "w-3.5 h-3.5"
    }))), /*#__PURE__*/React.createElement("h3", {
      className: "font-display font-bold text-xl text-white group-hover:text-accent-sky transition-colors line-clamp-1"
    }, course.title), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed"
    }, course.description)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between border-t border-white border-opacity-5 pt-4 mt-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-xs text-slate-400"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "fileText",
      className: "w-3.5 h-3.5 text-accent-sky"
    }), /*#__PURE__*/React.createElement("span", null, course.fileCount, " resources")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center text-xs text-accent-sky font-medium group-hover:translate-x-1 transition-transform"
    }, /*#__PURE__*/React.createElement("span", null, "Enter Space"), /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      className: "w-3.5 h-3.5 ml-1"
    }))));
  }), filteredCourses.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "col-span-full py-16 text-center glass-panel rounded-2xl border-dashed border-2 border-white border-opacity-10"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-12 h-12 text-slate-500 mx-auto mb-3"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 font-display"
  }, "No courses match your active search filter.")))) :
  /*#__PURE__*/
  /* DETAILED COURSE SPACE */
  React.createElement("div", {
    className: "space-y-6 flex-grow flex flex-col che-course-workspace animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white border-opacity-5 pb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setActiveCourse(null);
      setSearchQuery("");
      setFileSearchQuery("");
    },
    className: "che-back-btn p-2.5 rounded-xl transition-all hover:scale-105",
    title: "Back to Hub"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowLeft",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold px-2 py-0.5 rounded bg-accent-sky/20 text-accent-sky border border-accent-sky/10 uppercase tracking-widest font-display"
  }, activeCourse.code), /*#__PURE__*/React.createElement("h2", {
    className: "font-display font-extrabold text-2xl md:text-3xl text-glow text-white"
  }, activeCourse.title)), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed"
  }, activeCourse.description))), /*#__PURE__*/React.createElement("div", {
    className: "flex bg-dark-950 p-1 rounded-xl border border-white border-opacity-5 flex-wrap gap-1 self-start md:self-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setPrimarySection("books");
      setPreviewFile(null);
    },
    className: "flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ".concat(primarySection === 'books' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Books")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setPrimarySection("solutions");
      setPreviewFile(null);
    },
    className: "flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ".concat(primarySection === 'solutions' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Solution Manual")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setPrimarySection("slides");
      setPreviewFile(null);
    },
    className: "flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ".concat(primarySection === 'slides' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Slides")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setPrimarySection("videos");
      setPreviewFile(null);
    },
    className: "flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ".concat(primarySection === 'videos' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Recorded Class")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setPrimarySection("questions");
      setPreviewFile(null);
    },
    className: "flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ".concat(primarySection === 'questions' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Term-Final Question")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setPrimarySection("solved");
      setPreviewFile(null);
    },
    className: "flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ".concat(primarySection === 'solved' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Term-Final Solved")))), /*#__PURE__*/React.createElement("div", {
    className: "flex-grow flex flex-col"
  }, primarySection === 'books' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Reference Books"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, booksList.length, " volumes")), /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleFileUpload(e, bookUploadFile, "book", {
        setIsUploading: setIsBookUploading,
        setUploadProgress: setBookUploadProgress,
        setUploadStatus: setBookUploadStatus,
        setUploadFile: setBookUploadFile,
        fileInputRef: bookFileInputRef
      });
    },
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: ".pdf,.docx,.doc,.xlsx,.xls",
    onChange: function onChange(e) {
      return setBookUploadFile(Array.from(e.target.files));
    },
    className: "hidden",
    id: "book-upload-input",
    ref: bookFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "book-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, bookUploadFile && bookUploadFile.length > 0 ? bookUploadFile.length === 1 ? "Selected: ".concat(bookUploadFile[0].name) : "Selected: ".concat(bookUploadFile.length, " files") : "Upload reference textbooks or manuals directly."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), bookUploadFile && bookUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setBookUploadFile([]);
      if (bookFileInputRef.current) bookFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isBookUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isBookUploading ? "Uploading..." : "Save to Books"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isBookUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: "".concat(bookUploadProgress, "%")
    }
  })), bookUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-lg text-[10px] font-display font-medium ".concat(bookUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20')
  }, bookUploadStatus.message), bookUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, bookUploadStatus.queue.filter(function (q) {
    return q.status === "success";
  }).length, " / ", bookUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, bookUploadStatus.queue.map(function (item, idx) {
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      className: "flex items-center justify-between text-xs py-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "truncate max-w-[180px] font-medium text-slate-400"
    }, item.name), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
    }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-accent-violet"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "loader",
      className: "w-3.5 h-3.5 animate-spin"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold"
    }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      className: "w-4 h-4 text-emerald-500 font-bold"
    }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-rose-500 font-semibold",
      title: item.error
    }, "Failed")));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search textbooks...",
    value: fileSearchQuery,
    onChange: function onChange(e) {
      return setFileSearchQuery(e.target.value);
    },
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[450px] overflow-y-auto pr-1"
  }, filteredBooks.map(function (file) {
    var isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: function onClick() {
        return setPreviewFile(file);
      },
      className: "glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ".concat(isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bookOpen",
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " \u2022 PDF Textbook"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDeleteFile(file.index);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Textbook"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDownloadFile(file.index, file.name);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredBooks.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No books cataloged inside this folder.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Reading: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPreviewFile(null);
    },
    className: "che-close-reader-btn"
  }, "Close Reader")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden",
    style: {
      height: "550px"
    }
  }, renderPdfViewerOrPlaceholder(previewFile))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bookOpen",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Distraction-Free Textbook Reader"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any textbook or reference manual from the left catalog to launch our integrated full-screen PDF workspace.")))), primarySection === 'questions' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Term-Final Questions"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, questionsList.length, " papers")), /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleFileUpload(e, questionUploadFile, "question", {
        setIsUploading: setIsQuestionUploading,
        setUploadProgress: setQuestionUploadProgress,
        setUploadStatus: setQuestionUploadStatus,
        setUploadFile: setQuestionUploadFile,
        fileInputRef: questionFileInputRef
      });
    },
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: ".pdf,.docx,.doc",
    onChange: function onChange(e) {
      return setQuestionUploadFile(Array.from(e.target.files));
    },
    className: "hidden",
    id: "question-upload-input",
    ref: questionFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "question-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, questionUploadFile && questionUploadFile.length > 0 ? questionUploadFile.length === 1 ? "Selected: ".concat(questionUploadFile[0].name) : "Selected: ".concat(questionUploadFile.length, " files") : "Upload term-final exam question papers directly."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), questionUploadFile && questionUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setQuestionUploadFile([]);
      if (questionFileInputRef.current) questionFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isQuestionUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isQuestionUploading ? "Uploading..." : "Save to Questions"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isQuestionUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: "".concat(questionUploadProgress, "%")
    }
  })), questionUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-lg text-[10px] font-display font-medium ".concat(questionUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20')
  }, questionUploadStatus.message), questionUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, questionUploadStatus.queue.filter(function (q) {
    return q.status === "success";
  }).length, " / ", questionUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, questionUploadStatus.queue.map(function (item, idx) {
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      className: "flex items-center justify-between text-xs py-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "truncate max-w-[180px] font-medium text-slate-400"
    }, item.name), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
    }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-accent-violet"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "loader",
      className: "w-3.5 h-3.5 animate-spin"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold"
    }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      className: "w-4 h-4 text-emerald-500 font-bold"
    }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-rose-500 font-semibold",
      title: item.error
    }, "Failed")));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search questions...",
    value: fileSearchQuery,
    onChange: function onChange(e) {
      return setFileSearchQuery(e.target.value);
    },
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[450px] overflow-y-auto pr-1"
  }, filteredQuestions.map(function (file) {
    var isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: function onClick() {
        return setPreviewFile(file);
      },
      className: "glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ".concat(isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "fileText",
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " \u2022 PDF Question Paper"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDeleteFile(file.index);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Question"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDownloadFile(file.index, file.name);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredQuestions.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No exam questions cataloged inside this folder.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Reading: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPreviewFile(null);
    },
    className: "che-close-reader-btn"
  }, "Close Reader")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden",
    style: {
      height: "550px"
    }
  }, renderPdfViewerOrPlaceholder(previewFile))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Term-Final Questions Reader"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any term-final question paper from the left catalog to launch our integrated full-screen PDF workspace.")))), primarySection === 'solutions' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Solution Manuals"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, solutionsList.length, " manuals")), /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleFileUpload(e, solutionUploadFile, "solution", {
        setIsUploading: setIsSolutionUploading,
        setUploadProgress: setSolutionUploadProgress,
        setUploadStatus: setSolutionUploadStatus,
        setUploadFile: setSolutionUploadFile,
        fileInputRef: solutionFileInputRef
      });
    },
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: ".pdf,.docx,.doc",
    onChange: function onChange(e) {
      return setSolutionUploadFile(Array.from(e.target.files));
    },
    className: "hidden",
    id: "solution-upload-input",
    ref: solutionFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "solution-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, solutionUploadFile && solutionUploadFile.length > 0 ? solutionUploadFile.length === 1 ? "Selected: ".concat(solutionUploadFile[0].name) : "Selected: ".concat(solutionUploadFile.length, " files") : "Upload exam solutions or step-by-step guides directly."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), solutionUploadFile && solutionUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setSolutionUploadFile([]);
      if (solutionFileInputRef.current) solutionFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSolutionUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isSolutionUploading ? "Uploading..." : "Save to Solutions"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isSolutionUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: "".concat(solutionUploadProgress, "%")
    }
  })), solutionUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-lg text-[10px] font-display font-medium ".concat(solutionUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20')
  }, solutionUploadStatus.message), solutionUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, solutionUploadStatus.queue.filter(function (q) {
    return q.status === "success";
  }).length, " / ", solutionUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, solutionUploadStatus.queue.map(function (item, idx) {
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      className: "flex items-center justify-between text-xs py-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "truncate max-w-[180px] font-medium text-slate-400"
    }, item.name), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
    }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-accent-violet"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "loader",
      className: "w-3.5 h-3.5 animate-spin"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold"
    }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      className: "w-4 h-4 text-emerald-500 font-bold"
    }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-rose-500 font-semibold",
      title: item.error
    }, "Failed")));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search solution manuals...",
    value: fileSearchQuery,
    onChange: function onChange(e) {
      return setFileSearchQuery(e.target.value);
    },
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[450px] overflow-y-auto pr-1"
  }, filteredSolutions.map(function (file) {
    var isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: function onClick() {
        return setPreviewFile(file);
      },
      className: "glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ".concat(isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " \u2022 PDF Exam Solve"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDeleteFile(file.index);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Solve"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDownloadFile(file.index, file.name);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredSolutions.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No exam solutions cataloged inside this folder.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Reading: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPreviewFile(null);
    },
    className: "che-close-reader-btn"
  }, "Close Reader")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden",
    style: {
      height: "550px"
    }
  }, renderPdfViewerOrPlaceholder(previewFile))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Solution Manuals Reader"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any solution manual or guide from the left catalog to launch our integrated full-screen PDF workspace.")))), primarySection === 'solved' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Term-Final Solved"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, solvedList.length, " solved papers")), /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleFileUpload(e, solvedUploadFile, "solved", {
        setIsUploading: setIsSolvedUploading,
        setUploadProgress: setSolvedUploadProgress,
        setUploadStatus: setSolvedUploadStatus,
        setUploadFile: setSolvedUploadFile,
        fileInputRef: solvedFileInputRef
      });
    },
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: ".pdf,.docx,.doc",
    onChange: function onChange(e) {
      return setSolvedUploadFile(Array.from(e.target.files));
    },
    className: "hidden",
    id: "solved-upload-input",
    ref: solvedFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "solved-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, solvedUploadFile && solvedUploadFile.length > 0 ? solvedUploadFile.length === 1 ? "Selected: ".concat(solvedUploadFile[0].name) : "Selected: ".concat(solvedUploadFile.length, " files") : "Upload exam solutions or solved answer keys directly."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), solvedUploadFile && solvedUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setSolvedUploadFile([]);
      if (solvedFileInputRef.current) solvedFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSolvedUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isSolvedUploading ? "Uploading..." : "Save to Solved"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isSolvedUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: "".concat(solvedUploadProgress, "%")
    }
  })), solvedUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-lg text-[10px] font-display font-medium ".concat(solvedUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20')
  }, solvedUploadStatus.message), solvedUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, solvedUploadStatus.queue.filter(function (q) {
    return q.status === "success";
  }).length, " / ", solvedUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, solvedUploadStatus.queue.map(function (item, idx) {
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      className: "flex items-center justify-between text-xs py-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "truncate max-w-[180px] font-medium text-slate-400"
    }, item.name), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
    }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-accent-violet"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "loader",
      className: "w-3.5 h-3.5 animate-spin"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold"
    }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      className: "w-4 h-4 text-emerald-500 font-bold"
    }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-rose-500 font-semibold",
      title: item.error
    }, "Failed")));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search solved answers...",
    value: fileSearchQuery,
    onChange: function onChange(e) {
      return setFileSearchQuery(e.target.value);
    },
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[450px] overflow-y-auto pr-1"
  }, filteredSolved.map(function (file) {
    var isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: function onClick() {
        return setPreviewFile(file);
      },
      className: "glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ".concat(isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " \u2022 PDF Exam Solve"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDeleteFile(file.index);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Solve"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDownloadFile(file.index, file.name);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredSolved.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No solved papers cataloged inside this folder yet.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile && solvedList.some(function (f) {
    return f.index === previewFile.index;
  }) ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Reading: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPreviewFile(null);
    },
    className: "che-close-reader-btn"
  }, "Close Reader")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden",
    style: {
      height: "550px"
    }
  }, renderPdfViewerOrPlaceholder(previewFile))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Term-Final Solved Reader"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any term-final solved answer or guide from the left catalog to launch our integrated full-screen PDF workspace.")))), primarySection === 'slides' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Class Slides & Assets"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, slidesList.length, " files")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pb-3 border-b border-white border-opacity-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-display font-bold text-sky-400 tracking-wider uppercase"
  }, "Folders"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleCreateFolder,
    className: "flex items-center space-x-1 text-[10px] text-sky-300 hover:text-white font-display font-semibold transition-all bg-sky-500/10 hover:bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/20"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folderPlus",
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, "Create"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1"
  }, (activeCourse.folders || ["Root"]).map(function (folder) {
    var isSelected = currentFolder === folder;
    return /*#__PURE__*/React.createElement("button", {
      key: folder,
      type: "button",
      onClick: function onClick() {
        setCurrentFolder(folder);
        setPreviewFile(null);
      },
      className: "flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-display font-semibold transition-all border ".concat(isSelected ? 'bg-gradient-to-r from-accent-sky to-accent-violet text-white border-accent-sky border-opacity-40 shadow-md shadow-sky-950/40' : 'folder-btn-unselected')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "folder",
      className: "w-3.5 h-3.5 ".concat(isSelected ? 'text-white' : 'text-sky-400/70')
    }), /*#__PURE__*/React.createElement("span", {
      className: "truncate max-w-[80px]"
    }, folder), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1 ml-1",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("span", {
      onClick: function onClick(e) {
        return handleRenameFolder(e, folder);
      },
      className: "p-0.5 rounded hover:bg-black/10 transition-all text-black",
      title: "Rename ".concat(folder)
    }, /*#__PURE__*/React.createElement("svg", {
      className: "w-2.5 h-2.5",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2.5
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    }))), folder !== "Root" && /*#__PURE__*/React.createElement("span", {
      onClick: function onClick(e) {
        return handleDeleteFolder(e, folder);
      },
      className: "p-0.5 rounded hover:bg-black/10 transition-all text-black",
      title: "Delete ".concat(folder)
    }, /*#__PURE__*/React.createElement("svg", {
      className: "w-2.5 h-2.5",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2.5
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M6 18L18 6M6 6l12 12"
    })))));
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleFileUpload(e, slideUploadFile, "slide", {
        setIsUploading: setIsSlideUploading,
        setUploadProgress: setSlideUploadProgress,
        setUploadStatus: setSlideUploadStatus,
        setUploadFile: setSlideUploadFile,
        fileInputRef: slideFileInputRef
      });
    },
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: ".pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.txt,.zip,.rar",
    onChange: function onChange(e) {
      return setSlideUploadFile(Array.from(e.target.files));
    },
    className: "hidden",
    id: "slide-upload-input",
    ref: slideFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "slide-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, slideUploadFile && slideUploadFile.length > 0 ? slideUploadFile.length === 1 ? "Selected: ".concat(slideUploadFile[0].name) : "Selected: ".concat(slideUploadFile.length, " files") : "Upload lecture slides, notes, or spreadsheets."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), slideUploadFile && slideUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setSlideUploadFile([]);
      if (slideFileInputRef.current) slideFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSlideUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isSlideUploading ? "Uploading..." : "Save to Slides"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isSlideUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: "".concat(slideUploadProgress, "%")
    }
  })), slideUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-lg text-[10px] font-display font-medium ".concat(slideUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20')
  }, slideUploadStatus.message), slideUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, slideUploadStatus.queue.filter(function (q) {
    return q.status === "success";
  }).length, " / ", slideUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, slideUploadStatus.queue.map(function (item, idx) {
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      className: "flex items-center justify-between text-xs py-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "truncate max-w-[180px] font-medium text-slate-400"
    }, item.name), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
    }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-accent-violet"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "loader",
      className: "w-3.5 h-3.5 animate-spin"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold"
    }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      className: "w-4 h-4 text-emerald-500 font-bold"
    }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-rose-500 font-semibold",
      title: item.error
    }, "Failed")));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search slides...",
    value: fileSearchQuery,
    onChange: function onChange(e) {
      return setFileSearchQuery(e.target.value);
    },
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[350px] overflow-y-auto pr-1"
  }, filteredSlides.map(function (file) {
    var isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: function onClick() {
        return setPreviewFile(file);
      },
      className: "glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ".concat(isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: (file.type || "").toUpperCase().includes('PDF') || (file.name || "").toLowerCase().endsWith('.pdf') ? 'fileText' : 'layers',
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " \u2022 ", file.type || "Class Slide"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDeleteFile(file.index);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Asset"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDownloadFile(file.index, file.name);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredSlides.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No slide materials cataloged inside this folder yet."))), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-glow text-white"
  }, "Study Reference Links"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAddLink,
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[9px] uppercase font-semibold text-slate-400 tracking-wider font-display block mb-1"
  }, "Reference Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "e.g. Perry's Handbook Chapter 5",
    value: newLink.title,
    onChange: function onChange(e) {
      return setNewLink({
        ...newLink,
        title: e.target.value
      });
    },
    className: "glass-input w-full px-3 py-1.5 rounded-lg text-xs",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[9px] uppercase font-semibold text-slate-400 tracking-wider font-display block mb-1"
  }, "Hyperlink URL"), /*#__PURE__*/React.createElement("input", {
    type: "url",
    placeholder: "https://example.com/resource",
    value: newLink.url,
    onChange: function onChange(e) {
      return setNewLink({
        ...newLink,
        url: e.target.value
      });
    },
    className: "glass-input w-full px-3 py-1.5 rounded-lg text-xs",
    required: true
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-2 bg-gradient-to-r from-accent-sky to-accent-violet hover:from-sky-500 hover:to-violet-600 text-white font-display font-semibold text-[10px] uppercase tracking-wider rounded-lg transition-all shadow-md shadow-sky-950/20"
  }, "Add Reference Link")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[220px] overflow-y-auto pr-1"
  }, (activeCourse.reference_links || []).map(function (link, idx) {
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      className: "glass-panel p-2.5 rounded-xl flex items-center justify-between gap-3 text-xs border-white border-opacity-5 hover:bg-white/5 transition-colors"
    }, /*#__PURE__*/React.createElement("a", {
      href: link.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "font-display font-medium text-slate-300 hover:text-accent-sky truncate flex items-center space-x-1.5 max-w-[170px]"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "externalLink",
      className: "w-3.5 h-3.5 text-accent-sky flex-shrink-0"
    }), /*#__PURE__*/React.createElement("span", {
      className: "truncate"
    }, link.title)), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDeleteLink(idx);
      },
      className: "p-1 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded transition-all flex-shrink-0",
      title: "Remove Link"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3 h-3"
    })));
  }), (activeCourse.reference_links || []).length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-4 text-center text-slate-500 text-[10px] font-display"
  }, "No custom reference links added yet.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile && slidesList.some(function (f) {
    return f.index === previewFile.index;
  }) ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Preview: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPreviewFile(null);
    },
    className: "che-close-reader-btn"
  }, "Close Preview")), (previewFile.type || "").toUpperCase().includes('PDF') || (previewFile.name || "").toLowerCase().endsWith('.pdf') ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden",
    style: {
      height: "550px"
    }
  }, renderPdfViewerOrPlaceholder(previewFile))) : (previewFile.type || "").toUpperCase().includes('VIDEO') || (previewFile.type || "").toUpperCase().includes('RECORDED CLASS') || (previewFile.name || "").toLowerCase().endsWith('.mp4') || (previewFile.name || "").toLowerCase().endsWith('.webm') || (previewFile.name || "").toLowerCase().endsWith('.ogg') || (previewFile.name || "").toLowerCase().endsWith('.mov') || (previewFile.name || "").toLowerCase().endsWith('.mkv') ? /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden flex items-center justify-center",
    style: {
      height: "550px"
    }
  }, /*#__PURE__*/React.createElement("video", {
    src: "".concat(API_BASE, "/api/download/").concat(activeCourse.id, "/").concat(previewFile.index),
    controls: true,
    preload: "metadata",
    playsInline: true,
    className: "w-full h-full rounded-xl shadow-lg border border-white border-opacity-5"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "p-16 text-center bg-dark-900 rounded-2xl space-y-4 border border-white border-opacity-5 flex flex-col items-center justify-center",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-base text-white"
  }, "Dynamic Preview Restricted"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-sm leading-relaxed"
  }, "Dynamic previewing is only optimized for PDF and video assets. For spreadsheet models (.xlsx), HYSYS setups (.hsc), Matlab scripts (.m), or archives (.zip), download the file directly to open locally."), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return handleDownloadFile(previewFile.index, previewFile.name);
    },
    className: "px-4 py-2 bg-gradient-to-r from-accent-sky to-accent-violet hover:from-sky-500 hover:to-violet-600 text-white font-display font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-950/20 flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Download Asset")))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Hub-Class Slides Terminal"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any slide, lecture note, or asset from the left catalog to launch our integrated interactive workspace.")))), primarySection === 'videos' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Recorded Class Videos"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, videosList.length, " recordings")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pb-3 border-b border-white border-opacity-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-display font-bold text-sky-400 tracking-wider uppercase"
  }, "Video Folders"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleCreateVideoFolder,
    className: "flex items-center space-x-1 text-[10px] text-sky-300 hover:text-white font-display font-semibold transition-all bg-sky-500/10 hover:bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/20"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folderPlus",
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, "Create"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1"
  }, (activeCourse.video_folders || ["Root"]).map(function (folder) {
    var isSelected = currentVideoFolder === folder;
    return /*#__PURE__*/React.createElement("button", {
      key: folder,
      type: "button",
      onClick: function onClick() {
        setCurrentVideoFolder(folder);
        setPreviewFile(null);
      },
      className: "flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-display font-semibold transition-all border ".concat(isSelected ? 'bg-gradient-to-r from-accent-sky to-accent-violet text-white border-accent-sky border-opacity-40 shadow-md shadow-sky-950/40' : 'folder-btn-unselected')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "folder",
      className: "w-3.5 h-3.5 ".concat(isSelected ? 'text-white' : 'text-sky-400/70')
    }), /*#__PURE__*/React.createElement("span", {
      className: "truncate max-w-[80px]"
    }, folder), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1 ml-1",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("span", {
      onClick: function onClick(e) {
        return handleRenameVideoFolder(e, folder);
      },
      className: "p-0.5 rounded hover:bg-black/10 transition-all text-black",
      title: "Rename ".concat(folder)
    }, /*#__PURE__*/React.createElement("svg", {
      className: "w-2.5 h-2.5",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2.5
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    }))), folder !== "Root" && /*#__PURE__*/React.createElement("span", {
      onClick: function onClick(e) {
        return handleDeleteVideoFolder(e, folder);
      },
      className: "p-0.5 rounded hover:bg-black/10 transition-all text-black",
      title: "Delete ".concat(folder)
    }, /*#__PURE__*/React.createElement("svg", {
      className: "w-2.5 h-2.5",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2.5
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M6 18L18 6M6 6l12 12"
    })))));
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleFileUpload(e, videoUploadFile, "video", {
        setIsUploading: setIsVideoUploading,
        setUploadProgress: setVideoUploadProgress,
        setUploadStatus: setVideoUploadStatus,
        setUploadFile: setVideoUploadFile,
        fileInputRef: videoFileInputRef
      });
    },
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: "video/*",
    onChange: function onChange(e) {
      return setVideoUploadFile(Array.from(e.target.files));
    },
    className: "hidden",
    id: "video-upload-input",
    ref: videoFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "video-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, videoUploadFile && videoUploadFile.length > 0 ? videoUploadFile.length === 1 ? "Selected: ".concat(videoUploadFile[0].name) : "Selected: ".concat(videoUploadFile.length, " files") : "Upload recorded lectures, tutorials, or HYSYS demos directly."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), videoUploadFile && videoUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setVideoUploadFile([]);
      if (videoFileInputRef.current) videoFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isVideoUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isVideoUploading ? "Uploading..." : "Save to Videos"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isVideoUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: "".concat(videoUploadProgress, "%")
    }
  })), videoUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-lg text-[10px] font-display font-medium ".concat(videoUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20')
  }, videoUploadStatus.message), videoUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, videoUploadStatus.queue.filter(function (q) {
    return q.status === "success";
  }).length, " / ", videoUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, videoUploadStatus.queue.map(function (item, idx) {
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      className: "flex items-center justify-between text-xs py-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "truncate max-w-[180px] font-medium text-slate-400"
    }, item.name), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
    }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-accent-violet"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "loader",
      className: "w-3.5 h-3.5 animate-spin"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold"
    }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      className: "w-4 h-4 text-emerald-500 font-bold"
    }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-rose-500 font-semibold",
      title: item.error
    }, "Failed")));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search videos...",
    value: videoSearchQuery,
    onChange: function onChange(e) {
      return setVideoSearchQuery(e.target.value);
    },
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[450px] overflow-y-auto pr-1"
  }, filteredVideos.map(function (file) {
    var isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: function onClick() {
        return setPreviewFile(file);
      },
      className: "glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ".concat(isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "video",
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " \u2022 Recorded Class"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDeleteFile(file.index);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Video"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDownloadFile(file.index, file.name);
      },
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredVideos.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No recorded videos cataloged inside this folder yet.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile && videosList.some(function (f) {
    return f.index === previewFile.index;
  }) ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Play Class: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPreviewFile(null);
    },
    className: "che-close-reader-btn"
  }, "Close Preview")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden flex items-center justify-center",
    style: {
      height: "550px"
    }
  }, /*#__PURE__*/React.createElement("video", {
    src: "".concat(API_BASE, "/api/download/").concat(activeCourse.id, "/").concat(previewFile.index),
    controls: true,
    preload: "metadata",
    playsInline: true,
    className: "w-full h-full rounded-xl shadow-lg border border-white border-opacity-5"
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Hub-Class Video Terminal"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any recorded class lecture or HYSYS tutorial from the left catalog to launch our high-performance stream player."))))))), /*#__PURE__*/React.createElement("footer", {
    className: "glass-panel border-t border-white border-opacity-5 py-4 px-6 mt-auto text-center text-slate-500 text-xs flex flex-col md:flex-row items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("p", null, "\xA9 ", new Date().getFullYear(), " Chemical Engineering Hub Space. Designed for premium study acceleration."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "credit-developed-by text-[10px] uppercase tracking-wider"
  }, "Developed by"), /*#__PURE__*/React.createElement("span", {
    className: "credit-2102072 font-display text-xs"
  }, "Ibrahim Hisham-2102072")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 font-bold"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    className: "credit-presented-by text-[10px] uppercase tracking-wider"
  }, "Presented by DDC"))));
}

// Render React App
var container = document.getElementById('root');
var root = ReactDOM.createRoot(container);
root.render( /*#__PURE__*/React.createElement(App, null));