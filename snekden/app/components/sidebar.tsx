'use client';
import Image from 'next/image';
import { useState } from 'react';

const linkNames: string[] = ['games/testgame', 'achievements', 'about', 'contact'];

function capitalize(publication: string): string {
  return publication[0].toUpperCase() + publication.substring(1);
}

const gameNames: string[] = [];

export default function Sidebar(): JSX.Element {
  const [open, setOpen] = useState(false);
  // navitesms for each, add event listener - on click remove active on all others

  return <div className={`sidebar ${open ? 'open' : ""}`} >
    <div className='toggle'>
      <button onClick={() => setOpen(!open)} >
        <i className='bx bx-chevron-right'></i>
      </button>
    </div>
    <div className="logo">
      <Image src={"../next.svg"} alt="..." width={100} height={100} />
      <h3>Standot{"\'"}s portfolio</h3>
    </div>
    <nav>
      <div className='nav-title'>
        Utilities
      </div>
      <ul>
        <li className='nav-item'>
          <i className='bx bxs-dashboard'></i>
          <span>Dashboard</span>
        </li>
      </ul>
      <hr></hr>
      <div className='nav-title'>
        Supports
      </div>
    </nav>
  </div>
}