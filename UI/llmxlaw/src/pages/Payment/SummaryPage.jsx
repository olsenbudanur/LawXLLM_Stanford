import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRadio,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
const exampleEssay = require("../../assets/blurEssay.png");


export default function SummaryPage() {
    const navigate = useNavigate();
    function pay() {
		fetch("https://www.tutanaai.com/create-checkout-session", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ items: [{ id: 1, quantity: 1 }] }),
		})
			.then((res) => {
				if (res.ok) return res.json();
				return res.json().then((json) => Promise.reject(json));
			})
			.then(({ url }) => {
				window.location = url;
			})
			.catch((e) => {
				console.log(e.error);
			});
	}

  function goTo() {
    navigate("/949ff4f6-8fb1-11ed-a1eb-0242ac120002");
  }

  return (
    <section className="h-100 h-custom">
      <MDBContainer className="py-5 h-100">
      
        <MDBRow className="justify-content-center align-items-center h-100 row-md-1">
          <MDBCol>
            
            <MDBTable responsive >
              <MDBTableHead>
                <tr>
                  <th scope="col" className="h5">
                    Shopping Bag
                  </th>
                  {/* <th scope="col">Format</th>
                  <th scope="col">Quantity</th> */}
                  <th scope="col">Price</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img
                        src={exampleEssay}
                        fluid
                        className="rounded-3"
                        style={{ width: "120px" }}
                        alt="Book"
                      />
                      <div className="flex-column ms-4">
                        <p className="mb-2">Report + Chatbot access</p>
                      </div>
                    </div>
                  </th>
                  {/* <td className="align-middle">
                    <p className="mb-0" style={{ fontWeight: "500" }}>
                      Digital
                    </p>
                  </td> */}
                  {/* <td className="align-middle">
                    <div class="d-flex flex-row align-items-center">
                      

                      <MDBInput
                        min={1}
                        max={1}
                        type="number"
                        size="sm"
                        style={{ width: "50px" }}
                        defaultValue={1}
                      />

                     
                    </div>
                  </td> */}
                  <td className="align-middle">
                    <p className="mb-0" style={{ fontWeight: "500" }}>
                      $4.99
                    </p>
                  </td>
                </tr>
            
              </MDBTableBody>
            </MDBTable>
            
          </MDBCol>
          <MDBCard
            className="shadow-2-strong mb-5 mb-lg-0"
            style={{ borderRadius: "16px" }}
          >
            <MDBCardBody className="p-4">
              <MDBRow>
               
                <MDBCol lg="5" xl="5" style={{margin: "auto"}}>
                  <div
                    className="d-flex justify-content-between"
                    style={{ fontWeight: "500" }}
                  >
                    <p className="mb-2">Subtotal</p>
                    <p className="mb-2">$4.99</p>
                  </div>

                  
                  <hr className="my-4" />

                  <div
                    className="d-flex justify-content-between mb-4"
                    style={{ fontWeight: "500" }}
                  >
                    <p className="mb-2">Total (tax included)</p>
                    <p className="mb-2">$4.99</p>
                  </div>

                  <MDBBtn onClick={pay} block size="lg">
                    <div className="d-flex justify-content-between">
                      <span>Checkout</span>
                      <span>$4.99</span>
                    </div>
                  </MDBBtn>

                  <MDBBtn onClick={goTo} block size="lg" color="green">
                    <div className="d-flex justify-content-between">
                      <span>Free Trial!</span>
                      <span>Limited Time Offer</span>
                    </div>
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
       
      </MDBContainer>
    </section>
  );
}