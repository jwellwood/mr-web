import React from 'react';
import { Avatar, ListItemAvatar } from '@mui/material';
import AppIcon from '../icons/AppIcon';

interface Props {
  primaryColor: string;
  secondaryColor: string;
  isList?: boolean;
}

const OpponentAvatar: React.FC<Props> = ({ primaryColor, secondaryColor, isList }) => {
  const avatar = (
    <Avatar
      style={{
        background: primaryColor,
        border: `2px solid ${secondaryColor}`,
      }}
    >
      <AppIcon icon="team" color={secondaryColor} />
    </Avatar>
  );

  return isList ? <ListItemAvatar>{avatar}</ListItemAvatar> : avatar;
};

export default OpponentAvatar;
