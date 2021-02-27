import React from 'react';

const OrderNumber = ({ orderType }) => (
  <div className="item">
    <div>Order Type</div>
    <div>
      <p className="is-onetime">{orderType}</p>
    </div>
  </div>
);

export default OrderNumber;
