import useSWR from "swr";
import { request } from "graphql-request";
import styles from "../../../styles/Table.module.scss";
import IssueDetails from "./IssueDetails";
import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";

const IssuesList = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/getIssues", fetcher);
  // how will I set this before I even get my data
  const [state, setState] = useState([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
    { id: 3, name: "fiona" },
  ]);
  // if (error) return <div className="loadingContainer">failed to load</div>;
  // if (!data)
  //   return (
  //     <div className={styles.loadingContainer}>
  //       <div className={styles.loadingSpinner}></div>
  //     </div>
  //   );

  // Titles for the table. There's a CSS rule in Table.module.scss that assigns these values to pseudo elements that show on mobile.
  const titles = ["Status", "ID", "Title"];
  const titlesList = titles.map((title) => <th>{title}</th>);

  const list = Object.keys(data).map((k) => (
    <>
      <tr key={k}>
        <td>
          <p>{data[k].state}</p>
        </td>
        <td titleName={titles[0]} className={styles.rightAlign}>
          <strong>{data[k].number}</strong>
        </td>
        <td titleName={titles[1]}>
          {data[k].title}
          <p>{data[k].repository.name}</p>
        </td>
      </tr>

      {/* only loading one so I could style it without it taking over the page before toggling is complete */}
      {/* {data[k].number == "361" && <IssueDetails issue={data[k]} />} */}
    </>
  ));

  return (
    <>
      <ReactSortable list={state} setList={setState}>
        {state.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </ReactSortable>
      <table className={styles.table}>
        <thead>
          <tr>{titlesList}</tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </>
  );
};

export default IssuesList;
