import { useTranslation } from 'react-i18next';
import { NoDataText, SectionContainer } from '../../../components';
import { ImageAvatar } from '../../../components/avatars';
import { LinksList, type IListItem } from '../../../components/lists';
import { CustomTabs, ITab } from '../../../components/tabs';
import { IMAGE_TYPE, TAB_TYPES } from '../../../constants';
import { T_FETCH_ORG_TEAMS } from '../graphql';
import KitDisplay from './KitDisplay';

interface Props {
  teams: T_FETCH_ORG_TEAMS['teams'];
}

export default function OrgTeamsList({ teams }: Props) {
  const { t } = useTranslation('organization');
  const activeTeams = teams.filter(team => team.isActive);
  const inactiveTeams = teams.filter(team => !team.isActive);

  const activeLinks: IListItem[] = activeTeams.map(team => {
    return {
      avatar: <ImageAvatar imageUrl={team.teamBadge?.url} fallbackIcon={IMAGE_TYPE.BADGE} />,
      label: team.teamName,
      link: `team/${team._id}`,
      value: <KitDisplay team={team} />,
    };
  });

  const inactiveLinks: IListItem[] = inactiveTeams.map(team => {
    return {
      label: team.teamName,
      link: `team/${team._id}`,
    };
  });
  const tabs: ITab[] = [
    {
      label: t('TABS.ACTIVE'),
      component: activeLinks.length ? (
        <LinksList links={activeLinks} />
      ) : (
        <NoDataText>{t('MESSAGES.NO_ACTIVE_TEAMS')}</NoDataText>
      ),
    },
    {
      label: t('TABS.INACTIVE'),
      component: inactiveLinks.length ? (
        <LinksList links={inactiveLinks} />
      ) : (
        <NoDataText>{t('MESSAGES.NO_INACTIVE_TEAMS')}</NoDataText>
      ),
    },
  ];

  return (
    <SectionContainer>
      <CustomTabs type={TAB_TYPES.ORG_TEAMS} tabs={tabs} level="secondary" />
    </SectionContainer>
  );
}
