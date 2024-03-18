import React, { useState, useEffect, lazy, FC, Suspense } from 'react';
import useUserAgent from 'src/hooks/useUserAgent';
import { BaseDrawer } from '../dialogs/BaseDrawer';
import { useAppZStore } from 'src/store/zStore';
import { BaseDialog } from '../dialogs/BaseDialog';
import SuspenseLoader from '../SuspenseLoader';
import AddToIosSafari from './AddToIosSafari';
import AddToMobileChrome from './AddToMobileChrome';
import AddToMobileChromeIos from './AddToMobileChromeIos';
import AddToMobileFirefox from './AddToMobileFirefox';
import AddToMobileFirefoxIos from './AddToMobileFirefoxIos';
import AddToOtherBrowser from './AddToOtherBrowser';
import AddToSamsung from './AddToSamsung';


const Loader = (Component: FC) => (props: any) =>
(
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
);

// const ModuleLoading = () => <p className="animate-bounce text-white font-bold">Loading...</p>;
// const AddToIosSafari = lazy(() => import('./AddToIosSafari'));
// const AddToMobileChrome = lazy(() => import('./AddToMobileChrome'));
// const AddToMobileFirefox = lazy(() => import('./AddToMobileFirefox'));
// const AddToMobileFirefoxIos = lazy(() => import('./AddToMobileFirefoxIos'));
// const AddToMobileChromeIos = lazy(() => import('./AddToMobileChromeIos'));
// const AddToSamsung = lazy(() => import('./AddToSamsung'));
// const AddToOtherBrowser = lazy(() => import('./AddToOtherBrowser'));

type AddToHomeScreenPromptType = 'safari' | 'chrome' | 'firefox' | 'other' | 'firefoxIos' | 'chromeIos' | 'samsung' | '';
const COOKIE_NAME = 'addToHomeScreenPrompt';

export default function AddToHomeScreen() {
    const [displayPrompt, setDisplayPrompt] = useState<AddToHomeScreenPromptType>('');
    const { userAgent, isMobile, isStandalone, isIOS } = useUserAgent();
    const openDialog = useAppZStore((state) => state.openDialog);

    const closePrompt = () => {
        setDisplayPrompt('');
    };

    const doNotShowAgain = () => {
        // Create date 1 year from now
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        setDisplayPrompt('');
    };

    useEffect(() => {
        // const addToHomeScreenPromptCookie = 'show';
        // Only show prompt if user is on mobile and app is not installed
        if (isMobile && !isStandalone) {
            if (userAgent === 'Safari') {
                setDisplayPrompt('safari');
            } else if (userAgent === 'Chrome') {
                setDisplayPrompt('chrome');
            } else if (userAgent === 'Firefox') {
                setDisplayPrompt('firefox');
            } else if (userAgent === 'FirefoxiOS') {
                setDisplayPrompt('firefoxIos');
            } else if (userAgent === 'ChromeiOS') {
                setDisplayPrompt('chromeIos');
            } else if (userAgent === 'SamsungBrowser') {
                setDisplayPrompt('samsung');
            } else {
                setDisplayPrompt('other');
            }
        }
    }, [userAgent, isMobile, isStandalone, isIOS]);

    const Prompt = () => (
        <>
            {
                {
                    'safari': <AddToIosSafari closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'chrome': <AddToMobileChrome closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'firefox': <AddToMobileFirefox closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'firefoxIos': <AddToMobileFirefoxIos closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'chromeIos': <AddToMobileChromeIos closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'samsung': <AddToSamsung closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'other': <AddToOtherBrowser closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    '': <></>
                }[displayPrompt]
            }
        </>
    )

    useEffect(() => {
        if (displayPrompt) {
            console.log(displayPrompt)
            openDialog({
                dialogContent: <Prompt />,
            });
        }
    }, [displayPrompt])

    return (
        <>
            <BaseDialog />
            {/* {
                displayPrompt !== ''
                    ?
                    <>
                        <div
                            className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-50"
                            onClick={closePrompt}
                        >
                            <Prompt />
                        </div>
                    </>
                    :
                    <></>
            } */}
        </>
    );
}