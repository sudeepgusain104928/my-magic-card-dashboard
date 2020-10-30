import React from "react";
import { render } from "@testing-library/react";
import MainGrid from "../mainGrid";
import { store } from "../../../redux/reducer";
import { Provider } from "react-redux";
import languageContext from "../../../context/languageContext";
import { BrowserRouter as Router } from "react-router-dom";

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
        isLoading: true,
      },
      filters: { pageNumber: 1 },
      totalPages: 1,
    };
  },
}));

test("testing the mainGrid component when it is waiting to recieve the cards data from redux", () => {
  const language = "english";

  const renderObj = render(
    <Router>
      <languageContext.Provider value={{ language }}>
        <Provider store={store}>
          <MainGrid />
        </Provider>
      </languageContext.Provider>
    </Router>
  );

  const loader = renderObj.getByTestId("loader");

  const grid = renderObj.queryAllByTestId("grid");
  const pagination = renderObj.queryAllByTestId("pagination");

  expect(loader).toBeInTheDocument();
  expect(pagination.length).toEqual(0);
  expect(grid.length).toEqual(0);
});
