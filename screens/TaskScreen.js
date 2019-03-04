import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import Colors from '../constants/Colors';


export default class TaskScreen extends React.Component {
  static navigationOptions = {
    title: 'Task list',
  };

  constructor(props) {
    super(props);

    const items = [
      {key: 'Devin'},
      {key: 'Jackson'},
      {key: 'James'},
      {key: 'Joel'},
      {key: 'John'},
      {key: 'Jillian'},
      {key: 'Jimmy'},
      {key: 'Julie'},
    ];

    this.state =  {
      newItem: 'Enter new task..',
      items
    };
  }

  addNewTask() {
    const item = { key: this.state.newItem };
    const items = [ item, ...this.state.items];
    this.setState({
      newItem: null,
      items
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(newItem) => this.setState({newItem})}
            value={this.state.newItem}
          />
          <TouchableOpacity onPress={()=>this.addNewTask()}>
            <Text style={styles.addButton}>Add new task</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={styles.titleText}>Actually task</Text>
          <FlatList
            data={this.state.items}
            renderItem={({item}) =>
              <TouchableOpacity onPress={() => {
              }}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{item.key}</Text>
                </View>
              </TouchableOpacity>
            }
          />
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 10,
    padding: 10
  },
  addButton: {
    margin: 10,
    padding: 10,
  },
  titleText: {
    fontSize: 16,
    padding: 15,
    backgroundColor: Colors.headerBackground,
    color: Colors.headerColor,
    fontWeight: "600"
  },
  button: {
    marginBottom: 3,
    backgroundColor: Colors.buttonBackground
  },
  buttonText: {
    padding: 20,
    color: Colors.buttonColor
  }
});
