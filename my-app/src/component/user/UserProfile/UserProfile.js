import React from 'react';
import {  Tabs } from 'antd';
import Favorite from './Favorite';
import RecipeBooks from './RecipeBooks';


const UserProfile = () => {
    const items=[
        {
            key: '1',
            label: 'Recipe Book',
            children: <RecipeBooks/>,
          },
          {
            key: '2',
            label: 'Favourite',
            children: <Favorite/>,
          },
    ]
    return (
      <>
        <Tabs
          defaultActiveKey="1"
          items={items}
        />
      </>
    );
}

export default UserProfile