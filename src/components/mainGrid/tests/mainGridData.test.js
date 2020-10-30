import React from "react";
import { render, cleanup } from "@testing-library/react";
import MainGrid from "../mainGrid";
import { store } from "../../../redux/reducer";
import { Provider } from "react-redux";
import languageContext from "../../../context/languageContext";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

let language = "english";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => {
    return {
      cardsData: {
        data: {
          cards: [
            {
              name: "card1",
              text: "text1",
              imageUrl:
                "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130483&type=card",
              foreignNames: [
                {
                  name: "carte1",
                  text: "texte1",
                  language: "French",
                  imageUrl:
                    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=150182&type=card",
                },
                {
                  name: "卡1",
                  text: "文字1",
                  language: "Chinese Simplified",
                  imageUrl:
                    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=147636&type=card",
                },
              ],
            },
            {
              name: "card2",
              text: "text2",
              imageUrl:
                "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=132072&type=card",

              foreignNames: [
                {
                  name: "carte2",
                  text: "texte2",
                  language: "French",
                  imageUrl:
                    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=149996&type=card",
                },
                {
                  name: "卡2",
                  text: "文字2",
                  language: "Chinese Simplified",
                  imageUrl:
                    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=147637&type=card",
                },
              ],
            },
          ],
        },
        error: false,
        isLoading: false,
      },
      filters: { pageNumber: 1 },
      totalPages: 1,
    };
  },
}));

test("testing the mainGrid component when it is recieving cards data from the redux and the language is English", () => {
  const renderObj = render(
    <Router>
      <languageContext.Provider value={{ language }}>
        {" "}
        <Provider store={store}>
          <MainGrid />
        </Provider>{" "}
      </languageContext.Provider>{" "}
    </Router>
  );

  const card1Title = renderObj.getByText(/card1/i);
  const card1Text = renderObj.getByText(/text1/i);
  const card1Image = renderObj.getByAltText(/card1/i);
  const loader = renderObj.queryByTestId("loader");
  const errorMsg = renderObj.queryByTestId("error");

  const card2Title = renderObj.getByText(/card2/i);
  const card2Text = renderObj.getByText(/text2/i);
  const card2Image = renderObj.getByAltText(/card2/i);

  const grid = renderObj.getAllByTestId("grid");
  const pagination = renderObj.getAllByTestId("pagination");

  expect(card1Title).toBeInTheDocument();
  expect(card1Text).toBeInTheDocument();
  expect(card1Image).toBeInTheDocument();
  expect(card2Title).toBeInTheDocument();
  expect(card2Text).toBeInTheDocument();
  expect(card2Image).toBeInTheDocument();

  expect(card1Image).toHaveAttribute(
    "src",
    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130483&type=card"
  );
  expect(card2Image).toHaveAttribute(
    "src",
    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=132072&type=card"
  );

  expect(pagination.length).toEqual(2);
  expect(grid.length).toEqual(2);
  expect(loader).toBeNull();
  expect(errorMsg).toBeNull();
});

test("testing the mainGrid component when it is recieving cards data from the redux and the language is French", () => {
  language = "french";
  const renderObj = render(
    <Router>
      <languageContext.Provider value={{ language }}>
        {" "}
        <Provider store={store}>
          <MainGrid />
        </Provider>{" "}
      </languageContext.Provider>{" "}
    </Router>
  );

  const card1Title = renderObj.getByText(/carte1/i);
  const card1Text = renderObj.getByText(/texte1/i);
  const card1Image = renderObj.getByAltText(/carte1/i);
  const loader = renderObj.queryByTestId("loader");
  const errorMsg = renderObj.queryByTestId("error");

  const card2Title = renderObj.getByText(/carte2/i);
  const card2Text = renderObj.getByText(/texte2/i);
  const card2Image = renderObj.getByAltText(/carte2/i);

  const grid = renderObj.getAllByTestId("grid");
  const pagination = renderObj.getAllByTestId("pagination");

  expect(card1Title).toBeInTheDocument();
  expect(card1Text).toBeInTheDocument();
  expect(card1Image).toBeInTheDocument();
  expect(card2Title).toBeInTheDocument();
  expect(card2Text).toBeInTheDocument();
  expect(card2Image).toBeInTheDocument();

  expect(card1Image).toHaveAttribute(
    "src",
    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=150182&type=card"
  );
  expect(card2Image).toHaveAttribute(
    "src",
    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=149996&type=card"
  );

  expect(pagination.length).toEqual(2);

  expect(grid.length).toEqual(2);
  expect(loader).toBeNull();
  expect(errorMsg).toBeNull();
});

test("testing the mainGrid component when it is recieving cards data from the redux and the language is Chinese Simplified", () => {
  language = "chinese simplified";
  const renderObj = render(
    <Router>
      <languageContext.Provider value={{ language }}>
        {" "}
        <Provider store={store}>
          <MainGrid />
        </Provider>{" "}
      </languageContext.Provider>{" "}
    </Router>
  );

  const card1Title = renderObj.getByText(/卡1/i);
  const card1Text = renderObj.getByText(/文字1/i);
  const card1Image = renderObj.getByAltText(/卡1/i);
  const loader = renderObj.queryByTestId("loader");
  const errorMsg = renderObj.queryByTestId("error");

  const card2Title = renderObj.getByText(/卡2/i);
  const card2Text = renderObj.getByText(/文字2/i);
  const card2Image = renderObj.getByAltText(/卡2/i);

  const grid = renderObj.getAllByTestId("grid");
  const pagination = renderObj.getAllByTestId("pagination");

  expect(card1Title).toBeInTheDocument();
  expect(card1Text).toBeInTheDocument();
  expect(card1Image).toBeInTheDocument();
  expect(card2Title).toBeInTheDocument();
  expect(card2Text).toBeInTheDocument();
  expect(card2Image).toBeInTheDocument();

  expect(card1Image).toHaveAttribute(
    "src",
    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=147636&type=card"
  );
  expect(card2Image).toHaveAttribute(
    "src",
    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=147637&type=card"
  );

  expect(pagination.length).toEqual(2);

  expect(grid.length).toEqual(2);
  expect(loader).toBeNull();
  expect(errorMsg).toBeNull();
});
