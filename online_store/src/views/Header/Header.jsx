import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import styles from './header.module.scss';
import logo from '../../assets/images/logo.png';

export default function Header() {
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.header_top}>
        <section className={styles.address_top}>
          <p>Georgiou &#39;A 87, Germasogeia</p>
        </section>
        <section className={styles.logotype}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.company_name}>
            <p className={styles.our_name}>BERRY BOUQUETS</p>
            <p className={styles.slogan}>DON’T WORRY - EAT BERRY</p>
          </div>
        </section>
        <section className={styles.contacts}>
          <div className={styles.time}>
            <p>
              Время работы:
            </p>
            <p>
              пн-вс 24 часа
            </p>
          </div>
          <div className={styles.phone_number}>
            <PhoneOutlined className={styles.symbol} />
            <MailOutlined className={styles.envelope} />
          </div>
          <div className={styles.phone}>
            <p>
              8 800 111 22 33
            </p>
            <p>
              Звонок бесплатный
            </p>
            <p>
              info@berry_bouquets.com
            </p>
          </div>
        </section>
      </div>
      <Menu mode="horizontal" className={styles.header}>
        <NavLink to="/">
          <Menu.Item key="home" id={styles.btn} className={styles.menu__item}>Главная</Menu.Item>
        </NavLink>
        <NavLink to="/about">
          <Menu.Item key="about" id={styles.btn} className={styles.menu__item}>О нас</Menu.Item>
        </NavLink>
        <NavLink to="/orderlist">
          <Menu.Item key="orderlist" id={styles.btn} className={styles.menu__item}>Заказы</Menu.Item>
        </NavLink>
        <NavLink to="/cart">
          <Menu.Item key="cart" id={styles.btn} className={styles.menu__item}>Корзина</Menu.Item>
        </NavLink>
      </Menu>
    </div>

  );
}
