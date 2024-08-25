import React from 'react';

import styles from './Header.module.scss';

import Logo from '/Logo.svg';

const Header = () => {
  return (
    <header>
      <div className={styles.header_container}>
        <div className={styles.header_content}>
          <div>
            <img src={Logo} alt='Logo' />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
