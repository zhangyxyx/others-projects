import React from 'react';
import PropTypes from 'prop-types';
import classname from "classnames";
import "./dialog.scss";
class Dialog extends React.Component {
    static propTypes = {
        title:PropTypes.string,//弹框标题
        width: PropTypes.string,//弹框宽度
        onConfirm:PropTypes.func,//弹框确认函数
        hasFooter:PropTypes.bool,//弹框是否需要footer
        onClose:PropTypes.func,//弹框关闭函数
        className:PropTypes.string
    };
    static defaultProps ={
        width:"600px",
        title:null,
        hasFooter:true
    };
    constructor(props) {
        super(props);
    }
    render(){
        let {width,title,onConfirm,onClose,hasFooter,className} = this.props;
        return (
            <div className="modal">
                <div className="shadow"/>
                <div className={classname("modalArea",className)} style={{width:width}}>
                    <div className="header">
                        <p>{title}</p>
                        <p className="cancleSign" onClick={onClose}/>
                    </div>
                    <div className="section">
                        {this.props.children}
                    </div>
                    {
                        hasFooter ?
                            <div className="footer">
                                <button className="btn-confirm" onClick={onConfirm}>确定</button>
                                <button className="btn-cancel" onClick={onClose}>取消</button>
                            </div>:null
                    }
                </div>
            </div>
        );
    }
}
export default Dialog;