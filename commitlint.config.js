module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      //  修复
        'style',    // 格式修改（不影响代码运行的变动）
        'refactor', // 重构（既不是增加feature）,也不是修复bug
        'pref',     // 性能优化
        'test',     // 增加测试
        'docs',     // 文档变更
        'chore',    // 构建过程或辅助工具的变动
        'revert',   // 回退
        'build',    // 打包
        'merge',    // 代码合并
        'wip',      // 开发中
      ],
    ],
    // subject 大小写不做校验
    'subject-case': [0],
  },
};
