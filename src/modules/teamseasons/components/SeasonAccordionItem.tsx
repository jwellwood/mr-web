import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../../components';
import { CustomAccordion } from '../../../components/accordion';
import SeasonAccordionTitle from './SeasonAccordionTitle';
import SeasonAwards from './SeasonAwards';
import SeasonSummary from './SeasonSummary';

interface Props {
  seasonId: string;
  name?: string;
  division?: string;
  position?: number;
  totalFinalPositions?: number;
  loading?: boolean;
}

export default function SeasonAccordionItem({
  seasonId,
  name,
  division,
  position,
  totalFinalPositions,
  loading,
}: Props) {
  const { t } = useTranslation('teamseasons');
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <CustomAccordion
      isExpanded={false}
      onToggle={expanded => expanded && setHasOpened(true)}
      title={
        <>
          <SeasonAccordionTitle
            name={name || ''}
            division={division}
            position={position}
            totalFinalPositions={totalFinalPositions}
          />
        </>
      }
    >
      <>
        {hasOpened && (
          <>
            <SeasonSummary
              seasonId={seasonId}
              position={position}
              totalFinalPositions={totalFinalPositions}
              loading={loading}
            />
            <CustomButton variant="text" link={`season/${seasonId}`}>
              {t('BUTTONS.SEE_MORE')}
            </CustomButton>
            <SeasonAwards seasonId={seasonId} loading={loading} />
          </>
        )}
      </>
    </CustomAccordion>
  );
}
