
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { TbShare2 } from 'react-icons/tb'
import BaseMessage from './BaseMessage'

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToMobileChromeIos(props: Props) {
    const { closePrompt, doNotShowAgain } = props;

    return (
        <BaseMessage>
            <div >
                <p>Click the <TbShare2 /> icon</p>
            </div>
            <div >
                <p>Scroll down and then click:</p>
                <div>
                    <p>Add to Home Screen <AiOutlinePlusSquare /></p>
                </div>
            </div>
        </BaseMessage >
    )
}