import { Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/**
 * Middleware for handling Redux Toolkit Query actions
 * @param api - The Redux Toolkit Query MiddlewareAPI
 * @returns A function that takes the next middleware function
 */
export const rtkQueryMiddleware: Middleware = (api: MiddlewareAPI) => (next) => async (action: any) => {
    // TODO: action has a type of unknown = Figure out how to properly type this

    // Handle rejected action with toast notification and status message
    if (isRejectedWithValue(action)) {
        const status = action.payload.originalStatus;
        const message = action?.payload?.data?.message;
        toast.dismiss();
        handleRejectedStatus(status, message);
    } else if (action?.meta?.arg?.type === 'mutation') {
        // Handle mutation action
        handleMutationAction(action);
    }
    return next(action);
};

/**
 * Handle rejected status
 * @param status The status code
 * @param message The error message
 */
const handleRejectedStatus = (status: number, message: string) => {
    switch (status) {
        case 401:
            toast.error(message ?? 'Your session has expired. Redirecting to the login page.', {
                autoClose: 10000,
            });
            break;
        case 403:
            toast.error(message ?? 'User not authorised to perform this action.');
            break;
        case 500:
            toast.error(message ?? 'Internal server error.');
            break;
        case 404:
            toast.error(message ?? 'Resource not found.');
            break;
        case 400:
            toast.error(
                message ?? 'An error has occurred',
                { autoClose: 10000 }
            );
            break;
        default:
            toast.error(
                message ?? 'An error has occurred.',
                { autoClose: 10000 }
            );
            break;
    }
};

/**
 * Handle mutation action based on the action type
 * @param action - The action to be handled
 */
const handleMutationAction = (action: any) => {
    // Handle successful action
    if (action.type.endsWith('/fulfilled')) {
        toast.dismiss(); // Dismiss any existing toast
        toast.success(action?.payload?.data?.message ?? 'Success!', { hideProgressBar: true }); // Show success message
    } else if (action.type.endsWith('/pending')) { // Handle pending action
        toast.info(`Requesting ${action?.meta?.arg?.endpointName}...`, { // Show pending message
            hideProgressBar: true,
        });
    }
};
