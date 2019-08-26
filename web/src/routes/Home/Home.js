import React, { Component } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import ContactUsForm from 'Src/modules/ContactUsForm';
import MiCMLogo from 'Src/modules/MiCMLogo';
import Object1 from 'Src/public/obj1.png';
import Object2 from 'Src/public/obj2.png';

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <img className="obj1" src={Object1} />
        <img className="obj2" src={Object2} />
        <section className="hero">
          <nav>
            <div className="logo">
              <MiCMLogo />
            </div>
            <div className="nav-links">
              <button
                onClick={() =>
                  this.about.scrollIntoView({ behavior: 'smooth' })
                }
              >
                About
              </button>
              <button
                onClick={() =>
                  this.contact.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Contact Us
              </button>
              <Link className="sign-in" to="/signin">
                Sign In
              </Link>
            </div>
          </nav>
          <div className="left">
            <div className="title">Project Match</div>
            <div className="sub-title">
              McGill Initiative in Computational Medicine
            </div>
            <div className="message">
              Connect with researchers and students to collaboratively work on
              data science projects
            </div>
            <Link className="sign-up" to="/signup">
              Sign Up
            </Link>
          </div>
        </section>
        <section className="about" ref={about => (this.about = about)}>
          <div>About</div>
          <p>
            The main objective of McGill initiative in Computational Medicine
            (MiCM) is to deliver inter-disciplinary research programs and
            empower the use of Big Data in health research and health care
            delivery. One of the ways MiCM aims to achieve this objective is to
            strengthen collaborative research by sharing and transferring
            knowledge within the community.
            <br />
            <br />
            In order to realize the potential of Computational Medicine at
            McGill University, there is a need to better connect researchers in
            life sciences and clinical domains with researchers and students in
            the data sciences (e.g., statistics, bioinformatics, medical
            informatics, computer science, epidemiology). The former has
            interesting datasets and questions, while the latter can apply or
            develop quantitative methods to look for solutions to these
            questions.
          </p>
        </section>
        <section className="contact" ref={contact => (this.contact = contact)}>
          <div className="title">Contact Us</div>
          <ContactUsForm />
        </section>
      </div>
    );
  }
}

export default Home;
