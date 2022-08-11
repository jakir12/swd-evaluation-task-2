import React, { useState,useEffect } from "react";
import { View, ScrollView , StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const url = "https://nploy.khandakerproducts.com/api/";

export default function MRListScreen({ navigation }) {

    const [moneyReceipt, setMoneyReceipt] = useState([]);
    
      const fetchMoneyReceipt = async () => {
        const {data} = await axios.get(`${url}money-receipts`);
        setMoneyReceipt(data);
      };

      useEffect(() => {
        fetchMoneyReceipt();
      }, []);

    return (
        <ScrollView   style={styles.container}>
            <DataTable>
                <DataTable.Header>
                <DataTable.Title>Customer</DataTable.Title>
                <DataTable.Title>Bank</DataTable.Title>
                <DataTable.Title>Amount</DataTable.Title>
                <DataTable.Title>Note</DataTable.Title>
                </DataTable.Header>
                {moneyReceipt.map((mr) => (
                    <DataTable.Row key={mr.id}>
                        <DataTable.Cell>{mr.customer_name}</DataTable.Cell>
                        <DataTable.Cell>{mr.bank_name}</DataTable.Cell>
                        <DataTable.Cell>{mr.amount}</DataTable.Cell>
                        <DataTable.Cell>{mr.note}</DataTable.Cell>
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