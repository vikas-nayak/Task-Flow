"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/global/container-scroll-animation.tsx":
/*!**************************************************************!*\
  !*** ./src/components/global/container-scroll-animation.tsx ***!
  \**************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Card: function() { return /* binding */ Card; },\n/* harmony export */   ContainerScroll: function() { return /* binding */ ContainerScroll; },\n/* harmony export */   Header: function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/value/use-scroll.mjs\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/value/use-transform.mjs\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/render/dom/motion.mjs\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* __next_internal_client_entry_do_not_use__ ContainerScroll,Header,Card auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst ContainerScroll = (param)=>{\n    let { titleComponent } = param;\n    _s();\n    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const { scrollYProgress } = (0,framer_motion__WEBPACK_IMPORTED_MODULE_3__.useScroll)({\n        target: containerRef\n    });\n    const [isMobile, setIsMobile] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);\n    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{\n        const checkMobile = ()=>{\n            setIsMobile(window.innerWidth <= 768);\n        };\n        checkMobile();\n        window.addEventListener(\"resize\", checkMobile);\n        return ()=>{\n            window.removeEventListener(\"resize\", checkMobile);\n        };\n    }, []);\n    const scaleDimensions = ()=>{\n        return isMobile ? [\n            0.7,\n            0.9\n        ] : [\n            1.05,\n            1\n        ];\n    };\n    const rotate = (0,framer_motion__WEBPACK_IMPORTED_MODULE_4__.useTransform)(scrollYProgress, [\n        0,\n        1\n    ], [\n        20,\n        0\n    ]);\n    const scale = (0,framer_motion__WEBPACK_IMPORTED_MODULE_4__.useTransform)(scrollYProgress, [\n        0,\n        1\n    ], [\n        1,\n        1.02\n    ]); // Minor adjustment in scale\n    const translate = (0,framer_motion__WEBPACK_IMPORTED_MODULE_4__.useTransform)(scrollYProgress, [\n        0,\n        1\n    ], [\n        0,\n        -100\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"h-[80rem] flex items-center justify-center relative p-20\",\n        ref: containerRef,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"py-40 w-full relative\",\n            style: {\n                perspective: \"1000px\"\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Header, {\n                    translate: translate,\n                    titleComponent: titleComponent\n                }, void 0, false, {\n                    fileName: \"D:\\\\Task-Flow\\\\src\\\\components\\\\global\\\\container-scroll-animation.tsx\",\n                    lineNumber: 47,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Card, {\n                    rotate: rotate,\n                    translate: translate,\n                    scale: scale\n                }, void 0, false, {\n                    fileName: \"D:\\\\Task-Flow\\\\src\\\\components\\\\global\\\\container-scroll-animation.tsx\",\n                    lineNumber: 51,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"D:\\\\Task-Flow\\\\src\\\\components\\\\global\\\\container-scroll-animation.tsx\",\n            lineNumber: 41,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"D:\\\\Task-Flow\\\\src\\\\components\\\\global\\\\container-scroll-animation.tsx\",\n        lineNumber: 37,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ContainerScroll, \"ASbD8gX0RUr8mvLoxB2H8s3CAs0=\", false, function() {\n    return [\n        framer_motion__WEBPACK_IMPORTED_MODULE_3__.useScroll,\n        framer_motion__WEBPACK_IMPORTED_MODULE_4__.useTransform,\n        framer_motion__WEBPACK_IMPORTED_MODULE_4__.useTransform,\n        framer_motion__WEBPACK_IMPORTED_MODULE_4__.useTransform\n    ];\n});\n_c = ContainerScroll;\nconst Header = (param)=>{\n    let { translate, titleComponent } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_5__.motion.div, {\n        style: {\n            translateY: translate\n        },\n        className: \"div max-w-5xl mx-auto text-center\",\n        children: titleComponent\n    }, void 0, false, {\n        fileName: \"D:\\\\Task-Flow\\\\src\\\\components\\\\global\\\\container-scroll-animation.tsx\",\n        lineNumber: 63,\n        columnNumber: 5\n    }, undefined);\n};\n_c1 = Header;\nconst Card = (param)=>{\n    let { rotate, scale, translate } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_5__.motion.div, {\n        style: {\n            rotateX: rotate,\n            scale,\n            boxShadow: \"0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003\"\n        },\n        className: \"max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full  p-6 bg-[#222222] rounded-[30px] shadow-2xl\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"bg-gray-100 h-full w-full rounded-2xl  gap-4 overflow-hidden p-4 transition-all \",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/temp-banner.png\",\n                fill: true,\n                alt: \"bannerImage\",\n                className: \"object-cover border-8 rounded-2xl\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Task-Flow\\\\src\\\\components\\\\global\\\\container-scroll-animation.tsx\",\n                lineNumber: 94,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"D:\\\\Task-Flow\\\\src\\\\components\\\\global\\\\container-scroll-animation.tsx\",\n            lineNumber: 93,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"D:\\\\Task-Flow\\\\src\\\\components\\\\global\\\\container-scroll-animation.tsx\",\n        lineNumber: 84,\n        columnNumber: 5\n    }, undefined);\n};\n_c2 = Card;\nvar _c, _c1, _c2;\n$RefreshReg$(_c, \"ContainerScroll\");\n$RefreshReg$(_c1, \"Header\");\n$RefreshReg$(_c2, \"Card\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2dsb2JhbC9jb250YWluZXItc2Nyb2xsLWFuaW1hdGlvbi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ3FDO0FBQzBCO0FBQ2pDO0FBRXZCLE1BQU1NLGtCQUFrQjtRQUFDLEVBQzlCQyxjQUFjLEVBR2Y7O0lBQ0MsTUFBTUMsZUFBZVAsNkNBQU1BLENBQU07SUFDakMsTUFBTSxFQUFFUSxlQUFlLEVBQUUsR0FBR1Asd0RBQVNBLENBQUM7UUFDcENRLFFBQVFGO0lBQ1Y7SUFDQSxNQUFNLENBQUNHLFVBQVVDLFlBQVksR0FBR1oscURBQWMsQ0FBQztJQUUvQ0Esc0RBQWUsQ0FBQztRQUNkLE1BQU1lLGNBQWM7WUFDbEJILFlBQVlJLE9BQU9DLFVBQVUsSUFBSTtRQUNuQztRQUNBRjtRQUNBQyxPQUFPRSxnQkFBZ0IsQ0FBQyxVQUFVSDtRQUNsQyxPQUFPO1lBQ0xDLE9BQU9HLG1CQUFtQixDQUFDLFVBQVVKO1FBQ3ZDO0lBQ0YsR0FBRyxFQUFFO0lBRUwsTUFBTUssa0JBQWtCO1FBQ3RCLE9BQU9ULFdBQVc7WUFBQztZQUFLO1NBQUksR0FBRztZQUFDO1lBQU07U0FBRTtJQUMxQztJQUVBLE1BQU1VLFNBQVNsQiwyREFBWUEsQ0FBQ00saUJBQWlCO1FBQUM7UUFBRztLQUFFLEVBQUU7UUFBQztRQUFJO0tBQUU7SUFDNUQsTUFBTWEsUUFBUW5CLDJEQUFZQSxDQUFDTSxpQkFBaUI7UUFBQztRQUFHO0tBQUUsRUFBRTtRQUFDO1FBQUc7S0FBSyxHQUFHLDRCQUE0QjtJQUM1RixNQUFNYyxZQUFZcEIsMkRBQVlBLENBQUNNLGlCQUFpQjtRQUFDO1FBQUc7S0FBRSxFQUFFO1FBQUM7UUFBRyxDQUFDO0tBQUk7SUFFakUscUJBQ0UsOERBQUNlO1FBQ0NDLFdBQVU7UUFDVkMsS0FBS2xCO2tCQUVMLDRFQUFDZ0I7WUFDQ0MsV0FBVTtZQUNWRSxPQUFPO2dCQUNMQyxhQUFhO1lBQ2Y7OzhCQUVBLDhEQUFDQztvQkFDQ04sV0FBV0E7b0JBQ1hoQixnQkFBZ0JBOzs7Ozs7OEJBRWxCLDhEQUFDdUI7b0JBQ0NULFFBQVFBO29CQUNSRSxXQUFXQTtvQkFDWEQsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2pCLEVBQUM7R0FyRFloQjs7UUFNaUJKLG9EQUFTQTtRQW9CdEJDLHVEQUFZQTtRQUNiQSx1REFBWUE7UUFDUkEsdURBQVlBOzs7S0E1Qm5CRztBQXVETixNQUFNdUIsU0FBUztRQUFDLEVBQUVOLFNBQVMsRUFBRWhCLGNBQWMsRUFBTztJQUN2RCxxQkFDRSw4REFBQ0gsaURBQU1BLENBQUNvQixHQUFHO1FBQ1RHLE9BQU87WUFDTEksWUFBWVI7UUFDZDtRQUNBRSxXQUFVO2tCQUVUbEI7Ozs7OztBQUdQLEVBQUM7TUFYWXNCO0FBYU4sTUFBTUMsT0FBTztRQUFDLEVBQ25CVCxNQUFNLEVBQ05DLEtBQUssRUFDTEMsU0FBUyxFQUtWO0lBQ0MscUJBQ0UsOERBQUNuQixpREFBTUEsQ0FBQ29CLEdBQUc7UUFDVEcsT0FBTztZQUNMSyxTQUFTWDtZQUNUQztZQUNBVyxXQUNFO1FBQ0o7UUFDQVIsV0FBVTtrQkFFViw0RUFBQ0Q7WUFBSUMsV0FBVTtzQkFDYiw0RUFBQ3BCLGtEQUFLQTtnQkFDSjZCLEtBQUk7Z0JBQ0pDLElBQUk7Z0JBQ0pDLEtBQUk7Z0JBQ0pYLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLcEIsRUFBQztNQTdCWUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvZ2xvYmFsL2NvbnRhaW5lci1zY3JvbGwtYW5pbWF0aW9uLnRzeD9hNjNiIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlUmVmIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IHVzZVNjcm9sbCwgdXNlVHJhbnNmb3JtLCBtb3Rpb24gfSBmcm9tICdmcmFtZXItbW90aW9uJ1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSdcclxuXHJcbmV4cG9ydCBjb25zdCBDb250YWluZXJTY3JvbGwgPSAoe1xyXG4gIHRpdGxlQ29tcG9uZW50LFxyXG59OiB7XHJcbiAgdGl0bGVDb21wb25lbnQ6IHN0cmluZyB8IFJlYWN0LlJlYWN0Tm9kZVxyXG59KSA9PiB7XHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPGFueT4obnVsbClcclxuICBjb25zdCB7IHNjcm9sbFlQcm9ncmVzcyB9ID0gdXNlU2Nyb2xsKHtcclxuICAgIHRhcmdldDogY29udGFpbmVyUmVmLFxyXG4gIH0pXHJcbiAgY29uc3QgW2lzTW9iaWxlLCBzZXRJc01vYmlsZV0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSlcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGNoZWNrTW9iaWxlID0gKCkgPT4ge1xyXG4gICAgICBzZXRJc01vYmlsZSh3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjgpXHJcbiAgICB9XHJcbiAgICBjaGVja01vYmlsZSgpXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tNb2JpbGUpXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tNb2JpbGUpXHJcbiAgICB9XHJcbiAgfSwgW10pXHJcblxyXG4gIGNvbnN0IHNjYWxlRGltZW5zaW9ucyA9ICgpID0+IHtcclxuICAgIHJldHVybiBpc01vYmlsZSA/IFswLjcsIDAuOV0gOiBbMS4wNSwgMV1cclxuICB9XHJcblxyXG4gIGNvbnN0IHJvdGF0ZSA9IHVzZVRyYW5zZm9ybShzY3JvbGxZUHJvZ3Jlc3MsIFswLCAxXSwgWzIwLCAwXSlcclxuICBjb25zdCBzY2FsZSA9IHVzZVRyYW5zZm9ybShzY3JvbGxZUHJvZ3Jlc3MsIFswLCAxXSwgWzEsIDEuMDJdKTsgLy8gTWlub3IgYWRqdXN0bWVudCBpbiBzY2FsZVxyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IHVzZVRyYW5zZm9ybShzY3JvbGxZUHJvZ3Jlc3MsIFswLCAxXSwgWzAsIC0xMDBdKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzc05hbWU9XCJoLVs4MHJlbV0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcmVsYXRpdmUgcC0yMFwiXHJcbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwicHktNDAgdy1mdWxsIHJlbGF0aXZlXCJcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgcGVyc3BlY3RpdmU6ICcxMDAwcHgnLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8SGVhZGVyXHJcbiAgICAgICAgICB0cmFuc2xhdGU9e3RyYW5zbGF0ZX1cclxuICAgICAgICAgIHRpdGxlQ29tcG9uZW50PXt0aXRsZUNvbXBvbmVudH1cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxDYXJkXHJcbiAgICAgICAgICByb3RhdGU9e3JvdGF0ZX1cclxuICAgICAgICAgIHRyYW5zbGF0ZT17dHJhbnNsYXRlfVxyXG4gICAgICAgICAgc2NhbGU9e3NjYWxlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgSGVhZGVyID0gKHsgdHJhbnNsYXRlLCB0aXRsZUNvbXBvbmVudCB9OiBhbnkpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPG1vdGlvbi5kaXZcclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICB0cmFuc2xhdGVZOiB0cmFuc2xhdGUsXHJcbiAgICAgIH19XHJcbiAgICAgIGNsYXNzTmFtZT1cImRpdiBtYXgtdy01eGwgbXgtYXV0byB0ZXh0LWNlbnRlclwiXHJcbiAgICA+XHJcbiAgICAgIHt0aXRsZUNvbXBvbmVudH1cclxuICAgIDwvbW90aW9uLmRpdj5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBDYXJkID0gKHtcclxuICByb3RhdGUsXHJcbiAgc2NhbGUsXHJcbiAgdHJhbnNsYXRlLFxyXG59OiB7XHJcbiAgcm90YXRlOiBhbnlcclxuICBzY2FsZTogYW55XHJcbiAgdHJhbnNsYXRlOiBhbnlcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8bW90aW9uLmRpdlxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHJvdGF0ZVg6IHJvdGF0ZSwgLy8gcm90YXRlIGluIFgtYXhpc1xyXG4gICAgICAgIHNjYWxlLFxyXG4gICAgICAgIGJveFNoYWRvdzpcclxuICAgICAgICAgICcwIDAgIzAwMDAwMDRkLCAwIDlweCAyMHB4ICMwMDAwMDA0YSwgMCAzN3B4IDM3cHggIzAwMDAwMDQyLCAwIDg0cHggNTBweCAjMDAwMDAwMjYsIDAgMTQ5cHggNjBweCAjMDAwMDAwMGEsIDAgMjMzcHggNjVweCAjMDAwMDAwMDMnLFxyXG4gICAgICB9fVxyXG4gICAgICBjbGFzc05hbWU9XCJtYXgtdy01eGwgLW10LTEyIG14LWF1dG8gaC1bMzByZW1dIG1kOmgtWzQwcmVtXSB3LWZ1bGwgIHAtNiBiZy1bIzIyMjIyMl0gcm91bmRlZC1bMzBweF0gc2hhZG93LTJ4bFwiXHJcbiAgICA+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS0xMDAgaC1mdWxsIHctZnVsbCByb3VuZGVkLTJ4bCAgZ2FwLTQgb3ZlcmZsb3ctaGlkZGVuIHAtNCB0cmFuc2l0aW9uLWFsbCBcIj5cclxuICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgIHNyYz1cIi90ZW1wLWJhbm5lci5wbmdcIlxyXG4gICAgICAgICAgZmlsbFxyXG4gICAgICAgICAgYWx0PVwiYmFubmVySW1hZ2VcIlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwib2JqZWN0LWNvdmVyIGJvcmRlci04IHJvdW5kZWQtMnhsXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbW90aW9uLmRpdj5cclxuICApXHJcbn0iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VSZWYiLCJ1c2VTY3JvbGwiLCJ1c2VUcmFuc2Zvcm0iLCJtb3Rpb24iLCJJbWFnZSIsIkNvbnRhaW5lclNjcm9sbCIsInRpdGxlQ29tcG9uZW50IiwiY29udGFpbmVyUmVmIiwic2Nyb2xsWVByb2dyZXNzIiwidGFyZ2V0IiwiaXNNb2JpbGUiLCJzZXRJc01vYmlsZSIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiY2hlY2tNb2JpbGUiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzY2FsZURpbWVuc2lvbnMiLCJyb3RhdGUiLCJzY2FsZSIsInRyYW5zbGF0ZSIsImRpdiIsImNsYXNzTmFtZSIsInJlZiIsInN0eWxlIiwicGVyc3BlY3RpdmUiLCJIZWFkZXIiLCJDYXJkIiwidHJhbnNsYXRlWSIsInJvdGF0ZVgiLCJib3hTaGFkb3ciLCJzcmMiLCJmaWxsIiwiYWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/global/container-scroll-animation.tsx\n"));

/***/ })

});