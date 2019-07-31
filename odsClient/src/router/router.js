import React from "react";

import {Route, Switch} from "react-router-dom";

import Bundle from "./Bundle";
import Loading from "components/Loading/Loading";

import MsgShow from "bundle-loader?lazy&name=MsgShow!pages/msgShow/msgShow";//消息查询展示
import OrderShow from "bundle-loader?lazy&name=OrderShow!pages/orderShow/orderShow";//订单查询展示
import GenerallView from "bundle-loader?lazy&name=GenerallView!pages/orderShow/generallView/generallView";//配送单分发全景
import MultiStockio from "bundle-loader?lazy&name=GenerallView!pages/orderShow/generallView/multiStockio/multiStockio";//多交货单详情
import IssueMonitor from "bundle-loader?lazy&name=IssueMonitor!pages/issueMonitor/issueMonitor";//订单分发监控
import HandleFail from "bundle-loader?lazy&name=HandleFail!pages/issueMonitor/handleFail/handleFail";//当天处理失败消息详情



import GetFail from "bundle-loader?lazy&name=GetFail!pages/issueMonitor/getFail/getFail";//获取失败量详情
import SendFail from "bundle-loader?lazy&name=SendFail!pages/issueMonitor/sendFail/sendFail";//发送失败量详情

import ReturnAllFail from "bundle-loader?lazy&name=ReturnAllFail!pages/issueMonitor/returnFail/returnAllFail";//返回失败量消息详情
import ReturnFail from "bundle-loader?lazy&name=ReturnFail!pages/issueMonitor/returnFail/returnFail";//返回失败量详情

import SendNoReturn from "bundle-loader?lazy&name=SendNoReturn!pages/issueMonitor/sendNoReturn/sendNoReturn";//本日发送未返量详情
import SendAllSuccess from "bundle-loader?lazy&name=SendAllSuccess!pages/issueMonitor/sendNoReturn/sendAllSuccess";//返回失败量消息详情


import BackMonitor from "bundle-loader?lazy&name=BackMonitor!pages/backMonitor/backMonitor";//订单状态回传监控
import BackHandleFail from "bundle-loader?lazy&name=BackHandleFail!pages/backMonitor/backHandleFail/backHandleFail";//订单状态回传监控处理失败详情
import BackSendFail from "bundle-loader?lazy&name=BackSendFail!pages/backMonitor/backSendFail/backSendFail";//订单状态回传发送失败量详情

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : null
        }
    </Bundle>
);

export default () => (
    <div>
        <Switch>
            <Route exact path="/" component={createComponent(MsgShow)}/>
            <Route exact path="/order" component={createComponent(OrderShow)}/>
            <Route exact path="/order/generallView/:salesChannel/:deliveryId" component={createComponent(GenerallView)}/>
            <Route path="/order/generallView/multiStockio" component={createComponent(MultiStockio)}/>
            <Route exact path="/issueMonitor" component={createComponent(IssueMonitor)}/>
            <Route path="/issueMonitor/handleFail" component={createComponent(HandleFail)}/>
            <Route path="/issueMonitor/getFail" component={createComponent(GetFail)}/>
            <Route path="/issueMonitor/sendFail" component={createComponent(SendFail)}/>

            <Route path="/issueMonitor/returnFail" component={createComponent(ReturnFail)}/>
            <Route path="/issueMonitor/returnAllFail" component={createComponent(ReturnAllFail)}/>

            <Route path="/issueMonitor/sendNoReturn" component={createComponent(SendNoReturn)}/>
            <Route path="/issueMonitor/sendAllSuccess" component={createComponent(SendAllSuccess)}/>

            <Route exact path="/backMonitor" component={createComponent(BackMonitor)}/>
            <Route path="/backMonitor/backHandleFail" component={createComponent(BackHandleFail)}/>
            <Route path="/backMonitor/backSendFail" component={createComponent(BackSendFail)}/>
        </Switch>
    </div>
);
