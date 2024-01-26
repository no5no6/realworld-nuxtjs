# standard 编码风格

## eslint 配置
+ 安装依赖模块。
    - `yarn add eslint --dev` 。 
    - `yarn add babel-eslint --dev` 。 
    - `yarn add standard --dev` 。
    - `yarn add eslint-config-standard --dev`。
    - `yarn add eslint-config-vue-standard --dev`。 （可选。用于 vue 文件校验）
+ 创建 `.eslintrc.js` 文件。
    ```json
      module.exports = {
        "root": true,  // 限制 eslint 查找配置文件，加上此选项， eslint 一旦找到 root 为 true 的配置文件，便会停止继续寻找
        "env": {
          "node": true  // 运行环境。对应环境枚举配置 https://eslint.org/docs/user-guide/configuring#specifying-environments
        },
        "globals": {
          "echarts": true // 全局变量
        },
        // 继承的风格，继承一些共享配置
        "extends": [
          "plugin:vue/essential",
          "standard"
        ], 
        "ignorePatterns": ["node_modules/**", "dist/**"], // 需排除的文件
        // 规则
        "rules": {
          "no-console": "off",
          "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
          "no-control-regex": "off",
          "no-undef": "off",
        },
        // 语法解析
        "parserOptions": {
          "parser": "babel-eslint"
        }
      }
    ```
    > 可使用 `yarn eslint --init` 初始化此文件, 在此基础修改。  
    > 代码如果想跳过 `eslint` 的检查，可在该行代码后增加魔法注释，如：`// eslint-disable-line` 。

## VS Code 配置
+ VS Code 安装 插件。
  - `ESlint` 检查工具。
  - `JavaScript standardjs styled snippets` standard 风格代码补全（可选）。  

  > 代码补全也可选择安装 vue 、react 相关插件。

+ 修改 VS Code `settings.json` 配置文件。
  ```json
    {
      "eslint.autoFixOnSave": true,
      "eslint.validate": [
          "javascript",  //  用eslint的规则检测js文件
          {
              "language": "vue",   // 检测vue文件
              "autoFix": true   //  为vue文件开启保存自动修复的功能
          },
          {
              "language": "javascriptreact", 
              "autoFix": true
          },
          {
              "language": "html",
              "autoFix": true
          },
      ],
      "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
      }
    }
  ```
  > 借助 `.eslintrc.js` 文件做 `vscode` 验证。

## 执行 `git commit` 命令时，使用 `lint` 检查 `Standard` 规范的配置。
+ 配置 Git Hook 保证项目 `git commit` 执行 `lint` 检查。
  - 安装依赖模块
    + `yarn add husky --dev` 。
    + `yarn add lint-staged --dev` 。
  - 创建 `.huskyrc` 文件。
    ```json
      {
        "hooks": {
          "pre-commit": "lint-staged"
        }
      }
    ```
    > 如果想保留手动 lint 检查，可以将 `pre-commit` 的值配置为 `package.json` 中 `script` 对应的命令。如： `npm run precommit-lint` 。
  - `package.json` 中增加 `lint-staged` 配置。
    ```json
      "lint-staged": {
        "src/**/*.{js,vue}": [
          "yarn lint",
          "git add"
        ]
      }, 
    ```
    > 执行 `lint` 命令的时候，注意使用的工具是否安装，可以使用 `vue-cli-service lint`、 `npm lint` 等等。


  