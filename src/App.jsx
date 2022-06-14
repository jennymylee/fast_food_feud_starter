import * as React from "react";
// IMPORT ANY NEEDED COMPONENTS HERE
import { useState, useEffect } from "react";
import { createDataSet } from "./data/dataset";
import "./App.css";
import Header from "./components/Header/Header";
import Instructions from "./components/Instructions/Instructions";
import Chip from "./components/Chip/Chip";
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel";

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
};
// or this!
const { data, categories, restaurants } = createDataSet();

export function App() {
  const [category, setCategory] = React.useState(null);
  const [restaurant, setRestaurant] = React.useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(null);

  let instruction = appInfo.instructions.start;

  let currentMenuItems = data.filter((d) => {
    return d.food_category == category && d.restaurant == restaurant;
  });

  useEffect(() => {
    if (category && restaurant) {
      instruction = appInfo.instructions.allSelected;
    } else if (category) {
      instruction = appInfo.instructions.onlyCategory;
    } else if (restaurant) {
      instruction = appInfo.instructions.onlyRestaurant;
    } else {
      instruction = appInfo.instructions.noSelectedItem;
    }
    console.log("useEffect");
  }, [category, restaurant, selectedMenuItem]);

  const renderInstructions = () => {
    if (category && restaurant) {
      instruction = appInfo.instructions.allSelected;
    } else if (category) {
      instruction = appInfo.instructions.onlyCategory;
    } else if (restaurant) {
      instruction = appInfo.instructions.onlyRestaurant;
    } else {
      instruction = appInfo.instructions.noSelectedItem;
    }
  };

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((categories, i) => (
            <Chip
              key={i}
              label={categories}
              isActive={categories == category ? true : false}
              onClick={() => setCategory(categories)}
            />
          ))}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header
          title={appInfo.title}
          tagline={appInfo.tagline}
          description={appInfo.description}
        />
        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {restaurants.map((restaurants) => (
              <Chip
                key={restaurants}
                label={restaurants}
                isActive={restaurants == restaurant ? true : false}
                onClick={() => setRestaurant(restaurants)}
              />
            ))}
          </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions instructions={instruction} />
        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((currentMenuItem, i) => (
              <Chip
                key={i}
                label={currentMenuItem.item_name}
                isActive={
                  selectedMenuItem &&
                  selectedMenuItem.item_name === currentMenuItem.item_name
                }
                onClick={() => setSelectedMenuItem(currentMenuItem)}
              />
            ))}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {selectedMenuItem ? (
              <NutritionalLabel item={selectedMenuItem} />
            ) : null}
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
