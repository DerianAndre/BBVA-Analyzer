export const Form = ({
    saldo,
    offset,
    handleInputChange,
    handleTextareaChange,
    handleSubmit,
    handleOffsetChange,
}) => {
    return (
        <div>
            <div className="row gx-4">
                <div className="col mb-4">
                    <label htmlFor="input">Saldo a la fecha</label>
                    <input
                        type="text"
                        className="form-control"
                        id="input"
                        onChange={handleInputChange}
                        value={saldo}
                    />
                </div>
                <div className="col-4 col-sm-3 mb-4">
                    <label htmlFor="input">Offset</label>
                    <input
                        type="text"
                        className="form-control"
                        id="input"
                        onChange={handleOffsetChange}
                        value={offset}
                    />
                </div>
            </div>
            <p className="lead">
                Ingresa los datos de tabla obtenidos de BBVA Web
            </p>
            <div className="mb-4">
                <label className="form-label" htmlFor="table">
                    Tabla HTML
                </label>
                <textarea
                    className="form-control"
                    name="table"
                    id="table"
                    cols="30"
                    rows="10"
                    onChange={handleTextareaChange}
                    placeholder="<table>...</table>"
                ></textarea>
            </div>
            <button
                className="btn btn-primary btn-lg"
                type="submit"
                onClick={handleSubmit}
            >
                Analizar datos
            </button>
        </div>
    );
};
