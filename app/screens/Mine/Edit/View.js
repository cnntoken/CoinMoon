import React, {PureComponent} from 'react';
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
    Label
} from "native-base";
import {Image,View,TouchableOpacity} from 'react-native';
import InputFocus from 'app/components/InputFocus';
import userService from 'app/services/user';
import styles from './styles';
import { $toast } from 'app/utils';
import * as Types from 'app/actions/types'
class ViewControl extends PureComponent {
    constructor(props){
        super(props)
        const {userInfo} = props;
        this.state = {
            nick_name: userInfo.attributes.nickname
        }
    }
    onSubmit = async ()=>{
        console.log('submit')
        try{
         $toast('正在提交...')
         const res = await userService.updateAttributes({'nickname': this.state.nick_name});
         this.props.dispatch({type: Types.AUTH_REFRESH})
         this.props.navigation.pop()
         console.log(res)
         $toast('修改成功!')
        }catch(e){
            console.log(e)
        }
    }
    onChangeNickName = (nick_name)=>{
        this.setState({
            nick_name
        })
    }
    goBack = ()=>{
        this.props.navigation.pop();
    }
    render() {
        const {nick_name} = this.state;
        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Image source={require('app/images/icon_back_black.png')} style={{width:10,height:18}}/>
                        </Button>
                    </Left>
                </Header>
                <Content style={styles.content}>
                    <View style={styles.uploadbox}>
                        <TouchableOpacity>
                            <View style={styles.imgbox}>
                                <Image source={require('app/images/avatar_default.png')} style={{width:80,height:80}}/>
                                <Image source={require('app/images/icon_camera.png')} style={styles.camera}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infobox}>
                        <Label style={styles.label}>用户名</Label>
                        <InputFocus onChangeText={this.onChangeNickName} value={nick_name} style={styles.input}/>
                    </View>
                    <Button block full rounded style={styles.btn} onPress={this.onSubmit}>
                        <Text>保 存</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default ViewControl;
