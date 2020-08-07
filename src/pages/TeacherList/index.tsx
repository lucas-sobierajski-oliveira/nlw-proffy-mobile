import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import { Feather } from '@expo/vector-icons';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  function handleToggleFilters() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTechersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id);
        setFavorites(favoritedTechersIds);
      }
    })
  }

  async function handleFilterSubmit() {
    loadFavorites();

    const response = await api.get('classes', { params: {
      subject,
      week_day,
      time
    }
    });

    setTeachers(response.data);
    setIsFiltersVisible(false)
  } 

  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis" headerRight={(
        <BorderlessButton onPress={handleToggleFilters}>
          <Feather name="filter" size={20} color="#fff"/>
        </BorderlessButton>
      )}>
        { isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput placeholderTextColor="#c1bccc" style={styles.input} placeholder="Qual a matéria" value={subject} onChangeText={text => setSubject(text)}/>

            <View style={styles.inputGroup}> 
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput placeholderTextColor="#c1bccc" style={styles.input} placeholder="Qual o dia?" value={week_day} onChangeText={text => setWeekDay(text)}/>
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput placeholderTextColor="#c1bccc" style={styles.input} placeholder="Qual o horário?" value={time} onChangeText={text => setTime(text)} />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
        
      </PageHeader>

      <ScrollView style={styles.teacherList} contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16
      }}>
        {teachers.map((teacher: Teacher)=> (
          <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
        ))}
      </ScrollView>
      
    </View>
  )
}

export default TeacherList;