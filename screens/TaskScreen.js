import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Colors from '../constants/Colors';
import AddNewItem from '../components/AddNewItem';
import ListItem from '../components/ListItem';

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
  }
});

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
      enable: true,
      items
    };
  }

  setScrollEnabled(enable) {
    console.log(enable);
    this.setState({
      enable,
    });
  }

  handleNewItem(item) {
    this.setState({
      items: [item, ...this.state.items]
    })
  }

  handleRemoveItem(key) {
    const items = this.state.items.filter(item => item.key !== key);
    this.setState(({
      items
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AddNewItem onAddNewItem={this.handleNewItem.bind(this)}/>
        </View>
        <Text style={styles.titleText}>Active task</Text>
        <ScrollView>
          <FlatList data={this.state.items}
                    scrollEnabled={this.state.enable}
                    renderItem={({item}) =>
                      (<ListItem text={item.key}
                                 removeItem={key => this.handleRemoveItem(key)}
                                 setScrollEnabled={enable => this.setScrollEnabled(enable)}/>)
                    }
          />
        </ScrollView>
      </View>
    );
  }
}
