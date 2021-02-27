import React from 'react';

const DeliveryDetails = ({ deliveryAddress }) => (
  <div className="is-flex order-footer-information">
    <div className="left-info">
      <div>Delivery Address</div>
      <div>{deliveryAddress}</div>
    </div>
  </div>
);

export default DeliveryDetails;
