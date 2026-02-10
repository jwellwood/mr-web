import { Meta, StoryObj } from '@storybook/react-vite';
import { Provider, useDispatch } from 'react-redux';
import { createStoryStore } from '../../../../.storybook/createStorybookStore';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import { IAlertType } from '../types';
import CustomAlert from './CustomAlert';

const meta: Meta<typeof CustomAlert> = {
  title: 'Alerts/CustomAlert',
  component: CustomAlert,
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

const AlertWithTrigger = ({ type, text }: { type: IAlertType; text: string }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '1rem' }}>
      <button
        onClick={() => dispatch(showAlert({ text: `This is the text: ${text}!`, type }))}
        style={{ cursor: 'pointer' }}
      >
        {`Show ${type} alert`}
      </button>

      <CustomAlert />
    </div>
  );
};

type Story = StoryObj<typeof CustomAlert>;

export const Basic: Story = {
  render: () => (
    <>
      <AlertWithTrigger type="success" text="Success Alert text" />
      <AlertWithTrigger type="error" text="Error Alert text" />
      <AlertWithTrigger type="warning" text="Warning Alert text" />
      <AlertWithTrigger type="info" text="Info Alert text" />
    </>
  ),
};
