import React, { useEffect, useState } from "react";
import axios from "../helper/axios";

const Header = (props) => {
  const [elasticData, setElasticData] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  const getData = async () => {
    await axios.get(`/reviews/review/${reviewerName}/`).then(
      (response) => {
        console.log(response.data.reviews);
        setElasticData(response.data.reviews);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      {/* Header */}
      <header
        style={{
          backgroundColor: "rgb(0 0 0 / 77%)",
          padding: "10px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
        }}>
        <h1
          style={{
            background:
              "linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}>
          Critique Quest
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <label style={{ marginRight: "10px" }}>Search :</label> */}
          <input
            type='text'
            placeholder='Enter reviewer name...'
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            style={{ padding: "8px", marginRight: "10px", marginLeft: "10px" }}
            size={160}
          />
          <button onClick={getData} style={{ padding: "8px" }}>
            Search
          </button>
        </div>
      </header>

      {/* Table */}
      <div style={{ margin: "10px" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead style={{ background: "#5dc65c" }}>
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
                <tr key={row.id} style={{ background: "#d3c8af" }}>
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
