/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js ***!
  \****************************************************************************************/
/***/ ((module) => {

"use strict";
eval("// 'path' module extracted from Node.js v8.11.1 (only the posix part)\n// transplited with Babel\n\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nfunction assertPath(path) {\n  if (typeof path !== 'string') {\n    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));\n  }\n}\n\n// Resolves . and .. elements in a path with directory names\nfunction normalizeStringPosix(path, allowAboveRoot) {\n  var res = '';\n  var lastSegmentLength = 0;\n  var lastSlash = -1;\n  var dots = 0;\n  var code;\n  for (var i = 0; i <= path.length; ++i) {\n    if (i < path.length)\n      code = path.charCodeAt(i);\n    else if (code === 47 /*/*/)\n      break;\n    else\n      code = 47 /*/*/;\n    if (code === 47 /*/*/) {\n      if (lastSlash === i - 1 || dots === 1) {\n        // NOOP\n      } else if (lastSlash !== i - 1 && dots === 2) {\n        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {\n          if (res.length > 2) {\n            var lastSlashIndex = res.lastIndexOf('/');\n            if (lastSlashIndex !== res.length - 1) {\n              if (lastSlashIndex === -1) {\n                res = '';\n                lastSegmentLength = 0;\n              } else {\n                res = res.slice(0, lastSlashIndex);\n                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');\n              }\n              lastSlash = i;\n              dots = 0;\n              continue;\n            }\n          } else if (res.length === 2 || res.length === 1) {\n            res = '';\n            lastSegmentLength = 0;\n            lastSlash = i;\n            dots = 0;\n            continue;\n          }\n        }\n        if (allowAboveRoot) {\n          if (res.length > 0)\n            res += '/..';\n          else\n            res = '..';\n          lastSegmentLength = 2;\n        }\n      } else {\n        if (res.length > 0)\n          res += '/' + path.slice(lastSlash + 1, i);\n        else\n          res = path.slice(lastSlash + 1, i);\n        lastSegmentLength = i - lastSlash - 1;\n      }\n      lastSlash = i;\n      dots = 0;\n    } else if (code === 46 /*.*/ && dots !== -1) {\n      ++dots;\n    } else {\n      dots = -1;\n    }\n  }\n  return res;\n}\n\nfunction _format(sep, pathObject) {\n  var dir = pathObject.dir || pathObject.root;\n  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');\n  if (!dir) {\n    return base;\n  }\n  if (dir === pathObject.root) {\n    return dir + base;\n  }\n  return dir + sep + base;\n}\n\nvar posix = {\n  // path.resolve([from ...], to)\n  resolve: function resolve() {\n    var resolvedPath = '';\n    var resolvedAbsolute = false;\n    var cwd;\n\n    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {\n      var path;\n      if (i >= 0)\n        path = arguments[i];\n      else {\n        if (cwd === undefined)\n          cwd = process.cwd();\n        path = cwd;\n      }\n\n      assertPath(path);\n\n      // Skip empty entries\n      if (path.length === 0) {\n        continue;\n      }\n\n      resolvedPath = path + '/' + resolvedPath;\n      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;\n    }\n\n    // At this point the path should be resolved to a full absolute path, but\n    // handle relative paths to be safe (might happen when process.cwd() fails)\n\n    // Normalize the path\n    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);\n\n    if (resolvedAbsolute) {\n      if (resolvedPath.length > 0)\n        return '/' + resolvedPath;\n      else\n        return '/';\n    } else if (resolvedPath.length > 0) {\n      return resolvedPath;\n    } else {\n      return '.';\n    }\n  },\n\n  normalize: function normalize(path) {\n    assertPath(path);\n\n    if (path.length === 0) return '.';\n\n    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;\n    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;\n\n    // Normalize the path\n    path = normalizeStringPosix(path, !isAbsolute);\n\n    if (path.length === 0 && !isAbsolute) path = '.';\n    if (path.length > 0 && trailingSeparator) path += '/';\n\n    if (isAbsolute) return '/' + path;\n    return path;\n  },\n\n  isAbsolute: function isAbsolute(path) {\n    assertPath(path);\n    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;\n  },\n\n  join: function join() {\n    if (arguments.length === 0)\n      return '.';\n    var joined;\n    for (var i = 0; i < arguments.length; ++i) {\n      var arg = arguments[i];\n      assertPath(arg);\n      if (arg.length > 0) {\n        if (joined === undefined)\n          joined = arg;\n        else\n          joined += '/' + arg;\n      }\n    }\n    if (joined === undefined)\n      return '.';\n    return posix.normalize(joined);\n  },\n\n  relative: function relative(from, to) {\n    assertPath(from);\n    assertPath(to);\n\n    if (from === to) return '';\n\n    from = posix.resolve(from);\n    to = posix.resolve(to);\n\n    if (from === to) return '';\n\n    // Trim any leading backslashes\n    var fromStart = 1;\n    for (; fromStart < from.length; ++fromStart) {\n      if (from.charCodeAt(fromStart) !== 47 /*/*/)\n        break;\n    }\n    var fromEnd = from.length;\n    var fromLen = fromEnd - fromStart;\n\n    // Trim any leading backslashes\n    var toStart = 1;\n    for (; toStart < to.length; ++toStart) {\n      if (to.charCodeAt(toStart) !== 47 /*/*/)\n        break;\n    }\n    var toEnd = to.length;\n    var toLen = toEnd - toStart;\n\n    // Compare paths to find the longest common path from root\n    var length = fromLen < toLen ? fromLen : toLen;\n    var lastCommonSep = -1;\n    var i = 0;\n    for (; i <= length; ++i) {\n      if (i === length) {\n        if (toLen > length) {\n          if (to.charCodeAt(toStart + i) === 47 /*/*/) {\n            // We get here if `from` is the exact base path for `to`.\n            // For example: from='/foo/bar'; to='/foo/bar/baz'\n            return to.slice(toStart + i + 1);\n          } else if (i === 0) {\n            // We get here if `from` is the root\n            // For example: from='/'; to='/foo'\n            return to.slice(toStart + i);\n          }\n        } else if (fromLen > length) {\n          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {\n            // We get here if `to` is the exact base path for `from`.\n            // For example: from='/foo/bar/baz'; to='/foo/bar'\n            lastCommonSep = i;\n          } else if (i === 0) {\n            // We get here if `to` is the root.\n            // For example: from='/foo'; to='/'\n            lastCommonSep = 0;\n          }\n        }\n        break;\n      }\n      var fromCode = from.charCodeAt(fromStart + i);\n      var toCode = to.charCodeAt(toStart + i);\n      if (fromCode !== toCode)\n        break;\n      else if (fromCode === 47 /*/*/)\n        lastCommonSep = i;\n    }\n\n    var out = '';\n    // Generate the relative path based on the path difference between `to`\n    // and `from`\n    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {\n      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {\n        if (out.length === 0)\n          out += '..';\n        else\n          out += '/..';\n      }\n    }\n\n    // Lastly, append the rest of the destination (`to`) path that comes after\n    // the common path parts\n    if (out.length > 0)\n      return out + to.slice(toStart + lastCommonSep);\n    else {\n      toStart += lastCommonSep;\n      if (to.charCodeAt(toStart) === 47 /*/*/)\n        ++toStart;\n      return to.slice(toStart);\n    }\n  },\n\n  _makeLong: function _makeLong(path) {\n    return path;\n  },\n\n  dirname: function dirname(path) {\n    assertPath(path);\n    if (path.length === 0) return '.';\n    var code = path.charCodeAt(0);\n    var hasRoot = code === 47 /*/*/;\n    var end = -1;\n    var matchedSlash = true;\n    for (var i = path.length - 1; i >= 1; --i) {\n      code = path.charCodeAt(i);\n      if (code === 47 /*/*/) {\n          if (!matchedSlash) {\n            end = i;\n            break;\n          }\n        } else {\n        // We saw the first non-path separator\n        matchedSlash = false;\n      }\n    }\n\n    if (end === -1) return hasRoot ? '/' : '.';\n    if (hasRoot && end === 1) return '//';\n    return path.slice(0, end);\n  },\n\n  basename: function basename(path, ext) {\n    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('\"ext\" argument must be a string');\n    assertPath(path);\n\n    var start = 0;\n    var end = -1;\n    var matchedSlash = true;\n    var i;\n\n    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {\n      if (ext.length === path.length && ext === path) return '';\n      var extIdx = ext.length - 1;\n      var firstNonSlashEnd = -1;\n      for (i = path.length - 1; i >= 0; --i) {\n        var code = path.charCodeAt(i);\n        if (code === 47 /*/*/) {\n            // If we reached a path separator that was not part of a set of path\n            // separators at the end of the string, stop now\n            if (!matchedSlash) {\n              start = i + 1;\n              break;\n            }\n          } else {\n          if (firstNonSlashEnd === -1) {\n            // We saw the first non-path separator, remember this index in case\n            // we need it if the extension ends up not matching\n            matchedSlash = false;\n            firstNonSlashEnd = i + 1;\n          }\n          if (extIdx >= 0) {\n            // Try to match the explicit extension\n            if (code === ext.charCodeAt(extIdx)) {\n              if (--extIdx === -1) {\n                // We matched the extension, so mark this as the end of our path\n                // component\n                end = i;\n              }\n            } else {\n              // Extension does not match, so our result is the entire path\n              // component\n              extIdx = -1;\n              end = firstNonSlashEnd;\n            }\n          }\n        }\n      }\n\n      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;\n      return path.slice(start, end);\n    } else {\n      for (i = path.length - 1; i >= 0; --i) {\n        if (path.charCodeAt(i) === 47 /*/*/) {\n            // If we reached a path separator that was not part of a set of path\n            // separators at the end of the string, stop now\n            if (!matchedSlash) {\n              start = i + 1;\n              break;\n            }\n          } else if (end === -1) {\n          // We saw the first non-path separator, mark this as the end of our\n          // path component\n          matchedSlash = false;\n          end = i + 1;\n        }\n      }\n\n      if (end === -1) return '';\n      return path.slice(start, end);\n    }\n  },\n\n  extname: function extname(path) {\n    assertPath(path);\n    var startDot = -1;\n    var startPart = 0;\n    var end = -1;\n    var matchedSlash = true;\n    // Track the state of characters (if any) we see before our first dot and\n    // after any path separator we find\n    var preDotState = 0;\n    for (var i = path.length - 1; i >= 0; --i) {\n      var code = path.charCodeAt(i);\n      if (code === 47 /*/*/) {\n          // If we reached a path separator that was not part of a set of path\n          // separators at the end of the string, stop now\n          if (!matchedSlash) {\n            startPart = i + 1;\n            break;\n          }\n          continue;\n        }\n      if (end === -1) {\n        // We saw the first non-path separator, mark this as the end of our\n        // extension\n        matchedSlash = false;\n        end = i + 1;\n      }\n      if (code === 46 /*.*/) {\n          // If this is our first dot, mark it as the start of our extension\n          if (startDot === -1)\n            startDot = i;\n          else if (preDotState !== 1)\n            preDotState = 1;\n      } else if (startDot !== -1) {\n        // We saw a non-dot and non-path separator before our dot, so we should\n        // have a good chance at having a non-empty extension\n        preDotState = -1;\n      }\n    }\n\n    if (startDot === -1 || end === -1 ||\n        // We saw a non-dot character immediately before the dot\n        preDotState === 0 ||\n        // The (right-most) trimmed path component is exactly '..'\n        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {\n      return '';\n    }\n    return path.slice(startDot, end);\n  },\n\n  format: function format(pathObject) {\n    if (pathObject === null || typeof pathObject !== 'object') {\n      throw new TypeError('The \"pathObject\" argument must be of type Object. Received type ' + typeof pathObject);\n    }\n    return _format('/', pathObject);\n  },\n\n  parse: function parse(path) {\n    assertPath(path);\n\n    var ret = { root: '', dir: '', base: '', ext: '', name: '' };\n    if (path.length === 0) return ret;\n    var code = path.charCodeAt(0);\n    var isAbsolute = code === 47 /*/*/;\n    var start;\n    if (isAbsolute) {\n      ret.root = '/';\n      start = 1;\n    } else {\n      start = 0;\n    }\n    var startDot = -1;\n    var startPart = 0;\n    var end = -1;\n    var matchedSlash = true;\n    var i = path.length - 1;\n\n    // Track the state of characters (if any) we see before our first dot and\n    // after any path separator we find\n    var preDotState = 0;\n\n    // Get non-dir info\n    for (; i >= start; --i) {\n      code = path.charCodeAt(i);\n      if (code === 47 /*/*/) {\n          // If we reached a path separator that was not part of a set of path\n          // separators at the end of the string, stop now\n          if (!matchedSlash) {\n            startPart = i + 1;\n            break;\n          }\n          continue;\n        }\n      if (end === -1) {\n        // We saw the first non-path separator, mark this as the end of our\n        // extension\n        matchedSlash = false;\n        end = i + 1;\n      }\n      if (code === 46 /*.*/) {\n          // If this is our first dot, mark it as the start of our extension\n          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;\n        } else if (startDot !== -1) {\n        // We saw a non-dot and non-path separator before our dot, so we should\n        // have a good chance at having a non-empty extension\n        preDotState = -1;\n      }\n    }\n\n    if (startDot === -1 || end === -1 ||\n    // We saw a non-dot character immediately before the dot\n    preDotState === 0 ||\n    // The (right-most) trimmed path component is exactly '..'\n    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {\n      if (end !== -1) {\n        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);\n      }\n    } else {\n      if (startPart === 0 && isAbsolute) {\n        ret.name = path.slice(1, startDot);\n        ret.base = path.slice(1, end);\n      } else {\n        ret.name = path.slice(startPart, startDot);\n        ret.base = path.slice(startPart, end);\n      }\n      ret.ext = path.slice(startDot, end);\n    }\n\n    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';\n\n    return ret;\n  },\n\n  sep: '/',\n  delimiter: ':',\n  win32: null,\n  posix: null\n};\n\nposix.posix = posix;\n\nmodule.exports = posix;\n\n\n//# sourceURL=webpack://game-server/./node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js?");

/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\ndotenv_1.default.config();\nexports[\"default\"] = {\n    user: \"roee1454@gmail.com\",\n    pass: \"mzys oajj ceso wjup\",\n};\n\n\n//# sourceURL=webpack://game-server/./src/config/index.ts?");

/***/ }),

/***/ "./src/controllers/authController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/authController.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.handleVerifyAuthorization = exports.handleLogout = exports.handlePasswordReset = exports.handleSendPasswordResest = exports.handleEmailVerfication = exports.handleSendVerficationEmail = exports.handleLogin = exports.handleRegister = void 0;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ \"bcrypt\"));\nconst nodemailer_1 = __webpack_require__(/*! ../modules/nodemailer */ \"./src/modules/nodemailer.ts\");\nconst client_1 = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n//Global Variables\nconst secretKey = \"3as9di98dsuoiasoasid9ausdho\";\nasync function handleRegister(req, res) {\n    let user = req.body;\n    const prisma = new client_1.PrismaClient();\n    console.log(user);\n    //Check for existing user\n    const existingUser = await prisma.user.findUnique({\n        where: {\n            email: user.email,\n        },\n    });\n    if (existingUser) {\n        return res.status(400).send(\"User already exists! Please Sign in\");\n    }\n    //Hashing user password\n    const hashedPassword = bcrypt_1.default.hashSync(user.passwordHash, 10);\n    user.passwordHash = hashedPassword;\n    //Pushing the user into the database\n    const resultUser = await prisma.user.create({\n        data: {\n            ...user,\n            isVerified: false,\n        },\n    });\n    //Signing auth token for a week\n    const token = jsonwebtoken_1.default.sign({ id: resultUser.id }, secretKey, {\n        expiresIn: 1 * 60 * 60 * 24 * 7,\n    });\n    await prisma.$disconnect();\n    return res\n        .status(200)\n        .cookie(\"token\", token, { maxAge: 1000 * 60 * 60 * 24 * 30 })\n        .send(\"User signed in sucessfully!\");\n}\nexports.handleRegister = handleRegister;\nasync function handleLogin(req, res) {\n    const userCredentionals = req.body;\n    const prisma = new client_1.PrismaClient();\n    //Find existing user via email\n    const user = await prisma.user.findUnique({\n        where: { email: userCredentionals.email },\n    });\n    if (!user) {\n        return res.status(500).send(\"Invalid email or password\");\n    }\n    //Check if the provided password is equal to it's hashed version\n    const isPasswordValid = bcrypt_1.default.compareSync(userCredentionals.password, user.passwordHash);\n    if (!isPasswordValid) {\n        return res.status(501).send(\"Invalid email or password\");\n    }\n    //Signing auth token for a week\n    const token = jsonwebtoken_1.default.sign({ id: user.id }, secretKey, {\n        expiresIn: 1 * 60 * 60 * 24 * 7,\n    });\n    await prisma.$disconnect();\n    return res\n        .status(200)\n        .cookie(\"token\", token, { maxAge: 1000 * 60 * 60 * 24 * 30 })\n        .send(\"User signed in sucessfully!\");\n}\nexports.handleLogin = handleLogin;\n//Handle sending email verification mail\nfunction handleSendVerficationEmail(req, res) {\n    const { email } = req.body;\n    if (!email) {\n        return res.status(500).send(\"Invalid Email!\");\n    }\n    (0, nodemailer_1.sendEmail)(email, \"Verify Your Email!\", `<div>\r\n      <a href=\"http://localhost:3000/email-verfication\">Press here in order to verify your email</a>\r\n    </div>`, (err, info) => {\n        if (err) {\n            return res.status(501).send(err.message);\n        }\n        return res.status(200).send(`Email sent successfully: ${info.response}`);\n    });\n}\nexports.handleSendVerficationEmail = handleSendVerficationEmail;\n//Handle email verification process\nasync function handleEmailVerfication(req, res) {\n    const { token } = req.cookies;\n    if (!token) {\n        return res.status(500).send(\"Invalid Token\");\n    }\n    const payload = jsonwebtoken_1.default.verify(token, secretKey);\n    if (!payload) {\n        return res.status(500).send(\"Invalid Token\");\n    }\n    const prisma = new client_1.PrismaClient();\n    const user = await prisma.user.findUnique({\n        where: {\n            id: payload.id,\n        },\n    });\n    if (!user) {\n        return res.status(501).send(\"Invalid User\");\n    }\n    const { id, ...userData } = user;\n    await prisma.user.update({\n        data: {\n            ...userData,\n            isVerified: true,\n        },\n        where: {\n            id,\n        },\n    });\n    await prisma.$disconnect();\n    return res.status(200).send(\"User verified successfully!\");\n}\nexports.handleEmailVerfication = handleEmailVerfication;\n//Handle sending password reset email\nfunction handleSendPasswordResest(req, res) {\n    const { email } = req.body;\n    if (!email) {\n        return res.status(500).send(\"Invalid Email!\");\n    }\n    (0, nodemailer_1.sendEmail)(email, \"Reset Your Password!\", `<div>\r\n      <a href=\"http://your-app-link/password-reset\">Press here in order to reset your password</a>\r\n    </div>`, (err, info) => {\n        if (err) {\n            return res.status(500).send(err.message);\n        }\n        return res.status(200).send(`Email sent successfully: ${info.response}`);\n    });\n}\nexports.handleSendPasswordResest = handleSendPasswordResest;\n//Handle password reset\nasync function handlePasswordReset(req, res) {\n    const { currentPassword, newPassword } = req.body;\n    const { token } = req.cookies;\n    if (!token) {\n        return res.status(500).send(\"Invalid Token\");\n    }\n    const payload = jsonwebtoken_1.default.verify(token, secretKey);\n    if (!payload) {\n        return res.status(500).send(\"Invalid Token\");\n    }\n    const prisma = new client_1.PrismaClient();\n    let user = await prisma.user.findUnique({\n        where: {\n            id: payload.id,\n        },\n    });\n    const compareResult = bcrypt_1.default.compareSync(currentPassword, user.passwordHash);\n    if (!compareResult) {\n        return res.status(501).send(\"Invalid current password\");\n    }\n    const newPasswordHash = bcrypt_1.default.hashSync(newPassword, 10);\n    user.passwordHash = newPasswordHash;\n    const { id, ...userData } = user;\n    await prisma.user.update({\n        data: {\n            ...userData,\n            isVerified: true,\n        },\n        where: {\n            id,\n        },\n    });\n    await prisma.$disconnect();\n    return res.status(200).send(\"Password resetted successfully\");\n}\nexports.handlePasswordReset = handlePasswordReset;\n//Logout from the current user\nfunction handleLogout(_, res) {\n    return res.status(200).clearCookie(\"token\").send(\"Logged out successfully\");\n}\nexports.handleLogout = handleLogout;\n//Handle auth protected routes\nasync function handleVerifyAuthorization(req, res, nextFunction) {\n    const { token } = req.cookies;\n    if (!token) {\n        return res.status(401).send(\"Unauthorized!\");\n    }\n    const payload = jsonwebtoken_1.default.verify(token, secretKey);\n    const prisma = new client_1.PrismaClient();\n    const resultUser = await prisma.user.findFirst({\n        where: {\n            id: payload.id\n        }\n    });\n    if (!resultUser) {\n        return res.status(401).send(\"Unauthorized!\");\n    }\n    await prisma.$disconnect();\n    nextFunction();\n}\nexports.handleVerifyAuthorization = handleVerifyAuthorization;\n\n\n//# sourceURL=webpack://game-server/./src/controllers/authController.ts?");

/***/ }),

/***/ "./src/controllers/fileController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/fileController.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("var __dirname = \"/\";\n\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.handleDeleteFile = exports.handleUpdateFile = exports.handleUploadFile = exports.handleGetFile = exports.handleGetAllUploads = void 0;\nconst p = __importStar(__webpack_require__(/*! path */ \"./node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js\"));\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ \"?2715\"));\nconst client_1 = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n//Handle get all file objects from prisma\nasync function handleGetAllUploads(req, res) {\n    //Logic here... (You can add query params on it!)\n    const prisma = new client_1.PrismaClient();\n    const resultFiles = await prisma.file.findMany();\n    if (!resultFiles || resultFiles.length < 1) {\n        return res.status(500).send(\"No Files!\");\n    }\n    await prisma.$disconnect();\n    return res.status(200).json(resultFiles);\n}\nexports.handleGetAllUploads = handleGetAllUploads;\n//Handle get a file buffer from local dir\nasync function handleGetFile(req, res) {\n    const { id } = req.params;\n    if (!id) {\n        return res.status(500).send(\"Invalid Path\");\n    }\n    const prisma = new client_1.PrismaClient();\n    const file = await prisma.file.findUnique({\n        where: {\n            id\n        }\n    });\n    if (!file) {\n        return res.status(501).send(\"Invalid Id!\");\n    }\n    const buffer = fs_1.default.readFileSync(p.join(__dirname, \"../../uploads\", file.filename));\n    if (!buffer) {\n        return res.status(500).send(\"Invalid Path\");\n    }\n    await prisma.$disconnect();\n    return res.status(200).sendFile(p.join(__dirname, \"../../uploads\", file.filename));\n}\nexports.handleGetFile = handleGetFile;\n//Handles uploading a file to prisma and local dir\nasync function handleUploadFile(req, res) {\n    const { file } = req;\n    if (!file) {\n        return res.status(500).send(\"Did not recieve a file\");\n    }\n    const prisma = new client_1.PrismaClient();\n    const resultFile = await prisma.file.create({\n        data: {\n            filename: file.originalname,\n            ContentType: file.mimetype,\n            size: file.size,\n        }\n    });\n    await prisma.$disconnect();\n    if (!resultFile) {\n        return res.status(501).send(\"Error while uploading file to database..\");\n    }\n    return res.status(200).send(`Uploaded file Sucessfully: ${resultFile.id}`);\n}\nexports.handleUploadFile = handleUploadFile;\n//Handles updating a file in prisma and local dir..\nasync function handleUpdateFile(req, res) {\n    const { id } = req.params;\n    const file = req.file;\n    const prisma = new client_1.PrismaClient();\n    const resultFile = await prisma.file.findUnique({\n        where: {\n            id\n        }\n    });\n    const requestedFileEnd = resultFile.filename.split(\".\")[1];\n    const fileEnd = file.filename.split(\".\")[1];\n    if (fileEnd !== requestedFileEnd) {\n        return res.status(502).send(\"Inidentical file format!\");\n    }\n    //Update process...\n    const buffer = fs_1.default.readFileSync(p.join(__dirname, \"../../uploads\", file.filename));\n    fs_1.default.writeFileSync(p.join(__dirname, \"../../uploads\", resultFile.filename), buffer);\n    fs_1.default.rmSync(p.join(__dirname, \"../../uploads\", file.filename));\n    //Database update process..\n    await prisma.file.update({\n        where: {\n            id\n        },\n        data: {\n            size: file.size,\n        }\n    });\n    await prisma.$disconnect();\n    return res.status(200).send(`Updated file Sucessfully: ${resultFile.filename}`);\n}\nexports.handleUpdateFile = handleUpdateFile;\n//Handles deleting files from prisma and local dir..\nasync function handleDeleteFile(req, res) {\n    const { id } = req.params;\n    if (!id) {\n        return res.status(500).send(\"Invalid file id\");\n    }\n    const prisma = new client_1.PrismaClient();\n    const resultFile = await prisma.file.findUnique({\n        where: {\n            id\n        }\n    });\n    if (!resultFile) {\n        return res.status(500).send(\"Invalid file id\");\n    }\n    fs_1.default.rmSync(p.join(__dirname, \"../../uploads\", resultFile.filename));\n    await prisma.file.delete({\n        where: {\n            id\n        }\n    });\n    prisma.$disconnect();\n    return res.status(200).send(`Deleted file successfully: ${resultFile.id}`);\n}\nexports.handleDeleteFile = handleDeleteFile;\n\n\n//# sourceURL=webpack://game-server/./src/controllers/fileController.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ \"cookie-parser\"));\nconst authRoutes_1 = __importDefault(__webpack_require__(/*! ./routes/authRoutes */ \"./src/routes/authRoutes.ts\"));\nconst fileRoutes_1 = __importDefault(__webpack_require__(/*! ./routes/fileRoutes */ \"./src/routes/fileRoutes.ts\"));\nconst socket_1 = __importDefault(__webpack_require__(/*! ./modules/socket */ \"./src/modules/socket.ts\"));\ndotenv_1.default.config();\nconst app = (0, express_1.default)();\napp.use(express_1.default.json());\napp.use(express_1.default.urlencoded({ extended: true }));\napp.use((0, cors_1.default)());\napp.use((0, cookie_parser_1.default)());\napp.use(authRoutes_1.default);\napp.use(fileRoutes_1.default);\n//Any route you want to append...\nconst server = app.listen(\"3000\", () => {\n    console.log(\"Server Works\");\n});\n(0, socket_1.default)(server);\n\n\n//# sourceURL=webpack://game-server/./src/index.ts?");

/***/ }),

/***/ "./src/modules/multer.ts":
/*!*******************************!*\
  !*** ./src/modules/multer.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("var __dirname = \"/\";\n\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.upload = void 0;\nconst multer_1 = __importDefault(__webpack_require__(/*! multer */ \"multer\"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"./node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js\"));\n//defines some storage configurations, feel free to customize it to your liking..\nconst storage = multer_1.default.diskStorage({\n    destination(req, file, callback) {\n        callback(null, path_1.default.join(__dirname, \"../../uploads\"));\n    },\n    filename(_, file, callback) {\n        callback(null, file.originalname);\n    },\n});\nexports.upload = (0, multer_1.default)({ storage });\n\n\n//# sourceURL=webpack://game-server/./src/modules/multer.ts?");

/***/ }),

/***/ "./src/modules/nodemailer.ts":
/*!***********************************!*\
  !*** ./src/modules/nodemailer.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.sendEmail = void 0;\nconst nodemailer_1 = __importDefault(__webpack_require__(/*! nodemailer */ \"nodemailer\"));\nconst config_1 = __importDefault(__webpack_require__(/*! ../config */ \"./src/config/index.ts\"));\nconst { user, pass } = config_1.default;\n//transporter configuration to gmail, feel free to use any other mailing service.. (proton, etc...)\nconst transporter = nodemailer_1.default.createTransport({\n    service: 'gmail',\n    auth: {\n        user: user,\n        pass: pass\n    },\n    port: 465,\n    host: \"smtp.gmail.com\"\n});\n//send mail function, feel free to change it to your liking!\nfunction sendEmail(to, subject, body, callback) {\n    const emailOptions = {\n        to,\n        subject,\n        text: body || \"\",\n        html: body || \"\",\n    };\n    transporter.sendMail(emailOptions, callback);\n}\nexports.sendEmail = sendEmail;\n\n\n//# sourceURL=webpack://game-server/./src/modules/nodemailer.ts?");

/***/ }),

/***/ "./src/modules/socket.ts":
/*!*******************************!*\
  !*** ./src/modules/socket.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst ws_1 = __importDefault(__webpack_require__(/*! ws */ \"ws\"));\nfunction handleSocketConnection(server) {\n    const socketServer = new ws_1.default.Server({ server });\n    socketServer.on(\"connection\", (socketConnectionClient) => {\n        console.log(`${socketServer.clients.size} users are connected!`);\n        //Handle client events...\n        socketConnectionClient.on(\"message\", (bufferLike) => {\n            const data = bufferLike.toString(\"utf-8\");\n            socketConnectionClient.send(\"Message Recieved: \" + data);\n        });\n        socketConnectionClient.on(\"error\", (err) => {\n            socketConnectionClient.send(`Connection Error: ${err.message}`);\n            throw err;\n        });\n    });\n}\nexports[\"default\"] = handleSocketConnection;\n\n\n//# sourceURL=webpack://game-server/./src/modules/socket.ts?");

/***/ }),

/***/ "./src/routes/authRoutes.ts":
/*!**********************************!*\
  !*** ./src/routes/authRoutes.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst authValidator_1 = __webpack_require__(/*! ../validation/authValidator */ \"./src/validation/authValidator.ts\");\nconst authController_1 = __webpack_require__(/*! ../controllers/authController */ \"./src/controllers/authController.ts\");\nconst authRouter = express_1.default.Router();\n//User registeration endpoint..\nauthRouter.post(\"/register\", authValidator_1.validateUser, authController_1.handleRegister);\n//User login endpoint..\nauthRouter.post(\"/login\", authValidator_1.validateUserCredentionals, authController_1.handleLogin);\n//Send email verification endpoint..\nauthRouter.post(\"/send-verification\", authController_1.handleSendVerficationEmail);\n//Send password verification endpoint..\nauthRouter.post(\"/send-password-reset\", authController_1.handleSendPasswordResest);\n//Password reset endpoint..\nauthRouter.post(\"/password-reset\", authController_1.handlePasswordReset);\n//Email verification endpoint..\nauthRouter.get(\"/email-verification\", authController_1.handleEmailVerfication);\n//Logout endpoint..\nauthRouter.get(\"/logout\", authController_1.handleLogout);\nexports[\"default\"] = authRouter;\n\n\n//# sourceURL=webpack://game-server/./src/routes/authRoutes.ts?");

/***/ }),

/***/ "./src/routes/fileRoutes.ts":
/*!**********************************!*\
  !*** ./src/routes/fileRoutes.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst multer_1 = __webpack_require__(/*! ../modules/multer */ \"./src/modules/multer.ts\");\nconst fileController_1 = __webpack_require__(/*! ../controllers/fileController */ \"./src/controllers/fileController.ts\");\nconst authController_1 = __webpack_require__(/*! ../controllers/authController */ \"./src/controllers/authController.ts\");\n//Global variables\nconst uploadName = \"file\";\nconst router = express_1.default.Router();\n//Get list of all files in storage..\nrouter.get(\"/files\", authController_1.handleVerifyAuthorization, fileController_1.handleGetAllUploads);\n//Get file buffer..\nrouter.get(\"/file/:id\", authController_1.handleVerifyAuthorization, fileController_1.handleGetFile);\n//Upload a new file.. (Change 'uploadName' as you like)\nrouter.post(\"/file\", authController_1.handleVerifyAuthorization, multer_1.upload.single(uploadName), fileController_1.handleUploadFile);\n//Updating an existing file..\nrouter.put(\"/file/:id\", authController_1.handleVerifyAuthorization, multer_1.upload.single(uploadName), fileController_1.handleUpdateFile);\n//Deleting an existing file..\nrouter.delete(\"/file/:id\", authController_1.handleVerifyAuthorization, fileController_1.handleDeleteFile);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://game-server/./src/routes/fileRoutes.ts?");

/***/ }),

/***/ "./src/validation/authValidator.ts":
/*!*****************************************!*\
  !*** ./src/validation/authValidator.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validateUser = exports.validateUserCredentionals = void 0;\nconst zod_1 = __importDefault(__webpack_require__(/*! zod */ \"zod\"));\n//Validating user credentionals middleware..\nfunction validateUserCredentionals(req, res, nextFunction) {\n    const credentionals = req.body;\n    const credentionalsSchema = zod_1.default.object({\n        email: zod_1.default.string().email(\"Not a valid email\"),\n        password: zod_1.default.string().min(6, \"Invalid password length\").max(12, \"Invalid password length\"),\n    });\n    const isCredentionalsSchemaSafe = credentionalsSchema.safeParse(credentionals);\n    if (!isCredentionalsSchemaSafe.success) {\n        return res.status(500).send(\"Invalid Credentionals\");\n    }\n    nextFunction();\n}\nexports.validateUserCredentionals = validateUserCredentionals;\n//Validating user upon registeration midldeware..\nfunction validateUser(req, res, nextFunction) {\n    const user = req.body;\n    const userSchema = zod_1.default.object({\n        email: zod_1.default.string().email(\"Not a valid email\"),\n        displayName: zod_1.default.string(),\n        passwordHash: zod_1.default.string().min(6, \"Invalid password length\").max(12, \"Invalid password length\"),\n    });\n    const isUserSchemaSafe = userSchema.safeParse(user);\n    if (!isUserSchemaSafe.success) {\n        return res.status(500).send(\"Invalid User\");\n    }\n    nextFunction();\n}\nexports.validateUser = validateUser;\n\n\n//# sourceURL=webpack://game-server/./src/validation/authValidator.ts?");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("multer");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("nodemailer");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("ws");

/***/ }),

/***/ "zod":
/*!**********************!*\
  !*** external "zod" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("zod");

/***/ }),

/***/ "?2715":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://game-server/fs_(ignored)?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;