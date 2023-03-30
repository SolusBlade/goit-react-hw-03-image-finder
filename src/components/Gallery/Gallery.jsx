import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { getSearchedPixabayApi } from '../../services/pixabayApi';

import PropTypes from 'prop-types';
import { Component } from 'react';
import { Circles } from 'react-loader-spinner';
import Notiflix from 'notiflix';

class Gallery extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    error: null,
    isLoading: false,
    isBtn: false,
    modalData: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (state.query !== props.query) {
      return { page: 1, query: props.query };
    }
    return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (
      (prevProps.query !== query && query !== '') ||
      (prevState.page !== page && page !== 1)
    ) {
      this.setNews();
    }
  }

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  setNews = async () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true, error: null, isBtn: false });

    try {
      const data = await getSearchedPixabayApi(query, page);

      if (data.hits.length === 0) {
        throw new Error('no data there');
      }
      this.setState(prev => ({
        images: page === 1 ? data.hits : [...prev.images, ...data.hits],
      }));
      this.setState({ isBtn: true });
    } catch (error) {
      Notiflix.Notify.failure(`Ooops, ${error.message}`, {
        timeout: 5000,
      });

      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  openModal = modalData => {
    this.setState({ modalData });
  };

  closeModal = () => {
    this.setState({ modalData: null });
  };

  render() {
    const { images, modalData, isLoading, isBtn } = this.state;
    return (
      <>
        <ImageGallery images={images} openModal={this.openModal} />
        {images.length > 0 && isBtn && <Button onClick={this.changePage} />}
        {isLoading && (
          <Circles
            height="80"
            width="80"
            color="#b72f2b"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass="spinner"
            visible={true}
          />
        )}
        {modalData && <Modal {...modalData} closeModal={this.closeModal} />}
      </>
    );
  }
}

Gallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default Gallery;
