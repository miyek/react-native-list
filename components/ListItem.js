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
    color: Colors.buttonColor,
  },
  buttonTextChecked: {
    padding: 20,
    color: Colors.buttonColorChecked,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
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
  statusButton: {
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
        } else if (this.props.checked) {
          Animated.timing(this.state.position, {
            toValue: {x: 0, y: 0},
            duration: 300,
          }).start(() => {
            this.setScrollViewEnabled(true);
            this.props.removeItem(this.props.text);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: {x: 0, y: 0},
            duration: 0, // fixme: duration not refresh list
          }).start(() => {
            this.setScrollViewEnabled(true);
            // todo: set checked
            this.props.setChecked(this.props.text);
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
            { this.props.checked ?
              <Icon.Ionicons style={styles.statusButton} name="md-trash" size={24}/> :
              <Icon.Ionicons style={styles.statusButton} name="md-checkmark-circle" size={24}/> }
          </View>
          <View style={styles.innerCell}>
            <TouchableOpacity onPress={() => ({})}>
              <View style={styles.button}>
                <Text style={this.props.checked ? styles.buttonTextChecked : styles.buttonText}>
                  {this.props.text}
                </Text>
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
  checked: PropTypes.bool,
  setScrollEnabled: PropTypes.func,
  removeItem: PropTypes.func,
  setChecked: PropTypes.func,
};
