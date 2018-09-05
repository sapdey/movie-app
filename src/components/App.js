import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from './Home/';
import Detail from './Detail';
import ListView from './List';
import SearchTab from './Search';
import Person from './Person';
import TV from './TV';
import Favorites from './Favorite';
import YoutubeUI from './Youtube';

class App extends Component {

    render() {
        return (
            // <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* <RootStack /> */}
            </View>
            // </SafeAreaView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

// const HomeTab = createStackNavigator(
//     {
//         Home: {
//             screen: Home,
//             navigationOptions: () => ({
//                 headerMode: 'none',
//                 // header: null,
//             })
//         },
//         Detail: {
//             screen: Detail,
//             headerMode: 'float'
//         },
//         List: {
//             screen: ListView
//         },
//         Searchtab: {
//             screen: SearchTab,
//             header: null
//         },
//         Person: {
//             screen: Person,
//             header: null
//         },
//         Youtube: {
//             screen: YoutubeUI,
//             header: 'none'
//         }
//     },
//     {
//         headerMode: 'screen'
//     }
// );

// HomeTab.navigationOptions = ({ navigation }) => {
//     if (navigation.state.index === 0) {
//         return {
//             tabBarVisible: true,
//         };
//     }
//     return {
//         tabBarVisible: false,
//     };
// };

// const TVTab = createStackNavigator(
//     {
//         TV: {
//             screen: TV,
//             navigationOptions: () => ({
//                 headerMode: 'none',
//                 // header: null,
//             })
//         },
//         Detail: {
//             screen: Detail,
//             header: null
//         },
//         List: {
//             screen: ListView
//         },
//         Searchtab: {
//             screen: SearchTab,
//             header: null
//         },
//         Person: {
//             screen: Person,
//             header: null
//         },
//         Youtube: {
//             screen: YoutubeUI,
//             navigationOptions: () => ({
//                 headerMode: 'none',
//                 // header: null,
//             })
//         }
//     },
// );

// TVTab.navigationOptions = ({ navigation }) => {
//     if (navigation.state.index === 0) {
//         return {
//             tabBarVisible: true,
//         };
//     }
//     return {
//         tabBarVisible: false,
//     };
// };

const createMyNavigation = (stack) => {
    let nav = createStackNavigator(
        {
            stack: {
                screen: stack,
                navigationOptions: () => ({
                    headerMode: 'none',
                    // header: null,
                })
            },
            Detail: {
                screen: Detail,
                header: null
            },
            List: {
                screen: ListView
            },
            Searchtab: {
                screen: SearchTab,
                header: null
            },
            Person: {
                screen: Person,
                header: null
            },
            Youtube: {
                screen: YoutubeUI,
                navigationOptions: () => ({
                    headerMode: 'none',
                    // header: null,
                })
            }
        }
    );
    nav.navigationOptions = ({ navigation }) => {
        if (navigation.state.index === 0) {
            return {
                tabBarVisible: true,
            };
        }
        return {
            tabBarVisible: false,
        }
    }

    return nav;
}



export default createBottomTabNavigator({
    Movies: createMyNavigation(Home),
    TV: createMyNavigation(TV),
    Favorites: createMyNavigation(Favorites)
},
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                // let iconName;
                if (routeName === 'Movies') {
                    iconName = 'local-movies';
                    return <MaterialIcons name='local-movies' size={25} color={tintColor} />
                } else if (routeName === 'TV') {
                    return <Ionicons name='md-tv' size={25} color={tintColor} />;
                } else if (routeName === 'Favorites') {
                    return <MaterialIcons name='favorite' size={25} color={tintColor} />
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            labelStyle: {
                fontSize: 14,
            },
        },
        // lazy: false
    },

    {
        initialRouteName: 'Movies',
    }
);