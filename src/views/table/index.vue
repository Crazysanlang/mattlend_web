<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="6天apy" align="center">
        <template slot-scope="scope">
          {{ scope.row.apy6 }}
        </template>
      </el-table-column>
      <el-table-column label="10天apy" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.apy10 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.address || '暂无' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="设置" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item label="apy6" prop="apy6" :label-width="formLabelWidth">
          <el-input v-model="form.apy6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="apy10" prop="apy10" :label-width="formLabelWidth">
          <el-input v-model="form.apy10" autocomplete="off" />
        </el-form-item>
        <el-form-item label="address" :label-width="formLabelWidth">
          <el-input v-model="form.address" :disabled="true" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, updateCoin } from '@/api/table'
export default {
  data() {
    return {
      dialogFormVisible: false,
      list: null,
      listLoading: true,
      form: {
        name: '',
        apy6: '',
        apy10: '',
        address: ''
      },
      rules: {
        apy6: [
          { required: true, message: '请设置apy6', trigger: 'blur' }
        ],
        apy10: [
          { required: true, message: '请设置apy6', trigger: 'blur' }
        ]

      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleEdit(row) {
      console.log(row)
      this.dialogFormVisible = true
      console.log(this.form)
      this.form = Object.assign({}, this.form, row)
    },
    handleConfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = { ...this.form }
          updateCoin(params).then((res) => {
            if (res.code == 200) {
              this.$message.success('更新成功')
              this.dialogFormVisible = false
              this.fetchData()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
