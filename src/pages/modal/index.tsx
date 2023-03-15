import React, { useState } from 'react';
import Alert from '~/pages/modal/components/Alert';
import Modal from '~/pages/modal/components/Modal';

import './styles.scss';

const ModalPage = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className="modal-page">
      <button type="button" className="modal-page__open-btn" onClick={openModal}>
        모달열기
      </button>

      <Modal
        shouldCloseOnOverlayClick
        onRequestClose={() => setOpen(false)}
        isOpen={open}
        overlayStyle={{
          background: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Alert onClickCloseButton={closeModal} />
      </Modal>
    </div>
  );
};

export default ModalPage;
