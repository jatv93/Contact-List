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
									setStore({ List: data });
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
						setStore({ List: data });
					})
					.catch(error => {
						console.log(error);
					});
			}

			/*	updateContact: (contact_id, name, email, agenda_slug, address, phone) => {
                    fetch("https://assets.breatheco.de/apis/fake/contact/" + contact_id, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            full_name: name,
                            email: email,
                            agenda_slug: agenda_slug,
                            address: address,
                            phone: phone
                        })
                    });
                }*/
		}
	};
};

export default getState;
