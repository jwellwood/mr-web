import React from 'react';
import { blue, cyan, green, orange, yellow } from '@mui/material/colors';
import { STAT_ICONS } from '../../app/icons';
import { BiCheckCircle, BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { BsFillArrowDownCircleFill, BsPCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { FaPlayCircle, FaCircle, FaStar, FaRegStopCircle } from 'react-icons/fa';
import { ImStopwatch } from 'react-icons/im';
import { IoHandLeftSharp } from 'react-icons/io5';
import { RiStickyNote2Fill } from 'react-icons/ri';
import { theme } from '../../theme';
import { IStatIcon } from './types';

interface Props {
  icon?: IStatIcon;
  size?: string;
}

const StatIcon: React.FC<Props> = ({ icon, size = '' }) => {
  const { primary, secondary, success, error, warning } = theme.palette;
  const assist = blue[500];
  const conceded = orange[800];
  const mvp = yellow[600];
  const goal = green['A400'];
  const save = cyan[500];

  switch (icon) {
    case STAT_ICONS.APP:
      return <BiCheckCircle size={size} color={success.light} />;
    case STAT_ICONS.MINS:
      return <ImStopwatch size={size} color={primary.main} />;
    case STAT_ICONS.STARTER:
      return <FaPlayCircle size={size} color={secondary.main} />;
    case STAT_ICONS.GOAL:
      return <FaCircle size={size} color={goal} />;
    case STAT_ICONS.ASSIST:
      return <FaCircle size={size} color={assist} />;
    case STAT_ICONS.OWN_GOAL:
      return <FaCircle size={size} color={error.main} />;
    case STAT_ICONS.CONCEDED:
      return <BsFillArrowDownCircleFill size={size} color={conceded} />;
    case STAT_ICONS.PEN_SCORED:
      return <BsPCircleFill size={size} color={goal} />;
    case STAT_ICONS.PEN_MISSED:
      return <BsFillXCircleFill size={size} color={error.main} />;
    case STAT_ICONS.PEN_SAVED:
      return <IoHandLeftSharp size={size} color={save} />;
    case STAT_ICONS.SUB_IN:
      return <BiChevronRight size={size} color={success.main} />;
    case STAT_ICONS.SUB_OUT:
      return <BiChevronLeft size={size} color={error.main} />;
    case STAT_ICONS.RED_CARD:
      return <RiStickyNote2Fill size={size} color={error.main} />;
    case STAT_ICONS.YELLOW_CARD:
      return <RiStickyNote2Fill size={size} color={warning.light} />;
    case STAT_ICONS.CLEAN_SHEET:
      return <FaRegStopCircle size={size} color={save} />;
    case STAT_ICONS.MVP:
      return <FaStar size={size} color={mvp} />;
    default:
      break;
  }
};

export default StatIcon;
