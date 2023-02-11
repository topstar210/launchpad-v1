const ProjectDetail = (props) => {
  const { projects, onChangeProject } = props;
  const { pool_info, token_info } = projects;

  return (
    <div className="py-3">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Pool information</div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table mb-0 pp-table-info">
                  <tbody>
                    <tr>
                      <td>Opens</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={Boolean(pool_info) ? pool_info.opens : ""}
                          onChange={(e) =>
                            onChangeProject(e, "pool_info.opens")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>FCFS Opens</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={Boolean(pool_info) ? pool_info.fcfs_opens : ""}
                          onChange={(e) =>
                            onChangeProject(e, "pool_info.fcfs_opens")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Closes</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={Boolean(pool_info) ? pool_info.closes : ""}
                          onChange={(e) =>
                            onChangeProject(e, "pool_info.closes")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Swap Rate</td>
                      <td>
                        <span
                          id="idBusdConvert"
                          style={{ textTransform: "uppercase" }}
                        >
                          <input
                            type="text"
                            value={
                              Boolean(pool_info) ? pool_info.swap_rate : ""
                            }
                            onChange={(e) =>
                              onChangeProject(e, "pool_info.swap_rate")
                            }
                          />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Cap</td>
                      <td>
                        <span style={{ textTransform: "uppercase" }}>
                          <input
                            type="text"
                            value={Boolean(pool_info) ? pool_info.cap : ""}
                            onChange={(e) =>
                              onChangeProject(e, "pool_info.cap")
                            }
                          />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Users Participated</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={
                            Boolean(pool_info)
                              ? pool_info.total_users_participated
                              : ""
                          }
                          onChange={(e) =>
                            onChangeProject(
                              e,
                              "pool_info.total_users_participated"
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Total Funds Swapped</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={
                            Boolean(pool_info)
                              ? pool_info.total_funds_swapped
                              : ""
                          }
                          onChange={(e) =>
                            onChangeProject(e, "pool_info.total_funds_swapped")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Access Type</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={
                            Boolean(pool_info) ? pool_info.access_type : ""
                          }
                          onChange={(e) =>
                            onChangeProject(e, "pool_info.access_type")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Min Contribution</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={
                            Boolean(pool_info) ? pool_info.min_contribution : ""
                          }
                          onChange={(e) =>
                            onChangeProject(e, "pool_info.min_contribution")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Max Contribution</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={
                            Boolean(pool_info) ? pool_info.max_contribution : ""
                          }
                          onChange={(e) =>
                            onChangeProject(e, "pool_info.max_contribution")
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <div className="card">
            <div className="card-header">Token information</div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table mb-0 pp-table-info">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={Boolean(token_info) ? token_info.name : ""}
                          onChange={(e) =>
                            onChangeProject(e, "token_info.name")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Token Symbol</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={
                            Boolean(token_info) ? token_info.token_symbol : ""
                          }
                          onChange={(e) =>
                            onChangeProject(e, "token_info.token_symbol")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Total Supply</td>
                      <td className="text-right">
                        <input
                          type="text"
                          value={
                            Boolean(token_info) ? token_info.total_supply : ""
                          }
                          onChange={(e) =>
                            onChangeProject(e, "token_info.total_supply")
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
