import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Contacts } from "./Contacts";

export const AddContact = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="full_name"
							value={store.contacts.full_name}
							onChange={e => actions.addContact(e)}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							name="email"
							value={store.contacts.email}
							onChange={e => actions.addContact(e)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter phone"
							name="phone"
							value={store.contacts.phone}
							onChange={e => actions.addContact(e)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							name="address"
							value={store.contacts.address}
							onChange={e => actions.addContact(e)}
						/>
					</div>
					<button type="button" className="btn btn-primary form-control" onClick={e => actions.Submit(e)}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
