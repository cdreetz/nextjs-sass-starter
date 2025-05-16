import styles from '@components/BentoBox.module.scss';

export default function BentoBox() {
  return (
      <div className={styles.bento}>
        <div className={styles.row}>
          <div className={styles.columnWide}>
            <div className={styles.full}>
              <form className={styles.uploadForm}>
                <input type="file" className={styles.fileInput} />
                <button type="button" className={styles.uploadButton}>Upload and Transcribe</button>
              </form>
            </div>
          </div>
          <div className={styles.columnWide}>
            <div className={styles.full + ' ' + styles.fullDetails}>
              <div className={styles.full_header}>File Details</div>
              <ul className={styles.detailsList}>
                <li>File Name: CustomerServiceCall002</li>
                <li>File Length: 120 seconds</li>
                <li>Time to process: 10 seconds</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.columnWide}>
            <div className={styles.full}>
              <div className={styles.overviewContent}>
                <h3>Overview</h3>
                <h4>Summary of Call:</h4>
                <p>The user contacts the assistant seeking help with resetting their password. The assistant responds positively, offering to send a link to the user's email to facilitate the password reset. The user appreciates this solution, indicating that it would be perfect for them. This brief exchange showcases a straightforward customer support scenario where the assistant efficiently addresses the user's request.</p>
                <h4>Outcome of Call:</h4>
                <p>Issue resolved with no escalation.</p>
                <h4>Resulting Sentiment:</h4>
                <p>Positive</p>
                <h4>Key Terms:</h4>
                <ul>
                  <li>Email</li>
                  <li>Password</li>
                  <li>Reset</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.columnWide}>
            <div className={styles.full}>
              <div className={styles.transcriptionContent}>
                <h3>Transcription</h3>
                <div className={styles.dialogueEntry}>
                  <div className={styles.speakerTag}>assistant:</div>
                  <div className={styles.speakerText}>Hello, thank you for calling Hrai customer support, how can I help you?</div>
                </div>
                <div className={styles.dialogueEntry}>
                  <div className={styles.speakerTag}>user:</div>
                  <div className={styles.speakerText}>Hi, I can't figure out how to reset my password.</div>
                </div>
                <div className={styles.dialogueEntry}>
                  <div className={styles.speakerTag}>assistant:</div>
                  <div className={styles.speakerText}>No problem at all, I can send you a link to your email if you would like?</div>
                </div>
                <div className={styles.dialogueEntry}>
                  <div className={styles.speakerTag}>user:</div>
                  <div className={styles.speakerText}>Oh that would be perfect.</div>
                </div>
                <div className={styles.dialogueEntry}>
                  <div className={styles.speakerTag}>assistant:</div>
                  <div className={styles.speakerText}>Could you please confirm the email address associated with your account?</div>
                </div>
                <div className={styles.dialogueEntry}>
                  <div className={styles.speakerTag}>user:</div>
                  <div className={styles.speakerText}>Yes, it's [email].</div>
                </div>
                <div className={styles.dialogueEntry}>
                  <div className={styles.speakerTag}>assistant:</div>
                  <div className={styles.speakerText}>Thank you, [name]. I've sent the password reset link to your email. Please check your inbox and follow the instructions to reset your password.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}