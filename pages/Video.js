import { fetcher } from "../lib/utils";
import localfont from 'next/font/local'
const font1 = localfont( {src:'../public/fonts/Lobster-Regular.ttf'})

import { useEffect, useState } from 'react';
import { fetchDataWithAuthorization } from '../lib/api'
import React from "react";

import { Link} from "@nextui-org/react";
import navbarStyles from '../styles/Navbar.module.css';
import pageContainerStyles from '../styles/Home.module.css' 
import homecss from "../styles/background.module.css"
const Homepage = () => {
  
  const [data, setData] = useState(null);
  const token = process.env.NEXT_PUBLIC_TOKEN
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:1337/api/home-pages?populate=*'; // Replace with your API endpoint URL
        const fetchedData = await fetchDataWithAuthorization(url, token);
        setData(fetchedData);
      } catch (error) {
        setData(null);
      }
    };

    fetchData();
  }, []);


  if (!data) {
    return <div>Loading...</div>;
  }

  const { data: dataArray } = data;
  const firstData = dataArray[0]; // Assuming there's only one data object in the array
  const { attributes } = firstData;

  
  return (
    <div>
    {data.data.map((item) => {
        const { id, attributes } = item;
        return (
          <div >
            
  {/* <div style={{ background: 'linear-gradient(to bottom, #f4f4f4 50%, #001f3f 50%)' }}> */}
    <div className={`${homecss.homepage_background}`}>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">

         <div className={`${pageContainerStyles.container} ${pageContainerStyles.darkBlueBg}`}>
<nav className={navbarStyles.navbar}>
      <ul className={navbarStyles.navList}>
        <li className={navbarStyles.navItem}>
          <Link href="/menu">
            <a>{attributes.StartOrdering}</a>
          </Link>
        </li>
        <li className={navbarStyles.navItem}>
          <Link href="/menu">
            <a style={font1.style}>{attributes.Rewards}</a>
          </Link>
        </li>
        <li className={navbarStyles.navItem}>
          <Link href="/career">
            <a> {attributes.Careers}
           </a>
          </Link>
        </li>
        <li className={navbarStyles.navItem}>
          <Link href="/menu">
            <a>  {attributes.More}</a>
          </Link>
        </li>
      
      </ul>
    </nav>





        
          
            <h1></h1>
              {/* Display other images as needed */}
              

              {attributes.video && attributes.video.data && attributes.video.data[0] && (
                <div className="video-container">
              <video loop autoPlay style={{objectFit:"fill"}} width="750" height="200" controls muted>
                <source src='http://localhost:1337/uploads/videoplayback_c918cfd6aa.mp4' type="video/mp4"/>
                Your browser does not support the video tag.
                  </video>
              </div >
            )}
            

            
            
           
           
          </div>
         </div>
          </div>
          </div>
        );
      })}
    
      
    </div>
    
  );
};

export default Homepage;


