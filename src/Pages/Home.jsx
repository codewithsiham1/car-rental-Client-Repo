import React from 'react';
import Banner from '../Components/Banner';
import Whychoseuse from './Whychoseuse';
import RecentListings from './RecentListings';
import Howitworks from './Howitworks';
import SpecialOffers from './SpecialOffers';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <Whychoseuse></Whychoseuse>
        <RecentListings></RecentListings>
        <Howitworks></Howitworks>
        <SpecialOffers></SpecialOffers>
        </div>
    );
};

export default Home;