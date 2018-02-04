# modal 模块

### 接口
toast,alert,loading,confirm,prompt,tip

### 安装
* npm install hz-modal
* 在package.json 中写入依赖
````
 "dependencies": {
      "hz-modal": "https://github.com/aiuluna/hz-modal.git"
  }
````
### 使用
css 手动在css中引用 @import "~hz-modal/lib/index.css";
````
import Modal from 'hz-modal';
````
#### alert
````
Modal.alert('xxx',function(){
    //确定后执行的方法, xxx必须为string
})
````
#### toast
````
Modal.toast('xxxx');
Modal.toast(error:'xxxx') error失败 warn提示 success成功
````
#### tip
````
const modal = Modal.tip('xxx');
Modal.closeModal(modal);
````
#### loading
````
const modal = Modal.loading();
Modal.closeModal(modal);
````
