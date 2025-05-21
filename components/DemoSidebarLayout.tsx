import styles from '@components/DemoSidebarLayout.module.scss';

import * as React from 'react';
import { useUser } from '@stackframe/stack';

import { H1, H2, H3, H4, Lead, SubLead, P, Title, Text, SubTitle, SubText, UnitLabel } from '@system/typography';

const Item = ({ active, onClick, children }) => {
  let style = {};
  let squareStyle = {};
  if (active) {
    style = { opacity: 1 };
    squareStyle = { background: `var(--theme-border)` };
  }

  return (
    <li className={styles.item} style={style} onClick={onClick}>
      <span className={styles.left}>
        <figure className={styles.square} style={squareStyle}></figure>
      </span>
      <span className={styles.right}>{children}</span>
    </li>
  );
};

const SubItem = (props) => {
  let style = {};
  let squareStyle = {};
  if (props.active) {
    style = { opacity: 1 };
    squareStyle = { background: `var(--theme-border)` };
  }

  return (
    <li className={styles.subItem} style={style}>
      <span className={styles.left}>
        <figure className={styles.subSquare} style={squareStyle}></figure>
      </span>
      <span className={styles.right}>{props.children}</span>
    </li>
  );
};

interface DemoSidebarLayoutProps {
  onItemClick: (item: string) => void;
  activeItem: string;
}

export default function DemoSidebarLayout({ onItemClick, activeItem }: DemoSidebarLayoutProps) {
  const user = useUser({ or: 'redirect' });

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Item active={activeItem === 'Overview'} onClick={() => onItemClick('Overview')}>Overview</Item>
        <Item active={activeItem === 'Uploads'} onClick={() => onItemClick('Uploads')}>Upload</Item>
        <Item active={activeItem === 'Files'} onClick={() => onItemClick('Files')}>Files</Item>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <figure className={styles.largeSquare}>☺</figure>
        </div>
        <div className={styles.bottomRight} onClick={() => onItemClick('Settings')} style={{ cursor: 'pointer' }}>
          <SubTitle>{user.displayName}</SubTitle>
          <SubText style={{ marginTop: 4 }}>Your Account</SubText>
        </div>
        <div className={styles.left}>
          <figure className={styles.square} style={{ marginRight: 8, marginLeft: 8 }}>
            ♲
          </figure>
        </div>
      </div>
    </div>
  );
}
