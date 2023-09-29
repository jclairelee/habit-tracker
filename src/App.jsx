import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [newHabit, setNewHabit] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [listArr, setListArr] = useState([
    {
      habit: "Read a book",
      daysComplete: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    },
    {
      habit: "Drink 2L of Water",
      daysComplete: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    },
  ]);

  // calculates and display the number of days in the found month
  const daysArr = [];
  const getDateInfo = () => {
    const today = new Date();
    const currentM = today.getMonth() + 1;
    const currentYr = today.getFullYear();
    const days = new Date(currentYr, currentM, 0).getDate();
    storeDays(days, daysArr);
  };

  const storeDays = (days, arr) => {
    for (let i = 1; i <= days; i++) {
      arr.push(i);
    }
  };

  const changeToFalse = (daysArr) => {
    const taskDays = daysArr.fill(false);
    return taskDays;
  };

  const markYourHabit = (e) => {
    const pressed = e.currentTarget.name;
    const [task, day] = pressed.split("@");
    const taskObject = listArr.find((li) => li.habit === task);
    taskObject.daysComplete[day] = true;
    setIsClicked((prev) => !prev);
  };

  const createNewHabit = (e) => {
    e.preventDefault();

    const newObj = {
      habit: userInput,
      daysComplete: changeToFalse(daysArr),
    };
    setListArr((list) => [...list, newObj]);
    setNewHabit("");
  };
  useEffect(() => {
    console.log(listArr);
  }, [listArr]);
  getDateInfo();

  return (
    <div className="app">
      <h1>Habit Tracker</h1>
      <h3>March</h3>
      <div className="title content">
        <span className="titleHabit habit">Habit</span>
        {daysArr.map((d, index) => {
          return (
            <span className="titleD" key={index}>
              {d}
            </span>
          );
        })}
      </div>
      {listArr.map((list, index) => {
        return (
          <div className="content" key={index}>
            <span className="habit">{list.habit}</span>

            {list.daysComplete.map((d, index) => {
              return (
                <button
                  className={isClicked === true ? "done" : "habitD days"}
                  key={index}
                  name={`${list.habit}@${index}`}
                  onClick={(e) => markYourHabit(e)}
                >
                  {d}
                </button>
              );
            })}
          </div>
        );
      })}
      <form action="submit">
        <input
          type="text"
          autoFocus
          name="newHabit"
          placeholder="build a new habit"
          value={newHabit}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={createNewHabit}>add</button>
      </form>
    </div>
  );
}

export default App;
