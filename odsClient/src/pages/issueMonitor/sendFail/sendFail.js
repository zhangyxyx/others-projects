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

class SendFail extends React.Component{
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
        axios.get(Api.sendFail,{params:{
            // salesChannel:detail ? detail.SalesChannel : undefined,
            destSystem:detail ? detail.destSystem : undefined,
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
                {title:"配送单号",colName:"deliveryId"},
                {title:"发送失败ID",colName:"odsDeliveryId"},
                {title:"发送消息ID",colName:"sendMsgId"},
                {title:"消息类型",colName:"orderTypeStr"},
                {title:"是准备数据失败",colName:"sendStatusStr"},
                {title:"消息源系统",colName:"srcSystem"},
                {title:"发送目标系统",colName:"destSystem"},
                {title:"开始时间",colName:"startTime"},
                {title:"结束时间",colName:"preparedTime"},
                {title:"失败消息",colName:"operate",width:"80px",cell:{Opertate},onCellEvent:this.onCellClick},
            ];
        return(
            <div className="deitalArea">
                <div className="header">
                    <span>订单分发监控</span>
                </div>
                <div className="condition">
                    <div className="header">
                        <span>>发送失败量详情</span>
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
                            title="查看失败消息"
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

export default SendFail