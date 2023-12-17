import React, { useContext, useEffect, useRef, useState } from "react";
import MainBody from "../../sections/body";
import { fetchData } from "../../utils/fetchData";
import useSWR from "swr";
import Button from "../../components/Button";
import useForm from "../../utils/useForm";
import { DataContext } from "../../store/globalstate";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import OptionSelect from "../../components/OptionSelect";
const fetchItems = async () => {
  const res = await fetchData("POST", "inventory/item/list-paginate");
  const data = await res;
  return data;
};

const formOption = async () => {
  const res = await fetchData("POST", "setting/create-item-form-option");
  const data = await res;
  return data;
};
const AddProductScreen = () => {
  //* get data
  const { data: items, error: itemError } = useSWR("items", fetchItems);
  const { data: formOpt, error: formError } = useSWR("form-option", formOption);
  const { state, dispatch } = useContext(DataContext);
  const [getOption, setOption] = useState({
    category: {},
    uom: {},
    brand: { brand_id: 0 },
  });

  const itemList = items?.data?.data;
  const form_option = formOpt?.data;
  const opt_category = form_option?.option_category;
  const opt_brand = form_option?.option_brand;
  const opt_uom = form_option?.option_uom;
  //*----
  const [showAction, setShowAction] = useState({ show: false, id: 0 });
  const actionRef = useRef(null);
  const initialFormState = {
    id: 0,
    name: "",
    brand_id: "",
    category_id: "",
    uom: "",
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

  const toggleAction = (id) => {
    setShowAction((prev) => ({
      show: prev.id !== id || !prev.show,
      id: id !== prev.id ? id : prev.show ? null : id,
    }));
  };

  const handleSave = async () => {
    const res = await fetchData("POST", "inventory/item/save", formData);
    if (res.status == "Error") {
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
    // const res = await fetchData("POST", "brand/delete", formData);
    // if (res.status == "OK") {
    //   dispatch({ type: "NOTIFY", payload: { success: "Delete" } });
    // } else {
    //   dispatch({ type: "NOTIFY", payload: { error: res.error_message } });
    // }
  };

  const handleAddNew = () => {
    resetForm();
    dispatch({
      type: "MODAL",
      payload: { add: true },
    });
  };

  const handleChangeCategory = (opt_values) => {
    console.log(opt_values);
    setOption((prev) => ({
      // brand: { brand_id: },
    }));
  };

  if (itemError) return <MainBody>Items not found</MainBody>;
  if (!items) return <MainBody>Loading....</MainBody>;
  return (
    <MainBody>
      <Button onClick={handleAddNew}>Add New Item</Button>
      <div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, i) => (
              <tr key={i}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.category_name}</td>
                <td>{item.brand_name}</td>
                <td style={{ width: "50%" }}>
                  <div style={{ width: "20px" }}>
                    <span
                      style={{ fontWeight: "bolder" }}
                      onClick={() => toggleAction(item.id)}
                    >
                      ...
                    </span>
                    {showAction.show && showAction.id === item.id && (
                      <div
                        ref={actionRef}
                        style={{ position: "absolute", width: "100%" }}
                      >
                        {tableAction(item.id, dispatch, handleDelete)}
                        {((formData.name = item.name), (formData.id = item.id))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal width="50%" title={state.modal?.add ? "Add" : "Modify"}>
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
            data={opt_category}
            value={getOption}
            onChange={handleChangeCategory}
          ></OptionSelect>
          <OptionSelect
            pk="id"
            show_key="name"
            data={opt_brand}
            value={getOption.brand?.brand_id}
            onChange={handleChangeCategory}
          ></OptionSelect>
          <OptionSelect
            pk="id"
            show_key="name"
            data={opt_uom}
            value={getOption}
            onChange={handleChangeCategory}
          ></OptionSelect>

          <Button
            onClick={() => {
              handleSave();
            }}
          >
            {state.modal?.add ? "Add" : "Update"}
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

export default AddProductScreen;
