import { useTranslation } from 'react-i18next';
import { CustomTypography, NoDataText } from '../../../components';
import { SectionContainer } from '../../../components';
import { LinksList, type IListItem } from '../../../components/lists';
import { T_FETCH_COMPETITIONS } from '../graphql';

interface Props {
  competitions?: T_FETCH_COMPETITIONS['org']['competitions'];
}

export default function CompetitionsList({ competitions }: Props) {
  const { t } = useTranslation('competitions');
  const data: IListItem[] =
    competitions?.map(comp => {
      return {
        secondary: (
          <CustomTypography color="label">
            {t(`OPTIONS.${comp.competitionType.toUpperCase()}`)}
          </CustomTypography>
        ),
        label: (
          <CustomTypography bold color="data">
            {comp.name}
          </CustomTypography>
        ),
        link: `competition/${comp._id}`,
      };
    }) || [];

  const renderContent = competitions?.length ? (
    <LinksList links={data} />
  ) : (
    <NoDataText>{t('NO_DATA.COMPETITIONS')}</NoDataText>
  );

  return <SectionContainer>{renderContent}</SectionContainer>;
}
