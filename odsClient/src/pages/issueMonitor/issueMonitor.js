import React from "react";
import Table from "../../components/table/table.js";
import MsgAlert from "../../components/msgalert/msgalert.js";
import Api from "../../api/api.js";
import axios from "axios";
import "./issueMonitor.scss";

class IssueMonitor extends React.Component{
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
        this.failNumClick=this.failNumClick.bind(this);
        this.getDataFailNumClick=this.getDataFailNumClick.bind(this);
        this.sendFailNumClick=this.sendFailNumClick.bind(this);
        this.returnFailNumClick=this.returnFailNumClick.bind(this);
        this.sendNoReturnClick=this.sendNoReturnClick.bind(this);

        this.returnFailAllNumClick=this.returnFailAllNumClick.bind(this);
        this.sendSuccessAllNumClick=this.sendSuccessAllNumClick.bind(this);
    }
    alertMsg(msg){
        MsgAlert.showMsg({
            msg:msg,
            timeout:20,
            fade:true
        })
    }
    getRecvDeliver(){//订单分发接收监控
        this.setState({
            resLoading:true
        });
        axios.post(Api.getRecvDeliver,{}).then((res)=>{
            this.setState({
                resData:res.data===null ? [] : res.data,
                resLoading:false
            });
        }).catch((res)=>{
            this.setState({resLoading:false});
            this.alertMsg(res.message)
        })
    }
    getSendDeliver(){//订单分发发送监控
        this.setState({
            reqLoading:true
        });
        axios.post(Api.getSendDeliver,{}).then((res)=>{
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
        document.title="订单分发监控";
        this.getRecvDeliver();
        this.getSendDeliver();
    }
    returnFailAllNumClick(detail) {//返回失败量跳转详情
        this.props.history.push({
            pathname: "/issueMonitor/returnAllFail",
            state:{detail}
        })
    }
    sendSuccessAllNumClick(detail) {//发送未返回量跳转详情
        this.props.history.push({
            pathname: "/issueMonitor/sendAllSuccess",
            state:{detail}
        })
    }
    failNumClick(detail){//当天处理失败信息量跳转详情
        this.props.history.push({
            pathname: "/issueMonitor/handleFail",
            state:{detail}
        })
    }
    getDataFailNumClick(detail){//获取失败量跳转详情
        this.props.history.push({
            pathname: "/issueMonitor/getFail",
            state:{detail}
        })
    }
    sendFailNumClick(detail){//获取发送失败量跳转详情
        this.props.history.push({
            pathname: "/issueMonitor/sendFail",
            state:{detail}
        })
    }
    returnFailNumClick(detail){//返回本日返回失败量跳转详情
        this.props.history.push({
            pathname: "/issueMonitor/returnFail",
            state:{detail}
        })
    }
    sendNoReturnClick(detail){//返回本日发送未返量跳转详情
        this.props.history.push({
            pathname: "/issueMonitor/sendNoReturn",
            state:{detail}
        })
    }
    render(){
        let {resData,resLoading,reqData,reqLoading}=this.state,
        resColumn=[
            {title:"序号",colName:"orderNum"},
            // {title:"源系统",colName:"srcSystem"},
            {title:"渠道",colName:"SalesChannel"},
            {title:"当天处理成功消息量",colName:"successNum"},
            {title:"处理失败消息量",colName:"failNum",className:"failNum",onClick:this.failNumClick},
            {title:"获取失败量",colName:"getDataFailNum",className:"getDataFailNum",onClick:this.getDataFailNumClick}
        ],
        reqColumn=[
            {title:"序号",colName:"orderNum"},
            {title:"目标系统",colName:"destSystem"},
            {title:"发送失败量",colName:"sendFailNum",className:"sendFailNum",onClick:this.sendFailNumClick},
            {title:"本日发送未返量",colName:"sendSuccessNum",className:"sendNoReturn",onClick:this.sendNoReturnClick},
            {title:"发送未返回量",colName:"sendSuccessAllNum",className:"returnFailAllNum",onClick:this.sendSuccessAllNumClick},
            {title:"本日返回成功量",colName:"returnSuccessNum"},
            {title:"本日返回失败量",colName:"returnFailNum",className:"returnFailNum",onClick:this.returnFailNumClick},
            {title:"返回失败量",colName:"returnFailAllNum",className:"returnFailAllNum",onClick:this.returnFailAllNumClick}
        ];
        return(
            <div className="issueMonitor">
                <div className="header">
                    <span>订单分发监控</span>
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

export default IssueMonitor