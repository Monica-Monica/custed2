<template>
  <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}">
    <el-form :model="newsData" style="width: 50%;">
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="newsData.title" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="摘要" :label-width="formLabelWidth">
        <el-input v-model="newsData.abstract" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="绑定货币/指数" :label-width="formLabelWidth">
        <el-select v-model="bindType" placeholder="请选择">
          <el-option
            v-for="(item, index) in typeBindSelector"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <textarea class="tinymce-textarea" name="text" :id="tinymceId">
    </textarea>
    <el-button type="primary" style="margin: 20px;" @click="handleSubmit">提交</el-button>
    <el-button type="info" style="margin: 20px;" @click="$router.go(-1)">返回</el-button>
  </div>
</template>

<script>
import editorImage from './components/editorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import { bindSelector, updateNews, createNews } from '../../api/api'

export default {
  name: 'tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      fullscreen: false,
      formLabelWidth: '150px',
      typeBindSelector: [],
      bindType: ''
    }
  },
  computed: {
    newsData() {
      return this.$store.getters.newsData
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    }
  },
  created() {
    this.getBindSelector()
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        init_instance_callback: editor => {
          if (_this.newsData.content) {
            editor.setContent(_this.newsData.content)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    // 提交按钮
    handleSubmit() {
      this.newsData.content = window.tinymce.get(this.tinymceId).getContent()
      this.newsData.bindId = this.bindType
      if (this.newsData.editType === 'create') {
        this.createNewsRequest(this.newsData)
      } else {
        this.updateNewsRequest(this.newsData)
      }
      // console.log('对象', this.newsData)
    },
    // 获取选择器
    getBindSelector() {
      bindSelector().then(res => {
        if (res.data.code === 0) {
          this.typeBindSelector = res.data.data.list
          this.bindType = this.newsData.bindId
          console.log(res)
        }
      })
        .catch(error => {
          console.log(error.response)
        })
    },
    // 更新信息
    updateNewsRequest(data) {
      console.log(data)
      const postData = { title: '', content: '', bindId: '', abstract: '' }
      postData.title = data.title
      postData.content = data.content
      postData.bindId = data.bindId
      postData.abstract = data.abstract ? data.abstract : ''
      updateNews(data.newsId, JSON.stringify(postData)).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$router.push({ name: 'Important' })
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
        .catch(error => {
          console.log(error.response)
        })
    },
    // 创建信息
    createNewsRequest(data) {
      createNews(data.title, data.content, data.type, data.bindId, data.abstract).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$router.push({ name: 'Important' })
          this.$message({
            message: '创建成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
        .catch(error => {
          console.log(error.response)
        })
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
  padding-top: 20px;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
