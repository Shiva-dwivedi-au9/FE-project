import React, { Component } from 'react'
import VisitedMovies from './VisitedMovies'
import VisitedTv from './VisitedTv'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Visited() {

    return (
        <div>
            <Tabs style={{backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',color:'white'}}>

                <TabList>
                        <Tab style={{fontSize:"25px",fontWeight:"bold"}}>Movies</Tab>
                        <Tab style={{fontSize:"25px",fontWeight:"bold"}}>TV Series</Tab>
                </TabList>

                <TabPanel>
                        <VisitedMovies />
                </TabPanel>
                <TabPanel>
                        <VisitedTv />
                </TabPanel>
                
        </Tabs>
     </div>
    )
}
