import React from 'react'
import './DropArea.styles.scss'
import {Droppable} from "react-beautiful-dnd";

export default function DropAreaComponent({header,index,children}) {
  return (
    <div className='dropAreaContainer col'>
      <h6 className='mt-2'>{header.toUpperCase()} {`(${children.length})`}</h6>
      <Droppable key={index} droppableId={index} ignoreContainerClipping={true}>
                {(provided, snapshot) => {
                  return(
                    <div ref={provided.innerRef} {...provided.droppableProps} className={"droppable-col"}>
                      {children}
                      {provided.placeholder}
                    </div>
                    )
                  }
                }
      </Droppable>
    </div>
  )
}
