import { useContext, useState } from 'react';

import { NextSeo } from 'next-seo';

import EditingToggle from '@/components/interactive/EditingToggle';
import CompactNotificationCenter from '@/components/notifications/CompactNotificationCenter';
import ReportCardsTable from '@/components/table/ReportCardsTable';
import { AppDataContext } from '@/lib/context/AppDataContext';

const Dashboard = () => {
  const { appData, setAppData } = useContext(AppDataContext);

  const [editingTable, setEditingTable] = useState(false);

  return (
    <div>
      <NextSeo title="Assignments" />

      <div className="use-responsive-width">
        <div className="mt-10" />
        <CompactNotificationCenter
          notification={
            {
              assignment: 'Unit Test',
              course: 'Geometry',
              grade: '96',
              newAverage: 100,
              oldAverage: 99,
            }
            // undefined
          }
          totalNotifications={46}
          totalMissingAssignments={1}
        />

        <div className="mt-10" />
      </div>
      <div className="overflow-visible">
        {appData ? (
          <div className="responsive-scrollable">
            <div
              className={`transition-padding duration-300 ease-in-out ${
                editingTable ? 'z-50 absolute focus px-7 py-5 rounded-lg' : ''
              }`}
            >
              <ReportCardsTable
                appData={appData}
                setAppData={setAppData}
                editingEnabled={editingTable}
                gradingPeriods={appData.gradingPeriods}
                selected={appData.selectedGradingPeriod}
                updateGradingPeriod={(arg0) => {
                  setAppData({
                    ...appData,
                    selectedGradingPeriod: arg0,
                  });
                }}
              />
              <EditingToggle
                textStart="Edit Courses"
                editing={editingTable}
                setEditing={setEditingTable}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
