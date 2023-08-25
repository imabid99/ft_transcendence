type Message = {
    fromId :    number,
    toId  :     number,
    content :   string,
    createdAt:  string,
  }

export const getLastMessage = (messages: Message[], userId: number) => {
    if (!messages || messages.length === 0) {
        return null;
    }
    const lastMessage = messages.filter((message: Message) => {
        return (message.fromId === userId || message.toId === userId)
    })
    return lastMessage[lastMessage.length - 1];
}

export const getLastMessageGroup = (messages: Message[]) => {
    if (!messages || messages.length === 0) {
        return null;
    }
    messages.sort((a: Message, b: Message) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    })

    return messages[messages.length - 1];
}