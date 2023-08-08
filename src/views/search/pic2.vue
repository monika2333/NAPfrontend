<template>
  <div ref="container" style="width: 100%; height: 100%" ></div>
</template>

<script>
import * as echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
import { getLanguageNum } from "@/api/user";

export default {
  name: 'pic2Vue',
  data() {
    return {
      shuju: []
    };
  },
  mounted() {
    getLanguageNum().then(res => {
      res.forEach(el => {
        let item = {
          name: el._id,
          value: el.counter
        }
        this.shuju.push(item)
      });

      this.draw()
    });
  },
  methods: {
    draw() {
      const myChart = echarts.init(this.$refs.container);
      console.log(myChart)
      myChart.setOption({
        title: {
          text: 'News with different languages'
        },
        legend: {
          type: 'scroll',
          top: "10%",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            type: "pie",
            radius: ["20%", "60%"],
            top: "5%",
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: "#fff",
              borderWidth: 1
            },
            label: {
              formatter: "{b}: {c}"
            },
            data: this.shuju
          }
        ]
      });

      const erd = elementResizeDetectorMaker();
      erd.listenTo(this.$refs.container, () => {
        myChart.resize();
      });

      console.log(this.shuju)
    }
  }
}
</script>

<style scoped>

</style>