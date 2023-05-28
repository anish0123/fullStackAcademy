import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (dataObject) => {
  const request = axios.post(baseUrl, dataObject);
  return request.then((response) => response.data);
};

const update = (id, dataObject) => {
  const request = axios.put(`${baseUrl}/${id}`, dataObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
