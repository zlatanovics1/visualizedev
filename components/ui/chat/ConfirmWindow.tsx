import { FaExclamationCircle } from "react-icons/fa";

interface ConfirmWindowProps {
  username: string;
  onConfirm: () => void;
  close: () => void;
}

const ConfirmWindow: React.FC<ConfirmWindowProps> = ({
  username,
  onConfirm,
  close,
}) => {
  return (
    <div className=" space-y-5 -ml-3">
      <div className="flex gap-4 items-center">
        <FaExclamationCircle className="w-12 h-12 text-red-600/80" />
        <h3 className="text-lg">
          Are you sure you want to remove friend{" "}
          <span className="font-semibold">{username}</span>?
        </h3>
      </div>
      <div className="flex flex-row-reverse gap-3">
        <button
          onClick={onConfirm}
          className="bg-[#291415] rounded-md border-[1px] border-transparent font-semibold px-3 py-1 text-[#ff6369] hover:border-red-500"
        >
          Confirm
        </button>
        <button
          onClick={close}
          className="bg-gray-100 border-[1px] border-transparent rounded-md px-3 py-1 hover:border-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmWindow;
