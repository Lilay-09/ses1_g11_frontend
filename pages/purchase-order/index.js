import React from "react";
import MainBody from "../../sections/body";
import Button from "../../components/Button";

const PurchaseOrderScreen = () => {
  return (
    <MainBody>
      <Button>Add Purchase</Button>
      <div>
        <table className="custom-table">
          <thead>
            <tr>
              <td>Item</td>
              <td>Qty</td>
              <td>price</td>
              <td>discount</td>
            </tr>
          </thead>
        </table>
      </div>
    </MainBody>
  );
};

export default PurchaseOrderScreen;
