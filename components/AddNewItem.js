import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'expo';


export class AddNewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: 'Enter new task..',
    };
  }

  addNewTask() {
    const item = {key: this.state.newItem};
    this.setState({
      newItem: null,
    });

    this.props.onAddNewItem(item);
  }

  render() {
    return (
      <View style={styles.addNewContainer}>
        <TextInput
          style={styles.addNewInput}
          onChangeText={(newItem) => this.setState({newItem})}
          value={this.state.newItem}
        />
        <TouchableOpacity onPress={() => this.addNewTask()} style={styles.addNewButton}>
          <Icon.Ionicons name="md-add-circle" size={32}></Icon.Ionicons>
        </TouchableOpacity>
      </View>
    );
  }
}

// AddNewItem.propTypes = {
//   onAddNewItem: PropTypes.func
// };

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
  }
});
