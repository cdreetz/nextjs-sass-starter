import styles from '@components/Footer.module.scss';

import * as React from 'react';

import Button from '@system/Button';
import Input from '@system/Input';

import { H2, P } from '@system/typography';

export default function Footer(props) {
  return (
    <footer className={styles.root} style={props.style}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.form}>
            <H2>Dialstructure</H2>
            <P style={{ marginTop: `1rem` }}>
              Dialstructure is the place to understand your audio.
            </P>
            <Input style={{ marginTop: `2rem` }} placeholder="someone@msn.com" />
            <Button
              style={{ marginTop: `1rem` }}
              onClick={() => {
                alert('TODO: implement onSubmit');
              }}
            >
              Submit
            </Button>
          </div>
        </div>
        <div className={styles.subColumn}>
          <div className={styles.subTitle}>Company</div>
          <a href="/examples/components/forms" className={styles.item}>
            About
          </a>
          <a href="/examples/components/table" className={styles.item}>
            Contact
          </a>
        </div>
        <div className={styles.subColumn}>
          <div className={styles.subTitle}>Open Source</div>
          <a href="/examples/features/services" className={styles.item}>
            Web
          </a>
          <a href="/examples/features/threads" className={styles.item}>
            Inference
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <a href="https://txt.dev/wwwjim/intdev-privacy-policy" className={styles.subItem} target="_blank">
            Privacy Policy
          </a>
          <a href="https://txt.dev/wwwjim/intdev-terms-of-service" className={styles.subItem} target="_blank">
            Terms of Service
          </a>
        </div>
        <div className={styles.right}>
          <a href="https://wireframes.internet.dev/" className={styles.subItem} target="_blank">
            Template
          </a>
          <a href="https://internet.dev" className={styles.subItem} target="_blank">
            Shoutout INTDEV
          </a>
        </div>
      </div>
    </footer>
  );
}
