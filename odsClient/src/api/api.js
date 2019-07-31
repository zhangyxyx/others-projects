const baseUrl = "http://"+window.location.host;
module.exports = {
    getSalesChannelList:"/api/filter/salesChannel",//获取渠道
    queryMsgShowData:"/api/message/query",//消息查询展示
    pushMsgShowData:"/api/message/push",//推送
    backupMsgShowData:"/api/message/bak",//备份
    getSystemsList:"/api/filter/systems",//源(目标)系统
    getInterfacesList:"/api/filter/interfaces",//源(目标)系统
    getBaseDataQuery:"/api/filter/queryData",//基础服务数据查询
    getOrderData:"/api/order/query",//订单查询展示
    getOrderType:"/api/filter/orderTypes",//订单类型
    getOrderStatus:"/api/filter/orderStatus",//订单状态
    getPandectData:"/api/panorama/query",//配送单总览
    gethandleOutData:"/api/panorama/querySendDeliveryDispatch",//配送单分发情况
    pushHandleOutData:"/api/panorama/push",//配送单分发情况重推
    getRecSendData:"/api/panorama/queryRecvOrderStatus",//配送单分发和接收
    getMultiStockio:"/api/panorama/queryStockioes",//多交货单详情
    getFailMsg:"/api/panorama/querySendFailList",//失败信息
    getStorageType:"/api/filter/storageTypes",//库存类型
    getInstallType:"/api/filter/installTypes",//安装类型
    getPresalesType:"/api/filter/presalesTypes",//是否预售
    getWmsCode:"/api/filter/wmsCodes",//所属物流系统
    getRecvDeliver:"/api/monitorDeliver/recvDeliver",//订单分发接收监控
    getSendDeliver:"/api/monitorDeliver/sendDeliver",//订单分发发送监控
    getHandleFail:"/api/monitorDeliver/queryRecvDeliveryFailList",//当天处理失败信息量详情
    getFail:"/api/monitorDeliver/querySendDeliveryGetDataFailList",//获取失败量详情
    sendFail:"/api/monitorDeliver/querySendDeliveryFailList",//发送失败量详情

    returnFail:"/api/monitorDeliver/queryReturnFailDetailList",//返回失败量详情
    returnAllFail:"/api/monitorDeliver/queryReturnFailDetailAllList",//返回失败量详情

    sendNoReturn:"/api/monitorDeliver/querySendNoReturnDetailList",//本日发送未返量详情
    sendAllSuccess:"/api/monitorDeliver//querySendNoReturnDetailAllList",//发送未返回量详情
     
    getRecvStatus:"/api/monitorStatus/recvStatus",//订单状态回传接收监控
    getSendStatus:"/api/monitorStatus/sendStatus",//订单状态回传发送监控
    getBackHandleFail:"/api/monitorStatus/queryRecvStatusFail",//订单状态回传接收监控处理失败量详情
    getBackSendFail:"/api/monitorStatus/querySendStatusFail",//订单状态回传发送监控处理失败量详情
};