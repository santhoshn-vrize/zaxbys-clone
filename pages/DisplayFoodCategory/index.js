import { useEffect, useState } from 'react';
import styles from './Category.module.css';
import { useRouter } from 'next/router';

function HomePage() {
  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = "http://localhost:1337/api/homepage-menus?populate=*"; // Replace with your API endpoint
  const token = process.env.NEXT_PUBLIC_TOKEN; // Replace with your token

  useEffect(() => {
    async function fetchMenuCategories() {
      try {
        const response = await fetch(`${apiUrl}/menu-categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch menu categories");
        }
        const data = await response.json();
        setMenuCategories(data.data);
      } catch (error) {
        console.error("Error fetching menu categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenuCategories();
  }, [token]);

  const router = useRouter();
  const handleButtonClick = (CategorySlug, slug) => {
    console.log('CategorySlug:', CategorySlug);
    console.log('slug:', slug);
    const targetURL = `/menu/${CategorySlug}/${slug}`;
    console.log('Target URL:', targetURL);
   router.push(targetURL);
  };


  return (
    <div>
    <h1>Menu Categories</h1>
    {loading ? (
      <p>Loading menu categories...</p>
    ) : (
      <div className={styles['card-container']}>
        {menuCategories.length > 0 ? (
          menuCategories.map((category) => (
            <div key={category.id} className={styles['category-card']}>
              <div className={styles['category-info']}>
                <h2>{category.attributes.Category}</h2>
              </div>

              {category.attributes.CategoryField &&
                category.attributes.CategoryField.data.map((field) => (
                  <div key={field.id} className={styles['field-card']}>
                    <div className={styles['field-details']}>
                    <img
                      src={`http://localhost:1337${field.attributes.Image.data.attributes.url}`}
                      alt={field.attributes.Title}
                      className={styles['field-image']}
                    />
                      <h3>{field.attributes.Title}</h3>
                      <p>Price: {field.attributes.Price}</p>
                      <p>Calories: {field.attributes.Calories}</p>
                    </div>

                    
                                   
                      <button className={styles['order-button']} onClick={() =>handleButtonClick(category.attributes.CategorySlug, field.attributes.slug) }>Choose</button>
                    

                    
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p>No menu categories available.</p>
        )}
      </div>
    )}
  </div>

  );
}

export default HomePage;
