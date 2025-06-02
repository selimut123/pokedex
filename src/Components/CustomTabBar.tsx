import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {
  SceneRendererProps,
  NavigationState,
  Route,
} from 'react-native-tab-view';

type RouteType = Route & {
  title: string;
};

type CustomTabBarProps = SceneRendererProps & {
  navigationState: NavigationState<RouteType>;
  jumpTo: (key: string) => void;
};

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  navigationState,
  jumpTo,
}) => {
  return (
    <View style={styles.tabContainer}>
      {navigationState.routes.map((route, index) => {
        const focused = navigationState.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => jumpTo(route.key)}
            style={[styles.tabItem, focused && styles.tabItemActive]}
            activeOpacity={0.7}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.tabText,
                focused ? styles.activeText : styles.inactiveText,
              ]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b90f6',
  },
  tabText: {
    maxWidth: '100%',
    fontSize: 14,
  } as TextStyle,
  activeText: {
    color: '#3b90f6',
    fontWeight: 'bold',
  } as TextStyle,
  inactiveText: {
    color: '#999',
  } as TextStyle,
});

export default CustomTabBar;
