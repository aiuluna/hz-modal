
##modal 模块

###接口
toast,alert,loading,confirm,prompt,tip
###安装
* npm install hz-modal
* 在package.json 中写入依赖
````
 "dependencies": {
      "hz-modal": "https://github.com/aiuluna/hz-modal.git"
  }
````
### 使用
css 手动在scss中引用 @import "~hz-modal/lib/index";
````
import Modal from 'hz-modal';
Modal.toast('xxxx');
Modal.toast(error:xxxxx) error失败 warn提示 success成功
Modal.alert('a',function(){
})
const modal = Modal.loading();
Modal.closeModal(modal);
````
