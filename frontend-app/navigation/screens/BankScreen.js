import React, { useState,useEffect } from "react";
import { View, ScrollView, StyleSheet,TouchableOpacity, Modal, Text, Button,TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const url = "https://nploy.khandakerproducts.com/api/";

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export default function BankScreen({ navigation }) {
    
    const [banks, setBanks] = useState([]);
    const fetchBank = async () => {
      const {data} = await axios.get(`${url}banks`);
      setBanks(data);
    };
    useEffect(() => {
      fetchBank();
    }, []);


    const [active , setactive] = useState(false);
    const [bank_name, setBankName] = useState(''); 

    onSubmitEdit = () => {
      fetch("https://nploy.khandakerproducts.com/api/banks", {
        method: "POST",
        headers,
        body: JSON.stringify({
          "bank_name": bank_name
        })
      }).then((res) => res.json())
        .then(resJson => {
          if(resJson == "200"){

            alert("Save Successfully.");

            setBankName({bank_name: ""});

            setTimeout(() => fetchBank(), 500);
            setactive(!active);
            window.location.reload(false);

          }
          console.log('post:', resJson)
        }).catch(e => { console.log(e) })
    }
   
    return (
        <ScrollView   style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={active}
          onRequestClose={() => {
            console.warn("closed");
          }}
          >
            <View style={styles.container}>
              <View style={styles.View}>
                <Text style={styles.text}>Add Bank</Text>
                <TextInput 
                  type="text" 
                  style={styles.input} 
                  placeholder="Enter Bank Name"
                  value={bank_name}
                  onChangeText={(text) => setBankName(text)}
                />

                <TouchableOpacity style={styles.saveButton} onPress={onSubmitEdit}>
                  <Text style={styles.buttonText}>Submit </Text>
                </TouchableOpacity>
                <Button title="close" onPress={()=>{setactive(!active)}}/>
                </View>
            </View>
          </Modal>
          <Button 
              title={"Add Bank"}
              onPress={()=>{setactive(!active)}}
            />  
          <DataTable>
                <DataTable.Header>
                <DataTable.Title>SL</DataTable.Title>
                <DataTable.Title>Bank Name</DataTable.Title>
                </DataTable.Header>

                {banks.map((bank) => (
                    <DataTable.Row key={bank.id}>
                        <DataTable.Cell>{bank.id}</DataTable.Cell>
                        <DataTable.Cell>{bank.bank_name}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 5,
      marginBottom: 0,
      paddingHorizontal: 20,
    },
    View : {
      backgroundColor : "white" ,
      height : 250 ,
      width : '100%',
      borderRadius : 0,
      alignItems : "center",
      justifyContent : "center",
      borderColor : "black",
      borderWidth:2,
      marginTop: 50
    },
    input: {
      height: 50,
      marginBottom: 20,
      borderWidth: 1,
      padding: 10,
      width: '90%'
    },
    text : {
      fontSize : 20,
      color : "green",
      marginBottom:20
    },
    button : {
      margin : 20,
      width:200,
    },
    saveButton: {
      width: 200,
      marginBottom: 20,

    },
    buttonText: {
      textAlign: 'center',
      backgroundColor : "green" ,
      color: '#fff',
      height: 40,
      padding: 10,
    },
  });