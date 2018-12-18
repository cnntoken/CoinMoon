// 所有导航信息都会加到这里来
import {createStackNavigator} from 'react-navigation';

import Login from 'app/screens/Login';
import Home from 'app/screens/Home';
import List from 'app/screens/List';

const RNApp = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {header: null, gesturesEnabled: true}
        },
        Home: {
            screen: Home,
            navigationOptions: {
                header: null,
                gesturesEnabled: true
            }
        },
        List: {
            screen: List,
            navigationOptions: {
                header: null,
                gesturesEnabled: false
            }
        },
    },

    {
        initialRouteName: 'Login'
    }
);

export default RNApp;
