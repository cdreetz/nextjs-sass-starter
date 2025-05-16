import styles from '@components/Navigation.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import ModalNavigation from '@root/demos/modals/ModalNavigation';

import { useModals } from '@root/system/modals/ModalContext';
import ModalNavigationV2 from '@root/demos/modals/ModalNavigationV2';

export default function Navigation() {
  const modals = useModals();

  return (
    <nav className={styles.root}>
      <section className={styles.left}>
        <a href="/" className={styles.item}>
          Dialstructure
        </a>
      </section>
      <section className={styles.stretch}>
        <a className={styles.item} href="/">
          Product
        </a>
        <a className={styles.item} href="/">
          Pricing
        </a>

      </section>
      <section className={styles.right}>
        <span
          className={styles.item}
          id="site-navigation-button"
          onClick={() => modals.open(ModalNavigationV2, { parentId: 'site-navigation-button' })}
          data-detector-ignore-navigation
        >
          Sign in
        </span>
      </section>
    </nav>
  );
}
