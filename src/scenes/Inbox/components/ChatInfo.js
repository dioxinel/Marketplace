import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Icon from 'src/components/Icon';
import s from '../InboxView.module.scss';

export const ChatInfo = ({ fullName, text }) => (
  <div>
    <div className={s.userName}>{fullName || <Skeleton width={100} />}</div>
    <div className={s.inboxItemMessage}>
      <Icon name="inboxChatIcon" className={s.inboxChatIcon} />
      <div>{text || <Skeleton width={150} />}</div>
    </div>
  </div>
);
