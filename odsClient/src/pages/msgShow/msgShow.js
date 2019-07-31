import React from "react";
import DatePicker from "../../components/datepicker/datepicker.js";
import Table from "../../components/table/table.js"
import Api from "../../api/api.js";
import Select from "../../components/select/select.js";
import Dialog from "../../components/dialog/diaolog.js";
import MsgAlert from "../../components/msgalert/msgalert.js";
import {formatXml} from "../../components/util/util.js";
import moment from "moment";
import "./msgShow.scss";
import axios from "axios";


class Opertate extends React.Component{
    constructor(props){
        super(props);
        this.actionEdit=this.actionEdit.bind(this);
    }
    actionEdit(type){
        this.props.onCellEvent(type)
    }
    render(){
        return(
            <ul className="repushArea">
                <li className="repushOption repush" onClick={()=>{this.actionEdit("repush")}}>重推</li>
                <li className="repushOption" onClick={()=>{this.actionEdit("backup")}}>备份</li>
            </ul>
        )
    }
}

class RequestOpertate extends React.Component{
    constructor(props){
        super(props);
        this.requestData=this.requestData.bind(this);
    }
    requestData(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="repushArea">
                <li className="repushOption" onClick={this.requestData}>请求数据</li>
            </ul>
        )
    }
}

class ResponseOpertate extends React.Component{
    constructor(props){
        super(props);
        this.responseData=this.responseData.bind(this);
    }
    responseData(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="repushArea">
                <li className="repushOption" onClick={this.responseData}>返回数据</li>
            </ul>
        )
    }
}


class MsgShow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dialogTitle:"",
            dialogMsg:"",
            isShowDialog:false,
            baseDataDialog:false,
            resetStatus:false,
            data:[],
            total:"",
            loading:false,
            deliveryId:"",//配送单号
            srcSystemList:[{name:"",value:""}],
            destSystemList:[{name:"全部",value:"全部"}],
            interfaceIdList:[{name:"全部",value:"全部"}],
            selectArr:[],
            pageSize:15,
            pageNum:1,
            srcSystem:undefined,//源系统
            destSystem:undefined,//目标系统
            interfaceId:undefined,//接口号
            documentNo:undefined,//单据号
            sendStatus:undefined,//状态
            executor:undefined,//执行人
            executeTimeStart:undefined,//开始时间
            executeTimeEnd:undefined,//截止时间

        };
        this.onDateChange=this.onDateChange.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.onPageChange=this.onPageChange.bind(this);
        this.getSelectOption=this.getSelectOption.bind(this);
        this.checkedArrCall=this.checkedArrCall.bind(this);
        this.onCellClick=this.onCellClick.bind(this);
        this.alertMsg=this.alertMsg.bind(this);
        this.batchPush=this.batchPush.bind(this);
        this.resetOption=this.resetOption.bind(this);
        this.requestOpertate=this.requestOpertate.bind(this);
        this.responseOpertate=this.responseOpertate.bind(this);
        this.getBaseDataQuery=this.getBaseDataQuery.bind(this);
    }
    getTableData(notReset){
        let {srcSystem,destSystem,interfaceId,documentNo,sendStatus,executor,executeTimeStart,executeTimeEnd,pageSize,pageNum}=this.state;
        if(executeTimeEnd && executeTimeStart && moment(executeTimeEnd).isBefore(executeTimeStart)){
            this.alertMsg("结束日期不得大于开始日期");
            return
        }
        if(!interfaceId && !documentNo){
            this.alertMsg("传入的【单据号和接口号】不能同时为空!");
            return
        }
        if(!notReset){
            this.refs.tablePagination && this.refs.tablePagination.reset();
        }
        this.setState({
            loading:true,
            pageNum:1
        });
        axios.post(Api.queryMsgShowData,{pageSize,pageNum,srcSystem,destSystem,interfaceId,documentNo,sendStatus,executor,
            executeTimeStart:executeTimeStart ? `${executeTimeStart} 00:00:00` : executeTimeStart,
            executeTimeEnd:executeTimeEnd ? `${executeTimeEnd} 23:59:59` : executeTimeEnd
        }).then((res)=>{
                this.setState({
                    data:res.data.data===null ? [] : res.data.data.data,
                    total:res.data.data===null ? 0 : res.data.data.totalCount,
                    loading:false
                });
        }).catch((res)=>{
            this.setState({loading:false});
            this.alertMsg(res.message)
        })
    }
    componentWillMount(){
        this.getSelectOption();
        document.title="消息查询展示"
    }
    resetOption(){
        this.setState({
            resetStatus:true,
            srcSystemList:[{name:"",value:""}],
            destSystemList:[{name:"全部",value:"全部"}],
            interfaceIdList:[{name:"全部",value:"全部"}],
            selectArr:[],
            data:[],
            total:"",
            pageSize:15,
            pageNum:1,
            srcSystem:undefined,//源系统
            destSystem:undefined,//目标系统
            interfaceId:undefined,//接口号
            documentNo:undefined,//单据号
            sendStatus:undefined,//状态
            executor:undefined,//执行人
            executeTimeStart:undefined,//开始时间
            executeTimeEnd:undefined,//截止时间
        });
        setTimeout(()=>{
            this.setState({resetStatus:false})
        },0);
        this.getSelectOption()
    }
    alertMsg(msg){
        MsgAlert.showMsg({
            msg:msg,
            timeout:20,
            fade:true
        })
    }
    onDateChange(date,field){
        this.setState({
            [field]:date
        })
    }
    onSelectChange(value,field){
        console.log(field)
        this.setState({
            [field]:value.name==="全部" ? undefined : value.name
        })
    }
    getSelectOption(){
        axios.get(Api.getSystemsList).then((res)=>{//获取系统
            console.log(res.data)
            let buildList=res.data.data.map((item,i)=>{
                return {name:item,value:item}
            });
            this.setState({
                destSystemList:[{name:"全部",value:"全部"},...buildList],
                srcSystemList:[...buildList],
                srcSystem:buildList[0].name
            });
        });
        axios.get(Api.getInterfacesList).then((res)=>{//获取接口号
            let buildList=res.data.data.map((item,i)=>{
                return {name:item,value:item}
            });
            this.setState({
                interfaceIdList:[{name:"全部",value:"全部"},...buildList],
            });
        });
    }
    onPageChange(page){
        this.state.pageSize=page.pageSize;
        this.state.pageNum=page.pageNo;
        this.getTableData(true)
    }
    checkedArrCall(selectArr){
        this.state.selectArr=selectArr;
    }
    onCellClick(data,type){
        switch (type){
            case "repush":
                axios.post(Api.pushMsgShowData,{data:[data]}).then((res)=>{
                    res.data.code==="0" ? this.alertMsg("重推成功") : this.alertMsg(res.data.message)
                    }).catch((res)=>{
                        this.alertMsg(res.message)
                    });break;
            case "backup":
                axios.post(Api.backupMsgShowData,{data:[data]}).then((res)=>{
                    res.data.code==="0" ? this.alertMsg("备份成功") :  this.alertMsg(res.data.message)
                }).catch((res)=>{
                    this.alertMsg(res.message)
                });break
        }
    }
    requestOpertate(data){
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
            dialogTitle:"请求数据",
            dialogMsg:(msg && msg !=  "null") ? msg : ""
        });
    }
    responseOpertate(data){
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
            dialogTitle:"返回数据",
            dialogMsg:(msg && msg !=  "null") ? msg : ""
        });
    }
    batchPush(){//批量重推
        let {selectArr}=this.state;
        if(selectArr.length===0){
            this.alertMsg("请勾选要重推的项");
            return
        }
        selectArr.forEach((item)=>{
           item.tdValue = undefined;
        });
        axios.post(Api.pushMsgShowData,{data:selectArr}).then((res)=>{
            this.alertMsg("批量重推成功")
        }).catch((res)=>{
            this.alertMsg(res.message)
        });
    }
    getBaseDataQuery(){
        let {deliveryId}=this.state;
        axios.get(Api.getBaseDataQuery,{params:{deliveryId}}).then((res)=>{
            console.log(res,'res')
            // this.setState({
            //     data:res.data.data===null ? [] : res.data.data.data,
            //     total:res.data.data===null ? 0 : res.data.data.totalCount,
            //     loading:false
            // });
        }).catch((res)=>{
            // this.setState({loading:false});
            // this.alertMsg(res.message)
        })
    }
    render(){
        let {deliveryId,baseDataDialog,data,loading,total,srcSystemList,dialogTitle,dialogMsg,destSystemList,interfaceIdList,resetStatus,documentNo,executor,executeTimeStart,executeTimeEnd,isShowDialog}=this.state;
        let column=[
            {title:"checkBox",colName:"checkBox",width:"60px"},
            {title:"序号",colName:"orderNum",width:"60px"},
            {title:"源系统",colName:"srcSystem"},
            {title:"目标系统",colName:"destSystem"},
            {title:"接口号",colName:"interfaceId"},
            {title:"接口号描述",colName:"interfaceIdDesc"},
            {title:"单据号",colName:"deliveryId"},
            {title:"订单状态类型",colName:"orderType"},
            {title:"请求数据",colName:"operate",width:"100px",cell:{RequestOpertate},onCellEvent:this.requestOpertate},
            {title:"返回数据",colName:"operate",width:"100px",cell:{ResponseOpertate},onCellEvent:this.responseOpertate},
            {title:"状态",colName:"status",width:"100px"},
            {title:"失败描述",colName:"statusDesc"},
            {title:"执行时间",colName:"sentTime"},
            {title:"执行人",colName:"executor"},
            {title:"操作",colName:"operate",width:"120px",cell:{Opertate},onCellEvent:this.onCellClick}
        ];
        return(
            <div className="msgShow">
                <div className="condition">
                    <div className="header">
                        <span>消息查询展示</span>
                    </div>
                    <ul>
                        <li>
                            <label>源系统</label>
                            <Select optionGroup={srcSystemList}
                                    isDisable={srcSystemList.length<2}
                                    sendField="srcSystem"
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>目标系统</label>
                            <Select optionGroup={destSystemList}
                                    sendField="destSystem"
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>接口号</label>
                            <Select optionGroup={interfaceIdList}
                                    sendField="interfaceId"
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>单据号</label>
                            <input value={documentNo}
                                   onChange={(e)=>{this.setState({documentNo:e.target.value})}}
                            />
                        </li>
                        <li>
                            <label>状态</label>
                            <Select optionGroup={
                                [
                                    {name:"全部",value:"全部"},{name:"成功",value:"成功"},{name:"失败",value:"失败"}
                                ]
                            }
                                    sendField="sendStatus"
                                    resetOption={resetStatus}
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>执行人</label>
                            <input value={executor}
                                   onChange={(e)=>{this.setState({executor:e.target.value})}}
                            />
                        </li>
                        <li>
                            <label>执行时间</label>
                            <DatePicker
                                placeholder="开始日期"
                                onDateChange={this.onDateChange}
                                sendField="executeTimeStart"
                                defaultValue={executeTimeStart}
                            />
                            <span className="cutOff">至</span>
                            <DatePicker onDateChange={this.onDateChange}
                                        placeholder="结束日期"
                                        sendField="executeTimeEnd"
                                        defaultValue={executeTimeEnd}
                            />
                        </li>
                    </ul>
                    <div className="btnGroup">
                        {/*<button className="queryBtn" onClick={()=>{this.setState({baseDataDialog:true})}}>基础服务数据查询</button>*/}
                        <button className="queryBtn" onClick={this.batchPush}>批量重推</button>
                        <button className="queryBtn" onClick={()=>{this.getTableData(false)}}>消息查询</button>
                        <button className="resetBtn" onClick={this.resetOption}>重置</button>
                    </div>
                </div>
                <div className="tableArea">
                    <Table data={data}
                           column={column}
                           loading={loading}
                           hasBoder={true}
                           ref="tablePagination"
                           onSelect={this.checkedArrCall}//当有复选框的时候配置选择回调
                           pagination={{
                               total:total,
                               onPageChange:this.onPageChange
                           }}
                           tableWidthRatio="120%"
                    />
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
                {
                    baseDataDialog ?
                        <Dialog
                            title="基础服务数据查询"
                            onConfirm={()=>{this.setState({baseDataDialog:false})}}
                            onClose={()=>{this.setState({baseDataDialog:false})}}
                        >
                            <div className="baseDataArea">
                                <div className="condition">
                                    <input value={deliveryId}
                                           onChange={(e)=>{this.setState({deliveryId:e.target.value})}}
                                    />
                                    <button className="queryBtn" onClick={this.getBaseDataQuery}>查询</button>
                                </div>
                            </div>
                        </Dialog>:null
                }
            </div>
        )
    }
}


export default MsgShow