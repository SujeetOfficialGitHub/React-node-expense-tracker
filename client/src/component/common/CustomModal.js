import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../store/features/modalSlice";
import { expenseView } from "../../store/features/expenseSlice";
import Message from "./Message";
import Error from "./Error";

const CustomModal = (props) => {
    // props destructuring
    const {
        children, 
        modalTitle, 
        modalLaunchButtonText, 
        classes, 
        error, 
        message,
        onResetForm
    } = props;
   
    const dispatch = useDispatch()

    // Handle modal close 
    const handleClose = () => {
        onResetForm && onResetForm();
        dispatch(closeModal())
        setTimeout(() => {
            dispatch(expenseView({id: null}))
        },1000)
    };
    
    // Handle modal show 
    const handleShow = () => {
        dispatch(openModal())
    };
    
    const isOpen = useSelector(state => state.modal.isOpen)
    return (
        <>
        <Button variant="primary" className={classes && classes.modalLaunchButton} onClick={handleShow}>
            {modalLaunchButtonText}
        </Button>

        <Modal show={isOpen} onHide={handleClose} keyboard={false}>
            <Modal.Header>
                <Modal.Title className={classes && classes.modalHeader}>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='mb-3'>
                {message && <Message className="message">{message}</Message>}
                {error && <Error className="error">{error}</Error>}
            </div>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className='font-title' onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};
export default CustomModal