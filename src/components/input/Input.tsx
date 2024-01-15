import React, { useState } from "react";
import Chip from "../chip/Chip";
import "./Input.css";

const DescriptionText: React.FC = () => {
  return (
    <div>
      <h2>How it works ?</h2>
      <ul>
        <li>Chips can't contain duplicates.</li>
        <li>
          You can start typing. If the input contains any item from the list of
          auto-complete items, You'll see the filtered list. If the text you
          have entered is not in the list of auto-complete items, You can still
          create a chip by pressing enter.
        </li>
        <li>
          When you'll remove any chip, It will be populated back in the list of
          auto-complete items.
        </li>
      </ul>
    </div>
  );
};

const Input: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([
    "Java",
    "Spring boot",
    "Python",
    "C++",
    "React.Js",
    "Typescript",
  ]);
  const [backspaceTracker, setBackspaceTracker] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChipAdd = (data: string) => {
    setChips([...chips, data.trim()]);
    setInputValue("");
    setBackspaceTracker(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (!chips.includes(inputValue)) {
        handleChipAdd(inputValue);
        setInputValue("");
      }
    }

    if (e.key === "Backspace" && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      if (backspaceTracker === 0 && inputValue === "") {
        setInputValue(lastChip);
        setBackspaceTracker(1);
      } else if (backspaceTracker !== 0) {
        handleChipRemove(lastChip);
        setBackspaceTracker(0);
      }
    }
  };

  const handleChipRemove = (chipToRemove: string) => {
    setChips(chips.filter((chip) => chip !== chipToRemove));
    items.includes(chipToRemove) ? null : setItems([...items, chipToRemove]);
  };

  const filteredItems = items.filter(
    (item) =>
      !chips.includes(item) &&
      item.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="box">
      <div className="chips">
        {chips.map((chip, index) => (
          <Chip
            label={chip}
            onDelete={() => handleChipRemove(chip)}
            key={index}
          />
        ))}
      </div>
      <div>
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Enter text and press Enter"
        />
      </div>
      {filteredItems.length > 0 ? (
        <div className="autocomplete-list">
          <h4>Auto-complete Items: </h4>
          {filteredItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleChipAdd(item)}
              className="autocomplete-list-item"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
      <DescriptionText />
    </div>
  );
};

export default Input;
