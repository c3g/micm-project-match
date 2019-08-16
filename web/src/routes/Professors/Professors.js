import React from 'react';
import Heading from 'Src/modules/Heading';
import ProfessorList from 'Src/modules/ProfessorList';
import './professors.scss';

const Professors = () => (
  <div className="professors-page">
    <Heading hideUnderline>Professors</Heading>
    <ProfessorList />
  </div>
);

export default Professors;
