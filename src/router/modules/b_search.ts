export default {
  path: "/search",
  meta: {
    icon: "material-symbols:manage-search",
    title: "新闻信息"
  },
  children: [
    {
      path: "/search/baseDB",
      name: "SearchBaseDB",
      component: () => import("@/views/search/index.vue"),
      meta: {
        title: "境内外新闻源"
      }
    },
    {
      path: "/search/taiwanDB",
      name: "SearchTaiwanDB",
      component: () => import("@/views/search/taiwan.vue"),
      meta: {
        title: "台湾新闻源"
      }
    },
    {
      path: "/search/twElectionDB",
      name: "SearchTwElectionDB",
      component: () => import("@/views/search/twElectionShow.vue"),
      meta: {
        title: "台湾大选新闻展示"
      }
    },
    {
      path: "/search/twElectionUpdate",
      name: "SearchTwElectionUpdate",
      component: () => import("@/views/search/twElectionUpdate.vue"),
      meta: {
        title: "台湾大选新闻更新"
      }
    },
    {
      path: "/search/bjDailyDB",
      name: "SearchBjDailyDB",
      component: () => import("@/views/search/bjDailyShow.vue"),
      meta: {
        title: "北京日报"
      }
    },
    {
      path: "/search/bjDailyReportDB",
      name: "SearchBjDailyReportDB",
      component: () => import("@/views/search/bjDailyReportShow.vue"),
      meta: {
        title: "北京日报每日上报"
      }
    }
  ]
};
