export const Form = ({
    handleInputChange,
    handleTextareaChange,
    handleSubmit,
}) => {
    return (
        <div>
            <div className="mb-4">
                <label htmlFor="input">Saldo a la fecha</label>
                <input
                    type="text"
                    className="form-control"
                    id="input"
                    onChange={handleInputChange}
                />
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
