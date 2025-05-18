'use client';

import styles from '@components/DemoBentoLayout.module.scss';
import * as React from 'react';
import { useEffect } from 'react';
import Content from '@system/layouts/Content';
import { H2, Lead } from '@system/typography';
import Pricing from '@components/Pricing';
import SimpleGrid from '@components/SimpleGrid';
import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import BentoBox from '@components/BentoBox';
import { useUser } from '@stackframe/stack';

export default function Home(props) {
  const user = useUser();

  return (
    <div className={styles.root}>
      <Navigation />
      {props.hideContent ? null : (
        <Content>
          <Lead>Analyze your calls,</Lead>
          <Lead>from every angle.</Lead>
        </Content>
      )}
      <BentoBox />
      <SimpleGrid />
      <Pricing />
      <Footer />
    </div>
  )
}