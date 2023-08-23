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
