export const getReceiverInfo = (users: any[], receiverId: any) => {
    if (!Array.isArray(users) || !receiverId) {
        return;
    }
    const receiverInfo = users.find((user: any) => user.id === receiverId);
    return receiverInfo;
}
