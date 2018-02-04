import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../src/index'
import './index.scss';

class Demo extends React.Component {

    alert() {
        Modal.alert("alert")
    }

    loading() {
        const modal = Modal.loading()
        setTimeout(()=> {
            Modal.closeModal(modal)
        }, 3000)
    }

    toast() {
        Modal.toast("toast")
    }

    tip() {
        const modal = Modal.tip("tip")
        setTimeout(()=> {
           Modal.closeModal(modal)
        }, 3000)
    }

    render() {
        return <div className="demo">
            <div onClick={this.alert.bind(this)}>alert</div>
            <div onClick={this.loading.bind(this)}>loading</div>
            <div onClick={this.toast.bind(this)}>toast</div>
            <div onClick={this.tip.bind(this)}>tip</div>
        </div>
    }
}

ReactDOM.render(<Demo/>, document.getElementById('container'));
