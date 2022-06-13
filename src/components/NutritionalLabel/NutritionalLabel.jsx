import * as React from "react";
import { nutritionFacts } from "../../constants";
import "./NutritionalLabel.css";

export function NutritionalLabel({ selectedMenuItem }) {
  console.log(selectedMenuItem);
  return (
    <div className="nutritional-label">
      <h3 className="title">Nutrition Facts</h3>

      <h4 className="item-name">{selectedMenuItem?.item_name}</h4>

      <ul className="fact-list">
        {nutritionFacts.map((fact) => (
          <NutritionalLabelFact
            key={fact.id}
            label={fact.label}
            attribute={fact.attribute}
            item={selectedMenuItem}
          />
        ))}
      </ul>
    </div>
  );
}

export function NutritionalLabelFact(props) {
  console.log(props.item);
  return (
    <li className="nutrition-fact">
      <span className="fact-label">{props.label}</span>{" "}
      <span className="fact-value">{props.item?.[props.attribute]}</span>
    </li>
  );
}

export default NutritionalLabel;
