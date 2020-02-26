import React from 'react';

import tmdbLogo from './img/tmdb_logo_blue.png';
import githubLogo from './img/github_logo.png';
import linkedinLogo from './img/linkedin_logo.png';


class About extends React.Component {
  render() {
    return (
      <div className="about">
        <h2>About Page</h2>
        <ProjectInfo />
        <MyInfo />
        <DataSources />
      </div>
    )
  }
}


class ProjectInfo extends React.Component {
  render() {
    return (
      <div className="project-info">
        <h3>Project Info:</h3>
        <p>MyColl was created by necessity. With consumers able to purchase media in multiple formats from an almost endless array of sources, it becomes difficult to sort out your physical and digital collections.</p>
        <p>MyColl attempts to make cataloging those collections easier through an easy to use web interface that allows you to track what media you own and where any copies may be located.</p>
        <p>MyColl uses a React front-end application, and a Django back-end server written in Python that is backed by a PostgreSQL database. For more information regarding the architecture of the project, please checkout it out on <a href="https://www.github.com/skylerburger/mycoll" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
      </div>
    );
  }
}


class MyInfo extends React.Component {
  render() {
    return (
      <div className="my-info">
        <h3>The Developer:</h3>
        <p>Skyler is a software developer with experience in developing Python and Javascript web applications. The idea for MyColl came to Skyler while shopping for DVDs at a thrift store. When digging through the movies he would often find himself struggling to remember which DVDs he already posessed and decided there was need for a solution that would put easy access to a catalog of his collection in his pocket.</p>
        <a href="https://www.github.com/skylerburger" rel="noopener noreferrer" target="_blank">
          <img src={githubLogo} alt="GitHub Logo" />
        </a>
        <a href="https://www.linkedin.com/in/skylerburger" rel="noopener noreferrer" target="_blank">
          <img src={linkedinLogo} alt="LinkedIn Logo" />
        </a>
      </div>
    );
  }
}


class DataSources extends React.Component {
  render() {
    return (
      <div className="data-sources">
        <h3>Data Sources:</h3>
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb. Data and images gathered through the search function are sourced from TMDb.</p>
        <a href="https://www.themoviedb.org/documentation/api" rel="noopener noreferrer" target="_blank">
          <img src={tmdbLogo} alt="The Movie Database Logo" />
        </a>
      </div>
    )
  }
}

export default About;