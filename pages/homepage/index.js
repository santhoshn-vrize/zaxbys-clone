import React, { useState, useEffect } from 'react';
import styles from './homepage.module.css';
import Video from '../Video'
// import Navigation from '../homepage1/Navigation'

const MenuCards = () => {
  const [menuData, setMenuData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN; // Replace with your actual authentication token

    fetch('http://localhost:1337/api/homepage-menus?populate=*', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setMenuData(data.data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div className="error-message">An error occurred: {error}</div>;
  }

  return (
    <div>
     
     <Video/>
    <div className={styles.cardContainerCenter}>
      
    {menuData.map((menuCategory) => (
      <div className={styles.card} key={menuCategory.id}>
        <a
           href={`/menu#Category-${menuCategory.attributes.MenuCategoryName}`} // Replace with the actual link URL
          className={styles.link}
        >
          <img
            src={`http://localhost:1337${menuCategory.attributes.MenuCategoryImage.data[0].attributes.url}`}
            alt={menuCategory.attributes.MenuCategoryName}
          />
        <h2 className={styles.smallFont}>
              {menuCategory.attributes.MenuCategoryName}
            </h2>
          
        </a>
      </div>
    ))}
  </div>
  </div>
  );
};

export default MenuCards;
