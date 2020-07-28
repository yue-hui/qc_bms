<template>
  <div class="work-orders-tags">
    <div class="content-body scroller-bar noscroller">
      <div class="table-content">
        <el-card>
          <div class="ly-tree-container">
            <div class="tag-title">
              <span>标签名称</span>
              <span class="control-area">操作</span>
            </div>
            <el-tree
              v-loading="loading"
              ref="work_order_tree"
              :props="default_props"
              :data="tags"
              :load="load_node"
              :expand-on-click-node="false"
              :render-content="render_content"
              node-key="id"
              lazy
              @node-collapse="node_collapse" />
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { get_operation_content, get_editing_content, setElTreeExpandStatus } from '@/utils/render_tree'
import { add_work_order_tag, edit_work_order_tag, get_work_order_tags_by_cascade } from '@/api/work_order_system'

export default {
  name: 'WorkOrdersTags',
  components: {},
  data() {
    return {
      is_edit: false,
      origin_edit_name: '', // 重命名不发起请求
      edit_name: '',
      is_bluring: false,
      modified_type: 0, // 1 添加子元素 2 重命名 3 添加同层级 4 回车键(可去除，用blur替代) 5 删除
      over_cancel_or_submit_symbol: 0, // 0 其它区域 1 取消 2 保存
      select_id: null,
      is_superuser: true,
      loading: false,
      tags: [],
      tag_levels: [],
      default_props: {
        label: 'name',
        children: 'child',
        isLeaf: 'is_leaf'
      }
    }
  },
  computed: {
    tree_root: function() {
      return this.$refs.work_order_tree
    }
  },
  methods: {
    node_collapse: function(data, node, e) {
      setElTreeExpandStatus(node)
    },
    edit_tag: async function(data, node, e) {
      if (node.loading) {
        debugger
        if (!this.edit_name) {
          self.close(data, node)
        }
        return
      }
      node.loading = true
      // 编辑标签
      e = event || window.event
      e && e.stopPropagation()
      if (this.edit_name.replace(/^\s+|\s+$/g, '')) {
        if (!data.id) {
          // 新增
          const other_node = node
          const params = {
            name: this.edit_name,
            id: data.p_id
          }
          this.add_item(this.tags, params).then(result => {
            if (result.status) {
              this.$notify({
                type: 'success',
                title: '操作提示',
                message: '添加标签成功！',
                duration: 2000
              })
              result.remote_data['is_edit'] = false
              result.remote_data['name'] = result.remote_data['type_name']
              other_node.data = result.remote_data
              this.is_edit = false
              this.select_id = null
              this.select_level = null
            } else {
              this.$nextTick(() => {
                this.cursor_positioning()
              })
            }
          }).finally(() => {
            node.loading = false
          })
          return
        } else {
          // 重命名
          if (this.edit_name !== this.origin_edit_name.trim()) {
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
                  message: '重命名标签成功！',
                  duration: 2000
                })
                this.origin_edit_name = ''
                this.is_edit = false
                this.select_id = null
                this.select_level = null
              } else {
                this.$nextTick(() => {
                  this.cursor_positioning()
                })
              }
            }).finally(() => {
              node.loading = false
            })
          } else {
            node.loading = false
          }
          return
        }
      } else {
        this.close(data, node)
      }
    },

    delete_node: function() {
      // 删除节点
    },

    load_node: function(node, resolve) {
      if (this.is_edit) {
        if ([1, 3, 5].indexOf(this.modified_type) !== -1) {
          // 新建和编辑状态时不需要延时加载下级
          return resolve([])
        } else {
          // 编辑状态时延时加载
          const self = this
          setTimeout(() => {
            this.load_node.call(self, node, resolve)
          }, 100)
        }
      }
      if (node.level >= 3 && node.data.is_new) {
        return resolve([])
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
            const is_leaf = current_level === 4
            const remote_data = res.data.map(r => {
              return {
                ...r,
                name: r.type_name,
                level: current_level,
                is_leaf
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
            // this.$message.error(res.message)
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
      e && e.stopPropagation()
      if (!data.id) {
        node.parent.childNodes.forEach((node, i) => {
          if (!node.data.id) {
            node.parent.childNodes.splice(i, 1)
          }
        })
      }
      this.select_id = null
      this.select_level = null
      this.edit_name = data.name
      this.is_edit = false
      node.loading = false
    },

    update(node, data, e) {
      e = event || window.event
      e && e.stopPropagation()
      if (this.is_edit) {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在重命名或添加的选项未完成！',
          duration: 2000
        })
        return
      }
      this.select_id = data.id
      this.select_level = data.level
      this.edit_name = data.name
      this.origin_edit_name = data.name
      this.is_edit = true
      this.$nextTick(() => {
        this.cursor_positioning()
      })
    },

    cursor_positioning() {
      // 光标定位到最后
      const edit_element = document.querySelector('#edit_input')
      edit_element.focus()
      edit_element.value = ''
      edit_element.value = this.edit_name
    },

    append(node, data, e) {
      e = event || window.event
      e && e.stopPropagation()
      if (!this.is_edit) {
        this.select_id = data.id
        this.edit_name = ''
        const newChild = {
          name: '',
          level: data.level + 1,
          is_edit: true,
          p_id: data.id
        }
        this.is_edit = true
        this.tree_root.append(newChild, node)
        this.$nextTick(() => {
          this.cursor_positioning()
        })
      } else {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在重命名或添加的选项未完成！',
          duration: 2000
        })
      }
    },

    append_peer(node, data, e) {
      e = event || window.event
      e && e.stopPropagation()
      if (!this.is_edit) {
        this.select_id = data.id
        this.edit_name = ''
        const peerChild = {
          name: '',
          p_id: data.p_id,
          level: data.level,
          is_edit: true
        }
        this.is_edit = true
        this.tree_root.insertAfter(peerChild, node)
        this.$nextTick(() => {
          this.cursor_positioning()
        })
      } else {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在重命名或添加的选项未完成！',
          duration: 2000
        })
      }
    },

    remove(node, data, e) {
      e = event || window.event
      e && e.stopPropagation()
      if (this.is_edit) {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在重命名或添加的选项未完成！',
          duration: 2000
        })
        return
      }
      this.select_node = node
      // 删除接口
    },

    name_change(e, node, data) {
      e = event || window.event
      e && e.stopPropagation()
      this.edit_name = e.target.value
      const key = e.which || e.keyCode || e.charCode
      if (key === 13) {
        this.edit_tag(data, node)
      }
    },

    keyup_name_change(e, node, data) {
      e = event || window.event
      e && e.stopPropagation()
      this.edit_name = e.target.value
      const key = e.which || e.keyCode || e.charCode
      if (key === 13) {
        // 触发失去焦点事件，以免多次提交更新
        if ([1, 3].indexOf(this.modified_type) !== -1) {
          // 新增节点按默认处理
          e.target.blur()
        }
        if (this.modified_type === 2) {
          // 重命名节点按确认保存处理
          this.modified_type = 4
          this.edit_tag(data, node)
        }
      }
    },

    is_select(data) {
      return data.id === this.select_id &&
        data.level === this.select_level
    },

    render_content: function(h, { node, data, store }) {
      let tag_node
      if ((this.is_edit === true && this.is_select(data)) || data.is_edit) {
        tag_node = h('input', {
          attrs: {
            id: 'edit_input',
            placeholder: '标签名称不能为空',
            class: 'ly-edit__text',
            value: this.edit_name,
            maxlength: 50
          },
          on: {
            keyup: (e) => {
              this.keyup_name_change(e, node, data)
            },
            click: (e) => {
            },
            blur: (e) => {
              // blur状态
              this.is_bluring = true
              setTimeout(() => {
                this.is_bluring = false
              }, 500)

              const self = this
              if ([1, 3].indexOf(this.modified_type) !== -1) {
                if (!this.edit_name) {
                  this.close(data, node)
                } else {
                  setTimeout(() => {
                    // 无事件处理
                    if ([1, 2].indexOf(self.over_cancel_or_submit_symbol) === -1) {
                      if (self.edit_name) {
                        this.edit_tag.call(self, data, node)
                      } else {
                        this.close.call(self, data, node)
                      }
                    }
                  }, 300)
                }
              }
              if (this.modified_type === 2) {
                if (this.edit_name === this.origin_edit_name) {
                  this.close(data, node)
                } else {
                  setTimeout(() => {
                    // 无事件处理
                    if ([1, 2].indexOf(self.over_cancel_or_submit_symbol) === -1) {
                      this.close.call(self, data, node)
                    }
                  }, 300)
                }
              }
            }
          }
        })
      } else {
        tag_node = h('span', data.name)
      }
      let operation_nearby
      let operation_node
      if ((this.is_edit === true && this.is_select(data)) || data.is_edit) {
        operation_node = get_editing_content.call(this, h, data, node)
        operation_nearby = 'btn-nearby'
      } else {
        operation_node = get_operation_content.call(this, h, data, node)
        operation_nearby = ''
      }
      return h('span', {
        class: 'ly-tree-node ' + operation_nearby
      }, [tag_node, operation_node])
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
  background-color: #fafafa;

  .content-body {
    /*border: 1px solid #EAEAEA;*/
    /*height: 100%;*/
    /*height: 800px;*/
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
      /*width: 800px;*/

      /deep/ .ly-tree-container {
        margin: 20px 20px 20px 20px;
        /*border: 1px solid #0a0505;*/
        /*width: 60%;*/
        /*padding: 20px;*/

        .tag-title {
          height: 34px;
          line-height: 34px;
          font-size: 14px;
          font-weight: bold;
          color: white;
          white-space: nowrap;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          background-color: #304156;
          padding-left: 20px;
          margin-bottom: 2px;

          .control-area {
            padding-right: 116px;
          }
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
          /*visibility: hidden;*/
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
          justify-content: space-between;
          font-size: 14px;
          padding-right: 8px;

          &.btn-nearby {
            justify-content: flex-start;
          }
        }

        .ly-tree-node > div > span:last-child {
          display: inline-block;
          /*width: 110px;*/
          text-align: left;
        }

        .ly-tree-node > span:last-child {
          display: inline-block;
          /*width: 110px;*/
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
