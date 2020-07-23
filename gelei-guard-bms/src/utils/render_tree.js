// 渲染树显示
export function getEditContent(h, data, node) {
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
        click: () => self.edit_msg(data, node)
      }
    }, '保存')
  ])
}

export function getDefaultContent(h, data, node) {
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
    }, '编辑')
    button_group.push(edit_element)
    console.log('==add_element==:', data.level, data.name, data.is_edit)
    if (data.level < 4) {
      // 添加元素
      const add_element = h('el-button', {
        attrs: {
          size: 'mini',
          type: 'text'
        },
        on: {
          click: async(e) => {
            console.log('add_element: ', node)
            if (node.expanded) {
              self.append(node, data)
            } else {
              await node.expand()
            }
          }
        }
      }, '添加下一级')
      button_group.push(add_element)
    }
    if (data.level === -1) {
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
