import React from "react";
type Todo = {
  id: string;
  name: string;
  description: string;
  isDone: boolean;
};
interface DashboardInterface {
  todos: Todo[];
}
const Dashboard: React.FC<DashboardInterface> = ({ todos }) => {
  console.log(todos);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 ">
        {todos &&
          todos.map((todo) => {
            return (
              <div key={todo.id} className="flex justify-center items-center">
                <input type="checkbox" className="p-3" checked={todo.isDone} />
                <div className="pl-2">{todo.name}</div>
                <div className="pl-2">{todo.description}</div>
                {/* </input> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
