import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "./store";

export const UseAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<Rootstate>();