"use client";
interface IReduxProviderProps {
  children: React.ReactNode;
}
import { Provider } from "react-redux";
import { store } from "./store";

const ReduxProvider = ({ children }: IReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
