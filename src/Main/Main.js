import React from 'react'
import TVapp from './Component/TVapp'
import App from './App'
import Home from './Home'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Main() {
  return (
    <div>
      <Tabs className="tabs">
          <TabList>
                <Tab style={{fontSize:"17px",fontWeight:"bold"}}> Home</Tab>
                <Tab style={{fontSize:"17px",fontWeight:"bold"}}>Movies</Tab>
                <Tab style={{fontSize:"17px",fontWeight:"bold"}}>TV Series</Tab>
          </TabList>

          <TabPanel>
                <Home />
          </TabPanel>
          <TabPanel>
                <App />
          </TabPanel>
          <TabPanel>
                <TVapp />
          </TabPanel>
         
  </Tabs>
    </div>
  )
}
