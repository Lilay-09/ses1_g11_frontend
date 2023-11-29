import React, { useContext, useState } from "react";
import useForm from "../../utils/useForm";
import Body from "../../sections/body";
import { fetchData } from "../../utils/fetchData";
import Table from "../../components/FlexTable";
import FlexTable from "../../components/FlexTable";
import { DataContext } from "../../store/globalstate";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { parse } from "cookie";
const Country = (props) => {
  const { countries } = props;
  const countryLst = countries?.data.data;

  const initialState = { id: "", name: "", iso3: "" };
  const { formData, handleInputChange, resetForm } = useForm(initialState);
  const { state, dispatch } = useContext(DataContext);

  const handleOpenModal = () => {
    dispatch({ type: "MODAL", payload: { add: true } });
  };
  const saveHandler = async (e) => {
    e.preventDefault();
    const res = await fetchData("POST", "country/save", formData);
    if (res.status_code !== 200) {
      return dispatch({
        type: "NOTIFY",
        payload: { error: res.error_message },
      });
    }
  };

  return (
    <Body title="Country">
      <Button
        onClick={() => {
          handleOpenModal();
        }}
      >
        Add New
      </Button>
      <Table data={countryLst} excludedKeys={["id", "country"]}></Table>
      <Modal title="Add New Country" width="450px" height="450px">
        <div className="">
          <Input
            value={formData.name}
            onChange={handleInputChange}
            name="name"
          />
          <Button onClick={saveHandler}>Save</Button>
        </div>
      </Modal>
    </Body>
  );
};

export default Country;
export const getServerSideProps = async (ctx) => {
  const res = await fetchData(
    "POST",
    "country/list",
    {
      search_value: "",
    },
    ctx
  );
  const data = await res;
  return {
    props: { countries: data },
  };
};
