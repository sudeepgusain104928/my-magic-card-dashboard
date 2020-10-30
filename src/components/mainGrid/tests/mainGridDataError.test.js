import React from "react";
import { render, cleanup } from "@testing-library/react";
import MainGrid from "../mainGrid";
import { store } from "../../../redux/reducer";
import { Provider } from "react-redux";
import languageContext from "../../../context/languageContext";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

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
        error: true,
        isLoading: false,
      },
      filters: { pageNumber: 1 },
      totalPages: 1,
    };
  },
}));

test("testing the mainGrid component the redux could not fetch data from the api and passes an error (English)", () => {
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

  const errorMsg = renderObj.getByText(
    /Failed to load cards, please refresh the page!/i
  );

  const grid = renderObj.queryAllByTestId("grid");
  const pagination = renderObj.queryAllByTestId("pagination");

  expect(errorMsg).toBeInTheDocument();
  expect(pagination.length).toEqual(0);
  expect(grid.length).toEqual(0);
});

test("testing the mainGrid component the redux could not fetch data from the api and passes an error (French)", () => {
  const language = "french";

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

  const errorMsg = renderObj.getByText(
    /Échec du chargement des cartes, veuillez actualiser la page!/i
  );

  const grid = renderObj.queryAllByTestId("grid");
  const pagination = renderObj.queryAllByTestId("pagination");

  expect(errorMsg).toBeInTheDocument();
  expect(pagination.length).toEqual(0);
  expect(grid.length).toEqual(0);
});

test("testing the mainGrid component the redux could not fetch data from the api and passes an error (Chinese Simplified)", () => {
  const language = "chinese simplified";

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

  const errorMsg = renderObj.getByText(/无法加载卡，请刷新页面/i);

  const grid = renderObj.queryAllByTestId("grid");
  const pagination = renderObj.queryAllByTestId("pagination");

  expect(errorMsg).toBeInTheDocument();
  expect(pagination.length).toEqual(0);
  expect(grid.length).toEqual(0);
});
