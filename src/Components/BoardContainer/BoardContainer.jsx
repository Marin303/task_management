import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Card from "../../Assets/drag-drop/Card";
import { ThemeContext } from "../../Theme";

const BoardContainer = ({ boardIndex, data, onDragEnd }) => {
  const { theme } = useContext(ThemeContext);
  const columnColors = {
    Todo: "blue-ball",
    Doing: "purple-ball",
    Done: "green-ball",
    Now: "blue-ball",
    Next: "purple-ball",
    Later: "green-ball",
  };
  const [isEmptyColumn, setIsEmptyColumn] = useState({});

  useEffect(() => {
    const checkAllColumns = () => {
      data.boards[boardIndex]?.columns.forEach((column) => {
        checkEmptyColumn(column);
      });
    };

    checkAllColumns();
  }, [boardIndex, data.boards]);

  const checkEmptyColumn = (column) => {
    const isEmpty = !column.tasks || column.tasks.length === 0;
    setIsEmptyColumn((prev) => ({ ...prev, [column.id]: isEmpty }));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.boards[boardIndex]?.columns.map((column, columnIndex) => {
          const columnNum = column.tasks.length;
          const columnColorClass = columnColors[column.name] || "ball";
          const droppableId = column.id?.toString() || columnIndex.toString();

          return (
            <div className={`column-wrapper ${theme}`} key={column.id}>
              <p>
                <span className={`ball ${columnColorClass}`}></span>
                {column.name}({columnNum})
              </p>

              <Droppable droppableId={droppableId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {data.boards[boardIndex].columns[columnIndex].tasks
                      .filter((task) => task)
                      .map((task, id) => (
                        <Card
                          key={task.id || `fallback-id-${id}`}
                          id={task.id || `fallback-id-${id}`}
                          text={task?.title}
                          index={id}
                        />
                      ))}

                    {provided.placeholder}
                    {isEmptyColumn[column?.id] && (
                      <div className="empty">Empty</div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </>
  );
};

export default BoardContainer;
