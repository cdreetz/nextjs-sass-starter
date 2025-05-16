import styles from '@demos/DemoPricing.module.scss';

import * as React from 'react';

import Button from '@system/Button';

import { H1, H2, Lead, Text } from '@system/typography';

export default function DemoPricing(props) {
  return (
    <div className={styles.root} style={props.style}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <H2>Free to get started</H2>
          <Lead style={{ marginTop: `var(--type-scale-5)` }}>
            With pay-as-you-go pricing, and custom plans for enterprise 
          </Lead>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.content}>
              <div className={styles.top}>
                <Text>Basic usage</Text>
              </div>
              <div className={styles.bottom}>
                <H1>Free</H1>
                <Text style={{ marginBottom: 24 }}>Forever</Text>
                <Button style={{ minHeight: 48 }} href="/examples/features/authentication">
                  Sign up
                </Button>
                <ul className={styles.list}>
                  <li className={styles.listItem}>No access to paid APIs</li>
                  <li className={styles.listItem}>E-mail verification required</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.content}>
              <div className={styles.top}>
                <Text>Pay per use</Text>
              </div>
              <div className={styles.bottom}>
                <H1>$0.10</H1>
                <Text style={{ marginBottom: 24 }}>Per minute</Text>
                <Button style={{ minHeight: 48 }}>Coming soon</Button>
                <ul className={styles.list}>
                  <li className={styles.listItem}>20 minute/month free tier</li>
                  <li className={styles.listItem}>Access to paid APIs</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.content}>
              <div className={styles.top}>
                <Text>Enterprise pricing</Text>
              </div>
              <div className={styles.bottom}>
                <H1>$X</H1>
                <Text style={{ marginBottom: 24 }}>Per year</Text>
                <Button style={{ minHeight: 48 }}>Coming soon</Button>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Custom pricing</li>
                  <li className={styles.listItem}>Priority API access</li>
                  <li className={styles.listItem}>On prem deployment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
