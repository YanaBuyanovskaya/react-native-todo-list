import React, { useState } from "react";
import{
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
  SafeAreaViewBase,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function App(){
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const text = taskText.trim();

    if (text.length === 0) {
      Alert.alert("Помилка", "Введіть текст задачі");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: text,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setTaskText("");
    Keyboard.dismiss();

    Toast.show({
      type: "success",
      text1: "Успішно!",
      text2: "Задача додана успішно",
    });
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
     <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Список задач</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Введіть задачу..."
            value={taskText}
            onChangeText={setTaskText}
          />

          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Додати</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id }
          ListEmptyComponent = {
            <Text style={styles.emptyText}>Поки задач немає.</Text>
          }

          renderItem = {({ item }) => (
            <View style = {styles.taskCard}>
              <Text style = {styles.taskText}> {item.title} </Text>

              <TouchableOpacity 
                style = {styles.deleteButton}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.deleteButtonText}>Видалити</Text>
              </TouchableOpacity>
            </View>
          )}
          />

          <Toast />
          </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  form: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1, 
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 10,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskText: {
    fontSize: 17,
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#777777",
    fontSize: 16,
    marginTop: 30,
  },
});
