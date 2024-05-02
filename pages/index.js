import "datatables.net-dt/css/dataTables.dataTables.min.css";

import Head from "next/head";
import { useEffect, useState } from "react";
import { Debug } from "../components/Debug";
import { Results } from "../components/Results";
import { TableResults } from "../components/TableResults";
import { Form } from "../components/Form";
import { useLocalStorage } from "../hooks/useLocalStorage";
import moment from "moment";
import Link from "next/link";

export default function Home() {
    const [table, setTable] = useLocalStorage("table", false);
    const [input, setInput] = useState("");
    const [data, setData] = useLocalStorage("data", null);
    const [dataTable, setDataTable] = useLocalStorage("data-table", null);
    const [stored, setStored] = useLocalStorage("stored", false);
    const [offset, setOffset] = useLocalStorage("offset", 0);
    const [fecha, setFecha] = useLocalStorage("fecha", null);
    const [saldo, setSaldo] = useLocalStorage("saldo", null);
    const [total, setTotal] = useLocalStorage("total", null);
    const [totalMensual, setTotalMensual] = useLocalStorage(
        "totalMensual",
        null
    );
    const [showDebug, setDebug] = useState(false);

    const formatter = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        // These options are needed to round to whole numbers if that's what you want.
        // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const clearStorage = () => {
        localStorage.clear();
        setStored(false);
        setData(null);
        setTotal(null);
        setTotalMensual(null);
    };

    const resetForm = () => {
        setTable(false);
        setInput("");
        setData(null);
        setDataTable(null);
        setTotal(null);
        setTotalMensual(null);
    };

    const minifyHTMLString = (htmlString) => {
        // Remove all attributes from html tags
        htmlString = htmlString.replace(/<[^>]*>/g, (tag) => {
            return tag.replace(/ [^=]+="[^"]*"/g, "");
        });

        // Remove all white space without affecting html tags
        htmlString = htmlString.replace(/(?<=>)\s+|\s+(?=<)/g, "");

        return htmlString;
    };

    const handleInputChange = (e) => {
        let value = e.target.value;
        const regex = /(\$[0-9,]+\.\d{2})/;
        const matches = value.match(regex);

        if (matches) {
            value = matches[0];
        }

        value = Number(value.replace(/[$, ]/g, ""));

        setSaldo(value);
    };

    const handleOffsetChange = (e) => {
        const value = e.target.value;
        const offset = Number(value.replace(/[$, ]/g, ""));
        setOffset(Number(offset));
    };

    const handleTextareaChange = (e) => {
        setInput(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setDebug(e.target.checked);
    };

    const handleSubmit = () => {
        const tableString = minifyHTMLString(input);
        setDataTable(tableString);
        const parsedData = parseHTMLTable(tableString);
        setData(parsedData);
        setStored(true);
        setFecha(new Date());
    };

    const createElementFromHTML = (htmlString) => {
        const div = document.createElement("div");
        div.innerHTML = htmlString.trim();
        const tableHTML = div.getElementsByTagName("table");
        setTable(true);
        return tableHTML;
    };

    const parseHTMLTable = (tableHTML) => {
        if (!tableHTML) return;

        const table = createElementFromHTML(tableHTML)[0];

        if (!table || !table.rows[0] || !table.rows[0].cells[0]) return;

        let header = [];
        let rows = [];

        for (let i = 0; i < table.rows[0]?.cells?.length; i++) {
            header.push(table.rows[0]?.cells[i]?.innerHTML);
        }

        for (let i = 1; i < table.rows.length; i++) {
            const row = {};

            for (let j = 0; j < table.rows[i].cells.length; j++) {
                const inner = table.rows[i].cells[j].innerHTML;
                if (inner && inner !== "-") {
                    row["Id"] = i;
                    row[header[j]] = inner;
                }
            }

            rows.push(row);
        }

        const total = rows.reduce((total, object) => {
            return (
                total +
                ((object?.Importe &&
                    Number(object?.Importe.replace(/[$,]/g, ""))) ||
                    0)
            );
        }, 0);

        const totalMensual = rows.reduce((total, object) => {
            const value =
                (object?.Importe &&
                    Number(object?.Importe.replace(/[$,]/g, ""))) ||
                0 ||
                0;
            const plazos = object?.Plazo || 0;
            return total + value / plazos;
        }, 0);

        setTotal(total);
        setTotalMensual(totalMensual);

        rows = rows.map((item) => {
            const value = (
                Number(item?.Importe.replace(/[$,]/g, "")) /
                Number(item["Plazo"])
            ).toFixed(2);
            // Set number as currency
            item["Mensualidad"] = formatter.format(value);
            item["Vigencia"] = formatDate(item["Vigencia"]);

            return item;
        });

        // Order by date (Vigencia) format YYYY/MM/DD
        rows.sort((a, b) => {
            return new Date(a["Vigencia"]) - new Date(b["Vigencia"]);
        });

        return rows;
    };

    const formatDate = (date) => {
        const formattedDate = moment(date, "DD/MM/YYYY").format(
            "YYYY / MM / DD"
        );
        return formattedDate;
    };

    useEffect(() => {
        if (dataTable) {
            const parsedData = parseHTMLTable(dataTable);
            setData(parsedData);
        }
    }, []);

    return (
        <div className="container py-4" style={{ maxWidth: 800 }}>
            <Head>
                <title>BBVA Analyzer</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center justify-content-between">
                    <Link href="/">
                        <h1>BBVA Analyzer</h1>
                    </Link>

                    <div className="d-flex align-items-center gap-2">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="debug"
                                name="debug"
                                onClick={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="debug">
                                Debug
                            </label>
                        </div>
                        <button
                            className="btn btn-warning rounded-pill"
                            onClick={resetForm}
                        >
                            <i className="bi bi-arrow-counterclockwise" />
                        </button>
                        <button
                            className="btn btn-danger rounded-pill"
                            onClick={clearStorage}
                        >
                            <i className="bi bi-trash" />
                        </button>
                    </div>
                </div>

                {!data ? (
                    <>
                        {stored && (
                            <Results
                                total={total}
                                totalMensual={totalMensual}
                                saldo={saldo}
                                offset={offset}
                                local={true}
                                fecha={fecha}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <Results
                            total={total}
                            totalMensual={totalMensual}
                            saldo={saldo}
                            offset={offset}
                        />
                    </>
                )}

                {table && data && <TableResults table={table} data={data} />}

                <Debug data={data} input={input} show={showDebug} />

                <Form
                    saldo={saldo}
                    offset={offset}
                    handleInputChange={handleInputChange}
                    handleOffsetChange={handleOffsetChange}
                    handleTextareaChange={handleTextareaChange}
                    handleSubmit={handleSubmit}
                />
            </main>
        </div>
    );
}
