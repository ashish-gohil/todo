import axios from "axios";

interface apiEndPoint {
  backendAPIEndpiont: string;
}
export const apiEndpoints: apiEndPoint = {
  backendAPIEndpiont: "https://todo-app.ashishgohil148.workers.dev/api/v1",
};

export const instance = axios.create({
  baseURL: "https://todo-app.ashishgohil148.workers.dev/api/v1/",
  timeout: 20000,
  headers: { Authorization: `Bearer ${localStorage.getItem("todoToken")}` },
});
