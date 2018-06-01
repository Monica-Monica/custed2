<template>
  <div class="app-container user-management-container">

    <div class="filter-container">
      <el-select clearable style="width: 100px" class="filter-item" v-model="listQuery.queryType" placeholder="查询类别">
        <el-option v-for="(item, index) in queryTypeOptions" :key="index" :label="item.lable" :value="item.value">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键字" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="isShow.certNo">证件号码</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="isShow.certName">证件姓名</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="isShow.certType">证件类型</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.updateTime">更新时间</el-checkbox>
    </div>

    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.row.userId}}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          <div class="username-item">
            <span>{{scope.row.nickname}}</span>
            <img :src="scope.row.avatar" class="image"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.certType" label="证件类型" align="center">
        <template slot-scope="scope">
          {{scope.row.certType | certTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.certNo" label="证件号码" align="center">
        <template slot-scope="scope">
          {{scope.row.certNo}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.certName" label="证件姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.certName}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="认证状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.certStatus | certStatusFilter">{{scope.row.certStatus | certStatusTextFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="拒绝原因" align="center">
        <template slot-scope="scope">
          {{scope.row.reason}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.updateTime" align="center" prop="created_at" label="更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{new Date(parseInt(scope.row.updateTime)*1000).toLocaleString()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <!--<el-button size="mini" type="danger">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="修改密码" prop="new-pass">
          <el-input v-model="temp.newPassWord"></el-input>
        </el-form-item>
        <!--<el-form-item label="用户昵称" prop="nickname">-->
          <!--<el-input v-model="temp.nickname"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="手机号" prop="phone">-->
          <!--<el-input v-model="temp.phone"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="时间" prop="updateTime">-->
          <!--<el-date-picker v-model="temp.updateTime" type="datetime" placeholder="Please pick a date">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="认证状态" prop="status">-->
          <!--<el-select class="filter-item" v-model="temp.status" placeholder="Please select">-->
            <!--<el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { getUserList, searchUser, updateUserPassWord } from '../../api/api'

  const queryTypeOptions = [
    {
      lable: '用户ID',
      value: 'userId'
    },
    {
      lable: '用户名',
      value: 'nickname'
    },
    {
      lable: '电话',
      value: 'mobile'
    }
  ]

  export default {
    name: 'user-management',
    data() {
      return {
        tableKey: 0,
        isShow: {
          certNo: false,
          certName: false,
          certType: false,
          updateTime: false
        },
        list: null,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          type: undefined,
          queryType: '',
          sort: '+id'
        },
        queryTypeOptions,
        listLoading: true,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        rules: {
          status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
          updateTime: [{ type: 'date', required: true, message: '时间必须填写', trigger: 'change' }],
          nickname: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
          phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }]
        },
        temp: {
          id: undefined,
          updateTime: Date.parse(new Date()),
          nickname: '',
          status: 'published',
          phone: '',
          newPassWord: ''
        },
        statusOptions: ['success', 'defeated']
      }
    },
    filters: {
      certStatusFilter(status) {
        const statusMap = {
          0: 'danger',
          1: 'success'
        }
        return statusMap[status]
      },
      certStatusTextFilter(status) {
        const statusMap = {
          0: '未认证',
          1: '已认证'
        }
        return statusMap[status]
      },
      certTypeFilter(type) {
        const statusMap = {
          0: '未定义',
          1: '身份证',
          2: '护照'
        }
        return statusMap[type]
      }
    },
    methods: {
      updateData() {
        // 这里请求
        // for (const v of this.list) {
        //   if (v.id === this.temp.id) {
        //     const index = this.list.indexOf(v)
        //     this.list.splice(index, 1, this.temp)
        //     break
        //   }
        // }
        this.updateUserPassWordRequest(this.temp.newPassWord, this.temp.userId)
        this.dialogFormVisible = false
      },
      createData() {
        // 这里请求
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.updateTime = new Date(this.temp.updateTime)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleDelete() {},
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getUser(this.listQuery.page, this.listQuery.limit)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getUser(this.listQuery.page, this.listQuery.limit)
      },
      handleFilter() {
        this.listQuery.page = 1
        if (this.listQuery.queryType === '' || this.listQuery.title === '') {
          this.listQuery.title = undefined
          this.getUser(1, 10)
        } else {
          this.searchUserRequest(this.listQuery.queryType, this.listQuery.title)
        }
      },
      getUser(page, limit) {
        getUserList(page, limit).then(res => {
          console.log(res.data)
          this.list = res.data.data.list
          this.total = res.data.data.total
        })
          .catch(error => {
            console.log(error)
          })
      },
      searchUserRequest(key, value) {
        searchUser(key, value).then(res => {
          console.log(res.data)
          this.list = res.data.data.list
          this.total = res.data.data.total
        })
          .catch(error => {
            console.log(error)
          })
      },
      updateUserPassWordRequest(password, userId) {
        updateUserPassWord(password, userId).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
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
    created() {
      this.listLoading = true
      this.getUser(1, 10)
      this.listLoading = false
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .user-management-container{
    .username-item{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .image{
        width: 20px;
        margin: 0 5px;
      }
    }
  }
</style>
