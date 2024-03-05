export default {
  path: "/twitter",
  meta: {
    icon: "material-symbols:menu-book",
    title: "智库分析"
  },
  children: [
    {
      path: "/twitter/tweet",
      name: "Tweet",
      component: () => import("@/views/twitter/index.vue"),
      meta: {
        title: "推文列表"
      }
    },
    {
      path: "/twitter/user",
      name: "TwitterUser",
      component: () => import("@/views/twitter/userList.vue"),
      meta: {
        title: "推特用户"
      }
    },
    {
      path: "/twitter/message",
      name: "TwitterMessage",
      component: () => import("@/views/twitter/message.vue"),
      meta: {
        title: "消息通知"
      }
    },
  ]
};
