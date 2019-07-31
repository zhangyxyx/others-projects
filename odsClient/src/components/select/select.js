import React from "react";
import classNames from "classnames";
import {IEVersion} from "../../components/util/util.js";
import "./select.scss";


class Select extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShowOption:false,
            selectValue:props.defaultSelect ? props.defaultSelect : props.optionGroup[0].value || ""
        };
        this.changeOptionShow=this.changeOptionShow.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.closeOption=this.closeOption.bind(this);
    }
    changeOptionShow(e){
        if(IEVersion()>8){
            e.nativeEvent.stopImmediatePropagation()
        }
        this.setState({
            isShowOption:!this.state.isShowOption
        });
    }
    closeOption(){
        if(this.state.isShowOption){
            this.setState({
                isShowOption:!this.state.isShowOption
            })
        }
    }
    componentDidMount() {
        if(document.addEventListener){
            document.addEventListener('click',this.closeOption)
        }
    }
    onSelect(e){
        this.setState({
            selectValue:e.target.innerText,
            isShowOption:!this.state.isShowOption
        });
        // this.refs.labelSelect.innerText = e.target.innerText;
        let selectItem = this.props.optionGroup.find((item)=>{
            return item.value === e.target.innerText
        });
        this.props.onSelectChange && this.props.onSelectChange(selectItem,this.props.sendField?this.props.sendField:undefined)
    }
    componentWillReceiveProps(nextProps){
        let isSame=true;
        if(nextProps.optionGroup.length!==this.props.optionGroup.length){
            isSame=false
        }
        if(nextProps.optionGroup.length===this.props.optionGroup.length){
            for(var i=0;i<nextProps.optionGroup.length;i++){
                for(var key in nextProps.optionGroup[i]){
                    if(nextProps.optionGroup[i][key]!==this.props.optionGroup[i][key]){
                        isSame=false
                    }
                }
            }
        }
        if(!isSame){
            this.setState({selectValue:nextProps.optionGroup[0].value})
        }
        if(nextProps.resetOption){
            this.setState({selectValue:nextProps.optionGroup[0].value})
        }
    }
    render(){
        let {isShowOption,selectValue}=this.state;
        let {optionGroup,width,height,textIndent,isDisable}=this.props;
        return(
            <div style={{width:width?width:""}} className={classNames('selectBox',this.props.className)}>
                <div>
                    {
                        isDisable ? <div className="shadow"/>:null
                    }
                    <label style={{height:height?height:"",lineHeight:height?height:"",textIndent:textIndent?textIndent:""}} onClick={this.changeOptionShow} className={classNames({openOption:isShowOption,isDisabled:isDisable})} ref="labelSelect">{selectValue}</label>
                </div>
                {isShowOption?
                    <ul style={{width:width?width:"",top:height?`${parseInt(height)+2}px`:""}}>
                        {
                            optionGroup.map((item)=>{
                                return(
                                    <li style={{textIndent:textIndent?textIndent:""}} key={`${item.value}${item.id}`} onClick={this.onSelect} className={classNames({active:item.value==selectValue})}>{item.value}</li>
                                )
                            })
                        }
                    </ul>
                    :
                    null
                }
            </div>
        )
    }
}
export default Select