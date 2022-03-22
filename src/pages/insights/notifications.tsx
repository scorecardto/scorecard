import React from 'react';

import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { IoHeart } from 'react-icons/io5';

import Notification from '@/components/notifications/Notification';

export default function NotificationsPage() {
  const repeatMe = (
    <Notification
      icon={<IoHeart />}
      title={<>Notifications Appear Here</>}
      content={<>Thanks for chosing Scorecard to view your grades</>}
    />
  );

  return (
    <div>
      <NextSeo title="Notifications" />
      <div className="use-responsive-width">
        <h3 className="font-medium text-lg my-4">Unread</h3>
        {Array(20)
          .fill('')
          .map((_, idx) => {
            return (
              <motion.div
                className="mt-3"
                key={idx}
                initial={{ opacity: 0, translateX: -100, translateY: -10 }}
                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                transition={{
                  type: 'spring',
                  duration: 0.5,
                  delay: 0.05 * idx,
                }}
              >
                {repeatMe}
              </motion.div>
            );
          })}

        <h3 className="font-medium text-lg my-4">Past Notifications</h3>

        {Array(20)
          .fill('')
          .map((_, idx) => {
            return (
              <motion.div
                className="mt-3"
                key={idx}
                initial={{ opacity: 0, translateX: -100, translateY: -10 }}
                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                transition={{
                  type: 'spring',
                  duration: 0.5,
                  delay: 0.05 * idx,
                }}
              >
                {repeatMe}
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'Insights',
    },
  };
}
