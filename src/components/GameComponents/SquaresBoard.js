import { Button, Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import SquareButton from "./SquareButton";
import {
  isBoardFull,
  calculateWinner,
  twoDArraytoOneD,
  constructSquare,
} from "./GameUtils/UtilFunctions";
import { usePostQuery } from "../../hooks/useAxiosQuery";

const square = constructSquare(3);
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
      console.log("Data from the game ai engine ", data);
      const aiData = data.board;
      const oneDEngDataArr = twoDArraytoOneD(aiData);
      console.log("One D", oneDEngDataArr);
      const winOrLose = calculateWinner(oneDEngDataArr) || isBoardFull(oneDEngDataArr);
      setStatus(
        winOrLose === true
          ? "The Game is a draw"
          : winOrLose
          ? winOrLose === "X"
            ? "You are the winner"
            : "AI is the winner"
          : ""
      );
      if (!isBoardFull(oneDEngDataArr)) setSquaresValue(oneDEngDataArr);
    }
  }, [data]);

  // when the player selects a vacant square and the state changes, request is sent to ai to fetch the next move
  useEffect(() => {
    if (engineBody && engineBody.length > 0) refetch();
  }, [engineBody, refetch]);

  // for logging
  useEffect(() => {
    console.log("State changes of squares ", squaresValue, highlight);
  }, [squaresValue, highlight]);

  // handle click on the squares
  const handleClick = (index) => {
    console.log("Clicked Button ", index);
    const squares = [...squaresValue];
    // value (X/O) already present in the clicked square or a winner is decided diable the squares
    if (squares[index] || calculateWinner(squaresValue)) return;
    squares[index] = "X";
    const fillNullValuesWithEmptyString = squares;
    let filledArr = [];
    let i = 0;
    fillNullValuesWithEmptyString.forEach((value) => {
      value = value === null ? "" : value;
      filledArr[i++] = value;
      return value;
    });
    const convertToTwoD = [];
    while (filledArr.length) convertToTwoD.push(filledArr.splice(0, 3));
    console.log("Filled values", fillNullValuesWithEmptyString, convertToTwoD);
    // Because AI needs a 2d array
    setEngineBody(convertToTwoD);
    setSquaresValue(squares);
    //refetch();
  };

  /** OnMouse out after highlighting the rows and columns */
  const onMouseOut = (index) => {
    console.log("MouseOut", index);
    let arr = Array(9).fill(0);
    setHighLight(arr);
  };

  /** To highlight rows and columns */
  const onMouseOver = (index) => {
    console.log("Mouse Over", index);
    let arr = Array(9).fill(0);
    arr[index] = 1;
    const twoDArray = [];
    while (arr.length) twoDArray.push(arr.splice(0, 3));
    console.log(twoDArray);
    let [rowX, colY] = [0, 0];
    //find the x, y position of the hovered square
    twoDArray.forEach((item, x) => {
      const row = item;
      row.forEach((rowItem, y) => {
        if (rowItem === 1) {
          rowX = x;
          colY = y;
        }
      });
    });
    // find the row and column of the hovered square
    for (let i = 0; i < 3; i++) {
      twoDArray[rowX][i] = 1;
      twoDArray[i][colY] = 1;
    }
    console.log(rowX, colY, twoDArray);
    setHighLight(twoDArraytoOneD(twoDArray));
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
          <div style={{ color: "#F2A30F", textAlign: "center", fontStyle: "italic" }}>
            {status ? status : ""}
          </div>
          {square.map((x, index) => {
            return (
              <Row key={index}>
                {x.map((y) => {
                  return <Col key={y}>{displaySquare(y)}</Col>;
                })}
              </Row>
            );
          })}
          {/*    <Row>
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
          </Row> */}
          <div style={{ textAlign: "center", paddingTop: "25px" }}>
            <Button type="primary" onClick={resetGame}>
              Reset Game
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SquaresBoard;
