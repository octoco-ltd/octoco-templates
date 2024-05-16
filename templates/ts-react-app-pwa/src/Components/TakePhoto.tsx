import { DeleteRounded, PhotoCameraRounded } from "@mui/icons-material";
import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useRef, useState } from "react";

interface DixieDbPhoto {
    file: File;
    timestamp: Date;
    otherMetadata: string;
    blobUrl: string;
}


function TakePhoto() {
    const [photoTaken, setPhotoTaken] = useState<DixieDbPhoto | null>(null);
    const photoTakenInputRef = useRef<HTMLInputElement | null>(null);

    const handleTakePhoto = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            try {

                const firstFile = files[0];

                const photo: DixieDbPhoto = {
                    file: firstFile,
                    otherMetadata: 'someKey',
                    timestamp: new Date(),
                    blobUrl: URL.createObjectURL(firstFile)
                };
                setPhotoTaken(photo);

            } catch (error) {
                console.log('failed adding photo');
            }
        }
    };

    const handleClearPhoto = () => {
        setPhotoTaken(null);
        if (photoTaken && photoTaken.blobUrl) {
            URL.revokeObjectURL(photoTaken.blobUrl);
        }
    };

    return (
        <Card>
            <CardContent>
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    ref={photoTakenInputRef}
                    style={{ display: 'none' }}
                />
                <Box display="flex" flexDirection="column" alignItems="center">
                    <IconButton color="inherit" aria-label="take photo" onClick={() => handleTakePhoto(photoTakenInputRef)}>
                        <PhotoCameraRounded fontSize="large" />
                    </IconButton>
                    <Typography variant="body1">Take Photo</Typography>
                    {photoTaken && (
                        <Box mt={2} textAlign="center">
                            <img
                                src={photoTaken.blobUrl}
                                alt="Taken Photo"
                                style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px' }}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteRounded />}
                                onClick={handleClearPhoto}
                                sx={{ mt: 2 }}
                            >
                                Clear Photo
                            </Button>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );

}

export default TakePhoto;