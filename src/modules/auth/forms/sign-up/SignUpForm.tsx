import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledTextInput,
  ControlledSwitchInput,
  CustomTypography,
} from '../../../../components';
import { PresentationModal } from '../../../../components/modals';
import TermsOfUseContent from '../../terms/TermsOfUseContent';
import { SignUpSchema, type SignUpFormData } from './validation';

interface Props {
  onSubmit: (data: SignUpFormData) => void;
  defaultValues: SignUpFormData;
  loading: boolean;
}

export default function SignUpForm({ onSubmit, defaultValues, loading }: Props) {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<SignUpFormData>({
    defaultValues,
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      minWidth={100}
      submitBtn={{ confirm: { show: false }, disabled: !isValid }}
    >
      <ControlledTextInput control={control} name="username" label="Username" />
      <ControlledTextInput control={control} name="email" label="Email Address" />
      <ControlledTextInput control={control} name="password" isPassword={true} label="Password" />
      <ControlledSwitchInput
        control={control}
        name="acceptTerms"
        label={
          <span>
            <PresentationModal
              title="Terms of Use"
              buttonElement={
                <Link
                  component="span"
                  underline="always"
                  sx={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  <CustomTypography color="info" size="md" bold>
                    Accept Terms of Use
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
