import { makeStyles } from '@mui/styles';
import { FaTshirt } from 'react-icons/fa';
import { GiUnderwearShorts } from 'react-icons/gi';
import { SectionContainer } from '../../../components';
import { CenteredGrid, GridItem } from '../../../components/grids';
import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { type FETCH_TEAM_QUERY } from '../types';

const useStyles = makeStyles(() => ({
  container: {
    borderRadius: '4px',
    marginTop: '8px',
  },
  shirt: {
    paddingBottom: '0px',
    marginBottom: '-20px',
  },
  shorts: {
    paddingTop: '0px',
  },
  socks: {
    paddingBottom: '8px',
    marginRight: '5px',
  },
}));

interface Props {
  team?: FETCH_TEAM_QUERY['team'];
  loading: boolean;
}

export default function Kits({ team, loading }: Props) {
  const classes = useStyles();

  const { homeShirt, homeShorts, homeSocks, awayShirt, awayShorts, awaySocks, kitsBackground } =
    team || {};

  const items = [
    {
      title: 'Home',
      kit: { shirt: homeShirt, shorts: homeShorts, socks: homeSocks },
    },
    {
      title: 'Away',
      kit: { shirt: awayShirt, shorts: awayShorts, socks: awaySocks },
    },
  ];

  return (
    <SectionContainer title="Kits">
      <CenteredGrid dir="row">
        {items.map(item => (
          <GridItem size={6} key={item.title}>
            <CustomTypography bold color="data" size="sm">
              {item.title}
            </CustomTypography>
            <div
              style={{ background: kitsBackground || 'transparent' }}
              className={classes.container}
            >
              {loading ? (
                <CustomSkeleton height="75px" />
              ) : (
                <CenteredGrid>
                  <FaTshirt
                    size="3.5rem"
                    color={item.kit.shirt || 'white'}
                    className={classes.shirt}
                  />

                  <GiUnderwearShorts
                    size="2.4rem"
                    color={item.kit.shorts || 'white'}
                    className={classes.shorts}
                  />
                </CenteredGrid>
              )}
            </div>
          </GridItem>
        ))}
      </CenteredGrid>
    </SectionContainer>
  );
}
