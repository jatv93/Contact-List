import { element } from "prop-types";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contact: {
				full_name: "",
				email: "",
				agenda_slug: "jatv",
				address: "",
				phone: ""
			},

			editContact: {
				full_name: "",
				email: "",
				agenda_slug: "jatv",
				address: "",
				phone: ""
			},

			List: []
		},
		actions: {
			setContact: id => {
				const store = getStore();
				const contact = store.List.filter(contact => contact.id === id);
				setStore({ editContact: contact[0] });
			},
			getList() {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/jatv", {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						setStore({ List: data });
					})
					.catch(error => {
						console.log(error);
					});
			},

			Submit: e => {
				e.preventDefault();
				const store = getStore();

				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify(store.contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log(data.msg);
						if (data.msg !== "Invalid value:  was expecting string between 1 and 255") {
							fetch("https://assets.breatheco.de/apis/fake/contact/agenda/jatv", {
								method: "GET",
								headers: {
									"Content-Type": "application/json"
								}
							})
								.then(resp => {
									return resp.json();
								})
								.then(data => {
									alert("Contact Save Successfully");
									setStore({
										List: data,
										contact: {
											full_name: "",
											email: "",
											address: "",
											phone: ""
										}
									});
								})
								.catch(error => {
									console.log(error);
								});
						} else {
							alert("Some information is missing");
						}
					})
					.catch(error => {
						console.log(error);
					});
			},

			addContact: e => {
				const store = getStore();
				const { contact } = store;
				contact[e.target.name] = e.target.value;
				setStore({ contact: contact });
				e.preventDefault();
			},

			deleteContact: (contact_id, index) => {
				const store = getStore();
				store.List.splice(index, 1);
				setStore({ List: store.List });
				console.log(contact_id);

				fetch("https://assets.breatheco.de/apis/fake/contact/" + contact_id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log(data);
					})
					.catch(error => {
						console.log(error);
					});
			},

			editContact: e => {
				const store = getStore();
				const { editContact } = store;
				editContact[e.target.name] = e.target.value;
				setStore({ editContact: editContact });
				e.preventDefault();
			},

			updateContact: (e, id) => {
				e.preventDefault();
				const store = getStore();

				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "PUT",
					body: JSON.stringify(store.editContact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log(data.msg);
						if (data) {
							fetch("https://assets.breatheco.de/apis/fake/contact/agenda/jatv", {
								method: "GET",
								headers: {
									"Content-Type": "application/json"
								}
							})
								.then(resp => {
									return resp.json();
								})
								.then(data => {
									alert("Contact Updated Successfully");
									setStore({
										List: data
									});
								})
								.catch(error => {
									console.log(error);
								});
						}
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	};
};

export default getState;
