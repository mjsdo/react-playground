import type { ComponentPropsWithoutRef, FC } from 'react';

import React from 'react';

import './styles.scss';

interface AlertBoxProps extends ComponentPropsWithoutRef<'section'> {
  onClickCloseButton: () => void;
}

const Alert: FC<AlertBoxProps> = ({ onClickCloseButton }) => {
  return (
    <section className="alert-box">
      <h2 className="alert-box__title">Title</h2>
      <button type="button" className="alert-box__submit-btn">
        확인
      </button>
      <button
        type="button"
        className="alert-box__close-btn"
        onClick={onClickCloseButton}
      >
        <span className="sr-only">닫기</span>
        <span>&times;</span>
      </button>
    </section>
  );
};

export default Alert;
