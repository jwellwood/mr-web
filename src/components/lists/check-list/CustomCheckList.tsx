import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton, CustomTypography, SectionContainer } from '../../../components';
import { CustomAccordion } from '../../../components/accordion';
import { AppIcon } from '../../../components/icons';
import { IListItem, TextList } from '../../../components/lists';
import { CustomSkeleton } from '../../../components/loaders';

interface Props {
  title: string;
  steps: (IListItem & { done: boolean })[];
  loading: boolean;
  dismissedKey?: string;
}

export default function CustomCheckList({ title, steps, loading, dismissedKey }: Props) {
  const { t } = useTranslation('components');
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(dismissedKey || '') === 'true'
  );

  const onDismiss = () => {
    localStorage.setItem(dismissedKey || '', 'true');
    setDismissed(true);
  };

  const allDone = steps.every(step => step.done);

  if (dismissed) return null;

  const type = loading ? 'form' : allDone ? 'success' : 'warning';
  return (
    <SectionContainer type={type}>
      <CustomAccordion
        title={
          loading ? (
            <CustomSkeleton width="150px" />
          ) : (
            <CustomTypography bold color={allDone ? 'primary' : 'warning'}>
              <AppIcon icon={allDone ? 'check' : 'info'} /> {title}
            </CustomTypography>
          )
        }
        isExpanded={false}
      >
        <>
          <TextList
            data={steps.map(step => ({
              label: step.label,
              secondary: step.secondary,
              value: (
                <AppIcon
                  icon={step.done ? 'check' : 'info'}
                  color={step.done ? 'success' : 'warning'}
                />
              ),
            }))}
          />
          {allDone && (
            <CustomButton onClick={onDismiss} variant="text" color="tertiary">
              {t('DISMISS')}
            </CustomButton>
          )}
        </>
      </CustomAccordion>
    </SectionContainer>
  );
}
