import React from 'react';
import PropTypes from 'prop-types';
import './projectListItem.scss';
import { Link } from 'react-router-dom';
import { identity } from 'ramda';

const name = (firstName, lastName) =>
  firstName && lastName
    ? ` ${firstName} ${lastName}`
    : firstName
    ? ` ${firstName}`
    : lastName
    ? ` ${lastName}`
    : '';

const ProjectListItem = ({
  project: { firstName, lastName, title, abstract, id, authorId, tags }
}) => (
  <div className="project-list-item">
    <Link to={`/project/${id}`} className="details">
      <div className="title">{title}</div>
      <div className="abstract">
        {abstract.substring(0, 335)}
        {abstract.length > 335 ? '...' : ''}
      </div>
    </Link>
    {(firstName || lastName) && (
      <div className="by">
        <span>Project by</span>
        <Link to={`/user/${authorId}`}>{name(firstName, lastName)}</Link>
      </div>
    )}
    <div className="tags">
      {tags &&
        tags
          .filter(identity)
          .map((tag, i) => <div key={`tag_${i}`}>{tag}</div>)}
    </div>
  </div>
);

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    title: PropTypes.string.isRequired,
    abstract: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    authorId: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default ProjectListItem;
