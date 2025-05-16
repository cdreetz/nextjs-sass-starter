import styles from '@system/layouts/Content.module.scss';

import * as React from 'react';

interface ContentProps {
  children: React.ReactNode;
  align?: 'center' | 'left';
  margin?: 'default' | 'compact';
}

export default function Content({ children, align = 'center', margin = 'default' }: ContentProps) {
  return (
    <div className={`${styles.root} ${styles[align]} ${styles[margin]}`}>
      {children}
    </div>
  );
}
