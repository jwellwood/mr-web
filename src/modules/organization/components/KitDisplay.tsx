import { FaTshirt } from 'react-icons/fa';
import { CustomStack } from '../../../components/grids';
import { T_FETCH_ORG_TEAMS } from '../graphql';

interface Props {
  team: T_FETCH_ORG_TEAMS['teams'][number] | null | undefined;
}

export default function KitDisplay({ team }: Props) {
  const kit = (color: string) => <FaTshirt size="1.5rem" color={color || 'white'} style={{}} />;

  return (
    <CustomStack direction="row" spacing={0}>
      {kit(team?.homeShirt || 'transparent')}
      {kit(team?.awayShirt || 'transparent')}
    </CustomStack>
  );
}
