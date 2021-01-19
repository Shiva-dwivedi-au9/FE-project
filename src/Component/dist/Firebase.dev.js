"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebase = _interopRequireDefault(require("firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firebaseConfig = {
  apiKey: "AIzaSyCavBZhy-5sNGQfti3tsn09LsGYVDnU0hU",
  authDomain: "movie-database-b302b.firebaseapp.com",
  projectId: "movie-database-b302b",
  storageBucket: "movie-database-b302b.appspot.com",
  messagingSenderId: "330872786994",
  appId: "1:330872786994:web:e450815eff294fd5a7ac2b"
};

var firebaseApp = _firebase["default"].initializeApp(firebaseConfig);

var db = firebaseApp.firestore();
var _default = db;
exports["default"] = _default;