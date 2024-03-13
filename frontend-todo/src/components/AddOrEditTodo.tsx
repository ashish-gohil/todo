import { useEffect, useState } from "react";
import { instance } from "../assets/authconfig";
// import { useNavigate } from "react-router-dom";
// type func = ;
export type ModalType = "add" | "edit" | undefined;
interface AddEditTodoModal {
  setIsModalOpen: (newState: boolean) => void;
  name: string;
  isDone: boolean;
  description: string;
  typeOfModal: ModalType;
  id?: string;
  setIsLoading: (isLoading: boolean) => void;
  setMessage: (msg: string) => void;
  setPopUpOpen: (popup: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
}
const AddEditTodoModal = ({
  typeOfModal,
  setIsModalOpen,
  name,
  description,
  isDone,
  id,
  setIsLoading,
  setMessage,
  setPopUpOpen,
  setIsSuccess,
}: AddEditTodoModal) => {
  console.log(typeOfModal);
  const [todoname, setTodoName] = useState("");
  const [tododDesc, setTodoDesc] = useState("");
  const [isTodoDone, setTodoDone] = useState(false);

  useEffect(() => {
    setTodoName(name);
    setTodoDesc(description);
    setTodoDone(isDone);
  }, [name, description, isDone]);

  const addEditTodoHandler = async () => {
    if (typeOfModal === "add") {
      try {
        setIsLoading(true);
        const response = await instance.post("todo", {
          name: todoname,
          description: tododDesc,
          isDone: isTodoDone,
        });

        if (response) {
          setIsModalOpen(false);
          location.reload();
        }
      } catch (err: any) {
        setIsModalOpen(false);
        setIsSuccess(false);
        setMessage(err?.response?.data?.msg || "Error while updating Todo");
        setPopUpOpen(true);
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const response = await instance.put("todo", {
          todoId: id,
          name: todoname,
          description: tododDesc,
          isDone: isTodoDone,
        });
        if (response) {
          // setTimeout(() => {
          setIsModalOpen(false);
          location.reload();
          // }, 2000);
        }
      } catch (err: any) {
        setIsModalOpen(false);
        setIsSuccess(false);
        setMessage(err?.response?.data?.msg || "Error while adding Todo");
        setPopUpOpen(true);
        setIsLoading(false);
      }
    }
  };
  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <div
        className={` absolute top-0 z-500 w-full flex justify-center items-center
         h-full bg-slate-400 outline-none overflow-x-hidden overflow-y-auto`}
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
      >
        <div
          id="authentication-modal"
          aria-hidden="true"
          className={`flex  justify-center items-center max-h-full rounded-lg shadow flex-col bg-slate-500 w-1/2`}
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 w-full ">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {typeOfModal === "add" ? "Add Todo" : "Edit Todo"}
            </h3>
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
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
              {/* <span className="sr-only">Close modal</span> */}
            </button>
          </div>
          <div className="p-4 md:p-5 w-full">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                value={todoname}
                onChange={(e) => {
                  setTodoName(e.target.value);
                }}
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter Todo Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                name="description"
                value={tododDesc}
                onChange={(e) => {
                  setTodoDesc(e.target.value);
                }}
                placeholder="Enter Description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="isDone"
                    type="checkbox"
                    checked={isTodoDone}
                    onChange={() => {
                      setTodoDone((st) => !st);
                    }}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="isDone"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Is Done
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  w-40"
                onClick={addEditTodoHandler}
              >
                {typeOfModal === "add" ? "Add" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditTodoModal;
