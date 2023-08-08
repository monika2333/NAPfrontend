export default {
  path: "/source",
  meta: {
    icon: "material-symbols:media-link",
    title: "媒体源"
  },
  children: [
    {
      path: "/source",
      name: "SourceList",
      component: () => import("@/views/source/list.vue"),
      meta: {
        title: "媒体源操作"
      }
    }
  ]
};