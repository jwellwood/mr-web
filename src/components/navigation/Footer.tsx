import { VERSION } from '../../constants';
import { CenteredGrid } from '../grids';
import { CustomTypography } from '../typography';

const date = new Date().getFullYear();

export default function Footer() {
  return (
    <div style={{ margin: '20px', marginBottom: '0px' }}>
      <CenteredGrid dir="row" just="space-between">
        <CustomTypography size="xs" color="label">
          {' © '}
          {date}
        </CustomTypography>
        <CustomTypography size="xs" bold color="label">
          v {VERSION}
        </CustomTypography>
      </CenteredGrid>
    </div>
  );
}
