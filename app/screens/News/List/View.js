import React, {Component} from 'react';
import styles from './styles';
import {
    Container,
    Header,
    Content,
    Text,
    Button,
    Left,
    Right,
    Body,
    Title,
    FooterTab,
    Footer
} from "native-base";
import {View} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListTabBar from './components/ListTabBar'
import List from './components/List'
import Item from './components/Item'
class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.LastEvaluatedKey = {}
    }
    onRefresh = (category,params)=>{
        console.log('onRefresh',params)
        this.props.getList({isRefresh: true,category},
            (LastEvaluatedKey)=>{
            this.LastEvaluatedKey[category] = LastEvaluatedKey;
        })
    }
    onLoadMore = (category,params)=>{
        console.log('onloadmore',params)
        this.props.getList({category,params:{LastEvaluatedKey:this.LastEvaluatedKey[category]}},
            (LastEvaluatedKey)=>{ this.LastEvaluatedKey[category] = LastEvaluatedKey;})
    }
    // renderInfomationItem = ({item, separators})=>{
    //     return <Item info={item} key={item._id} onItemClick={this.goDetail}/>
    // }
    renderItem = ({item, separators})=>{
        return <Item info={item} key={item._id} onItemClick={this.goDetail}/>
    }
    
    goDetail = (info)=>{
        const {_id, category} = info;
        this.props.navigation.navigate('NewsDetail',{_id,category})
        // console.log('goDetail', info)
    }

    componentDidMount() {

    }

    render() {
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <ListTabBar/>}
                // onChangeTab={this.onChangeTab}
                >
                <List
                    tabLabel='新闻'
                    data={this.props.news}
                    renderItem={this.renderItem}
                    hasMore={this.props.news_hasMore}
                    onRefresh={(...args)=>{this.onRefresh('news',...args)}}
                    onLoadMore={(...args)=>{this.onLoadMore('news',...args)}}
                />
                <List 
                    tabLabel='信息'
                    data={this.props.info}
                    renderItem={this.renderItem}
                    hasMore={this.props.info_hasMore}
                    onRefresh={(...args)=>{this.onRefresh('info',...args)}}
                    onLoadMore={(...args)=>{this.onLoadMore('info',...args)}}
                />
            </ScrollableTabView>
        );
    }
}

export default ViewControl;
