import React from 'react';
import './App.css';
import { Homepage } from './layouts/homepage/HomePage';
import { Navbar } from './layouts/navbarAndFooter/Navbar';
import { Footer } from './layouts/navbarAndFooter/Footer';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route } from 'react-router-dom';

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>

          <Route path='/home'>
            <Homepage />
          </Route>

          <Route path='/search'>
            <SearchBooksPage />
          </Route>
        </switch>
      </div>

      <Footer />
    </div>
  );
}
