import React from 'react'
import moment from 'moment';
import {Comment, Tooltip, Avatar} from 'antd'

function ChatCard(props) {
    return (
        <div style={{width: '100%'}}>
            <Comment 
                author={props.sender.username}
                content={<p>{props.message}</p>}
                datetime={
                        <span style={{marginLeft: '5px'}}>({moment().fromNow()})</span>
                    
                }
            />
           {/* <div>{props.sender.username}</div>
           <div>{props.message}</div> */}
        </div>
    )
}

export default ChatCard