import React from "react";
import Table from "../../../../components/table/table.js";
import MsgAlert from "../../../../components/msgalert/msgalert.js";
import axios from "axios";
import Api from "../../../../api/api.js";
import "./multiStockio.scss";

class MultiStockio extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            loading:false,
        };
        this.turnBack=this.turnBack.bind(this);
    }
    componentWillMount(){
        this.getTableData();
        document.title="配送单总览"
    }
    alertMsg(msg){
        MsgAlert.showMsg({
            msg:msg,
            timeout:20,
            fade:true
        })
    }
    getTableData(){
        let odsDeliveryId=this.props.location.state ? this.props.location.state.data.odsDeliveryId : undefined;
        this.setState({
            loading:true
        });
        axios.get(Api.getMultiStockio,{params:{odsDeliveryId}
        }).then((res)=>{
            this.setState({
                data:res.data.data===null ? [] : res.data.data,
                loading:false
            });
        }).catch((res)=>{
            this.setState({loading:false});
            this.alertMsg(res.message)
        })
    }
    turnBack(){
        // this.props.history.push("/order/generallView")//返回订单分发监控页面
        this.props.history.goBack()//返回订单分发监控页面
    }
    render(){
        let {data,loading}=this.state,
            column=[
                {title:"序号",colName:"orderNum"},
                {title:"交货单号",colName:"stockioId"},
                {title:"库存地代码",colName:"logicStoragePlace"},
                {title:"是出库",colName:"isOutDesc"},
                {title:"原入库单ID",colName:"originalStockioId"},
                {title:"出入库状态",colName:"stockioStatusDesc"},
                {title:"出入库时间",colName:"stockioTime"}
            ];
        return(
            <div className="deitalArea">
                <div className="header">
                    <span>配送单总览</span>
                </div>
                <div className="condition">
                    <div className="header">
                        <span>>多交货单详情</span>
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
                                   pagination={null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MultiStockio