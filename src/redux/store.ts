import { configureStore } from "@reduxjs/toolkit";
import { categoriesApi } from "../pages/Categories/Categories.api";
import antModalReducer from "../components/AntModal/AntModal.slice";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    antModal: antModalReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(categoriesApi.middleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;