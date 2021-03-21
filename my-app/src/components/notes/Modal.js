import './Modal.css';

const Modal = ({ isModalOpen, onClose, children }) => {

    return (
        <div className={"modal-container " + (isModalOpen ? "show-modal" : "hide-modal")} >
            <div className="close" onClick={onClose}>
                &#10005;
            </div>
            {children}
        </div>
    );
}


export default Modal;