import "./statistic.scss";

const Statistic = () => {
  const localStorageData = localStorage.getItem("stats");
  const data = localStorageData ? JSON.parse(localStorageData) : [];

  type ItemType = {
    gameState: string;
    elapsedTime: number;
    openedCellCount: number;
    autoplay: boolean;
    fieldWidth: number;
    fieldHeight: number;
    minesCount: number;
  };

  return (
    <div className="statistic">
      {data.length ? (
        <table>
          <thead>
            <tr>
              <th>Game State</th>
              <th>Ellapsed Time</th>
              <th>Cells</th>
              <th>Autoplay</th>
              <th>Field width</th>
              <th>Field height</th>
              <th>Mines count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: ItemType, index: number) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={`${JSON.stringify(item)} ${index}`}>
                  <td>{item.gameState}</td>
                  <td>{item.elapsedTime} sec</td>
                  <td>{item.openedCellCount}</td>
                  <td>{item.autoplay ? "true" : "false"}</td>
                  <td>{item.fieldWidth}</td>
                  <td>{item.fieldHeight}</td>
                  <td>{item.minesCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>Empty</h1>
      )}
    </div>
  );
};

export default Statistic;
