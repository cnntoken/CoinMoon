import React, {Component} from 'react';
import styles from './styles';
import {
    Text,
    Button,
    Left,
    Body,
    ListItem,
    Thumbnail
} from "native-base";
import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import {Col, Row, Grid} from "react-native-easy-grid";

const moment = require('moment');

export default class PureListItem extends Component {

    // 删除爆料
    showDeleteDialog = (item) => {
        if (this.props.showDeleteDialog) {
            console.log(item);
            this.props.showDeleteDialog(item);
        }
    };

    // 点赞爆料
    like = (item) => {
        if (this.props.like) {
            this.props.like(item);
        }
    };

    // 点击用户头像
    clickAvatar = (item) => {
        if (this.props.clickAvatar) {
            this.props.clickAvatar(item);
        }
    };


    // 跳到详情页面
    pressItem = (item) => {
        if (this.props.pressItem) {
            this.props.pressItem(item);
        }
    };

    render() {
        const {item, index, hasData, list} = this.props.opt;
        return (
            <ListItem avatar>
                {/* 左侧图标 */}
                <Left>
                    <Button transparent light onPress={this.clickAvatar.bind(this, item)}>
                        <Thumbnail small source={item.source}/>
                    </Button>
                </Left>
                <Body style={{borderBottomWidth: 0}}>

                {/* 用户名& 发布时间& 编辑*/}
                <Grid>
                    <Row>
                        <Col size={5}>
                            <View style={styles.name}>
                                <Text>{item.userName}</Text>
                                <Text style={styles.time}>{moment(item.createdAt).format('HH:MM')}</Text>
                            </View>
                        </Col>
                        <Col size={1}>
                            <View style={styles.edit}>
                                <Button block transparent light onPress={this.showDeleteDialog.bind(this, item)}>
                                    <Image source={require('../../images/icon_more_black.png')}/>
                                </Button>
                            </View>
                        </Col>
                    </Row>
                </Grid>

                {/* 点击标题 ， 图片跳到详情页面 */}
                <TouchableOpacity onPress={this.pressItem.bind(this, item)}>
                    <View>
                        <Grid>
                            <Row>
                                <Col>
                                    <Text>{item.title}</Text>
                                </Col>
                            </Row>
                        </Grid>
                        {/* 九宫格 */}
                        <Grid>
                            <Row>
                                {
                                    item.images.slice(0, 3).map((i, idx) => {
                                        return <Col style={styles.col_img} key={idx}>
                                            <Image style={styles.image}
                                                   source={{uri: i.uri}}/>
                                        </Col>
                                    })
                                }
                            </Row>
                            <Row>
                                {
                                    item.images.length > 3 ?
                                        item.images.slice(3, 6).map((i, idx) => {
                                            return <Col style={styles.col_img} key={idx}>
                                                <Image style={styles.image}
                                                       source={{uri: i.uri}}/>
                                            </Col>
                                        }) : null
                                }
                            </Row>
                            <Row>
                                {
                                    item.images.length > 6 ?
                                        item.images.slice(6, 9).map((i, idx) => {
                                            return <Col style={styles.col_img} key={idx}>
                                                <Image style={styles.image}
                                                       source={{uri: i.uri}}/>
                                            </Col>
                                        }) : null
                                }
                            </Row>
                        </Grid>
                    </View>
                </TouchableOpacity>

                {/* 点赞评论*/}
                <Grid>
                    <Col>
                        <View style={styles.interact}>
                            <Button transparent light onPress={this.pressItem.bind(this, item)}>
                                <Image source={require('../../images/icon_view.png')}/>
                                <Text style={styles.number}>{item.viewNum}</Text>
                            </Button>
                            <Button transparent light onPress={this.pressItem.bind(this, item)}>
                                <Image source={require('../../images/icon_comment_small.png')}/>
                                <Text style={styles.number}>{item.commentsNum}</Text>
                            </Button>
                            <Button transparent light onPress={this.like.bind(this, item)}>
                                {
                                    !item.liked ? <Image source={require('../../images/icon_like_small.png')}/> :
                                        <Image source={require('../../images/icon_liked_small.png')}/>
                                }
                                <Text style={styles.number}>{item.likeNum}</Text>
                            </Button>
                        </View>
                    </Col>
                </Grid>
                {/* 无更多数据时,展示 */}
                {
                    (list.length - 1) !== index ? null :
                        !(hasData && list.length) ? <Text style={styles.noData}>there is no more!</Text> : null
                }
                </Body>

            </ListItem>
        )
    }
}