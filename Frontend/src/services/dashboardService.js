import axios from "axios";


export async function getDashboard(

        latitude,
        longitude

){


const response=await axios.get(

`http://localhost:8080/api/dashboard?lat=${latitude}&lon=${longitude}`

);


return response.data;


}