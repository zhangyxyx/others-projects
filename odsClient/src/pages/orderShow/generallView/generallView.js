import React from "react";
import Select from "../../../components/select/select.js";
import Api from "../../../api/api.js";
import axios from "axios";
import MsgAlert from "../../../components/msgalert/msgalert.js";
import Dialog from "../../../components/dialog/diaolog.js";
import Table from "../../../components/table/table.js";
import {formatXml} from "../../../components/util/util.js";
import classname from "classnames";
import "./generallView.scss";

class receGetPandect extends React.Component{
    constructor(props){
        super(props);
        this.onCellClick=this.onCellClick.bind(this);
    }
    onCellClick(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="receGetPandect">
                <li onClick={this.onCellClick}>查看</li>
            </ul>
        )
    }
}

class sendMsg extends React.Component{
    constructor(props){
        super(props);
        this.onCellClick=this.onCellClick.bind(this);
    }
    onCellClick(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="sendMsg">
                <li onClick={this.onCellClick}>查看</li>
            </ul>
        )
    }
}

class respMsg extends React.Component{
    constructor(props){
        super(props);
        this.onCellClick=this.onCellClick.bind(this);
    }
    onCellClick(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="respMsg">
                <li onClick={this.onCellClick}>查看</li>
            </ul>
        )
    }
}

class recSendMsg extends React.Component{
    constructor(props){
        super(props);
        this.onCellClick=this.onCellClick.bind(this);
    }
    onCellClick(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="recSendMsg">
                <li onClick={this.onCellClick}>查看</li>
            </ul>
        )
    }
}

class recRespMsg extends React.Component{
    constructor(props){
        super(props);
        this.onCellClick=this.onCellClick.bind(this);
    }
    onCellClick(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="recRespMsg">
                <li onClick={this.onCellClick}>查看</li>
            </ul>
        )
    }
}

class recAceMsg extends React.Component{
    constructor(props){
        super(props);
        this.onCellClick=this.onCellClick.bind(this);
    }
    onCellClick(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="recAceMsg">
                <li onClick={this.onCellClick}>查看</li>
            </ul>
        )
    }
}

class failMsg extends React.Component{
    constructor(props){
        super(props);
        this.onCellClick=this.onCellClick.bind(this);
    }
    onCellClick(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="failMsg">
                <li onClick={this.onCellClick}>查看</li>
            </ul>
        )
    }
}

class GenerallView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            failMsgDialog:false,
            failMsgData:{
                sendFailId:"",//发送失败ID
                isPrepareFailDesc:"",//失败步骤
                beginTime:"",//开始时间
                endTime:"",//结束时间
                failMsg:""//失败信息
            },
            isShowDialog:false,
            recSendData:[],
            recSendLoading:false,
            dialogMsg:"",
            dialogTitle:"",
            isDisable:this.props.location.state ? this.props.location.state.controlDisable : false,
            deliveryIdDisable:this.props.location.state ? this.props.location.state.controlDisable : false,
            salesChannelList:JSON.parse(sessionStorage.getItem("salesChannelList")),//渠道数组
            salesChannel:this.props.match.params && this.props.match.params.salesChannel ? Number(this.props.match.params.salesChannel) : JSON.parse(sessionStorage.getItem("salesChannelList"))[0].name,//渠道
            deliveryId:this.props.match.params && this.props.match.params.deliveryId ? this.props.match.params.deliveryId==="0" ? "" : this.props.match.params.deliveryId : "",//配送单号
            pandectData:[],
            pandectLoading:false,
            handleOutData:[],
            handleOutLoading:false,
            isShowQuery:(this.props.match.params && this.props.match.params.deliveryId && this.props.match.params.deliveryId==="0") && (this.props.match.params && this.props.match.params.salesChannel && this.props.match.params.salesChannel==="0")
        };
        this.onSelectChange=this.onSelectChange.bind(this);
        this.getPandectData=this.getPandectData.bind(this);
        this.alertMsg=this.alertMsg.bind(this);
        this.resetOption=this.resetOption.bind(this);
        this.onFailMsgClick=this.onFailMsgClick.bind(this);
        this.gethandleOutData=this.gethandleOutData.bind(this);
        this.diaologMsgShow=this.diaologMsgShow.bind(this);
        this.getRecSendData=this.getRecSendData.bind(this);
        this.getTabledata=this.getTabledata.bind(this);
        this.getSalesChannelList=this.getSalesChannelList.bind(this);
        this.repushData=this.repushData.bind(this);
    }
    alertMsg(msg){
        MsgAlert.showMsg({
            msg:msg,
            timeout:20,
            fade:true
        })
    }
    componentWillMount(){
        document.title="配送单分发全景";
        this.getTabledata();
        if(this.state.salesChannelList===null){
            this.getSalesChannelList()
        }
    }
    getSalesChannelList(){
        axios.get(Api.getSalesChannelList).then((res)=>{
            let salesChannelListArr=[];
            let resObj=res.data.data;
            for(let key in resObj){
                salesChannelListArr.push({
                    name:Number(key),
                    value:resObj[key]
                })
            }
            this.setState({salesChannelList:salesChannelListArr});
            sessionStorage.setItem("salesChannelList",JSON.stringify(salesChannelListArr))
        })
    }
    getTabledata(){
        this.getPandectData();
    }
    onSelectChange(value,field){
        this.setState({
            [field]:value.name
        })
    }
    diaologMsgShow(buildMsg,dialogTitle){
        let msg;
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
            dialogTitle,
            isShowDialog:true,
            dialogMsg:(msg && msg !=  "null") ? msg : ""
        });
    }
    onFailMsgClick(data){
        axios.get(Api.getFailMsg,{
            params:{sendMsgId:data.sendMsgId}
        }).then((res)=>{
            let resData=res.data.data;
            this.setState({
                failMsgDialog:true,
                failMsgData:resData
            });
        }).catch((res)=>{
            this.alertMsg(res.message)
        })
    }
    getPandectData(){//配送单总览
        let {salesChannel,deliveryId}=this.state;
        if(!deliveryId){
            this.alertMsg("配送单号不能为空");
            return
        }
        this.setState({
            pandectLoading:true,
        });
        axios.get(Api.getPandectData,{
            params:{salesChannel,deliveryId}
        }).then((res)=>{
            let resData=res.data.data===null ? [] : res.data.data;
            resData.map((item,i)=>{
                item.isDuoJhd=item.isMultiStockio===0 ? "否" : "是";
                item.jhdh=item.isMultiStockio===0 ? item.singleStockioId : "查看"
            });
            this.setState({
                pandectData:resData,
                pandectLoading:false
            });
            if(resData.length>0){
                let odsDeliveryIdsArr=[];
                let recSendParams=[];
                resData.forEach((item,i)=>{
                    odsDeliveryIdsArr.push(item.odsDeliveryId);
                    recSendParams.push({salesChannel:item.salesChannel,deliveryId:item.deliveryId});
                });
                let odsDeliveryIds=odsDeliveryIdsArr.join(",");
                this.gethandleOutData(odsDeliveryIds);
                this.getRecSendData(recSendParams)
            }else {
                this.setStae({
                    recSendData:[],
                    handleOutData:[]
                })
            }
        }).catch((res)=>{
            this.setState({
                pandectLoading:false,
                recSendData:[],
                handleOutData:[]
            });
            this.alertMsg(res.message)
        })
    }
    gethandleOutData(odsDeliveryIds){//配送单分发情况
        this.setState({
            handleOutLoading:true,
        });
        axios.get(Api.gethandleOutData,{
            params:{odsDeliveryIds}
        }).then((res)=>{

            let resData=res.data.data===null ? [] : res.data.data;
            if(resData.length>0){
                resData.map((item,i)=>{
                    return item.isShowRepush=(item.sendStatus===20 || item.sendStatus===30 ||  (item.sendStatus===40 && item.destSystem !== 'SAP' && item.orderType !== 1)) ? "重推" : null
                })
            }
            this.setState({
                handleOutData:resData,
                handleOutLoading:false
            });
        }).catch((res)=>{
            this.setState({handleOutLoading:false});
            this.alertMsg(res.message)
        })
    }
    getRecSendData(recSendParams){//配送单分发和接收
        this.setState({
            recSendLoading:true,
        });
        axios.post(Api.getRecSendData,{
            data:recSendParams
        }).then((res)=>{
            let resData=res.data.data===null ? [] : res.data.data;
            let resBuildData=resData.map((item,i)=>{
               return {...item.sendOrderStatus,...item.recvOrderStatus}
            });
            this.setState({
                recSendData:resBuildData,
                recSendLoading:false
            });
        }).catch((res)=>{
            this.setState({recSendLoading:false});
            this.alertMsg(res.message)
        })
    }
    resetOption(){
        this.setState({
            salesChannelList:[{name:"",value:""}],//渠道数组,
            salesChannel:JSON.parse(sessionStorage.getItem("salesChannelList"))[0].name,//渠道
            deliveryId:"",//配送单号
            recSendData:[],
            pandectData:[],
            handleOutData:[]
        });
        setTimeout(()=>{
            this.setState({salesChannelList:JSON.parse(sessionStorage.getItem("salesChannelList"))})
        },0)
    }
    repushData(data){//重推
        delete(data.tdValue);
        delete(data.isShowRepush);
        axios.post(Api.pushHandleOutData,{
            data:[data]
        }).then((res)=>{
            res.data.code==="0" ? (this.alertMsg("重推成功"),this.getTabledata()) : this.alertMsg("重推失败")
        }).catch((res)=>{
            this.alertMsg(res.message)
        })
    }
    render(){
        let {salesChannelList,deliveryId,pandectData,pandectLoading,isShowDialog,dialogTitle,dialogMsg,
            handleOutData,handleOutLoading,failMsgDialog,failMsgData,salesChannel,
            recSendData,recSendLoading,isDisable,deliveryIdDisable,isShowQuery
        }=this.state;
        const pandectColumn=[
            {title:"序号",colName:"orderNum"},
            {title:"渠道编码",colName:"salesChannel"},
            {title:"配送单号",colName:"deliveryId"},
            {title:"主单号",colName:"mainOrderId"},
            {title:"ODS配送单号",colName:"odsDeliveryId"},
            {title:"订单类型",colName:"orderTypeDesc"},
            {title:"来源系统",colName:"srcSystem"},
            {title:"接收时间",colName:"recvTime"},
            {title:"当前状态",colName:"orderStatusDesc"},
            {title:"状态时间",colName:"lastStatusTime"},
            {title:"销售组织",colName:"salesOrg"},
            {title:"销售门店",colName:"salesShop"},
            {title:"库存类型",colName:"storageTypeDesc"},
            {title:"交货单号",colName:"jhdh",className:"classJhdh",onClick:(data)=>{
                this.props.history.push({
                    pathname:"/order/generallView/multiStockio",
                    state:{data}
                })
            }},
            {title:"安装类型",colName:"installTypeDesc"},
            {title:"仓配退门店",colName:"isDcBackShopDesc"},
            {title:"接收ID",colName:"recvMsgId"},
            {title:"接收报文",colName:"operate",width:"80px",cell:{receGetPandect},onCellEvent:(data)=>{this.diaologMsgShow(data.msg,"查看接收报文")}},
        ];
        const handleOutColumn=[
            {title:"序号",colName:"orderNum"},
            {title:"重推",colName:"isShowRepush",width:"80px",className:"repush",onClick:this.repushData},
            {title:"配送单号",colName:"deliveryId"},
            {title:"ODS配送单号",colName:"odsDeliveryId"},
            {title:"分发ID",colName:"sendMsgId"},
            {title:"源系统",colName:"srcSystem"},
            {title:"目标系统代码",colName:"destSystem"},
            {title:"分发状态",colName:"sendStatusStr"},
            {title:"发送时间",colName:"sentTime"},
            {title:"对方收到时间",colName:"respTime"},
            {title:"失败信息",colName:"sendStatus",width:"80px",className:"handleoutFailMsg",onClick:this.onFailMsgClick},
            {title:"发送报文",colName:"operate",width:"80px",cell:{sendMsg},onCellEvent:(data)=>{this.diaologMsgShow(data.reqMsg,"查看发送报文")}},
            {title:"响应报文",colName:"operate",width:"80px",cell:{respMsg},onCellEvent:(data)=>{this.diaologMsgShow(data.respMsg,"查看响应报文")}},
        ];
        const recSendColumn=[
            {title:"序号",colName:"orderNum"},
            {title:"配送单号",colName:"deliveryId"},
            {title:"接收ID",colName:"recvMsgId"},
            {title:"订单状态类型",colName:"statusTypeDesc"},
            {title:"源系统",colName:"srcSystem"},
            {title:"源消息时间",colName:"srcTime",width:"160px"},
            {title:"接收时间",colName:"recvTime",width:"160px"},
            {title:"处理状态",colName:"procStatusDesc",width:"80px"},
            {title:"接收报文",colName:"msg",width:"80px",className:"handleouRecMsg",onClick:(data)=>{this.diaologMsgShow(data.msg,"查看接收报文")}},
            {title:"分发ID",colName:"sendMsgId"},
            {title:"目标系统代码",colName:"destSystem",width:"100px"},
            {title:"发送时间",colName:"sentTime"},
            {title:"分发状态",colName:"sendStatusStr",width:"80px"},
            {title:"对方收到时间",colName:"respTime"},
            {title:"发送报文",colName:"operate",width:"80px",cell:{recSendMsg},onCellEvent:(data)=>{this.diaologMsgShow(data.reqMsg,"查看发送报文")}},
            {title:"响应报文",colName:"operate",width:"80px",cell:{recRespMsg},onCellEvent:(data)=>{this.diaologMsgShow(data.respMsg,"查看响应报文")}},
            {title:"源消息ID",colName:"srcMsgId"}
        ];
        return(
            salesChannelList!==null ?
                <div className="generallViewBox">
                    {
                        isShowQuery ?
                            <div className="condition">
                                <div className="header">
                                    <span>配送单分发全景</span>
                                </div>
                                <ul>
                                    <li>
                                        <label>渠道</label>
                                        <Select optionGroup={salesChannelList}
                                                isDisable={isDisable}
                                                sendField="salesChannel"
                                                defaultSelect={
                                                    salesChannelList.filter((item)=>{
                                                        return item.name==salesChannel
                                                    }).length>0 ? salesChannelList.filter((item)=>{
                                                        return item.name==salesChannel
                                                    })[0].value : salesChannelList[0].value
                                                }
                                                onSelectChange={this.onSelectChange}
                                        />
                                    </li>
                                    <li>
                                        <label>配送单号</label>
                                        <div className={classname("inputControl",{deliveryIdDisable:deliveryIdDisable})}>
                                            <input value={deliveryId}
                                                   onChange={(e)=>{this.setState({deliveryId:e.target.value})}}
                                            />
                                            {deliveryIdDisable ? <div className="inputDisable"/> : null}
                                        </div>
                                    </li>
                                    <li className="btnGroup">
                                        <button className="queryBtn" onClick={this.getTabledata}>查询</button>
                                        <button className="resetBtn" onClick={this.resetOption}>重置</button>
                                        <button className="turnBtn" onClick={()=>{
                                            this.props.history.push("/order")
                                        }}>返回</button>
                                    </li>
                                </ul>
                            </div>
                            :
                            null
                    }
                    <div className="tableBoxArea">
                        <div className="section">
                            <div className="tableArea">
                                <Table data={pandectData}
                                       tableWidthRatio="120%"
                                       column={pandectColumn}
                                       loading={pandectLoading}
                                       hasBoder={true}
                                       pagination={null}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tableBoxArea">
                        <div className="header">
                            <span>>配送单分发情况</span>
                        </div>
                        <div className="section">
                            <div className="tableArea">
                                <Table data={handleOutData}
                                       column={handleOutColumn}
                                       loading={handleOutLoading}
                                       hasBoder={true}
                                       pagination={null}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tableBoxArea">
                        <div className="header">
                            <span>>配送单状态接收和分发</span>
                        </div>
                        <div className="section">
                            <div className="tableArea">
                                <Table data={recSendData}
                                       tableWidthRatio="140%"
                                       column={recSendColumn}
                                       loading={recSendLoading}
                                       hasBoder={true}
                                       pagination={null}
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
                    {
                        failMsgDialog ?
                            <Dialog
                                className="failMsgDiaolog"
                                title="查看失败信息"
                                onConfirm={()=>{this.setState({failMsgDialog:false})}}
                                onClose={()=>{this.setState({failMsgDialog:false})}}
                            >
                                {
                                    failMsgData===null ?
                                        <ul className="failsMsgArea" style={{textAlign:"centert"}}>
                                            <li>
                                                <label>没有失败信息</label>
                                            </li>
                                        </ul>
                                        :
                                        <ul className="failsMsgArea">
                                            <li>
                                                <label>发送失败ID：</label>
                                                <span>{failMsgData[0].sendFailId}</span>
                                            </li>
                                            <li>
                                                <label>失败步骤：</label>
                                                <span>{failMsgData[0].isPrepareFailDesc}</span>
                                            </li>
                                            <li>
                                                <label>开始时间：</label>
                                                <span>{failMsgData[0].beginTime}</span>
                                            </li>
                                            <li>
                                                <label>结束时间：</label>
                                                <span>{failMsgData[0].endTime}</span>
                                            </li>
                                            <li>
                                                <label>失败信息：</label>
                                                <span>{failMsgData[0].failMsg}</span>
                                            </li>
                                        </ul>
                                }
                            </Dialog>:null
                    }
                </div>:null
        )
    }
}

export default GenerallView