import { store } from "../reducer";
import { setDrawer } from "../drawerReducer";

test("drawer reducer test", () => {
  let state = store.getState().drawer;
  expect(state).toBe(false);

  store.dispatch(setDrawer(true));
  state = store.getState().drawer;
  expect(state).toBe(true);

  store.dispatch(setDrawer(false));
  state = store.getState().drawer;
  expect(state).toBe(false);
});
