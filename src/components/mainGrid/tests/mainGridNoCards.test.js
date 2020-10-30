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
      cardsData: { data: { cards: [] }, error: false, isLoading: false },
      filters: { pageNumber: 1 },
      totalPages: 1,
    };
  },
}));

test("testing the mainGrid component when it is recieving cards data from the redux but the number of cards are 0", () => {
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

  const msgText = renderObj.getByText(/No Cards Found/i);

  const grid = renderObj.queryAllByTestId("grid");
  const pagination = renderObj.queryAllByTestId("pagination");
  const loader = renderObj.queryByTestId("loader");
  const errorMsg = renderObj.queryByTestId("error");

  expect(msgText).toBeInTheDocument();

  expect(pagination.length).toEqual(0);
  expect(grid.length).toEqual(0);
  expect(loader).toBeNull();
  expect(errorMsg).toBeNull();
});
