import React from 'react';
import { StyleSheet, Animated, Text, TouchableOpacity, View, Dimensions, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import { Icon } from 'expo';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    marginBottom: 3,
    backgroundColor: Colors.buttonBackground
  },
  buttonText: {
    padding: 20,
    color: Colors.buttonColor
  },
  listItem: {
    marginLeft: -100,
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  innerCell: {
    width,
    marginLeft: 100,
  },
  deleteButton: {
    padding: 20
  }
});

export default class ListItem extends React.Component {
  panResponder;
  scrollViewEnabled;
  gestureDelay;

  constructor(props) {
    super(props);

    this.scrollViewEnabled = true;
    this.gestureDelay = -35;

    const position = new Animated.ValueXY();

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);

          const newX = gestureState.dx + this.gestureDelay;
          position.setValue({x: newX, y: 0});
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 150) {
          Animated.timing(this.state.position, {
            toValue: {x: 0, y: 0},
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: {x: width - 10, y: 0},
            duration: 300,
          }).start(() => {
            this.setScrollViewEnabled(true);
            // todo: should first cross task next remove
            this.props.removeItem(this.props.text);
          });
        }
      },
    });

    this.state = {position};
  }

  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

  render() {
    return (
      <View style={styles.listItem}>
        <Animated.View style={[this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
          <View style={styles.absoluteCell}>
            <TouchableOpacity onPress={() => this.props.removeItem(this.props.text)
            }>
              <Icon.Ionicons style={styles.deleteButton}
                             name="md-trash" size={24}></Icon.Ionicons>
            </TouchableOpacity>
          </View>
          <View style={styles.innerCell}>
            <TouchableOpacity onPress={() => ({})}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  }
}

ListItem.propTypes = {
  text: PropTypes.string,
  setScrollEnabled: PropTypes.func,
  removeItem: PropTypes.func,
};
