import {useEffect,useState} from "react";
import axios from "axios";
import Card from "../Card";


export default function ActiveReports(){


const [reports,setReports]=
useState([]);


useEffect(()=>{

loadReports();

},[]);



async function loadReports(){


const response=

await axios.get(

"http://localhost:8080/api/reports/active"

);


setReports(

response.data

);


}



return(


<Card>


<h2
className="mb-5 text-xl font-bold"
>

ACTIVE REPORTS

</h2>



{

reports.map((report)=>(


<div

key={report.id}

className="mb-4
rounded-xl
bg-red-50
p-4"

>

<h3
className="font-bold"
>

{report.category}

</h3>


<p>

{report.location}

</p>


<p>

{report.description}

</p>


<p>

Status :

{report.status}

</p>



</div>


))


}



</Card>


);


}