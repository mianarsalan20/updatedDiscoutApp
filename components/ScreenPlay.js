import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Navigation,
  NavigatorIOS,
  TextComponent,
} from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default function GameScreen({ navigation }) {
  const [getPrice, setPrice] = useState(0);
  const [getDiscount, setDiscount] = useState(0);
  const [getDisPrice, setDisPrice] = useState(0);
  const [getList, setList] = useState([]);
    


  const removeEntry = (e) => {
    setList(list => getList.filter(item => item.key != e))
        }


  const numClick = (e) => {
    if (e === 'Calculate') {
      setDisPrice(getPrice-((getPrice/100)*getDiscount));
    } 
    
    if (e === 'add') {
      setList([ ...getList,
            { key: Math.random(),price: getPrice , discount: getDiscount , disPrice: getDisPrice } 
      ]);
    }
    if (e === 'history') {
      setList([]);
    }

  };  

  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={styles.rule}>{`Entered Price : ${getPrice}`}</Text>
        <Text style={styles.rule}>{`Entered Discount % :  ${getDiscount}`}</Text>
        <Text style={styles.rule}>{`Discounted Price :  ${getDisPrice}`}</Text>
      </View>
      <Text style={styles.textView}>{getDisPrice}</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      placeholder="Enter Price"
      onChangeText={e => setPrice(e)}
      value={getPrice}
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      placeholder="Enter Discount %"
      onChangeText={e => setDiscount(e)}
      value={getDiscount}
    />
      
      <View style={styles.buttonframe}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={numClick.bind(this, 'Calculate')}>
          <Text style={styles.appButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonframe}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={numClick.bind(this, 'add')}>
          <Text style={styles.appButtonText}>Add in History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonframe}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={numClick.bind(this, 'history')}>
          <Text style={styles.appButtonText}>Delete History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonframe}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.appButtonText}>Exit</Text>
        </TouchableOpacity>
      </View>
      <View> 
          <ScrollView style={styles.scrollview}>
          <Text style={styles.scrollviewText}>{`Original Price\t-\tDiscount\t=\tFinal Price\n`}</Text>
          {getList.map((item) =>
              <View style={styles.scrollviewItem}>
                <Text style={styles.scrollviewText}>{`    ${item.price}`}</Text>
                <Text style={styles.scrollviewText}>{`          -     ${item.discount}%`}</Text>
                <Text style={styles.scrollviewText}>{`  =       ${item.disPrice}`}</Text>
                <TouchableOpacity
                 onPress={() => removeEntry(item.key)}>
                <Text style={styles.scrollviewTextX}>{`x\n`}</Text>
                </TouchableOpacity>
              </View>
          )}
         </ScrollView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  textView: {
    textAlign: 'center',
    fontSize: 30,
  },

  scrollviewItem:{
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollviewText:{
    fontSize: 15,
    fontWeight: 'bold',
  },

  scrollviewTextX:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
  },

  buttonsRowContainer: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '33%',
    margin: 2,
  },

  appButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
 
  buttonframe: {
    paddingTop: 8,
  },
});
