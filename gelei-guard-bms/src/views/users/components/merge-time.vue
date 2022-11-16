<template>
    <div :active="bgActive ? 1 : 0" :class="{'bg-active': bgActive}"></div>
</template>

<script>
import versionDiff from 'version-diff'

export default {
      mounted() {
        this.setBackgroundTime()
      },
      watch: {
        activeDayTime: {
          handler() {
            this.setBackgroundTime()
          },
          deep: true
        }
      },
      data() {
        return {
          bgActive: false
        }
      },
      props: {
        activeDayTime: {
          type: Array,
          default() {
            return [] // ['10:20-11:00']
          }
        },
        time: {
          type: String,
          default: '' // 12:10
        }
      },
      methods: {
        setBackgroundTime() {
          try {
            if (this.activeDayTime.length === 0) {
              // eslint-disable-next-line no-return-assign
              return this.bgActive = false
            }
            for (let i = 0; i < this.activeDayTime.length; i++) {
              const item = this.activeDayTime[i]
              const activeDayTime = item.split('-')
              let time = this.time
              // 最大时间为 24:00
              if (time === '23:60') {
                // time = '23:59'
                time = '24:00'
              }
              const t = time.replace(/:/g, '.')
              activeDayTime[0] = activeDayTime[0].replace(/:/g, '.')
              activeDayTime[1] = activeDayTime[1].replace(/:/g, '.')
              // 如果当前节点时间在父组件的时间范围内
              if (versionDiff([activeDayTime[0], activeDayTime[1]], t)) {
                this.bgActive = true
                break
              } else {
                this.bgActive = false
              }
            }
            // eslint-disable-next-line no-empty
          } catch (e) {
          }
        }
      }
    }

</script>
<style scoped lang="scss">
</style>
<style lang="scss">
  .bg-active{
    background-color: #A3B2C6;
    border: 1px solid #A3B2C6;
  }
  .text-white{
    color: #fff;
  }

</style>
