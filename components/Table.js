import { useEffect } from "react";

export const Table = ({ data }) => {
    useEffect(() => {
        if (!data) return;

        const $ = require("jquery");
        $.DataTable = require("datatables.net");
        const dataTable = $("#table").DataTable({
            paging: false,
        });

        // Destroy table if updates
        return () => dataTable.destroy();
    }, [data]);

    return (
        <table
            id="table"
            className="table table-sm table-striped table-hover"
            style={{ fontSize: "0.8rem" }}
        >
            <thead>
                <tr>
                    {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.Id + Math.random()}>
                        {Object.values(item).map((val) => (
                            <td key={val + Math.random()}>{val}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
