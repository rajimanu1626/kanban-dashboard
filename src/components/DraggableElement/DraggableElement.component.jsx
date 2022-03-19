import React from 'react'
import { Draggable } from "react-beautiful-dnd";
import OrderItemComponent from '../OrderItem/OrderItem.component';
import './DraggableElement.styles.scss'

export default function DraggableElementComponent({element,index}) {
  return (
    <Draggable key={element.id} index={index} draggableId={element.id}>
                            {(provided, snapshot) => {
                              return(
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <OrderItemComponent order={element} snapshot={snapshot}/>
                                </div>
                              )
                            }}
                          </Draggable>
  )
}
