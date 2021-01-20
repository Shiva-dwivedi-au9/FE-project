import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FavTv from './FavTv'
import FavMovie from './FavMovie'

export class Favourite extends Component {
    render() {
        return (
            <div>
                 <Tabs className="tabs" style={{backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',color:'white'}}>

                        <TabList>
                                <Tab style={{fontSize:"17px",fontWeight:"bold"}}>Movies</Tab>
                                <Tab style={{fontSize:"17px",fontWeight:"bold"}}>TV Series</Tab>
                        </TabList>

                        <TabPanel>
                               <FavMovie />
                        </TabPanel>
                        <TabPanel>
                                <FavTv />
                        </TabPanel>

                </Tabs>
            </div>
        )
    }
}

export default Favourite
