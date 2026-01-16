import React from 'react';
import {
  BiListUl,
  BiHistory,
  BiBullseye,
  BiGlobe,
  BiFootball,
  BiBarChart,
  BiMap,
  BiBookOpen,
  BiDetail,
  BiColumns,
  BiTrophy,
  BiTime,
  BiLogIn,
  BiCheck,
  BiX,
  BiCog,
  BiPlus,
  BiMinus,
  BiArrowBack,
  BiPencil,
  BiTrashAlt,
  BiLinkExternal,
  BiLaptop,
  BiChevronDown,
  BiChevronUp,
  BiReset,
} from 'react-icons/bi';
import { FaRegFlag } from 'react-icons/fa6';
import { BsShieldShaded } from 'react-icons/bs';
import { FaUserShield, FaTshirt, FaMonument, FaUserCircle } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { GiPieChart, GiSoccerField, GiLaurelsTrophy, GiTrophyCup } from 'react-icons/gi';
import { GrInstagram } from 'react-icons/gr';
import { HiHome, HiViewGrid } from 'react-icons/hi';
import { IoMdPodium, IoMdPeople } from 'react-icons/io';
import { LiaMedalSolid } from 'react-icons/lia';
import { MdLocationOn } from 'react-icons/md';
import { BsFilter, BsFillFilterCircleFill } from 'react-icons/bs';

import { RiBarChartHorizontalFill, RiArrowUpDownLine, RiUserStarLine } from 'react-icons/ri';
import { TfiMenu } from 'react-icons/tfi';
import * as icons from '.';
import { IIconType } from './types';
import { getIconColor } from './utils/getIconColor';
import { theme } from '../../theme';

interface Props {
  icon: IIconType;
  size?: string;
  color?: string;
  bold?: boolean;
}

const AppIcon: React.FC<Props> = ({ icon, size = '1rem', color = theme.palette.primary.main }) => {
  const iconColor = getIconColor(color);

  switch (icon) {
    case icons.homeIcon:
      return <HiHome size={size} color={iconColor} />;
    case icons.profileIcon:
    case icons.userIcon:
      return <FaUserCircle size={size} color={iconColor} />;
    case icons.squadIcon:
    case icons.usersIcon:
      return <IoMdPeople size={size} color={iconColor} />;
    case icons.resultsIcon:
      return <BiFootball size={size} color={iconColor} />;
    case icons.statsIcon:
      return <BiListUl size={size} color={iconColor} />;
    case icons.teamIcon:
      return <BsShieldShaded size={size} color={iconColor} />;
    case icons.leagueIcon:
      return <GiTrophyCup size={size} color={iconColor} />;
    case icons.historyIcon:
      return <BiHistory size={size} color={iconColor} />;
    case icons.moreIcon:
      return <HiViewGrid size={size} color={iconColor} />;
    case icons.adminIcon:
      return <FaUserShield size={size} color={iconColor} />;
    case icons.targetsIcon:
      return <BiBullseye size={size} color={iconColor} />;
    case icons.leaderboardIcon:
      return <IoMdPodium size={size} color={iconColor} />;
    case icons.nationalityIcon:
      return <BiGlobe size={size} color={iconColor} />;
    case icons.teamTargetsIcon:
      return <RiBarChartHorizontalFill size={size} color={iconColor} />;
    case icons.averagesIcon:
      return <GiPieChart size={size} color={iconColor} />;
    case icons.graphIcon:
      return <BiBarChart size={size} color={iconColor} />;
    case icons.versusIcon:
      return <RiArrowUpDownLine size={size} color={iconColor} />;
    case icons.cityIcon:
      return <BiMap size={size} color={iconColor} />;
    case icons.locationIcon:
      return <MdLocationOn size={size} color={iconColor} />;
    case icons.stadiumIcon:
      return <GiSoccerField size={size} color={iconColor} />;
    case icons.foundedIcon:
      return <BiBookOpen size={size} color={iconColor} />;
    case icons.kitsIcon:
      return <FaTshirt size={size} color={iconColor} />;
    case icons.summaryIcon:
      return <BiDetail size={size} color={iconColor} />;
    case icons.divisionIcon:
      return <BiColumns size={size} color={iconColor} />;
    case icons.competitionIcon:
    case icons.trophyIcon:
      return <BiTrophy size={size} color={iconColor} />;
    case icons.medalIcon:
      return <LiaMedalSolid size={size} color={iconColor} />;
    case icons.pastPlayerIcon:
      return <GiLaurelsTrophy size={size} color={iconColor} />;
    case icons.timeIcon:
      return <BiTime size={size} color={iconColor} />;
    case icons.pastIcon:
      return <RiUserStarLine size={size} color={iconColor} />;
    case icons.hallOfFameIcon:
      return <FaMonument size={size} color={iconColor} />;
    case icons.instagramIcon:
      return <GrInstagram size={size} color={iconColor} />;
    case icons.signinIcon:
      return <BiLogIn size={size} color={iconColor} />;
    case icons.settingsIcon:
      return <BiCog size={size} color={iconColor} />;
    case icons.addIcon:
    case icons.plusIcon:
      return <BiPlus size={size} color={iconColor} />;
    case icons.minusIcon:
      return <BiMinus size={size} color={iconColor} />;
    case icons.editIcon:
      return <BiPencil size={size} color={iconColor} />;
    case icons.deleteIcon:
      return <BiTrashAlt size={size} color={iconColor} />;
    case icons.backIcon:
      return <BiArrowBack size={size} color={iconColor} />;
    case icons.doneIcon:
      return <BiCheck size={size} color={iconColor} />;
    case icons.checkIcon:
      return <BiCheck size={size} color={theme.palette.success.main || iconColor} />;
    case icons.todoIcon:
      return <BiX size={size} color={iconColor} />;
    case icons.lockedIcon:
      return <FiLock size={size} color={iconColor} />;
    case icons.websiteIcon:
      return <BiLaptop size={size} color={iconColor} />;
    case icons.linkIcon:
      return <BiLinkExternal size={size} color={iconColor} />;
    case icons.chevronUpIcon:
      return <BiChevronUp size={size} color={iconColor} />;
    case icons.chevronDownIcon:
      return <BiChevronDown size={size} color={iconColor} />;
    case icons.resetIcon:
      return <BiReset size={size} color={iconColor} />;
    case icons.menuIcon:
      return <TfiMenu size={size} color={iconColor} />;
    case icons.flag:
      return <FaRegFlag size={size} color={iconColor} />;
    case icons.filter:
      return <BsFilter size={size} color={iconColor} />;
    case icons.filterApplied:
      return <BsFillFilterCircleFill size={size} color={iconColor} />;

    default:
      break;
  }
};

export default AppIcon;
