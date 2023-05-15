import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "./AntModal.slice";
import { RootState } from "../../redux/store";

interface IProps {
  text: string;
  handleSubmit: () => void
}

const AntModal = ({ text, handleSubmit }: IProps) => {
  const isModalOpen = useSelector(
    (state: RootState) => state.antModal.isModalOpen
  );

  const dispatch = useDispatch();

  const handleOk = () => {
    handleSubmit()
    dispatch(toggleModal(false));
  };

  const handleCancel = () => {
    dispatch(toggleModal(false));
  };

  return (
    <Modal
      title={text}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {/* <p>{text}</p> */}
    </Modal>
  );
};

export default AntModal;
