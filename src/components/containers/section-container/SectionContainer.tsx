import React, { ReactNode } from 'react';
import { Box, Fade, Paper } from '@mui/material';

import { CustomTypography } from '../../typography';
import { theme } from '../../../theme';

interface Props {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  children: React.ReactNode;
  isSpecial?: boolean;
}

const specialBackground = `linear-gradient(310deg,
${theme.palette.dark.main} 80%,
${theme.palette.warning.light} 0%)`;
export default function SectionContainer({ title, subtitle, children, isSpecial }: Props) {
  const { palette, spacing } = theme;

  const border = isSpecial
    ? 'rgba(234,162,33, 1) 1px solid'
    : `${palette.secondary.light} 0.5px solid`;

  return (
    <Fade in={true} timeout={500}>
      <Paper
        elevation={10}
        sx={{
          margin: spacing(1),
          background: isSpecial ? specialBackground : palette.secondary.dark,
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
    </Fade>
  );
}
