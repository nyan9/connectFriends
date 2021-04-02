import React from 'react'
import moment from 'moment';
import {Comment, Tooltip, Avatar} from 'antd'
import {FaUserAstronaut} from 'react-icons/fa'

function ChatCard(props) {  
    return (
        <div style={{width: '100%', display: 'flex'}}>
            <FaUserAstronaut style={{position:'relative', top: '2px', marginRight:'3px', marginLeft:'2px', color:'lightblue'}}/>
            <Comment 
                author={<div style={{fontWeight: 'bold', display:'flex', fontSize: '18px',marginLeft: '1px', color:'lightblue', fontFamily: 'system-ui' }}>{props.sender.username}</div>}
                content={<p className='chat-content'>{props.message}</p>}
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