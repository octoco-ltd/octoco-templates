import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Typography, TypographyProps } from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';

/**
 * Props for the CopyText component.
 */
interface CopyTextProps {
    /**
     * The text to be copied to the clipboard.
     */
    children: string;
    textProps: TypographyProps
}

/**
 * A React component that wraps text, copies the text to the clipboard when clicked,
 * and adds a copy icon to the right.
 *
 * @param {CopyTextProps} props - The component props.
 */
const CopyText: React.FC<CopyTextProps> = ({ children, textProps }) => {
    const [copied, setCopied] = useState(false);
    const [copiedText, setCopiedText] = useState<string>('Copy Text');

    /**
     * Copies the provided text to the clipboard when the copy button is clicked.
     */
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(children);
            setCopied(true);
            setCopiedText('Copied!')
            setTimeout(() => {
                setCopied(false);
                setCopiedText('Copy Text');
            }, 1500);
        } catch (error) {
            console.error('Failed to copy text: ', error);
        }
    };

    return (

        <Typography {...textProps}>
            {children}
            <Tooltip title={copiedText} placement='top'>
                <IconButton
                    className="copy-icon"
                    onClick={copyToClipboard}
                    color={copied ? 'success' : 'primary'}
                >
                    <FileCopyIcon fontSize='small' />
                </IconButton>
            </Tooltip>
        </Typography>
    );
};

export default CopyText;
