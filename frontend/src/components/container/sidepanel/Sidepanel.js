import defaultimg from '../utils/default.png'
import React from 'react';


const Sidepanel = (props) => (
    <div id="conversation-list">
        
        <div className="conversation active">
            <img height="20px" width="40px" src={defaultimg} alt="" />
            <div className="title-text">
                {props.text}
            </div>
            <div className="created-date">
                Apr 16
            </div>
            <div className="conversation-message">
                This a message sggsa adasdadgrefd dsdwdw fd
            </div>
        </div>
        <div className="conversation active">
            <img height="20px" width="40px" src={defaultimg} alt="" />
            <div className="title-text">
                Defaut User agjgergg dsfadf dsafsf dsd ds
            </div>
            <div className="created-date">
                Apr 16
            </div>
            <div className="conversation-message">
                This a message sggsa adasdadgrefd dsdwdw fd
            </div>
        </div>
    </div>
)

export default Sidepanel;