import React, { useEffect, useState } from "react";
import axios from "../helper/axios";

const Header = (props) => {
  const [elasticData, setElasticData] = useState("");

  const getData = async () => {
    await axios
      .get(
        `http://a88fe0623e7854b89881768bfc09355e-1579644646.us-west-1.elb.amazonaws.com:8000/reviews/review/raeldor-96879/`
      )
      .then(
        (response) => {
          console.log(response.data.reviews);
          setElasticData(response.data.reviews);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px",
          textAlign: "center",
        }}>
        <h1>Distributed Systems</h1>
      </header>

      {/* Table */}
      <div style={{ margin: "20px" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Movie
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Reviewer
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Review_date
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Review_detail
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Review_summary
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {elasticData &&
              elasticData.map((row) => (
                <tr key={row.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row._source.movie}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row._source.reviewer}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row._source.review_date}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row._source.review_detail}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row._source.review_summary}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row._source.rating}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Header;
