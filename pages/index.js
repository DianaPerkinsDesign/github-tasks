import useSWR from "swr";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styles from "../styles/Home.module.scss";

const Home = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/getIssues", fetcher);

  // set issue state
  const [state, setState] = useState([]);

  // set grade state
  if (typeof window !== "undefined") {
    const [gradeState, setGradeState] = useState(
      JSON.parse(localStorage.getItem("grades")) || {}
    );
  }

  if (error) return <div className="loadingContainer">failed to load</div>;
  if (!data)
    return (
      <div>
        <div>loading</div>
      </div>
    );

  // useEffect(() => {}, [gradeState]);

  const updateGrade = (event) => {
    const element = event.currentTarget;
    const { id, type, amount } = element.dataset;
    setGradeState((prevState) => {
      let grade = { ...prevState[id] };
      grade[type] = amount;
      prevState[id] = grade;
      localStorage.setItem("grades", JSON.stringify(prevState));
      return prevState;
    });
  };

  const hellojoe = () => new ReactSortable();

  const updateSort = (event) => {
    // hook into end of moving something
    console.log("yes:");
    // grab all the elements
    // pull out the ids in order
    // mutate current data to be in this new order of ids
    // setState() on sort order with the new ^
  };

  // const ItsAButton = ({ item, completeness }) => {
  //   const lol = () => {
  //     console.log("RADICAL");
  //   };
  //   return (
  //     <>
  //       <button
  //         data-id={item.id}
  //         data-type={"completeness"}
  //         data-amount={completeness}
  //         onClick={lol}
  //         className={
  //           gradeState[item.id] &&
  //           gradeState[item.id]["completeness"] === completeness
  //             ? styles.active
  //             : styles.inactive
  //         }
  //       ></button>
  //     </>
  //   );
  // };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.issuesList}>
        <ReactSortable list={data} setList={setState} onChange={updateSort}>
          {state.map((item) => (
            <li key={item.id} className={styles.issue}>
              <div className={styles.issueHeader}>
                <h2>{item.title}</h2>
                <h3>{item.repository.name}</h3>
              </div>
              <div className={styles.completenessButtonsList}>
                <button
                  data-id={item.id}
                  data-type={"completeness"}
                  data-amount={"1"}
                  onClick={updateGrade}
                  className={
                    gradeState[item.id] &&
                    gradeState[item.id]["completeness"] === "1"
                      ? styles.active
                      : styles.inactive
                  }
                ></button>
                <button
                  data-id={item.id}
                  data-type={"completeness"}
                  data-amount={"2"}
                  onClick={updateGrade}
                  className={
                    gradeState[item.id] &&
                    gradeState[item.id]["completeness"] === "2"
                      ? styles.active
                      : styles.inactive
                  }
                ></button>
                <button
                  data-id={item.id}
                  data-type={"completeness"}
                  data-amount={"3"}
                  onClick={updateGrade}
                  className={
                    gradeState[item.id] &&
                    gradeState[item.id]["completeness"] === "3"
                      ? styles.active
                      : styles.inactive
                  }
                ></button>
                <button
                  data-id={item.id}
                  data-type={"completeness"}
                  data-amount={"4"}
                  onClick={updateGrade}
                  className={
                    gradeState[item.id] &&
                    gradeState[item.id]["completeness"] === "4"
                      ? styles.active
                      : styles.inactive
                  }
                ></button>
              </div>
            </li>
          ))}
        </ReactSortable>
      </ul>
    </div>
  );
};

export default Home;
