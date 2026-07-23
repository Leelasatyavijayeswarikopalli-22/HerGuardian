import ReportForm from "../components/reports/ReportForm";

import ActiveReports from
"../components/reports/ActiveReports";


import RectifiedReports from
"../components/reports/RectifiedReports";

import {useState} from "react";

import {useEffect} from "react";


export default function CommunityReports(){
const [refresh,setRefresh]=
useState(false);

useEffect(()=>{


const listener=()=>{

setRefresh((prev)=>!prev);

};


window.addEventListener(

"reportSubmitted",

listener

);


return ()=>{


window.removeEventListener(

"reportSubmitted",

listener

);


};


},[]);

return(


<div className="p-6">


<h1

className="mb-6
text-4xl
font-bold
text-purple-700"

>

Community Reports

</h1>



<div

className="grid
gap-5
lg:grid-cols-2"

>


<ReportForm/>


<ActiveReports

refresh={refresh}

/>


</div>



<div
className="mt-6"
>

<RectifiedReports

refresh={refresh}

/>

</div>



</div>


);


}