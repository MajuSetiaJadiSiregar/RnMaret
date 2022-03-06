import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';


const CardUser = (props) => {
   return(
      <View style={styles.containerList}>
         <TouchableOpacity onPress={props.selectUser}>
            <Text style={styles.nama}>Id User : {props.idUser}</Text>
            <Text style={styles.nama}>Nama : {props.nama}</Text>
            <Text style={styles.alamat}>Alamat : {props.alamat}</Text>
            <Text style={styles.telephone}>No Telephone : {props.telephone}</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={props.deleteUser}>
            <Text style={styles.delete}>x</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   containerList : {
      flexDirection : 'row',
      marginBottom : 20,
      borderRadius : 8,
      borderWidth : 1,
      borderColor : 'blue'
   },
   containerRow : {
      flexDirection : 'row',
      marginBottom : 20,
      borderRadius : 8,
      borderWidth : 1,
      borderColor : 'blue'
   },
   nama : {
      fontSize : 20,
      fontWeight : 'bold',
      padding : 5
   },
   alamat : {
      fontSize : 16,
      padding : 5
   },
   telephone : {
      fontSize : 16,
      padding : 5
   },
   delete : {
      color : 'red',
      fontWeight : 'bold',
      fontSize : 24,
   }
});

export default CardUser;