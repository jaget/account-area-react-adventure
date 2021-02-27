import React, { useEffect, useState } from 'react';

import Dispatch from './OrderHistoryItem/Dispatch';
import OrderNumber from './OrderHistoryItem/OrderNumber';
import OrderType from './OrderHistoryItem/OrderType';
import Price from './OrderHistoryItem/Price';
import ProductCard from './OrderHistoryItem/ProductCard';
import DeliveryDetails from './OrderHistoryItem/DeliveryDetails';
import { extractOrderData } from './utils';

const OrderHistoryItem = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); //Whether the data was loaded successfully from API endpoint
  const [dataLoading, setDataLoading] = useState(true); //Whether we are waiting for a response from API endpoint

  useEffect(() => {
    /**
     * I should use axios or some other suitable library.
     * However I'm not to familiar with it.
     * Fetch does the job 9/10 times.
     */

    fetch('https://reactasty.apps.huel.io/api/customer/orders', {
      method: 'get'
    })
      .then(res => res.ok && res.json())
      .then(res => {
        setDataLoading(false);

        const formattedResponse = res[0]; // Response is an array rather than an object so we want first element in that array.
        if (formattedResponse.success) {
          setDataLoaded(true);
          setOrderHistory(extractOrderData(formattedResponse.orders));
        } else {
          setDataLoaded(false);
        }
      });
  }, []);

  return (
    <div>
      {!dataLoading && !dataLoaded && (
        <div className="column is-12">
          An error occurred loading your order history. Please try again later
          or{' '}
          <a href="/pretend-support-page">Contact our (pretend) support team</a>
        </div>
      )}

      {dataLoading && (
        <div className="column is-12">Loading order history please wait</div>
      )}

      {!dataLoading &&
        dataLoaded &&
        orderHistory.map(
          ({ id, name, total_price, line_items, shipping_address }) => {
            const { address1, address2, city, zip } = shipping_address;
            const deliveryAddress = [address1, address2, city, zip]
              .filter(Boolean)
              .join(', ');

            return (
              <div className="column is-12" key={id}>
                <div className="box orders-history-block has-shadow-hover">
                  <div className="is-flex orders-block-header">
                    <OrderNumber orderNumber={name} />
                    <OrderType orderType="One-time" />
                    <Price price={total_price} />
                    <Dispatch dispatchDate="August 7th 2019" />
                  </div>

                  <hr />

                  <div className="order-information">
                    <p className="title is-6 is-marginless">
                      It&apos;s been dispatched!
                      {/*TODO I have no idea where to get this information*/}
                    </p>

                    <div>
                      <div className="order-information-expanded">
                        <div className="product-list-boxes columns is-multiline">
                          {line_items.map(
                            ({
                              id: productID,
                              image,
                              name: productTitle,
                              price,
                              variant_id,
                              description
                            }) => (
                              <ProductCard
                                key={`${productID}-${variant_id}`}
                                imagealt={productTitle}
                                image={image}
                                productTitle={productTitle}
                                productVariant={description}
                                price={price}
                              />
                            )
                          )}
                        </div>
                        <hr />
                        <DeliveryDetails deliveryAddress={deliveryAddress} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default OrderHistoryItem;
