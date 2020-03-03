import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import MovieCopies from './MovieCopies';
import MovieUpdateForm from './MovieUpdateForm';

import './MovieDetail.scss';


class MovieDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      deleteButtonText: 'Delete',
      renderUpdateForm: false,
      updateButtonText: 'Update',
    }

    this.deleteMovie = this.deleteMovie.bind(this);
    this.generateDeleteButtons = this.generateDeleteButtons.bind(this);
    this.generateTinyDetails = this.generateTinyDetails.bind(this);
    this.toggleConfirmDelete = this.toggleConfirmDelete.bind(this);
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
  }

  toggleConfirmDelete() {
    // Toggles the 'Confirm Delete' button's text
    const newState = this.state.confirmDelete ? false : true;
    const newButtonText = this.state.confirmDelete ? 'Delete' : 'Cancel';
    this.setState({ 
      confirmDelete: newState,
      deleteButtonText: newButtonText,
    });
  }

  toggleUpdateForm() {
    // Toggles rendering of the <MovieUpdateForm>
    const newRenderState = this.state.renderUpdateForm ? false : true;
    const newButtonText = this.state.renderUpdateForm ?  'Update' : 'Cancel';
    this.setState({ 
      renderUpdateForm: newRenderState,
      updateButtonText: newButtonText,
    });
  }

  async deleteMovie() {
    // Makes a DELETE request to the DB then updates state in <Movies>
    const axiosConfig = {
      method: 'delete',
      url: `http://104.248.238.221:8000/api/v1/movies/${this.props.movie.id}`,
      data: null,
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };

    let response;
    try {
      response = await axios(axiosConfig);
    } catch(error) {
      console.error(error);
    }

    if (response.status === 204 ) {
      this.props.removeMovie(this.props.movie.id);
    }
  }

  generateDeleteButtons() {
    if (this.state.renderUpdateForm) return false;
    if (this.state.confirmDelete) {
      return (
        <>
          <button onClick={this.toggleConfirmDelete} className="safe-button">Cancel</button>
          <button onClick={this.deleteMovie} className="unsafe-button">Confirm Delete</button> 
        </> 
      )
    }
    return <button onClick={this.toggleConfirmDelete} className="unsafe-button">Delete</button>

  }

  generateTinyDetails() {
    const tmdbLink = this.props.movie.tmdb_page_link ?
      <> 
        <a href={this.props.movie.tmdb_page_link} target="_blank" rel="noopener noreferrer">
          TMDb
        </a>
      </> :
      '';
    let tinyDetails = `${this.props.movie.release_year} `;
    tinyDetails += `| ${this.props.movie.mpaa_rating} `;
    tinyDetails += `| ${this.props.movie.runtime_minutes}mins`;
    if (tmdbLink !== '') tinyDetails += ` | `;

    return <p className="tiny-details">{ tinyDetails }{ tmdbLink }</p>;
  }

  render() {
    // Redirect to <Movies> if Movie has been deleted
    if (!this.props.movie) return <Redirect to="/movies" />
    
    return (
      <div className="movie-detail">
        {/* Movie Details OR Movie Update Form */}
        { this.state.renderUpdateForm ?
          <MovieUpdateForm 
            movie={this.props.movie}
            accessToken={this.props.accessToken}
            updateMovie={this.props.updateMovie}
            toggleForm={this.toggleUpdateForm}
          /> :
          <>
            <img 
              src={this.props.movie.image_link} 
              alt={`${this.props.movie.title} cover art`}
              title={this.props.movie.title} 
              />
            <h2>{ this.props.movie.title }</h2>
            { this.generateTinyDetails() }
            <p className="overview">{ this.props.movie.overview }</p>
          </>
        }
        {/* Delete Buttons */}
        <div className="movie-edit-buttons">
          <button onClick={this.toggleUpdateForm}>{ this.state.updateButtonText }</button>
          { this.generateDeleteButtons() }
        </div>
        { this.state.renderUpdateForm ? 
          false :
          <MovieCopies 
          movie={this.props.movie}
          accessToken={this.props.accessToken}
          addMovieCopy={this.props.addMovieCopy}
          copyCreated={this.copyCreated}
          removeMovieCopy={this.props.removeMovieCopy}
          />
        } 
      </div>
    );
  }
}

export default MovieDetail;
