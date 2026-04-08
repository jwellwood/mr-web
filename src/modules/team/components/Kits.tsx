import { useTranslation } from 'react-i18next';
import { FaTshirt } from 'react-icons/fa';
import { GiUnderwearShorts } from 'react-icons/gi';
import { SectionContainer } from '../../../components';
import { CustomGridContainer, CustomGridItem } from '../../../components/grids';
import CustomSkeleton from '../../../components/loaders/custom-skeleton/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { T_FETCH_TEAM_QUERY } from '../graphql';

interface Props {
  team?: T_FETCH_TEAM_QUERY['team'];
  loading: boolean;
}

export default function Kits({ team, loading }: Props) {
  const { t } = useTranslation('team');

  const { homeShirt, homeShorts, homeSocks, awayShirt, awayShorts, awaySocks, kitsBackground } =
    team || {};

  const items = [
    {
      title: t('SECTIONS.KITS.HOME'),
      kit: { shirt: homeShirt, shorts: homeShorts, socks: homeSocks },
    },
    {
      title: t('SECTIONS.KITS.AWAY'),
      kit: { shirt: awayShirt, shorts: awayShorts, socks: awaySocks },
    },
  ];

  return (
    <SectionContainer title={t('SECTIONS.KITS.HEADER')}>
      <CustomGridContainer>
        {items.map(item => (
          <CustomGridItem size={6} key={item.title}>
            <CustomTypography bold color="data" size="sm">
              {item.title}
            </CustomTypography>
            <div
              style={{
                background: kitsBackground || 'transparent',
                borderRadius: '4px',
                marginTop: '8px',
              }}
            >
              {loading ? (
                <CustomSkeleton height="75px" />
              ) : (
                <CustomGridContainer direction="column">
                  <FaTshirt
                    size="3.5rem"
                    color={item.kit.shirt || 'white'}
                    style={{ paddingBottom: '0px', marginBottom: '-20px' }}
                  />

                  <GiUnderwearShorts
                    size="2.4rem"
                    color={item.kit.shorts || 'white'}
                    style={{ paddingTop: '0px' }}
                  />
                </CustomGridContainer>
              )}
            </div>
          </CustomGridItem>
        ))}
      </CustomGridContainer>
    </SectionContainer>
  );
}
