import React, { useContext, useEffect, useRef, useState } from "react";
import MainBody from "../../sections/body";
import { fetchData } from "../../utils/fetchData";
import useSWR from "swr";
import Modal from "../../components/Modal";
import { DataContext } from "../../store/globalstate";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useForm from "../../utils/useForm";
import OptionSelect from "../../components/OptionSelect";
const fetcher = async () => {
  const res = await fetchData("POST", "city/list");
  const data = await res;
  return data;
};
const getCountry = async () => {
  const res = await fetchData("POST", "option/country");
  const data = await res;
  return data;
};
const City = () => {
  const { data: optionCity, error: errorCity } = useSWR(
    "option_city",
    getCountry
  );
  const { data: countryData, error: errorCountry } = useSWR(
    "countries",
    fetcher
  );
  const { state, dispatch } = useContext(DataContext);
  const [showAction, setShowAction] = useState({ show: false, id: 0 });
  const [selectedValue, setSelectedValue] = useState(null);
  const countries = countryData?.data?.data;
  const opt_city = optionCity?.data;

  const actionRef = useRef(null);
  const initialFormState = {
    id: 0,
    name: "",
    country_id: 0,
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
  if (errorCountry) return <MainBody>Something went wrong</MainBody>;
  if (!countryData) return <MainBody>Loading</MainBody>;

  const toggleAction = (id) => {
    setShowAction((prev) => ({
      show: prev.id !== id || !prev.show,
      id: id !== prev.id ? id : prev.show ? null : id,
    }));
  };

  const handleSave = async () => {
    const res = await fetchData("POST", "city/save", formData, null);
    const data = await res;
    if (data.status_code != 200) {
      return dispatch({
        type: "NOTIFY",
        payload: { error: res.error_message },
      });
    }
    dispatch({
      type: "MODAL",
      payload: { update: false },
    });
    dispatch({ type: "NOTIFY", payload: { success: "Updated" } });
  };

  const handleDelete = async () => {
    const res = await fetchData("POST", "city/delete", formData);
    if (res.status == "OK") {
      dispatch({
        type: "MODAL",
        payload: { update: false },
      });
      dispatch({ action: "NOTIFY", payload: { success: "Updated" } });
    }
  };

  const handleSelectChange = (opt_value) => {
    setSelectedValue(opt_value.id);
    formData.country_id = parseInt(opt_value.id, 10);
  };
  console.log(formData);

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
                      {tableAction(c.id, dispatch, [
                        handleDelete,
                        handleSelectChange,
                      ])}
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
          <OptionSelect
            pk="id"
            show_key="name"
            data={opt_city}
            value={selectedValue}
            onChange={handleSelectChange}
          ></OptionSelect>
          <Button
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
    </MainBody>
  );
};

const tableAction = (id, dispatch, ...callbacks) => {
  const handleDelete = callbacks.find(
    (callback) => typeof callback === "function"
  );
  const handleOptChange = callbacks.find(
    (callback) => typeof callback === "function"
  );
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

export default City;
