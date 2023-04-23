<template>
  <div
    style="height: 80%; width: 96%; margin-top: 10px; margin-left: 25px"
  ></div>
</template>

<script>
import echarts from 'echarts'
export default {
  components: {},
  data() {
    return {
      myChart: null,
    }
  },
  mounted() {},
  computed: {},
  beforeUpdate() {},
  beforeDestroy() {
    // 销毁-防止重新加载时占用的内存无法释放
    this.destroyCharts()
  },
  methods: {
    destroyCharts() {
      if (!this.myChart) return
      this.myChart.dispose()
      this.myChart = null
    },
    //获取父组件传入数据（可加默认值）
    huoqucharts(
      val,
      val2,
      phXaxs,
      phOne,
      phTwo,
      lineData = ['PH值上限', 'PH值下限', '实时PH值']
    ) {
      this.$nextTick(() => {
        this.initChart(val, val2, phXaxs, phOne, phTwo, lineData)
      })
    },
    initChart(val, val1, phXaxs, phOne, phTwo, lineData) {
      this.destroyCharts()
      let xaxis = phXaxs
      let planUp = val ? val : []
      let planDown = val1 ? val1 : []
      let planOne = phOne ? phOne : []
      let planTwo = phTwo ? phTwo : []
      let lineIcon = []
      let series = []
      let color = ['#ffd125', '#f87410', '#e7031a', '#31d2a9'] // 默认颜色，可选择修改为动态输入
      for (var i = 0; i < lineData.length; i++) {
        // 动态循图例数组
        lineIcon.push({
          name: lineData[i],
          icon: 'roundRect',
        })
        // 动态循环折线数组
        series.push({
          name: lineData[i],
          data:
            i === 0
              ? planUp
              : i === 1
              ? planDown
              : i === 2
              ? planOne
              : i === 3
              ? planTwo
              : [],
          type: 'line',
          lineStyle: {
            normal: {
              color: color[i],
              type: i === 0 || i === 1 ? 'dashed' : 'solid',
            },
          },
          itemStyle: {
            normal: {
              color: color[i],
              lineStyle: {
                color: color[i],
                width: 3,
              },
              label: {
                show: true,
                position: 'right',
                textStyle: {
                  fontSize: 12,
                  color: color[i],
                },
                formatter: (params) => {
                  if (planUp.length - 1 == params.dataIndex) {
                    return params.value
                  } else {
                    return ''
                  }
                },
              },
            },
          },
        })
      }
      this.myChart = echarts.init(this.$el)
      this.myChart.setOption({
        tooltip: {
          //设置tip提示
          trigger: 'axis',
        },
        legend: {
          orient: 'horizontal', //布局方式：  horizontal/vertical
          x: 'center', // 水平安放位置，默认为全图居中，可选： 'center' ¦ 'left' ¦ 'right'  或 {number}（x坐标，单位px）
          y: 'top', //垂直安放位置，默认为全图顶端，可选： 'top' ¦ 'bottom' ¦ 'center' 或 {number}（y坐标，单位px）
          itemGap: 5,
          textStyle: {
            fontSize: 10,
            color: '#ffffff',
          },
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc', // 图例边框颜色
          borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
          padding: 5, // 图例内边距，单位px，默认各方向内边距为5，或数组形式分别设定上右下左边距，同css
          itemGap: 10, // 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
          itemWidth: 20, // 图例图形宽度
          itemHeight: 14, // 图例图形高度
          data: lineIcon,
        },
        grid: {
          left: '7%',
          right: '10%',
          top: '15%',
          bottom: '10%',
        },
        color: color,
        xAxis: {
          //设置x轴
          boundaryGap: false, //坐标轴两边不留白
          data: xaxis,
          name: '', //X轴 name
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: '#BCDAFD',
            fontSize: 14,
            padding: [15, 0, -12, -12],
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: '#ffffff',
            },
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#ffffff',
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['#ffffff'],
              width: 1,
              type: 'solid',
            },
          },
          type: 'value',
        },
        series: series,
      })
    },
  },
}
</script>

<style></style>
