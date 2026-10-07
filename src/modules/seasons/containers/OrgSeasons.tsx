import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CustomButton,
  CustomTypography,
  DataError,
  NoDataText,
  SectionContainer,
} from '../../../components';
import { CustomAccordion } from '../../../components/accordion';
import { CustomStack } from '../../../components/grids';
import { Spinner } from '../../../components/loaders';
import { useCustomParams } from '../../../hooks/useCustomParams';
import OrgTrophies from '../../trophies/containers/OrgTrophies';
import { FETCH_ORG_SEASONS } from '../graphql';

interface Props {
  isAdminView: boolean;
}

export default function OrgSeasons({ isAdminView }: Props) {
  const { t } = useTranslation('seasons');
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_SEASONS, { variables: { orgId: orgId! } });
  const [openedSeasonIds, setOpenedSeasonIds] = useState<Set<string>>(() => new Set());

  const seasonBtn = (seasonId: string, isAdminView: boolean) => (
    <CustomButton
      variant="text"
      color={isAdminView ? 'tertiary' : 'primary'}
      link={`org_season/${seasonId}`}
    >
      {t('LINKS.SEE_MORE')}
    </CustomButton>
  );

  const renderData = data?.orgSeasons.length ? (
    <SectionContainer>
      {data.orgSeasons.map(season => (
        <CustomAccordion
          key={season._id}
          isExpanded={false}
          onToggle={expanded => {
            if (expanded) {
              setOpenedSeasonIds(previous => new Set(previous).add(season._id));
            }
          }}
          title={
            <CustomStack direction="row" justify="flex-start">
              <CustomTypography color="data" bold>
                {season.name}
              </CustomTypography>
              {season.isCurrent && isAdminView && (
                <>
                  <CustomTypography color="primary">{t('LABELS.CURRENT')}</CustomTypography>
                  {seasonBtn(season._id, true)}
                </>
              )}
            </CustomStack>
          }
        >
          <>
            {!season.isCurrent ? seasonBtn(season._id, false) : null}
            {openedSeasonIds.has(season._id) && (
              <OrgTrophies orgSeasonId={season._id} isAdminView={isAdminView} />
            )}
          </>
        </CustomAccordion>
      ))}
    </SectionContainer>
  ) : (
    <NoDataText>{t('NO_DATA.SEASONS')}</NoDataText>
  );

  const renderContent = () => {
    return !loading ? renderData : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
