import { CustomTypography, SectionContainer } from '../../../components';
import { CustomAccordion } from '../../../components/accordion';
import { AppIcon } from '../../../components/icons';
import { TextList } from '../../../components/lists';
import { Spinner } from '../../../components/loaders';

interface Props {
  title: string;
  steps: {
    done: boolean;
    label: string;
    secondary: string;
  }[];
  allDone: boolean;
  loading: boolean;
}

export default function OrgSetupChecklist({ title, steps, allDone, loading }: Props) {
  return (
    <CustomAccordion
      title={
        loading ? (
          <Spinner />
        ) : (
          <CustomTypography bold color={allDone ? 'primary' : 'warning'}>
            {title}
          </CustomTypography>
        )
      }
      isExpanded={!allDone && !loading}
    >
      <SectionContainer type={allDone ? 'success' : 'info'}>
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
      </SectionContainer>
    </CustomAccordion>
  );
}
