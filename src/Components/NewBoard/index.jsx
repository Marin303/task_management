import React, { useContext } from "react";
import "./newboard.scss";

import { ThemeContext } from "../../Theme";
import NewColumn from "../NewColumn/NewColumn";
import BoardContainer from "../BoardContainer/BoardContainer";
import { data } from "../../Assets/columnConfig/columnConfig";

const NewBoard = ({ onDragEnd, board }) => {
  const { theme } = useContext(ThemeContext);

  const { id } = board;
  return (
    <div className={`newboard-container ${theme}`}>
      <div className="title">
        <h1>{board?.name}</h1>
      </div>
      <div className="wrapper-horizontal">
        <BoardContainer
          data={data}
          id={id}
          boardIndex={id}
          onDragEnd={onDragEnd}
        />
        <NewColumn />
        {/* addNewColumn={addNewColumn}  */}
      </div>
    </div>
  );
};

export default NewBoard;
