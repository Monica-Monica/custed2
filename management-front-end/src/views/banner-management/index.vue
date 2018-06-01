<template>
  <div class="banner-management-container">

    <div class="filter-container">
      <el-button class="filter-item" style="margin: 10px;" type="primary" icon="el-icon-edit" @click="handleCreatePlatform">创建Banner</el-button>
    </div>

    <el-row style="margin: 10px;">
      <el-col :span="7" v-for="(item, index) in lists" :key="index" style="margin: 5px">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.cover" class="image">
          <div style="padding: 14px;">
            <span style="color: #66b1ff;">ID: </span>
            <span>{{ item.id }}</span>
            <div class="bottom clearfix">
              <span style="color: #66b1ff;font-size: 12px;">URL: </span>
              <span style="font-size: 12px;">{{ item.url }}</span>
              <el-button type="text" class="button" style="color: #f56c6c" @click="handleDelete(item)">删除</el-button>
              <el-button type="text" class="button" @click="handleUpdateBanner(item.id)">修改</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5, 10]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="dialogTitle[dialogType] + 'Banner'" :visible.sync="updateDialogVisible" width="60%">
      <el-form :model="updateForm">
        <el-form-item label="BannerID" :label-width="formLabelWidth" v-if="dialogType === 'showUpdate'">
          <el-input v-model="updateForm.id" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-input v-model="updateForm.cover" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="updateForm.url" auto-complete="on"></el-input>
        </el-form-item>
        <div class="detail-item" v-if="dialogType === 'showUpdate'">
          <span class="detail-item-title">创建时间: </span><span>{{new Date(parseInt(updateForm.createTime)*1000).toLocaleString()}}</span>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommit(updateForm)">{{ dialogTitle[dialogType] }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%">
      <span>确定删除Banner</span><span style="color: #409EFF;font-weight: 600;"> ID: {{ deleteTemp.id }}</span><span>?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteCommit(deleteTemp.id)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { bannerList, bannerDetail, updateBanner, createBanner, deleteBanner } from '../../api/api'

  export default {
    name: 'banner-management',
    data() {
      return {
        lists: [],
        total: 0,
        dialogType: '',
        dialogTitle: {
          showUpdate: '修改',
          createUpdate: '创建'
        },
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          type: undefined,
          queryType: '',
          sort: '+id'
        },
        updateDialogVisible: false,
        deleteDialogVisible: false,
        updateForm: {},
        deleteTemp: {},
        formLabelWidth: '120px'
      }
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getBannerList(this.listQuery.page, this.listQuery.limit)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getBannerList(this.listQuery.page, this.listQuery.limit)
      },
      // 修改Banner信息
      handleUpdateBanner(id) {
        this.dialogType = 'showUpdate'
        this.getBannerDetail(id)
      },
      // 创建新平台
      handleCreatePlatform() {
        this.updateForm = { cover: '', url: '' }
        this.dialogType = 'createUpdate'
        this.updateDialogVisible = true
      },
      // dialog确定逻辑
      handleCommit(data) {
        if (this.dialogType === 'showUpdate') {
          this.updateBannerRequest(data)
        } else if (this.dialogType === 'createUpdate') {
          this.createBannerRequest(data)
        }
      },
      // 删除Banner
      handleDelete(row) {
        this.deleteTemp = row
        this.deleteDialogVisible = true
      },
      // 删除平台dialog确定逻辑
      handleDeleteCommit(id) {
        this.deleteBannerRequest(id)
      },
      // 获取Banner列表
      getBannerList(page, limit) {
        bannerList(page, limit).then(res => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.total = res.data.data.total
            this.lists = res.data.data.list
          }
        })
          .catch(error => {
            console.log(error.response)
          })
      },
      // 获取Banner详情
      getBannerDetail(id) {
        bannerDetail(id).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.updateForm = res.data.data
            console.log('对象', this.updateForm)
            this.updateDialogVisible = true
          }
        })
          .catch(error => {
            console.log(error.response)
          })
      },
      // 更新Banner信息
      updateBannerRequest(data) {
        const postData = { cover: '', url: '' }
        postData.cover = data.cover
        postData.url = data.url
        updateBanner(data.id, JSON.stringify(postData)).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.getBannerList(this.listQuery.page, this.listQuery.limit)
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
          this.updateDialogVisible = false
        })
          .catch(error => {
            console.log(error.response)
            this.updateDialogVisible = false
          })
      },
      // 创建Banner信息
      createBannerRequest(data) {
        const postData = { cover: '', url: '' }
        postData.cover = data.cover
        postData.url = data.url
        createBanner(JSON.stringify(postData)).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.getBannerList(1, 10)
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
          this.updateDialogVisible = false
        })
          .catch(error => {
            console.log(error.response)
            this.updateDialogVisible = false
          })
      },
      // 删除Banner
      deleteBannerRequest(id) {
        deleteBanner(id).then(res => {
          if (res.data.code === 0) {
            this.getBannerList(this.listQuery.page, this.listQuery.limit)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
          this.deleteDialogVisible = false
        })
          .catch(error => {
            console.log(error.response)
            this.deleteDialogVisible = false
          })
      }
    },
    created() {
      this.getBannerList(1, 10)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .banner-management-container{
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }
    .detail-item-title{
      font-weight: 600;
      color: #409EFF;
    }
  }
</style>
