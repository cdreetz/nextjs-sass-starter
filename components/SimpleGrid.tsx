import styles from '@demos/DemoSimpleGrid.module.scss';

import * as React from 'react';

import Content from '@system/layouts/Content';

import { H2, H3, H4, Lead, SubLead, P } from '@system/typography';

export default function DemoSimpleGrid(props) {
  return (
    <div className={styles.root}>
      <Content align="left" margin="compact">
        <Lead style={{ marginTop: `1rem` }}>I think a cool graphic would be nice here</Lead>
      </Content>

      <section className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.contentSection}>
            <H4>Listen In</H4>
            <SubLead style={{ marginTop: `1rem` }}>
              A study or some statistic about how much uncaptured data there are in calls, only of which will grow with AI voice use.
            </SubLead>
          </div>
          <div className={styles.columnSection}>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.content}>
                  <P>
                    <strong>Speed</strong>
                  </P>
                  <P style={{ marginTop: `1rem` }}>
                    From the transcription to text processing, we have the fastest inference pipelines west of the Mississippi
                  </P>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.content}>
                  <P>
                    <strong>Pricing</strong>
                  </P>
                  <P style={{ marginTop: `1rem` }}>
                    With highly optimized data pipelines and inference services, we can process more data with less compute and as a result, charge less than comp
                  </P>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.content}>
                  <P>
                    <strong>Analytics</strong>
                  </P>
                  <P style={{ marginTop: `1rem` }}>
                    No need for data scientists, ML engineers, data analysts, and BI developers to start understanding your data, everything is built right in
                  </P>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.content}>
                  <P>
                    <strong>Open Source</strong>
                  </P>
                  <P style={{ marginTop: `1rem` }}>
                    Something about being open source
                  </P>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.content}>
                  <P>
                    <strong>Deploy anywhere</strong>
                  </P>
                  <P style={{ marginTop: `1rem` }}>
                    Something about being able to deploy the service within your own infrastructure
                  </P>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.content}>
                  <P>
                    <strong>IDK gotta come up with something</strong>
                  </P>
                  <P style={{ marginTop: `1rem` }}>
                    Something else
                  </P>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
