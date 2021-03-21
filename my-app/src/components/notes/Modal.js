import './Modal.css';

const Modal = ({ isModalOpen, onClose, children }) => {

    return (
        <div className={"modal-container " + (isModalOpen ? "show-modal" : "hide-modal")} >
            <div class="close-btn-container">
                <button className="close" onClick={onClose}>&#10005;</button>
            </div>
            {children}
        </div>
    );
}


export default Modal;