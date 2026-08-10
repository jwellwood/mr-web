import { SectionContainer } from '../../containers';
import { CustomTypography } from '../../typography';

interface Props {
  helperText: string;
}

export default function FormHelperText({ helperText }: Props) {
  return (
    <SectionContainer type="form">
      <CustomTypography>{helperText}</CustomTypography>
    </SectionContainer>
  );
}
