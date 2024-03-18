import React from 'react'

import { TbShare2 } from 'react-icons/tb'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { ImArrowDown } from 'react-icons/im'
import { Box, Typography, useTheme } from '@mui/material'
import Logo from '../LogoSign'
import BaseMessage from './BaseMessage'

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToIosSafari(props: Props) {
    const { closePrompt, doNotShowAgain } = props;
    // const theme = useTheme();

    return (
        <BaseMessage>
            <div>
                <p>Click the <TbShare2 /> icon</p>
            </div>
            <div>
                <p>Scroll down and then click:</p>
                <div>
                    <p>Add to Home Screen <AiOutlinePlusSquare /></p>
                </div>
            </div>
        </BaseMessage>
    )
}
