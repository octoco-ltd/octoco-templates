import { Alert } from '@mui/material'
import { Offline } from 'react-detect-offline'

export default function Connectivity() {
    // https://www.npmjs.com/package/react-detect-offline

    return (
        <Offline>
            <Alert color='warning' variant='filled' sx={{ mb: 2 }}>
                Offline Mode Active
            </Alert>
        </Offline>
    )
}
