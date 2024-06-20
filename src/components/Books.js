import React, { useState, useEffect } from "react";
import "./books.css";

function Books() {
  const [response, setResponse] = useState([]);
  let [userInput, setUserInput] = useState("");
  useEffect(() => {
    BlogResponse();
  }, []);

  const BlogResponse = async () => {
    const fetchData = await fetch(
      "https://openlibrary.org/people/mekBot/books/already-read.json"
    );
    const fetchedArray = await fetchData.json();
    const neewwwwArr = fetchedArray.reading_log_entries;

    neewwwwArr.forEach((element) => {
      element.isRead = false;
    });
    let filteredArray = neewwwwArr.filter((obj) => {
      if (obj.work.cover_id != null) {
        return obj;
      }
      return null;
    });
    console.log(filteredArray);
    setResponse(filteredArray);
  };

  const clickHandler = (bookName) => {
    let index = response.findIndex((book) => book.work.title === bookName);
    console.log(index);
    let bookObj = response[index];
    let newobj = { ...bookObj, isRead: !bookObj.isRead };
    response[index] = newobj;
    setResponse([...response]);
  };

  const changeHandler = (e) => {
    setUserInput(e.target.value);
  };

  let matched = response.filter((each) => {
    return each.work.title.toLowerCase().includes(userInput.trim());
  });

  return (
    <>
      <input
        className="input"
        type="text"
        onChange={changeHandler}
        placeholder="type book name"
      ></input>
      {response.length === 0 ? (
        <h2>fetching Results...</h2>
      ) : matched.length === 0 ? (
        <h2>no matching results found.</h2>
      ) : (
        <div className="container">
          {matched.map((eachobj, i) => {
            return (
              <div key={i} className="bookcard">
                <img
                  className="bookimage"
                  alt="coverPhoto"
                  src={`https://covers.openlibrary.org/b/id/${eachobj.work.cover_id}-M.jpg`}
                ></img>
                <h1 className="booktitile">{eachobj.work.title}</h1>
                <div>
                  Author :{" "}
                  <p className="bookwriter">{eachobj.work.author_names[0]}</p>
                </div>
                <div>
                  Published Year :{" "}
                  <p className="year">{eachobj.work.first_publish_year}</p>
                </div>
                <button
                  className={eachobj.isRead ? "read" : "unread"}
                  onClick={() => clickHandler(eachobj.work.title)}
                >
                  {eachobj.isRead ? "Read" : "Unread"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Books;
