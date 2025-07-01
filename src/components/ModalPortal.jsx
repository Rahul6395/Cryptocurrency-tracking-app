import ReactDOM from 'react-dom';



function ModalPortal({ isOpen, onClose, children,  }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className={`w-full h-full fixed top-0 z-50 bg-black/50 dark:bg-gray/75`}
        onClick={onClose}
      ></div>
      {children}
    </>,
    document.getElementById('Modal-Root') ,
  );
}

export default ModalPortal;
