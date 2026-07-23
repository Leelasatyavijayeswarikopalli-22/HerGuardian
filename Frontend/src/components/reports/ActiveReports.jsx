import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card";

export default function ActiveReports() {

    const [reports, setReports] = useState([]);

    async function loadReports() {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/reports/active"
            );

            setReports(response.data);

        } catch (error) {

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
                className="mb-6 text-2xl font-bold text-red-700"
            >
                ACTIVE REPORTS
            </h2>


            {reports.length === 0 && (

                <p>No Active Reports Found.</p>

            )}


            {reports.map((report) => (

                <div
                    key={report.id}
                    className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-5 shadow-md"
                >

                    <h3
                        className="text-lg font-bold"
                    >
                        {report.category}
                    </h3>

                    <p className="mt-2">
                        <b>Location :</b> {report.location}
                    </p>

                    <p>
                        <b>Description :</b> {report.description}
                    </p>

                    <p>
                        <b>Status :</b> {report.status}
                    </p>

                    <p>
                        <b>Reported By :</b> {report.reportCount} Users
                    </p>

                    {report.adminRemark && (

                        <p>
                            <b>Authority Remark :</b> {report.adminRemark}
                        </p>

                    )}

                </div>

            ))}

        </Card>

    );
}