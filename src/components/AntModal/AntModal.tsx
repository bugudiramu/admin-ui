import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "./AntModal.slice";
import { RootState } from "../../redux/store";

interface IProps {
  text: string;
  handleSubmit: () => void;
  children?: React.ReactNode;
}

const AntModal = ({ text, handleSubmit, children }: IProps) => {
  const isModalOpen = useSelector(
    (state: RootState) => state.antModal.isModalOpen
  );

  const dispatch = useDispatch();

  const handleOk = () => {
    handleSubmit();
    dispatch(toggleModal(false));
  };

  const handleCancel = () => {
    dispatch(toggleModal(false));
  };

  return (
    <Modal
      maskClosable={false}
      title={text}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default AntModal;
