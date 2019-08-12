import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import MiCMLogo from 'Src/modules/MiCMLogo';

const Home = () => (
  <div className="home-page">
    <section className="hero">
      <div className="left">
        <nav>
          <MiCMLogo />
          <div>
            <button>About</button>
            <button>Contact Us</button>
            <Link className="sign-in" to="/signin">
              Sign In
            </Link>
          </div>
        </nav>
        <div className="title">Project Match</div>
        <div className="sub-title">
          McGill Initiative in Computational Medicine
        </div>
        <div className="message">
          Connect with researchers and students to collaboratively work on data
          science projects
        </div>
        <Link className="sign-up" to="/signup">
          Sign Up
        </Link>
      </div>
    </section>
    <section className="about">
      <div>About</div>
      <p>
        The main objective of McGill initiative in Computational Medicine (MiCM)
        is to deliver inter-disciplinary research programs and empower the use
        of Big Data in health research and health care delivery. One of the ways
        MiCM aims to achieve this objective is to strengthen collaborative
        research by sharing and transferring knowledge within the community.
        <br />
        <br />
        In order to realize the potential of Computational Medicine at McGill
        University, there is a need to better connect researchers in life
        sciences and clinical domains with researchers and students in the data
        sciences (e.g., statistics, bioinformatics, medical informatics,
        computer science, epidemiology). The former has interesting datasets and
        questions, while the latter can apply or develop quantitative methods to
        look for solutions to these questions.
      </p>
    </section>
  </div>
);

export default Home;
