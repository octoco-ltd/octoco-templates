import { useState, useEffect } from 'react';
import useUserAgent from './useUserAgent';

interface IBeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export function useAddToHomeScreenPrompt(): [
    IBeforeInstallPromptEvent | null,
    () => void
] {
    const { isIOS, isAndroid } = useUserAgent();

    /*
    ##############################################################################
    Android
    ##############################################################################
    */
    const [prompt, setState] = useState<IBeforeInstallPromptEvent | null>(
        null
    );

    const promptToInstall = () => {
        if (prompt) {
            return prompt.prompt();
        }
        return Promise.reject(
            new Error(
                'Tried installing before browser sent "beforeinstallprompt" event'
            )
        );
    };

    useEffect(() => {
        if (!isAndroid) return;
        const ready = (e: IBeforeInstallPromptEvent) => {
            e.preventDefault();
            setState(e);
        };

        window.addEventListener('beforeinstallprompt', ready as any);

        return () => {
            window.removeEventListener('beforeinstallprompt', ready as any);
        };
    }, [isAndroid]);

    /*
    ##############################################################################
    IOS
    ##############################################################################
    */

    return [prompt, promptToInstall];
}