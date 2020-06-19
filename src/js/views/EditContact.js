import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Contacts } from "./Contacts";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		console.log(props.match.params.id);
		actions.setContact(props.match.params.id);
	}, []);

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="full_name"
							value={store.editContact.full_name}
							onChange={e => actions.editContact(e)}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							name="email"
							value={store.editContact.email}
							onChange={e => actions.editContact(e)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter phone"
							name="phone"
							value={store.editContact.phone}
							onChange={e => actions.editContact(e)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							name="address"
							value={store.editContact.address}
							onChange={e => actions.editContact(e)}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={e => actions.updateContact(e, props.match.params.id)}
						id={store.contact.id}>
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

EditContact.propTypes = {
	match: PropTypes.object
};
