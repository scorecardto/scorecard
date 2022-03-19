import React from 'react';

import { IoHeart } from 'react-icons/io5';

import GradeNotification, { INotificationProps } from './GradeNotification';
import Notification from './Notification';

type ICompactNotificationCenterProps = {
  notification?: INotificationProps;
  totalNotifications: number;
  totalMissingAssignments: number;
};

export default function CompactNotificationCenter({
  notification,
}: ICompactNotificationCenterProps) {
  return (
    <div>
      {notification ? (
        <GradeNotification {...notification} />
      ) : (
        <Notification
          icon={<IoHeart />}
          title={<>Notifications Appear Here</>}
          content={
            <>By the way, we will never track or run ads with your data.</>
          }
        />
      )}
    </div>
  );
}
