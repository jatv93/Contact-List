const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contacts: {
				full_name: "",
				email: "",
				agenda_slug: "jatv",
				address: "",
				phone: ""
			},

			List: []
		},
		actions: {
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
					body: JSON.stringify(store.contacts),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log(data);
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
										contacts: {
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
						}
					})
					.catch(error => {
						console.log(error);
					});
			},

			addContact: e => {
				const store = getStore();
				const { contacts } = store;
				contacts[e.target.name] = e.target.value;
				setStore({ contacts: contacts });
				e.preventDefault();
			},

			deleteContact: contact_id => {
				const store = getStore();
				store.List.splice(contact_id, 1);
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
			}
		}
	};
};

export default getState;
