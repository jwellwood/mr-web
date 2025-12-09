import React, { ReactNode } from 'react';
import { Box, Paper } from '@mui/material';

import { CustomTypography } from '../../typography';
import { theme } from '../../../theme';

interface Props {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  children: React.ReactNode;
}

export default function SectionContainer({ title, subtitle, children }: Props) {
  const { palette, spacing } = theme;
  const border = `${palette.secondary.light} 0.5px solid`;
  return (
    <Paper
      elevation={10}
      sx={{
        margin: spacing(1),
        background: palette.secondary.dark,
        border,
      }}
    >
      {title && (
        <div
          style={{
            borderBottom: border,
            padding: spacing(0.5),
            background: palette.secondary.main,
          }}
        >
          <CustomTypography color="data" size="sm" bold>
            {title}
          </CustomTypography>
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
  );
}
