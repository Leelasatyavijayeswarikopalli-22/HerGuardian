import ReportForm from "../components/reports/ReportForm";

import ActiveReports from
"../components/reports/ActiveReports";


import RectifiedReports from
"../components/reports/RectifiedReports";


export default function CommunityReports(){


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


<ActiveReports/>


</div>



<div
className="mt-6"
>

<RectifiedReports/>

</div>



</div>


);


}