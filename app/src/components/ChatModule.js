import React from 'react'
import {
    FlexContainer,
    MessageList,
    ChatForm,
} from './'

const ChatModule = () => (
    <FlexContainer>
        <MessageList style={{ flex: 0.5 }} />
        <ChatForm style={{ flex: 0.5 }} />
    </FlexContainer>
)

export default ChatModule