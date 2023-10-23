import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

//登录
export const Login = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/login"), { data });
};

//首页
//热度topN
export const getTophub = data => {
  return http.request<any>("post", baseUrlApi("home/tophub"), { data });
};

//搜索页
//新闻数据
export const getNews = data => {
  return http.request<any>("post", baseUrlApi("newsData/news"), { data });
};

// 导出到excel
export const exportData = data => {
  return http.request<any>("post", baseUrlApi("/newsData/exportNews"), { data }, {responseType: 'blob'})
}

//媒体下拉框选项
export const getSource = () => {
  return http.request<any>("get", baseUrlApi("baseData/allSource"));
};

export const getSourceNum = () => {
  return http.request<any>("get", baseUrlApi("baseData/allSourceNum"));
};

export const getLanguageNum = () => {
  return http.request<any>("get", baseUrlApi("baseData/allLanguageNum"));
};

//新闻展示
export const getInfos = data => {
  return http.request<any>("post", baseUrlApi("twInfo/infos"), { data });
};

//台湾媒体列表
export const getPlatform = () => {
  return http.request<any>("get", baseUrlApi("twInfo/allPlatform"));
};

// 导出台湾信息
export const exportInfos = data => {
  return http.request<any>("post", baseUrlApi("twInfo/exportInfos"), { data }, {responseType: 'blob'})
}


//增删媒体源
//媒体源列表
export const getMediaList = () => {
  return http.request<any>("get", baseUrlApi("source/list"));
};
//增加rss
export const addSourceMedia = data => {
  return http.request<any>("post", baseUrlApi("source/add"), { data });
};
//rss路由检查
export const checkRss = data => {
  return http.request<any>("post", baseUrlApi("source/check"), { data });
};
//删除rss
export const delSourceMedia = data => {
  return http.request<any>("post", baseUrlApi("source/delete"), { data });
};
//更新rss
export const updateSourceMedia = data => {
  return http.request<any>("post", baseUrlApi("source/update"), { data });
};

export const delMessage = data => {
  return http.request<any>("post", baseUrlApi("messageSubscribe/delete"), {
    data
  });
};
export const addMessage = data => {
  return http.request<any>("post", baseUrlApi("messageSubscribe/add"), {
    data
  });
};

export const handleClick = data => {
  return http.request<any>("post", baseUrlApi("messageSubscribe/delete"), {
    data
  });
};
