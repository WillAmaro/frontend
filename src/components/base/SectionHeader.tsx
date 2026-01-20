import React from  'react';
import { Box, Typography } from '@mui/material';

interface SectionHeaderProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    iconBgColor?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    icon,
    title,
    subtitle,
    iconBgColor = '#e3f2fd'
}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3}}>
            <Box sx={{
                bgcolor: iconBgColor,
                p: 1.2,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }} >
                { icon }
            </Box>

            <Box>
                <Typography variant='h6' fontWeight="bold" color='text.primary'>
                    { title }
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    { subtitle }
                </Typography>
            </Box>
        </Box>
    );
}