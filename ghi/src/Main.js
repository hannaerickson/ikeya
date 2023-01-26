import React from "react";
import "./CSS/Style.css";

export default function Main() {
  return (
    <div className="container custom-bg h3">
      <figure className="figure">
        <img
          src="https://images2.imgbox.com/b6/27/MxZkOHAS_o.png"
          className="figure-img img-fluid rounded"
          alt="Main"
        />
        {/* <img src="https://images2.imgbox.com/df/7e/Gs9aOu3s_o.png" class="figure-img img-fluid rounded" alt="Main"/> */}
      </figure>
      <br />

      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="card card-style h-100 text-center">
            <img
              src="https://i.pinimg.com/736x/47/e9/4f/47e94f19d7c4a16516b13d6bf9b693c5.jpg"
              className="card-img-top"
              alt="first"
            />
            <div className="card-body">
              <p className="card-text">
                An online resource for finding home and room decor inspiration
                for the everyday user!
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-light h-100 text-center">
            <div className="card-body">
              <p className="card-text">
                Users can create rooms and easily add furniture to see how two
                or more pieces look side by side.
              </p>
            </div>
            <img
              src="https://i.pinimg.com/736x/e6/ee/60/e6ee604bc65af6ad772ba6f897ad8729.jpg"
              className="card-img-bottom"
              alt="first"
            />
          </div>
        </div>
        <div className="col">
          <div className="card card-style h-100 text-center">
            <img
              src="https://i.pinimg.com/736x/d5/8e/78/d58e78f2507e71690781b320154afb90.jpg"
              className="card-img-top"
              alt="first"
            />
            <div className="card-body">
              <p className="card-text">
                Browse the site and see what other users have created, or narrow
                it down with a simple search.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
