import React, { Component  } from "react";

import imagesApi from "../services/imagesAPI"
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./Gallery/ImageGallery";
import Button from "./Button/Button";
import Loader from './Loader';
import Notification from './Notification';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchQuery: '',
    page: 1,
    showModal: false,
    largeImageUrl: null,
  };

  componentDidUpdate (prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if(prevQuery !== nextQuery) {
      this.fetchImages();
    }
  };

  fetchImages = () => {
    const {searchQuery, page} = this.state;
    this.setState({ loading: true });

    imagesApi
      .fetchImagesWithQuery(searchQuery, page)
      .then(images => this.setState(prevState => ({ 
        images: [...prevState.images, ...images], 
        page: prevState.page + 1,
      })))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };

  toggleModal = largeImageURL => {
    this.setState(state => ({
      showModal: !state.showModal,
      largeImageURL: largeImageURL,
    }));
  };

  closeModal = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }

    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: null,
    }));
  };

  render() {
    const { images, loading, error, showModal, largeImageUrl } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchFormSubmit}/>
        {error && (
          <Notification message={`Whoops, something went wrong: ${error.message}`} />
        )} 
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.toggleModal} />
        )}
        {showModal && <Modal largeImageURL={largeImageUrl} onClose={this.closeModal} />}
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button onButtonLoad={this.fetchImages}/>
        )}
      </div>
    );
  }
}

export default App;