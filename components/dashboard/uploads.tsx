import * as React from 'react';
import styles from './uploads.module.scss';

export default function Uploads() {
    const [files, setFiles] = React.useState<File[]>([]);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState<{[key: string]: number}>({});
    const [uploadError, setUploadError] = React.useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        setIsUploading(true);
        setUploadError(null);
        
        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                
                if (!response.ok) {
                    throw new Error(`Failed to upload ${file.name}`);
                }
                
                const result = await response.json();
                if (!result.success) {
                    throw new Error(`Failed to upload ${file.name}`);
                }
                
                setUploadProgress(prev => ({
                    ...prev,
                    [file.name]: 100
                }));
            }
            
            // Clear files after successful upload
            setFiles([]);
            setUploadProgress({});
        } catch (error) {
            setUploadError(error instanceof Error ? error.message : 'Failed to upload files');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={styles.overview}>
            <div className={styles.bento}>
                <div className={styles.row}>
                    <div className={styles.columnWide}>
                        <div className={styles.full}>
                            <section className={styles.uploadSection}>
                                <h2>Upload Files</h2>
                                <div 
                                    className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className={styles.dropZoneContent}>
                                        <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 16L12 8M12 8L15 11M12 8L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M3 15V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <p>Drag and drop files here, or</p>
                                        <label className={styles.fileInputLabel}>
                                            <input
                                                type="file"
                                                multiple
                                                onChange={handleFileSelect}
                                                className={styles.fileInput}
                                            />
                                            <span>Browse Files</span>
                                        </label>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className={styles.columnWide}>
                        <div className={styles.full}>
                            <section className={styles.fileList}>
                                <h2>Selected Files</h2>
                                {files.length === 0 ? (
                                    <p className={styles.noFiles}>No files selected</p>
                                ) : (
                                    <div className={styles.files}>
                                        {files.map((file, index) => (
                                            <div key={index} className={styles.fileItem}>
                                                <div className={styles.fileInfo}>
                                                    <span className={styles.fileName}>{file.name}</span>
                                                    <span className={styles.fileSize}>
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </span>
                                                </div>
                                                <button 
                                                    className={styles.removeButton}
                                                    onClick={() => removeFile(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button 
                                            className={styles.uploadButton}
                                            onClick={handleUpload}
                                            disabled={files.length === 0 || isUploading}
                                        >
                                            {isUploading ? 'Uploading...' : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
                                        </button>
                                        {uploadError && (
                                            <p className={styles.error}>{uploadError}</p>
                                        )}
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 