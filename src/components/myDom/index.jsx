import { useRef, useState, useEffect } from "react";

import './index.scss';

export default function MyDom() {
  const [key, setKey] = useState('1');
  const [list, setList] = useState(['1', '2', '3', '4'])
  const modalRef = useRef(null);

  // 打开弹框
  const openModal = () => {
    modalRef.current.showModal();
  }

  // 关闭弹框
  const closeModal = () => {
    modalRef.current.close();
  }

  // 点击右侧按钮
  const onClickRightBtn = (e) => {
    const dataItem = e.target.getAttribute('data-item');
    const contentList = document.querySelector('.content');
    const dataKeyDom = [...contentList.children].filter((it) => it.getAttribute('data-key') === dataItem)
    if (dataKeyDom && dataKeyDom.length === 1) {
      window.scrollTo({
        top: dataKeyDom[0].offsetTop - 84,
        behavior: 'smooth'
      })
    }
  }

  // 滚动事件
  const handleScroll = () => {
    const contentList = [...document.querySelector('.content').children];
    for (let i = contentList.length - 1; i >= 0; i--) {
      const it = contentList[i];
      const { top, bottom } = it.getBoundingClientRect();
      const clientHeight = document.body.clientHeight
      const key = it.getAttribute('data-key');
      if (top > 0 && bottom < clientHeight + 1) {
        setKey(key);
        break;
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div>
      <button onClick={openModal}>打开弹框</button>

      <dialog ref={modalRef}>
        <div className="modal">
          <Modal />
          <button onClick={closeModal}>关闭</button>
        </div>
      </dialog>

      <div>
        <div className="btn" onClick={onClickRightBtn}>
          {
            list.map((it) => <div key={it} className={it === key ? 'action' : ''} data-item={it}>{it}</div>)
          }
        </div>
        <div className="content">
        {
            list.map((it) => <div key={it} style={{ background: `#0022${it * 10}`, color: '#fff' }} data-key={it}>{it}</div>)
          }
        </div>
      </div>

    </div>
  );
}

const Modal = () => {
  return <div>
    <p>这是弹框</p>
  </div>
}
