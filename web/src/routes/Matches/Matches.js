import React from 'react';
import Heading from 'Src/modules/Heading';
import MatchList from 'Src/modules/MatchList';
import './matches.scss';

const Matches = () => (
  <div className="matches-page">
    <Heading hideUnderline>Matches</Heading>
    <MatchList />
  </div>
);

export default Matches;
