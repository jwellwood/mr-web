import { Box, Fade, Paper } from '@mui/material';
import React, { ReactNode } from 'react';
import { theme } from '../../../theme';
import { CustomTypography } from '../../typography';

interface Props {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  secondaryAction?: ReactNode;
  children: React.ReactNode;
  type?: string;
}

const specialBackground = `linear-gradient(315deg,
${theme.palette.warning.light} 0%,
${theme.palette.secondary.dark} 12%, ${theme.palette.dark.main} 100%)`;

export default function SectionContainer({
  title,
  subtitle,
  secondaryAction,
  children,
  type,
}: Props) {
  const { palette, spacing } = theme;

  const border = () => {
    const border = `${palette.secondary.light} 0.5px solid`;
    const winnerBorder = 'rgba(234,162,33, 1) 1px solid';
    const deleteBorder = 'rgba(255, 0, 0, 0.8) 1px solid';

    if (type === 'winner') {
      return winnerBorder;
    }
    if (type === 'delete') {
      return deleteBorder;
    }
    return border;
  };

  return (
    <Fade in={true} timeout={500}>
      <Paper
        elevation={10}
        sx={{
          margin: spacing(1),
          background: type === 'winner' ? specialBackground : palette.secondary.dark,
          border: border(),
        }}
      >
        {title && (
          <div
            style={{
              borderBottom: border(),
              padding: spacing(0.5),
              background: palette.secondary.main,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <CustomTypography color="data" size="sm" bold>
              {title}
            </CustomTypography>
            {secondaryAction && secondaryAction}
          </div>
        )}

        {subtitle && (
          <div
            style={{
              padding: spacing(0.5),
            }}
          >
            <CustomTypography color="label" bold size="xs">
              {subtitle}
            </CustomTypography>
          </div>
        )}
        <Box sx={{ p: spacing(0.5) }}>{children}</Box>
      </Paper>
    </Fade>
  );
}
