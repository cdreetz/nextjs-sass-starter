import styles from '@components/Navigation.module.scss';
import * as React from 'react';
import * as Utilities from '@common/utilities';
import ModalNavigation from '@root/demos/modals/ModalNavigation';
import { useModals } from '@root/system/modals/ModalContext';
import ModalNavigationV2 from '@root/demos/modals/ModalNavigationV2';
import { useUser } from '@stackframe/stack';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const modals = useModals();
  const user = useUser();
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <nav className={styles.root}>
      <section className={styles.left}>
        <a href="/" className={styles.item}>
          Dialstructure
        </a>
      </section>
      <section className={styles.stretch}>
        {!isDashboard && (
          <>
            <a className={styles.item} href="/">
              Product
            </a>
            <a className={styles.item} href="/">
              Pricing
            </a>
            {user && (
              <a className={styles.item} href="/dashboard">
                Dashboard
              </a>
            )}
          </>
        )}
      </section>
      <section className={styles.right}>
        <a
          className={styles.item}
          id="site-navigation-button"
          href={user ? "/handler/signout" : "/handler/signup"}
          data-detector-ignore-navigation
        >
          {user ? "Sign out" : "Sign in"}
        </a>
      </section>
    </nav>
  );
}
