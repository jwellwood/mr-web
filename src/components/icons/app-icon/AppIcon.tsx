import { IconType } from 'react-icons';
import {
  BiHistory,
  BiGlobe,
  BiFootball,
  BiTrophy,
  BiArrowBack,
  BiTrashAlt,
  BiCheck,
  BiCheckDouble,
  BiFlag,
} from 'react-icons/bi';
import { BsShieldShaded, BsFilter } from 'react-icons/bs';
import { FaUserCircle, FaQuestion } from 'react-icons/fa';
import { IoShieldSharp, IoHelpCircleOutline } from 'react-icons/io5';
import { LiaMedalSolid } from 'react-icons/lia';
import { MdLocationOn, MdOutlineErrorOutline, MdOutlineInfo } from 'react-icons/md';
import { TbSoccerField, TbUsers } from 'react-icons/tb';
import { TbCopy, TbCopyCheck } from 'react-icons/tb';
import { TfiMenu } from 'react-icons/tfi';
import { theme } from '../../../theme';
import { getIconColor } from '../utils/getIconColor';
import { APP_ICONS, AppIconType } from './icons';

interface Props {
  icon: AppIconType;
  size?: string;
  color?: string;
}

// Icon mapping - cleaner and more maintainable
const ICON_MAP: Record<AppIconType, IconType> = {
  [APP_ICONS.BACK]: BiArrowBack,
  [APP_ICONS.MENU]: TfiMenu,
  [APP_ICONS.FILTER]: BsFilter,
  [APP_ICONS.DELETE]: BiTrashAlt,
  [APP_ICONS.LOADING]: BiFootball,
  [APP_ICONS.OVERVIEW]: IoShieldSharp,
  [APP_ICONS.SQUAD]: TbUsers,
  [APP_ICONS.MATCHES]: TbSoccerField,
  [APP_ICONS.HISTORY]: BiHistory,
  [APP_ICONS.TROPHY]: BiTrophy,
  [APP_ICONS.MEDAL]: LiaMedalSolid,
  [APP_ICONS.AWARD]: LiaMedalSolid,
  [APP_ICONS.BADGE]: BsShieldShaded,
  [APP_ICONS.USER]: FaUserCircle,
  [APP_ICONS.NATIONALITY]: BiGlobe,
  [APP_ICONS.LOCATION]: MdLocationOn,
  [APP_ICONS.CONFIRMED]: BiCheckDouble,
  [APP_ICONS.SUBMITTED]: BiCheck,
  [APP_ICONS.PENDING]: FaQuestion,
  [APP_ICONS.DISPUTED]: MdOutlineErrorOutline,
  [APP_ICONS.CHECK]: BiCheck,
  [APP_ICONS.CROSS]: MdOutlineErrorOutline,
  [APP_ICONS.HELP]: IoHelpCircleOutline,
  [APP_ICONS.INFO]: MdOutlineInfo,
  [APP_ICONS.COPY]: TbCopy,
  [APP_ICONS.COPIED]: TbCopyCheck,
  [APP_ICONS.FLAG]: BiFlag,
};

export default function AppIcon({
  icon,
  size = '1rem',
  color = theme.palette.primary.main,
}: Props) {
  const IconComponent = ICON_MAP[icon];
  const iconColor = getIconColor(color);

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in ICON_MAP`);
    return null;
  }

  return <IconComponent size={size} color={iconColor} />;
}
