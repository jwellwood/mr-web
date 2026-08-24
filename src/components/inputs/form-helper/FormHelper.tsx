import { SectionContainer } from '../../containers';
import { APP_ICONS, AppIcon } from '../../icons';
import BottomDrawer from '../../modals/bottom-drawer/BottomDrawer';
import { CustomTypography } from '../../typography';

interface Props {
  helperText: string;
  inputName?: string;
}

export default function FormHelper({ helperText, inputName }: Props) {
  return (
    <BottomDrawer
      buttonElement={<AppIcon icon={APP_ICONS.PENDING} color="warning" />}
      title={inputName}
    >
      <SectionContainer type="form">
        <CustomTypography bold color="data">
          {helperText}
        </CustomTypography>
      </SectionContainer>
    </BottomDrawer>
  );
}
