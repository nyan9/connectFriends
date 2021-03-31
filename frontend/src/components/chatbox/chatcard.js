import React from 'react'
import moment from 'moment';
import {Comment, Tooltip, Avatar} from 'antd'

function ChatCard(props) {  
    return (
        <div style={{width: '100%', display: 'flex'}}>
            <Comment 
                author={<div style={{fontWeight: 'bold', display:'flex', fontSize: '17px',marginLeft: '1px' }}>{props.sender.username}</div>}
                content={<p style={{display:'flex', marginTop: '3px', fontSize: '15px', marginLeft: '4px'}}>{props.message}</p>}
                // datetime={
                //         <span style={{marginLeft: '5px'}}>({moment().fromNow()})</span>
                    
                // }
            />
           {/* <div>{props.sender.username}</div>
           <div>{props.message}</div> */}
        </div>
    )
}

export default ChatCard