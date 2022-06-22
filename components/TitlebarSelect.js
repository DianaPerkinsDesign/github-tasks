import styles from "../styles/TitlebarSelect.module.scss";
import { useState } from "react";
import Select from "react-select";

const options = [
  { value: "file-1", label: "file1.sol" },
  { value: "file-2", label: "file2.sol" },
  { value: "file-3", label: "file3.sol" },
];

const TitlebarSelect = ({ data }) => {
  const dataEvaluated = data.map((d) => {
    return { value: d, label: d };
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
      height: "100%",
    }),
    control: () => ({
      // Wrapper for the control part
      height: "100%",
      background: styles.titlebarInteractive,
      color: "white",
      display: "flex",
      fontWeight: "normal",
      paddingLeft: "5px",
      paddingRight: "5px",
    }),
    placeholder: (provided) => ({
      // Inside control
      ...provided,
      color: "white",
    }),
    indicatorSeparator: (provided) => ({
      // border between text and arrow
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      background: styles.titlebarInteractive,
      borderRadius: "0px",
      marginTop: "0px",
      boxShadow: "0",
      width: "fit-content",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "white",
      fontWeight: state.isSelected ? "bold" : "normal",
      padding: 20,
      "&:hover": {
        // background: styles.titlebarInteractive,
        // border: "1px solid " + styles.titlebar,
        // borderColor: styles.titlebar,
      },
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const color = "white";
      return { ...provided, opacity, transition, color };
    },
  };
  return (
    <>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={data ? dataEvaluated : options}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: styles.highlightBlue,
            primary: styles.c4purple,
            neutral20: "white",
            neutral40: "rgba(255,255,255,.8)",
            neutral70: "rgba(255,255,255,.9)",
            neutral80: "rgba(255,255,255,.9)",
            neutral90: "rgba(255,255,255,.9)",
            primary50: styles.highlightBlue,
          },
        })}
      />
    </>
  );
};

export default TitlebarSelect;
