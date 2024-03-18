import React from 'react'

import { AiOutlinePlusSquare } from 'react-icons/ai'
import { FaTimes, FaBars } from 'react-icons/fa'
import { ImArrowDown } from 'react-icons/im'
import { FiShare } from 'react-icons/fi'
import { TfiPlus } from 'react-icons/tfi'
import BaseMessage from './BaseMessage'

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToSamsung(props: Props) {
    const { closePrompt, doNotShowAgain } = props;

    return (
        <BaseMessage>
            <div>
                <p>Click the <FaBars className="text-4xl" /> icon</p>
            </div>
            <div>
                <p>Scroll down and then click:</p>
                <div>
                    <p><TfiPlus className="text-2xl" /> Add page to</p>
                </div>
            </div>
            <div>
                <p>Then select:</p>
                <div>
                    <p>Home screen</p>
                </div>
            </div>
        </BaseMessage >
    )
}
