export default {
  path: "/message",
  meta: {
    icon: "majesticons:chat-signal",
    title: "消息订阅"
  },
  children: [
    {
      path: "/message",
      name: "Message",
      component: () => import("@/views/message/index.vue"),
      meta: {
        title: "消息订阅"
      }
    }
  ]
};