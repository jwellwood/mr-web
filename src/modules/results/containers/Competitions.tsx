import { useTranslation } from 'react-i18next';
import { DataError } from '../../../components';
import { CustomSkeleton } from '../../../components/loaders';
import { CustomTabs } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';
import useCompetitionConfig from '../hooks/useCompetitionConfig';
import LeagueTableWrapper from './LeagueTableWrapper';
import ResultsWrapper from './ResultsWrapper';

interface Props {
  isAdminView?: boolean;
}

export default function Competitions({ isAdminView }: Props) {
  const { t } = useTranslation(['results', 'organization']);

  const { competitionConfig, loading, error } = useCompetitionConfig();

  if (error) {
    return <DataError error={error} />;
  }

  const competitionTabs = !competitionConfig
    ? []
    : competitionConfig
        ?.sort((a, b) => (a?.priority ?? 99) - (b?.priority ?? 99))
        .map(competition => ({
          label: competition.name,
          component: (
            <CustomTabs
              type={TAB_TYPES.COMPETITION_VIEW}
              level="secondary"
              tabs={[
                {
                  label: t('organization:TABS.TABLES'),
                  component: <LeagueTableWrapper competitionConfig={competition} />,
                },
                {
                  label: t('organization:TABS.MATCHES'),
                  component: (
                    <ResultsWrapper competitionConfig={competition} isAdminView={isAdminView} />
                  ),
                },
              ]}
            />
          ),
        }));

  return loading ? (
    <CustomSkeleton width="290px" height="36px" />
  ) : (
    <CustomTabs type={TAB_TYPES.RESULTS_COMPETITIONS} tabs={competitionTabs} level="buttons" />
  );
}
