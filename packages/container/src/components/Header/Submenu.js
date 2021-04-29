import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut,FiHome,FiMoreVertical } from 'react-icons/fi';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiCustomize } from "react-icons/bi";
import { TiArrowSortedDown } from "react-icons/ti";
import styles from './submenu.module.css';
import { useTransaction } from '../../hooks/useTransaction';

export default () => {
  const {handleLogout} = useTransaction();
  const [menuToggle, setMenuToggle] = useState(false);

  const handleClick = useCallback(() => {
    setMenuToggle(state => !state)
  },[])

  return (
    <>
      <span className={styles.iconSvg}>
      <TiArrowSortedDown size={20} 
      className={menuToggle ? styles.first : ''}
      onClick={handleClick}
      />
      </span>
      {menuToggle && (
        <div className={styles.dataDropdown}>
          <div className={styles.overley} onClick={handleClick}></div>
          <ul className={styles.dropdownMenu}>
            <Link to="/" className={styles.li}>
              <FiHome/>Home
            </Link>
            <Link to="/dashboard" className={styles.li}>
              <BiCustomize/>Dashboard
            </Link>
            <Link to="/" className={styles.li}>
              <AiOutlineInfoCircle/>sobre
            </Link>
            <Link to="/auth/signin" 
            onClick={handleLogout} 
            className={styles.li}>
             <FiLogOut />Sair
            </Link>
          </ul>
      </div>
      )}
    </>
  )
}