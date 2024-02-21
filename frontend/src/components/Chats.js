import React from 'react';
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin } from '../config/ChatLogics';
import { ChatState } from './Context/ChatProvider';
import { Avatar, Tooltip } from '@chakra-ui/react';

const Chats = ({ messages }) => {
    const { user } = ChatState();

    return (
        <ScrollableFeed style={{ maxHeight: "calc(100% - 60px)", overflowY:"auto" }}>
            {messages && messages.map((m, i) => (
                <div key={m._id} style={{ display: 'flex', justifyContent: user._id === m.sender._id ? 'flex-end' : 'flex-start' }}>
                   
                   {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar mt="7px" mr={1} size="sm" cursor="pointer" name={m.sender.name} src={m.sender.pic}/>
              </Tooltip>
            )}
                    <div style={{
                        backgroundColor: user._id === m.sender._id ? '#DCF8C6' : '#FFFFFF',
                        borderRadius: '15px',
                        padding: '10px 15px',
                        maxWidth: '75%',
                        marginBottom: '10px',
                        marginLeft: isSameSenderMargin(messages, m, i, user._id),
                        marginTop: isSameSender(messages, m, i, user._id) ? 3 : 10,
                    }}>
                        {m.content}
                    </div>
                </div>
            ))}
        </ScrollableFeed>
    );
};

export default Chats;
