import React from "react";
import DatePicker from "../../components/datepicker/datepicker.js";
import Table from "../../components/table/table.js"
import Api from "../../api/api.js";
import Select from "../../components/select/select.js";
import MsgAlert from "../../components/msgalert/msgalert.js";
import moment from "moment";
import "./orderShow.scss";
import axios from "axios";


class Opertate extends React.Component{
    constructor(props){
        super(props);
        this.generallView=this.generallView.bind(this);
    }
    generallView(){
        this.props.onCellEvent()
    }
    render(){
        return(
            <ul className="generallView">
                <li className="generallViewOption" onClick={this.generallView}>查看</li>
            </ul>
        )
    }
}

class OrderShow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            total:"",
            pageSize:15,
            pageNum:1,
            loading:false,
            orderStatusList:[{name:"全部",value:"全部"}],//订单状态数组
            salesChannelList:[{name:"全部",value:"全部"}],//渠道数组
            orderTypeList:[{name:"全部",value:"全部"}],//订单类型数组
            storageTypeList:[{name:"全部",value:"全部"}],//库存类型数组
            installTypeList:[{name:"全部",value:"全部"}],//安装类型数组
            presalesTypeList:[{name:"全部",value:"全部"}],//是否预售数组
            wmsCodeList:[{name:"全部",value:"全部"}],//所属物流系统数组
            salesChannel:undefined,//渠道
            deliveryId:undefined,//配送单号
            originalDeliveryId:undefined,//原配送单号
            odsDeliveryId:undefined,//ODS配送单号
            originalOdsDeliveryId:undefined,//ODS原配送单号
            storageType:undefined,//库存类型
            installType:undefined,//安装类型
            presalesType:undefined,//是否预售
            salesShop:undefined,//销售门店
            salesOrg:undefined,//销售组织
            wmsCode:undefined,//所属物流系统
            orderType:undefined,//订单类型
            orderStatus:undefined,//订单状态
            singleStockioId:undefined,//ODS DN号
            storagePlace:undefined,//物理DC
            beginTime:undefined,//开始时间
            endTime:undefined,//结束时间
        };
        this.onDateChange=this.onDateChange.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.onPageChange=this.onPageChange.bind(this);
        this.getSelectOption=this.getSelectOption.bind(this);
        this.alertMsg=this.alertMsg.bind(this);
        this.resetOption=this.resetOption.bind(this);
        this.onCellClick=this.onCellClick.bind(this);
        this.getSalesChannelList=this.getSalesChannelList.bind(this);
    }
    alertMsg(msg){
        MsgAlert.showMsg({
            msg:msg,
            timeout:20,
            fade:true
        })
    }
    getTableData(notReset){
        let {beginTime,endTime,pageSize,pageNum,salesChannel,deliveryId,originalDeliveryId,odsDeliveryId,originalOdsDeliveryId,storageType,installType,presalesType,salesShop,salesOrg,wmsCode,orderType,orderStatus,singleStockioId,storagePlace}=this.state;
        if(endTime && beginTime && moment(endTime).isBefore(beginTime)){
            this.alertMsg("结束日期不得大于开始日期");
            return
        }
        if(!notReset){
            this.refs.tablePagination && this.refs.tablePagination.reset();
        }
        this.setState({
            loading:true,
            pageNum:1
        });
        axios.post(Api.getOrderData,{
           pageSize,pageNum,deliveryId,originalDeliveryId,odsDeliveryId,originalOdsDeliveryId,storageType,installType,presalesType,salesShop,salesOrg,wmsCode,orderType,orderStatus,singleStockioId,storagePlace,
           salesChannel,
           beginTime:beginTime ? `${beginTime} 00:00:00` : beginTime,
           endTime:endTime ? `${endTime} 23:59:59` : endTime,
        }).then((res)=>{
            let resData=res.data.data===null ? [] : res.data.data.data;
            resData.map((item)=>{
                item.orderBackStatus=item.orderStatus ? item.orderStatus : item.backStatus
            });
            this.setState({
                data:resData,
                total:res.data.data===null ? 0 : res.data.data.totalCount,
                loading:false
            });
        }).catch((res)=>{
            this.setState({loading:false});
            this.alertMsg(res.message)
        })
    }
    resetOption(){
        console.log(JSON.parse(sessionStorage.getItem("salesChannelListArr")),12323434);
        this.setState({
            data:[],
            total:"",
            pageSize:15,
            pageNum:1,
            orderStatusList:[{name:"全部",value:"全部"}],//订单状态数组
            salesChannelList:[{name:"全部",value:"全部"}],//渠道数组
            orderTypeList:[{name:"全部",value:"全部"}],//订单类型数组
            storageTypeList:[{name:"全部",value:"全部"}],//库存类型数组
            installTypeList:[{name:"全部",value:"全部"}],//安装类型数组
            presalesTypeList:[{name:"全部",value:"全部"}],//是否预售数组
            wmsCodeList:[{name:"全部",value:"全部"}],//所属物流系统数组
            salesChannel:undefined,//渠道
            deliveryId:undefined,//配送单号
            originalDeliveryId:undefined,//原配送单号
            odsDeliveryId:undefined,//ODS配送单号
            originalOdsDeliveryId:undefined,//ODS原配送单号
            storageType:undefined,//库存类型
            installType:undefined,//安装类型
            presalesType:undefined,//是否预售
            salesShop:undefined,//销售门店
            salesOrg:undefined,//销售组织
            wmsCode:undefined,//所属物流系统
            orderType:undefined,//订单类型
            orderStatus:undefined,//订单状态
            singleStockioId:undefined,//ODS DN号
            storagePlace:undefined,//物理DC
            beginTime:undefined,//开始时间
            endTime:undefined,//结束时间
        });
        setTimeout(()=>{
            this.setState({salesChannelList:[{name:"全部",value:"全部"},...JSON.parse(sessionStorage.getItem("salesChannelList"))]})
        },0);
        this.getSelectOption()
    }
    componentWillMount(){
        this.getSelectOption();
        this.getSalesChannelList();
        document.title="订单查询展示"

    }
    getSalesChannelList(){
        let {salesChannelList}=this.state;
        axios.get(Api.getSalesChannelList).then((res)=>{
            let salesChannelListArr=[];
            let resObj=res.data.data;
            for(let key in resObj){
                salesChannelListArr.push({
                    name:Number(key),
                    value:resObj[key]
                })
            }
            console.log(salesChannelListArr,"salesChannelListArr");
            this.setState({
                salesChannelList:[...salesChannelList,...salesChannelListArr]
            });
            sessionStorage.setItem("salesChannelList",JSON.stringify(salesChannelListArr))
        })
    }
    onDateChange(date,field){
        this.setState({
            [field]:date
        })
    }
    onSelectChange(value,field){
        switch (field){
            case "orderType":
                if(value.name==="全部"){
                    this.setState({
                        [field]:null,
                        orderStatusList:[{name:"全部",value:"全部"}]
                    })
                }else {
                    axios.get(Api.getOrderStatus,{//订单状态
                        params:{
                            orderType:value.name
                        }
                    }).then((res)=>{
                        let buildList=res.data.data.map((item,i)=>{
                            return {name:item,value:item}
                        });
                        this.setState({
                            orderType:value.name,
                            orderStatusList:[{name:"全部",value:"全部"},...buildList],
                        });
                    });
                }break;
            default:this.setState({
                [field]:value.name==="全部" ? undefined : value.name
            })
        }
    }
    getSelectOption(){
        axios.get(Api.getOrderType).then((res)=>{//获取订单类型
            let buildList=res.data.data.map((item,i)=>{
                return {name:item,value:item}
            });
            this.setState({
                orderTypeList:[{name:"全部",value:"全部"},...buildList]
            });
        });
        axios.get(Api.getStorageType).then((res)=>{//获取库存类型
            let buildList=res.data.data.map((item,i)=>{
                return {name:item,value:item}
            });
            this.setState({
                storageTypeList:[{name:"全部",value:"全部"},...buildList]
            });
        });
        axios.get(Api.getInstallType).then((res)=>{//获取安装类型
            let buildList=res.data.data.map((item,i)=>{
                return {name:item,value:item}
            });
            this.setState({
                installTypeList:[{name:"全部",value:"全部"},...buildList]
            });
        });
        axios.get(Api.getPresalesType).then((res)=>{//获取是否预售
            let buildList=res.data.data.map((item,i)=>{
                return {name:item,value:item}
            });
            this.setState({
                presalesTypeList:[{name:"全部",value:"全部"},...buildList]
            });
        });
        axios.get(Api.getWmsCode).then((res)=>{//获取所属物流系统
            let buildList=res.data.data.map((item,i)=>{
                return {name:item,value:item}
            });
            this.setState({
                wmsCodeList:[{name:"全部",value:"全部"},...buildList]
            });
        });

    }
    onPageChange(page){
        this.state.pageSize=page.pageSize;
        this.state.pageNum=page.pageNo;
        this.getTableData(true)
    }
    onCellClick(data){
        this.props.history.push({
            pathname:`/order/generallView/${data.salesChannel}/${data.deliveryId}`,
            state:{data,controlDisable:true}
        })
    }
    render(){
        let {data,loading,total,salesChannel,salesChannelList,beginTime,endTime,storagePlace,deliveryId,singleStockioId,originalDeliveryId,odsDeliveryId,originalOdsDeliveryId,salesShop,salesOrg,wmsCodeList,presalesTypeList,installTypeList,storageTypeList,orderStatusList,orderTypeList}=this.state;
        let column=[
            {title:"序号",colName:"orderNum",width:"60px"},
            {title:"查看全景",colName:"operate",width:"120px",cell:{Opertate},onCellEvent:this.onCellClick},
            {title:"渠道",colName:"salesChannel"},
            {title:"订单类型",colName:"orderType"},
            {title:"配送单状态",colName:"orderBackStatus"},
            {title:"主单号",colName:"mainOrderId"},
            {title:"配送单号",colName:"deliveryId"},
            {title:"原配送单号",colName:"originalDeliveryId"},
            {title:"ODS配送单号",colName:"odsDeliveryId"},
            {title:"ODS原配送单号",colName:"originalOdsDeliveryId"},
            {title:"ODS DN号",colName:"singleStockioId"},
            {title:"库存类型",colName:"storageType"},
            {title:"安装类型",colName:"installType"},
            {title:"是否预售",colName:"presalesType"},
            {title:"销售门店",colName:"salesShop"},
            {title:"销售组织",colName:"salesOrg"},
            {title:"物理DC",colName:"storagePlace"},
            {title:"物流系统代码",colName:"wmsCode"},
            {title:"订单接收时间",colName:"recvTime"}
        ];
        return(
            <div className="orderQuery">
                <div className="condition">
                    <div className="header">
                        <span>订单查询展示</span>
                    </div>
                    <ul>
                        <li>
                            <label>渠道</label>
                            <Select optionGroup={salesChannelList}
                                    sendField="salesChannel"
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>配送单号</label>
                            <input value={deliveryId}
                                   onChange={(e)=>{this.setState({deliveryId:e.target.value})}}
                            />
                        </li>
                        <li>
                            <label>原配送单号</label>
                            <input value={originalDeliveryId}
                                   onChange={(e)=>{this.setState({originalDeliveryId:e.target.value})}}
                            />
                        </li>
                        <li>
                            <label>ODS配送单号</label>
                            <input value={odsDeliveryId}
                                   onChange={(e)=>{this.setState({odsDeliveryId:e.target.value})}}
                            />
                        </li>
                        <li>
                            <label>ODS原配送单号</label>
                            <input value={originalOdsDeliveryId}
                                   onChange={(e)=>{this.setState({originalOdsDeliveryId:e.target.value})}}
                            />
                        </li>
                        <li>
                            <label>库存类型</label>
                            <Select optionGroup={storageTypeList}
                                    sendField="storageType"
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>安装类型</label>
                            <Select optionGroup={installTypeList}
                                    sendField="installType"
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>是否预售</label>
                            <Select optionGroup={presalesTypeList}
                                    sendField="presalesType"
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>销售门店</label>
                            <input value={salesShop}
                                   onChange={(e)=>{this.setState({salesShop:e.target.value})}}
                            />
                        </li>
                        <li>
                            <label>销售组织</label>
                            <input value={salesOrg}
                                   onChange={(e)=>{this.setState({salesOrg:e.target.value})}}
                            />
                        </li>
                        <li>
                            <label>所属物流系统</label>
                            <Select optionGroup={wmsCodeList}
                                    sendField="wmsCode"
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>订单类型</label>
                            <Select optionGroup={orderTypeList}
                                    defaultSelect="全部"
                                    sendField="orderType"
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>订单状态</label>
                            <Select optionGroup={orderStatusList}
                                    sendField="orderStatus"
                                    isDisable={orderStatusList.length<2}
                                    onSelectChange={this.onSelectChange}
                            />
                        </li>
                        <li>
                            <label>ODS DN号</label>
                            <input value={singleStockioId}
                                   onChange={(e)=>{this.setState({singleStockioId:e.target.value})}}
                            />
                        </li>
                        <li>
                            <label>物理DC</label>
                            <input value={storagePlace}
                                   onChange={(e)=>{this.setState({storagePlace:e.target.value})}}
                            />
                        </li>
                        <li>
                            <label>订单接收时间</label>
                            <DatePicker
                                placeholder="开始日期"
                                onDateChange={this.onDateChange}
                                sendField="beginTime"
                                defaultValue={beginTime}
                            />
                            <span className="cutOff">至</span>
                            <DatePicker placeholder="结束日期"
                                        onDateChange={this.onDateChange}
                                        sendField="endTime"
                                        defaultValue={endTime}
                            />
                        </li>
                    </ul>
                    <div className="btnGroup">
                        <button className="queryBtn" onClick={()=>{this.getTableData(false)}}>查询</button>
                        <button className="resetBtn" onClick={this.resetOption}>重置</button>
                    </div>
                </div>
                <div className="tableArea">
                    <Table data={data}
                           column={column}
                           loading={loading}
                           hasBoder={true}
                           ref="tablePagination"
                           tableWidthRatio="120%"
                           pagination={{
                               total:total,
                               onPageChange:this.onPageChange
                           }}
                    />
                </div>
            </div>
        )
    }
}


export default OrderShow