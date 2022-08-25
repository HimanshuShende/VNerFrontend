import React, { useEffect, useState, useCallback } from 'react';
import { baseURL } from '../utilities/constants';
import  useAxios from "../utilities/useAxios";
import useRazorpay from "react-razorpay";

const Wallet = () => {
    const [ balance, setBalance ] = useState(0);
    const [ addAmount, setAddAmount ] = useState(0);

    let API = useAxios();
    const Razorpay = useRazorpay();

    const getTransactionHistory = async () => {
        let response = await API.get(`${baseURL}/v2/wallet/transactionHistory/`)
        let transactionHistory = await response.data
    }

    const  updateWallet = () => {
        API.get(`${baseURL}/v2/wallet/balance/`)
            .then(response => {
                setBalance(response.data["balance"])
            })
    }

    const loadRazorpayScript = (src) => {
        return new Promise((resolve) => {
          const script = document.getElementById("razorpayCheckoutScript");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
       });
    };

    const handlePayment = useCallback(async (e) => {
        console.log("addAmount : ", addAmount)
        if (parseInt(addAmount) <= 0) {
            alert("Add amount must be more than 0.");
            return;
        }

        const formdata = new FormData()
        formdata.append("amount", parseInt(addAmount));
        const result = await API.post(`${baseURL}/payment/razorpay/order/`, formdata);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { 
            amount,
            id: order_id,
            currency,
            notes: userBasicDetail
        } = result.data.order;

        const { app_key: public_key } = result.data

        // console.log("Result : ", result)

        const options = {
            "key": public_key,
            "amount": amount,
            "currency": currency,
            "name": userBasicDetail.name,
            "description": "Add money to your wallet",
            "order_id": order_id,
            // "callback_url": `${baseURL}/payment/razorpay/success/`,
            "prefill": {
                "name": userBasicDetail.name,
                "email": userBasicDetail.email,
                "contact": userBasicDetail.mobile
            },
            "notes": userBasicDetail,
            "theme": {
                "color": "#2b85f3"
            },
            handler: (res) => {
                // console.log("handler function : ",res);
                const formData = new FormData();
                formData.append("razorpay_order_id", res.razorpay_order_id);
                formData.append("razorpay_payment_id", res.razorpay_payment_id);
                formData.append("razorpay_signature", res.razorpay_signature);
                formData.append("amount_added", amount);
                formData.append("transaction_type", "credit");
                formData.append("userDetail", JSON.stringify(userBasicDetail));
                API.post(`${baseURL}/payment/razorpay/success/`, formData)
                    .then(response => {
                        if (response.data["task_completed"]){
                            updateWallet();
                            setAddAmount(0);
                        }
                    });
                
              }
        }

        const rzpay = new Razorpay(options);
        rzpay.open();
        rzpay.on('payment.failed', function (response){
            console.log(`Please take a screenshot of following details :\nERROR CODE : ${response.error.code}\nDescrciption : ${response.error.description}\nSource : ${response.error.source}\nReason: ${response.error.reason}\nOrder ID: ${response.error.metadata.order_id}\nPayment ID: ${response.error.metadata.payment_id}`)
            alert(`Please take a screenshot of following details :\nERROR CODE : ${response.error.code}\nDescrciption : ${response.error.description}\nSource : ${response.error.source}\nReason: ${response.error.reason}\nOrder ID: ${response.error.metadata.order_id}\nPayment ID: ${response.error.metadata.payment_id}`);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Razorpay, addAmount])
    

    useEffect(() => {
        (async () => {
            const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }
        })()
    }, [])

    useEffect(() => {
        updateWallet()
        getTransactionHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <p>Balance : {balance}</p>
            
            <div id="razorpay-payment-form">
                <input type="text" pattern="[0-9]+" value={addAmount} onChange={(e) => { setAddAmount(e.target.value) }} title="Amount" name="add_amount" id="add_amount" />
                <button id='add_money_btn' onClick={handlePayment}>Add Money</button>
                <script id='razorpayCheckoutScript' async></script>
            </div>
           
        </>
    )
}

export default Wallet;