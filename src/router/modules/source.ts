export default {
  path: "/source",
  meta: {
    title: "媒体源"
  },
  children: [
    {
      path: "/source/list",
      name: "SourceList",
      component: () => import("@/views/source/list.vue"),
      meta: {
        title: "媒体源操作"
      }
    }
  ]
};