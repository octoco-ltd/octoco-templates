import React from 'react'

import { AiOutlinePlusSquare } from 'react-icons/ai'
import { FaTimes, FaBars } from 'react-icons/fa'
import { ImArrowDown } from 'react-icons/im'
import { FiShare } from 'react-icons/fi'
import BaseMessage from './BaseMessage'

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToMobileFirefoxIos(props: Props) {
    const { closePrompt, doNotShowAgain } = props;

    return (
        <BaseMessage>
            <div >
                <p>Click the <FaBars />icon</p>
            </div>
            <div >
                <p>Scroll down and then click:</p>
                <div >
                    <p>Share <FiShare /></p>
                </div>
            </div>
            <div>
                <p>Then click:</p>
                <div>
                    <p>Add to Home Screen <AiOutlinePlusSquare /></p>
                </div>
            </div>
        </BaseMessage >

    )
}
