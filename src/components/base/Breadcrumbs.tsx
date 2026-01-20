import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export interface BreadcrumbItem {
  label: string;
  href?: string; // si no hay href será solo texto
}

export interface BaseBreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode; // opcional, por defecto '/'
  onItemClick?: (item: BreadcrumbItem, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const BaseBreadcrumbs: React.FC<BaseBreadcrumbsProps> = ({
  items,
  separator = '/',
  onItemClick,
}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" separator={separator}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast || !item.href) {
          return (
            <Typography key={index} color="text.primary">
              {item.label}
            </Typography>
          );
        } else {
          return (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onItemClick?.(item, e);
              }}
            >
              {item.label}
            </Link>
          );
        }
      })}
    </Breadcrumbs>
  );
};