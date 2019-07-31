import React from "react";
import Table from "../../../components/table/table.js";
import MsgAlert from "../../../components/msgalert/msgalert.js";
import axios from "axios";
import Api from "../../../api/api.js";
import "../detailArea.scss";

class BackSendFail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            total:"",
            loading:false,
            pageSize:15,
            currentPage:1
        };
        this.turnBack=this.turnBack.bind(this);
        this.onPageChange=this.onPageChange.bind(this);
    }
    componentWillMount(){
        this.getTableData();
        document.title="订单状态回传监控"
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
        axios.get(Api.getBackSendFail,{params:{
            srcSystemDestSystem:detail ? detail.srcDestSystem : undefined,
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
        this.props.history.push("/backMonitor")//返回订单状态回传监控页面
    }
    onPageChange(page){
        this.state.pageSize=page.pageSize;
        this.state.currentPage=page.pageNo;
        this.getTableData()
    }
    render(){
        let {data,total,loading}=this.state,
            column=[
                {title:"序号",colName:"orderNum"},
                {title:"配送单号",colName:"odsDeliveryId"},
                {title:"外部配送单号",colName:"deliveryId"},
                {title:"订单状态",colName:"statusType"},
                {title:"销售渠道",colName:"salesChannel"},
                {title:"发送消息ID",colName:"sendMsgId"},
                {title:"发送目标系统",colName:"destSystem"},
                {title:"接收消息ID",colName:"recvMsgId"},
                {title:"接收消息时间",colName:"recvTime"},
                {title:"消息源系统",colName:"srcSystem"},
                {title:"源系统消息ID",colName:"srcMsgId"},
                {title:"开始时间",colName:"startTime"},
                {title:"数据准备结束时间",colName:"preparedTime"},
                {title:"发送结束时间",colName:"sentTime"},
                {title:"发送状态",colName:"sendStatusStr"},
                {title:"失败次数",colName:"failTimes"},
                {title:"响应时间",colName:"respTime"},
                {title:"响应类型",colName:"respTypeStr"},
            ];
        return(
            <div className="deitalArea">
                <div className="header">
                    <span>订单状态回传监控</span>
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
                                   tableWidthRatio="120%"
                                   pagination={{
                                       total:total,
                                       onPageChange:this.onPageChange
                                   }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BackSendFail