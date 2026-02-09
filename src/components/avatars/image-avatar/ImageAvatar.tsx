import Avatar from '@mui/material/Avatar';
import { getThemeColorByType } from '../../../utils';
import { AppIcon, AppIconType } from '../../icons';
import CustomSkeleton from '../../loaders/CustomSkeleton';

interface Props {
  fallbackIcon?: AppIconType;
  size?: string;
  iconSize?: string;
  centered?: boolean;
  imageUrl?: string;
  alt?: string;
  loading?: boolean;
}

export default function ImageAvatar({
  fallbackIcon = 'user',
  centered,
  size = '30px',
  iconSize,
  imageUrl,
  alt,
  loading,
}: Props) {
  const hasUrl = imageUrl && imageUrl !== 'default';

  return loading ? (
    <CustomSkeleton variant="circular" width={size} height={size} margin="0" />
  ) : (
    <Avatar
      src={imageUrl}
      alt={alt}
      sx={{
        height: size,
        width: size,
        bgcolor: hasUrl ? 'transparent' : getThemeColorByType('secondary'),
        margin: centered ? 'auto' : 'inherit',
      }}
    >
      <AppIcon icon={fallbackIcon} color="white" size={iconSize} />
    </Avatar>
  );
}
