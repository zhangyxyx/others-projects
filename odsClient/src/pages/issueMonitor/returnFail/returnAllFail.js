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

class ReturnAllFail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShowDialog:false,
            dialogTitle:"",
            dialogMsg:"",
            data:[],
            total:"",
            loading:false,
            pageSize:15,
            currentPage:1
        };
        this.turnBack=this.turnBack.bind(this);
        this.onPageChange=this.onPageChange.bind(this);
        this.onReqGramClick=this.onReqGramClick.bind(this);
        this.onRespGramClick=this.onRespGramClick.bind(this);
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
        axios.get(Api.returnAllFail,{params:{
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
    onReqGramClick(data){
        let buildMsg=data.reqMsg,msg;
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
            dialogTitle:"查看请求报文",
            dialogMsg:(msg && msg !=  "null") ? msg : ""
        });
    }
    onRespGramClick(data){
        let buildMsg=data.respMsg,msg;
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
            dialogTitle:"查看响应报文",
            dialogMsg:(msg && msg !=  "null") ? msg : ""
        });
    }
    render(){
        let {data,total,loading,isShowDialog,dialogMsg,dialogTitle}=this.state,
            column=[
                {title:"序号",colName:"orderNum"},
                {title:"配送单号",colName:"odsDeliveryId"},
                {title:"发送消息ID",colName:"sendMsgId"},
                {title:"接口号",colName:"interfaceId"},
                {title:"接口描述",colName:"interfaceIdDesc"},
                {title:"发送目标系统",colName:"destSystem"},
                {title:"发送结束时间",colName:"sentTime"},
                {title:"请求报文",colName:"operate",width:"80px",cell:{Opertate},onCellEvent:this.onReqGramClick},
                {title:"响应报文",colName:"operate",width:"80px",cell:{Opertate},onCellEvent:this.onRespGramClick},
            ];
        return(
            <div className="deitalArea">
                <div className="header">
                    <span>订单分发监控</span>
                </div>
                <div className="condition">
                    <div className="header">
                        <span>>返回失败量详情</span>
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
                            title={dialogTitle}
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

export default ReturnAllFail