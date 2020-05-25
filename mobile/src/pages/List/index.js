import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client'
import { Alert, SafeAreaView, Image, ScrollView, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';

import SpotList from '../../components/SpotList';

import styles from './styles.js';
import logo from '../../assets/logo.png';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    async function handleLogout() {
        await AsyncStorage.clear()
        navigation.navigate('Login')
      }

      useEffect(() => {
          AsyncStorage.getItem('user').then(user_id => {
              const socket = socketio('http://192.168.1.102:3333', {
                  query: { user_id }
              })

              socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'ACEITA' : 'RECUSADA'}`)
              })
          })
      }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={handleLogout}>
            <Image style={styles.logo} source={logo} />
        </TouchableOpacity>   

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} /> )}
            </ScrollView>  
                      
        </SafeAreaView>
    )
}