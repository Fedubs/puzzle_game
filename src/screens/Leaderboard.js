import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import backImg from '../../assets/icons/arrow_back.png';
import goldenCupImg from '../../assets/icons/golden-cup.png';
import rankFirstImg from '../../assets/icons/rank-1.png';
import rankSecImg from '../../assets/icons/rank-2.png';
import rankThirdImg from '../../assets/icons/rank-3.png';
import scoreboardUserImg from '../../assets/icons/scoreboard-user.png';
import scoreboardImg from '../../assets/icons/scoreboard.png';
import {ProfileModal} from '../containers/Modal/profileModal';
import {chooseAvatar} from '../helpers/chooseAvatar';
import {getUsers} from '../helpers/firebase';
import {getToday} from '../helpers/getDate';

const screenWidth = Dimensions.get('window').width;
var _ = require('lodash');

export const LeaderboardScreen = () => {
  const [filterBy, setFilterBy] = useState('day');
  const [showingData, setShowingData] = useState([]);
  const [showingRank, setShowingRank] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const usersInfo = useSelector(state => state.userInfoReducer).usersInfo;
  const userInfo = useSelector(state => state.userInfoReducer).userInfo;
  const userRank = useSelector(state => state.userInfoReducer).userRank;
  const userId = useSelector(state => state.userInfoReducer).userId;

  const maxScore = scores => {
    const result = Math.max(
      ...scores.map(score =>
        Number(Object.keys(score)[0]) >= getToday() - 6 * 86400000
          ? Object.values(score)[0]
          : 0,
      ),
    );
    return result;
  };
  useEffect(() => {
    getUsers(dispatch);
  }, []);
  useEffect(() => {
    console.log('User Info created:::', userInfo);
  }, [userInfo]);

  useEffect(() => {
    usersInfo && setShowingData(usersInfo);
  }, [usersInfo]);
  useEffect(() => {
    userId && setShowingRank(showingData.findIndex(x => x.id === userId) + 1);
  }, [showingData]);
  useEffect(() => {
    if (filterBy === 'day') {
      let dayArr = usersInfo?.filter(
        e => Number(Object.keys(e.maxScoreToday)[0]) === getToday(),
      );
      let aaa = _.orderBy(
        dayArr,
        [`maxScoreToday[${getToday()}]`, 'name'],
        ['desc', 'desc'],
      );
      setShowingData(aaa);
    } else if (filterBy === 'week') {
      let weekArr = usersInfo;
      weekArr.sort(
        (a, b) => maxScore(b.maxScoreWeek) - maxScore(a.maxScoreWeek),
      );
      setShowingData(weekArr);
    } else {
      let totalArr = usersInfo;
      let bbb = _.orderBy(
        totalArr,
        ['maxScoreTotal', 'name'],
        ['desc', 'desc'],
      );
      setShowingData(bbb);
    }
  }, [filterBy, usersInfo]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#44CAC9', '#3C85D6']}>
        <ImageBackground
          source={goldenCupImg}
          resizeMode="contain"
          style={styles.header}>
          <Text style={styles.lText}>Leaderboards</Text>
          <TouchableOpacity
            onPress={() => navigation.replace('Start')}
            style={styles.backBtn}>
            <Image source={backImg} style={styles.backImg} />
          </TouchableOpacity>
        </ImageBackground>
      </LinearGradient>
      <LinearGradient colors={['#44CAC9', '#3C85D6']} style={styles.tableRow}>
        <TouchableOpacity
          style={filterBy === 'day' ? styles.filterAct : styles.filterInAct}
          onPress={() => setFilterBy('day')}>
          <Text style={styles.filterTxt}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={filterBy === 'week' ? styles.filterAct : styles.filterInAct}
          onPress={() => setFilterBy('week')}>
          <Text style={styles.filterTxt}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={filterBy === 'total' ? styles.filterAct : styles.filterInAct}
          onPress={() => setFilterBy('total')}>
          <Text style={styles.filterTxt}>Total</Text>
        </TouchableOpacity>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.body}>
        {showingData?.map((item, i) => {
          return (
            <ImageBackground
              source={item.id === userId ? scoreboardUserImg : scoreboardImg}
              resizeMode="stretch"
              style={styles.scoreboard}
              key={i.toString()}>
              {i < 3 ? (
                <Image
                  source={
                    i === 0 ? rankFirstImg : i === 1 ? rankSecImg : rankThirdImg
                  }
                  style={{
                    height: 60,
                    width: 60,
                    marginLeft: 8,
                    marginRight: 7,
                    marginTop: 5,
                  }}
                />
              ) : (
                <Text style={styles.lRank}>{i + 1}</Text>
              )}

              <Image
                source={chooseAvatar(item.avatarImg)}
                style={styles.avatarImg}
              />
              <Text
                style={
                  i === 0
                    ? {...styles.lName, color: '#fac32d', fontSize: 22}
                    : i === 1
                    ? {...styles.lName, color: '#c7eaff', fontSize: 22}
                    : i === 2
                    ? {...styles.lName, color: '#d79077', fontSize: 22}
                    : styles.lName
                }>
                {item.name}
              </Text>
              <Text
                style={
                  i === 0
                    ? {...styles.lScore, color: '#fac32d', fontSize: 22}
                    : i === 1
                    ? {...styles.lScore, color: '#c7eaff', fontSize: 22}
                    : i === 2
                    ? {...styles.lScore, color: '#d79077', fontSize: 22}
                    : styles.lScore
                }>
                {filterBy === 'day'
                  ? item.maxScoreToday[getToday()]
                  : filterBy === 'total'
                  ? item.maxScoreTotal
                  : filterBy === 'week'
                  ? maxScore(item.maxScoreWeek)
                  : item.maxScoreTotal}
              </Text>
            </ImageBackground>
          );
        })}
      </ScrollView>
      {userInfo ? (
        <LinearGradient colors={['#58DCAC', '#39BA93']} style={styles.footer}>
          <Text style={{...styles.lRank, color: 'white', fontSize: 22}}>
            {showingRank === 0 ? showingData.length + 1 : showingRank}
          </Text>
          <Image
            source={chooseAvatar(userInfo.avatarImg)}
            style={{...styles.avatarImg, borderColor: 'yellow'}}
          />
          <Text
            style={{...styles.lName, color: 'white', fontSize: 22}}
            onPress={() => {
              dispatch({type: 'SHOW_PROFILE_MODAL'});
            }}>
            {userInfo.name ? userInfo.name : 'You'}
          </Text>
          <Text style={{...styles.lScore, color: 'white', fontSize: 22}}>
            {filterBy === 'day'
              ? userInfo.maxScoreToday[getToday()]
              : filterBy === 'week'
              ? maxScore(userInfo.maxScoreWeek)
              : userInfo.maxScoreTotal}
          </Text>
        </LinearGradient>
      ) : (
        <LinearGradient colors={['#58DCAC', '#39BA93']} style={styles.footer}>
          <Text
            style={{...styles.lName, textAlign: 'center'}}
            onPress={() => {
              dispatch({type: 'SHOW_PROFILE_MODAL'});
            }}>
            Please add your nick name
          </Text>
        </LinearGradient>
      )}
      <ProfileModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  header: {
    marginVertical: 10,
    height: 100,
    justifyContent: 'flex-end',
  },
  backBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#3C85D6',
    backgroundColor: '#44CAC9',
  },
  backImg: {
    width: 30,
    height: 30,
  },
  lText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
    textShadowColor: 'cyan',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  body: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    minHeight: '70%',
  },
  tableRow: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  filterAct: {
    borderBottomColor: 'cyan',
    borderBottomWidth: 3,
  },
  filterTxt: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    textTransform: 'uppercase',
  },
  avatarImg: {
    width: 35,
    height: 35,
    backgroundColor: '#44CAC9',
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 2,
    marginRight: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 0,
    justifyContent: 'space-between',
  },
  lRank: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    width: 50,
    marginLeft: 25,
    fontFamily: 'Quicksand',
  },
  lName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    fontFamily: 'Quicksand',
  },
  lScore: {
    color: '#ffc14c',
    fontSize: 18,
    fontWeight: '700',
    width: 95,
    fontFamily: 'Quicksand',
  },
  scoreboard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: 76,
    paddingBottom: 0,
    marginBottom: 5,
    position: 'relative',
  },
});
