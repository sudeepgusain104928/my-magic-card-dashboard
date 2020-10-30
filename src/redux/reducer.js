import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import handleDrawer from "./drawerReducer";
import handleSearchPopup from "./searchBoxReducers/searchPopperReducer";
import totalPages from "./totalPagesReducers";
import searchString from "./searchBoxReducers/searchStringReducers";
import fetchAutoComplete from "./searchBoxReducers/autoCompleteReducer";
import handleFilters from "./filtersReducer";
import fetchApiData from "./cardsDataReducer";
import getCardDetails from "./cardDetailReducer";

const rootReducer = combineReducers({
  cardsData: fetchApiData.reducer,
  drawer: handleDrawer.reducer,
  filters: handleFilters.reducer,
  totalPages: totalPages.reducer,
  searchString: searchString.reducer,
  autoComplete: fetchAutoComplete.reducer,
  searchPopup: handleSearchPopup.reducer,
  cardDetail: getCardDetails.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
