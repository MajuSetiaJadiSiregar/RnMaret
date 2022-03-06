import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import CardUser from './CardUser';

const MainPage = () => {

   const [dataUser, setDataUser] = useState([]);
   const [nama, setNama] = useState("");
   const [alamat, setALamat] = useState("");
   const [telepon, setTelepon] = useState("");
   const[titleButton, setTitleButton] = useState("Add User");
   const[userId, setUserId] = useState("");

   const readUser = async () => {
      try {
         const dataJson = await axios.get('http://10.0.2.2:5050/users');
         setDataUser(dataJson.data);
      }catch(err) {
         console.log(err);
      }
   };

   const clickSubmit = async() => {
      const dataInputan = {nama, alamat, telepon}
      if(titleButton == "Add User"){
         try{
            if(nama == "")
            {
               Alert.alert('Warning', 'Nama Masih Kosong?',
                        [
                           
                           {text : 'Yes !!', onPress : () => {console.log('OK')}}
                        ])
            } else {
               await axios.post('http://10.0.2.2:5050/users', dataInputan);
            readUser();
            setNama("");
            setALamat("");
            setTelepon("");
            }
            
         }catch(err){
            console.log(err);
         }
      } else if(titleButton == "Update User"){
         try{
            await axios.put('http://10.0.2.2:5050/users/'+userId, dataInputan);
            readUser();
            setNama("");
            setALamat("");
            setTelepon("");
            setTitleButton("Add User")
         }catch(err){
            console.log(err);
         }
      }
   }

   const deleteUser = async (id) => {
      try{
         await axios.delete('http://10.0.2.2:5050/users/'+id);
         readUser();
      }catch(err)
      {
         console.log(err)
      }
   }

   const selectItemUser = (itemUser) => {
      setUserId(itemUser._id);
      setNama(itemUser.nama);
      setALamat(itemUser.alamat);
      setTelepon(itemUser.telepon);
      setTitleButton("Update User")
   }
   useEffect(() => {
      readUser();
   },[]);

   return(
      <ScrollView>
         <View style={styles.container}>
            <Text style={styles.titleCrud}>CRUD API</Text>
            <Text style={styles.lineBatas}></Text>

            <TextInput
               value={nama}
               onChangeText={(value) => setNama(value)}
               style={styles.inputan}
               placeholder="Nama"
            />
            <TextInput
               value={alamat}
               onChangeText={(value) => setALamat(value)}
               style={styles.inputan}
               placeholder="Alamat"
            />

            <TextInput
               value={telepon}
               style={styles.inputan}
               keyboardType="numeric"
               placeholder="Telephone"
               onChangeText={(value) => setTelepon(value)}
            />

            <Button
               onPress={clickSubmit}
               style={styles.buttonAdd}
               title={titleButton}
            
            />

            <Text style={styles.lineBatas}></Text>

            {dataUser.length == 0 ?  
               <ActivityIndicator size="large" color="#00ff00" />
            : dataUser.map((user) => {
               console.log(user)
               return (
                  <CardUser 
                     key={user._id}
                     idUser ={user._id}
                     nama={user.nama} 
                     alamat={user.alamat} 
                     telephone={user.telepon}
                     selectUser={() => selectItemUser(user)}
                     deleteUser={() => {
                        Alert.alert('Warning', 'Yakin Untuk di Hapus ?',
                        [
                           {text : 'No !!', onPress : () => {console.log('tidak yakin')}},
                           {text : 'Yes !!', onPress : () => deleteUser(user._id)}
                        ])
                     }}
                     />
                  );
            })
            }
         </View>
      </ScrollView>
   );
};
const styles = StyleSheet.create({
   container : {
      padding : 20
   },
   titleCrud : {
      textAlign : 'center',
      fontSize : 16
   },
   lineBatas : {
      height : 2,
      backgroundColor : 'black',
      marginVertical : 20
   },
   inputan : {
      borderWidth : 1,
      marginBottom : 12,
      borderRadius : 8
   },
   buttonAdd : {
      borderRadius : 12,
      padding : 5
   }
});
export default MainPage;