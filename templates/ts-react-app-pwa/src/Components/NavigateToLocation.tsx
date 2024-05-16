import { LocationOnRounded } from "@mui/icons-material";
import { Card, CardContent, IconButton, Typography } from "@mui/material";

function NavigateToLocation() {

    const handleNavigateToSite = () => {
        // TODO: test geo URIs as well? As this currently only works with google maps, but geo might open the phone's default maps app
        // geo:-25.7393,28.1608?q=-25.7393,28.1608(Label+Name)`;
        const lat = '-33.962647';
        const long = '18.839313';
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
        window.open(googleMapsUrl, '_blank');
    }

    return (
        <Card>
            <CardContent>
                <IconButton color="inherit" aria-label="navigate to location" onClick={handleNavigateToSite}>
                    <LocationOnRounded fontSize="large" />
                </IconButton>
                <Typography variant="body1">Navigate to Location</Typography>
            </CardContent>
        </Card>
    )

}

export default NavigateToLocation;