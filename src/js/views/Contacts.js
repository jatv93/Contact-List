import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		showModal: false
	});

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.List.map((item, index) => {
							return (
								<ContactCard
									onDelete={() => setState({ showModal: true })}
									key={index}
									name={item.full_name}
									email={item.email}
									address={item.address}
									phone={item.phone}
									id={item.id}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			{store.List.map((item, index) => {
				return (
					<Modal
						key={index}
						show={state.showModal}
						onClose={() => setState({ showModal: false })}
						id={item.id}
					/>
				);
			})}
		</div>
	);
};
