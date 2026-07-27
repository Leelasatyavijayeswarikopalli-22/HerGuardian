import api from '../api/api';


export async function getDashboard(

        latitude,
        longitude

){


const response=await api.get(

`/dashboard?lat=${latitude}&lon=${longitude}`

);


return response.data;


}