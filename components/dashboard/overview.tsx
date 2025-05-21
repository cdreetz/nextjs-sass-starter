import * as React from 'react';
import styles from './overview.module.scss';

interface Stats {
    totalFiles: number;
    totalSize: number;
    totalDurationMinutes: number;
    lastUpdated: string;
}

const platformUpdates = [
    {
        title: "API Keys Now Available",
        description: "You can now create and manage API keys for programmatic access to our services.",
        date: "2024-03-20"
    }
];

export default function Overview() {
    const [stats, setStats] = React.useState<Stats | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/stats');
            if (!response.ok) {
                throw new Error('Failed to fetch statistics');
            }
            const data = await response.json();
            setStats(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
        } finally {
            setLoading(false);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (loading) {
        return <div className={styles.loading}>Loading statistics...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.overview}>
            <div className={styles.bento}>
                <div className={styles.row}>
                    <div className={styles.columnWide}>
                        <div className={styles.full}>
                            <section className={styles.usageStats}>
                                <h2>Usage Statistics</h2>
                                <div className={styles.statsGrid}>
                                    <div className={styles.statCard}>
                                        <h3>Audio Files Uploaded</h3>
                                        <div className={styles.statValue}>
                                            {stats?.totalFiles.toLocaleString() ?? 0}
                                        </div>
                                    </div>
                                    <div className={styles.statCard}>
                                        <h3>Total Storage Used</h3>
                                        <div className={styles.statValue}>
                                            {stats ? formatFileSize(stats.totalSize) : '0 Bytes'}
                                        </div>
                                    </div>
                                    <div className={styles.statCard}>
                                        <h3>Estimated Audio Duration</h3>
                                        <div className={styles.statValue}>
                                            {stats?.totalDurationMinutes.toLocaleString() ?? 0} minutes
                                        </div>
                                    </div>
                                </div>
                                {stats && (
                                    <div className={styles.lastUpdated}>
                                        Last updated: {new Date(stats.lastUpdated).toLocaleString()}
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                    <div className={styles.columnWide}>
                        <div className={styles.full}>
                            <section className={styles.platformUpdates}>
                                <h2>Platform Updates</h2>
                                <div className={styles.updatesList}>
                                    {platformUpdates.map((update, index) => (
                                        <div key={index} className={styles.updateCard}>
                                            <div className={styles.updateHeader}>
                                                <h3>{update.title}</h3>
                                                <span className={styles.updateDate}>{update.date}</span>
                                            </div>
                                            <p>{update.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}