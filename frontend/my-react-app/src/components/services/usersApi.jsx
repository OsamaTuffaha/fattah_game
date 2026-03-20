import axios from "axios"

export const getUsers = async () =>{

    const result = await axios.get('http://localhost:5000/user')
    return result.data.users

    


}