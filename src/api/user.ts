import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 登录 */
export const Login = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/login"), { data });
};

export const getNews = (data) => {
  return http.request<any>("post", baseUrlApi("newsData/news"), { data });
};

export const getSource = () => {
  return http.request<any>("get", baseUrlApi("baseData/allSource"));
};

export const getSourceNum = () => {
  return http.request<any>("get", baseUrlApi("baseData/allSourceNum"));
};

export const getLanguageNum = () => {
  return http.request<any>("get", baseUrlApi("baseData/allLanguageNum"));
};

export const addSourceMedia = (data) => {
  return http.request<any>("post", baseUrlApi("source/add"), {data});
};

export const getMediaList = () => {
  return http.request<any>("get", baseUrlApi("source/list"));
};
