import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

// ({ title, url, closeModal })
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

export default Modal;
