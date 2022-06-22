const CodeFile = ({ file }) => {
  return (
    <>
      {Object.keys(file)
        .sort()
        .map((lineNumber) => (
          <>
            <h3>{lineNumber}</h3>
            <ul>
              {file[lineNumber].map((issue) => (
                <li>
                  {issue.labels.map((label) => (
                    <strong
                      className={"bug-label L" + label.color}
                      style={{ backgroundColor: "#" + label.color }}
                      title={label.name}
                    >
                      {label.name.charAt(0)}
                    </strong>
                  ))}
                  <a href={issue.url}>
                    #{issue.number} - {issue.title}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ))}
    </>
  );
};

export default CodeFile;
