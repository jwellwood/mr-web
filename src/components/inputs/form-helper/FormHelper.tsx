import { SectionContainer } from '../../containers';
import { APP_ICONS, AppIcon } from '../../icons';
import { PresentationModal } from '../../modals';
import { CustomTypography } from '../../typography';

interface Props {
  helperText: string;
}

export default function FormHelper({ helperText }: Props) {
  return (
    <PresentationModal buttonElement={<AppIcon icon={APP_ICONS.PENDING} color="warning" />}>
      <SectionContainer type="form">
        <CustomTypography>{helperText}</CustomTypography>
      </SectionContainer>
    </PresentationModal>
  );
}
