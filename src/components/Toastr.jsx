import { useDispatch, useSelector } from "react-redux";
import { toastrActions } from "store";
import { Toast, ToastContainer } from "react-bootstrap";

export default function Toastr() {
  const dispatch = useDispatch();
  const toastr = useSelector((state) => state.toastr.toastrInfo);
  const closeToatr = () => {
    dispatch(toastrActions.hide_toastr());
  };
  return (
    <ToastContainer variant="light" position="top-end" className="p-3">
      <Toast onClose={() => closeToatr()}>
        <Toast.Header>
          <strong className="me-auto">
            {toastr.type === "success" ? "Success" : "Error"}
          </strong>
        </Toast.Header>
        <Toast.Body>{toastr.content}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
