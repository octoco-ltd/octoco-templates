import React from 'react'

import { FaTimes } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { MdAddToHomeScreen } from 'react-icons/md'
import { ImArrowUp } from 'react-icons/im'
import BaseMessage from './BaseMessage'

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToMobileChrome(props: Props) {
    const { closePrompt, doNotShowAgain } = props;

    return (
        <BaseMessage>
            <div >
                <div >
                    <p>Click the <HiDotsVertical /> icon</p>
                </div>
                <div >
                    <p>Scroll down and then click:</p>
                    <div >
                        <MdAddToHomeScreen />
                        <p>Add to Home Screen</p>
                    </div>
                </div>
            </div>
        </BaseMessage >
    )
}
