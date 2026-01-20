import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export interface DialogItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  avatarColor?: string;
}

export interface CustomDialogProps {
  open: boolean;
  title?: string;
  items: DialogItem[];
  selectedValue?: string;
  onClose: (value: string) => void;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  title = 'Dialog',
  items,
  selectedValue = '',
  onClose
}) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {items.map((item) => (
          <ListItem disablePadding key={item.id}>
            <ListItemButton onClick={() => handleItemClick(item.id)}>
              {item.icon && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: item.avatarColor || 'grey.300' }}>
                    {item.icon}
                  </Avatar>
                </ListItemAvatar>
              )}
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};