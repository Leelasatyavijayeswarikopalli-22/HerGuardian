import {useEffect,useState} from "react";
import axios from "axios";
import Card from "../Card";
import Button from "../Button";


export default function ManageReports(){


const [reports,setReports]=
useState([]);


const [remarks,setRemarks]=
useState({});


const [status,setStatus]=
useState({});


useEffect(()=>{

loadReports();

},[]);



async function loadReports(){


try{


const response=

await axios.get(

"http://localhost:8080/api/reports"

);


setReports(

response.data

);


}


catch(error){

console.log(error);

}


}




async function updateReport(id){


try{


await axios.put(

`http://localhost:8080/api/reports/status/${id}`,

{

status:

status[id] || "ACTIVE",


adminRemark:

remarks[id] || "",


authorityName:

localStorage.getItem(

"name"

)
}

);



alert(

"Report Updated Successfully."

);


loadReports();


}


catch(error){

console.log(error);

}


}




return(


<div>


{

reports.map((report)=>(


<Card

key={report.id}

className="mb-5"

>


<h2

className="text-xl
font-bold
text-purple-700"

>

{report.category}

</h2>



<p className="mt-2">

<b>Location :</b>

{report.location}

</p>



<p>

<b>Description :</b>

{report.description}

</p>



<p>

<b>Current Status :</b>

{report.status}

</p>



<select

value={

status[report.id]

||

report.status

}

onChange={(e)=>{

setStatus({

...status,

[report.id]:

e.target.value

});

}}

className="mt-4
w-full
rounded-xl
border
p-3"

>


<option>

ACTIVE

</option>


<option>

UNDER_VERIFICATION

</option>


<option>

IN_PROGRESS

</option>


<option>

RECTIFIED

</option>


</select>




<textarea

rows="4"

placeholder="Authority Remarks"


value={

remarks[report.id]

|| ""

}


onChange={(e)=>{


setRemarks({

...remarks,

[report.id]:

e.target.value

});


}}

className="mt-4
w-full
rounded-xl
border
p-3"


/>




<Button

onClick={()=>{

updateReport(

report.id

);

}}

className="mt-4
w-full"

>

UPDATE REPORT


</Button>



</Card>


))


}



</div>


);


}