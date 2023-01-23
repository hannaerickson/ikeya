import React from "react";
import { MDBCard, MDBCardImage, MDBCol, MDBRow } from "mdb-react-ui-kit";
import "./CSS/Style.css";
// import SideBar from "./CSS/Sidebar";

export default function Main() {
  return (
    <div className="container custom-bg h3">
      <MDBRow>
        <MDBCol size="9" className="w-100">
          <h1 className="h1">welcome to IKEYA</h1>
          <div className="maintext">
            <h3 className="h3">
              An online resource for finding home decor inspiration for the
              everyday user.
              <br />
              <br />
              <br />
              Users can create rooms, and easily add furniture to see how two or
              more pieces look side by side.
              <br />
              <br />
              <br />
              Browse the site and see what other users have created, or narrow
              it down with a simple search.
            </h3>
            <img
              className="float-right mainimage"
              src="https://images2.imgbox.com/df/7e/Gs9aOu3s_o.png"
            />
          </div>
          <br />
          <div className="card-group">
            <MDBCard className="p-4 mx-3 mdbcard1">
              <MDBCardImage
                className="image"
                src="	https://images2.imgbox.com/75/77/pB6ZAA7J_o.png"
              />
              <div class="card-body">
                <p class="cardtext1">Create Your Space</p>
              </div>
            </MDBCard>

            <MDBCard className="p-4 mx-3 mdbcard2">
              <MDBCardImage
                className="image"
                src="	https://images2.imgbox.com/f2/de/HhRfNVZp_o.png"
              />
              <div class="card-body">
                <p class="cardtext1">Simple Functionality</p>
              </div>
            </MDBCard>

            <MDBCard className="p-4 mx-3 mdbcard3">
              <MDBCardImage
                className="image"
                src="https://images2.imgbox.com/ec/a9/1uLdstyZ_o.png"
              />
              <div class="card-body">
                <p class="cardtext1">Browse for Inspiration</p>
              </div>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
}
