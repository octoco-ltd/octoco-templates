import React from 'react'

import { FaTimes } from 'react-icons/fa'
import BaseMessage from './BaseMessage';

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToOtherBrowser(props: Props) {
    const { closePrompt, doNotShowAgain } = props;
    const searchUrl = 'https://www.google.com/search?q=add+to+home+screen+for+common-mobile-browsers';

    return (
        <BaseMessage>
            <div>
                <p>Unfortunately, we were unable to determine which browser you are using. Please search for how to install a web app for your browser.</p>
                <a href={searchUrl} target='_blank' rel="noreferrer">Try This Search</a>
            </div>
        </BaseMessage >
    )
}