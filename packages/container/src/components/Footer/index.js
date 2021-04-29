import React from 'react';
import styles from '../Footer/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      {'Copyright © '}
        Your Website
      {new Date().getFullYear()}
      {'.'}
    </footer>
  )
}
export default Footer;