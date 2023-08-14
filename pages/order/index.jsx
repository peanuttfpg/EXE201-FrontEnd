import AuthCheck from "../../components/authentication/AuthCheck";
import BlogList from "../../components/blogList";
import Action from "../../components/nav";
import { Box } from "@chakra-ui/react";
// import data from "./orderdata.json";
import "./orderstyle.css";
import { useState,useEffect } from "react";
import useUserContext from "../../hooks/useUserContext";
import axios from "axios";
function Order() {
    const [page, setPage] = useState(0);
    const [range, setRange] = useState(0);
    const [data, setData] = useState(null);
    const { accessToken } = useUserContext();
      useEffect(() => {
        const getAllOrder = async () => {
          axios.create({
            baseURL: process.env.NEXT_PUBLIC_BASE_URL,
          }).get('/order/getAll',{
            page: page,
            headers : {
              Authorization : 'Bearer ' + accessToken
              }
            }
          )
            .then((res) => {
              console.log(res.data.content);
              setData(res.data.content);
              setRange(res.data.totalPages);
            })
            .catch((err) => {});
        };
        accessToken && getAllOrder();
        // eslint-disable-next-line
      }, [page]);
  let pattern = null;
  switch (true) {
    case range < 7:
      pattern = [...new Array(range)].map((_, i) => i + 1);
      break;
    case page < 4:
      pattern = [1, 2, 3, 4, 5, "...", range];
      break;
    case page > range - 4:
      pattern = [1, "...", range - 4, range - 3, range - 2, range - 1, range];
      break;
    default:
      pattern = [1, "...", page - 1, page, page + 1, "...", range];
  }

  function changeNumber(n) {
    if (typeof n === "number" && n > 0 && n <= range) {
      console.log("Page selected : " + n);
      setPage(n);
      console.log("Page : " + page);
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
                      <th>paymentMethod</th>
                      <th>Status</th>
                      <th style={{ borderRadius: "0px 30px 30px 0px" }}>
                        Action
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
                            {data.map((houses, index) => {
                              return (
                                <tr key={index}>
                                  <th>
                                    <p>{houses.user.name}</p>
                                  </th>
                                  <th>
                                    <p>{houses.orderDate}</p>
                                  </th>
                                  <th>
                                    <p>{houses.totalPrice} VND</p>
                                  </th>
                                  <th>
                                    <p>{houses.paymentMethod}</p>
                                  </th>
                                  <th>
                                    <p>
                                      {houses.orderType === "Pending"
                                        ? "processing "
                                        : houses.orderType}
                                    </p>
                                  </th>
                                  <th>
                                    <button className="btn-upsta">Update Status</button>
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
