import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import closeImg from '../../../assets/icons/close.png';
import continueImg from '../../../assets/icons/continue.png';
import menuImg from '../../../assets/icons/menu1.png';
import backImg from '../../../assets/icons/modal-background.png';
import musicImg from '../../../assets/icons/music.png';
import restartImg from '../../../assets/icons/restart.png';

const screenWidth = Dimensions.get('window').width;
export const MenuModal = () => {
  const modalVisible = useSelector(
    state => state.modalInfoReducer,
  ).isMainModalVisible;

  const dispatch = useDispatch();
  return (
    <Modal
      isVisible={modalVisible}
      statusBarTranslucent
      animationInTiming={1000}
      animationOutTiming={1000}
      onBackdropPress={() => dispatch({type: 'CLOSE_MAIN_MODAL'})}
      style={styles.container}>
      <ImageBackground
        source={backImg}
        resizeMode="stretch"
        style={styles.backgroundContainer}>
        <Text style={styles.score}>Paused</Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => dispatch({type: 'CLOSE_MAIN_MODAL'})}>
          <Image source={closeImg} />
        </TouchableOpacity>

        {/* Adsense banner */}
        <View style={styles.bannerContainer}>
          <Text style={styles.bannerText}>Adsense banner (285 x 150px)</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button}>
            <Image source={menuImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image source={musicImg} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch({type: 'SHOW_CONFIRM_MODAL'});
            }}>
            <Image source={restartImg} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch({type: 'CLOSE_MAIN_MODAL'})}>
          <Image source={continueImg} />
        </TouchableOpacity>

        {/* </View> */}
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
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Quicksand',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  // Additional styles
  bannerContainer: {
    backgroundColor: '#d9d9d9',
    height: 150,
    borderRadius: 6,
    justifyContent: 'center',
    width: 290,
  },
  bannerText: {
    fontSize: 18,
    color: '#fff',
    letterSpacing: -1.03,
    textAlign: 'center',
    fontWeight: '400',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 294,
  },
});
