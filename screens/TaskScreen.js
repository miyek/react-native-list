import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Colors from '../constants/Colors';
import { AddNewItem } from '../components/AddNewItem';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: 50
    },
    titleText: {
      fontSize: 16,
      padding: 15,
      backgroundColor: Colors.headerBackground,
      color: Colors.headerColor,
      fontWeight: '600'
    },
    button: {
      marginBottom: 3,
      backgroundColor: Colors.buttonBackground
    },
    buttonText: {
      padding: 20,
      color: Colors.buttonColor
    }
  })
;


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

    this.state = {
      items
    };
  }

  handleNewItem(item) {
    this.setState({
      items: [ item, ...this.state.items]
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AddNewItem onAddNewItem={this.handleNewItem.bind(this)}/>
        </View>
        <Text style={styles.titleText}>Active task</Text>
        <ScrollView>
          <FlatList data={this.state.items} renderItem={({item}) =>
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
