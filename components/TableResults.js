import { Table } from "./Table";

export const TableResults = ({ table, data }) => {
    if (!table || !data) return <></>;

    return (
        <>
            <div className="card shadow border border-1">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">Deudas a meses</h5>
                        <button
                            className="btn btn-primary btn-sm"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTable"
                            aria-expanded="false"
                        >
                            <i className="bi bi-chevron-down" />
                        </button>
                    </div>
                    <div id="collapseTable" className="collapse mt-4 show">
                        <Table data={data} />
                    </div>
                </div>
            </div>
        </>
    );
};
