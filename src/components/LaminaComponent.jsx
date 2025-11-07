const LaminaComponent = ({ data }) => {
  return (
    // <div className="d-flex flex-wrap gap-3">
    //   {data.map((item, i) => (
    //     <div
    //       key={i}
    //       className="card p-2 bg-dark text-light d-flex flex-column justify-content-center align-items-center"
    //       style={{
    //         height: "160px",
    //         width: "140px",
    //       }}
    //     >
    //       <h1>{i + 1}</h1>
    //       <strong className="mt-auto">{item.title || item.name}</strong>
    //     </div>
    //   ))}
    // </div>
    <div className="d-flex flex-wrap gap-3">
      {Array.from({ length: data.length }).map((_, indice) => (
        <div
          key={indice}
          className="card p-2 bg-dark text-light d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "160px",
            width: "140px",
            opacity: "0.4",
          }}
        >
          <h1>{indice + 1}</h1>
          {/* <strong className="mt-auto">{item.title || item.name}</strong> */}
        </div>
      ))}
    </div>
  );
};

export default LaminaComponent;
