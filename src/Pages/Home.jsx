import React from 'react';
import Banner from '../Components/Banner';
import Whychoseuse from './Whychoseuse';
import RecentListings from './RecentListings';
import Howitworks from './Howitworks';
import SpecialOffers from './SpecialOffers';

const Home = () => {
    return (
        <div className="space-y-16 px-4 md:px-8 max-w-7xl mx-auto">
            <Banner />
            <Whychoseuse />
            <RecentListings />
            <Howitworks />
            <SpecialOffers />
        </div>
    );
};

export default Home;
