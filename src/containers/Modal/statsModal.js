import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AnimatedNumber from 'react-native-animated-number';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
// import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import closeImg from '../../../assets/icons/close.png';
import backImg from '../../../assets/icons/modal-background.png';
import shareImg from '../../../assets/icons/share.png';

const screenWidth = Dimensions.get('window').width;
export const StatsModal = () => {
  const numberWithSep = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const [filter, setFilter] = useState(0);
  const modalVisible = useSelector(
    state => state.modalInfoReducer,
  ).isStatsModalVisible;

  const highScoreTotal = useSelector(
    state => state.scoreInfoReducer,
  ).highScoreTotal;
  const currentLevel = useSelector(
    state => state.scoreInfoReducer,
  ).currentLevel;
  const userRank = useSelector(state => state.userInfoReducer).userRank;
  const highLevel = useSelector(state => state.scoreInfoReducer).highLevel;
  const currentScore = useSelector(
    state => state.scoreInfoReducer,
  ).currentScore;

  const dispatch = useDispatch();

  const ordinal_suffix_of = i => {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + 'st';
    }
    if (j == 2 && k != 12) {
      return i + 'nd';
    }
    if (j == 3 && k != 13) {
      return i + 'rd';
    }
    return i + 'th';
  };

  return (
    <Modal
      isVisible={modalVisible}
      statusBarTranslucent
      animationInTiming={1000}
      animationOutTiming={1000}
      onBackdropPress={() => dispatch({type: 'CLOSE_STATS_MODAL'})}
      style={styles.container}>
      <ImageBackground
        source={backImg}
        resizeMode="stretch"
        style={styles.backgroundContainer}>
        <Text style={styles.modalTitle}>Stats</Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => dispatch({type: 'CLOSE_STATS_MODAL'})}>
          <Image source={closeImg} />
        </TouchableOpacity>
        <View style={styles.filterContainer}>
          {['Day', 'Week', 'Total', 'Number of users'].map((item, i) => (
            <TouchableOpacity
              style={
                filter === i ? styles.selectedFilterButton : styles.filterButton
              }
              onPress={() => setFilter(i)}
              key={i.toString()}>
              <Text style={styles.selectedFilterText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.rankNum}>#{ordinal_suffix_of(userRank)}</Text>
        <View style={styles.currentScores}>
          <LinearGradient
            colors={['#262626', '#383838']}
            style={styles.linearGradient}>
            <Text style={styles.levelText}>Top Score</Text>
            <View style={styles.divider} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  ...styles.scoreText,
                  fontSize: 12,
                  marginTop: 2,
                }}>
                $
              </Text>
              <AnimatedNumber
                steps={17}
                time={10}
                value={currentScore}
                formatter={() => numberWithSep(highScoreTotal)}
                style={styles.animatedText}
              />
            </View>
          </LinearGradient>
        </View>
        <View style={styles.currentScores}>
          <LinearGradient
            colors={['#262626', '#383838']}
            style={styles.linearGradient}>
            <Text style={styles.levelText}>Level</Text>
            <View style={styles.divider} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <AnimatedNumber
                steps={17}
                time={10}
                value={currentScore}
                formatter={() => numberWithSep(highLevel)}
                style={styles.animatedText}
              />
            </View>
          </LinearGradient>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch({type: 'CLOSE_STATS_MODAL'})}>
          <Image source={shareImg} />
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
  modalTitle: {
    color: '#44cac9',
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Quicksand',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 290,
    marginTop: 35,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  selectedFilterButton: {
    backgroundColor: '#404040',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  filterText: {
    color: '#fff',
  },
  selectedFilterText: {
    fontSize: 14,
    letterSpacing: -0.03,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: '#fff',
  },
  rankNum: {
    fontSize: 48,
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
  },
  currentScores: {
    height: 55,
    width: 290,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 6,
    borderColor: '#4d4d4d',
    borderWidth: 2,
    marginTop: 15,
  },
  levelText: {
    fontSize: 14,
    textTransform: 'uppercase',
    lineHeight: 16,
    marginVertical: 5,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    marginBottom: Platform.OS === 'android' ? 2 : 5,
    fontWeight: '700',
    color: '#ffc14c',
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: '#4d4d4d',
  },
  linearGradient: {
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scoreText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Quicksand',
  },
  animatedText: {
    fontSize: Platform.OS === 'ios' ? 18 : 22,
    lineHeight: 22,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Quicksand',
    paddingTop: 0,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
  },
});
