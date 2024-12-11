
import { ModalProps } from '../../types/types';

const CustomModal = (props: ModalProps) => {
    const closeModal = () => {
        props.openCloseModal((prevState) => !prevState);
        if (props.resetEditData) {
            props?.resetEditData([]);
        }
    };

    return (
        <div
            id="crud-modal"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-full bg-gray-800 bg-opacity-85"
        >
            <div className="rounded-2xl shadow dark:bg-gray-700 bg-white w-[70%] max-h-[80%] flex flex-col">
           
                <div className="flex items-center bg-gradient-to-r from-[#af7a3d] to-[#ecb022] justify-between p-4 md:p-5 rounded-t-xl">
                    <h3 className="text-lg font-semibold text-white">{props.title}</h3>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                
                <div className="flex-1 overflow-auto p-4">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
