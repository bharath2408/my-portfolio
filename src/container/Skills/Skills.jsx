import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [codings, setCodings] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experience"]';
    const skillsQuery = '*[_type == "skills"]';
    const codingQuery = '*[_type == "coding"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });

    client.fetch(codingQuery).then((data) => {
      setCodings(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills, Practice & Experiences</h2>

      <div className="app__skills-container">
      <p className='bold-text'>Skills</p>
        <motion.div className="app__skills-list">
         
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
        <p className='bold-text'>Practice</p>
          {codings.map((coding) => (
            <motion.div
              className="app__skills-exp-item"
              key={coding.name}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{coding.name}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {coding.codingSkills.map((codingSkill) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={codingSkill.name}
                      key={codingSkill.name}
                    >
                      <h4 className="bold-text">{codingSkill.name}</h4>
                      <p className="p-text"><a href={codingSkill.links} className="p-texts">{codingSkill.links}</a></p>
                      <p className="p-text">{codingSkill.desc}</p>
                    </motion.div>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        <div className="app__skills-exp">
        <p className='bold-text'>Experience</p>
          {experiences.map((experience) => (
            
            <motion.div
              className="app__skills-exp-item"
              key={experience.year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                      <p className="p-text">{work.desc}</p>
                    </motion.div>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
        </div>
 
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);