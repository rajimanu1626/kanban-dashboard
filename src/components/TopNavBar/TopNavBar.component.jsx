import React,{useState} from 'react'
import './TopNavBar.styles.scss'
import {ReactComponent as FilterIcon} from '../../assets/filter.svg';
import {ReactComponent as RefreshIcon} from '../../assets/refresh.svg';
import {ReactComponent as ConfigIcon} from '../../assets/config.svg';
import {ReactComponent as SearchIcon} from '../../assets/search.svg';

export default function TopNavBarComponent() {

  const [activeButton, setActiveButton] = useState(1)

  return (
    <nav className='topNavbar'>
        <div className='header-1'>
            <h5>Tickets</h5>
            <button className={`custom-btn ${activeButton===1? 'active':''}`} onClick={()=>setActiveButton(1)}>ALL</button>
            <button className={`custom-btn ${activeButton===2? 'active':''}`} onClick={()=>setActiveButton(2)}>ONLY MY TICKETS</button>
            <button className={`custom-btn ${activeButton===3? 'active':''}`} onClick={()=>setActiveButton(3)}>RECENTLY UPDATED</button>
            <button className='custom-btn'><FilterIcon className='icons'/></button>
            <button className='custom-btn'><RefreshIcon className='icons'/></button>
        </div>
        <div className='header-2'>
            <div className='position-relative'><input placeholder='Search' type='text' className='custom-input'/><SearchIcon className='search-icon'/></div>
            <button className='custom-btn'><span><ConfigIcon className='icons'/></span>Configuration</button>
            <div className='pagination'>(0-30)</div>
            <button className='custom-btn'>&#60;</button>
            <button className='custom-btn'>&#62;</button>
        </div>
    </nav>
  )
}
