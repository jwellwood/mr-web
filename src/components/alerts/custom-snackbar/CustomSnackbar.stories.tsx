import { Meta, StoryObj } from '@storybook/react-vite';
import { Provider, useDispatch } from 'react-redux';
import { createStoryStore } from '../../../../.storybook/createStorybookStore';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import { IAlertType } from '../types';
import CustomSnackbar from './CustomSnackbar';

const meta: Meta<typeof CustomSnackbar> = {
  title: 'Alerts/CustomSnackbar',
  component: CustomSnackbar,
  decorators: [
    Story => (
      <Provider store={alertStore}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

const alertStore = createStoryStore({
  alertsReducer: { text: '', type: '' },
});

const SnackbarWithTrigger = ({ type, text }: { type: IAlertType; text: string }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '1rem' }}>
      <button
        onClick={() => dispatch(showAlert({ text: `This is the text: ${text}!`, type }))}
        style={{ cursor: 'pointer' }}
      >
        {`Show ${type} alert`}
      </button>

      <CustomSnackbar />
    </div>
  );
};

type Story = StoryObj<typeof CustomSnackbar>;

export const Basic: Story = {
  render: () => (
    <>
      <SnackbarWithTrigger type="success" text="Success Alert text" />
      <SnackbarWithTrigger type="error" text="Error Alert text" />
      <SnackbarWithTrigger type="warning" text="Warning Alert text" />
      <SnackbarWithTrigger type="info" text="Info Alert text" />
    </>
  ),
};
