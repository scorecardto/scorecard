import React from 'react';

import { IoHeart } from 'react-icons/io5';

import ElementIterator from '../util/ElementIterator';
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
            <ElementIterator
              items={[
                {
                  duration: 8000,
                  element: (
                    <>Thanks for chosing Scorecard to view your grades.</>
                  ),
                },
                {
                  duration: 8000,
                  element: (
                    <>
                      Scorecard is built ethically and securely from the ground
                      up.
                    </>
                  ),
                },
                {
                  duration: 8000,
                  element: <>We will never track or run ads with your data.</>,
                },
                {
                  duration: 8000,
                  element: (
                    <>
                      Scorecard is end-to-end encrypted with publicly available
                      source code.
                    </>
                  ),
                },
                {
                  duration: 8000,
                  element: (
                    <>
                      We physically cannot access your grade data or Frontline
                      password.
                    </>
                  ),
                },
              ]}
              props={{ style: { transition: '0.3s opacity ease' } }}
              transitionDuration={750}
            />
          }
        />
      )}
    </div>
  );
}
