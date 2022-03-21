import React from 'react';

import {
  IoHeart,
  IoNotifications,
  IoCheckmarkSharp,
  IoFlash,
} from 'react-icons/io5';

import TextCard from '../card/TextCard';
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
  totalMissingAssignments,
  totalNotifications,
}: ICompactNotificationCenterProps) {
  const missingText = (missing: number) => {
    if (missing === 1) return '1 Missing Grade';
    if (missing > 1) return `${missing} Missing Grades`;
    return 'No Missing Grades';
  };

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
      <div className="flex justify-between mt-2">
        <div className="text-sm flex items-center">
          <TextCard icon={<IoNotifications />}>Notifications</TextCard>
          {totalNotifications > 0 ? (
            <div className="bg-theme-200 text-white text-xs h-5 flex items-center rounded-md px-2">
              {totalNotifications}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="text-sm">
          <TextCard
            icon={
              totalMissingAssignments > 0 ? <IoFlash /> : <IoCheckmarkSharp />
            }
          >
            {missingText(totalMissingAssignments)}
          </TextCard>
        </div>
      </div>
    </div>
  );
}
