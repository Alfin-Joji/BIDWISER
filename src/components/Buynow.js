import GooglePayButton from "@google-pay/button-react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Buynow({ bidAmount }) {
  const { proid } = useParams();

  return (
    <div className="App">
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: bidAmount.toString(), // Set bidAmount as totalPrice
            currencyCode: "INR", // Adjust currency code if needed
            countryCode: "IN",
          },
          shippingAddressRequired: true,
          callbackIntents: ["PAYMENT_AUTHORIZATION"],
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log(paymentRequest);
        }}
        onPaymentAuthorized={(paymentData) => {
          console.log('paymentData ' + paymentData);
          return { transactionState: 'SUCCESS' };
        }}
        existingPaymentMethodRequired='false'
        buttonColor="black"
        buttonType="buy"
      ></GooglePayButton>
    </div>
  );
}

export default Buynow;
