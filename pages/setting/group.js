import React, { useContext, useEffect, useRef, useState } from "react";
import MainBody from "../../sections/body";
import { fetchData } from "../../utils/fetchData";
import useSWR from "swr";
import Modal from "../../components/Modal";
import { DataContext } from "../../store/globalstate";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useForm from "../../utils/useForm";
const fetcher = async () => {
  const res = await fetchData("POST", "country/list");
  const data = await res;
  return data;
};
const Country = () => {
  const { data, error } = useSWR("country/list", fetcher);
  const { state, dispatch } = useContext(DataContext);
  const [showAction, setShowAction] = useState({ show: false, id: 0 });
  const countries = data?.data?.data;
  const actionRef = useRef(null);
  const initialFormState = {
    id: 0,
    name: "",
  };
  const { formData, handleInputChange, resetForm } = useForm(initialFormState);

  const handleClickOutside = (event) => {
    if (actionRef.current && !actionRef.current.contains(event.target)) {
      setShowAction({ show: false, id: null });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (error) return <MainBody>Something went wrong</MainBody>;
  if (!data) return <MainBody>Loading</MainBody>;

  const toggleAction = (id) => {
    setShowAction((prev) => ({
      show: prev.id !== id || !prev.show,
      id: id !== prev.id ? id : prev.show ? null : id,
    }));
  };

  const handleSave = async () => {
    const res = await fetchData("POST", "country/save", formData);
    if (res.status == "OK") {
      dispatch({
        type: "MODAL",
        payload: { update: false },
      });
      dispatch({ type: "NOTIFY", payload: { success: "Updated" } });
    }
  };

  const handleDelete = async () => {
    const res = await fetchData("POST", "country/delete", formData);
    if (res.status == "OK") {
      dispatch({ type: "NOTIFY", payload: { success: "Delete" } });
    } else {
      dispatch({ type: "NOTIFY", payload: { error: res.error_message } });
    }
  };

  return (
    <MainBody>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c?.create_user}</td>
              <td style={{ width: "50%" }}>
                <div style={{ width: "20px" }}>
                  <span
                    style={{ fontWeight: "bolder" }}
                    onClick={() => toggleAction(c.id)}
                  >
                    ...
                  </span>
                  {showAction.show && showAction.id === c.id && (
                    <div
                      ref={actionRef}
                      style={{ position: "absolute", width: "100%" }}
                    >
                      {tableAction(c.id, dispatch, handleDelete)}
                      {((formData.name = c.name), (formData.id = c.id))}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal width="50%" title="Modify">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "1rem",
          }}
        >
          <Input
            value={formData.name}
            name="name"
            onChange={handleInputChange}
          />
          <Button
            onClick={() => {
              handleSave();
            }}
          >
            Update
          </Button>
        </div>
      </Modal>
    </MainBody>
  );
};

const tableAction = (id, dispatch, handleDelete) => {
  const handleEdit = (id) => {
    dispatch({
      type: "MODAL",
      payload: { update: true },
    });
  };
  return (
    <div className="table__action">
      <div
        onClick={() => {
          handleEdit(id);
        }}
      >
        Edit
      </div>
      <div onClick={handleDelete}>Delete</div>
    </div>
  );
};

export default Country;
