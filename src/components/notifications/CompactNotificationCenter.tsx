import React from 'react';

import Link from 'next/link';
import { IoFlash, IoHeart, IoNotifications } from 'react-icons/io5';

import NumberTextCard from '../card/NumberTextCard';
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
      <div className="flex justify-between mt-2 flex-wrap gap-2">
        <div className="text-sm flex items-center">
          <Link href={'/insights/notifications'}>
            <a>
              <NumberTextCard
                icon={<IoNotifications />}
                number={totalNotifications}
              >
                Notifications
              </NumberTextCard>
            </a>
          </Link>
        </div>
        <div className="text-sm">
          <NumberTextCard icon={<IoFlash />} number={totalMissingAssignments}>
            {totalMissingAssignments >= 1
              ? 'Missing Assignments'
              : 'No Missing Assignments'}
          </NumberTextCard>
        </div>
      </div>
    </div>
  );
}
