import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function TabLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
      <CircularProgress color="primary" />
    </Box>
  );
}
