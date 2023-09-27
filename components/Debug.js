export const Debug = ({ data, input, show }) => {
    if (!show) {
        return <></>;
    }

    return (
        <div className="card shadow border border-1">
            <div className="card-body">
                <h5 className="card-title mb-4">Debug</h5>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h6>Input</h6>
                        <div className="border border-1">
                            <small>
                                <code
                                    className="d-block overflow-auto"
                                    style={{ height: "200px" }}
                                >
                                    <p className="lh-1 text-break">{input}</p>
                                </code>
                            </small>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <h6>Output</h6>
                        <div className="border border-1">
                            <small>
                                <code>
                                    <pre
                                        className="lh-1 m-0"
                                        style={{ height: "200px" }}
                                    >
                                        {JSON.stringify(data, null, 2)}
                                    </pre>
                                </code>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
