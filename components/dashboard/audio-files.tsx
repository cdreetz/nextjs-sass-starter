import * as React from 'react';
import styles from './audio-files.module.scss';

interface AudioFile {
    key: string;
    size: number;
    lastModified: string;
    url: string;
}

export default function AudioFiles() {
    const [files, setFiles] = React.useState<AudioFile[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [currentlyPlaying, setCurrentlyPlaying] = React.useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = React.useState<Set<string>>(new Set());

    React.useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await fetch('/api/files');
            if (!response.ok) {
                throw new Error('Failed to fetch files');
            }
            const data = await response.json();
            setFiles(data.files);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch files');
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const handlePlay = (url: string) => {
        setCurrentlyPlaying(url);
    };

    const handleAudioEnded = () => {
        setCurrentlyPlaying(null);
    };

    const toggleFileSelection = (fileKey: string) => {
        setSelectedFiles(prev => {
            const newSet = new Set(prev);
            if (newSet.has(fileKey)) {
                newSet.delete(fileKey);
            } else {
                newSet.add(fileKey);
            }
            return newSet;
        });
    };

    const handleSelectAll = () => {
        if (selectedFiles.size === files.length) {
            setSelectedFiles(new Set());
        } else {
            setSelectedFiles(new Set(files.map(file => file.key)));
        }
    };

    const handleTranscribeSelected = async () => {
        // TODO: Implement transcription logic
        console.log('Transcribing files:', Array.from(selectedFiles));
    };

    if (loading) {
        return <div className={styles.loading}>Loading audio files...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.actionBar}>
                <div className={styles.actionBarLeft}>
                    <button 
                        className={styles.actionButton}
                        onClick={handleSelectAll}
                    >
                        {selectedFiles.size === files.length ? 'Deselect All' : 'Select All'}
                    </button>
                </div>
                <div className={styles.actionBarRight}>
                    <button 
                        className={styles.actionButton}
                        onClick={handleTranscribeSelected}
                        disabled={selectedFiles.size === 0}
                    >
                        Transcribe Selected ({selectedFiles.size})
                    </button>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.checkboxColumn}></th>
                            <th>File Name</th>
                            <th>Size</th>
                            <th>Last Modified</th>
                            <th>Status</th>
                            <th>Transcription</th>
                            <th>Audio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.length === 0 ? (
                            <tr>
                                <td colSpan={7} className={styles.noFiles}>
                                    No audio files found
                                </td>
                            </tr>
                        ) : (
                            files.map((file) => (
                                <tr key={file.key} className={styles.tableRow}>
                                    <td className={styles.checkboxColumn}>
                                        <input
                                            type="checkbox"
                                            checked={selectedFiles.has(file.key)}
                                            onChange={() => toggleFileSelection(file.key)}
                                            className={styles.checkbox}
                                        />
                                    </td>
                                    <td className={styles.fileName}>
                                        {file.key.split('-').pop()}
                                    </td>
                                    <td>{formatFileSize(file.size)}</td>
                                    <td>{formatDate(file.lastModified)}</td>
                                    <td className={styles.status}>Not processed</td>
                                    <td className={styles.transcription}></td>
                                    <td className={styles.actions}>
                                        <audio
                                            src={file.url}
                                            controls
                                            onPlay={() => handlePlay(file.url)}
                                            onEnded={handleAudioEnded}
                                            className={styles.audioPlayer}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 