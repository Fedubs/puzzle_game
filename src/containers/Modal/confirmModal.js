import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import closeImg from '../../../assets/icons/close.png';
import backImg from '../../../assets/icons/modal-background.png';
import noImg from '../../../assets/icons/no.png';
import yesImg from '../../../assets/icons/yes.png';

const screenWidth = Dimensions.get('window').width;
export const ConfirmModal = () => {
  const confirmModalVisible = useSelector(
    state => state.modalInfoReducer,
  ).isConfirmModalVisible;

  const dispatch = useDispatch();
  return (
    <Modal
      isVisible={confirmModalVisible}
      statusBarTranslucent
      animationInTiming={1000}
      animationOutTiming={1000}
      onBackdropPress={() => dispatch({type: 'CLOSE_CONFIRM_MODAL'})}
      style={styles.container}>
      <ImageBackground
        source={backImg}
        resizeMode="stretch"
        style={styles.backgroundContainer}>
        <Text style={styles.confirmText}>
          Are you want to restart this game?
        </Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => dispatch({type: 'CLOSE_CONFIRM_MODAL'})}>
          <Image source={closeImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch({type: 'RESTART_GAME'});
            dispatch({type: 'CLOSE_CONFIRM_MODAL'});
          }}>
          <Image source={yesImg} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch({type: 'SHOW_MAIN_MODAL'})}>
          <Image source={noImg} />
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
    top: 30,
    right: 40,
  },
  confirmText: {
    color: '#fff',
    fontSize: 20,
    width: '80%',
    fontWeight: '700',
    marginRight: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Quicksand',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
});
