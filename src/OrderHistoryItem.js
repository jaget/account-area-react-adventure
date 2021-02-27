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
        orderHistory.map(({ id, name, total_price, line_items }) => {
          // console.log(line_items);
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
                      <DeliveryDetails deliveryAddress="925 N La Brea Ave, West Hollywood, 90038" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <div className="column is-12">
        <div className="box orders-history-block has-shadow-hover">
          <div className="is-flex orders-block-header">
            <div className="item">
              <div>Order Number</div>
              <div>#467614-US</div>
            </div>
            <div className="item">
              <div>Order Type</div>
              <div>
                <p className="is-onetime">One-time</p>
              </div>
            </div>
            <div className="item">
              <div>Price</div>
              <div>$113.86</div>
            </div>
            <div className="item">
              <div>Dispatch Date</div>
              <div>August 7th 2019</div>
            </div>
          </div>

          <hr />

          <div className="order-information">
            <p className="title is-6 is-marginless">
              It&apos;s been dispatched!
            </p>

            <div>
              <div className="order-information-expanded">
                <div className="product-list-boxes columns is-multiline">
                  <div className="column is-6">
                    <div className="media">
                      <div className="media-left">
                        <img
                          alt="Product bars"
                          className="image"
                          src="https://cdn.shopify.com/s/files/1/0578/1097/products/HUEL_SHAKER_FROSTER_FR_1200.jpg?v=1515319444"
                        />
                      </div>
                      <div className="media-content">
                        <div>
                          <p className="product-title">
                            Huel Shaker Bottle (Clear)
                          </p>
                          <p className="product-variants">
                            1x Huel Shaker Bottle (Clear)
                          </p>
                        </div>
                      </div>
                      <div className="media-right">
                        <p className="product-price">$5.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="media">
                      <div className="media-left">
                        <img
                          alt="Product bars"
                          className="image"
                          src="https://cdn.shopify.com/s/files/1/1374/5287/products/Free_Tshirt_and_Shaker.png?v=1551882727"
                        />
                      </div>
                      <div className="media-content">
                        <div>
                          <p className="product-title">
                            Free T-Shirt &amp; Shaker
                          </p>
                          <p className="product-variants">1x Large / Male</p>
                        </div>
                      </div>
                      <div className="media-right">
                        <p className="product-price">$0.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="media">
                      <div className="media-left">
                        <img
                          alt="Product bars"
                          className="image"
                          src="https://huel-assets.s3.eu-west-2.amazonaws.com/temp-public/thumbnails/powder.jpg"
                        />
                      </div>
                      <div className="media-content">
                        <div>
                          <p className="product-title">Huel Powder</p>
                          <p className="product-variants">
                            1x Berry, 1x Vanilla, 1x Chocolate
                          </p>
                        </div>
                      </div>
                      <div className="media-right">
                        <p className="product-price">$99.00</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="is-flex order-footer-information">
                  <div className="left-info">
                    <div>Delivery Address</div>
                    <div>925 N La Brea Ave, West Hollywood, 90038</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="column is-12">
        <div className="box orders-history-block has-shadow-hover">
          <div className="is-flex orders-block-header">
            <div className="item">
              <div>Order Number</div>
              <div>#348741-US</div>
            </div>

            <div className="item">
              <div>Order Type</div>
              <div>
                <p className="is-onetime">One-time</p>
              </div>
            </div>
            <div className="item">
              <div>Price</div>
              <div>$5.00</div>
            </div>
            <div className="item">
              <div>Dispatch Date</div>
              <div>March 30th 2019</div>
            </div>
          </div>

          <hr />

          <div className="order-information">
            <p className="title is-6 is-marginless">
              It&apos;s been dispatched!
            </p>

            <div>
              <div className="order-information-expanded">
                <div className="product-list-boxes columns is-multiline">
                  <div className="column is-6">
                    <div className="media">
                      <div className="media-left">
                        <img
                          alt="Product bars"
                          className="image"
                          src="https://huel-assets.s3.eu-west-2.amazonaws.com/temp-public/thumbnails/rtd.jpg"
                        />
                      </div>
                      <div className="media-content">
                        <div>
                          <p className="product-title">Huel Ready-to-drink</p>
                          <p className="product-variants">
                            2x Ready-to-drink Vanilla
                          </p>
                        </div>
                      </div>
                      <div className="media-right">
                        <p className="product-price">$99.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="media">
                      <div className="media-left">
                        <img
                          alt="Product bars"
                          className="image"
                          src="https://cdn.shopify.com/s/files/1/1374/5287/products/Free_Tshirt_and_Shaker.png?v=1551882727"
                        />
                      </div>
                      <div className="media-content">
                        <div>
                          <p className="product-title">
                            Free T-Shirt &amp; Shaker
                          </p>
                          <p className="product-variants">1x Small / Male</p>
                        </div>
                      </div>
                      <div className="media-right">
                        <p className="product-price">$0.00</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="is-flex order-footer-information">
                  <div className="left-info">
                    <div>Delivery Address</div>
                    <div>925 N La Brea Ave, West Hollywood, 90038</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
