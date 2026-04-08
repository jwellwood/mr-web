import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTabs, ITab } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';
import { T_FETCH_SEASON } from '../graphql';
import SeasonHeader from './SeasonHeader';

const Matches = lazy(() => import('../../matches/containers/Matches'));
const Squad = lazy(() => import('../../squad/containers/Squad'));
const MatchStatsSeason = lazy(() => import('../../matches/containers/MatchStatsSeason'));
const Awards = lazy(() => import('../../awards/containers/Awards'));

interface Props {
  season?: T_FETCH_SEASON['season'];
}

export default function SeasonTabs({ season }: Props) {
  const { t } = useTranslation('teamseasons');

  const tabs: ITab[] = [
    { label: t('TABS.STATS'), component: <MatchStatsSeason /> },
    { label: t('TABS.MATCHES'), component: <Matches /> },
    { label: t('TABS.SQUAD'), component: <Squad /> },
    { label: t('TABS.AWARDS'), component: <Awards /> },
  ] as const;

  if (!season) {
    return null;
  }

  return (
    <SeasonHeader title={season.name}>
      <CustomTabs type={TAB_TYPES.SEASON} tabs={tabs} level="secondary" />
    </SeasonHeader>
  );
}
