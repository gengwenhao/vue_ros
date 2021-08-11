<!-- 面板页面 -->
<template>
  <div id="panel">
    <sui-grid :columns="2" divided>
      <!-- 消息发送 -->
      <sui-grid-row>
        <sui-grid-column>
          <sui-segment style="padding: 32px;" class="panel-item lpanel">
            <h2 is="sui-header">消息发送</h2>
            <el-form label-width="100px" size="small">
              <el-form-item label="话题">
                <el-input placeholder="输入ROS话题名称" v-model="form.topicName"/>
              </el-form-item>
              <el-form-item label="消息类型">
                <el-input placeholder="输入消息类型" v-model="form.messageType"/>
              </el-form-item>
              <el-form-item label="消息">
                <el-input type="textarea" placeholder="输入要发送的消息" :rows="10" v-model="form.messageData"/>
              </el-form-item>
              <el-form-item label="备注">
                <el-input placeholder="备注" :rows="10" v-model="form.desc"/>
              </el-form-item>
              <sui-button-group size="small" style="float:right;">
                <sui-button content="保存" @click="handleSaveRosPublish"/>
                <sui-button secondary content="发送" @click="handleRosPublish"/>
              </sui-button-group>
            </el-form>
          </sui-segment>
        </sui-grid-column>
        <!-- 保存的消息 -->
        <sui-grid-column>
          <sui-segment style="padding: 32px;overflow-y: scroll" class="panel-item rpanel">
            <h2 is="sui-header">保存的消息</h2>
            <sui-card>
              <sui-button-group size="small">
                <sui-button content="全部删除" @click="handleClearAll"/>
                <sui-button secondary content="删除选中" @click="handleDeleteSelectedItems"/>
              </sui-button-group>
            </sui-card>
            <el-table :data="publishDataList" @selection-change="handleSelectionChange">
              <el-table-column type="selection"/>
              <el-table-column label="话题名称" align="center" prop="topicName"/>
              <el-table-column label="消息类型" align="center" prop="messageType"/>
              <el-table-column label="消息内容" align="center" prop="messageData"/>
              <el-table-column label="消息内容" align="center">
                <template slot-scope="scope">
                  <sui-button secondary size="small" content="删除" @click="handleDeleteItem(scope.$index)"/>
                </template>
              </el-table-column>
            </el-table>
          </sui-segment>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
import _ from 'lodash'
import {rosPublish} from "@/lib/utils"
import {localRead, localSave} from "@/lib/tools"

export default {
  name: "Panel",
  data() {
    return {
      // 话题表单
      form: {
        topicName: '/turtle1/cmd_vel',
        messageType: 'geometry_msgs/Twist',
        messageData: '{"linear": {"x": 19,"y": 0,"z": 0},"angular": {"x": 0,"y": 0,"z": 4}}'
      },
      // 消息发布列表
      publishDataList: JSON.parse(localRead('publishDataList')) || [],
      // 表格中选中项
      selectionList: []
    }
  },
  watch: {
    publishDataList: {
      handler(val) {
        localSave('publishDataList', JSON.stringify(val))
      },
      deep: true
    }
  },
  methods: {
    // 改变表格选中项
    handleSelectionChange(itemList) {
      this.selectionList = [...itemList]
    },
    // 全部删除
    handleClearAll() {
      this.$confirm('是否删除选中消息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            this.publishDataList = []
          })
    },
    // 删除选中项
    handleDeleteSelectedItems() {
      if (!this.selectionList || this.selectionList.length === 0) {
        return -1
      }

      this.$confirm('是否删除选中消息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            // 查找要删除的项
            let ids = this.selectionList.map(item => item.timeStamp) || []
            for (let i = this.publishDataList.length - 1; i >= 0; i--) {
              if (ids.includes(this.publishDataList[i].timeStamp)) {
                this.publishDataList.splice(i, 1);
              }
            }
          })

    },
    // 删除某一项
    handleDeleteItem(idx) {
      if (idx >= this.publishDataList.length || idx < 0) {
        this.$toast('删除失败!')
        return -1
      }

      this.$confirm('是否删除该条消息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            this.publishDataList.splice(idx, 1)
            this.$toast('删除成功')
          })

    },
    // 保存发布
    handleSaveRosPublish() {
      let form = {...this.form}
      form.timeStamp = new Date().valueOf()
      this.publishDataList.push(form)
    },
    // 发布消息
    handleRosPublish: _.debounce(function () {
      // prepare data
      let form = {
        topicName: '',
        messageType: '',
        messageData: ''
      }
      Object.assign(form, this.form)
      form.messageData = JSON.parse(this.form.messageData) || null

      // publish
      rosPublish(form)
          .catch(err => {
            this.$toast(err.msg)
            if (err.code === 402) {
              this.$router.push({name: 'index'})
            }
          })
    }, 500)
  }
}
</script>

<style scoped lang="scss">
#panel {
  .panel-item {
    height: calc(100vh - 120px);
    overflow-y: auto;
  }
}
</style>