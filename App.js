import React , { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TodoList from './TodoList';
import { map } from 'rxjs/operators';
// import console = require('console');

const App = () => {

  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);

  console.log('Current value = ',value)

  const addTodo = () => {
    if(value.length > 0) {
      setTodos([{ text: value, key: Date.now(), checked: false }, ...todos]);
      setValue('');
    } else {
      console.log("Empty text");
    }
  };

  const checkTodo = (id) => {
    setTodos(
      todos.map(todo => {
        if (todo.key === id) todo.checked = !todo.checked;
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    console.log(todos,"and id = ",id)
    setTodos(
      todos.filter(todo => {
        if (todo.key !== id) return true;
      })
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.textInputContainer}>
        <TextInput 
          style={styles.textInput}
          multiline={true}
          placeholder="What do you want to do today?"
          placeholderTextColor="#abbabb"
          value={value}
          onChangeText={value => setValue(value)}
        />
        <TouchableOpacity onPress={addTodo}>
		      <Icon name="plus" size={30} color="blue" style={{ marginLeft: 15 }} />
	      </TouchableOpacity>
        
      </View>

      <ScrollView style={{ width: '100%' }}>
        {todos.map(item => (
          <TodoList 
            text={item.text} 
            key={item.key} 
            checked={item.checked}
            setChecked={() => checkTodo(item.key)}
            deleteTodo={() => deleteTodo(item.key)}
          />
        ))}
	  	</ScrollView>

      {/* <FlatList
          data={todos}
          keyExtractor = { (todo) => todo.text }
          renderItem={({item}) => {
            return(
              <TodoList text= {item.text} />
            )
          }
          }
      /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  header: {
    marginTop: '15%',
    fontSize: 20,
    color:'red',
    paddingBottom: 10
  },

  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 10
  },

  textInput: {
    flex: 1,
    height: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
    minHeight: '3%'
  }
});

export default App;