exports.id = 924;
exports.ids = [924];
exports.modules = {

/***/ 9780:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 8314))

/***/ }),

/***/ 737:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 125, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 6249, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 7844, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 1522, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 3100, 23))

/***/ }),

/***/ 8314:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ChatLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(1338);
// EXTERNAL MODULE: ./node_modules/next/dist/client/components/noop-head.js
var noop_head = __webpack_require__(1824);
var noop_head_default = /*#__PURE__*/__webpack_require__.n(noop_head);
// EXTERNAL MODULE: ./components/Dashboard/Chat/Avatar/Avatar.tsx
var Avatar = __webpack_require__(9878);
// EXTERNAL MODULE: ./node_modules/swiper/swiper-react.mjs + 5 modules
var swiper_react = __webpack_require__(7653);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./app/contextApi.tsx
var contextApi = __webpack_require__(9121);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1621);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/swiper/swiper.css
var swiper = __webpack_require__(467);
;// CONCATENATED MODULE: ./components/Dashboard/Chat/LeftSide/UsersOline.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 






function UsersOnline() {
    const { profiles, user } = (0,react_.useContext)(contextApi.contextdata);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "chat__left__bottom flex flex-col gap-[24px] px-[25px] py-[25px] w-full",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "chat__left__bottom__online__users flex flex-col gap-[20px] w-full lg:max-xl:w-[300px]",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "text-[20px] font-[500] font-[Poppins] text-[#DEDEDE]",
                    children: "Online Now"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(swiper_react/* Swiper */.tq, {
                    spaceBetween: 1,
                    slidesPerView: 4,
                    className: "w-full cursor-grab",
                    children: user && profiles?.map((profile)=>profile.status === "online" && profile.userId !== user.id && /*#__PURE__*/ jsx_runtime_.jsx(swiper_react/* SwiperSlide */.o5, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: `/Chat/me/${profile.userId}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(Avatar/* default */.Z, {
                                    url: "/userProfile.jpg",
                                    status: true
                                })
                            })
                        }, profile.userId))
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./components/Dashboard/Chat/Channel/Channel.tsx



function Channel({ avatar, channel, lastMessage, lastMessageTime, notification, active, link }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
        href: `/Chat/${link}`,
        className: "cursor-pointer w-full flex justify-between items-center ",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-center gap-[14px]",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Avatar/* default */.Z, {
                        url: avatar,
                        status: active
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-[#034B8A] text-[20px] font-[Poppins] font-[500] max-w-[200px] truncate lsm:max-lg:max-w-[152px]",
                                children: channel
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-[#C0C1C5] text-[16px] font-[Poppins] font-[300] max-w-[200px] truncate lg:max-xl:max-w-[150px] lsm:max-lg:max-w-[120px]",
                                children: lastMessage
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col items-end gap-[13px]",
                children: [
                    !notification ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                            width: "19",
                            height: "11",
                            viewBox: "0 0 19 11",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                d: "M1 6.67469L4.4 10.1213M9.16 4.60674L12.56 1.16016M6.44 6.67469L9.84 10.1213L18 1.16016",
                                stroke: "#30C7EC"
                            })
                        })
                    }) : /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "flex justify-center items-center w-[20px] h-[20px] rounded-full bg-[#30C7EC] text-[#fff] text-[10px] font-[Poppins] font-[500]",
                        children: notification > 99 ? "99+" : notification
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "text-[#C0C1C5] text-[14] font-[Poppins] font-[300]",
                        children: lastMessageTime
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./utils/getLastMessage.tsx
const getLastMessage = (messages, userId)=>{
    if (!messages || messages.length === 0) {
        return null;
    }
    const lastMessage = messages.filter((message)=>{
        return message.fromId === userId || message.toId === userId;
    });
    return lastMessage[lastMessage.length - 1];
};
const getLastMessageGroup = (messages)=>{
    if (!messages || messages.length === 0) {
        return null;
    }
    messages.sort((a, b)=>{
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    return messages[messages.length - 1];
};

;// CONCATENATED MODULE: ./components/Dashboard/Chat/LeftSide/GroupsChannels.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 




function GroupsChannels() {
    const groupsChannelsRef = (0,react_.useRef)(null);
    const showMoreRef = (0,react_.useRef)(null);
    const handelShowMore = ()=>{
        showMoreRef.current?.classList.toggle("rotate-180");
        groupsChannelsRef.current?.classList.toggle("overflow-y-hidden");
        groupsChannelsRef.current?.classList.toggle("max-h-[235px]");
    };
    const { myChannels } = (0,react_.useContext)(contextApi.contextdata);
    myChannels.sort((a, b)=>{
        const lastMessageA = getLastMessageGroup(a.Messages);
        const lastMessageB = getLastMessageGroup(b.Messages);
        if (lastMessageA && lastMessageB) {
            return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime();
        }
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "chat__left__bottom__groups flex flex-col  justify-center items-center",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                className: "flex items-center justify-start gap-[10px] w-full mb-[20px]",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "flex justify-center items-center bg-[#0074D9] rounded-[15px] w-[27px] h-[27px]",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                            width: "12",
                            height: "10",
                            viewBox: "0 0 12 10",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M5.74634 0C5.12986 0 4.53862 0.243841 4.1027 0.67788C3.66677 1.11192 3.42188 1.7006 3.42188 2.31443C3.42188 2.92825 3.66677 3.51693 4.1027 3.95097C4.53862 4.38501 5.12986 4.62885 5.74634 4.62885C6.36283 4.62885 6.95407 4.38501 7.38999 3.95097C7.82591 3.51693 8.07081 2.92825 8.07081 2.31443C8.07081 1.7006 7.82591 1.11192 7.38999 0.67788C6.95407 0.243841 6.36283 0 5.74634 0ZM4.15592 2.31443C4.15592 1.89444 4.32348 1.49166 4.62174 1.19468C4.92001 0.89771 5.32454 0.730872 5.74634 0.730872C6.16815 0.730872 6.57268 0.89771 6.87094 1.19468C7.16921 1.49166 7.33677 1.89444 7.33677 2.31443C7.33677 2.73441 7.16921 3.1372 6.87094 3.43417C6.57268 3.73114 6.16815 3.89798 5.74634 3.89798C5.32454 3.89798 4.92001 3.73114 4.62174 3.43417C4.32348 3.1372 4.15592 2.73441 4.15592 2.31443Z",
                                    fill: "white"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M8.68401 0.974609C8.58667 0.974609 8.49332 1.01311 8.42449 1.08164C8.35566 1.15018 8.31699 1.24313 8.31699 1.34005C8.31699 1.43696 8.35566 1.52991 8.42449 1.59845C8.49332 1.66698 8.58667 1.70548 8.68401 1.70548C9.35786 1.70548 9.78507 2.14693 9.78507 2.55816C9.78507 2.9694 9.35786 3.41085 8.68401 3.41085C8.58667 3.41085 8.49332 3.44935 8.42449 3.51788C8.35566 3.58641 8.31699 3.67936 8.31699 3.77628C8.31699 3.8732 8.35566 3.96615 8.42449 4.03469C8.49332 4.10322 8.58667 4.14172 8.68401 4.14172C9.6319 4.14172 10.5191 3.49222 10.5191 2.55816C10.5191 1.62411 9.6319 0.974609 8.68401 0.974609ZM3.17869 1.34005C3.17869 1.24313 3.14002 1.15018 3.07119 1.08164C3.00236 1.01311 2.90901 0.974609 2.81167 0.974609C1.86378 0.974609 0.976562 1.62411 0.976562 2.55816C0.976562 3.49222 1.86378 4.14172 2.81167 4.14172C2.90901 4.14172 3.00236 4.10322 3.07119 4.03469C3.14002 3.96615 3.17869 3.8732 3.17869 3.77628C3.17869 3.67936 3.14002 3.58641 3.07119 3.51788C3.00236 3.44935 2.90901 3.41085 2.81167 3.41085C2.13831 3.41085 1.71061 2.9694 1.71061 2.55816C1.71061 2.14693 2.13831 1.70548 2.81167 1.70548C2.90901 1.70548 3.00236 1.66698 3.07119 1.59845C3.14002 1.52991 3.17869 1.43696 3.17869 1.34005Z",
                                    fill: "white"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M5.7485 5.36133C4.87548 5.36133 4.06804 5.59521 3.46857 5.99329C2.87155 6.38991 2.44531 6.97753 2.44531 7.67576C2.44531 8.37398 2.87155 8.96209 3.46857 9.35822C4.06804 9.75582 4.87548 9.99018 5.7485 9.99018C6.62153 9.99018 7.42897 9.7563 8.02844 9.35822C8.62546 8.9616 9.0517 8.37398 9.0517 7.67576C9.0517 6.97753 8.62497 6.38942 8.02844 5.99329C7.42897 5.59569 6.62153 5.36133 5.7485 5.36133ZM3.17936 7.67576C3.17936 7.29765 3.41033 6.91078 3.87572 6.60186C4.33914 6.29441 5.00027 6.0922 5.7485 6.0922C6.49723 6.0922 7.15787 6.29441 7.62129 6.60186C8.08667 6.91078 8.31765 7.29765 8.31765 7.67576C8.31765 8.05386 8.08667 8.44073 7.62129 8.74965C7.15787 9.0571 6.49674 9.25931 5.7485 9.25931C4.99978 9.25931 4.33914 9.0571 3.87572 8.74965C3.41033 8.44073 3.17936 8.05386 3.17936 7.67576Z",
                                    fill: "white"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M9.30619 6.13538C9.31646 6.08842 9.33592 6.04394 9.36348 6.00448C9.39103 5.96502 9.42613 5.93136 9.46677 5.90543C9.50741 5.87949 9.55278 5.8618 9.6003 5.85335C9.64782 5.8449 9.69654 5.84587 9.74368 5.85619C10.214 5.959 10.6382 6.14464 10.9534 6.40142C11.268 6.65771 11.5 7.01048 11.5 7.43146C11.5 7.85293 11.268 8.20521 10.9534 8.46151C10.6382 8.71829 10.2144 8.90393 9.74368 9.00674C9.69658 9.01704 9.64789 9.018 9.60041 9.00957C9.55294 9.00114 9.50759 8.98348 9.46696 8.9576C9.42634 8.93172 9.39123 8.89812 9.36365 8.85873C9.33606 8.81935 9.31654 8.77493 9.30619 8.72803C9.29585 8.68113 9.29488 8.63266 9.30335 8.58538C9.31181 8.53811 9.32955 8.49296 9.35554 8.45251C9.38153 8.41206 9.41527 8.3771 9.45483 8.34964C9.4944 8.32217 9.539 8.30273 9.58611 8.29243C9.97417 8.20814 10.2839 8.06245 10.4885 7.89581C10.693 7.72917 10.766 7.56594 10.766 7.43146C10.766 7.29698 10.693 7.13424 10.4885 6.96712C10.2839 6.80048 9.97417 6.65528 9.58611 6.5705C9.53899 6.56022 9.49436 6.5408 9.45479 6.51334C9.41521 6.48588 9.38146 6.45093 9.35546 6.41047C9.32946 6.37001 9.31173 6.32485 9.30328 6.27757C9.29482 6.23028 9.29581 6.1818 9.30619 6.1349V6.13538ZM1.75681 5.85619C1.85194 5.83552 1.95143 5.85331 2.03338 5.90567C2.11534 5.95803 2.17304 6.04066 2.19381 6.13538C2.21457 6.23011 2.1967 6.32916 2.14411 6.41076C2.09153 6.49236 2.00854 6.54982 1.9134 6.5705C1.52583 6.65479 1.21606 6.80048 1.01151 6.96712C0.806957 7.13376 0.734043 7.29698 0.734043 7.43146C0.734043 7.56594 0.806957 7.72868 1.01151 7.89581C1.21606 8.06245 1.52583 8.20765 1.91389 8.29243C2.00903 8.31324 2.09196 8.37082 2.14446 8.45251C2.19695 8.5342 2.2147 8.63331 2.19381 8.72803C2.17291 8.82275 2.11508 8.90533 2.03304 8.9576C1.95099 9.00987 1.85145 9.02754 1.75632 9.00674C1.28555 8.90393 0.861766 8.71829 0.546617 8.46151C0.231957 8.20521 0 7.85245 0 7.43146C0 7.00999 0.231957 6.65771 0.546617 6.40142C0.861766 6.14464 1.28604 5.959 1.75681 5.85619Z",
                                    fill: "white"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "text-[16px] font-[500] font-[Poppins] text-[#0174D9]",
                        children: "Groups"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex flex-col gap-[20px] overflow-y-hidden max-h-[235px] min-h-[235px]rounded-[5px] w-full",
                ref: groupsChannelsRef,
                children: myChannels?.map((mychannel)=>{
                    return /*#__PURE__*/ jsx_runtime_.jsx(Channel, {
                        avatar: "/groupAvatar.jpg",
                        channel: mychannel.name,
                        lastMessage: getLastMessageGroup(mychannel.Messages)?.content,
                        lastMessageTime: getLastMessageGroup(mychannel.Messages)?.createdAt.toString().split("T")[1].split(".")[0].slice(0, 5),
                        notification: 0,
                        active: false,
                        link: `g/${mychannel.id}`
                    }, `key : ${mychannel.id}`);
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                className: "cursor-pointer p-[15px] transition-all duration-300 ease-in-out",
                onClick: handelShowMore,
                ref: showMoreRef,
                children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                    width: "15",
                    height: "15",
                    viewBox: "0 0 105 68",
                    fill: "#0074D9",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                        d: "M92.0888 0.667969L52.5 42.0788L12.9112 0.667969L0.75 13.4167L52.5 67.6667L104.25 13.4167L92.0888 0.667969Z"
                    })
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/Dashboard/Chat/LeftSide/UsersDm.tsx





function UsersDm() {
    const { profiles, user, messages } = (0,react_.useContext)(contextApi.contextdata);
    messages?.sort((a, b)=>{
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    profiles?.sort((a, b)=>{
        const lastMessageA = getLastMessage(messages, a.userId);
        if (!lastMessageA) return 1;
        const lastMessageB = getLastMessage(messages, b.userId);
        if (lastMessageA && lastMessageB) {
            return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime();
        }
        return 0;
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "chat__left__bottom__groups flex flex-col  justify-center items-center",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                className: "flex items-center justify-start gap-[10px] w-full mb-[20px]",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "flex justify-center items-center bg-[#00959C] rounded-[15px] w-[27px] h-[27px]",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                            width: "12",
                            height: "11",
                            viewBox: "0 0 12 11",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                d: "M3.77778 3.63562H8.22222M3.77778 5.74412H7.11111M9.33333 1C9.77536 1 10.1993 1.16661 10.5118 1.46317C10.8244 1.75974 11 2.16197 11 2.58137V6.79837C11 7.21778 10.8244 7.62001 10.5118 7.91658C10.1993 8.21314 9.77536 8.37975 9.33333 8.37975H6.55556L3.77778 9.96112V8.37975H2.66667C2.22464 8.37975 1.80072 8.21314 1.48816 7.91658C1.17559 7.62001 1 7.21778 1 6.79837V2.58137C1 2.16197 1.17559 1.75974 1.48816 1.46317C1.80072 1.16661 2.22464 1 2.66667 1H9.33333Z",
                                stroke: "white"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "text-[16px] font-[500] font-[Poppins] text-[#00959C]",
                        children: "All Message"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex flex-col gap-[20px]  rounded-[5px] w-full",
                children: user && profiles?.map((ur)=>{
                    return ur.userId === user.id || getLastMessage(messages, ur.userId)?.content === undefined ? null : /*#__PURE__*/ jsx_runtime_.jsx(Channel, {
                        avatar: "/userProfile.jpg",
                        channel: `${ur.firstName} ${ur.lastName}`,
                        lastMessage: getLastMessage(messages, ur.userId)?.content,
                        lastMessageTime: getLastMessage(messages, ur.userId)?.createdAt.toString().split("T")[1].split(".")[0].slice(0, 5),
                        notification: 15,
                        active: ur.status === "online" ? true : false,
                        link: `me/${ur?.userId}`
                    }, `key : ${ur.userId}`);
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/Dashboard/Chat/LeftSide/NewModal.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

function NewModal({ setShowBody }) {
    const [showPen, setShowPen] = (0,react_.useState)(true);
    const [showModal, setShowModal] = (0,react_.useState)(false);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: " NewModal bg-[#025063] min-h-[70px] min-w-[70px] rounded-full absolute bottom-[-500px] right-[50px] z-[100] flex justify-center items-center cursor-pointer lsm:max-lg:bottom-[10px]  lsm:max-lg:right-[10px]",
        onClick: ()=>{
            setShowPen(!showPen);
            setShowModal(!showModal);
        },
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "flex justify-center items-center relative",
            children: [
                showPen ? /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                    stroke: "currentColor",
                    fill: "#FFF",
                    viewBox: "0 0 512 512",
                    height: "22px",
                    width: "22px",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                        d: "M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                    })
                }) : /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                    width: "22",
                    height: "22",
                    viewBox: "0 0 22 22",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                        d: "M17.9415 0.735395C18.1574 0.507121 18.4169 0.32445 18.7046 0.198178C18.9923 0.0719063 19.3024 0.00459649 19.6166 0.000227299C19.9307 -0.00414189 20.2426 0.0545182 20.5337 0.17274C20.8248 0.290962 21.0893 0.466347 21.3115 0.688528C21.5337 0.910709 21.709 1.17518 21.8273 1.4663C21.9455 1.75742 22.0041 2.06929 21.9998 2.38347C21.9954 2.69765 21.9281 3.00777 21.8018 3.29549C21.6756 3.58321 21.4929 3.8427 21.2646 4.05862L14.3769 10.9464C14.3678 10.9555 14.3606 10.9663 14.3557 10.9782C14.3507 10.9901 14.3482 11.0029 14.3482 11.0158C14.3482 11.0286 14.3507 11.0414 14.3557 11.0533C14.3606 11.0652 14.3678 11.076 14.3769 11.0851L21.2646 17.9729C21.4859 18.1905 21.6618 18.4498 21.7823 18.7357C21.9029 19.0217 21.9656 19.3287 21.9669 19.639C21.9682 19.9493 21.9081 20.2568 21.7899 20.5438C21.6718 20.8307 21.498 21.0914 21.2786 21.3109C21.0592 21.5303 20.7985 21.7042 20.5116 21.8224C20.2247 21.9406 19.9172 22.0008 19.6069 21.9996C19.2966 21.9984 18.9896 21.9357 18.7036 21.8152C18.4176 21.6948 18.1583 21.5189 17.9407 21.2977L11.053 14.4099C11.0439 14.4008 11.0331 14.3935 11.0212 14.3886C11.0093 14.3837 10.9965 14.3811 10.9837 14.3811C10.9708 14.3811 10.958 14.3837 10.9461 14.3886C10.9342 14.3935 10.9234 14.4008 10.9143 14.4099L4.02664 21.2977C3.80903 21.5189 3.54978 21.6949 3.26383 21.8154C2.97788 21.936 2.6709 21.9987 2.36059 22C2.05028 22.0013 1.74278 21.9411 1.45583 21.823C1.16888 21.7049 0.908163 21.5311 0.688712 21.3117C0.469261 21.0923 0.29542 20.8316 0.177218 20.5447C0.059016 20.2577 -0.00120848 19.9502 1.83738e-05 19.6399C0.00124523 19.3296 0.0638992 19.0226 0.184366 18.7366C0.304833 18.4506 0.48073 18.1913 0.701909 17.9737L7.58958 11.0859C7.5987 11.0768 7.60594 11.066 7.61088 11.0541C7.61581 11.0422 7.61835 11.0294 7.61835 11.0165C7.61835 11.0037 7.61581 10.9909 7.61088 10.979C7.60594 10.9671 7.5987 10.9563 7.58958 10.9472L0.701909 4.0594C0.266937 3.61738 0.0242452 3.02139 0.0266969 2.40125C0.0291487 1.7811 0.276546 1.18705 0.714999 0.748482C1.15345 0.309918 1.74744 0.0623762 2.36757 0.0597782C2.98771 0.0571802 3.58374 0.299736 4.02586 0.734611L10.9135 7.6224C10.9226 7.63152 10.9334 7.63876 10.9453 7.6437C10.9572 7.64864 10.97 7.65118 10.9829 7.65118C10.9958 7.65118 11.0085 7.64864 11.0204 7.6437C11.0323 7.63876 11.0431 7.63152 11.0522 7.6224L17.9399 0.734611L17.9415 0.735395Z",
                        fill: "white"
                    })
                }),
                showModal && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    onMouseLeave: ()=>{
                        setShowModal(false);
                        setShowPen(true);
                    },
                    className: " absolute bottom-[70px] right-0 flex flex-col min-w-[200px] gap-[15px] bg-[#EDFAFF] px-[25px] py-[19px] rounded-[20px] notifShadow  lsm:max-lg:bottom-[50px]",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                            className: "flex items-center gap-[20px]",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                        width: "16",
                                        height: "12",
                                        viewBox: "0 0 12 12",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                            d: "M6 6C7.6575 6 9 4.6575 9 3C9 1.3425 7.6575 0 6 0C4.3425 0 3 1.3425 3 3C3 4.6575 4.3425 6 6 6ZM6 7.5C3.9975 7.5 0 8.505 0 10.5V12H12V10.5C12 8.505 8.0025 7.5 6 7.5Z",
                                            fill: "#003163"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    children: "New chat"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                            className: "flex items-center gap-[20px]",
                            onClick: ()=>setShowBody("selectUsers"),
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                        width: "16",
                                        height: "12",
                                        viewBox: "0 0 16 12",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                            d: "M0 12V9.90001C0 9.47501 0.106182 9.08426 0.318545 8.72776C0.530909 8.37126 0.812606 8.09951 1.16364 7.91251C1.91515 7.52501 2.67879 7.23426 3.45455 7.04026C4.2303 6.84626 5.01818 6.74951 5.81818 6.75001C6.61818 6.75001 7.40606 6.84701 8.18182 7.04101C8.95758 7.23501 9.72121 7.52551 10.4727 7.91251C10.8242 8.10001 11.1062 8.37201 11.3185 8.72851C11.5309 9.08501 11.6368 9.47551 11.6364 9.90001V12H0ZM13.0909 12V9.75C13.0909 9.20001 12.9423 8.67176 12.6451 8.16526C12.3479 7.65876 11.9268 7.22451 11.3818 6.86251C12 6.93751 12.5818 7.06576 13.1273 7.24726C13.6727 7.42876 14.1818 7.65051 14.6545 7.91251C15.0909 8.16251 15.4242 8.44051 15.6545 8.74651C15.8848 9.05251 16 9.387 16 9.75V12H13.0909ZM5.81818 6.00001C5.01818 6.00001 4.33333 5.70626 3.76364 5.11876C3.19394 4.53126 2.90909 3.82501 2.90909 3.00001C2.90909 2.17502 3.19394 1.46877 3.76364 0.881268C4.33333 0.293769 5.01818 1.92305e-05 5.81818 1.92305e-05C6.61818 1.92305e-05 7.30303 0.293769 7.87273 0.881268C8.44242 1.46877 8.72727 2.17502 8.72727 3.00001C8.72727 3.82501 8.44242 4.53126 7.87273 5.11876C7.30303 5.70626 6.61818 6.00001 5.81818 6.00001ZM13.0909 3.00001C13.0909 3.82501 12.8061 4.53126 12.2364 5.11876C11.6667 5.70626 10.9818 6.00001 10.1818 6.00001C10.0485 6.00001 9.87879 5.98426 9.67273 5.95276C9.46667 5.92126 9.29697 5.88701 9.16364 5.85001C9.49091 5.45001 9.74255 5.00626 9.91855 4.51876C10.0945 4.03126 10.1823 3.52501 10.1818 3.00001C10.1818 2.47502 10.0941 1.96877 9.91855 1.48127C9.74303 0.993768 9.49139 0.550018 9.16364 0.150019C9.33333 0.087519 9.50303 0.0467693 9.67273 0.0277693C9.84242 0.00876935 10.0121 -0.000480769 10.1818 1.92305e-05C10.9818 1.92305e-05 11.6667 0.293769 12.2364 0.881268C12.8061 1.46877 13.0909 2.17502 13.0909 3.00001Z",
                                            fill: "#003163"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    children: "New group"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./components/Dashboard/Chat/group/SelectUsers.tsx


function SelectUsers({ user, setGroupUsers, groupUsers }) {
    const handleClick = (e)=>{
        setTimeout(()=>{
            if (e.target.checked) setGroupUsers([
                ...groupUsers,
                user.userId
            ]);
            else setGroupUsers(groupUsers.filter((id)=>id !== user.userId));
        }, 100);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
            htmlFor: user.username,
            className: "cursor-pointer flex items-center gap-[42px] py-[15px] hover:bg-[#D9D9D9] rounded-[10px] w-full pl-[10px]",
            onClick: handleClick,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    type: "checkbox",
                    value: user.username,
                    id: user.username,
                    className: "form-checkbox cursor-pointer h-[31px] w-[31px] text-gray-400 border-none rounded-[10px]"
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                    className: "flex items-center gap-[10px]",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(Avatar/* default */.Z, {
                            url: user.url,
                            status: false
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-[20px] font-[500] font-[Poppins] text-[#474A4B]",
                                    children: user.name
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-[15px] font-[500] font-[Poppins] text-[#A0A5A9]",
                                    children: user.username
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./components/Dashboard/Chat/group/SelectUsersBody.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 



function SelectUsersBody({ setShowBody, setGroupUsers, groupUsers }) {
    const { profiles, user } = (0,react_.useContext)(contextApi.contextdata);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: " flex gap-2 items-center  py-[27px] px-[25px]",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        onClick: ()=>{
                            setShowBody(null);
                            setGroupUsers([]);
                        },
                        className: "cursor-pointer",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                            width: "30",
                            height: "30",
                            viewBox: "0 0 30 30",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                d: "M16.0412 21.0012C15.5679 21.0017 15.1088 20.8393 14.7412 20.5412L9.64118 16.3312C9.44119 16.172 9.27967 15.9697 9.16866 15.7394C9.05765 15.5091 9 15.2568 9 15.0012C9 14.7455 9.05765 14.4932 9.16866 14.2629C9.27967 14.0327 9.44119 13.8304 9.64118 13.6712L14.7412 9.46117C15.0482 9.21516 15.4182 9.06035 15.8089 9.01438C16.1996 8.96842 16.5954 9.03314 16.9512 9.20117C17.2604 9.33745 17.5238 9.55984 17.71 9.84179C17.8961 10.1237 17.9972 10.4533 18.0012 10.7912V19.2112C17.9972 19.549 17.8961 19.8786 17.71 20.1606C17.5238 20.4425 17.2604 20.6649 16.9512 20.8012C16.6653 20.9312 16.3552 20.9993 16.0412 21.0012Z",
                                fill: "#00498A"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "text-[25px] font-[600] font-[Poppins] text-[#00498A] leading-6 cursor-pointer",
                        children: "Add Group Members"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "w-full px-[31px]",
                children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    type: "text",
                    className: "w-full h-[50px]  border-b-[1px] border-[#E5E5E5] border-opacity-50 px-[20px] text-[15px] font-[300] font-[Poppins] text-[#BDBFC3] outline-none",
                    placeholder: "Search for friends..."
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("form", {
                className: "max-h-[calc(100%-270px)] min-h-[calc(100%-270px)] overflow-y-scroll no-scrollbar px-[25px] py-[25px]",
                children: user && profiles?.map((profile)=>profile.userId !== user.id && /*#__PURE__*/ jsx_runtime_.jsx(SelectUsers, {
                        groupUsers: groupUsers,
                        setGroupUsers: setGroupUsers,
                        user: {
                            name: `${profile.firstName} ${profile.lastName}`,
                            username: `${profile.username}`,
                            url: "/userProfile.jpg",
                            userId: profile.userId
                        }
                    }))
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "  bg-[#025063] min-h-[70px] min-w-[70px] rounded-full absolute bottom-[54px] right-[50px] z-[100] flex justify-center items-center cursor-pointer",
                onClick: ()=>{
                    setShowBody("groupInfo");
                },
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "flex justify-center items-center relative",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                        fill: "#FFF",
                        viewBox: "0 0 24 24",
                        height: "40px",
                        width: "40px",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            fill: "none",
                            stroke: "#FFF",
                            d: "M6,12.4 L18,12.4 M12.6,7 L18,12.4 L12.6,17.8"
                        })
                    })
                })
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(9483);
;// CONCATENATED MODULE: ./components/Dashboard/Chat/group/GroupInfo.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 




function GroupInfo({ setShowBody, setGroupUsers, groupUsers }) {
    const [showTypeGroup, setShowTypeGroup] = (0,react_.useState)(false);
    const [showAnimationLoading, setShowAnimationLoading] = (0,react_.useState)(false);
    const [GroupName, setGroupName] = (0,react_.useState)("");
    const [groupType, setGroupType] = (0,react_.useState)("Group Type");
    const [showError, setShowError] = (0,react_.useState)(null);
    const [protectedPassword, setProtectedPassword] = (0,react_.useState)("");
    const [accessPassword, setAccessPassword] = (0,react_.useState)("");
    const router = (0,navigation.useRouter)();
    const { user, socket } = (0,react_.useContext)(contextApi.contextdata);
    const createGroup = ()=>{
        if (GroupName === "") {
            setShowError("badGroupName");
            return;
        }
        if (groupType === "Group Type") {
            setShowError("badTypeGroup");
            return;
        }
        if (groupType === "protected" && protectedPassword === "") {
            setShowError("badTypeGroup");
            return;
        }
        setShowAnimationLoading(true);
        setTimeout(()=>{
            setShowBody(null);
            setShowAnimationLoading(false);
            setGroupType("Group Type");
            setShowError(null);
            setGroupName("");
            setGroupUsers([]);
            const payload = {
                groupName: GroupName,
                groupType: groupType,
                groupUsers: groupUsers,
                accessPassword: accessPassword,
                protectedPassword: protectedPassword,
                username: user?.username
            };
            socket.emit("create-group", payload);
            router.push(`/Chat`);
        }, 1000);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col  overflow-y-scroll  max-h-[calc(100%-270px)] min-h-[calc(100%-135px)] ",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: " flex gap-2 items-center  py-[27px] px-[25px]",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        onClick: ()=>{
                            setShowBody("selectUsers");
                            setGroupUsers([]);
                        },
                        className: "cursor-pointer",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                            width: "30",
                            height: "30",
                            viewBox: "0 0 30 30",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                d: "M16.0412 21.0012C15.5679 21.0017 15.1088 20.8393 14.7412 20.5412L9.64118 16.3312C9.44119 16.172 9.27967 15.9697 9.16866 15.7394C9.05765 15.5091 9 15.2568 9 15.0012C9 14.7455 9.05765 14.4932 9.16866 14.2629C9.27967 14.0327 9.44119 13.8304 9.64118 13.6712L14.7412 9.46117C15.0482 9.21516 15.4182 9.06035 15.8089 9.01438C16.1996 8.96842 16.5954 9.03314 16.9512 9.20117C17.2604 9.33745 17.5238 9.55984 17.71 9.84179C17.8961 10.1237 17.9972 10.4533 18.0012 10.7912V19.2112C17.9972 19.549 17.8961 19.8786 17.71 20.1606C17.5238 20.4425 17.2604 20.6649 16.9512 20.8012C16.6653 20.9312 16.3552 20.9993 16.0412 21.0012Z",
                                fill: "#00498A"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "text-[25px] font-[600] font-[Poppins] text-[#00498A] leading-6 cursor-pointer",
                        children: "New Group"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "w-full py-[95px] flex justify-center items-center",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "w-[200px] h-[200px] rounded-full border-[1px] border-[#E5E5E5] border-opacity-50 relative  flex flex-col justify-center items-center gap-[10px] cursor-pointer ",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: "/groupAvatar.jpg",
                            alt: "",
                            className: "z-[0] w-full h-full rounded-full object-cover opacity-[0.8] absolute top-[0px] left-[0px]"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                            width: "61",
                            height: "61",
                            viewBox: "0 0 61 61",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            className: "z-[1]",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                d: "M51.5595 8.71428C52.7993 8.71428 54.0269 8.95847 55.1722 9.4329C56.3176 9.90733 57.3583 10.6027 58.2349 11.4793C59.1116 12.356 59.807 13.3967 60.2814 14.542C60.7558 15.6874 61 16.915 61 18.1548V51.5595C61 52.7993 60.7558 54.0269 60.2814 55.1722C59.807 56.3176 59.1116 57.3583 58.2349 58.2349C57.3583 59.1116 56.3176 59.807 55.1722 60.2814C54.0269 60.7558 52.7993 61 51.5595 61H18.1548C16.915 61 15.6874 60.7558 14.542 60.2814C13.3967 59.807 12.356 59.1116 11.4793 58.2349C10.6027 57.3583 9.90733 56.3176 9.4329 55.1722C8.95847 54.0269 8.71428 52.7993 8.71428 51.5595V33.4106C10.0911 33.9857 11.5522 34.3982 13.0714 34.6364V51.5595C13.0714 52.1637 13.176 52.7447 13.3706 53.285L30.285 36.7249C31.4445 35.5898 32.9848 34.9266 34.6062 34.8643C36.2277 34.802 37.8143 35.3451 39.0574 36.388L39.4292 36.7249L56.3408 53.2879C56.5354 52.7476 56.6429 52.1666 56.6429 51.5595V18.1548C56.6429 16.8066 56.1073 15.5136 55.154 14.5603C54.2007 13.607 52.9077 13.0714 51.5595 13.0714H34.6364C34.4052 11.5749 33.9936 10.1119 33.4106 8.71428H51.5595ZM33.5761 39.6326L33.3321 39.8359L16.4642 56.3553C16.9929 56.5412 17.5622 56.6429 18.1548 56.6429H51.5595C52.1492 56.6429 52.7185 56.5412 53.2443 56.3553L36.3821 39.8388C36.0143 39.4783 35.5306 39.2597 35.0169 39.222C34.5032 39.1842 33.9928 39.3297 33.5761 39.6326ZM44.3034 18.881C46.0383 18.881 47.7022 19.5701 48.929 20.7969C50.1558 22.0237 50.8449 23.6876 50.8449 25.4225C50.8449 27.1574 50.1558 28.8213 48.929 30.048C47.7022 31.2748 46.0383 31.964 44.3034 31.964C42.5685 31.964 40.9046 31.2748 39.6779 30.048C38.4511 28.8213 37.7619 27.1574 37.7619 25.4225C37.7619 23.6876 38.4511 22.0237 39.6779 20.7969C40.9046 19.5701 42.5685 18.881 44.3034 18.881ZM15.9762 0C18.0742 -3.1263e-08 20.1517 0.413236 22.09 1.21611C24.0283 2.01899 25.7895 3.19579 27.2731 4.67932C28.7566 6.16284 29.9334 7.92405 30.7363 9.86237C31.5391 11.8007 31.9524 13.8782 31.9524 15.9762C31.9524 18.0742 31.5391 20.1517 30.7363 22.09C29.9334 24.0283 28.7566 25.7895 27.2731 27.2731C25.7895 28.7566 24.0283 29.9334 22.09 30.7363C20.1517 31.5391 18.0742 31.9524 15.9762 31.9524C11.739 31.9524 7.67543 30.2692 4.67932 27.2731C1.6832 24.2769 0 20.2133 0 15.9762C0 11.739 1.6832 7.67543 4.67932 4.67932C7.67543 1.6832 11.739 6.31384e-08 15.9762 0ZM44.3034 23.2381C44.0166 23.2381 43.7325 23.2946 43.4675 23.4044C43.2025 23.5141 42.9617 23.675 42.7588 23.8779C42.556 24.0807 42.3951 24.3215 42.2853 24.5865C42.1755 24.8516 42.119 25.1356 42.119 25.4225C42.119 25.7093 42.1755 25.9934 42.2853 26.2584C42.3951 26.5234 42.556 26.7642 42.7588 26.9671C42.9617 27.1699 43.2025 27.3308 43.4675 27.4406C43.7325 27.5504 44.0166 27.6069 44.3034 27.6069C44.8828 27.6069 45.4384 27.3767 45.848 26.9671C46.2577 26.5574 46.4878 26.0018 46.4878 25.4225C46.4878 24.8431 46.2577 24.2875 45.848 23.8779C45.4384 23.4682 44.8828 23.2381 44.3034 23.2381ZM15.9762 5.80952L15.7148 5.82986C15.4246 5.88287 15.1574 6.023 14.9488 6.2316C14.7402 6.4402 14.6001 6.70737 14.547 6.99757L14.5238 7.2619V14.5238H7.25609L6.99467 14.547C6.70447 14.6001 6.43729 14.7402 6.2287 14.9488C6.0201 15.1574 5.87997 15.4246 5.82695 15.7148L5.80371 15.9762L5.82695 16.2376C5.87997 16.5278 6.0201 16.795 6.2287 17.0036C6.43729 17.2122 6.70447 17.3523 6.99467 17.4053L7.25609 17.4286H14.5238V24.6992L14.547 24.9606C14.6001 25.2508 14.7402 25.518 14.9488 25.7266C15.1574 25.9352 15.4246 26.0753 15.7148 26.1283L15.9762 26.1545L16.2376 26.1283C16.5278 26.0753 16.795 25.9352 17.0036 25.7266C17.2122 25.518 17.3523 25.2508 17.4053 24.9606L17.4286 24.6992V17.4286H24.705L24.9664 17.4053C25.2566 17.3523 25.5238 17.2122 25.7324 17.0036C25.941 16.795 26.0811 16.5278 26.1341 16.2376L26.1574 15.9762L26.1341 15.7148C26.0809 15.4242 25.9404 15.1567 25.7312 14.9481C25.5221 14.7394 25.2543 14.5995 24.9635 14.547L24.7021 14.5238H17.4286V7.2619L17.4053 7.00048C17.3528 6.70975 17.213 6.44194 17.0043 6.23278C16.7957 6.02362 16.5282 5.88306 16.2376 5.82986L15.9762 5.80952Z",
                                fill: "white"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "text-[16px] font-[400] font-[Poppins] text-[#FFF] leading-6 cursor-pointer z-[1]",
                            children: "Add group avatar"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            type: "file",
                            id: "img",
                            name: "img",
                            accept: ".jpg,.jpeg,.png,.gif",
                            className: "absolute top-[0px] left-[0px] w-full h-full opacity-0 cursor-pointer z-[1]"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                className: "min-h-[500px] px-[39px] flex flex-col gap-[30px] py-[25px]",
                children: [
                    showError === "badGroupName" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "GroupName",
                        className: " groupInfo flex items-center border-[1px] border-[#FF0000]  ",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "p-[19px] bg-[#F9FCFE] rounded-l-[11px]",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                    width: "16",
                                    height: "12",
                                    viewBox: "0 0 16 12",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        d: "M0 12V9.90001C0 9.47501 0.106182 9.08426 0.318545 8.72776C0.530909 8.37126 0.812606 8.09951 1.16364 7.91251C1.91515 7.52501 2.67879 7.23426 3.45455 7.04026C4.2303 6.84626 5.01818 6.74951 5.81818 6.75001C6.61818 6.75001 7.40606 6.84701 8.18182 7.04101C8.95758 7.23501 9.72121 7.52551 10.4727 7.91251C10.8242 8.10001 11.1062 8.37201 11.3185 8.72851C11.5309 9.08501 11.6368 9.47551 11.6364 9.90001V12H0ZM13.0909 12V9.75C13.0909 9.20001 12.9423 8.67176 12.6451 8.16526C12.3479 7.65876 11.9268 7.22451 11.3818 6.86251C12 6.93751 12.5818 7.06576 13.1273 7.24726C13.6727 7.42876 14.1818 7.65051 14.6545 7.91251C15.0909 8.16251 15.4242 8.44051 15.6545 8.74651C15.8848 9.05251 16 9.387 16 9.75V12H13.0909ZM5.81818 6.00001C5.01818 6.00001 4.33333 5.70626 3.76364 5.11876C3.19394 4.53126 2.90909 3.82501 2.90909 3.00001C2.90909 2.17502 3.19394 1.46877 3.76364 0.881268C4.33333 0.293769 5.01818 1.92305e-05 5.81818 1.92305e-05C6.61818 1.92305e-05 7.30303 0.293769 7.87273 0.881268C8.44242 1.46877 8.72727 2.17502 8.72727 3.00001C8.72727 3.82501 8.44242 4.53126 7.87273 5.11876C7.30303 5.70626 6.61818 6.00001 5.81818 6.00001ZM13.0909 3.00001C13.0909 3.82501 12.8061 4.53126 12.2364 5.11876C11.6667 5.70626 10.9818 6.00001 10.1818 6.00001C10.0485 6.00001 9.87879 5.98426 9.67273 5.95276C9.46667 5.92126 9.29697 5.88701 9.16364 5.85001C9.49091 5.45001 9.74255 5.00626 9.91855 4.51876C10.0945 4.03126 10.1823 3.52501 10.1818 3.00001C10.1818 2.47502 10.0941 1.96877 9.91855 1.48127C9.74303 0.993768 9.49139 0.550018 9.16364 0.150019C9.33333 0.087519 9.50303 0.0467693 9.67273 0.0277693C9.84242 0.00876935 10.0121 -0.000480769 10.1818 1.92305e-05C10.9818 1.92305e-05 11.6667 0.293769 12.2364 0.881268C12.8061 1.46877 13.0909 2.17502 13.0909 3.00001Z",
                                        fill: "#04427A"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                id: "GroupName",
                                type: "text",
                                autoFocus: true,
                                className: "w-[calc(100%-54px)] h-[50px]  bg-[#F9FCFE] pr-[20px] text-[15px] font-[300] font-[Poppins] text-[#A5BFD6] outline-none rounded-r-[11px]",
                                placeholder: "Group Name",
                                onChange: (e)=>setGroupName(e.target.value)
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "GroupName",
                        className: " groupInfo flex items-center ",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "p-[19px] bg-[#F9FCFE] rounded-l-[11px]",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                    width: "16",
                                    height: "12",
                                    viewBox: "0 0 16 12",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        d: "M0 12V9.90001C0 9.47501 0.106182 9.08426 0.318545 8.72776C0.530909 8.37126 0.812606 8.09951 1.16364 7.91251C1.91515 7.52501 2.67879 7.23426 3.45455 7.04026C4.2303 6.84626 5.01818 6.74951 5.81818 6.75001C6.61818 6.75001 7.40606 6.84701 8.18182 7.04101C8.95758 7.23501 9.72121 7.52551 10.4727 7.91251C10.8242 8.10001 11.1062 8.37201 11.3185 8.72851C11.5309 9.08501 11.6368 9.47551 11.6364 9.90001V12H0ZM13.0909 12V9.75C13.0909 9.20001 12.9423 8.67176 12.6451 8.16526C12.3479 7.65876 11.9268 7.22451 11.3818 6.86251C12 6.93751 12.5818 7.06576 13.1273 7.24726C13.6727 7.42876 14.1818 7.65051 14.6545 7.91251C15.0909 8.16251 15.4242 8.44051 15.6545 8.74651C15.8848 9.05251 16 9.387 16 9.75V12H13.0909ZM5.81818 6.00001C5.01818 6.00001 4.33333 5.70626 3.76364 5.11876C3.19394 4.53126 2.90909 3.82501 2.90909 3.00001C2.90909 2.17502 3.19394 1.46877 3.76364 0.881268C4.33333 0.293769 5.01818 1.92305e-05 5.81818 1.92305e-05C6.61818 1.92305e-05 7.30303 0.293769 7.87273 0.881268C8.44242 1.46877 8.72727 2.17502 8.72727 3.00001C8.72727 3.82501 8.44242 4.53126 7.87273 5.11876C7.30303 5.70626 6.61818 6.00001 5.81818 6.00001ZM13.0909 3.00001C13.0909 3.82501 12.8061 4.53126 12.2364 5.11876C11.6667 5.70626 10.9818 6.00001 10.1818 6.00001C10.0485 6.00001 9.87879 5.98426 9.67273 5.95276C9.46667 5.92126 9.29697 5.88701 9.16364 5.85001C9.49091 5.45001 9.74255 5.00626 9.91855 4.51876C10.0945 4.03126 10.1823 3.52501 10.1818 3.00001C10.1818 2.47502 10.0941 1.96877 9.91855 1.48127C9.74303 0.993768 9.49139 0.550018 9.16364 0.150019C9.33333 0.087519 9.50303 0.0467693 9.67273 0.0277693C9.84242 0.00876935 10.0121 -0.000480769 10.1818 1.92305e-05C10.9818 1.92305e-05 11.6667 0.293769 12.2364 0.881268C12.8061 1.46877 13.0909 2.17502 13.0909 3.00001Z",
                                        fill: "#04427A"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                id: "GroupName",
                                type: "text",
                                autoFocus: true,
                                className: "w-[calc(100%-54px)] h-[50px]  bg-[#F9FCFE] pr-[20px] text-[15px] font-[300] font-[Poppins] text-[#A5BFD6] outline-none rounded-r-[11px]",
                                placeholder: "Group Name",
                                onChange: (e)=>setGroupName(e.target.value)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "typeGroup",
                        className: "flex items-center w-full rounded-[11px]  gap-[20px] groupInfo flex-col",
                        children: [
                            showError === "badTypeGroup" && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-[15px] font-[500] font-[Poppins] text-[#FF0000]",
                                children: "select group type"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                className: "w-full relative text-center py-[10px] px-[20px] bg-[#F9FCFE] cursor-pointer text-[15px] font-[500] font-[Poppins] text-[#9f9d9d]",
                                onClick: ()=>setShowTypeGroup(!showTypeGroup),
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                        children: groupType
                                    }),
                                    showTypeGroup && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "flex flex-col gap-[10px] absolute top-[0px] left-[0px] w-full bg-[#F9FCFE] rounded-[11px] py-[10px] px-[20px]",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "hover:text-[#00498A] cursor-pointer",
                                                onClick: ()=>setGroupType("public"),
                                                children: "public"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "hover:text-[#00498A] cursor-pointer",
                                                onClick: ()=>setGroupType("private"),
                                                children: "private"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "hover:text-[#00498A] cursor-pointer",
                                                onClick: ()=>setGroupType("protected"),
                                                children: "protected"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    groupType === "protected" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "protected",
                        className: "groupInfo flex flex-col gap-[10px] mt-[30px] ",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-[15px] font-[500] font-[Poppins] text-[#00539D]",
                                children: "Group password"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                onChange: (e)=>setProtectedPassword(e.target.value),
                                autoFocus: true,
                                type: "password",
                                id: "protected",
                                className: "w-full h-[50px]  px-[20px]   bg-[#F9FCFE] pr-[20px] text-[15px] font-[300] font-[Poppins] text-[#A5BFD6] outline-none rounded-[11px]",
                                placeholder: "Password"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "accessPass",
                        className: "groupInfo flex flex-col gap-[10px] mt-[30px] ",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                className: "text-[15px] font-[500] font-[Poppins] text-[#00539D] flex gap-[10px]",
                                children: [
                                    "Access password",
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "text-[13px] font-[300] font-[Poppins] text-[#A5BFD6]",
                                        children: "(optional)"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                onChange: (e)=>setAccessPassword(e.target.value),
                                type: "password",
                                id: "accessPass",
                                className: "w-full h-[50px]  px-[20px]   bg-[#F9FCFE] pr-[20px] text-[15px] font-[300] font-[Poppins] text-[#A5BFD6] outline-none rounded-[11px]",
                                placeholder: "Password"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                onClick: createGroup,
                className: "  bg-[#025063] min-h-[70px] min-w-[70px] rounded-full absolute bottom-[54px] right-[50px] z-[10] flex justify-center items-center cursor-pointer",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "flex justify-center items-center relative",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                        fill: "#FFF",
                        viewBox: "0 0 24 24",
                        height: "40px",
                        width: "40px",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            fill: "none",
                            stroke: "#FFF",
                            d: "M6,12.4 L18,12.4 M12.6,7 L18,12.4 L12.6,17.8"
                        })
                    })
                })
            }),
            showAnimationLoading && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "Animation Loading min-w-full min-h-full  z-[20] absolute top-[0px] left-[0px] flex justify-center items-center bg-[#000000] bg-opacity-[0.1]",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                    className: "animate-spin ",
                    strokeWidth: "2",
                    stroke: "#F9FCFE",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    height: "55px",
                    width: "55px",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            stroke: "none",
                            d: "M0 0h24v24H0z",
                            fill: "none"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            d: "M12 6l0 -3"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            d: "M16.25 7.75l2.15 -2.15"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            d: "M18 12l3 0"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            d: "M16.25 16.25l2.15 2.15"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            d: "M12 18l0 3"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            d: "M7.75 16.25l-2.15 2.15"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            d: "M6 12l-3 0"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            d: "M7.75 7.75l-2.15 -2.15"
                        })
                    ]
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/Dashboard/Chat/search/Search.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 



function Search({ setShowBody }) {
    const { user, profiles, channels, socket } = (0,react_.useContext)(contextApi.contextdata);
    const router = (0,navigation.useRouter)();
    const showUsers = profiles?.filter((ur)=>{
        return ur.username === user?.username ? false : true;
    });
    const handelClick = (id)=>{
        router.push(`/Chat/me/${id}`);
        setShowBody(null);
    };
    const handelClickChannel = (id)=>{
        socket?.emit("joinGroup", {
            groupId: id,
            userId: user?.id
        });
        setShowBody(null);
        router.push(`/Chat/g/${id}`);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col  overflow-y-scroll  max-h-[calc(100%-270px)] min-h-[calc(100%-135px)] no-scrollbar",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: " flex gap-2 items-center  py-[27px] px-[25px]",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        onClick: ()=>setShowBody(null),
                        className: "cursor-pointer",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                            width: "30",
                            height: "30",
                            viewBox: "0 0 30 30",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                d: "M16.0412 21.0012C15.5679 21.0017 15.1088 20.8393 14.7412 20.5412L9.64118 16.3312C9.44119 16.172 9.27967 15.9697 9.16866 15.7394C9.05765 15.5091 9 15.2568 9 15.0012C9 14.7455 9.05765 14.4932 9.16866 14.2629C9.27967 14.0327 9.44119 13.8304 9.64118 13.6712L14.7412 9.46117C15.0482 9.21516 15.4182 9.06035 15.8089 9.01438C16.1996 8.96842 16.5954 9.03314 16.9512 9.20117C17.2604 9.33745 17.5238 9.55984 17.71 9.84179C17.8961 10.1237 17.9972 10.4533 18.0012 10.7912V19.2112C17.9972 19.549 17.8961 19.8786 17.71 20.1606C17.5238 20.4425 17.2604 20.6649 16.9512 20.8012C16.6653 20.9312 16.3552 20.9993 16.0412 21.0012Z",
                                fill: "#00498A"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "text-[25px] font-[600] font-[Poppins] text-[#00498A] leading-6 cursor-pointer",
                        children: "Search"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "w-full px-[25px] py-[25px] flex  items-center  border-[#E5E5E5] gap-[10px]",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                            width: "21",
                            height: "20",
                            viewBox: "0 0 21 20",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M9.32 17C13.915 17 17.64 13.4183 17.64 9C17.64 4.58172 13.915 1 9.32 1C4.72499 1 1 4.58172 1 9C1 13.4183 4.72499 17 9.32 17Z",
                                    stroke: "#898F94",
                                    strokeWidth: "2"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M19.7193 18.9984L15.1953 14.6484",
                                    stroke: "#898F94",
                                    strokeWidth: "2"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                        type: "text",
                        placeholder: "Search",
                        className: "w-[calc(100%-50px)] text-[16px] font-[400] font-[Poppins] text-[#898F94] focus:outline-none border-b-2"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "w-full px-[25px] py-[25px] flex flex-col gap-[10px] max-h-[calc(100%-270px)] min-h-[calc(100%-135px)]",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex flex-col gap-[20px]",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-[20px] font-[500] font-[Poppins] text-[#DEDEDE]",
                                children: "Users"
                            }),
                            showUsers?.map((ur)=>{
                                return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex items-center gap-[10px] cursor-pointer",
                                    onClick: ()=>handelClick(ur.userId),
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                            src: "/userProfile.jpg",
                                            alt: "",
                                            className: "max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] rounded-full object-cover border-[3px] border-[#064A85] border-opacity-25"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: "text-[20px] font-[300] font-[Poppins] text-[#034B8A] leading-6  max-w-[400px] truncate",
                                                    children: `${ur.firstName} ${ur.lastName}`
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: ur.status === "online" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        className: "text-[#6BB279]",
                                                        children: "Online"
                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        className: "text-[#898F94]",
                                                        children: "Offline"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }, ur.userId);
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex flex-col gap-[20px]",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-[20px] font-[500] font-[Poppins] text-[#DEDEDE]",
                                children: "Groups"
                            }),
                            channels?.map((channel)=>{
                                return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex items-center gap-[10px] cursor-pointer",
                                    onClick: ()=>handelClickChannel(channel.id),
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                            src: "/groupAvatar.jpg",
                                            alt: "",
                                            className: "max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] rounded-full object-cover border-[3px] border-[#064A85] border-opacity-25"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: "text-[20px] font-[300] font-[Poppins] text-[#034B8A] leading-6  max-w-[400px] truncate",
                                                    children: channel.name
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-[#898F94]",
                                                    children: channel.type
                                                })
                                            ]
                                        })
                                    ]
                                }, channel.id);
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./utils/axiosInstance.tsx
var axiosInstance = __webpack_require__(954);
;// CONCATENATED MODULE: ./components/Dashboard/Chat/LeftSide/LeftSide.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 











function LeftSide() {
    const [showBody, setShowBody] = (0,react_.useState)(null);
    const [groupUsers, setGroupUsers] = (0,react_.useState)([]);
    const [refresh, setRefresh] = (0,react_.useState)("");
    const { user, setUsers, setProfiles, setMessages, socket, setMyChannels, setChannels } = (0,react_.useContext)(contextApi.contextdata);
    (0,react_.useEffect)(()=>{
        if (!socket) return;
        socket.on("refresh", (payload)=>{
            setRefresh(new Date().getTime().toString());
        });
    }, [
        socket
    ]);
    (0,react_.useEffect)(()=>{
        if (!user) {
            return;
        }
        async function getUsers() {
            try {
                const resp = await axiosInstance/* default */.Z.get(`http://${"10.13.2.5"}:3000/api/user/all`);
                if (resp.data === null) {
                    return;
                }
                setUsers(resp.data);
            } catch (error) {
                console.log("get : users ", error);
                return;
            }
        }
        async function getProfiles() {
            try {
                const resp = await axiosInstance/* default */.Z.get(`http://${"10.13.2.5"}:3000/api/user/profiles`);
                if (resp.data === null) {
                    return;
                }
                setProfiles(resp.data);
            } catch (error) {
                console.log("get : profiles ", error);
                return;
            }
        }
        async function getMessages() {
            try {
                const resp = await axiosInstance/* default */.Z.get(`http://${"10.13.2.5"}:3000/api/chat/messages/${user?.id}`);
                if (resp.data === null) {
                    return;
                }
                resp.data.sort((a, b)=>{
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                });
                setMessages(resp.data);
            } catch (error) {
                console.log("get : messages ", error);
                return;
            }
        }
        async function getMyChannels() {
            try {
                const resp = await axiosInstance/* default */.Z.get(`http://${"10.13.2.5"}:3000/api/chat/myChannels/${user?.id}`);
                if (resp.data === null) {
                    return;
                }
                setMyChannels(resp.data);
            } catch (error) {
                console.log("error : getChannels ", error);
                return;
            }
        }
        async function getChannels() {
            try {
                const resp = await axiosInstance/* default */.Z.get(`http://${"10.13.2.5"}:3000/api/chat/channels`);
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
    }, [
        refresh,
        user
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "chat__left w-[450px]  bg-[#FFF] border-r-[1px] relative overflow-hidden lg:max-xl:w-[350px] lsm:max-lg:w-full",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "chat__left__head flex justify-between items-center border-b-[1px]  border-[#E5E5E5] pl-[42px] pr-[25px] lsm:max-lg:px-[10px]",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex items-center gap-[10px] py-[35px]",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: "/userProfile.jpg",
                                    alt: "",
                                    className: "max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] rounded-full object-cover border-[3px] border-[#064A85] border-opacity-25"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "text-[20px] font-[200] font-[Poppins] text-[#BDBFC3] leading-6",
                                    children: [
                                        "Hello , ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "text-[20px] font-[500] font-[Poppins] text-[#034B8A]",
                                            children: user?.username
                                        })
                                    ]
                                })
                            ]
                        }),
                        !showBody && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "z-[10] bg-[#EDFAFF]  cursor-pointer w-[54px] h-[54px] notifShadow flex justify-center items-center rounded-[20px] ",
                            onClick: ()=>{
                                setShowBody("search");
                            },
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                width: "21",
                                height: "20",
                                viewBox: "0 0 21 20",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        d: "M9.32 17C13.915 17 17.64 13.4183 17.64 9C17.64 4.58172 13.915 1 9.32 1C4.72499 1 1 4.58172 1 9C1 13.4183 4.72499 17 9.32 17Z",
                                        stroke: "#898F94",
                                        strokeWidth: "2"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        d: "M19.7193 18.9984L15.1953 14.6484",
                                        stroke: "#898F94",
                                        strokeWidth: "2"
                                    })
                                ]
                            })
                        })
                    ]
                }),
                !showBody && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(UsersOnline, {}),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            id: "scroll",
                            className: "max-h-[calc(100%-299px)] overflow-y-scroll no-scrollbar h-[calc(100%-299px)] px-[25px] py-[25px] flex flex-col gap-[25px]",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(GroupsChannels, {}),
                                /*#__PURE__*/ jsx_runtime_.jsx(UsersDm, {})
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(NewModal, {
                            setShowBody: setShowBody
                        })
                    ]
                }),
                showBody === "newChat",
                showBody === "selectUsers" && /*#__PURE__*/ jsx_runtime_.jsx(SelectUsersBody, {
                    setShowBody: setShowBody,
                    setGroupUsers: setGroupUsers,
                    groupUsers: groupUsers
                }),
                showBody === "groupInfo" && /*#__PURE__*/ jsx_runtime_.jsx(GroupInfo, {
                    setShowBody: setShowBody,
                    setGroupUsers: setGroupUsers,
                    groupUsers: groupUsers
                }),
                showBody === "search" && /*#__PURE__*/ jsx_runtime_.jsx(Search, {
                    setShowBody: setShowBody
                })
            ]
        })
    });
}

// EXTERNAL MODULE: ./components/Dashboard/Dashboard/Dashboard.tsx
var Dashboard = __webpack_require__(5088);
// EXTERNAL MODULE: ./utils/localStorage.tsx
var localStorage = __webpack_require__(1392);
;// CONCATENATED MODULE: ./app/Chat/Notif.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

function Notif({ message, type }) {
    const toastRef = (0,react_.useRef)(null);
    const handleClose = ()=>{
        clearTimeout(close);
        toastRef.current?.remove();
    };
    const close = setTimeout(()=>{
        handleClose();
    }, 5000);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            ref: toastRef,
            id: "toast-danger",
            className: " flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800",
            role: "alert",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                        className: "w-5 h-5",
                        "aria-hidden": "true",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "ml-3 text-sm font-normal",
                    children: message
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: handleClose,
                    type: "button",
                    className: "ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
                    "data-dismiss-target": "#toast-danger",
                    "aria-label": "Close",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                        className: "w-3 h-3",
                        "aria-hidden": "true",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 14 14",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            stroke: "currentColor",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        })
                    })
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./app/Chat/layout.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 










function ChatLayout({ children }) {
    const router = (0,navigation.useRouter)();
    const [isloading, setIsLoading] = (0,react_.useState)(true);
    const { socket } = (0,react_.useContext)(contextApi.contextdata);
    const [notifs, setNotifs] = (0,react_.useState)([]);
    (0,react_.useEffect)(()=>{
        const token = (0,localStorage/* getLocalStorageItem */.le)("Token");
        if (!token) {
            router.push("/login");
            return;
        }
        setIsLoading(false);
    }, []);
    (0,react_.useEffect)(()=>{
        if (!socket) return;
        socket.on("errorNotif", (payload)=>{
            setNotifs((notifs)=>[
                    ...notifs,
                    {
                        message: payload.message,
                        time: payload.time
                    }
                ]);
        });
        return ()=>{
            socket.off("errorNotif");
        };
    }, [
        socket
    ]);
    notifs?.sort((a, b)=>{
        return b.time - a.time;
    });
    if (isloading) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            children: "Loading..."
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((noop_head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Chat"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Chat"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "absolute top-5 right-2 max-h-[230px] overflow-hidden z-[2000]",
                children: notifs.map((notif, index)=>/*#__PURE__*/ jsx_runtime_.jsx(Notif, {
                        message: notif.message
                    }, index))
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "h-[100vh] w-[100vw] flex  pl-[150px] bg-[#FAFDFF] lsm:max-lg:overflow-x-hidden lsm:max-lg:pl-[100px]",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Dashboard["default"], {
                        path: "Chat"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(LeftSide, {}),
                    children
                ]
            })
        ]
    });
}


/***/ }),

/***/ 9878:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Avatar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Avatar({ url, status }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-w-[64px] max-w-[64px] min-h-[64px] max-h-[64px] rounded-full object-cover relative",
        children: [
            status && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "absolute top-0 right-0 w-[16px] h-[16px] rounded-full bg-[#70CF98] border-[3px] border-[#fff] "
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: url,
                alt: "",
                className: "w-[64px] h-[64px] rounded-full object-cover"
            })
        ]
    });
}


/***/ }),

/***/ 7601:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1313);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/asabbar/Desktop/ft_git/front-end/app/Chat/layout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 1338:
/***/ (() => {



/***/ })

};
;