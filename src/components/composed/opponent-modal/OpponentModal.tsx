import { ReactElement } from 'react';
import { IMAGE_TYPE } from '../../../constants';
import { ImageAvatar } from '../../avatars';
import CustomSkeleton from '../../loaders/custom-skeleton/CustomSkeleton';
import { PresentationModal } from '../../modals';
import { CustomTypography } from '../../typography';

interface Props {
  name: string;
  badge: string;
  loading?: boolean;
  children: ReactElement;
}

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
        fallbackIcon={IMAGE_TYPE.BADGE}
        loading={loading}
      />
      <div style={{ marginRight: '4px' }} />
      <PresentationModal
        title="Head to Head"
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
