import React from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

interface TitleCardProps{
    icon: React.ReactNode;
    title: string;
    description: string;
    iconBgColor?: string;
    iconColor?: string;
}

export const TitleCard: React.FC<TitleCardProps> = ({
    icon,
    title,
    description,
    iconBgColor = '#3061e9ff',
    iconColor = '#fff'
}) => {
    return (
        <Card
            elevation={8}
            sx={{
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
                borderRadius: 5,
                borderColor: 'divider',
                md: 3
            }}
        >
            <CardContent sx={{ p:3}}>                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>

                    {/* -----  Icono  ---- */}
                    <Box sx={{
                        background: iconBgColor,
                        p: 1.5,
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: iconColor
                    }} >
                        {icon}
                    </Box>

                    
                    {/* --- Titulo y subtitulo --- */}
                    <Box>
                        <Typography variant='h5' fontWeight="bold" color='text.primary'>
                            {title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <InfoOutlineIcon sx={{ fontSize: 20, color: 'text.primary' }}>
                            </InfoOutlineIcon>
                            <Typography variant='body2' color='text.secondary'>
                                    {description}
                                </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};