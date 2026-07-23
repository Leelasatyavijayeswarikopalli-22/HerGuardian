import {useState} from "react";
import axios from "axios";
import Button from "../Button";
import Card from "../Card";

export default function ReportForm(){


const [category,setCategory]=
useState("");


const [description,setDescription]=
useState("");


const [location,setLocation]=
useState("");


const submitReport=async()=>{


try{


await axios.post(

"http://localhost:8080/api/reports",

{

category,
description,
location

}

);


alert(
"Report Submitted Successfully."
);


setCategory("");
setDescription("");
setLocation("");


}


catch(error){

console.log(error);

}


};



return(

<Card>

<h2
className="mb-5 text-2xl font-bold"
>

Community Safety Report

</h2>



<input

type="text"

placeholder="Location"

value={location}

onChange={(e)=>{

setLocation(

e.target.value

);

}}

className="mb-4
w-full
rounded-xl
border
p-3"

/>



<select

value={category}

onChange={(e)=>{

setCategory(

e.target.value

);

}}

className="mb-4
w-full
rounded-xl
border
p-3"

>


<option value="">

Select Category

</option>


<option>

Poor Lighting

</option>


<option>

No CCTV

</option>


<option>

Harassment

</option>


<option>

Unsafe Transport

</option>


<option>

Stalking

</option>


<option>

Suspicious Activity

</option>


<option>

Unsafe Area

</option>


<option>

Others

</option>



</select>



<textarea

rows="5"

value={description}

placeholder="Describe the issue..."

onChange={(e)=>{

setDescription(

e.target.value

);

}}

className="w-full
rounded-xl
border
p-3"

/>



<Button

onClick={submitReport}

className="mt-5 w-full"

>

Submit Report

</Button>


</Card>


);


}