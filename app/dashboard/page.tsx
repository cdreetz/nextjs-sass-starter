'use client'

import * as React from 'react';
import styles from './page.module.scss';
import Navigation from '@components/Navigation';
import DashboardWithSidebarLayout from '@components/DashboardWithSidebarLayout';
import DemoSidebarLayout from '@components/DemoSidebarLayout';
import Overview from '@components/dashboard/overview';
import Uploads from '@components/dashboard/uploads';
import AudioFiles from '@components/dashboard/audio-files';
import SettingsPage from '@components/dashboard/settings';

import { useUser } from '@stackframe/stack';

export default function DashboardPage() {
    useUser({ or: 'redirect' });
    const [activeItem, setActiveItem] = React.useState('Overview');
    
    const renderContent = () => {
        switch (activeItem) {
            case 'Overview':
                return <Overview />;
            case 'Uploads':
                return <Uploads />;
            case 'Files':
                return <AudioFiles />;
            case 'Settings':
                return <SettingsPage />;
            default:
                return <Overview />;
        }
    };

    const sidebarElement = <DemoSidebarLayout onItemClick={setActiveItem} activeItem={activeItem} />
    
    return (
        <div>
            <Navigation />
            <DashboardWithSidebarLayout sidebar={sidebarElement}>
                <div className={styles.dashboardContent}>
                    {renderContent()}
                </div>
            </DashboardWithSidebarLayout>
        </div>
    )
}