import React, { useState,useEffect,useCallback } from "react";
import SelectList from 'react-native-dropdown-select-list';
import { View, ScrollView , StyleSheet,Text, TextInput ,TouchableOpacity, Button} from 'react-native';
import axios from 'axios';

const url = "https://nploy.khandakerproducts.com/api/";
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
export default function MRFScreen({ navigation }) {
    
    const [custSelected, setSelected] = React.useState("");
    const [bankSelected, setBankSelected] = React.useState("");
    
    const [customers, setCustomers] = useState([]);
    const [banks, setBanks] = useState([]);

    useEffect(() => {

        const fetchCustomer = async () => {
          const {data} = await axios.get(`${url}customers`);
          const cust = data.map((item) => {
            const ctnm = item.customer_code + '##' + item.customer_name;
            return {
                  "key": ctnm,
                  "value": item.customer_name
                }
            })
          setCustomers(cust);
        };
        fetchCustomer();
      }, []);


      useEffect(() => {
        const fetchBanks = async () => {
          const {data} = await axios.get(`${url}banks`);
          const bank = data.map((item) => {
            const bnk_id = item.id + '##' + item.bank_name;
            return {
                  "key": bnk_id,
                  "value": item.bank_name
                }
            })
            setBanks(bank);
        };
        fetchBanks();
      }, []);


    const [customer_code, setCustomerCode] = useState(''); 
    const [bank_id, setBankId] = useState(''); 
    const [amount, setAmount] = useState(''); 
    const [note, setNote] = useState(''); 

    onSubmitEdit = () => {

      const custArr = customer_code.split("##");
      const custCode = custArr[0];
      const custNm = custArr[1];

      const bnkArr = bank_id.split("##");
      const bnk_id = bnkArr[0];
      const bnk_nm = bnkArr[1];

      fetch("https://nploy.khandakerproducts.com/api/money-receipts", {
        method: "POST",
        headers,
        body: JSON.stringify({
          "customer_code": custCode,
          "customer_name": custNm,
          "bank_id": bnk_id,
          "bank_name": bnk_nm,
          "amount": amount,
          "note": note
        })
      }).then((res) => res.json())
        .then(resJson => {
          if(resJson == "200"){
            alert("Save Successfully.");
            setCustomerCode({customer_code: ""});
            setBankId({bank_id: ""});
            setAmount({amount: ""});
            setNote({note: ""});
            loadContacts();
          }
          console.log('post:', resJson)
        }).catch(e => { console.log(e) })
    }

    return (
        <View style={styles.containerStyle}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.headingStyle}>Money Receipt</Text>
                
                <SelectList 
                    style={styles.dropdown}
                    setSelected={setSelected} 
                    data={customers}  
                    boxStyles={{borderRadius:0}}
                    onSelect={() => setCustomerCode(custSelected)}
                  />

                <SelectList 
                    style={styles.dropdown}
                    setSelected={setBankSelected} 
                    data={banks}  
                    boxStyles={{marginTop:15,borderRadius:0}}
                    onSelect={() => setBankId(bankSelected)}
                  /> 
                <TextInput 
                      type="numeric" 
                      keyboardType="numeric" 
                      style={styles.input}
                      placeholder="Enter Amount"
                      value={amount}
                      onChangeText={(text) => setAmount(text)}
               />
                <TextInput 
                      type="text" 
                      style={styles.input} 
                      placeholder="Enter Note"
                      value={note}
                      onChangeText={(text) => setNote(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onSubmitEdit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
          </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    scrollViewStyle: {
      flex: 1,
      padding: 15,
      justifyContent: 'center',
    },
    headingStyle: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 40,
    },
    dropdown: {
      marginTop: 10,
    },
    text: {
      fontSize: 24,
    },
    input: {
      height: 50,
      marginTop: 10,
      borderWidth: 1,
      padding: 10,
      width: '100%'
    },
    button: {
      marginTop: 20,
      padding: 10,
      borderRadius: 0,
      backgroundColor: 'steelblue',
    },
    buttonText: {
      textAlign: 'center',
      color: 'white'
    },
  });
