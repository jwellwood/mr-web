import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface LazyLoaderProps {
  fullHeight?: boolean;
}

export default function LazyLoader({ fullHeight = false }: LazyLoaderProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        width: '100%',
        ...(fullHeight && { height: '100vh' }),
      }}
    >
      <LinearProgress />
    </Box>
  );
}
