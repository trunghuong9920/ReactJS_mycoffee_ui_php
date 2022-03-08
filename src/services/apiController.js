function ApiController() {
    const create = (api,formData) => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)

        }
        fetch(api, options)
            .then(res => res.json())
            .then(datas => {
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const editData = (api,formData) => {
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)

        }
        fetch(api, options)
            .then(res => res.json())
            .then(datas => {
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const deleteData = (api,id) =>{
        const options = {
            method:"DELETE",
            headers: {
              'Content-Type': 'application/json'
            }
          }
          fetch(api+'/'+id,options)
            .then(res => res.json())
            .then(() =>{
              
            })
            .catch(error => {
              console.error('Error:', error);
            });
    }

    return {create, editData,deleteData}
}
export default ApiController