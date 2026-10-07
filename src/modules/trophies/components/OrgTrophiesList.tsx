import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton, DataError, NoDataText, SectionContainer } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { APP_ICONS, AppIcon } from '../../../components/icons';
import { IListItem, LinksList } from '../../../components/lists';
import { Spinner } from '../../../components/loaders';
import { useCustomParams } from '../../../hooks';
import { TApolloError } from '../../../types/apollo';
import AddOrgTrophy from '../containers/AddOrgTrophy';
import EditOrgTrophy from '../containers/EditOrgTrophy';
import { T_FETCH_ORG_TROPHIES } from '../graphql';

type Props = {
  orgSeasonId: string;
  orgTrophies: T_FETCH_ORG_TROPHIES['trophies'];
  error?: TApolloError;
  loading: boolean;
  isAdminView: boolean;
};

export default function OrgTrophiesList({
  orgSeasonId,
  orgTrophies,
  error,
  loading,
  isAdminView,
}: Props) {
  const { orgId } = useCustomParams();
  const { t } = useTranslation('trophies');
  const [editingTrophy, setEditingTrophy] = useState<
    T_FETCH_ORG_TROPHIES['trophies'][number] | null
  >(null);

  if (error) {
    return <DataError error={error} />;
  }

  return (
    <>
      <SectionContainer
        title={t('HEADERS.TROPHIES')}
        secondaryAction={isAdminView ? <AddOrgTrophy orgSeasonId={orgSeasonId} /> : null}
      >
        {loading ? (
          <Spinner />
        ) : orgTrophies.length === 0 ? (
          <NoDataText>{t('NO_DATA.TROPHIES')}</NoDataText>
        ) : (
          <>
            {orgTrophies.map(trophy => {
              const listData: IListItem[] = [
                {
                  icon: <AppIcon icon={APP_ICONS.TROPHY} color="gold" size="24px" />,
                  label: trophy.winningTeamName,
                  link: `/org/${orgId}/team/${trophy.winningTeamId}`,
                },
                {
                  icon: <AppIcon icon={APP_ICONS.MEDAL} color="silver" size="24px" />,
                  label: trophy.runnerUpTeamName,
                  link: `/org/${orgId}/team/${trophy.runnerUpTeamId}`,
                },
              ];
              return (
                <SectionContainer
                  key={trophy._id}
                  subtitle={
                    <CustomStack direction="row" align="center" justify="space-between">
                      {trophy.competitionName}{' '}
                      {isAdminView ? (
                        <CustomButton
                          color="tertiary"
                          variant="text"
                          onClick={() => setEditingTrophy(trophy)}
                        >
                          {t('LINKS.EDIT_TROPHY')}
                        </CustomButton>
                      ) : null}
                    </CustomStack>
                  }
                >
                  <>
                    <LinksList links={listData} />
                  </>
                </SectionContainer>
              );
            })}
          </>
        )}
      </SectionContainer>
      {isAdminView && editingTrophy && (
        <EditOrgTrophy
          orgSeasonId={orgSeasonId}
          trophy={editingTrophy}
          onClose={() => setEditingTrophy(null)}
        />
      )}
    </>
  );
}
