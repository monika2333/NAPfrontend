export default {
  path: "/hotdegree",
  meta: {
    icon: "material-symbols:online-prediction",
    title: "舆情热度"
  },
  children: [
    {
      path: "/hotdegree",
      name: "Hotdegree",
      component: () => import("@/views/source/list.vue"),
      meta: {
        title: "舆情热度"
      }
    }
  ]
};