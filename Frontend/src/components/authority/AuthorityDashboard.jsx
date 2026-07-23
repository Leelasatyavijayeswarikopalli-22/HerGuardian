import ManageReports from "./ManageReports";

export default function AuthorityDashboard(){


return(

<div className="p-6">


<h1

className="mb-6
text-4xl
font-bold
text-purple-700"

>

AUTHORITY DASHBOARD

</h1>


<p

className="mb-6
rounded-xl
bg-purple-100
p-4
text-purple-700"

>

Authorities can verify reports,
change their status and update
the users about the issue.


</p>


<ManageReports/>


</div>

);


}