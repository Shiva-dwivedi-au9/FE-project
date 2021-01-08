import React from 'react'
import Trending from './Component/Trending'
import App from './App'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Main() {
  return (
    <div>
      <Tabs>
          <TabList>
                <Tab>Home</Tab>
                <Tab>Trending</Tab>
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
