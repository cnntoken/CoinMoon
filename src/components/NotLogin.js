import React, {Component} from 'react';
import {
    Container,
    Button,
} from "@components/NDLayout";
import {StyleSheet, Image, Text, View, PixelRatio} from 'react-native';
import i18n from "@i18n";
import {Row, Grid, Col} from "react-native-easy-grid";
import {goRNPage} from "@src/utils/CNNBridge";
import {cnnLogger} from '@utils'

const styles = StyleSheet.create({

    avatar: {
        height: 60,
        // top: 40,
        width: 60,
        borderRadius: 30,
    },

    btn: {

        alignItems: 'center',
        fontSize: 18,
        height: 30,
        maxHeight: 30,
        // marginTop: 159,
        justifyContent: 'center',
        width: 74,
        maxWidth: 74,
        // maxWidth: 180,
        backgroundColor: '#FFFFFF',
        borderRadius: 5

    },

    btn_text: {
        color: '#333333',
        fontSize: 15,
        lineHeight: 25,

    },
    head: {
        alignItems: 'center',
        backgroundColor: '#408EF5',
        height: 119,
        justifyContent: 'space-between'
    },
    loginBox: {
        // alignItems: 'center',
        // flexDirection: 'row',
        // justifyContent: 'center',
        marginTop: 159
    },

    big_btn: {
        // marginTop: 159,
        borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
        borderBottomColor: '#E6E6E6',
        borderRadius: 0,
        backgroundColor: '#fff',

    },

    btn_grid: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

class ViewControl extends Component {

    goLogin = () => {
        goRNPage({
            moduleName: 'stark_login',
            params:{
                event:{
                    from: 'myHome',
                    trigger: 'login',
                }
            }
        });
    };

    goWallet = () => {
        goRNPage({
            moduleName: 'stark_wallet',
        });
    };

    goSetting = () => {
        goRNPage({
            moduleName: 'stark_mine_setting',
            // params:{
            //     initialRoute: 'Edit'
            // }
        })
    };

    // goMywallet = () => {
    //     this.props.navigation.navigate('WalletImportIndex', {
    //         prevState: this.props.navigation.state
    //     });
    // };

    render() {
        return (
            <Container>

                <View style={styles.head}>
                    <Grid style={{
                        justifyContent: 'space-around',
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Col style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            width: 60,
                            marginLeft: 24
                        }}>
                            <Image style={styles.avatar} source={require('@images/avatar_default.png')}/>
                        </Col>
                        <Col/>
                        <Col style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            width: 60,
                            marginRight: 24
                        }}>
                            <Button style={styles.btn} onPress={this.goLogin}>
                                <Text style={styles.btn_text}>{i18n.t('label_please_login')}</Text>
                            </Button>
                        </Col>
                    </Grid>
                </View>

                <Grid style={{
                    borderTopColor: '#F5F5F5',
                    borderTopWidth: 10
                }}>
                    <Row style={{
                        justifyContent: 'center',
                        height: 60

                    }}>
                        <Button style={styles.big_btn} onPress={this.goWallet}>
                            <Grid style={styles.btn_grid}>

                                <Col style={{
                                    width: 20,
                                    marginLeft: 19,
                                    marginRight: 12
                                }}>
                                    <Image source={require('@images/wallet.png')}/>
                                </Col>

                                <Col>
                                    <Text style={styles.btn_text}>{i18n.t('page_mine.mine_wallet')}</Text>
                                </Col>

                                <Col style={{
                                    width: 10,
                                    marginRight: 24,
                                }}>
                                    <Image source={require('@images/icon_next.png')}/>
                                </Col>

                            </Grid>
                        </Button>
                    </Row>
                    <Row style={{
                        justifyContent: 'center',
                        height: 60
                    }}>
                        <Button style={styles.big_btn} onPress={this.goSetting}>
                            <Grid style={styles.btn_grid}>
                                <Col style={{
                                    width: 20,
                                    marginLeft: 19,
                                    marginRight: 12
                                }}>
                                    <Image source={require('@images/settings.png')}/>
                                </Col>
                                <Col>
                                    <Text style={styles.btn_text}>{i18n.t('page_mine.setting')}</Text>
                                </Col>
                                <Col style={{
                                    width: 10,
                                    marginRight: 24,
                                }}>
                                    <Image source={require('@images/icon_next.png')}/>
                                </Col>
                            </Grid>
                        </Button>
                    </Row>
                </Grid>


            </Container>
        );
    }
}

export default ViewControl;
