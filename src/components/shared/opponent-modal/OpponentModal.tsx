import { ReactElement } from 'react';
import { ImageAvatar } from '../../avatars';
import { PresentationModal } from '../../modals';
import { IMAGE_TYPE } from '../../../constants';
import { CustomTypography } from '../../typography';
import CustomSkeleton from '../../loaders/CustomSkeleton';

type Props = {
  name: string;
  badge: string;
  loading: boolean;
  children: ReactElement;
};

export default function OpponentModal({ children, name, badge, loading }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <ImageAvatar
        size="24px"
        imageUrl={badge || 'default'}
        fallbackIcon={IMAGE_TYPE.TEAM}
        loading={loading}
      />
      <div style={{ marginRight: '4px' }} />
      <PresentationModal
        title="Head to Head"
        fullScreen
        buttonElement={
          loading ? (
            <CustomSkeleton width="100px" />
          ) : (
            <CustomTypography size="xs" color="data" bold>
              {name}
            </CustomTypography>
          )
        }
      >
        {children}
      </PresentationModal>
    </div>
  );
}
