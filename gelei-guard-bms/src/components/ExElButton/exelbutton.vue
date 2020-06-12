<script>
import { Button } from 'element-ui'

export default {
  name: 'ExElButton',
  extends: Button,
  // mixins: [Button],
  // propsData: {
  //   disabled: true
  // },
  // components: {
  //   Button
  // },
  props: {
    authId: {
      type: Number,
      require: true,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  beforeCreate() {
    // this.$options.propsData.disabled = true
    // console.log('propsData: ', this.$options.propsData)
    console.log('options: ', this.$options)
    console.log('create: ', this)
    console.log('_props: ', this._props)
    // this.disabled = true
  },
  mounted: function() {
    // console.log('xxxxxxxxx: ', this.$attrs)
    // console.log('child: ', this.$children)
    // console.log('props: ', this.$props)
    // console.log('$parent: ', this)
    // console.log('propsData: ', this.propsData)
    // this.$parent.disabled = true
    // console.log('xxxxxx:', this.$el.disabled)
    // this.$el.disabled = true
    // this.disabled = true
    this.$emit('update:disabled', true)
    // this.$emit('update:$attrs:disabled', true)
    // this.$props.disabled = true
    // this.$set(this.obj, 'disabled', true)
    // this.$el.attributes.disabled = true
    // this.$el.setAttribute('disabled', true)
    // console.log(this.$el.attributes)
  },
  methods: {}
}
</script>

<!--<script>-->
<!--import { Button } from 'element-ui'-->
<!--export default {-->
<!--  name: 'FunctionalButton',-->
<!--  functional: true,-->
<!--  render(createElement, context) {-->
<!--    return createElement(Button, 'click me')-->
<!--  }-->
<!--}-->
<!--</script>-->
