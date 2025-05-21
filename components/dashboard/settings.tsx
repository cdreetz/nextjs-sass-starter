import { AccountSettings } from '@stackframe/stack';
import styles from './settings.module.scss';

export default function SettingsPage() {
    return (
        <div className={styles.settingsContainer}>
            <AccountSettings />
        </div>
    )
}