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

//台湾大选新闻展示
export const getTwElectionList = data => {
  return http.request<any>("post", baseUrlApi("twElection/list"), { data });
};

//台湾大选媒体列表
export const getTwElectionSource = () => {
  return http.request<any>("get", baseUrlApi("twElection/allSource"));
};

// 导出台湾大选信息
export const exportTwElection = data => {
  return http.request<any>("post", baseUrlApi("twElection/exportInfos"), { data }, {responseType: 'blob'})
}

// 更新台湾大选信息
export const updateTwElectionInfo = data => {
  return http.request<any>("post", baseUrlApi("twElection/update"), { data }, {responseType: 'blob'})
}

//北京日报新闻展示
export const getBjDailyList = data => {
  return http.request<any>("post", baseUrlApi("bjDaily/list"), { data });
};

// 导出北京日报
export const exportBjDaily = data => {
  return http.request<any>("post", baseUrlApi("bjDaily/exportInfos"), { data }, {responseType: 'blob'})
}

// 更新北京日报
export const updateBjDailyInfo = data => {
  return http.request<any>("post", baseUrlApi("bjDaily/update"), { data }, {responseType: 'blob'})
}

//增加北京日报新闻
export const addBjDaily = data => {
  return http.request<any>("post", baseUrlApi("bjDaily/add"), { data });
};

//增加北京日报上报新闻
export const addBjDailyReport = data => {
  return http.request<any>("post", baseUrlApi("bjDaily/addReport"), { data });
};

//更新北京日报上报新闻
export const updateBjDailyReport = data => {
  return http.request<any>("post", baseUrlApi("bjDaily/updateReport"), { data });
};


//删除北京日报上报新闻
export const deleteBjDailyReport = data => {
  return http.request<any>("post", baseUrlApi("bjDaily/deleteReport"), { data })
}

//北京日报上报新闻展示
export const getBjDailyReportList = data => {
  return http.request<any>("post", baseUrlApi("bjDaily/reportList"), { data });
};

// 导出北京日报
export const exportBjDailyReport = data => {
  return http.request<any>("post", baseUrlApi("bjDaily/exportReportInfos"), { data }, {responseType: 'blob'})
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

//消息订阅
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

//舆情热度
//top50
export const getTop50 = () => {
  return http.request<any>("get", baseUrlApi("hotdegree/top50"));
};

//智库推文列表
export const getTweetList = data => {
  return http.request<any>("post", baseUrlApi("twitter/list"), { data });
};

// 导出智库推文
export const exportTweet = data => {
  return http.request<any>("post", baseUrlApi("twitter/exportTweet"), { data }, {responseType: 'blob'})
}

//增加智库检测推特用户
export const addTwitterUser = data => {
  return http.request<any>("post", baseUrlApi("twitter/addUser"), { data });
};

//更新智库检测推特用户
export const updateTwitterUser = data => {
  return http.request<any>("post", baseUrlApi("twitter/updateUser"), { data });
};

//删除智库检测推特用户
export const delTwitterUser = data => {
    return http.request<any>("post", baseUrlApi("twitter/deleteUser"), { data });
};

//获取智库检测推特用户
export const getUserList = () => {
    return http.request<any>("get", baseUrlApi("twitter/userList"));
};

//删除推特消息订阅
export const delTwitterMessage = data => {
    return http.request<any>("post", baseUrlApi("twitter/deleteMessageSubscribe"), {
        data
    });
};

//添加推特消息订阅
export const addTwitterMessage = data => {
    return http.request<any>("post", baseUrlApi("twitter/addMessageSubscribe"), {
        data
    });
};

//线
export const gethotline = data => {
  return http.request<any>("post", baseUrlApi("hotdegree/hotline"), { data });
};
//链接
export const gethotlink = data => {
  return http.request<any>("post", baseUrlApi("hotdegree/hotlink"), { data });
};
