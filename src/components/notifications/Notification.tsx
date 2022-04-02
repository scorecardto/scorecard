import React from 'react';

type INotificationProps = {
  icon?: JSX.Element;
  title: JSX.Element;
  content: JSX.Element;
};

export default function Notification({
  icon,
  title,
  content,
}: INotificationProps) {
  return (
    <div className="border border-day-300 dark:border-night-300 py-4 px-6 rounded-md flex items-center">
      {icon ? (
        <div className="text-3xl text-theme-200 mr-6">{icon}</div>
      ) : (
        <></>
      )}
      <div>
        <p className="text-day-500 dark:text-night-500">{title}</p>
        <p className="text-day-400 dark:text-night-400 my-1">{content}</p>
      </div>
    </div>
  );
}
