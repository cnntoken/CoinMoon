import React, {Component} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListTabBar from '../components/ListTabBar'
import MarketList from '../components/MarketList'
import i18n from '@i18n';
import {
    View,
    DeviceEventEmitter
} from 'react-native';
import {goRNPage} from '@utils/CNNBridge'
const LIMIT = 10

class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.interval = null
    }

    getList =  (obj, callback) => {
        this.props.getList(obj,()=>{
            callback && callback()
        })
    };

    getDatabyMineID = (ids) => {
        this.props.getDatabyMineID(ids)
    }
    refreshMineData = () => {
        this.interval = setInterval(()=>{
            let {mineID} = this.props
            if(mineID.length){
                this.getDatabyMineID(mineID)
            }
        },2000)
    }
    componentDidMount() {
        this.getList({count: LIMIT,category:'mine',read_tag:''})
        this.getList({count: LIMIT,category:'all',read_tag:'',sort_by:'-market_cap'})
        // this.refreshMineData()
        //监听详情页发起的自选操作事件
        this.listener = DeviceEventEmitter.addListener('collectionAction',(params)=>{
            this.getList({count: LIMIT,category:'mine',read_tag:''})
        });
    }
    componentWillUnmount(){
        this.listener.remove();
    }
  
    handleSort = ({category,sort_by,count}) => {
        let read_tag = this.props[category].read_tag
        // 如果切换了排序维度，则read_tag置为''
        if(this.props[category].sort_by !== sort_by){
            read_tag = ''
        }
        this.props.getList({category,sort_by,count,read_tag})
    }
    handleRefresh = (category,callback) => {
        const params = {
            category,
            read_tag: '',
            count: LIMIT,
            isLoadmore: false,
        }
        if(category==='all'){
            params.sort_by = this.props[category].sort_by
        }
        this.getList(params,callback)
    }
    handleLoadMore = (category,callback) => {
        const params = {
            category,
            read_tag: this.props[category].read_tag,
            count: LIMIT,
            isLoadmore: true,
        }
        if(category==='all'){
            params.sort_by = this.props[category].sort_by
        }
        this.getList(params,callback)
    }
    goMarketDetail = (item) => {
        goRNPage({
            moduleName:'stark_market_detail',
            params: {
                id: item.id,
                is_pair: item.is_pair
            }
        })
    }
    addCollection = (id) => {
        this.props.addCollection(id)
    }
    removeCollection = (id) => {
        this.props.removeCollection(id)
    }
    goSeach = () => {
        this.props.navigation.navigate('MarketSearch')
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollableTabView
                    style={{flex: 1}}
                    renderTabBar={() => <ListTabBar goSeach={this.goSeach}/>}
                >
                    {['mine', 'all'].map((cate) => {
                        return <MarketList
                                    key={cate}
                                    data={[{items:this.props[cate].list}]}
                                    supportSort={cate==='all'?true: false} // 只有币种排行支持排序，自选列表不支持
                                    sort_by={this.props[cate].sort_by}
                                    type={cate}
                                    showOrder={cate==='all'?true:false}
                                    tabLabel={i18n.t(`page_market_list.category_${cate}`)}
                                    handleSort={this.handleSort}
                                    handleRefresh={this.handleRefresh}
                                    handleLoadMore={this.handleLoadMore}
                                    goMarketDetail={this.goMarketDetail}
                                    addCollection={this.addCollection}
                                    removeCollection={this.removeCollection}
                                    user={this.props.user}
                        />
                    })}
                </ScrollableTabView>
            </View>
        );
    }
}

export default ViewControl;
