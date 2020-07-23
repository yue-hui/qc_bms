<template>
  <div class="work-orders-tags">
    <div class="content-body scroller-bar">
      <div class="table-content">
        <el-card>
          <div class="ly-tree-container">
            <div class="tag-title">工单标签管理</div>
            <el-tree
              v-loading="loading"
              :props="default_props"
              :data="tags"
              :load="load_node"
              :expand-on-click-node="true"
              :render-content="render_content"
              node-key="id"
              lazy />
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getDefaultContent, getEditContent } from '@/utils/render_tree'
import { add_work_order_tag, edit_work_order_tag, get_work_order_tags_by_cascade } from '@/api/work_order_system'

export default {
  name: 'WorkOrdersTags',
  components: {},
  data() {
    return {
      is_edit: false,
      edit_name: '',
      select_id: null,
      is_superuser: 'False',
      loading: false,
      tags: [],
      tag_levels: [],
      default_props: {
        label: 'name',
        children: 'child'
      }
    }
  },
  computed: {},
  mounted: function() {
    setTimeout(() => {
      console.log('tags: ', this.tags)
    }, 4000)
  },
  methods: {
    change_current: function(page) {
      this.page = page
      this.search()
    },
    search: function() {
      //
    },
    create_tag: function() {
      // 创建标签
    },
    edit_tag: function() {
      // 编辑标签
    },

    delete_node: function() {
      // 删除节点
    },

    load_node: function(node, resolve) {
      // 懒加载
      if (node.level === 0) {
        node.id = 0
      }
      this.loading = true
      this.fetch_tree_nodes(node.data.id, node.level).then(data => {
        resolve(data)
      }).finally(() => {
        this.loading = false
      })
    },

    fetch_tree_nodes(pid = 0, plevel = 0) {
      return new Promise((resolve, reject) => {
        const config = {
          type_id: pid
        }
        const current_level = plevel + 1
        get_work_order_tags_by_cascade(config).then(res => {
          if (res.status === 0) {
            const remote_data = res.data.map(r => {
              return {
                ...r,
                name: r.type_name,
                level: current_level
              }
            })
            resolve(remote_data)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },

    update_node: function(tree, params) {
      return new Promise(resolve => {
        const config = {
          type_name: params.name,
          type_id: params.id
        }
        edit_work_order_tag(config).then(res => {
          if (res.status !== 0) {
            this.$message.error(res.message)
            resolve(false)
          } else {
            resolve(true)
          }
        }).catch(() => {
          resolve(false)
        })
      })
    },

    add_item: function(tree, params) {
      return new Promise(resolve => {
        const config = {
          type_name: params.name,
          type_id: params.id
        }
        add_work_order_tag(config).then(res => {
          if (res.status !== 0) {
            this.$message.error(res.message)
            resolve({ status: false })
          } else {
            resolve({ status: true, remote_data: res.data })
          }
        }).catch(() => {
          resolve({ status: false })
        })
      })
    },

    close(data, node, e) {
      e = event || window.event
      e.stopPropagation()
      if (!data.id) {
        node.parent.data.child.forEach((item, i) => {
          if (!item.id) {
            node.parent.data.child.splice(i, 1)
          }
        })
      }
      this.select_id = null
      this.select_level = null
      this.edit_name = data.name
      this.is_edit = false
    },
    update(node, data, e) {
      e = event || window.event
      e.stopPropagation()
      if (this.is_edit) {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在编辑或添加的选项未完成！',
          duration: 2000
        })
        return
      }
      this.select_id = data.id
      this.select_level = data.level
      this.edit_name = data.name
      this.is_edit = true
    },
    append(node, data, e) {
      e = event || window.event
      e.stopPropagation()
      if (!this.is_edit) {
        this.select_id = data.id
        this.edit_name = ''
        const newChild = {
          name: '',
          level: data.level + 1,
          is_edit: true
        }
        this.is_edit = true
        if (!data.child) {
          this.$set(data, 'child', [])
        }
        data.child.unshift(newChild)
      } else {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在编辑或添加的选项未完成！',
          duration: 2000
        })
      }
    },
    append_peer(node, data, e) {
      e = event || window.event
      e.stopPropagation()
      if (!this.is_edit) {
        this.select_id = data.id
        this.edit_name = ''
        const peerChild = {
          name: '',
          level: data.level,
          is_edit: true
        }
        this.is_edit = true
        console.log('====: ', node, data, e, peerChild)
        // if (!data.child) {
        //   this.$set(data, 'child', [])
        // }
        // data.child.unshift(peerChild)
      } else {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在编辑或添加的选项未完成！',
          duration: 2000
        })
      }
    },
    remove(node, data, e) {
      e = event || window.event
      e.stopPropagation()
      if (this.is_edit) {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在编辑或添加的选项未完成！',
          duration: 2000
        })
        return
      }
      this.select_node = node
      this.delDialogVisible = true
    },

    edit_msg(data, node, e) {
      e = event || window.event
      e.stopPropagation()
      if (this.edit_name.replace(/^\s+|\s+$/g, '')) {
        if (!data.id) {
          const virtualNode = node.parent
          const params = {
            name: this.edit_name,
            id: virtualNode.data.id
          }
          const virtual_node_level = virtualNode.data.level
          this.add_item(this.tags, params).then((result) => {
            if (result.status) {
              this.$notify({
                type: 'success',
                title: '操作提示',
                message: '添加成功！',
                duration: 2000
              })
              result.remote_data['name'] = result.remote_data.type_name || '刷新节点'
              result.remote_data['level'] = virtual_node_level + 1
              node.data = result.remote_data
            }
          })
          virtualNode.data.child.forEach((item, i) => {
            if (!item.id) {
              virtualNode.data.child.splice(i, 1)
            }
          })
          this.is_edit = false
          this.select_id = null
          this.select_level = null
          return
        }

        const params = {
          name: this.edit_name,
          id: data.id
        }
        this.update_node(this.tags, params).then(result => {
          if (result) {
            data.name = this.edit_name
            this.$notify({
              type: 'success',
              title: '操作提示',
              message: '编辑成功！',
              duration: 2000
            })
          }
        })
        this.is_edit = false
        this.select_id = null
        this.select_level = null
      }
    },
    name_change(e) {
      e = event || window.event
      e.stopPropagation()
      this.edit_name = e.target.value
    },
    is_select(data) {
      return data.id === this.select_id &&
        data.level === this.select_level
    },
    render_content: function(h, { node, data, store }) {
      let node_1
      if ((this.is_edit === true && this.is_select(data)) || data.is_edit) {
        node_1 = h('input', {
          attrs: {
            placeholder: '标签名称不能为空',
            class: 'ly-edit__text',
            value: this.edit_name
          },
          on: {
            keyup: () => this.name_change(),
            click: (e) => {
              e.stopPropagation()
            }
          }
        })
      } else {
        node_1 = h('span', data.name)
      }
      let node_2
      if ((this.is_edit === true && this.is_select(data)) || data.is_edit) {
        node_2 = getEditContent.call(this, h, data, node)
      } else {
        node_2 = getDefaultContent.call(this, h, data, node)
      }
      return h('span', {
        class: 'ly-tree-node'
      }, [node_1, node_2])
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$select_box_witdh: 120px;
$label_height: 40px;

.work-orders-tags {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .content-body {
    border: 1px solid #EAEAEA;
    /*height: 100%;*/
    height: 800px;
    min-height: 120px;
    overflow-y: scroll;

    .search-area {
      padding: 20px 20px 0 20px;

      .row-bg {
        .col-bg {
          padding: 5px 0;

          &.layout-right {
            text-align: right;
          }

          .order-number-list {
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            font-weight: bold;
            color: #4d4d4d;
            white-space: nowrap;
          }
        }
      }
    }

    .table-content {
      margin: 20px;
      width: 800px;

      /deep/ .ly-tree-container {
        margin: 20px 0 20px 20px;
        /*width: 60%;*/
        /*padding: 20px;*/

        .tag-title {
          height: 28px;
          line-height: 28px;
          font-size: 14px;
          font-weight: bold;
          color: #4d4d4d;
          white-space: nowrap;
        }

        span {
          font-size: 14px;
        }

        .el-tree > .el-tree-node > .el-tree-node__content:first-child {
          &:before,
          &:after {
            border: none;
          }
        }

        .ly-visible {
          margin-left: 50px;
          visibility: hidden;
        }

        .ly-edit__text {
          width: 25%;
          height: 25px;
          border: 1px solid #e6e6e6;
          border-radius: 3px;
          color: #666;
          text-indent: 10px;
        }

        .ly-tree__loading {
          color: #666;
          font-weight: bold;
        }

        .ly-tree-node {
          flex: 1;
          display: flex;
          align-items: center;
          // justify-content: space-between;
          justify-content: flex-start;
          font-size: 14px;
          padding-right: 8px;
        }

        .ly-tree-node > div > span:last-child {
          display: inline-block;
          width: 110px;
          text-align: left;
        }

        .ly-tree-node > span:last-child {
          display: inline-block;
          width: 110px;
          text-align: left;
        }

        .el-tree-node .el-tree-node__content {
          height: 30px;

          &:hover .ly-visible {
            visibility: visible;
          }

          &:before,
          &:after {
            content: '';
            position: absolute;
            right: auto;
          }

          &:before {
            border-left: 1px solid #e6e6e6;
            bottom: 50px;
            height: 100%;
            top: 0;
            width: 1px;
            margin-left: -5px;
            margin-top: -15px;
          }

          &:after {
            border-top: 1px solid #e6e6e6;
            height: 20px;
            top: 14px;
            width: 10px;
            margin-left: -5px;
          }
        }

        .el-tree .el-tree-node {
          position: relative;
        }
      }
    }
  }
}
</style>
