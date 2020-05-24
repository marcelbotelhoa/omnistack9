import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, ScrollView, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';

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