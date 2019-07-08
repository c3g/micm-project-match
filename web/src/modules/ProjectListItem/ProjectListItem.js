import React from 'react';
import PropTypes from 'prop-types';
import './projectListItem.scss';
import { Link } from 'react-router-dom';

const name = (firstName, lastName) =>
  firstName && lastName
    ? ` ${firstName} ${lastName}`
    : firstName
    ? ` ${firstName}`
    : lastName
    ? ` ${lastName}`
    : '';

const ProjectListItem = ({
  project: { firstName, lastName, title, abstract, id, authorId }
}) => (
  <div className="project-list-item">
    <Link to={`/project/${id}`} className="details">
      <div className="title">{title}</div>
      <div className="abstract">
        {abstract.substring(0, 335)}
        {abstract.length > 335 ? '...' : ''}
      </div>
    </Link>
    <div className="by">
      <span>Project by</span>
      <Link to={`/user/${authorId}`}>{name(firstName, lastName)}</Link>
    </div>
  </div>
);

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    abstract: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    authorId: PropTypes.number.isRequired
  }).isRequired
};

export default ProjectListItem;
