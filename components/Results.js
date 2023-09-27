const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const Results = ({ saldo, total, totalMensual }) => {
    return (
        <div className="card shadow border border-1">
            <div className="card-body">
                <h5 className="card-title mb-4">Resultados</h5>
                <table
                    id="table-info"
                    className="table table-sm table-striped table-hover mb-0"
                >
                    <tbody>
                        <tr>
                            <th scope="row">Deuda total</th>
                            <td>{saldo ? formatter.format(saldo) : 0}</td>
                        </tr>
                        <tr>
                            <th scope="row">Deuda compras MSI</th>
                            <td>{total ? formatter.format(total) : 0}</td>
                        </tr>
                        <tr>
                            <th scope="row">Compras a MSI</th>
                            <td>
                                {totalMensual
                                    ? formatter.format(totalMensual)
                                    : 0}
                            </td>
                        </tr>
                        <tr className="table-primary">
                            <th scope="row">Compras del mes</th>
                            <td>
                                {saldo && total
                                    ? formatter.format(saldo - total)
                                    : 0}
                            </td>
                        </tr>
                        <tr className="table-secondary">
                            <th scope="row">Pago mensual total</th>
                            <td>
                                {saldo && total && totalMensual
                                    ? formatter.format(
                                          saldo - total + totalMensual
                                      )
                                    : 0}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
