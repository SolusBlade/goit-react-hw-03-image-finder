import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, openModal }) => {
  return (
    <li
      className={s.galleryItem}
      onClick={() => openModal({ image: largeImageURL})}
    >
      <img className={s.cardPhoto} src={webformatURL} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {};

export default ImageGalleryItem;
