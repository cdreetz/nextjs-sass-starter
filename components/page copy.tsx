'use client'

import * as React from 'react';

import Navigation from '@components/Navigation';
import DashboardWithSidebarLayout from '@components/DashboardWithSidebarLayout';

export default function DashboardPage() {
    return (
        <div>
            <Navigation />
            <DashboardWithSidebarLayout>
                <div>
                    <h1>Dashboard</h1>
                </div>
            </DashboardWithSidebarLayout>
        </div>
    )
}