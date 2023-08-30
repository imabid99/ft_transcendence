"use strict";
exports.id = 878;
exports.ids = [878];
exports.modules = {

/***/ 5878:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ RightMessages)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function RightMessages({ message }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex  gap-[16px] items-end flex-row-reverse ",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: "/userProfile.jpg",
                alt: "",
                className: "rounded-full min-w-[44px] min-h-[44px]  max-w-[44px] max-h-[44px]   self-center object-cover"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "flex flex-col gap-[6px]",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-end",
                        children: "You"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-[#FFF] text-[16px] font-[Poppins] font-[500] bg-[#005F64] px-[20px] py-[10px] rounded-br-[30px] rounded-l-[30px] max-w-[400px] break-words",
                        children: message.content
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-end",
                        children: message.createdAt.split("T")[1].split(".")[0].slice(0, 5)
                    })
                ]
            })
        ]
    });
}


/***/ })

};
;