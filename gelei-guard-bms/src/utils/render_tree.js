// 渲染树显示
export function get_editing_content(h, data, node) {
  const self = this
  return h('span', {
    class: 'ly-visible'
  }, [
    h('el-button', {
      attrs: {
        size: 'mini',
        type: 'text'
      },
      on: {
        click: () => self.close(data, node)
      }
    }, '取消'),
    h('el-button', {
      attrs: {
        size: 'mini',
        type: 'text'
      },
      on: {
        click: () => self.edit_tag(data, node)
      }
    }, '保存')
  ])
}

function waitForExcute(node, data, e) {
  const self = this
  setTimeout(() => {
    if (node.loading) {
      waitForExcute.call(self, node, data, e)
    } else {
      self.append(node, data, e)
    }
  }, 300)
}

export function get_operation_content(h, data, node) {
  const self = this
  let default_content
  if (self.is_superuser) {
    const button_group = []
    // 编辑元素
    const edit_element = h('el-button', {
      attrs: {
        size: 'mini',
        type: 'text'
      },
      on: {
        click: () => self.update(node, data)
      }
    }, '重命名')
    button_group.push(edit_element)
    if (node.level < 5) {
      // 添加元素
      const add_element = h('el-button', {
        attrs: {
          size: 'mini',
          type: 'text'
        },
        on: {
          click: async(e) => {
            if (node.level === 4) {
              this.$notify({
                type: 'error',
                title: '操作提示',
                message: '无法添加更低层标签',
                duration: 2000
              })
              return
            } else {
              if (node.expanded) {
                self.append(node, data, e)
              } else {
                await node.expand()
                waitForExcute.call(self, node, data, e)
              }
            }
          }
        }
      }, '添加子层级')
      button_group.push(add_element)
    }

    // 添加同级元素
    const add_peer_element = h('el-button', {
      attrs: {
        size: 'mini',
        type: 'text'
      },
      on: {
        click: async(e) => {
          self.append_peer(node, data)
        }
      }
    }, '添加同层级')
    button_group.push(add_peer_element)

    if (node.level === -1) {
      // 删除元素 - 暂时不开放
      const remove_element = h('el-button', {
        attrs: {
          size: 'mini',
          type: 'text'
        },
        on: {
          click: () => self.remove(node, data)
        }
      }, '删除')
      button_group.push(remove_element)
    }
    const children = h('span', button_group)
    default_content = h('div', {
      class: 'ly-visible'
    }, [children])
  } else {
    default_content = h('div', {
      class: 'ly-visible'
    })
  }
  return default_content
}

/* 收起/展开所有子节点 */
export const setElTreeExpandStatus = (node, expand = false) => {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child_node = node.childNodes[i]
    child_node.expanded = expand
    setElTreeExpandStatus(child_node, expand)
  }
}
