import { CustomTypography, SectionContainer } from '../../../components';
import { CustomAccordion } from '../../../components/accordion';
import { CustomStack } from '../../../components/grids';
import { AppIcon } from '../../../components/icons';
import { IListItem, TextList } from '../../../components/lists';
import { getPercentage } from '../../../utils';
import { FETCH_USER_QUERY } from '../types';

interface Props {
  profile?: FETCH_USER_QUERY['user'];
}

export default function ProfileHelper({ profile }: Props) {
  const completedIcon = (value: boolean) => (
    <AppIcon icon={value ? 'check' : 'cross'} color={value ? 'success' : 'error'} size="24px" />
  );

  const listItems: IListItem[] = [
    {
      label: 'User Name',
      value: completedIcon(!!profile?.username),
      secondary: 'Add your username',
      disabled: !!profile?.username,
    },
    {
      label: 'Nationality',
      value: completedIcon(!!profile?.nationality),
      secondary: 'Add your nationality',
      disabled: !!profile?.nationality,
    },
    {
      label: 'Birthday',
      value: completedIcon(!!profile?.dateOfBirth),
      secondary: 'Add your birthday',
      disabled: !!profile?.dateOfBirth,
    },
    {
      label: 'Organization',
      value: completedIcon(!!profile?.orgIds.length),
      secondary: 'Create your own organization',
      disabled: !!profile?.orgIds.length,
    },
    {
      label: 'Teams',
      value: completedIcon(!!profile?.teamIds.length),
      secondary: 'Request permission to join an existing team',
      disabled: !!profile?.teamIds.length,
    },
  ];

  const disabledItems = listItems.filter(item => item.disabled).length;

  const getColor = (value: number) => {
    if (value === 100) return 'success';
    if (value >= 40) return 'warning';
    return 'error';
  };

  const accordionTitle = () => (
    <CustomStack direction="row" justify="space-between" spacing={1}>
      <CustomTypography color="data" bold>
        Profile Completion
      </CustomTypography>
      <CustomTypography color={getColor(getPercentage(disabledItems, listItems.length))} bold>
        {getPercentage(disabledItems, listItems.length)}%
      </CustomTypography>
    </CustomStack>
  );

  return (
    <SectionContainer>
      <CustomAccordion title={accordionTitle()} isExpanded={false}>
        <TextList data={listItems} />
      </CustomAccordion>
    </SectionContainer>
  );
}
