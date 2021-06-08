<template>
  <div class="boxWarp" style="padding: 0 0 0 16px;">
    <div class="boxRightWarp">
      <div class="numberpapers">
        <div v-for="(item,i) in papers" :key="i" :class="{active:cur == i}" class="box" @click="openQuery(i)">
          <p class="box_top_left" />
          <p class="box_top_right">
            <span>{{ item.number }}</span>
            <label>{{ item.name }}</label>
          </p>
        </div>
      </div>
      <div class="serch_box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input
              v-model="formInline.mediaName"
              style="width:284px"
              placeholder="请输入账号名称"
              prefix-icon="el-icon-search"
            />
          </el-form-item>
          <el-form-item label="账号渠道">
            <el-select v-model="formInline.channelType" style="width:134px" placeholder="请选择">
              <el-option
                v-for="item in weichartData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属机构">
            <el-input
              v-model="formInline.organizationName"
              style="width:284px"
              placeholder="请输入所属机构"
            />
          </el-form-item>
          <el-form-item label="账号类型">
            <el-select v-model="formInline.accountType" style="width:134px" placeholder="请选择">
              <el-option
                v-for="item in numData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
            <el-button @click="onResrt">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn_groups">
        <div class="fl">
          <el-button-group>
            <el-button @click="onDelete">批量删除</el-button>
            <el-button @click="onDaochu">批量导出</el-button>
            <el-button @click="onDaoru">批量导入</el-button>
          </el-button-group>
          <el-button type="text" @click="download">下载批量导入模板</el-button>
        </div>
        <div class="fr">
          <el-button class="" @click="onAdd">新建</el-button>
        </div>
      </div>
      <div class="table_box">
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="45"
          />
          <el-table-column
            label="序号"
            width="88"
            type="index"
          />
          <el-table-column
            prop="mediaName"
            label="账号名称"
          >
            <!-- <template slot-scope="scope">{{ scope.row.insertTime }}</template> -->
          </el-table-column>
          <el-table-column
            prop="channelType"
            label="账号渠道"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.channelType === 1">网站</span>
              <span v-if="scope.row.channelType === 2">电子报纸</span>
              <span v-if="scope.row.channelType === 3">APP</span>
              <span v-if="scope.row.channelType === 4">微信</span>
              <span v-if="scope.row.channelType === 5">微博</span>
              <span v-if="scope.row.channelType === 6">头条</span>
              <span v-if="scope.row.channelType === 7">抖音</span>
              <span v-if="scope.row.channelType === 8">快手</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="accountType"
            label="账号类型"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.accountType === 1">自有账号</span>
              <span v-if="scope.row.accountType === 2">其它账号</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button size="small" @click="handleClick(scope.row)">编辑</el-button>
              <el-popover
                ref="popoverDelete"
                placement="bottom"
                width="175"
                trigger="click"
              >
                <div class="warningTitle"><i class="el-icon-warning" />确定要删除吗？</div>
                <div class="warningBtnBox">
                  <el-button size="small" @click="outClick">取消</el-button>
                  <el-button size="small" type="primary"
                             @click.native.prevent="deleteRow(scope.$index, tableData ,scope.row)"
                  >确认
                  </el-button>
                </div>
                <el-button slot="reference" class="btnMargin" size="small">删除</el-button>
              </el-popover>

              <!-- <el-button size="small" @click.native.prevent="deleteRow(scope.$index, tableData ,scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next"
          :total="tabletotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog v-loading="loading" title="新建账号" :visible.sync="dialogFormVisible" width="505px">
      <el-form :model="formAdd">
        <el-form-item label="账号渠道" :label-width="formLabelWidth">
          <el-select v-model="formAdd.channelType" style="width:100%" placeholder="请选择账号渠道" @change="selectTrigger">
            <el-option
              v-for="item in weichartDatat"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="账号名称" :label-width="formLabelWidth">
          <el-input v-model="formAdd.mediaName" placeholder="请输入账号名称" autocomplete="off" @input="searchData" />
          <div v-if="mediaNameSelectShow" class="mediaNameSelect">
            <p v-for="(item,i) in mediaNameList" :id="item.autoId" :key="i" @click="selectmediaClick(item)">{{
                item.name
              }}</p>
          </div>
          <el-alert
            v-if="mediaNameMsg"
            title="请输入选择正确的账号名称!"
            type="error"
            :closable="false"
          />
        </el-form-item>
        <el-form-item label="所属机构" :label-width="formLabelWidth">
          <el-input v-model="formAdd.organizationName" placeholder="请输入账号所属机构" autocomplete="off" />
        </el-form-item>
        <el-form-item label="账号类型" :label-width="formLabelWidth">
          <el-select v-model="formAdd.accountType" style="width:100%">
            <el-option
              v-for="item in numDatat"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <div class="addBtnCenter">获取自有账号VIP授权</div>
        <el-form-item label="appKey" :label-width="formLabelWidth">
          <el-input v-model="formAdd.appKey" placeholder="请输入appKey" autocomplete="off" />
        </el-form-item>
        <el-form-item label="appSecret" :label-width="formLabelWidth">
          <el-input v-model="formAdd.appSecret" placeholder="请输入appSecret" autocomplete="off" />
        </el-form-item>
        <el-form-item label="accessToken" :label-width="formLabelWidth">
          <el-input v-model="formAdd.accessToken" placeholder="请输入accessToken" autocomplete="off" />
        </el-form-item>
        <div class="msgtitle">输入VIP授权内容，可帮助获得更详细数据分析</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="批量导入"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-upload
        ref="upload"
        class="upload-demo"
        action="string"
        multiple
        :limit="1"
        :http-request="UploadImage"
        :on-change="fileChange"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  accountCount,
  getAccount,
  addAccount,
  updateAccount,
  deleteAccount,
  getMediaAccountInfo,
  downloadAll,
  upload
} from '@/api/accountManagement'

export default {
  name: 'AccountManagement',
  filters: {
    filterChannelType(val) {
      if (val === 1) {
        return '网站'
      } else if (val === 2) {
        return '电子报纸'
      } else if (val === 3) {
        return 'APP'
      } else if (val === 4) {
        return '微信'
      } else if (val === 5) {
        return '微博'
      } else if (val === 6) {
        return '头条'
      } else if (val === 7) {
        return '抖音'
      } else {
        return '快手'
      }
    }
    // filterAccountType(val) {
    // 		if(val == 1) {
    // 			return '自有账号'
    // 		}else{
    // 			return "其它账号"
    // 		}
    // 	}
  },
  data() {
    return {
      addType: '',
      mediaNameMsg: false,
      mediaNameSelectShow: false,
      mediaNameList: [],
      formInline: {
        mediaName: '',
        channelType: '',
        organizationName: '',
        accountType: '',
        tenantId: 5,
        pageNum: 1,
        pageSize: 10
      },
      formAdd: {
        channelType: '',
        mediaName: '',
        accountType: '1',
        organizationName: '',
        tenantId: '5',
        userId: '1',
        mediaId: '',
        appSecret: '',
        appKey: '',
        accessToken: ''
      },
      visible: false,
      cur: 0,
      loading: false,
      formLabelWidth: '95px',
      dialogFormVisible: false,
      dialogVisible: false,
      tabletotal: 0,
      fileList: [],
      papers: [{
        name: '总监测账号数',
        number: 0
      }, {
        name: '微信公众号数',
        number: 0
      }, {
        name: '微博账号数',
        number: 0
      }, {
        name: '短视频账号数',
        number: 0
      }, {
        name: '网站/电子报纸',
        number: 0
      }],
      weichartData: [{ value: '', label: '全部' }, { value: 1, label: '网站' }, { value: 2, label: '电子报纸' }, {
        value: 3,
        label: 'APP'
      }, { value: 4, label: '微信' }, { value: 5, label: '微博' }, { value: 6, label: '头条' }, {
        value: 7,
        label: '抖音'
      }, { value: 8, label: '快手' }],
      weichartDatat: [{ value: 1, label: '网站' }, { value: 2, label: '电子报纸' }, { value: 3, label: 'APP' }, {
        value: 4,
        label: '微信'
      }, { value: 5, label: '微博' }, { value: 6, label: '头条' }, { value: 7, label: '抖音' }, { value: 8, label: '快手' }],
      numData: [{ value: '', label: '全部' }, { value: 1, label: '自有账号' }, { value: 2, label: '其他账号' }],
      numDatat: [{ value: 1, label: '自有账号' }, { value: 2, label: '其他账号' }],
      tableData: [],
      multipleSelection: []

    }
  },
  mounted() {
    this.qureyData()
    this.accountCount()
    this.queryDataList()
  },
  methods: {
    uploadBtn() {
      this.dialogVisible = false
      this.queryDataList()
    },
    UploadImage(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('userId', 1)
      upload(formData).then(response => {
        this.$message.success('上传成功！')
        param.onSuccess() // 上传成功的图片会显示绿色的对勾
        // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
      }).catch(response => {
        console.log('上传失败')
        param.onError()
      })
    },
    fileChange(file) {
      this.$refs.upload.clearFiles() // 清除文件对象
      this.logo = file.raw // 取出上传文件的对象，在其它地方也可以使用
      this.fileList = [{ name: file.name, url: file.url }] // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },
    selectTrigger() {
      this.mediaNameSelectShow = false
      this.mediaNameList = []
      this.formAdd.mediaName = ''
      this.formAdd.mediaId = ''
    },
    selectmediaClick(data) {
      this.formAdd.mediaName = data.name
      this.formAdd.mediaId = data.autoId
      this.mediaNameSelectShow = false
    },
    // 输入框事件
    searchData(e) {
      const obj = {
        channelType: this.formAdd.channelType,
        mediaName: e
      }
      this.loading = true
      getMediaAccountInfo(obj).then((res) => {
        if (res && res.data && res.success) {
          this.mediaNameList = res.data
          this.mediaNameSelectShow = true
          if (res.data.length === 0) {
            this.mediaNameMsg = true
          } else {
            this.mediaNameMsg = false
          }
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取查询账号
    queryDataList() {
      this.loading = true
      getAccount(this.formInline).then((res) => {
        if (res && res.data && res.success) {
          this.tabletotal = res.total
          this.tableData = res.data
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取机构下账号数监测
    accountCount() {
      accountCount().then((res) => {
        if (res && res.data && res.success) {
          this.papers[0].number = res.data[0].total
          this.papers[1].number = res.data[0].wechatTotal
          this.papers[2].number = res.data[0].weiboTotal
          this.papers[3].number = res.data[0].shortVideoTotal
          this.papers[4].number = res.data[0].websiteTotal
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 顶部切换
    openQuery(index) {
      this.cur = index
      if (index === 0) {
        this.formInline.channelType = ''
      }
      if (index === 1) {
        this.formInline.channelType = 4
      }
      if (index === 2) {
        this.formInline.channelType = 5
      }
      if (index === 3) {
        this.formInline.channelType = 7
      }
      if (index === 4) {
        this.formInline.channelType = 1
      }
      // 请求列表方法
      this.queryDataList()
    },
    // 获取表格数据
    qureyData() {
      // 请求接扣

    },
    // 编辑
    handleClick(row) {
      console.log(row)
      this.addType = 'Edit'
      this.dialogFormVisible = true
      this.formAdd.channelType = row.channelType
      this.formAdd.mediaName = row.mediaName
      this.formAdd.accountType = row.accountType
      this.formAdd.organizationName = row.organizationName
      this.formAdd.mediaId = row.mediaId
      this.formAdd.appSecret = row.appSecret
      this.formAdd.appKey = row.appKey
      this.formAdd.accountId = row.accountId
      this.formAdd.accessToken = row.accessToken
    },
    outClick(row, column, cell, event) {
      // this.$refs.popoverDelete.showPopper = false
      document.body.click()
    },
    // 逐条删除
    deleteRow(index, tableData, rows) {
      this.multipleSelection = []
      this.multipleSelection.push(rows.accountId)
      this.loading = true
      deleteAccount(this.multipleSelection).then((res) => {
        if (res && res.data && res.success) {
          // this.queryDataList()
          this.$message.success('删除成功！')
          this.dialogFormVisible = false
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
      tableData.splice(index, 1)
      document.body.click()
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val
      this.queryDataList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.formInline.pageNum = val
      this.queryDataList()
      console.log(`当前页: ${val}`)
    },
    // 重置
    onResrt() {
      this.cur = 0
      this.formInline.mediaName = ''
      this.formInline.organizationName = ''
      this.formInline.channelType = ''
      this.formInline.accountType = ''
      this.queryDataList()
    },
    // 搜索
    onSubmit() {
      this.queryDataList()
    },
    // 批量删除
    onDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请勾选需要删除的数据！')
        return false
      }
      const multipleSelection = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        multipleSelection.push(this.multipleSelection[i].accountId)
      }
      this.$confirm('是否确认删除选中账号？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteAccount(multipleSelection).then((res) => {
          if (res && res.data && res.success) {
            this.queryDataList()
            this.$message.success('删除成功！')
            this.dialogFormVisible = false
            this.loading = false
          }
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量导出
    onDaochu() {
      downloadAll(this.formInline).then((res) => {
        this.downloadxl(res)
      }).catch(() => {

      })
    },
    downloadxl(data) {
      const d = data.data
      const blob = new Blob([d], { type: 'application/vnd.ms-excel' }) // 处理文档流
      const contentDisposition = data.headers['content-disposition']
      let fileName = 'excel.xlsx'
      if (contentDisposition) {
        fileName = window.decodeURI(data.headers['content-disposition'].split('utf-8\'\'')[1], 'utf-8')
      }
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
      this.$message.success('导出成功！')
    },
    // 批量导入
    onDaoru() {
      this.dialogVisible = true
      this.fileList = []
    },

    // 下载批量导出模板
    download() {
      window.open('http://192.168.18.10:9400/%E8%B4%A6%E5%8F%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls')
    },
    // 新建
    onAdd() {
      this.addType = 'Add'
      this.dialogFormVisible = true
      this.formAdd.channelType = ''
      this.formAdd.mediaName = ''
      this.formAdd.organizationName = ''
      this.formAdd.accountType = 1
      this.formAdd.organizationName = ''
      this.formAdd.organizationName = ''
    },
    // 添加数据
    dialogFormAdd() {
      if (this.formAdd.channelType === '') {
        this.$message.error('账号渠道不能为空！')
        return false
      }
      if (this.formAdd.mediaName === '') {
        this.$message.error('账号名称不能为空！')
        return false
      }
      if (this.formAdd.organizationName === '') {
        this.$message.error('所属机构不能为空！')
        return false
      }
      // 调取添加接口
      this.loading = true
      const addType = this.addType
      if (addType === 'Add') {
        addAccount(this.formAdd).then((res) => {
          if (res && res.data && res.success) {
            this.queryDataList()
            this.$message.success('添加成功！')
            this.dialogFormVisible = false
            this.loading = false
          }
        }).catch(() => {
          this.loading = false
        })
      } else {
        updateAccount(this.formAdd).then((res) => {
          if (res && res.data && res.success) {
            this.queryDataList()
            this.$message.success('修改成功！')
            this.dialogFormVisible = false
            this.loading = false
          }
        }).catch(() => {
          this.loading = false
        })
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table__body-wrapper {
  min-height: 490px;
}
.el-button--small {
  padding: 5px 9px;
}
.el-button--text {
  padding-left: $margin8px;
}
.serch_box .el-button + .el-button {
  margin-left: $margin16px;
}
::v-deep .el-form-item__content {
  margin-left: 10px;
}
::v-deep .el-form--inline .el-form-item {
  margin-right: 22px;
}
::v-deep .el-table .cell {
  padding-left: 14px;
}
::v-deep .el-table th > .cell {
  padding-left: 14px;
}
.serch_box {
  padding: 22px 20px 0px 20px;
  border-radius: $radious4px;
  background: $pureWhite;
}
.mediaNameSelect {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  color: #666;
  margin-top: 5px;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
  background: $pureWhite;
  width: 100%;
  p {
    height: 36px;
    padding: 0 15px;
    line-height: 36px;
    margin: 0;
    cursor: pointer;
  }
  p:hover {
    background: #d5e7fc;
  }
}
.warningTitle {
  height: 50px;
  line-height: 50px;
  padding-left: 17px;
  font-size: 14px;
  i {
    color: #FAAD14;
    padding-right: 5px;
  }
}
.warningBtnBox {
  padding-left: 38px;
}
.btnMargin {
  margin-left: $margin8px;
}
.addBtnCenter {
  height: $height40px;
  line-height: $height40px;
  background: #EDF5FF;
  margin-bottom: 22px;
  text-align: center;
  // cursor: pointer;
  color: $functionButtonColor;
}
.msgtitle {
}
// .addBtnCenter:hover{
// 	background: #d5e7fc;
// }
.btn_groups {
  background: $pureWhite;
  padding: $margin16px 0;
  height: 75px;
  padding-left: 14px;
  padding-right: 14px;
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}
.table_box {
  .el-table {
    padding: 0 14px;
  }
  .el-pagination {
    float: right;
    width: 100%;
    padding: 20px 14px;
    text-align: right;
    background: $pureWhite;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 0 0 $radious4px $radious4px;
  }
}
.numberpapers {
  height: auto;
  display: flex;
  margin-bottom: $margin16px;
  // margin: 0 8px 0 8px;
  .box:nth-child(1) {
    .box_top_left {
      background: url(../../assets/images/zonH.png) no-repeat center;
      background-size: 100%;
    }
  }
  .box:nth-child(2) {
    .box_top_left {
      background: url(../../assets/images/weiH.png) no-repeat center;
      background-size: 100%;
    }
  }
  .box:nth-child(3) {
    .box_top_left {
      background: url(../../assets/images/weiboH.png) no-repeat center;
      background-size: 100%;
    }
  }
  .box:nth-child(4) {
    .box_top_left {
      background: url(../../assets/images/douyinH.png) no-repeat center;
      background-size: 100%;
    }
  }
  .box:nth-child(5) {
    .box_top_left {
      background: url(../../assets/images/ieH.png) no-repeat center;
      background-size: 100%;
    }
  }
  .box {
    flex: 1;
    display: flex;
    height: 96px;
    background: $pureWhite url(../../assets/images/mps.png) no-repeat 150px 15px;
    border-radius: $radious6px;
    color: $functionButtonColor;
    margin-right: $margin16px;
    cursor: pointer;
    .box_top_left {
      margin-left: 24px;
      height: 48px;
      width: 48px;
      color: $pureWhite;
      margin-top: 24px;
    }
    .box_top_right {
      flex: 1;
      text-align: right;
      padding-right: 24px;
      label {
        width: 100%;
        display: block;
        font-size: 14px;
      }
      span {
        width: 100%;
        display: block;
        font-size: 24px;
        margin: 7px 0 11px 0;
      }
    }
  }
  .active:nth-child(1) {
    .box_top_left {
      background: url(../../assets/images/zon.png) no-repeat center;
      background-size: 100%;
    }
  }
  .active:nth-child(2) {
    .box_top_left {
      background: url(../../assets/images/wei.png) no-repeat center;
      background-size: 100%;
    }
  }
  .active:nth-child(3) {
    .box_top_left {
      background: url(../../assets/images/weibo.png) no-repeat center;
      background-size: 100%;
    }
  }
  .active:nth-child(4) {
    .box_top_left {
      background: url(../../assets/images/douyin.png) no-repeat center;
      background-size: 100%;
    }
  }
  .active:nth-child(5) {
    .box_top_left {
      background: url(../../assets/images/ie.png) no-repeat center;
      background-size: 100%;
    }
  }
  .active {
    color: $pureWhite;
    background: $functionButtonColor url(../../assets/images/map.png) no-repeat center;
    .box_top_left {
      margin-left: 24px;
      height: 48px;
      width: 48px;
      background: $pureWhite;
      color: $functionButtonColor;
      margin-top: 24px;
    }
  }
  .box:last-child {
    margin-right: 0
  }
}
</style>
