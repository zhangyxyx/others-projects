import React from "react";
import Table from "../../../components/table/table.js";
import MsgAlert from "../../../components/msgalert/msgalert.js";
import axios from "axios";
import Api from "../../../api/api.js";
import Dialog from "../../../components/dialog/diaolog.js";
import {formatXml} from "../../../components/util/util.js";
import "../detailArea.scss";


class Opertate extends React.Component{
    constructor(props){
        super(props);
        this.viewMsg=this.viewMsg.bind(this);
    }
    viewMsg(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="viewMsgArea">
                <li className="viewMsgOption" onClick={this.viewMsg}>查看</li>
            </ul>
        )
    }
}

class HandleFail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShowDialog:false,
            dialogMsg:"",
            data:[],
            total:"",
            loading:false,
            pageSize:15,
            currentPage:1
        };
        this.turnBack=this.turnBack.bind(this);
        this.onPageChange=this.onPageChange.bind(this);
        this.onCellClick=this.onCellClick.bind(this);
        this.onCellFailMsgClick = this.onCellFailMsgClick.bind(this);
    }
    componentWillMount(){
        this.getTableData();
        document.title="订单分发监控"
    }
    alertMsg(msg){
        MsgAlert.showMsg({
            msg:msg,
            timeout:20,
            fade:true
        })
    }
    getTableData(){
        let {detail}=this.props.location.state ? this.props.location.state : {detail:undefined},
            {currentPage,pageSize}=this.state;
        this.setState({
            loading:true,
            pageNum:1
        });
        axios.get(Api.getHandleFail,{params:{
            srcSystem:detail ? detail.srcSystem : undefined,
            salesChannel:detail ? detail.SalesChannel : undefined,
            currentPage,
            pageSize
        }
        }).then((res)=>{
            this.setState({
                data:res.data.data===null ? [] : res.data.data,
                total:res.data.totalCount ===null ? 0 : res.data.totalCount,
                loading:false
            });
        }).catch((res)=>{
            this.setState({loading:false});
            this.alertMsg(res.message)
        })
    }
    turnBack(){
        this.props.history.push("/issueMonitor")//返回订单分发监控页面
    }
    onPageChange(page){
        this.state.pageSize=page.pageSize;
        this.state.currentPage=page.pageNo;
        this.getTableData()
    }
    onCellClick(data){
        let buildMsg=data.msg,msg;
        try {
            msg=JSON.stringify(JSON.parse(buildMsg),null,2)
        }catch (e){
            if(!buildMsg){
                msg="";
            }else {
                String.prototype.removeLineEnd = function() {
                    return this.replace(/(<.+?\s+?)(?:\n\s*?(.+?=".*?"))/g, '$1 $2')
                };
                msg=formatXml(buildMsg);
            }
        }
        this.setState({
            isShowDialog:true,
            dialogMsg:(msg && msg !=  "null") ? msg : ""
        });
    }
    onCellFailMsgClick(data){
        let buildMsg=data.failMsg,msg;
        try {
            msg=JSON.stringify(JSON.parse(buildMsg),null,2)
        }catch (e){
            if(!buildMsg){
                msg="";
            }else {
                String.prototype.removeLineEnd = function() {
                    return this.replace(/(<.+?\s+?)(?:\n\s*?(.+?=".*?"))/g, '$1 $2')
                };
                msg=formatXml(buildMsg);
            }
        }
        this.setState({
            isShowDialog:true,
            dialogMsg:(msg && msg !=  "null") ? msg : ""
        });
    }

    render(){
        let {data,total,loading,isShowDialog,dialogMsg}=this.state,
            column=[
                {title:"序号",colName:"orderNum"},
                {title:"配送单号",colName:"odsDeliveryId"},
                {title:"外部主订单号",colName:"mainOrderId"},
                {title:"外部配送单号",colName:"deliveryId"},
                {title:"原外部配送单号",colName:"originalDeliveryId"},
                {title:"销售渠道",colName:"salesChannel"},
                {title:"接收消息ID",colName:"recvMsgId"},
                {title:"接口号",colName:"interfaceId"},
                {title:"接口描述",colName:"interfaceIdDesc"},
                {title:"消息源系统",colName:"srcSystem"},
                {title:"源系统消息ID",colName:"srcMsgId"},
                {title:"源系统消息时间",colName:"srcTime"},
                {title:"消息接收时间",colName:"recvTime"},
                {title:"事件代码",colName:"eventCode"},
                {title:"处理状态",colName:"procStatusStr"},
                {title:"查看报文",colName:"operate",width:"80px",cell:{Opertate},onCellEvent:this.onCellClick},
                {title:"失败消息",colName:"operate",width:"80px",cell:{Opertate},onCellEvent:this.onCellFailMsgClick},
            ];
        return(
            <div className="deitalArea">
                <div className="header">
                    <span>订单分发监控</span>
                </div>
                <div className="condition">
                    <div className="header">
                        <span>>当天处理失败信息量详情</span>
                    </div>
                    <div className="section">
                        <div className="btnGroup">
                            <button className="reload" onClick={this.turnBack}>返回</button>
                        </div>
                        <div className="tableArea">
                            <Table data={data}
                                   column={column}
                                   loading={loading}
                                   hasBoder={true}
                                   tableWidthRatio="120%"
                                   pagination={{
                                       total:total,
                                       onPageChange:this.onPageChange
                                   }}
                            />
                        </div>
                    </div>
                </div>
                {
                    isShowDialog ?
                        <Dialog
                            title="查看报文"
                            onConfirm={()=>{this.setState({isShowDialog:false})}}
                            onClose={()=>{this.setState({isShowDialog:false})}}
                        >
                            <pre style={{textAlign:"left"}}><code>{dialogMsg}</code></pre>
                        </Dialog>:null
                }
            </div>
        )
    }
}

export default HandleFail