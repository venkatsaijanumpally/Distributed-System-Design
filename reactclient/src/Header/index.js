import React, { useEffect, useState } from "react";
import axios from "../helper/axios";

const Header = (props) => {
  const [elasticData, setElasticData] = useState("");
  const getData = async () => {
    await axios.get(`/reviews`).then(
      (response) => {
        setElasticData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    getData();
  }, []);
  const reviews = [
    {
      _index: "reviews",
      _type: "_doc",
      _id: "QT7UXowB2RFwBs3zYIJ0",
      _score: 2.5211835,
      _source: {
        review_detail:
          "I enjoyed the first season, but I must say I think season 2 is even stronger. Ricky does a great job as both writer, actor and director and brings out the best in a superb supporting cast. If there was one thing I'd change, I'd like to hear him talk about himself less with other people and speak more in the third person, but other than that it's pretty hard to fault this funny yet emotional comedy.",
        "@timestamp": "2023-12-12T16:20:25.632Z",
        review_id: "rw5704482",
        rating: "9",
        spoiler_tag: 0,
        review_summary: "Very Strong Season 2",
        review_date: "3 May 2020",
        reviewer: "raeldor-96879",
        helpful: ["1", "1"],
        "@version": "1",
        movie: "After Life (2019– )",
      },
    },
    {
      _index: "reviews",
      _type: "_doc",
      _id: "SD77XowB2RFwBs3zYIJs",
      _score: 2.5211835,
      _source: {
        "@timestamp": "2023-12-12T17:03:01.331Z",
        spoiler_tag: 0,
        movie: "Animal (2019– )",
        review_date: "3 May 2020",
        reviewer: "raeldor-96879",
        review_detail:
          "I enjoyed the first season, but I must say I think season 2 is even stronger. Ricky does a great job as both writer, actor and director and brings out the best in a superb supporting cast. If there was one thing I'd change, I'd like to hear him talk about himself less with other people and speak more in the third person, but other than that it's pretty hard to fault this funny yet emotional comedy.",
        review_summary: "Very Strong Season 3",
        "@version": "1",
        rating: "9",
        review_id: "rw5704482",
        helpful: ["1", "1"],
      },
    },
  ];

  return (
    <div>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px",
          textAlign: "center",
        }}>
        <h1>My React App</h1>
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
            {reviews.map((row) => (
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
