import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import closeImg from '../../../assets/icons/close.png';
import backImg from '../../../assets/icons/modal-background.png';
import {chooseAvatar} from '../../helpers/chooseAvatar';
import {getUsers} from '../../helpers/firebase';
import {getToday} from '../../helpers/getDate';

const avatarImgArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const screenWidth = Dimensions.get('window').width;
export const ProfileModal = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(0);
  const modalVisible = useSelector(
    state => state.modalInfoReducer,
  ).isProfileModalVisible;
  const userInfo = useSelector(state => state.userInfoReducer).userInfo;
  const userId = useSelector(state => state.userInfoReducer).userId;

  const dispatch = useDispatch();

  const submit = () => {
    console.log('Get Today', getToday());
    if (!userId) alert('userID is null', userId);
    firestore()
      .collection('users')
      .doc(userId)
      .set({...userInfo, name: name, avatarImg: avatar})
      .then(() => {
        getUsers(dispatch);
      });
    dispatch({type: 'CLOSE_PROFILE_MODAL'});
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setAvatar(userInfo.avatarImg);
    }
  }, [userInfo]);

  return (
    <Modal
      isVisible={modalVisible}
      statusBarTranslucent
      onBackdropPress={() => dispatch({type: 'CLOSE_PROFILE_MODAL'})}
      style={styles.container}>
      <ImageBackground
        source={backImg}
        resizeMode="stretch"
        style={styles.backgroundContainer}>
        <Text style={styles.score}>Your Profile</Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => dispatch({type: 'CLOSE_PROFILE_MODAL'})}>
          <Image source={closeImg} />
        </TouchableOpacity>
        <View>
          <Text style={styles.label}>Enter a nickname:</Text>
          <TextInput
            style={styles.inputTxt}
            placeholder="Your name"
            autoCapitalize="none"
            value={name}
            placeholderTextColor="white"
            onChangeText={val => setName(val)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.label}>Select a picture:</Text>
          <ScrollView style={styles.avatarContainer}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 20,
              }}>
              {avatarImgArray.map((item, i) => {
                return (
                  <TouchableOpacity
                    style={
                      item === avatar
                        ? {...styles.avatarBtn, borderColor: '#ffc14c'}
                        : styles.avatarBtn
                    }
                    onPress={() => setAvatar(item)}
                    key={i}>
                    <Image
                      source={chooseAvatar(item)}
                      style={styles.avatarImg}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => submit()}>
          <LinearGradient
            colors={['#58DCAC', '#39BA93']}
            style={styles.confirmBtn}>
            <Text style={styles.confirmTxt}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundContainer: {
    alignItems: 'center',
    padding: 40,
    paddingBottom: 60,
    width: screenWidth,
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 50,
  },
  score: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Quicksand',
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  confirmBtn: {
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#777',
    margin: 0,
    marginTop: 12,
  },
  confirmTxt: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1.15,
  },
  inputTxt: {
    backgroundColor: 'grey',
    borderRadius: 15,
    paddingLeft: 15,
    height: 45,
    width: 295,
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1.2,
    marginTop: 5,
  },
  avatarContainer: {
    width: 295,
    maxHeight: 185,
    backgroundColor: 'grey',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginTop: 5,
  },
  avatarImg: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
    height: 56,
    width: 56,
    overflow: 'hidden',
  },
  avatarBtn: {
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 2,
    borderRadius: 10,
    padding: 3,
  },
});
