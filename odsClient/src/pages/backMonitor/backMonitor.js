import React from "react";
import Table from "../../components/table/table.js";
import MsgAlert from "../../components/msgalert/msgalert.js";
import Api from "../../api/api.js";
import axios from "axios";
import "./backMonitor.scss";

class BackMonitor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            resData:[],
            resLoading:false,
            reqData:[],
            reqLoading:false,
        };
        this.alertMsg=this.alertMsg.bind(this);
        this.getRecvDeliver=this.getRecvDeliver.bind(this);
        this.getSendDeliver=this.getSendDeliver.bind(this);
        this.handFailNumClick=this.handFailNumClick.bind(this);
        this.sendFailNumClick=this.sendFailNumClick.bind(this);
    }
    alertMsg(msg){
        MsgAlert.showMsg({
            msg:msg,
            timeout:20,
            fade:true
        })
    }
    getRecvDeliver(){//订单状态回传接收监控
        this.setState({
            resLoading:true
        });
        axios.post(Api.getRecvStatus,{}).then((res)=>{
            this.setState({
                resData:res.data===null ? [] : res.data,
                resLoading:false
            });
        }).catch((res)=>{
            this.setState({resLoading:false});
            this.alertMsg(res.message)
        })
    }
    getSendDeliver(){//订单状态回传发送监控
        this.setState({
            reqLoading:true
        });
        axios.post(Api.getSendStatus,{}).then((res)=>{
            this.setState({
                reqData:res.data===null ? [] : res.data,
                reqLoading:false
            });
        }).catch((res)=>{
            this.setState({reqLoading:false});
            this.alertMsg(res.message)
        })
    }
    componentWillMount(){
        document.title="订单状态回传监控";
        this.getRecvDeliver();
        this.getSendDeliver();
    }
    handFailNumClick(detail) {//处理失败信息量跳转详情
        this.props.history.push({
            pathname: "/backMonitor/backHandleFail",
            state: {detail}
        })
    }
    sendFailNumClick(detail){//发送失败量跳转详情
        this.props.history.push({
            pathname: "/backMonitor/backSendFail",
            state:{detail}
        })
    }
    render(){
        let {resData,resLoading,reqData,reqLoading}=this.state,
            resColumn=[
                {title:"序号",colName:"orderNum"},
                {title:"源系统",colName:"srcSystem"},
                {title:"状态类型",colName:"statusType"},
                {title:"当天处理成功消息量",colName:"recvSuccessNum"},
                {title:"处理失败消息量",colName:"recvFailNum",className:"failNum",onClick:this.handFailNumClick},
            ],
            reqColumn=[
                {title:"序号",colName:"orderNum"},
                {title:"源系统-目标系统",colName:"srcDestSystem"},
                {title:"发送失败量",colName:"sendFailNum",className:"sendFailNum",onClick:this.sendFailNumClick},
                {title:"本日发送成功量",colName:"sendSuccessNum"}
            ];
        return(
            <div className="backMonitor">
                <div className="header">
                    <span>订单状态回传监控</span>
                </div>
                <div className="condition">
                    <div className="header">
                        <span>>接收监控</span>
                    </div>
                    <div className="section">
                        <div className="btnGroup">
                            <button className="reload" onClick={this.getRecvDeliver}>刷新</button>
                        </div>
                        <div className="tableArea">
                            <Table data={resData}
                                   column={resColumn}
                                   loading={resLoading}
                                   hasBoder={true}
                                   pagination={null}
                            />
                        </div>
                    </div>
                </div>
                <div className="condition">
                    <div className="header">
                        <span>>发送监控</span>
                    </div>
                    <div className="section">
                        <div className="btnGroup">
                            <button className="reload" onClick={this.getSendDeliver}>刷新</button>
                        </div>
                        <div className="tableArea">
                            <Table data={reqData}
                                   column={reqColumn}
                                   loading={reqLoading}
                                   hasBoder={true}
                                   pagination={null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BackMonitor