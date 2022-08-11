import React, { useState,useEffect } from "react";
import { View, ScrollView , StyleSheet ,TouchableOpacity, Modal, Text, Button,TextInput  } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const url = "https://nploy.khandakerproducts.com/api/";
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export default function CustomerScreen({ navigation }) {

    const [customers, setCustomers] = useState([]);

      const fetchCustomer = async () => {
        const {data} = await axios.get(`${url}customers`);
        setCustomers(data);
      };

      useEffect(() => {
        fetchCustomer();
      }, []);

      const [active , setactive] = useState(false);
      const [customer_code, setCustomerCode] = useState(''); 
      const [customer_name, setCustomerName] = useState(''); 
      const [customer_address, setCustomerAddress] = useState(''); 

      onSubmitEdit = () => {
        fetch("https://nploy.khandakerproducts.com/api/customers", {
          method: "POST",
          headers,
          body: JSON.stringify({
            "customer_code": customer_code,
            "customer_name": customer_name,
            "customer_address": customer_address,
          })
        }).then((res) => res.json())
          .then(resJson => {
            if(resJson == "200"){

              alert("Save Successfully.");

              setCustomerCode({customer_code: ""});
              setCustomerName({customer_name: ""});
              setCustomerAddress({customer_address: ""});
              
              setTimeout(() => fetchCustomer(), 500);
              setactive(!active);
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
                    <Text style={styles.text}>Add Customer</Text>
                    <TextInput 
                      type="numeric" 
                      keyboardType="numeric" 
                      style={styles.input} 
                      placeholder="Enter Customer Code"
                      value={customer_code}
                      onChangeText={(text) => setCustomerCode(text)}
                    />
                    <TextInput 
                      type="text" 
                      style={styles.input} 
                      placeholder="Enter Customer Name"
                      value={customer_name}
                      onChangeText={(text) => setCustomerName(text)}
                    />

                    <TextInput 
                      type="text" 
                      style={styles.input} 
                      placeholder="Enter Customer Name"
                      value={customer_address}
                      onChangeText={(text) => setCustomerAddress(text)}
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={onSubmitEdit}>
                      <Text style={styles.buttonText}>Submit </Text>
                    </TouchableOpacity>
                    <Button title="close" onPress={()=>{setactive(!active)}}/>

                    
                    </View>
                  </View>
            </Modal>

            <Button 
              title={"Add Customer"}
              onPress={()=>{setactive(!active)}}
            />  

            <DataTable>
                <DataTable.Header>
                <DataTable.Title>Code</DataTable.Title>
                <DataTable.Title>Name</DataTable.Title>
                </DataTable.Header>
                {customers.map((cust) => (
                    <DataTable.Row key={cust.id}>
                        <DataTable.Cell>{cust.customer_code}</DataTable.Cell>
                        <DataTable.Cell>{cust.customer_name}</DataTable.Cell>
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
      height : 450 ,
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