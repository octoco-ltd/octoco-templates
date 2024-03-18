import { Chip, useTheme, Typography, TextField } from '@mui/material';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import routes from 'src/router/router';

function Breadcrumbs() {
    const breadcrumbs = useBreadcrumbs(routes);
    const theme = useTheme();

    return (
        <>
            {breadcrumbs.map(({ breadcrumb, key }, index) => (
                <div key={index}>
                    {key !== '/' &&
                        <Chip sx={{ backgroundColor: theme.colors.primary.light }} size='small' label={
                            <Typography sx={{ color: theme.colors.primary.dark }} >{breadcrumb}</Typography>
                        } />
                    }

                </div>
            )
            )}
        </>
    );
}

export default Breadcrumbs;

