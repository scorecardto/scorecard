import React from 'react';

import { IoTrendingUp, IoTrendingDown, IoPulse } from 'react-icons/io5';

import Notification from './Notification';

export type INotificationProps = {
  course: string;
  grade: string;
  assignment: string;
  oldAverage?: number;
  newAverage?: number;
};

export default function GradeNotification({
  course,
  grade,
  assignment,
  oldAverage,
  newAverage,
}: INotificationProps) {
  return (
    <Notification
      icon={(() => {
        if (oldAverage != null && newAverage != null) {
          if (oldAverage > newAverage) {
            return <IoTrendingDown />;
          }
          if (oldAverage < newAverage) {
            return <IoTrendingUp />;
          }
        }
        return <IoPulse />;
      })()}
      title={<>{course}</>}
      content={
        <>
          {`You recieved a${
            grade.length >= 1 && // ensure string isnt empty
            ['a', 'e', 'i', 'o', 'u', '8'].includes(
              // if string starts with a vowel
              grade.substring(0, 1).toLowerCase()
            )
              ? 'n'
              : ''
          } ${grade} on `}
          <b className="font-semibold">{assignment}</b>
          {oldAverage != null &&
          newAverage != null &&
          oldAverage !== newAverage ? (
            <>
              {`, and your average ${
                oldAverage < newAverage ? 'rose from ' : 'dropped from '
              }`}
              <b className="inline-block font-semibold">
                {oldAverage} to {newAverage}
              </b>
            </>
          ) : (
            ` in ${course}`
          )}
        </>
      }
    />
  );
}
