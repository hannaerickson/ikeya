import { useState } from "react";

function SignUpForm() {
    return (
        <>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signup">
            Launch demo modal
            </button>

            <div class="modal fade" id="signup" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Sign Up</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="signup-form">
                        <div className="form-floating mb-3">
                            <input placeholder="First Name" required type="text"
                            name="first" id="first" className="form-control"/>
                            <label htmlFor="first">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Last Name" required type="text"
                            name="last" id="last" className="form-control"/>
                            <label htmlFor="last">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Enter your username" required type="text"
                            name="username" id="username" className="form-control"/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Enter your password" required type="password"
                            name="password" id="password" className="form-control"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Sign Up</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default SignUpForm;
