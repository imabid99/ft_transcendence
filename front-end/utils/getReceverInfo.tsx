export const getReceiverInfo = (users: any[], receiverId: any) => {
    if (!Array.isArray(users) || !receiverId) {
        return;
    }
    const receiverInfo = users.find((user: any) => user.id === receiverId);
    
    console.log("users", users);
    console.log("receiverId", receiverId);
    console.log("receiverInfo", receiverInfo);
    return receiverInfo;
}
