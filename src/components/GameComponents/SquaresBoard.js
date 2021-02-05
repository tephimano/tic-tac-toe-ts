import { Button, Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { usePostQuery } from "../hooks/useAxiosQuery";
import SquareButton from "./SquareButton";
import "../styles/TTTBoard.css";
import { isBoardFull, calculateWinner } from "./GameUtils/UtilFunctions";

const SquaresBoard = () => {
  const [squaresValue, setSquaresValue] = useState(Array(9).fill(null));
  const [engineBody, setEngineBody] = useState([]);
  const [highlight, setHighLight] = useState([]);
  const [status, setStatus] = useState(null);

  const { data, error, isLoading, refetch } = usePostQuery(
    "game",
    "game",
    "/engine",
    { board: engineBody },
    { enabled: false }
  );

  useEffect(() => {
    if (data) {
      console.log("Engine data ", data);
      const aiData = data.board;
      const status = data.status;
      if (status) {
        const oneD = [].concat.apply([], aiData);
        console.log("One D", oneD);
        const winOrLose = calculateWinner(oneD) || isBoardFull(oneD);
        setStatus(
          winOrLose === true ? "The Game is a draw" : winOrLose ? winOrLose + " is the winner" : ""
        );
        if (!isBoardFull(oneD)) setSquaresValue(oneD);
      }
    }
  }, [data]);

  useEffect(() => {
    if (engineBody && engineBody.length > 0) refetch();
  }, [engineBody, refetch]);

  useEffect(() => {
    console.log(squaresValue, "Changed", highlight);
  }, [squaresValue, highlight]);

  const handleClick = (index) => {
    console.log("Button ", index);
    const squares = [...squaresValue];
    //console.log(squares);
    if (squares[index] || calculateWinner(squaresValue)) return;
    squares[index] = "X";
    const fillValues = squares;
    let fillarr = [];
    let i = 0;
    fillValues.map((value) => {
      //may be foreach
      value = value === null ? "" : value;
      fillarr[i++] = value;
      console.log("Value : ", value);
      return value;
    });
    console.log(fillarr);
    const newArr = [];
    while (fillarr.length) newArr.push(fillarr.splice(0, 3));
    console.log("Filled values", fillValues, newArr);
    setEngineBody(newArr);
    setSquaresValue(squares);
    //refetch();
  };

  const onMouseOut = (index) => {
    console.log("MouseOut", index);
    let arr = Array(9).fill(0);
    setHighLight(arr);
  };

  const onMouseOver = (index) => {
    console.log("Mouse Over", index);
    let arr = Array(9).fill(0);
    arr[index] = 1;
    console.log("Current arr ", arr);
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 3));
    console.log(newArr);
    let [rowX, colY] = [0, 0];
    newArr.forEach((item, x) => {
      const row = item;
      row.forEach((rowItem, y) => {
        if (rowItem === 1) {
          rowX = x;
          colY = y;
        }
      });
    });
    for (let i = 0; i < 3; i++) {
      newArr[rowX][i] = 1;
      newArr[i][colY] = 1;
    }
    console.log(rowX, colY, newArr);
    const high = [].concat.apply([], newArr);
    console.log("Spread", high);
    setHighLight(high);
  };

  const displaySquare = (index) => {
    return (
      <SquareButton
        value={squaresValue[index]}
        hover={highlight[index]}
        onClick={() => handleClick(index)}
        onMouseOver={() => onMouseOver(index)}
        onMouseOut={() => onMouseOut(index)}
      />
    );
  };

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <div className="center-content">
      {error ? (
        <div>ERROR!</div>
      ) : isLoading ? (
        <div>
          <Spin />
        </div>
      ) : (
        <div>
          <div style={{ color: "red" }}>{status ? status : "Hello"}</div>
          <Row>
            <Col>{displaySquare(0)}</Col>
            <Col>{displaySquare(1)}</Col>
            <Col>{displaySquare(2)}</Col>
          </Row>
          <Row>
            <Col>{displaySquare(3)}</Col>
            <Col>{displaySquare(4)}</Col>
            <Col>{displaySquare(5)}</Col>
          </Row>
          <Row>
            <Col>{displaySquare(6)}</Col>
            <Col>{displaySquare(7)}</Col>
            <Col>{displaySquare(8)}</Col>
          </Row>
          <Button type="primary" onClick={resetGame}>
            Reset Game
          </Button>
        </div>
      )}{" "}
    </div>
  );
};

export default SquaresBoard;
