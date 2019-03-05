import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'expo';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  addNewContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  addNewInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 10,
    padding: 10,
    flex: 1,
  },
  addNewButton: {
    padding: 10,
    margin: 5
  },
  addNewButtonDisabled: {
    padding: 10,
    margin: 5,
    opacity: 0.25
  }
});

export class AddNewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: 'Enter new task..',
    };
  }

  clear() {
    this.setState({
      newItem: null,
    })
  }

  addNewTask() {
    const item = {key: this.state.newItem};
    this.clear();
    this.props.onAddNewItem(item);
  }

  get isButtonDisabled() {
    return !this.state.newItem
  }

  render() {
    return (
      <View style={styles.addNewContainer}>
        <TextInput
          style={styles.addNewInput}
          onFocus={() => this.clear()}
          onChangeText={(newItem) => this.setState({newItem})}
          value={this.state.newItem}
        />
        <TouchableOpacity onPress={() => this.addNewTask()}
                          style={this.isButtonDisabled ? styles.addNewButtonDisabled : styles.addNewButton}
                          disabled={this.isButtonDisabled}>
          <Icon.Ionicons name="md-add-circle" size={32}></Icon.Ionicons>
        </TouchableOpacity>
      </View>
    );
  }
}

AddNewItem.propTypes = {
  onAddNewItem: PropTypes.func
};
