// components/DefaultMenuBar.js
import { useState, useEffect } from 'react';
import styles from '../styles/DefaultMenuBar.module.css'; // Import your CSS module

const DefaultMenuBar = () => {
  const [menus, setMenus] = useState([]);
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_DEFAULTMENUBAR_URL;

  useEffect(() => {
    async function fetchMenus() {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setMenus(data.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    }

    fetchMenus();
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.menuGrid}>
          {menus.map((menu) => (
            <span key={menu.id} className={styles.menuItem}>
              {menu.attributes.MenuBarTitle}
            </span>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DefaultMenuBar;
