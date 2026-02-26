import { CustomTypography, ISelectOptions } from '../../../../components';
import { CustomGridContainer, CustomGridItem } from '../../../../components/grids';

interface Props {
  options: ISelectOptions[];
}

export default function IncludedOptions({ options }: Props) {
  return (
    <>
      <CustomTypography>Included: {options.length}</CustomTypography>
      <CustomGridContainer spacing={1}>
        {options.map(option => (
          <CustomGridItem key={option.value}>
            <CustomTypography bold color="primary">
              {option.label}
            </CustomTypography>
          </CustomGridItem>
        ))}
      </CustomGridContainer>
    </>
  );
}
