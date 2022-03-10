function ApiController() {
    const create = (api, formData) => {
        const options = {
            method: "POST",
            body: formData
        }
        fetch(api, options)
            .then(res => res.json())
            .then(data => {
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const editData = (api, formData) => {
        const options = {
            method: "POST",
            body: formData
        }
        fetch(api, options)
            .then(res => res.json())
            .then(data => {
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const deleteData = (api, formData) => {
        const options = {
            method: "POST",
            body: formData
        }
        fetch(api, options)
            .then(res => res.json())
            .then(data => {
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return { create, editData, deleteData }
}
export default ApiController