import AuthCheck from "../../components/authentication/AuthCheck";
import BlogList from "../../components/blogList";
import Action from "../../components/nav";
import { Box } from "@chakra-ui/react";
import data from "./orderdata.json";
import "./orderstyle.css";
import { useState } from "react";
function Order() {
    const [page, setPage] = useState(0);
  let pattern = null;
  switch (true) {
    case 4 < 7:
      pattern = [...new Array(4)].map((_, i) => i + 1);
      break;
    case page < 4:
      pattern = [1, 2, 3, 4, 5, "...", 4];
      break;
    case page > 4 - 4:
      pattern = [1, "...", 4 - 4, 4 - 3, 4 - 2, 4 - 1, 4];
      break;
    default:
      pattern = [1, "...", page - 1, page, page + 1, "...", 4];
  }

  function changeNumber(n) {
    if (typeof n === "number" && n > 0 && n <= 4) {
      setPage(n);
    }
  }
  return (
    <Box>
      <AuthCheck>
        <Action hasBanner={true} isBlog={true} isLogin={false} />
        <div className="container">
          <div className="col_dash">
            <div className="white_box">
              <div style={{ flex: "1 1 0%" }}>
                <div className="list_header">
                  <div className="main_title">
                    <h3>Order List</h3>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th style={{ borderRadius: "30px 0 0 30px" }}>Name</th>
                      <th>Date</th>
                      <th>Money</th>
                      <th>Products</th>
                      <th style={{ borderRadius: "0px 30px 30px 0px" }}>
                        Status
                      </th>
                      {/* <th style={{ width: 120, borderRadius: "0px 30px 30px 0px" }}>
            Delete
          </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data && (
                      <>
                        {data.length > 0 ? (
                          <>
                            {data
                              .slice(0 + page, 6 + page)
                              .map((houses, index) => {
                                return (
                                  <tr key={index}>
                                    <th>
                                      <p>{houses.Name}</p>
                                    </th>
                                    <th>
                                      <p>{houses.Date}</p>
                                    </th>
                                    <th>
                                      <p>{houses.Money}</p>
                                    </th>
                                    <th>
                                      <p>{houses.Products[0]}</p>
                                    </th>
                                    <th>
                                      <p>{houses.Status}</p>
                                    </th>
                                  </tr>
                                );
                              })}
                          </>
                        ) : (
                          "trống trơn"
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <ul>
                  <li className="btn">
                    <span
                      disabled={page <= 1}
                      onClick={() => changeNumber(page - 1)}
                    >
                      {"<"} Prev
                    </span>
                  </li>
                  {pattern.map((label, index) => (
                    <li
                      className={page === label ? "active" : "numb"}
                      key={index}
                    >
                      <span onClick={() => changeNumber(label)}>{label}</span>
                    </li>
                  ))}
                  <li className="btn">
                    <span
                      disabled={page >= 4}
                      onClick={() => changeNumber(page + 1)}
                    >
                      Next {">"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AuthCheck>
    </Box>
  );
}

export default Order;
