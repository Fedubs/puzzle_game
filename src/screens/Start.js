import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AnimatedNumber from 'react-native-animated-number';
import {useDispatch, useSelector} from 'react-redux';
import backgroundImg from '../../assets/icons/background.png';
import leaderboardImg from '../../assets/icons/leaderboard.png';
import scoreboardImg from '../../assets/icons/scoreboard.png';
import startImg from '../../assets/icons/start.png';
import statsImg from '../../assets/icons/stats.png';
import {StatsModal} from '../containers/Modal/statsModal';
export const StartScreen = () => {
  const [highScore, setHighScore] = useState(0);
  const highScoreTotal = useSelector(
    state => state.scoreInfoReducer,
  ).highScoreTotal;
  const userInfo = useSelector(state => state.userInfoReducer).userInfo;
  const userRank = useSelector(state => state.userInfoReducer).userRank;
  const isUpdating = useSelector(state => state.scoreInfoReducer).isUpdating;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const numberWithSep = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const startGame = () => {
    navigation.navigate('Playground');
    dispatch({type: 'RESTART_GAME'});
  };

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

  useEffect(() => {
    if (userInfo) {
      setHighScore(userInfo.maxScoreTotal);
    }
  }, [userInfo]);
  return (
    <ImageBackground
      source={backgroundImg}
      resizeMode="stretch"
      style={styles.container}>
      <ImageBackground
        source={scoreboardImg}
        resizeMode="contain"
        style={styles.scoreboard}>
        <TouchableOpacity
          style={styles.statsImg}
          onPress={() => dispatch({type: 'SHOW_STATS_MODAL'})}>
          <Image source={statsImg} />
        </TouchableOpacity>

        <View style={{height: 6}} />
        <Text style={styles.rankNum}>#{ordinal_suffix_of(userRank)}</Text>
      </ImageBackground>
      <ImageBackground
        source={scoreboardImg}
        resizeMode="stretch"
        style={styles.scoreboard}>
        <Text style={styles.levelText}>High Score</Text>
        <View style={styles.divider} />
        {isUpdating ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <ActivityIndicator
              size="large"
              color="#6a4dfd"
              style={{...styles.animatedText, marginTop: 2, marginBottom: 2}}
            />
          </View>
        ) : (
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
              value={highScore}
              formatter={() => numberWithSep(highScore)}
              style={styles.animatedText}
            />
          </View>
        )}
      </ImageBackground>
      <TouchableOpacity style={styles.button} onPress={() => startGame()}>
        <Image source={startImg} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Leaderboard')}>
        <Image source={leaderboardImg} />
      </TouchableOpacity>
      <StatsModal />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalTitle: {
    color: '#44cac9',
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Quicksand',
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 50,
  },
  rankNum: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.03,
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
  linearGradient: {
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
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
    width: 290,
    backgroundColor: '#4d4d4d',
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
  scoreboard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 296,
    minHeight: 70,
    paddingBottom: 0,
    marginBottom: 0,
    position: 'relative',
  },
  statsImg: {
    position: 'absolute',
    top: -10,
  },
});
