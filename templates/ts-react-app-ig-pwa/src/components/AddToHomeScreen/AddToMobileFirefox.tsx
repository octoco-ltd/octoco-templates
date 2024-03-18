import React from 'react'

import { FaTimes } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { ImArrowDownRight } from 'react-icons/im'
import BaseMessage from './BaseMessage';
// import ffIcon from 'src/assets/images/firefox-icon.png'

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToMobileFirefox(props: Props) {
    const { closePrompt, doNotShowAgain } = props;

    return (
        <BaseMessage>
            <div >
                <p>Click the  <HiDotsVertical />icon</p>
            </div>
            <div >
                <p>Scroll down and then click:</p>
                <div>
                    <div>
                        {/* <img src={ffIcon} alt="Firefox install icon" width={32} height={32} /> */}
                        <p>Install</p>
                    </div>
                </div>
            </div>
        </BaseMessage >
    )
}
