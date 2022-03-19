import React from 'react'
import './OrderItem.styles.scss'

import dateFormat from "dateformat";

export default function OrderItemComponent({order,snapshot}) {
const isToday = dateFormat(order.dueOn,'mmmm dd, yyyy') === dateFormat(new Date(),'mmmm dd, yyyy')? 'red':'blue'
  return (
    <div className={`order-item ${order.orderId} ${snapshot.isDragging?'dragging':null}`} style={{'borderLeft': `5px solid ${isToday}`}}>
        <div>
            <h5 className='order-id'>#{order.id}</h5>
            {/* <button className='btn btn-small'>Test</button> */}
        </div>
        <h5 className='order-no'>Order No: #{order.orderNo}</h5>
        <p className='order-list'>{order.orderList.map((element,index)=>index!==order.orderList.length-1? `${element}, `:element )}</p>
        <div className='d-flex justify-content-between'>
        <p className='order-footer'>Due: {dateFormat(order.dueOn, "mmmm dd, yyyy h:MM TT")}</p>
        <p className='order-footer'>ASSIGNED TO <div className='assigned-to'>{order.assignedTo}</div></p>
        </div>
    </div>
  )
}
