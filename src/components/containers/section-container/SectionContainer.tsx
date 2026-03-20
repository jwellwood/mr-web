import { Box, Fade, Paper } from '@mui/material';
import React, { ReactNode } from 'react';
import { theme } from '../../../theme';
import { CustomTypography } from '../../typography';
import { getTypeStyles } from './styles';

interface Props {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  secondaryAction?: ReactNode;
  children: React.ReactNode;
  type?: 'form' | 'winner' | 'success' | 'delete' | 'info' | 'admin' | 'default';
}

export default function SectionContainer({
  title,
  subtitle,
  secondaryAction,
  children,
  type = 'default', // Default type
}: Props) {
  const { spacing } = theme;
  const { background, border, titleBackground, titleTextColor } = getTypeStyles(theme, type);

  return (
    <Fade in={true} timeout={500}>
      <Paper
        elevation={10}
        sx={{
          margin: spacing(1),
          background,
          border,
        }}
      >
        {title && (
          <div
            style={{
              borderBottom: border,
              padding: spacing(0.5),
              background: titleBackground,
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomTypography color={titleTextColor} size="sm" bold>
              {title}
            </CustomTypography>
            {secondaryAction && <span>{secondaryAction}</span>}
          </div>
        )}

        {subtitle && (
          <div
            style={{
              padding: spacing(0.5),
            }}
          >
            <CustomTypography color={type === 'success' ? 'secondary' : 'label'} bold size="xs">
              {subtitle}
            </CustomTypography>
          </div>
        )}
        <Box sx={{ p: spacing(0.5) }}>{children}</Box>
      </Paper>
    </Fade>
  );
}
