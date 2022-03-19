import React, {useState, useMemo, useEffect, useLayoutEffect} from 'react';
import './App.scss';
import {DragDropContext} from "react-beautiful-dnd";
import DraggableElementComponent from './components/DraggableElement/DraggableElement.component';
import DropAreaComponent from './components/DropArea/DropArea.component';
import TopNavBarComponent from './components/TopNavBar/TopNavBar.component';

import {items} from './mock-data/mockdata.js'

function App() {

  const [state, setState] = useState(items)
  const [recieved,setRecieved] = useState([]);
  const [inProgress,setInProgress] = useState([]);
  const [delivery,setDelivery] = useState([]);
  const [pickup,setPickup] = useState([]);
  const [persist,setPersist] = useState(true)

  const resetState = () =>{
    setRecieved([])
    setInProgress([])
    setDelivery([])
    setPickup([])
  }

  // To load data if it exists (Persisting States)
  // Since it's a mock data, we need not worry about items being changed in the backend
  useLayoutEffect(()=>{
    if(sessionStorage.getItem('data')){
      console.log(JSON.parse(sessionStorage.getItem('data')))
      setState(JSON.parse(sessionStorage.getItem('data')))
    }
  },[])

  useMemo(()=>{
    resetState()
    state.forEach(element=>{
      if(element.status==='recieved') setRecieved(preState=> [...preState,element])
      else if(element.status==='in-progress') setInProgress(preState=>[ ...preState,element])
      else if(element.status==='delivery') setDelivery(preState=>[ ...preState,element])
      else if(element.status==='pickup') setPickup(preState=>[ ...preState,element])
    })
    setPersist(!persist) // Flag to trigger session storage to be updated with the new value
  },[state])

  useEffect(()=>{
    sessionStorage.setItem('data',JSON.stringify(state))
  },[persist])

  const categories = ["recieved", "in-progress", "delivery", "pickup"]
  const categoriesHeading = ["Recieved Orders", "Order in progress","Order is ready for delivery","order picked up" ]
  const status = [recieved,inProgress,delivery,pickup]

  // Function to change states after dragging of Elements
  const handleDragEnd = ({destination,source,draggableId}) => {
    // Skip any action if the item is not dropped into any container
    if (!destination) return
    // Skip any action is the action is dragged and dropped to the same spot
    if (destination.index === source.index && destination.droppableId === source.droppableId) return
    // Proceed to change the dragged state
    for (let index=0; index<state.length; index++){
      if(state[index].id === draggableId){
        const temp = state;
        const element = state[index]
        element.status = categories[destination.droppableId]
        temp.splice(index,1)
        setState([...temp,element])
        break;
      }
    }
  }


  return (
    <div className="App">
      <TopNavBarComponent/>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='row'>
        {status.map((element,index)=>{
          return (
          <DropAreaComponent header={categoriesHeading[index]} index={`${index}`}>
            {element.map((element,index)=>{
              return(
              <DraggableElementComponent element={element} index={index} />)
            })}
          </DropAreaComponent>)})
        }
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
