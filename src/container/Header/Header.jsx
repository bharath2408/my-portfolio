import React, {useEffect, useState} from 'react'

import { motion } from 'framer-motion';
import {urlFor, client} from '../../client'
import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss'

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Header = () => {

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const query = '*[_type == "profiles"]';

    client.fetch(query).then((data) => {
      setProfiles(data);
    })
  }, [])


  return (
    <div className="app__header app__flex">
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="app__header-info"
    >

      {profiles.map((profile, index) =>(  
       <div className="app__header-badge" key={index}>
          <div className="badge-cmp app__flex">
          <span>👋</span>
          <div style={{ marginLeft: 20 }}>
            <p className="p-text">Hello, I am</p>
            <h1 className="head-text">{profile.name}</h1>
            <h1 className="head-text">{profile.lastName}</h1>
          </div>
        </div>

        <div className="tag-cmp app__flex">
          <p className="p-text">{profile.description}</p>
          <p className="p-texts">Download  
           <a href={profile.resumeUrl} className="p-texts" style={{textDecoration: 'none'}}> {profile.resumeTitle}</a>
          </p>
          <p className="p-texts">  
           <a href={profile.gitLink} className="p-texts" style={{textDecoration: 'none'}}> {profile.git}</a>
          </p>
        </div>
      </div>
       ))}
  
    </motion.div>

      <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__header-img"
      >
      {profiles.map((profile, index) =>(
      <img src={urlFor(profile.profileImg)} alt="profile_bg" key={index}/>
      ))}
      <motion.img
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        src={images.circle}
        alt="profile_circle"
        className="overlay_circle"
        />
    </motion.div>

    <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles"
    >
      {[images.react, images.javascript, images.java].map((circle, index) => (
        <div className="circle-cmp app__flex" key={`circle-${index}`}>
          <img src={circle} alt="profile_bg" />
        </div>
      ))}
    </motion.div>
  </div>
  )
}

export default AppWrap(Header, 'home');