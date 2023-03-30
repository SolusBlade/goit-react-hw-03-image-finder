import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');


class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalByEscape);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalByEscape);
    document.body.style.overflow = '';
  }
  scrollLock = e => {
    e.preventDefault();
  };

  handleCloseModalByEscape = e => {
    if (e.code === 'Escape') {
      console.log('Escape');
      this.props.closeModal();
    }
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <div className={s.backdrop} onClick={this.handleCloseModal}>
        <img src={image} className={s.image} alt="" />
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};


export default Modal;
