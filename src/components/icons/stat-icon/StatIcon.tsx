import { blue, cyan, green, orange, yellow } from '@mui/material/colors';
import { BiCheckCircle, BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { BsFillArrowDownCircleFill, BsPCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { FaPlayCircle, FaCircle, FaStar, FaRegStopCircle } from 'react-icons/fa';
import { IoHandLeftSharp } from 'react-icons/io5';
import { RiStickyNote2Fill } from 'react-icons/ri';
import { IconType } from 'react-icons';
import { theme } from '../../../theme';
import { STAT_ICONS } from './icons';
import { IStatIcon } from './types';

interface Props {
  icon?: IStatIcon;
  size?: string;
}

const ICON_CONFIG: Record<IStatIcon, { Icon: IconType; color: string }> = {
  [STAT_ICONS.APP]: { Icon: BiCheckCircle, color: theme.palette.success.light },
  [STAT_ICONS.STARTER]: { Icon: FaPlayCircle, color: theme.palette.secondary.main },
  [STAT_ICONS.GOAL]: { Icon: FaCircle, color: green['A400'] },
  [STAT_ICONS.ASSIST]: { Icon: FaCircle, color: blue[500] },
  [STAT_ICONS.OWN_GOAL]: { Icon: FaCircle, color: theme.palette.error.main },
  [STAT_ICONS.CONCEDED]: { Icon: BsFillArrowDownCircleFill, color: orange[800] },
  [STAT_ICONS.PEN_SCORED]: { Icon: BsPCircleFill, color: green['A400'] },
  [STAT_ICONS.PEN_MISSED]: { Icon: BsFillXCircleFill, color: theme.palette.error.main },
  [STAT_ICONS.PEN_SAVED]: { Icon: IoHandLeftSharp, color: cyan[500] },
  [STAT_ICONS.SUB_IN]: { Icon: BiChevronRight, color: theme.palette.success.main },
  [STAT_ICONS.SUB_OUT]: { Icon: BiChevronLeft, color: theme.palette.error.main },
  [STAT_ICONS.RED_CARD]: { Icon: RiStickyNote2Fill, color: theme.palette.error.main },
  [STAT_ICONS.YELLOW_CARD]: { Icon: RiStickyNote2Fill, color: theme.palette.warning.light },
  [STAT_ICONS.CLEAN_SHEET]: { Icon: FaRegStopCircle, color: cyan[500] },
  [STAT_ICONS.MVP]: { Icon: FaStar, color: yellow[600] },
};

export default function StatIcon({ icon, size = '' }: Props) {
  if (!icon) {
    return null;
  }

  const config = ICON_CONFIG[icon];

  if (!config) {
    console.warn(`Icon "${icon}" not found in ICON_CONFIG`);
    return null;
  }

  const { Icon, color } = config;
  return <Icon size={size} color={color} />;
}
