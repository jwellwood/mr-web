import { useTranslation } from 'react-i18next';
import { CustomTypography, ISelectOptions, SectionContainer } from '../../../components';
import { CustomGridContainer, CustomGridItem } from '../../../components/grids';

interface Props {
  options: ISelectOptions[];
}

export default function IncludedOptions({ options }: Props) {
  const { t } = useTranslation('seasons');
  return (
    <SectionContainer
      type={options.length ? 'form' : 'warning'}
      title={t('MESSAGES.INCLUDED', { count: options.length })}
    >
      <CustomGridContainer spacing={1}>
        {options.map(option => (
          <CustomGridItem key={option.value}>
            <CustomTypography bold color="primary">
              {option.label}
            </CustomTypography>
          </CustomGridItem>
        ))}
      </CustomGridContainer>
    </SectionContainer>
  );
}
