import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card";

export default function RectifiedReports() {

    const [reports, setReports] = useState([]);

    async function loadReports() {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/reports/rectified"
            );

            setReports(response.data);

        }
        catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {

        loadReports();

        const interval = setInterval(() => {

            loadReports();

        }, 5000);

        return () => clearInterval(interval);

    }, []);


    return (

        <Card>

            <h2
                className="mb-6 text-2xl font-bold text-green-700"
            >
                SAFE NOW
            </h2>


            {reports.length === 0 && (

                <p>
                    No Rectified Reports Found.
                </p>

            )}


            {reports.map((report) => (

                <div
                    key={report.id}
                    className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-5 shadow-md"
                >

                    <h3 className="text-lg font-bold">
                        {report.category}
                    </h3>


                    <p>
                        <b>Location :</b> {report.location}
                    </p>


                    <p>
                        <b>Status :</b> SAFE NOW
                    </p>


                    <p>
                        <b>Resolved By :</b> {report.authorityName}
                    </p>


                    <p>
                        <b>Resolved On :</b>{" "}
                        {
                            report.resolvedAt
                                ? new Date(report.resolvedAt).toLocaleString()
                                : "-"
                        }
                    </p>


                    <p>
                        <b>Authority Remark :</b> {report.adminRemark}
                    </p>


                    <p>
                        <b>Reported By :</b> {report.reportCount} Users
                    </p>

                </div>

            ))}

        </Card>

    );

}