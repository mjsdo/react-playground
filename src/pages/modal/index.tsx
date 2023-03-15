import React, { useState } from 'react';
import Alert from '~/pages/modal/components/Alert';
import Modal from '~/pages/modal/components/Modal';

const ModalPage = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <section>
      <button type="button" onClick={() => setOpen(true)}>
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
    </section>
  );
};

export default ModalPage;
