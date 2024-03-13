import React, { MouseEventHandler, useEffect, useState } from "react";
import { instance } from "../assets/authconfig";
import AddEditTodoModal, { ModalType } from "../components/AddOrEditTodo";
import Loader from "../components/Loader";
import PopupBox from "../components/Poup";
// import { useNavigate } from "react-router-dom";
type Todo = {
  id: string;
  name: string;
  description: string;
  isDone: boolean;
};

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalType, setModalType] = useState<ModalType>("add");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPopupOpen, setPopUpOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [todoId, setId] = useState("");

  // const navigate = useNavigate();
  useEffect(() => {
    fetchAllTodos();
  }, []);

  const fetchAllTodos = async () => {
    try {
      setIsLoading(true);
      const response = await instance.get("todo");
      setTodos(response.data.todos);
      console.log(response.data.todos);
      setIsLoading(false);
    } catch (err: any) {
      setIsSuccess(false);
      setMessage(err?.response?.data?.msg || "Error while fetching data");
      setPopUpOpen(true);
      setIsLoading(false);
    }
  };
  const addTodoHandler = () => {
    setIsDone((prev) => false);
    setModalType((prev) => "add");
    setName((prev) => "");
    setDesc((prev) => "");
    setIsModalOpen((prev) => true);
  };
  const editTodoHandler: MouseEventHandler<SVGSVGElement> = (e) => {
    setModalType("edit");
    const target = e.target as HTMLElement;
    setId((prev) => target.id);
    const editedTodo: Todo[] = todos.filter((todo) => todo.id === target.id);
    console.log(editedTodo);
    setName((prev) => editedTodo[0]?.name);
    setDesc((prev) => editedTodo[0]?.description);
    setIsDone((prev) => editedTodo[0]?.isDone);
    setIsModalOpen((prev) => true);
  };

  const deleteTodoHandler: MouseEventHandler<SVGSVGElement> = async (e) => {
    try {
      setIsLoading(true);
      const target = e.target as HTMLElement;
      const id = target.id;
      const res = await instance.delete("todo", {
        data: { todoId: id },
      });
      console.log(res);
      if (res) {
        setIsLoading(false);
        location.reload();
      }
    } catch (err: any) {
      setIsSuccess(false);
      setMessage(err?.response?.data?.msg || "Error while delete Todo");
      setPopUpOpen(true);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col">
        <div className="flex flex-row items-center bg-gray-200 p-2 justify-between w-96 rounded-t-lg">
          <div className="pl-2 font-semibold">My Todos</div>
          <div className="pr-2">
            <button
              className="bg-blue-500 rounded-md py-1 px-2 text-white hover:bg-blue-600"
              onClick={addTodoHandler}
            >
              Add Todo
            </button>
          </div>
        </div>
        <div className="bg-white p-8  shadow-md w-96  rounded-b-lg">
          {todos &&
            todos.map((todo) => {
              return (
                <div key={todo.id} className="flex justify-left ">
                  <input
                    type="checkbox"
                    className="p-3"
                    checked={todo.isDone}
                    onChange={async (e) => {
                      try {
                        setIsLoading(true)
                        const response = await instance.put("todo", {
                          todoId: todo.id,
                          isDone: e.target.checked,
                        });
                        if (response) {
                          setIsLoading(false);
                          location.reload();
                        }
                      } catch (err: any) {
                        setIsSuccess(false);
                        setMessage(
                          err?.response?.data?.msg || "Error while delete Todo"
                        );
                        setPopUpOpen(true);
                        setIsLoading(false);
                      }
                    }}
                  />
                  <div className="pl-2">{todo.name}</div>
                  <div className="pl-2">{todo.description}</div>
                  <div className="pl-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={editTodoHandler}
                      id={todo.id}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-slate-700 hover:text-slate-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </div>
                  <div className="pl-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={deleteTodoHandler}
                      id={todo.id}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-slate-700 hover:text-slate-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>

                  {/* </input> */}
                </div>
              );
            })}
        </div>
      </div>
      {isModalOpen ? (
        <AddEditTodoModal
          setIsLoading={setIsLoading}
          setMessage={setMessage}
          setPopUpOpen={setPopUpOpen}
          setIsSuccess={setIsSuccess}
          setIsModalOpen={setIsModalOpen}
          name={name || ""}
          description={description || ""}
          isDone={isDone || false}
          typeOfModal={modalType}
          id={todoId}
        />
      ) : (
        ""
      )}
      <PopupBox
        isOpen={isPopupOpen}
        isSuccess={isSuccess}
        message={message}
        onClose={() => {
          setPopUpOpen(false);
        }}
      />
    </>
  );
};

export default Dashboard;
