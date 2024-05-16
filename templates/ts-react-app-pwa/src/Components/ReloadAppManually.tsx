import { RefreshRounded } from "@mui/icons-material";
import { Card, CardContent, IconButton, Typography } from "@mui/material";

function ReloadAppManually() {

    const clearCache = async () => {
        try {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
            alert('Cache cleared successfully. Refreshing page.');
            window.location.reload();
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    };


    return (
        <Card>
            <CardContent>
                <IconButton color="inherit" aria-label="reload app manually" onClick={clearCache}>
                    <RefreshRounded fontSize="large" />
                </IconButton>
                <Typography variant="body1">Reload app manually</Typography>
            </CardContent>
        </Card>
    )

}

export default ReloadAppManually;