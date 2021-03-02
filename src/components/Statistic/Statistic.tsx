import { useEffect, useState } from "react";
import Loader from "react-loader-web";
import "./statistic.scss";

const Statistic = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://goonextminespeeper.herokuapp.com/statistic")
      .then((req: any) => req.json())
      .then((res) => {
        setTimeout(() => {
          setData(res);
        }, 1500);
      });
  }, []);

  type ItemType = {
    gameState: string;
    ellapsedTime: number;
    cells: number;
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
                  <td>{item.ellapsedTime} sec</td>
                  <td>{item.cells}</td>
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
        <Loader type="Loading" color="#fff" height={200} width={200} />
      )}
    </div>
  );
};

export default Statistic;
