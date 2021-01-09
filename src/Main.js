import React from 'react'
import Trending from './Component/Trending'
import App from './App'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import $ from "jquery";

export default function Main() {
  return (
    <div>
      <Tabs>
          <TabList>
                <Tab style={{fontSize:"25px",fontWeight:"bold"}}>Movies</Tab>
                <Tab  style={{fontSize:"25px",fontWeight:"bold"}}>Trending</Tab>
          </TabList>

          <TabPanel>
                <App />
          </TabPanel>
          <TabPanel>
                <Trending />
          </TabPanel>
  </Tabs>
    </div>
  )
}
