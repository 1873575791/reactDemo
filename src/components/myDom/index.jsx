import { useRef } from "react";

import './index.scss';

export default function MyDom() {
  const modalRef = useRef(null);

  // 打开弹框
  const openModal = () => {
    modalRef.current.showModal();
  }

  // 关闭弹框
  const closeModal = () => {
    modalRef.current.close();
  }

  return (
    <div>
      <button onClick={openModal}>打开弹框</button>

      <dialog ref={modalRef}>
        <div className="modal">
          <Modal />
          <button onClick={closeModal}>关闭</button>
        </div>
      </dialog>
    </div>
  );
}

const Modal = () => {
  return <div>
    <p>这是弹框</p>
  </div>
}
