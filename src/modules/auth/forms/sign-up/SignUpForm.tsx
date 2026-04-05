import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledTextInput,
  ControlledSwitchInput,
  CustomTypography,
} from '../../../../components';
import { PresentationModal } from '../../../../components/modals';
import TermsOfUseContent from '../../components/terms/TermsOfUseContent';
import { SignUpSchema, type SignUpFormData } from './schema';

interface Props {
  onSubmit: (data: SignUpFormData) => void;
  defaultValues: SignUpFormData;
  loading: boolean;
}

export default function SignUpForm({ onSubmit, defaultValues, loading }: Props) {
  const { t } = useTranslation('auth');
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<SignUpFormData>({
    defaultValues,
    resolver: zodResolver(SignUpSchema()),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      minWidth={100}
      submitBtn={{ confirm: { show: false }, disabled: !isValid }}
    >
      <ControlledTextInput control={control} name="username" label={t('FORM.LABELS.USERNAME')} />
      <ControlledTextInput control={control} name="email" label={t('FORM.LABELS.EMAIL')} />
      <ControlledTextInput
        control={control}
        name="password"
        isPassword={true}
        label={t('FORM.LABELS.PASSWORD')}
      />
      <ControlledSwitchInput
        control={control}
        name="acceptTerms"
        label={
          <span>
            <PresentationModal
              title={t('FORM.LABELS.TERMS')}
              buttonElement={
                <Link
                  component="span"
                  underline="always"
                  sx={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  <CustomTypography color="info" size="md" bold>
                    {t('FORM.LABELS.ACCEPT_TERMS')}
                  </CustomTypography>
                </Link>
              }
            >
              <TermsOfUseContent />
            </PresentationModal>
          </span>
        }
      />
    </FormContainer>
  );
}
