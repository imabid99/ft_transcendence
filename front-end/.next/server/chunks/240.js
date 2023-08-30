exports.id = 240;
exports.ids = [240];
exports.modules = {

/***/ 8732:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9121))

/***/ }),

/***/ 3259:
/***/ (() => {



/***/ }),

/***/ 9121:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contextdata: () => (/* binding */ contextdata),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_localStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1392);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_axiosInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(954);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3133);
/* __next_internal_client_entry_do_not_use__ contextdata,default auto */ 





let newSocket = null;
const contextdata = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
const ContextProvider = ({ children })=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [users, setUsers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [profiles, setProfiles] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [socket, setSocket] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [myChannels, setMyChannels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [channels, setChannels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loged, setLoged] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const getUser = async ()=>{
            try {
                const resp = await _utils_axiosInstance__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.get(`http://${"10.13.2.5"}:3000/api/user/userinfo`);
                if (resp.data === null) {
                    (0,_utils_localStorage__WEBPACK_IMPORTED_MODULE_5__/* .removeLocalStorageItem */ .e8)("Token");
                    router.push("/login");
                    return;
                }
                setUser(resp.data);
            } catch (error) {
                console.log("error : ", error);
                (0,_utils_localStorage__WEBPACK_IMPORTED_MODULE_5__/* .removeLocalStorageItem */ .e8)("Token");
                router.push("/login");
                return;
            }
        };
        getUser();
        return ()=>{
            setUser(null);
        };
    }, [
        loged
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!user || user === undefined) {
            return;
        }
        newSocket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP)(`http://${"10.13.2.5"}:3000`, {
            extraHeaders: {
                Authorization: `Bearer ${(0,_utils_localStorage__WEBPACK_IMPORTED_MODULE_5__/* .getLocalStorageItem */ .le)("Token")}`
            }
        });
        if (newSocket) {
            setSocket(newSocket);
        }
        return ()=>newSocket.disconnect();
    }, [
        user
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!user || user === undefined) {
            return;
        }
        async function getUsers() {
            try {
                const resp = await _utils_axiosInstance__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.get(`http://${"10.13.2.5"}:3000/api/user/all`);
                if (resp.data === null) {
                    return;
                }
                setUsers(resp.data);
            } catch (error) {
                console.log("error : users ", error);
                return;
            }
        }
        async function getProfiles() {
            try {
                const resp = await _utils_axiosInstance__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.get(`http://${"10.13.2.5"}:3000/api/user/profiles`);
                if (resp.data === null) {
                    return;
                }
                setProfiles(resp.data);
            } catch (error) {
                console.log("error : profiles ", error);
                return;
            }
        }
        async function getMessages() {
            try {
                const resp = await _utils_axiosInstance__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.get(`http://${"10.13.2.5"}:3000/api/chat/messages/${user?.id}`);
                if (resp.data === null) {
                    return;
                }
                resp.data.sort((a, b)=>{
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                });
                setMessages(resp.data);
            } catch (error) {
                console.log("error : profiles ", error);
                return;
            }
        }
        async function getMyChannels() {
            try {
                const resp = await _utils_axiosInstance__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.get(`http://${"10.13.2.5"}:3000/api/chat/myChannels/${user?.id}`);
                if (resp.data === null) {
                    return;
                }
                setMyChannels(resp.data);
            } catch (error) {
                console.log("error : profiles ", error);
                return;
            }
        }
        async function getChannels() {
            try {
                const resp = await _utils_axiosInstance__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.get(`http://${"10.13.2.5"}:3000/api/chat/channels`);
                if (resp.data === null) {
                    return;
                }
                setChannels(resp.data);
            } catch (error) {
                console.log("error : profiles ", error);
                return;
            }
        }
        getChannels();
        getUsers();
        getProfiles();
        getMessages();
        getMyChannels();
        return ()=>{
            setUsers([]);
            setProfiles([]);
            setMessages([]);
            setMyChannels([]);
            setChannels([]);
        };
    }, [
        user
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(contextdata.Provider, {
        value: {
            socket: socket,
            user: user,
            users: users,
            profiles: profiles,
            messages: messages,
            myChannels: myChannels,
            channels: channels,
            setChannels: setChannels,
            setUser: setUser,
            setMyChannels: setMyChannels,
            setUsers: setUsers,
            setProfiles: setProfiles,
            setMessages: setMessages,
            setLoged: setLoged,
            loged: loged
        },
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContextProvider);


/***/ }),

/***/ 954:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(248);
/* harmony import */ var _utils_localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1392);


// Create an Axios instance with default configuration
const axiosInstance = axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.create({
    // Set the base URL for your API
    baseURL: `http://${"10.13.2.5"}:3000/api/`
});
// Add an interceptor to include the JWT in the request headers
axiosInstance.interceptors.request.use((config)=>{
    const token = (0,_utils_localStorage__WEBPACK_IMPORTED_MODULE_1__/* .getLocalStorageItem */ .le)("Token"); // Retrieve the JWT from storage
    if (token) {
        config.headers = {
            ...config.headers,
            "Authorization": `Bearer ${token}`
        };
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axiosInstance);


/***/ }),

/***/ 1392:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D$: () => (/* binding */ setLocalStorageItem),
/* harmony export */   e8: () => (/* binding */ removeLocalStorageItem),
/* harmony export */   le: () => (/* binding */ getLocalStorageItem)
/* harmony export */ });
const setLocalStorageItem = (key, value)=>{
    if (false) {}
};
const getLocalStorageItem = (key)=>{
    const value = localStorage.getItem(key);
    return value;
};
const removeLocalStorageItem = (key)=>{
    localStorage.removeItem(key);
};


/***/ }),

/***/ 2241:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"app/layout.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(9298);
var layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(2817);
// EXTERNAL MODULE: ./node_modules/next/dist/client/components/noop-head.js
var noop_head = __webpack_require__(3873);
var noop_head_default = /*#__PURE__*/__webpack_require__.n(noop_head);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(7887);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1313);
;// CONCATENATED MODULE: ./app/contextApi.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/asabbar/Desktop/ft_git/front-end/app/contextApi.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["contextdata"];


/* harmony default export */ const contextApi = (__default__);
;// CONCATENATED MODULE: ./app/layout.tsx






const metadata = {
    title: "Ping Pong",
    description: "ft_transcendence"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("body", {
            className: (layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).className,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)((noop_head_default()), {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("title", {
                            children: metadata.title
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                            name: "description",
                            content: metadata.description
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("link", {
                            rel: "icon",
                            href: "/favicon.ico"
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "h-[100vh] w-[100vw] flex ",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(contextApi, {
                        children: children
                    })
                })
            ]
        })
    });
}


/***/ }),

/***/ 1340:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Loading)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Loading() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex justify-center items-center w-full h-full bg-gray-50 dark:bg-gray-900",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"
        })
    });
}


/***/ }),

/***/ 3174:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3180);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 2817:
/***/ (() => {



/***/ })

};
;