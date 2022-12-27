'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Sidebar(): JSX.Element {
  const [open, setOpen] = useState(false);
  // navitesms for each, add event listener - on click remove active on all others

  return <div className={`sidebar ${open ? 'open' : ""}`} >
    <div className='toggle'>
      <i className='bx bx-chevron-right'>
        <button onClick={() => setOpen(!open)} />
      </i>
    </div>
    <div className="logo">
      <Image src={"/images/logo.png"} alt="..." width={100} height={100} />
      <h3>Name</h3>
    </div>
    <nav>
      <div className='nav-title'>
        part 1
      </div>
      <ul>
        <li className='nav-item'>
          <i className='bx bxs-dashboard'></i>
          <span>Dashboard</span>
        </li>
        {/* repeat: analytics, wallet, notifications, dashboard, Settings */}
      </ul>
      <hr></hr>
      <div className='nav-title'>
        Supports
      </div>
    </nav>
  </div>
}