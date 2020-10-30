import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector } from "react-redux";
import { store } from "../redux/reducer";
import { setPageNumber } from "../redux/filtersReducer";
import { setTotalPages } from "../redux/totalPagesReducers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    margin: "2rem",
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
  },
}));

export default function BasicPagination() {
  const classes = useStyles();

  const reducerData = useSelector(({ cardsData, filters, totalPages }) => {
    return { cardsData, filters, totalPages };
  });

  useEffect(() => {
    if (!!reducerData.cardsData.data) {
      const totalPages =
        parseInt(reducerData.cardsData.data.totalCount) /
        parseInt(reducerData.filters.pageSize);
      store.dispatch(setTotalPages(Math.ceil(totalPages)));
    }
  }, [reducerData.filters, reducerData.cardsData]);

  return (
    <div data-testid="pagination" className={classes.root}>
      {reducerData.totalPages !== 0 && (
        <div>
          <Pagination
            className={classes.pagination}
            page={parseInt(reducerData.filters.pageNumber)}
            count={reducerData.totalPages}
            color="primary"
            onChange={(event, page) => {
              store.dispatch(setPageNumber({ pageNumber: page }));
            }}
          />
        </div>
      )}
    </div>
  );
}
